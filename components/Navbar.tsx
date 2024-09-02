"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { AlignJustify, ArrowRight, Ticket, XIcon } from "lucide-react";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useContext, useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { UserNavMenu } from "./UserNavMenu";
import { LoggedInUserContext } from "@/contexts/LoggedInUserContext";
import { Routes } from "@/routes";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
	mobilenavbarVariant,
	mobileLinkVar,
	containerVariants,
} from "./framer-varients";

// export const Prev = () => {
// 	return (
// 		<header className='top-0 z-50 sticky inset-x-0 flex items-center border-gray-200 dark:border-gray-800 bg-white bg-white/75 dark:bg-gray-900 opacity-100 shadow-sm dark:shadow-gray-800 backdrop-blur-lg px-4 lg:px-6 border-b w-full h-14 transform transition-all translate-y-0 duration-300 ease-in-out'>
// 			<MaxWidthWrapper className='flex justify-between items-center mx-auto max-w-[94rem]'>
// 				<Link className='flex justify-center items-center' href='/'>
// 					<Ticket className='w-6 h-6 text-purple-600 dark:text-purple-400' />
// 					<span className='ml-2 font-bold text-xl'>Minttix</span>
// 				</Link>
// 				<nav className='md:flex gap-4 sm:gap-6 hidden ml-auto'>
// 					{!isAuth ? (
// 						<div className='md:flex gap-4 sm:gap-6 hidden ml-auto'>
// 							<Link
// 								className='flex items-center font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
// 								href='#features'
// 							>
// 								Features
// 							</Link>
// 							<Link
// 								className='flex items-center font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
// 								href='#how-it-works'
// 							>
// 								How It Works
// 							</Link>
// 							<Link
// 								className='flex items-center font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
// 								href='/events'
// 							>
// 								<span className='flex items-center'>Events</span>
// 							</Link>
// 							<Link
// 								href='/login'
// 								className={buttonVariants({
// 									size: "sm",
// 								})}
// 							>
// 								Get started <ArrowRight className='ml-1.5 w-5 h-5' />
// 							</Link>
// 						</div>
// 					) : (
// 						<div className='flex items-center gap-4'>
// 							<Link href={Routes.DASHBOARD}>Dashboard</Link>
// 							<ConnectWalletButton />
// 							<UserNavMenu user={user} />
// 						</div>
// 					)}

// 					<ModeToggle />
// 				</nav>
// 			</MaxWidthWrapper>
// 		</header>
// 	);
// };

export const menuItem = [
	{
		id: 1,
		label: "Features",
		href: "/features",
	},
	{
		id: 2,
		label: "Pricing",
		href: "#",
	},
	{
		id: 3,
		label: "Careers",
		href: "#",
	},
	{
		id: 4,
		label: "Contact Us",
		href: "#",
	},
];

export function Navbar() {
	const { user } = useContext(LoggedInUserContext);
	const isAuth = !!user;
	const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);

	useEffect(() => {
		const html = document.querySelector("html");
		if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
	}, [hamburgerMenuIsOpen]);

	useEffect(() => {
		const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);
		window.addEventListener("orientationchange", closeHamburgerNavigation);
		window.addEventListener("resize", closeHamburgerNavigation);

		return () => {
			window.removeEventListener("orientationchange", closeHamburgerNavigation);
			window.removeEventListener("resize", closeHamburgerNavigation);
		};
	}, [setHamburgerMenuIsOpen]);

	return (
		<>
			<header className='top-0 left-0 z-50 fixed opacity-0 backdrop-blur-[12px] border-b w-full translate-y-[-1rem] animate-fade-in [--animation-delay:600ms]'>
				<div className='flex justify-between items-center w-full h-[3.5rem] container'>
					<Link className='flex items-center text-md' href='/'>
						<Ticket className='w-6 h-6 text-purple-600/70 dark:text-purple-400/70' />
						<span className='ml-2'>Minttix</span>
					</Link>

					<div className='flex justify-center items-center gap-4 h-full'>
						{!isAuth ? (
							<div className='md:flex gap-4 sm:gap-6 hidden ml-auto'>
								<Link
									className='flex items-center font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
									href='/events'
								>
									<span className='flex items-center'>Events</span>
								</Link>

								<Link
									className={cn(
										buttonVariants({ variant: "secondary" }),
										"mr-6 text-sm"
									)}
									href='/login'
								>
									Login <ArrowRight className='ml-1.5 w-5 h-5' />
								</Link>
							</div>
						) : (
							<div className='flex items-center gap-4'>
								<Link href={Routes.DASHBOARD}>Dashboard</Link>
								<ConnectWalletButton />
								<ModeToggle />
								<UserNavMenu user={user} />
							</div>
						)}
					</div>

					<button
						className='md:hidden ml-6'
						onClick={() => setHamburgerMenuIsOpen((open) => !open)}
					>
						<span className='sr-only'>Toggle menu</span>
						{hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
					</button>
				</div>
			</header>
			<MobileNavbar
				hamburgerMenuIsOpen={hamburgerMenuIsOpen}
				setHamburgerMenuIsOpen={setHamburgerMenuIsOpen}
			/>
		</>
	);
}

const MobileNavbar = ({
	hamburgerMenuIsOpen,
	setHamburgerMenuIsOpen,
}: {
	hamburgerMenuIsOpen: boolean;
	setHamburgerMenuIsOpen: (open: boolean) => void;
}) => {
	return (
		<AnimatePresence>
			<motion.nav
				initial='initial'
				exit='exit'
				variants={mobilenavbarVariant}
				animate={hamburgerMenuIsOpen ? "animate" : "exit"}
				className={cn(
					`fixed left-0 top-0 z-50 h-screen w-full overflow-auto bg-background/70 backdrop-blur-[12px] `,
					{
						"pointer-events-none": !hamburgerMenuIsOpen,
					}
				)}
			>
				<div className='flex justify-between items-center h-[3.5rem] container'>
					<Link className='flex items-center text-md' href='/'>
						Magic UI
					</Link>

					<button
						className='md:hidden ml-6'
						onClick={() => setHamburgerMenuIsOpen(!hamburgerMenuIsOpen)}
					>
						<span className='sr-only'>Toggle menu</span>
						{hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
					</button>
				</div>
				<motion.ul
					className={`flex flex-col md:flex-row md:items-center uppercase md:normal-case ease-in`}
					variants={containerVariants}
					initial='initial'
					animate={hamburgerMenuIsOpen ? "open" : "exit"}
				>
					{menuItem.map((item) => (
						<motion.li
							variants={mobileLinkVar}
							key={item.id}
							className='border-grey-dark py-0.5 pl-6 border-b md:border-none'
						>
							<Link
								className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${
									hamburgerMenuIsOpen ? "[&_a]:translate-y-0" : ""
								}`}
								href={item.href}
							>
								{item.label}
							</Link>
						</motion.li>
					))}
				</motion.ul>
			</motion.nav>
		</AnimatePresence>
	);
};

export default Navbar;
