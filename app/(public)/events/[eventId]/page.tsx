import { z } from "zod";
import EventDetails from "./_components/EventDetails";
import { getEventById } from "@/db/events";
import { Event } from "@prisma/client";

const eventIdSchema = z.string().uuid();

interface EventDetailsPageProps {
	params: {
		eventId: string;
	};
}

const EventDetailsPage: React.FC<EventDetailsPageProps> = async ({
	params,
}) => {
	const { eventId } = params;

	const { event } = await getEventById(eventId);

	return (
		<>
			<EventDetails event={event as Event} />
		</>
	);
};

export default EventDetailsPage;
