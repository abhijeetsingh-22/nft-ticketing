import { ContentLayout } from "@/components/admin-panel/content-layout";
import EventsForm from "../../_components/EventsForm";
import { getEventBySlug } from "@/db/events";

const UpdateEventPage = async ({
	params,
}: {
	params: { userId: string; "event-slug": string };
}) => {
	const { event } = await getEventBySlug(params["event-slug"]);
	return (
		<ContentLayout title='Update Event'>
			<EventsForm userId={params.userId} event={event as unknown as Event} />
		</ContentLayout>
	);
};

export default UpdateEventPage;
