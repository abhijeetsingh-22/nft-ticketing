"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { buttonVariants } from "./ui/button";
import { ArrowRight, Ticket } from "lucide-react";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import { useContext } from "react";
import { ModeToggle } from "./mode-toggle";
import { UserNavMenu } from "./UserNavMenu";
import { LoggedInUserContext } from "@/contexts/LoggedInUserContext";
import { Routes } from "@/routes";

const Navbar = () => {
	const session = useSession();
	const [isAuth, setIsAuth] = useState(false);

	useEffect(() => {
		if (session.status === "authenticated") {
			setIsAuth(true);
		}
	}, [session.status]);
	return (
		<header className='top-0 z-50 sticky inset-x-0 flex items-center border-gray-200 dark:border-gray-800 bg-white bg-white/75 dark:bg-gray-900 opacity-100 shadow-sm dark:shadow-gray-800 backdrop-blur-lg px-4 lg:px-6 border-b w-full h-14 transform transition-all translate-y-0 duration-300 ease-in-out'>
			<MaxWidthWrapper className='flex justify-between items-center mx-auto max-w-[94rem]'>
				<Link className='flex justify-center items-center' href='/'>
					<Ticket className='w-6 h-6 text-purple-600 dark:text-purple-400' />
					<span className='ml-2 font-bold text-xl'>Minttix</span>
				</Link>
				<nav className='md:flex gap-4 sm:gap-6 hidden ml-auto'>
					{!isAuth ? (
						<div className='md:flex gap-4 sm:gap-6 hidden ml-auto'>
							<Link
								className='flex items-center font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
								href='#features'
							>
								Features
							</Link>
							<Link
								className='flex items-center font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
								href='#how-it-works'
							>
								How It Works
							</Link>
							<Link
								className='flex items-center font-medium text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
								href='/events'
							>
								<span className='flex items-center'>Events</span>
							</Link>
							<Link
								href='/login'
								className={buttonVariants({
									size: "sm",
								})}
							>
								Get started <ArrowRight className='ml-1.5 w-5 h-5' />
							</Link>
						</div>
					) : (
						<div className='flex items-center gap-4'>
							<Link href={Routes.DASHBOARD}>Dashboard</Link>
							<ConnectWalletButton />
							<UserNavMenu user={session?.data?.user} />
						</div>
					)}

					<ModeToggle />
				</nav>
			</MaxWidthWrapper>
		</header>
	);
};

export default Navbar;
