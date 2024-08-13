'use client';

/*
*
* For edit, create new, delete => Popup window will be there which will take asction
* Currently links are there need to replace that 
*
*/
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Event {
    id: number;
    name: string;
    date: string;
    location: string;
    image: string;
    description: string;
    // organisationId: string;
}

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    /*
    useEffect(() => {
        // Fetch all events created by the organizer
        const fetchEvents = async () => {
            try {
                const res = await fetch('/api/events/organisationId', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                setEvents(data.events);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);
    */

    useEffect(() => {
        const Hardcodedevents: Event[] = [
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
    
          setEvents(Hardcodedevents)
          setIsLoading(false)
    }, [])
    
    const handleDelete = async (eventId: number) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            });
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Events</h1>
                <Link href="/organizer/create-event">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Create New Event</button>
                </Link>
            </div>

            {isLoading ? (
                <p>Loading events...</p>
            ) : events.length === 0 ? (
                <p>No events found.</p>
            ) : (
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border-b-2 py-2 text-left">Name</th>
                            <th className="border-b-2 py-2 text-left">Date</th>
                            <th className="border-b-2 py-2 text-left">Description</th>
                            <th className="border-b-2 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td className="border-b py-2">{event.name}</td>
                                <td className="border-b py-2">{new Date(event.date).toLocaleDateString()}</td>
                                <td className="border-b py-2">{event.description}</td>
                                <td className="border-b py-2 text-right">
                                    <Link href={`/organizer/edit-event/${event.id}`}>
                                        <button className="text-blue-500 mr-2">Edit</button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(event.id)}
                                        className="text-red-500"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};
