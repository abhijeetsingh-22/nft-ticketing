import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
	title: string;
}

export function Navbar({ title }: NavbarProps) {
	return (
		<header className='top-0 z-10 sticky bg-background/95 shadow dark:shadow-secondary backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full'>
			<div className='flex items-center mx-4 sm:mx-8 h-14'>
				<div className='flex items-center space-x-4 lg:space-x-0'>
					<SheetMenu />
					<h1 className='font-bold'>{title}</h1>
				</div>
				<div className='flex flex-1 justify-end items-center space-x-2'>
					<Link
						className={cn(
							buttonVariants({ variant: "link" }),
							"dark:text-white text-black"
						)}
						href='/'
					>
						Home
					</Link>
					<ModeToggle />
				</div>
			</div>
		</header>
	);
}
