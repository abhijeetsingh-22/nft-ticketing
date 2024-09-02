"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
	Ticket,
	Calendar,
	MapPin,
	Clock,
	QrCode,
	Download,
	Eye,
	Sun,
	Moon,
	DollarSign,
	Users,
	Info,
	User,
	TicketIcon,
} from "lucide-react";
import Image from "next/image";
import { TicketWithEvent } from "@/db/types";
import QRCodeModal from "@/components/qr-modal";

export default function MyTickets({
	allTickets,
}: {
	allTickets: TicketWithEvent[];
}) {
	const [activeTab, setActiveTab] = useState("all");
	const [tickets, setTickets] = useState<TicketWithEvent[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTickets(allTickets);
		setLoading(false);
	}, [allTickets]);
	console.log(allTickets);
	useEffect(() => {
		const currentDate = new Date();
		switch (activeTab) {
			case "upcoming":
				setTickets(
					allTickets.filter(
						(ticket) => new Date(ticket.createdAt) >= currentDate
					)
				);
				break;
			case "past":
				setTickets(
					allTickets.filter(
						(ticket) => new Date(ticket.createdAt) < currentDate
					)
				);
				break;
			default:
				setTickets(allTickets);
		}
	}, [activeTab, allTickets]);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<div className='min-h-[70vh] text-foreground'>
			<main className='max-w-7xl'>
				<Tabs
					defaultValue='all'
					className='w-full'
					onValueChange={setActiveTab}
				>
					<TabsList className='gap-4 grid grid-cols-3 bg-muted p-2 rounded-xl w-full h-full'>
						{["all", "upcoming", "past"].map((tab) => (
							<TabsTrigger
								key={tab}
								value={tab}
								className='data-[state=active]:bg-background data-[state=active]:shadow-md px-6 py-3 rounded-lg font-medium text-sm transition-all'
							>
								{tab.charAt(0).toUpperCase() + tab.slice(1)} Events
							</TabsTrigger>
						))}
					</TabsList>
					<TabsContent value='all'>
						{loading ? <LoadingSkeleton /> : <TicketList tickets={tickets} variants={containerVariants} itemVariants={itemVariants} />}
					</TabsContent>
					<TabsContent value='upcoming'>
						{loading ? <LoadingSkeleton /> : <TicketList tickets={tickets} variants={containerVariants} itemVariants={itemVariants} />}
					</TabsContent>
					<TabsContent value='past'>
						{loading ? <LoadingSkeleton /> : <TicketList tickets={tickets} variants={containerVariants} itemVariants={itemVariants} />}
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}

function LoadingSkeleton() {
	return (
		<div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'>
			{[...Array(6)].map((_, index) => (
				<div key={index} className='animate-pulse'>
					<div className='bg-muted w-full h-48 mb-4'></div>
					<div className='space-y-2'>
						<div className='bg-muted w-3/4 h-4'></div>
						<div className='bg-muted w-1/2 h-4'></div>
						<div className='bg-muted w-1/4 h-4'></div>
					</div>
				</div>
			))}
		</div>
	);
}

function TicketList({
	tickets,
	variants,
	itemVariants,
}: {
	tickets: TicketWithEvent[];
	variants: any;
	itemVariants: any;
}) {
	if (tickets.length === 0) {
		return (
			<div className='py-12 text-center'>
				<TicketIcon className='mx-auto w-12 h-12 text-muted-foreground' />
				<h3 className='mt-2 font-medium text-sm'>No tickets found</h3>
				<p className='mt-1 text-muted-foreground text-sm'>
					Check back later for upcoming events or browse past events.
				</p>
			</div>
		);
	}

	return (
		<motion.div
			variants={variants}
			initial='hidden'
			animate='visible'
			className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6'
		>
			{tickets.map((ticket) => (
				<motion.div key={ticket.id} variants={itemVariants}>
					<Card className='overflow-hidden'>
						<CardHeader className='p-0'>
							<Image src={ticket.event.coverPhoto} alt={ticket.event.name} className="w-full h-48 object-cover" width={500} height={500} />
						</CardHeader>
						<CardContent className='p-4'>
							<CardTitle>{ticket.event.name}</CardTitle>
							<div className='space-y-2 mt-2'>
								<div className='flex items-center text-sm'>
									<Calendar className='mr-2 w-4 h-4' />
									{new Date(ticket.createdAt).toLocaleDateString()}
								</div>
								<div className='flex items-center text-sm'>
									<Clock className='mr-2 w-4 h-4' />
									{new Date(ticket.event.startDate).toLocaleTimeString()}
								</div>
								<div className='flex items-center text-sm'>
									<MapPin className='mr-2 w-4 h-4' />
									{ticket.event.venueName}
								</div>
							</div>
						</CardContent>
						<CardFooter className='gap-4 grid grid-cols-2'>
							<Dialog>
								<DialogTrigger asChild>
									<Button variant='outline' size='sm'>
										<Eye className='mr-2 w-4 h-4' />
										View Details
									</Button>
								</DialogTrigger>
								<DialogContent className='sm:max-w-[700px] max-h-[90vh] overflow-y-auto'>
									<DialogHeader>
										<DialogTitle className='text-2xl'>
											{ticket.eventId}
										</DialogTitle>
									</DialogHeader>
									<div className='gap-6 grid py-4'>
										<div className='gap-2 grid'>
											<h3 className='font-semibold text-lg'>
												Event Description
											</h3>
											<p className='text-gray-500 text-sm dark:text-gray-400'>
												Description not available
											</p>
										</div>
										<Separator />
										<div className='gap-4 grid sm:grid-cols-2'>
											<div>
												<h3 className='mb-2 font-semibold text-lg'>
													Event Details
												</h3>
												<div className='space-y-2'>
													<div className='flex items-center text-sm'>
														<Calendar className='mr-2 w-4 h-4' />
														<span>Start Date not available</span>
													</div>
													<div className='flex items-center text-sm'>
														<Clock className='mr-2 w-4 h-4' />
														<span>Start Time not available</span>
													</div>
													<div className='flex items-center text-sm'>
														<MapPin className='mr-2 w-4 h-4' />
														<span>Venue not available</span>
													</div>
													<div className='flex items-center text-sm'>
														<DollarSign className='mr-2 w-4 h-4' />
														<span>Price not available</span>
													</div>
													<div className='flex items-center text-sm'>
														<Users className='mr-2 w-4 h-4' />
														<span>Tickets sold not available</span>
													</div>
												</div>
											</div>
											<div>
												<h3 className='mb-2 font-semibold text-lg'>
													Ticket Information
												</h3>
												<div className='space-y-2'>
													<div className='flex items-center text-sm'>
														<Ticket className='mr-2 w-4 h-4' />
														<span>Token ID: {ticket.tokenId}</span>
													</div>
													<div className='flex items-center text-sm'>
														<Info className='mr-2 w-4 h-4' />
														<span>Status: {ticket.status}</span>
													</div>
													<div className='flex items-center text-sm'>
														<Calendar className='mr-2 w-4 h-4' />
														<span>
															Purchased:{" "}
															{new Date(ticket.createdAt).toLocaleString()}
														</span>
													</div>
												</div>
											</div>
										</div>
										<Separator />
										<div>
											<h3 className='mb-2 font-semibold text-lg'>Organizer</h3>
											<div className='space-y-2'>
												<div className='flex items-center text-sm'>
													<User className='mr-2 w-4 h-4' />
													<span>Organizer name not available</span>
												</div>
												<div className='flex items-center text-sm'>
													<Info className='mr-2 w-4 h-4' />
													<span>Organizer email not available</span>
												</div>
											</div>
										</div>
										<Separator />
										<div>
											<h3 className='mb-2 font-semibold text-lg'>QR Code</h3>
											<Image
												src='/placeholder.png'
												alt='QR Code'
												width={200}
												height={200}
												className='mx-auto'
											/>
										</div>
									</div>
								</DialogContent>
							</Dialog>
							{/* <Button variant='outline' size='sm'>
								<Download className='mr-2 w-4 h-4' />
								Download
							</Button>
							<Button variant='outline' size='sm'>
								<Eye className='mr-2 w-4 h-4' />
								View NFT
							</Button> */}
							<QRCodeModal ticket={ticket} />
						</CardFooter>
					</Card>
				</motion.div>
			))}
		</motion.div>
	);
}
