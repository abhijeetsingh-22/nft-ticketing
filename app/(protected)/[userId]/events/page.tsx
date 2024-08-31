import { Event } from "@prisma/client";
import { getEventsByOrganisationId } from "@/db/events";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { EventTools } from "../_components/EventTools";
import { EventsTable } from "../_components/EventsTable";
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

export default async function EventsPage({
	params,
}: {
	params: { userId: string };
}) {
	const { events } = await getEventsByOrganisationId(params.userId);

	return (
		<ContentLayout title='Events'>
			<Breadcrumb className=''>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href='/'>Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>All Events</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<div className='mt-10 space-y-4'>
				<EventTools userId={params.userId} />
				<EventsTable events={events as Event[]} userId={params.userId} />
			</div>
		</ContentLayout>
	);
}
