import EventsForm from '../../../_components/EventsForm'
import { getEventBySlug } from '@/db/events'

const UpdateEventPage = async ({ params }: { params: { organiserId: string, "event-slug": string } }) => {
  const { event } = await getEventBySlug(params["event-slug"])
  return (
    <EventsForm organiserId={params.organiserId} event={event as unknown as Event} />
  )
}

export default UpdateEventPage