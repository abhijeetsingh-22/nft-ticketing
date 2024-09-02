"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Event, User } from "@prisma/client";
import { Filters } from "./Filters";
import { EventCard } from "./EventCard";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";
import { toast } from "sonner";
import bs58 from "bs58";
import { buyEventTicket } from "@/server-actions/buy-ticket";
import { convertUsdToSol } from "@/lib/NFT/dollarToSol";

export default function AllEvents({
	initialEvents,
}: {
	initialEvents: Event[];
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [minPrice, setMinPrice] = useState("0");
	const [maxPrice, setMaxPrice] = useState("5000");
	const [selectedOrganizers, setSelectedOrganizers] = useState<string[]>([]);
	const [events, setEvents] = useState(initialEvents);
	const [filteredEvents, setFilteredEvents] = useState(initialEvents);

	const [balance, setBalance] = useState<number | null>(null);
	const { publicKey, signTransaction } = useWallet();
	const { connection } = useConnection();

	useEffect(() => {
		if (publicKey) {
			(async function getBalanceEvery10Seconds() {
				const newBalance = await connection.getBalance(publicKey);
				setBalance(newBalance / LAMPORTS_PER_SOL);
				setTimeout(getBalanceEvery10Seconds, 10000);
			})();
		} else {
			setBalance(null);
		}
	}, [publicKey, connection, balance]);

	const handleBuyEventTicket = async (eventId: string) => {
		console.log("buying ticket for event", eventId);
		console.log("publicKey", publicKey);
		setIsLoading(true);
		let selectedEvent = events.filter((event) => event.id === eventId)[0];

		if (!publicKey || !connection || !balance || !signTransaction) {
			toast.error("Please connect your wallet");
			setIsLoading(false);
			return;
		}
		console.log("ticketPrice", selectedEvent.ticketPrice);
		console.log(
			"ticket cost",
			selectedEvent.ticketPrice,
			await convertUsdToSol(selectedEvent.ticketPrice)
		);
		const ticketPrice: number | null = await convertUsdToSol(
			selectedEvent.ticketPrice
		);
		if (!ticketPrice) {
			toast.error("Server Error! Please try again");
			setIsLoading(false);
			return;
		}
		const ticketCostLamports = Number(
			(ticketPrice * LAMPORTS_PER_SOL).toFixed(0)
		);
		console.log("ticketCostLamports", ticketCostLamports);
		console.log(
			"palatform wallet",
			process.env.NEXT_PUBLIC_PLATFORM_WALLET_PUBLIC_KEY
		);
		const transaction = new Transaction().add(
			SystemProgram.transfer({
				fromPubkey: publicKey,
				toPubkey: new PublicKey(
					bs58.decode(process.env.NEXT_PUBLIC_PLATFORM_WALLET_PUBLIC_KEY!)
				), // Replace with your platform's public key
				lamports: ticketCostLamports,
			})
		);
		transaction.recentBlockhash = (
			await connection.getLatestBlockhash()
		).blockhash;
		transaction.feePayer = publicKey;

		try {
			// Sign the transaction
			const signedTransaction = await signTransaction(transaction);

			await toast.promise(
				buyEventTicket({
					eventId,
					signedTransaction: Buffer.from(
						signedTransaction.serialize()
					).toString("base64"),
				}),
				{
					loading: "Processing payment...",
					success:
						"Ticket purchased successfully! Please check your wallet for your NFT",
					error: (err) => `${err.message}`,
				}
			);
		} catch (error) {
			console.error(error);
			toast.error("Failed to buy ticket");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const min = parseFloat(minPrice) || 0;
		const max = parseFloat(maxPrice) || Infinity;

		const filtered = events.filter(
			(event) =>
				event.ticketPrice !== null &&
				event.ticketPrice !== undefined &&
				event.ticketPrice >= min &&
				event.ticketPrice <= max &&
				(selectedOrganizers.length === 0 ||
					selectedOrganizers.includes(
						event.organizerId.toLowerCase().replace(/\s+/g, "")
					))
		);
		setFilteredEvents(filtered);
	}, [minPrice, maxPrice, selectedOrganizers, events]);

	const handlePriceChange = (
		value: string,
		setter: (value: string) => void
	) => {
		const numValue = parseFloat(value);
		if (!isNaN(numValue) && numValue >= 0) {
			setter(value);
		} else if (value === "") {
			setter("");
		}
	};

	return (
		<div className='flex lg:flex-row flex-col gap-8'>
			<aside className='space-y-6 w-full lg:w-1/4'>
				<Filters
					minPrice={minPrice}
					maxPrice={maxPrice}
					handlePriceChange={handlePriceChange}
					setMinPrice={setMinPrice}
					setMaxPrice={setMaxPrice}
					setSelectedOrganizers={setSelectedOrganizers}
				/>
			</aside>

			<section className='space-y-6 w-full lg:w-3/4'>
				<div className='flex space-x-2'>
					<Input
						placeholder='Search by event title or seller'
						className='flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
					/>
					<Button className='bg-purple-600 hover:bg-purple-700 dark:hover:bg-purple-600 dark:bg-purple-500 text-white'>
						Search
					</Button>
				</div>

				<div className='space-y-6'>
					{filteredEvents.map((event) => (
						<EventCard
							key={event.id}
							isLoading={isLoading}
							{...event}
							handleBuyEventTicket={handleBuyEventTicket}
						/>
					))}
					{filteredEvents.length === 0 && (
						<p className='text-center text-gray-500 dark:text-gray-400'>
							No events match your current filters.
						</p>
					)}
				</div>
			</section>
		</div>
	);
}
