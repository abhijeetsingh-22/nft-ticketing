import { getAllPublicEvents } from '@/db/events';
import AllEvents from './_components/AllEvents';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Suspense } from 'react';
import { FiltersSkeleton } from './_components/Filters';
import { Skeleton } from '@/components/ui/skeleton';
import { EventCardSkeleton } from './_components/EventCard';

export default async function Events() {
  const { events } = await getAllPublicEvents();
  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white p-4 md:p-8 min-h-screen text-gray-900">
        <Suspense fallback={
          <div className="flex lg:flex-row flex-col gap-8">
            <aside className="w-full lg:w-1/4">
              <FiltersSkeleton />
            </aside>
            <section className="space-y-6 w-full lg:w-3/4">
              <Skeleton className="w-full h-10" />
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <EventCardSkeleton key={item} />
                ))}
              </div>
            </section>
          </div>
        }>
          <AllEvents initialEvents={events || []} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}


