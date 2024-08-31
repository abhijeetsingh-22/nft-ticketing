import React from "react";
import EventsForm from "../../_components/EventsForm";
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

const NewEventPage = ({ params }: { params: { userId: string } }) => {
	return (
		<ContentLayout title='Create New Event'>
			<Breadcrumb className='mx-auto max-w-3xl'>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href='/'>Home</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink asChild>
							<Link href={`/${params.userId}/events`}>All Events</Link>
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>New Event</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			<EventsForm userId={params.userId} />
		</ContentLayout>
	);
};

export default NewEventPage;
