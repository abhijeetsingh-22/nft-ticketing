"use client";
import { Button } from "@/components/ui/button";
import { PlusCircle, Printer } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
	userId: string;
};

export const TicketTools = ({ userId }: Props) => {
	const router = useRouter();
	return (
		<div className='flex flex-wrap justify-between'>
			<h3 className='mt-0 border-none font-semibold text-3xl capitalize'>
				{" "}
				My Events
			</h3>

			<div className='flex *:flex justify-between gap-4 *:gap-2 w-full md:w-fit'>
				<Button onClick={() => router.push(`/${userId}/events/new`)}>
					<PlusCircle className='size-4' />
					New Event
				</Button>
			</div>
		</div>
	);
};
