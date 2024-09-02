import { getAllPublicEvents } from "@/db/events";
import AllEvents from "./_components/AllEvents";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Suspense } from "react";
import { FiltersSkeleton } from "./_components/Filters";
import { Skeleton } from "@/components/ui/skeleton";
import { EventCardSkeleton } from "./_components/EventCard";
import { getUserById } from "@/db/users";

export default async function Events() {
	const { events } = await getAllPublicEvents();

	const eventsWithOrganizer = events?.map((event) => {
		return {
			...event,
			organizer: getOrganizerById(event.organizerId),
		};
	});

	async function getOrganizerById(id: string) {
		const user = await getUserById(id);
		return user?.name || null;
	}

	return (
		<MaxWidthWrapper className='mx-auto mt-8 !px-8 max-w-[94rem]'>
			<div className='p-4 md:p-8 min-h-screen text-gray-900 dark:text-gray-100'>
				<Suspense
					fallback={
						<div className='flex lg:flex-row flex-col gap-8'>
							<aside className='w-full lg:w-1/4'>
								<FiltersSkeleton />
							</aside>
							<section className='space-y-6 w-full lg:w-3/4'>
								<Skeleton className='w-full h-10' />
								<div className='space-y-6'>
									{[1, 2, 3].map((item) => (
										<EventCardSkeleton key={item} />
									))}
								</div>
							</section>
						</div>
					}
				>
					<AllEvents initialEvents={eventsWithOrganizer || []} />
				</Suspense>
			</div>
		</MaxWidthWrapper>
	);
}
