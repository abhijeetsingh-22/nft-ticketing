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
	Ticket as TicketIcon,
	Calendar,
	MapPin,
	Clock,
	Download,
	Eye,
} from "lucide-react";
import { Ticket as PrismaTicket } from "@prisma/client";
import { useTheme } from "next-themes";

export default function MyTickets({
	allTickets,
}: {
	allTickets: PrismaTicket[];
}) {
	const { theme, setTheme } = useTheme();
	const [activeTab, setActiveTab] = useState("all");
	const [tickets, setTickets] = useState<PrismaTicket[]>(allTickets);

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
		<div className='bg-background min-h-screen text-foreground'>
			<main className='mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl'>
				<Tabs
					defaultValue='all'
					className='w-full'
					onValueChange={setActiveTab}
				>
					<TabsList className='gap-4 grid grid-cols-3 bg-muted p-2 rounded-xl w-full'>
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
						<TicketList
							tickets={tickets}
							variants={containerVariants}
							itemVariants={itemVariants}
						/>
					</TabsContent>
					<TabsContent value='upcoming'>
						<TicketList
							tickets={tickets}
							variants={containerVariants}
							itemVariants={itemVariants}
						/>
					</TabsContent>
					<TabsContent value='past'>
						<TicketList
							tickets={tickets}
							variants={containerVariants}
							itemVariants={itemVariants}
						/>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}

function TicketList({
	tickets,
	variants,
	itemVariants,
}: {
	tickets: PrismaTicket[];
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
							{/* Placeholder for image - you might want to add this to your Ticket type */}
							<div className='bg-muted w-full h-48'></div>
						</CardHeader>
						<CardContent className='p-4'>
							<CardTitle>{ticket.eventId}</CardTitle>
							<div className='space-y-2 mt-2'>
								<div className='flex items-center text-sm'>
									<Calendar className='mr-2 w-4 h-4' />
									{ticket.createdAt.toLocaleDateString()}
								</div>
								<div className='flex items-center text-sm'>
									<Clock className='mr-2 w-4 h-4' />
									{ticket.createdAt.toLocaleTimeString()}
								</div>
								<div className='flex items-center text-sm'>
									<MapPin className='mr-2 w-4 h-4' />
									{ticket.status}
								</div>
							</div>
						</CardContent>
						<CardFooter className='flex justify-between'>
							<Button variant='outline' size='sm'>
								<Eye className='mr-2 w-4 h-4' />
								View Details
							</Button>
							<Button variant='outline' size='sm'>
								<Download className='mr-2 w-4 h-4' />
								Download
							</Button>
						</CardFooter>
					</Card>
				</motion.div>
			))}
		</motion.div>
	);
}
