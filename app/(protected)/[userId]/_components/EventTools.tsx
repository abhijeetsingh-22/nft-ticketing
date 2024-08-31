"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle, Printer } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
	userId: string;
};

export const EventTools = ({ userId }: Props) => {
	const router = useRouter();
	return (
		<div className='flex flex-wrap justify-between'>
			<h3 className='mt-0 border-none font-semibold text-3xl capitalize'>
				{" "}
				My Events
			</h3>

			<div className='flex *:flex justify-between gap-4 *:gap-2 w-full md:w-fit'>
				<Link
					href={`/${userId}/events/new`}
					className={cn(buttonVariants({ variant: "default" }))}
				>
					<PlusCircle className='size-4' />
					New Event
				</Link>
			</div>
		</div>
	);
};
