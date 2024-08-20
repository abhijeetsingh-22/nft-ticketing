import Link from 'next/link'
import Image from 'next/image'
import EventsList from './_components/EventsList';
import { getAllPublicEvents } from '@/db/events';

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  image: string;
  description: string;
}


export default async function Events() {
  const { events } = await getAllPublicEvents();
  return (
    <EventsList events={events || []} />
    // <div className='mx-auto px-6 py-12 container'>
    //   <h1 className='mb-12 font-bold text-4xl text-center'>Upcoming Events</h1>
    //   <div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
    //     {events.map((event) => (
    //       <div key={event.id} className='bg-white shadow-md rounded-lg overflow-hidden'>
    //         <Image
    //           src={event.image}
    //           alt={event.name}
    //           width={500}
    //           height={300}
    //           className='w-full h-48 object-cover'
    //         />
    //         <div className='p-6'>
    //           <h2 className='mb-2 font-semibold text-2xl'>{event.name}</h2>
    //           <p className='mb-4 text-gray-600'>{event.date}</p>
    //           <p className='mb-4 text-gray-600'>{event.location}</p>
    //           <p className='mb-4 text-gray-700'>{event.description}</p>
    //           <Link href={`/events/${event.id}`} className='text-blue-600 hover:underline'>
    //             Learn more
    //           </Link>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
