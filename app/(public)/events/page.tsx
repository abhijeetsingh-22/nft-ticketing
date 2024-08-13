import Link from 'next/link'
import Image from 'next/image'

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  image: string;
  description: string;
}

const events: Event[] = [
  {
    id: 1,
    name: 'Music Festival 2024',
    date: 'August 25, 2024',
    location: 'New York City, NY',
    image: '/music-festival.jpg',
    description: 'Join us for an unforgettable music experience with top artists from around the world.',
  },
  {
    id: 2,
    name: 'Tech Conference 2024',
    date: 'September 10, 2024',
    location: 'San Francisco, CA',
    image: '/tech-conference.jpg',
    description: 'Explore the latest advancements in technology and innovation at the Tech Conference 2024.',
  },
  {
    id: 3,
    name: 'Art Expo 2024',
    date: 'October 15, 2024',
    location: 'Paris, France',
    image: '/art-expo.jpg',
    description: 'Discover stunning artworks from renowned artists at the Art Expo 2024.',
  },
];

export default function Events() {
  return (
    <div className='container mx-auto px-6 py-12'>
      <h1 className='text-4xl font-bold text-center mb-12'>Upcoming Events</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {events.map((event) => (
          <div key={event.id} className='bg-white shadow-md rounded-lg overflow-hidden'>
            <Image
              src={event.image}
              alt={event.name}
              width={500}
              height={300}
              className='w-full h-48 object-cover'
            />
            <div className='p-6'>
              <h2 className='text-2xl font-semibold mb-2'>{event.name}</h2>
              <p className='text-gray-600 mb-4'>{event.date}</p>
              <p className='text-gray-600 mb-4'>{event.location}</p>
              <p className='text-gray-700 mb-4'>{event.description}</p>
              <Link href={`/events/${event.id}`} className='text-blue-600 hover:underline'>
                Learn more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
