"use client";

import Marquee from "@/components/magicui/marquee";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import {
	BarChart,
	ChevronRight,
	File,
	Globe,
	HeartHandshake,
	Rss,
	Shield,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

const tiles = [
	{
		icon: <HeartHandshake className='size-full' />,
		bg: (
			<div className='top-1/2 left-1/2 absolute bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px] rounded-full w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none filter'></div>
		),
	},
	{
		icon: <Globe className='size-full' />,
		bg: (
			<div className='top-1/2 left-1/2 absolute bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 opacity-70 blur-[20px] rounded-full w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none filter'></div>
		),
	},
	{
		icon: <File className='size-full' />,
		bg: (
			<div className='top-1/2 left-1/2 absolute bg-gradient-to-r from-green-500 via-teal-500 to-emerald-600 opacity-70 blur-[20px] rounded-full w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none filter'></div>
		),
	},
	{
		icon: <Shield className='size-full' />,
		bg: (
			<div className='top-1/2 left-1/2 absolute bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-600 opacity-70 blur-[20px] rounded-full w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none filter'></div>
		),
	},
	{
		icon: <Rss className='size-full' />,
		bg: (
			<div className='top-1/2 left-1/2 absolute bg-gradient-to-r from-orange-600 via-rose-600 to-violet-600 opacity-70 blur-[20px] rounded-full w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none filter'></div>
		),
	},
	{
		icon: <BarChart className='size-full' />,
		bg: (
			<div className='top-1/2 left-1/2 absolute bg-gradient-to-r from-gray-600 via-gray-500 to-gray-400 opacity-70 blur-[20px] rounded-full w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible pointer-events-none filter'></div>
		),
	},
];

const shuffleArray = (array: any[]) => {
	let currentIndex = array.length,
		randomIndex;
	// While there remain elements to shuffle.
	while (currentIndex !== 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}
	return array;
};

const Card = (card: { icon: JSX.Element; bg: JSX.Element }) => {
	const id = useId();
	const controls = useAnimation();
	const ref = useRef(null);
	const inView = useInView(ref, { once: true });

	useEffect(() => {
		if (inView) {
			controls.start({
				opacity: 1,
				transition: { delay: Math.random() * 2, ease: "easeOut", duration: 1 },
			});
		}
	}, [controls, inView]);

	return (
		<motion.div
			key={id}
			ref={ref}
			initial={{ opacity: 0 }}
			animate={controls}
			className={cn(
				"relative size-20 cursor-pointer overflow-hidden rounded-2xl border p-4",
				// light styles
				"bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
				// dark styles
				"transform-gpu dark:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
			)}
		>
			{card.icon}
			{card.bg}
		</motion.div>
	);
};

export default function CallToActionSection() {
	const [randomTiles1, setRandomTiles1] = useState<typeof tiles>([]);
	const [randomTiles2, setRandomTiles2] = useState<typeof tiles>([]);
	const [randomTiles3, setRandomTiles3] = useState<typeof tiles>([]);
	const [randomTiles4, setRandomTiles4] = useState<typeof tiles>([]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			// Ensures this runs client-side
			setRandomTiles1(shuffleArray([...tiles]));
			setRandomTiles2(shuffleArray([...tiles]));
			setRandomTiles3(shuffleArray([...tiles]));
			setRandomTiles4(shuffleArray([...tiles]));
		}
	}, []);

	return (
		<section id='cta'>
			<div className='py-14'>
				<div className='flex flex-col justify-center items-center w-full'>
					<div className='relative flex flex-col justify-center items-center w-full overflow-hidden'>
						<Marquee
							reverse
							className='-delay-[200ms] [--duration:10s]'
							repeat={5}
						>
							{randomTiles1.map((review, idx) => (
								<Card key={idx} {...review} />
							))}
						</Marquee>
						<Marquee reverse className='[--duration:25s]' repeat={5}>
							{randomTiles2.map((review, idx) => (
								<Card key={idx} {...review} />
							))}
						</Marquee>
						<Marquee
							reverse
							className='-delay-[200ms] [--duration:20s]'
							repeat={5}
						>
							{randomTiles1.map((review, idx) => (
								<Card key={idx} {...review} />
							))}
						</Marquee>
						<Marquee reverse className='[--duration:30s]' repeat={5}>
							{randomTiles2.map((review, idx) => (
								<Card key={idx} {...review} />
							))}
						</Marquee>
						<Marquee
							reverse
							className='-delay-[200ms] [--duration:20s]'
							repeat={5}
						>
							{randomTiles3.map((review, idx) => (
								<Card key={idx} {...review} />
							))}
						</Marquee>
						<Marquee reverse className='[--duration:30s]' repeat={5}>
							{randomTiles4.map((review, idx) => (
								<Card key={idx} {...review} />
							))}
						</Marquee>
						<div className='z-10 absolute'>
							<div className='bg-white/10 dark:bg-black/10 shadow-2xl backdrop-blur-md mx-auto p-3 border rounded-[2rem] size-24 lg:size-32'>
								<HeartHandshake className='mx-auto text-black dark:text-white size-16 lg:size-24' />
							</div>
							<div className='z-10 flex flex-col items-center mt-4 text-center text-white'>
								<h1 className='font-bold text-3xl lg:text-4xl'>
									Stop compromising with your customers.
								</h1>
								<p className='mt-2'>
									Create your own event now. No hidden fees.
								</p>
								<Link
									href='/signup'
									className={cn(
										buttonVariants({
											size: "lg",
											variant: "outline",
										}),
										"group mt-4 rounded-[2rem] px-6"
									)}
								>
									Get Started
									<ChevronRight className='ml-1 transition-all group-hover:translate-x-1 duration-300 ease-out size-4' />
								</Link>
							</div>
							<div className='-z-10 absolute inset-0 bg-backtround dark:bg-background opacity-40 blur-xl rounded-full' />
						</div>
						<div className='bottom-0 absolute inset-x-0 bg-gradient-to-b from-transparent to-70% to-backtround dark:to-background h-full' />
					</div>
				</div>
			</div>
		</section>
	);
}
