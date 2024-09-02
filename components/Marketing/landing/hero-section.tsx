"use client";

import { BorderBeam } from "@/components/magicui/border-beam";
import ShimmerButton from "@/components/magicui/shimmer-button";
import TextShimmer from "@/components/magicui/text-shimmer";
import { Button, buttonVariants } from "@/components/ui/button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

export default function HeroSection() {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-100px" });
	return (
		<section
			id='hero'
			className='relative mx-auto mt-32 px-6 md:px-8 max-w-[80rem] text-center'
		>
			<div className='inline-flex justify-between items-center gap-1 border-white/5 bg-white/10 hover:bg-white/20 opacity-0 backdrop-filter-[12px] px-3 border rounded-full h-7 text-white text-xs dark:text-black transition-all translate-y-[-1rem] animate-fade-in hover:cursor-pointer ease-in group'>
				<TextShimmer className='inline-flex justify-center items-center'>
					<span>✨ Beta version (Devnet only)</span>{" "}
					<ArrowRightIcon className='ml-1 transition-transform group-hover:translate-x-0.5 duration-300 ease-in-out size-3' />
				</TextShimmer>
			</div>
			<h1 className='bg-clip-text bg-gradient-to-br from-30% from-black dark:from-white to-black/40 dark:to-white/40 opacity-0 py-6 font-medium text-5xl text-balance text-transparent sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tighter translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]'>
				MintTix is the new way
				<br className='md:block hidden' /> to experience events
			</h1>
			<p className='opacity-0 mb-12 text-balance text-gray-400 text-lg md:text-xl tracking-tight translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]'>
				MintTix allows you to create, transact and store digital tickets
				<br className='md:block hidden' /> on a carbon-neutral blockchain.
			</p>
			<div className='flex justify-center items-center'>
				<Link href='/signup' className=''>
					<HoverBorderGradient
						containerClassName='rounded-full'
						as='button'
						className='flex items-center space-x-2 bg-white dark:bg-black text-black dark:text-white'
					>
						Get Started
						<ChevronRight className='ml-1 transition-all group-hover:translate-x-1 duration-300 ease-out size-4' />
					</HoverBorderGradient>
				</Link>
			</div>

			<div
				ref={ref}
				className='relative after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)] after:z-50 after:absolute after:inset-0 opacity-0 mt-[8rem] animate-fade-up [--animation-delay:400ms] [perspective:2000px]'
			>
				<div
					className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:h-full before:w-full before:opacity-0 before:[filter:blur(180px)] before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] ${
						inView ? "before:animate-image-glow" : ""
					}`}
				>
					<BorderBeam
						size={200}
						duration={12}
						delay={11}
						colorFrom='var(--color-two)'
						colorTo='var(--color-three)'
					/>

					<img
						src='/hero-dark.png'
						alt='Hero Image'
						className='dark:block relative hidden border rounded-[inherit] w-full h-full object-contain'
					/>
					<img
						src='/hero-light.png'
						alt='Hero Image'
						className='block relative dark:hidden border rounded-[inherit] w-full h-full object-contain'
					/>
				</div>
			</div>
		</section>
	);
}
