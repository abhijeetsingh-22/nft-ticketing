import Link from 'next/link'
import Image from 'next/image'
import EventsList from './_components/EventsList';
import { getAllPublicEvents } from '@/db/events';
import AllEvents from './_components/AllEvents';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';



export default async function Events() {
  const { events } = await getAllPublicEvents();
  return (
    // <EventsList events={events || []} />
    <MaxWidthWrapper className="bg-white">

      <AllEvents initialEvents={events || []} />
    </MaxWidthWrapper>
  );
}
