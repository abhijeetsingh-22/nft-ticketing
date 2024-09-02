import { cn } from "@/lib/utils";
import {
	IconAdjustmentsBolt,
	IconCloud,
	IconCurrencyDollar,
	IconEaseInOut,
	IconHeart,
	IconHelp,
	IconRouteAltLeft,
	IconTerminal2,
	IconBolt,
	IconShieldCheck,
	IconArrowsExchange,
	IconPhoto,
	IconUsers,
	IconChartBar,
	IconTicket,
	IconLeaf,
} from "@tabler/icons-react";

export function FeaturesSection() {
	const features = [
		{
			title: "Instant NFT Minting",
			description:
				"Receive your unique NFT ticket instantly on the Solana blockchain when you make a purchase. Fast, efficient, and eco-friendly.",
			icon: <IconBolt />,
		},
		{
			title: "Fraud-Proof Ticketing",
			description:
				"Each NFT ticket is cryptographically secure and verifiable on-chain, eliminating counterfeits and ensuring authenticity.",
			icon: <IconShieldCheck />,
		},
		{
			title: "Seamless Resale Market",
			description:
				"Easily transfer or resell your NFT tickets with built-in royalties for event organizers, all powered by Solana's low-cost, high-speed network.",
			icon: <IconArrowsExchange />,
		},
		{
			title: "Collectible Memorabilia",
			description:
				"Your NFT ticket becomes a digital collectible after the event, preserving memories and potentially appreciating in value.",
			icon: <IconPhoto />,
		},
		{
			title: "Enhanced Fan Engagement",
			description:
				"Unlock exclusive content, backstage passes, or future discounts through your NFT ticket, creating a more immersive fan experience.",
			icon: <IconUsers />,
		},
		{
			title: "Real-Time Analytics",
			description:
				"Event organizers gain valuable insights with on-chain data, tracking ticket distribution and engagement in real-time.",
			icon: <IconChartBar />,
		},
		{
			title: "Multi-Event Functionality",
			description:
				"One NFT can grant access to multiple events or experiences, perfect for festivals or season passes.",
			icon: <IconTicket />,
		},
		{
			title: "Eco-Friendly Solution",
			description:
				"Leverage Solana's energy-efficient blockchain to reduce the environmental impact of traditional paper or plastic ticketing.",
			icon: <IconLeaf />,
		},
	];
	return (
		<section className='my-20 py-14'>
			<div className='flex flex-col items-center gap-2 space-y-4 mx-auto my-14 md:px-8r max-w-[63rem] text-center'>
				<h1 className='font-bold text-6xl'>The Future of ticketing</h1>
				<span className='text-gray-500 text-xl'>
					More visibility, greater control, traceable ownership. A
					next-generation event ticketing platform that lets you engage with
					your customers and provide a more immersive experience in ways never
					before possible. You make the rules.
				</span>
			</div>
			<div className='relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto py-10 max-w-7xl'>
				{features.map((feature, index) => (
					<Feature key={feature.title} {...feature} index={index} />
				))}
			</div>
		</section>
	);
}

const Feature = ({
	title,
	description,
	icon,
	index,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
				(index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
				index < 4 && "lg:border-b dark:border-neutral-800"
			)}
		>
			{index < 4 && (
				<div className='absolute inset-0 bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100 w-full h-full transition duration-200 pointer-events-none' />
			)}
			{index >= 4 && (
				<div className='absolute inset-0 bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent opacity-0 group-hover/feature:opacity-100 w-full h-full transition duration-200 pointer-events-none' />
			)}
			<div className='relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400'>
				{icon}
			</div>
			<div className='relative z-10 mb-2 px-10 font-bold text-lg'>
				<div className='group-hover/feature:h-8 group-hover/feature:bg-purple-500 left-0 absolute inset-y-0 bg-neutral-300 dark:bg-neutral-700 rounded-tr-full rounded-br-full w-1 h-6 origin-center transition-all duration-200' />
				<span className='inline-block text-neutral-800 dark:text-neutral-100 transition group-hover/feature:translate-x-2 duration-200'>
					{title}
				</span>
			</div>
			<p className='relative z-10 px-10 max-w-xs text-neutral-600 text-sm dark:text-neutral-300'>
				{description}
			</p>
		</div>
	);
};
