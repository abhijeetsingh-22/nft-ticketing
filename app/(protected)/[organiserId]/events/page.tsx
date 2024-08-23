
import { Event } from '@prisma/client';
import { getEventsByOrganisationId } from '@/db/events';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { TicketTools } from '../_components/TicketTools';
import { EventsTable } from '../_components/EventsTable';



export default async function EventsPage({ params }: { params: { organiserId: string } }) {
    const { events } = await getEventsByOrganisationId(params.organiserId);

    return (
        <MaxWidthWrapper className='mt-10'>
            <TicketTools organiserId={params.organiserId} />
            <EventsTable events={events as Event[]} organiserId={params.organiserId} />
        </MaxWidthWrapper>
    )
}