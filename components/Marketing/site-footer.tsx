import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import { Ticket } from "lucide-react";
import Link from "next/link";

const footerNavs = [
	{
		label: "Product",
		items: [
			{
				href: "/login",
				name: "Create an Event",
			},
			{
				href: "/dashboard",
				name: "Analytics",
			},
			{
				href: "/faq",
				name: "FAQ",
			},
		],
	},

	{
		label: "Community",
		items: [
			{
				href: "/events",
				name: "Explore Events",
			},
			{
				href: "/nft-details?nftAddress=",
				name: "Check your NFTs",
			},
			{
				href: "mailto:pta.rohit28@gmail.com",
				name: "Email",
			},
		],
	},
	{
		label: "Team behind Minttix",
		items: [
			{
				href: "https://x.com/amabhijeetsingh",
				name: "Abhijeet",
			},
			{
				href: "https://x.com/Lokesh1jha",
				name: "Lokesh",
			},
			{
				href: "https://x.com/whyrohitwhy",
				name: "Rohit",
			},
		],
	},
];

export function SiteFooter() {
	return (
		<footer>
			<div className='mx-auto xl:pb-2 w-full max-w-screen-xl'>
				<div className='md:flex md:justify-between gap-4 px-8 py-16 p-4 sm:pb-16'>
					<div className='flex flex-col gap-4 mb-12'>
						<Link className='flex items-center text-md' href='/'>
							<Ticket className='w-6 h-6 text-purple-600/70 dark:text-purple-400/70' />
							<span className='ml-2'>Minttix</span>
						</Link>
						<p className='max-w-xs'>NFT Tickets for Events</p>
					</div>
					<div className='gap-8 sm:gap-10 grid grid-cols-1 sm:grid-cols-3'>
						{footerNavs.map((nav) => (
							<div key={nav.label}>
								<h2 className='mb-6 font-medium text-gray-900 text-sm dark:text-white uppercase tracking-tighter'>
									{nav.label}
								</h2>
								<ul className='gap-2 grid'>
									{nav.items.map((item) => (
										<li key={item.name}>
											<Link
												href={item.href}
												className='font-[450] text-gray-400 text-sm hover:text-gray-200 duration-200 cursor-pointer'
											>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className='flex sm:flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 border-neutral-700/20 px-8 py-4 rounded-md'>
					{/* <div className='flex sm:justify-center space-x-5 sm:mt-0'>
						{footerSocials.map((social) => (
							<Link
								key={social.name}
								href={social.href}
								className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-600 fill-gray-500 hover:fill-gray-900 dark:hover:fill-gray-600'
							>
								{social.icon}
								<span className='sr-only'>{social.name}</span>
							</Link>
						))}
					</div> */}
					<span className='text-gray-500 text-sm sm:text-center dark:text-gray-400'>
						Copyright © {new Date().getFullYear()}{" "}
						<Link href='/' className='cursor-pointer'>
							Minttix
						</Link>
						. All Rights Reserved.
					</span>
				</div>
			</div>
		</footer>
	);
}
