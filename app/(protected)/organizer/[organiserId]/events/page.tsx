
import { EventsTable } from '../../_components/EventsTable';
import { Event } from '@prisma/client';
import { getEventsByOrganisationId } from '@/db/events';
import { TicketTools } from '../../_components/TicketTools';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';



export default async function EventsPage({ params }: { params: { organiserId: string } }) {
    const { events } = await getEventsByOrganisationId(params.organiserId);
    // console.log(events)

    return (
        <MaxWidthWrapper className='mt-10'>
            <TicketTools organiserId={params.organiserId} />
            <EventsTable events={events as Event[]} organiserId={params.organiserId} />
        </MaxWidthWrapper>
    )
    // const [events, setEvents] = useState<Event[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    // const router = useRouter();

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

    // useEffect(() => {
    //     setEvents(Hardcodedevents);
    //     setIsLoading(false);
    // }, []);

    // const handleCreateEvent = () => {
    //     router.push('/organizer/events/new');
    // };

    // const handleEditEvent = (updatedEvent: Event) => {
    //     setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    //     setSelectedEvent(null);
    // };

    // const handleDeleteEvent = async () => {
    //     if (selectedEvent) {
    //         try {
    //             await fetch(`/api/events/${selectedEvent.id}`, {
    //                 method: 'DELETE',
    //             });
    //             setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEvent.id));
    //             setSelectedEvent(null);
    //         } catch (error) {
    //             console.error('Error deleting event:', error);
    //         }
    //     }
    // };

    // return (
    //     <div className="mx-auto mt-10 container">
    //         <div className="flex justify-between items-center mb-6">
    //             <h1 className="font-bold text-3xl">Your Events</h1>
    //             <Button onClick={handleCreateEvent}>Create Event</Button>
    //         </div>

    //         {isLoading ? (
    //             <p>Loading events...</p>
    //         ) : events.length === 0 ? (
    //             <p>No events found.</p>
    //         ) : (
    //             <table className="border-collapse w-full">
    //                 <thead>
    //                     <tr>
    //                         <th className="py-2 border-b-2 text-left">Name</th>
    //                         <th className="py-2 border-b-2 text-left">Date</th>
    //                         <th className="py-2 border-b-2 text-left">Time</th>
    //                         {/* <th className="py-2 border-b-2 text-left">Description</th> */}
    //                         <th className="py-2 border-b-2 text-left">Location</th>
    //                         <th className="text-right py-2 border-b-2">Actions</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {events.map((event: Event) => (
    //                         <tr key={event.id}>
    //                             <td className="py-2 border-b">{event.name}</td>
    //                             <td className="py-2 border-b">{new Date(event.date).toLocaleDateString()}</td>
    //                             <td className="py-2 border-b">{event.startTime} - {event.endTime}</td>
    //                             {/* <td className="py-2 border-b">{event.description}</td> */}
    //                             <td className="py-2 border-b">{event.location}</td>
    //                             <td className="text-right space-x-4 py-2 border-b">
    //                                 <EditEvent event={event} onEdit={handleEditEvent} />
    //                                 <DeleteEvent event={event} onDelete={handleDeleteEvent} />
    //                             </td>
    //                         </tr>
    //                     ))}
    //                 </tbody>
    //             </table>
    //         )}
    //     </div>
    // );
}
