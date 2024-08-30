"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight, Github, Moon, Sun, Ticket } from "lucide-react";
import MobileNav from "./MobileNav";
import SignOutButton from "./auth/SignOutButton";
import { auth } from "@/auth";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
	// const [darkMode, setDarkMode] = useState(false);

	// useEffect(() => {
	// 	if (darkMode) {
	// 		document.documentElement.classList.add("dark");
	// 	} else {
	// 		document.documentElement.classList.remove("dark");
	// 	}
	// }, [darkMode]);

	// const toggleDarkMode = () => {
	// 	setDarkMode(!darkMode);
	// };

	return (
		<header className='top-0 z-50 sticky inset-x-0 flex items-center border-gray-200 dark:border-gray-800 bg-white bg-white/75 dark:bg-gray-900 opacity-100 shadow-sm dark:shadow-gray-800 backdrop-blur-lg px-4 lg:px-6 border-b w-full h-14 transform transition-all translate-y-0 duration-300 ease-in-out'>
			<MaxWidthWrapper className='flex justify-between items-center mx-auto max-w-[94rem]'>
				<Link className='flex justify-center items-center' href='#'>
					<Ticket className='w-6 h-6 text-purple-600 dark:text-purple-400' />
					<span className='ml-2 font-bold text-xl'>Minttix</span>
				</Link>
				<nav className='md:flex gap-4 sm:gap-6 hidden ml-auto'>
					<Link
						className='font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
						href='#features'
					>
						Features
					</Link>
					<Link
						className='font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
						href='#how-it-works'
					>
						How It Works
					</Link>
					<Link
						className='font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
						href='#events'
					>
						Events
					</Link>
					<Link
						className='font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
						href='#contact'
					>
						Contact
					</Link>
				</nav>
				<ModeToggle />
				{/* <Button
					className='ml-4'
					variant='ghost'
					size='icon'
					onClick={toggleDarkMode}
				>
					{darkMode ? (
						<Sun className='w-5 h-5' />
					) : (
						<Moon className='w-5 h-5' />
					)}
					<span className='sr-only'>Toggle theme</span>
				</Button>
				<Button className='md:hidden ml-2' variant='ghost' size='icon'>
					<Ticket className='w-6 h-6' />
					<span className='sr-only'>Toggle menu</span>
				</Button> */}
			</MaxWidthWrapper>
		</header>
		// <nav className="top-0 z-30 sticky inset-x-0 border-gray-200 bg-white/75 backdrop-blur-lg border-b w-full h-14 transition-all">
		// 	<MaxWidthWrapper>
		// 		<div className="flex justify-between items-center border-zinc-200 border-b h-14">
		// 			<Link
		// 				href="/"
		// 				className="z-40 flex items-center gap-2 font-semibold"
		// 			>
		// 				<Image
		// 					src="/logos/icon.png"
		// 					alt="MintTix"
		// 					width={30}
		// 					height={30}
		// 				/>
		// 				<span>MintTix</span>
		// 			</Link>

		// 			<MobileNav isAuth={isAuth} />

		// 			<div className="sm:flex items-center space-x-4 hidden">
		// 				<Link
		// 					href="/events"
		// 					className={buttonVariants({
		// 						variant: "ghost",
		// 						size: "sm",
		// 					})}
		// 				>
		// 					All Events
		// 				</Link>

		// 				{!isAuth ? (
		// 					<>
		// 						{/* <Link
		//               target='_blank'
		//               href='https://github.com/abhijeetsingh-22/nft-ticketing'
		//               className={buttonVariants({
		//                 variant: 'ghost',
		//                 size: 'sm',
		//               })}>
		//               <Github className='w-5 h-5' />
		//             </Link> */}
		// 						{/* <Link
		//               href='/login'
		//               className={buttonVariants({
		//                 variant: 'ghost',
		//                 size: 'sm',
		//               })}>
		//               Sign in
		//             </Link> */}
		// 						{/* <ConnectWalletButton /> */}
		// 						<Link
		// 							href="/signup"
		// 							className={buttonVariants({
		// 								size: "sm",
		// 							})}
		// 						>
		// 							Get started <ArrowRight className="ml-1.5 w-5 h-5" />
		// 						</Link>
		// 					</>
		// 				) : (
		// 					<>
		// 						{
		// 							<Link
		// 								href={`/${session?.user?.id}/events`}
		// 								className={buttonVariants({
		// 									variant: "ghost",
		// 									size: "sm",
		// 								})}
		// 							>
		// 								My Events
		// 							</Link>
		// 						}
		// 						<Link
		// 							className="cursor-pointer"
		// 							href="/profile"
		// 						>
		// 							{session?.user?.name || session?.user?.email?.split('@')[0]}
		// 						</Link>
		// 						<ConnectWalletButton />
		// 						<SignOutButton />
		// 					</>
		// 				)}
		// 			</div>
		// 		</div>
		// 	</MaxWidthWrapper>
		// </nav>
	);
};

export default Navbar;
