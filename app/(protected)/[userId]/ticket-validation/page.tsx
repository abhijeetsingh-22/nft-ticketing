import { TicketValidation } from "@/components/ticket-validation";
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
import { getEventsByOrganisationId } from "@/db/events";

export default async function TicketValidationPage({ params }: { params: { userId: string } }) {
	const events = await getEventsByOrganisationId(params.userId);

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
				<TicketValidation events={events.events ?? []} />
			</div>
		</ContentLayout>
	);
}
