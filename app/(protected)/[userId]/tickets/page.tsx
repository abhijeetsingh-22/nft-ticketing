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
import { TicketsTable } from "./_components/TicketsTable";
import { TicketTools } from "./_components/TicketTools";
import { getTicketsByUserId } from "@/db/ticket";
import MyTickets from "@/components/my-tickets";

export default async function TicketsPage({
	params,
}: {
	params: { userId: string };
}) {
	const { tickets } = await getTicketsByUserId(params.userId);
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
