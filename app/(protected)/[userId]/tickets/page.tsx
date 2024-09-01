import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { getTicketsByUserId } from "@/db/ticket";
import MyTickets from "@/components/my-tickets";

export default async function TicketsPage({
	params,
}: {
	params: { userId: string };
}) {
	const { tickets } = await getTicketsByUserId(params.userId);
	// const sampleTickets: Ticket[] = Array.from({ length: 5 }, (_, index) => {
	// 	const isUpcoming = index < 3; // First 3 tickets are upcoming
	// 	return {
	// 		id: `ticket-${index + 1}`,
	// 		tokenId: `token-${index + 1}`,
	// 		eventId: `event-${index + 1}`,
	// 		createdAt: new Date(
	// 			Date.now() +
	// 				(isUpcoming
	// 					? index * 24 * 60 * 60 * 1000
	// 					: -((index - 2) * 24 * 60 * 60 * 1000))
	// 		), // Upcoming tickets are in the future, past tickets are in the past
	// 		status: isUpcoming ? "Upcoming" : "Past", // First 3 are 'Upcoming', last 2 are 'Past'
	// 		userId: "user-id-placeholder", // Placeholder for userId
	// 		orderId: "order-id-placeholder", // Placeholder for orderId
	// 		updatedAt: new Date(), // Current date for updatedAt
	// 		order: {
	// 			id: "order-id-placeholder",
	// 			userId: "user-id-placeholder",
	// 			createdAt: new Date(),
	// 			updatedAt: new Date(),
	// 			totalPrice: 0,
	// 			paymentMethod: "Credit Card",
	// 			paymentStatus: "Pending",
	// 		},
	// 		event: {
	// 			id: "event-id-placeholder",
	// 			name: "Event Name Placeholder",
	// 			description: "Event Description Placeholder",
	// 			startDate: new Date(),
	// 			endDate: new Date(),
	// 			venueName: "Venue Name Placeholder",
	// 			venueAddress: "Venue Address Placeholder",
	// 			zipCode: "Zip Code Placeholder",
	// 		},
	// 	};
	// });

	// const tickets = sampleTickets; // Use sample data for demonstration
	return (
		<ContentLayout title='My Tickets'>
			<Breadcrumb className=''>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href='/'>Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>My Tickets</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className='mt-10 space-y-4'>
				<MyTickets allTickets={tickets} />
			</div>
		</ContentLayout>
	);
}
