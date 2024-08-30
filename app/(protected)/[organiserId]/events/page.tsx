
import { Event } from '@prisma/client';
import { getEventsByOrganisationId } from '@/db/events';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { TicketTools } from '../_components/TicketTools';
import { EventsTable } from '../_components/EventsTable';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";


export default async function EventsPage({ params }: { params: { organiserId: string } }) {
    const { events } = await getEventsByOrganisationId(params.organiserId);

    return (
        <ContentLayout title='Events'>
            <Breadcrumb className=''>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>All Events</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='mt-10 space-y-4'>
                <TicketTools organiserId={params.organiserId} />
                <EventsTable events={events as Event[]} organiserId={params.organiserId} />
            </div>
        </ContentLayout>
    )
}