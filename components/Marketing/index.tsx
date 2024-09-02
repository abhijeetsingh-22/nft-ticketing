"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
	Ticket,
	Gem,
	ArrowRight,
	Zap,
	Star,
	Sparkles,
	MessageCircle,
	Clock,
	Users,
	Laptop,
	Search,
	BarChart,
	FileText,
	Moon,
	Sun,
	Bug,
} from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { useTheme } from "next-themes";
import { registerForEarlyAccess } from "@/db/earlyaccess";
import { toast } from "sonner";
import {useRouter} from "next/navigation"
import { Routes } from "@/routes";


export default function Marketing() {
	const [email, setEmail] = React.useState("");
	const benefitsRef = useRef(null);
	const benefitsInView = useInView(benefitsRef, { once: true });
    const router = useRouter()

	const featuredRef = useRef(null);
	const featuredInView = useInView(featuredRef, { once: true });

	const scrollRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: scrollRef,
		offset: ["start start", "end start"],
	});

	const handleEarlyAccess = async () => {
		toast.success("Registering for early access...");
		let emailId = email;
		setEmail("");
		registerForEarlyAccess(emailId)
			.then((resp) => {
				console.log("resp", resp);
				if (resp.code == 200) {
					toast.success(resp.message);
				} else {
					toast.error(resp.message);
				}
			})
	};

	const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
	const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

	const heroVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: { staggerChildren: 0.2, delayChildren: 0.2 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" },
		},
	};

	const benefitVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	const ticketVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: { duration: 0.5, ease: "easeOut" },
		},
	};

	const handleGotoEvents = () => {
		console.log("going to events");
		router.push(Routes.EVENTS)
	}

	return (
		<div
			className='flex flex-col bg-white dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white transition-colors duration-300'
			ref={scrollRef}
		>
			<main className='flex-1'>
				<motion.section
					className='relative bg-gradient-to-br from-purple-50 dark:from-purple-900 via-white dark:via-gray-900 to-pink-50 dark:to-pink-900 py-12 md:py-24 lg:py-32 xl:py-48 w-full overflow-hidden'
					style={{ opacity: heroOpacity, scale: heroScale }}
				>
					<div className='relative z-10 px-4 md:px-6 container'>
						<motion.div
							className='items-center gap-8 grid grid-cols-1 lg:grid-cols-2'
							initial='hidden'
							animate='visible'
							variants={heroVariants}
						>
							<motion.div
								className='space-y-8 text-center lg:text-left'
								variants={itemVariants}
							>
								<h1 className='font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl/none tracking-tighter'>
									<span className='bg-clip-text bg-gradient-to-r from-purple-600 dark:from-purple-400 via-pink-600 dark:via-pink-400 to-red-600 dark:to-red-400 text-transparent'>
										Mint
									</span>{" "}
									Your Event Experience
								</h1>
								<p className='font-semibold text-gray-600 text-lg sm:text-xl md:text-2xl dark:text-gray-300'>
									Minttix: Where every ticket is a{" "}
									<span className='text-purple-600 dark:text-purple-400'>
										digital masterpiece
									</span>{" "}
									and{" "}
									<span className='text-pink-600 dark:text-pink-400'>
										unforgettable memory
									</span>
									.
								</p>
								<div className='flex sm:flex-row flex-col justify-center lg:justify-start gap-4'>
									<Button
										className='bg-gradient-to-r from-purple-600 hover:from-purple-700 dark:hover:from-purple-600 dark:from-purple-500 to-pink-600 hover:to-pink-700 dark:hover:to-pink-600 dark:to-pink-500 text-white transform hover:scale-105 transition-all duration-200'
										size='lg'
										onClick={handleGotoEvents}
									>
										<Sparkles className='mr-2 w-5 h-5' /> Mint Your Ticket
									</Button>
									<Button
										variant='outline'
										size='lg'
										className='border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 transform hover:scale-105 transition-all duration-200'
										onClick={handleGotoEvents}
									>
										Explore Minttix
									</Button>
								</div>
							</motion.div>
							<motion.div
								className='relative mt-8 lg:mt-0'
								variants={itemVariants}
							>
								<div className='top-1/2 left-1/2 absolute bg-purple-200 dark:bg-purple-700 opacity-50 blur-3xl rounded-full w-72 h-72 transform -translate-x-1/2 -translate-y-1/2 animate-pulse filter'></div>
								<Image
									src='/placeholder.svg?height=400&width=400'
									width={400}
									height={400}
									alt='Minttix NFT Ticket Example'
									className='relative z-10 shadow-2xl mx-auto rounded-lg transform hover:rotate-3 transition-transform duration-300'
								/>
								<motion.div
									className='top-0 left-0 absolute bg-purple-400 dark:bg-purple-600 rounded-full w-4 h-4'
									animate={{
										scale: [1, 1.2, 1],
										opacity: [1, 0.5, 1],
									}}
									transition={{
										duration: 2,
										repeat: Infinity,
										repeatType: "reverse",
									}}
								/>
								<motion.div
									className='right-0 bottom-0 absolute bg-pink-400 dark:bg-pink-600 rounded-full w-6 h-6'
									animate={{
										scale: [1, 1.5, 1],
										opacity: [1, 0.5, 1],
									}}
									transition={{
										duration: 3,
										repeat: Infinity,
										repeatType: "reverse",
									}}
								/>
							</motion.div>
						</motion.div>
						<motion.div
							className='flex flex-wrap justify-center items-center gap-4 mt-16'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 1, duration: 0.6 }}
						>
							<div className='flex items-center bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 px-4 py-2 rounded-full'>
								<Star className='mr-2 w-5 h-5 text-yellow-500' />
								<span className='font-semibold text-sm sm:text-base'>
									4.9/5 Rating
								</span>
							</div>
							<div className='flex items-center bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 px-4 py-2 rounded-full'>
								<Zap className='mr-2 w-5 h-5 text-purple-600 dark:text-purple-400' />
								<span className='font-semibold text-sm sm:text-base'>
									10k+ Events
								</span>
							</div>
							<div className='flex items-center bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 px-4 py-2 rounded-full'>
								<Gem className='mr-2 w-5 h-5 text-pink-600 dark:text-pink-400' />
								<span className='font-semibold text-sm sm:text-base'>
									100k+ NFTs Minted
								</span>
							</div>
						</motion.div>
					</div>
				</motion.section>
				<motion.section
					id='features'
					className='bg-gray-50 dark:bg-gray-800 py-12 md:py-24 lg:py-32 w-full'
					ref={benefitsRef}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<div className='px-4 md:px-6 container'>
						<h2 className='mb-8 font-bold text-2xl text-center sm:text-3xl md:text-4xl tracking-tighter'>
							Why Choose Minttix?
						</h2>
						<div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
							{[
								{
									icon: Clock,
									title: "Fast Setup",
									description:
										"Get your NFT tickets up and running in less than 10 minutes.",
								},
								{
									icon: Users,
									title: "20+ Providers",
									description:
										"Choose from a variety of popular ticketing and analytics providers.",
								},
								{
									icon: Laptop,
									title: "Built on Modern Technologies",
									description:
										"Utilizing Next.js, React, and blockchain for seamless experiences.",
								},
								{
									icon: Gem,
									title: "Custom MDX Components",
									description:
										"Create unique ticket designs with our custom MDX components.",
								},
								{
									icon: Search,
									title: "SEO-Ready",
									description: "Optimized for search engines out of the box.",
								},
								{
									icon: BarChart,
									title: "Analytics",
									description:
										"Track your event's performance with built-in analytics.",
								},
								{
									icon: Ticket,
									title: "Open-Source",
									description:
										"100% free and open-source for maximum flexibility.",
								},
								{
									icon: FileText,
									title: "Page Templates",
									description:
										"Various templates for events, newsletters, and more.",
								},
							].map((feature, index) => (
								<motion.div
									key={index}
									className='flex flex-col items-center bg-white dark:bg-gray-700 shadow-md dark:shadow-gray-700 p-6 rounded-lg text-center'
									variants={benefitVariants}
									initial='hidden'
									animate={benefitsInView ? "visible" : "hidden"}
									transition={{ delay: index * 0.1 }}
								>
									<feature.icon className='mb-4 w-12 h-12 text-purple-600 dark:text-purple-400' />
									<h3 className='mb-2 font-bold text-lg'>{feature.title}</h3>
									<p className='text-gray-600 text-sm dark:text-gray-300'>
										{feature.description}
									</p>
								</motion.div>
							))}
						</div>
					</div>
				</motion.section>
				<motion.section
					id='how-it-works'
					className='bg-white dark:bg-gray-900 py-12 md:py-24 lg:py-32 w-full'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<div className='px-4 md:px-6 container'>
						<h2 className='mb-8 font-bold text-2xl text-center sm:text-3xl md:text-4xl tracking-tighter'>
							How Minttix Works
						</h2>
						<div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
							{[
								{
									step: 1,
									title: "Choose Your Event",
									description:
										"Browse our curated list of upcoming events and select the one you want to attend.",
								},
								{
									step: 2,
									title: "Mint Your NFT Ticket",

									description:
										"Use cryptocurrency to mint your unique NFT ticket, securing your spot at the event.",
								},
								{
									step: 3,
									title: "Store Securely",
									description:
										"Keep your NFT ticket in your digital wallet, safe and easily accessible.",
								},
								{
									step: 4,
									title: "Enjoy the Experience",
									description:
										"Present your NFT ticket at the event and enjoy your exclusive access and perks.",
								},
							].map((item, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.5 }}
									viewport={{ once: true }}
								>
									<Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'>
										<CardContent className='p-6'>
											<div className='mb-2 font-bold text-4xl text-purple-600 dark:text-purple-400'>
												{item.step}
											</div>
											<h3 className='mb-2 font-semibold text-xl'>
												{item.title}
											</h3>
											<p className='text-gray-600 dark:text-gray-300'>
												{item.description}
											</p>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</motion.section>
				<motion.section
					id='events'
					className='bg-gray-50 dark:bg-gray-800 py-12 md:py-24 lg:py-32 w-full'
					ref={featuredRef}
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<div className='px-4 md:px-6 container'>
						<h2 className='mb-8 font-bold text-2xl text-center sm:text-3xl md:text-4xl tracking-tighter'>
							Featured Minttix Events
						</h2>
						<div className='gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
							{[1, 2, 3].map((i) => (
								<motion.div
									key={i}
									className='relative shadow-lg rounded-lg overflow-hidden group'
									variants={ticketVariants}
									initial='hidden'
									animate={featuredInView ? "visible" : "hidden"}
									transition={{ delay: i * 0.2 }}
									whileHover={{ scale: 1.05 }}
								>
									<Image
										src={`/placeholder.svg?height=400&width=300`}
										alt={`Minttix NFT Event ${i}`}
										width={300}
										height={400}
										className='group-hover:scale-110 w-full h-full transition-transform duration-300 object-cover'
									/>
									<div className='absolute inset-0 flex items-end bg-gradient-to-t from-purple-900/90 to-transparent p-6'>
										<div>
											<h3 className='mb-2 font-bold text-lg text-white sm:text-xl'>
												Cosmic Beats Festival
											</h3>
											<p className='text-purple-200 text-xs sm:text-sm'>
												August 15, 2024 • Neon Arena
											</p>
										</div>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</motion.section>
				<motion.section
					className='bg-white dark:bg-gray-900 py-12 md:py-24 lg:py-32 w-full'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<div className='px-4 md:px-6 container'>
						<h2 className='mb-8 font-bold text-2xl text-center sm:text-3xl md:text-4xl tracking-tighter'>
							What Our Users Say
						</h2>
						<div className='gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
							{[
								{
									name: "Alex Johnson",
									role: "Music Enthusiast",
									quote:
										"Minttix revolutionized my concert experience. The NFT ticket is a cherished memento long after the show!",
								},
								{
									name: "Sarah Lee",
									role: "Art Collector",
									quote:
										"As an art lover, I appreciate how Minttix turns event tickets into collectible digital art. It's genius!",
								},
								{
									name: "Mike Chen",
									role: "Tech Entrepreneur",
									quote:
										"The security and ease of transfer with Minttix NFT tickets are game-changers for the event industry.",
								},
							].map((testimonial, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.5 }}
									viewport={{ once: true }}
								>
									<Card className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'>
										<CardContent className='p-6'>
											<MessageCircle className='mb-4 w-8 h-8 text-purple-600 dark:text-purple-400' />
											<p className='mb-4 text-gray-600 dark:text-gray-300'>
												"{testimonial.quote}"
											</p>
											<div className='font-semibold'>{testimonial.name}</div>
											<div className='text-gray-500 text-sm dark:text-gray-400'>
												{testimonial.role}
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>
					</div>
				</motion.section>
				<motion.section
					className='bg-gray-50 dark:bg-gray-800 py-12 md:py-24 lg:py-32 w-full'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<div className='px-4 md:px-6 container'>
						<h2 className='mb-8 font-bold text-2xl text-center sm:text-3xl md:text-4xl tracking-tighter'>
							Frequently Asked Questions
						</h2>
						<Accordion
							type='single'
							collapsible
							className='mx-auto w-full max-w-3xl'
						>
							{[
								{
									question: "What is an NFT ticket?",
									answer:
										"An NFT ticket is a digital ticket stored on a blockchain, providing proof of ownership and authenticity. It can also serve as a collectible item after the event.",
								},
								{
									question: "How do I purchase a Minttix NFT ticket?",
									answer:
										"You can purchase Minttix NFT tickets directly on our platform using cryptocurrency. Simply choose your event, connect your digital wallet, and complete the transaction.",
								},
								{
									question: "Can I resell my Minttix NFT ticket?",
									answer:
										"Yes, Minttix NFT tickets can be resold on supported NFT marketplaces. However, please check the specific terms for each event as some may have restrictions on resale.",
								},
								{
									question: "What happens to my NFT ticket after the event?",
									answer:
										"Your NFT ticket remains in your digital wallet as a collectible item. Some events may offer special perks or content accessible to NFT ticket holders even after the event.",
								},
							].map((faq, index) => (
								<motion.div
									key={index}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1, duration: 0.5 }}
									viewport={{ once: true }}
								>
									<AccordionItem value={`item-${index}`}>
										<AccordionTrigger className='text-left hover:text-purple-600 dark:hover:text-purple-400'>
											{faq.question}
										</AccordionTrigger>
										<AccordionContent className='text-gray-600 dark:text-gray-300'>
											{faq.answer}
										</AccordionContent>
									</AccordionItem>
								</motion.div>
							))}
						</Accordion>
					</div>
				</motion.section>
				<motion.section
					id='contact'
					className='bg-gradient-to-br from-purple-100 dark:from-purple-900 to-pink-100 dark:to-pink-900 py-12 md:py-24 lg:py-32 w-full'
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
				>
					<div className='px-4 md:px-6 text-center container'>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							viewport={{ once: true }}
						>
							<h2 className='mb-4 font-bold text-2xl sm:text-3xl md:text-4xl tracking-tighter'>
								Ready to Revolutionize Your Event Experience?
							</h2>
							<p className='mx-auto mb-8 max-w-[600px] text-base text-gray-600 sm:text-lg md:text-xl dark:text-gray-300'>
								Join the Minttix revolution and turn your next event into an
								unforgettable digital collectible.
							</p>
							<div className='space-y-4 mx-auto max-w-sm'>
								<Input
									className='border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
									placeholder='Enter your email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<Button
									className='bg-purple-600 hover:bg-purple-700 dark:hover:bg-purple-600 dark:bg-purple-500 w-full text-white'
									size='lg'
									onClick={handleEarlyAccess}
								>
									Get Early Access <Zap className='ml-2 w-5 h-4' />
								</Button>
							</div>
						</motion.div>
					</div>
				</motion.section>
			</main>
			<motion.footer
				className='border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-6 border-t w-full text-gray-600 dark:text-gray-300'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2, duration: 0.5 }}
			>
				<div className='px-4 md:px-6 container'>
					<div className='flex md:flex-row flex-col justify-between items-center space-y-4 md:space-y-0'>
						<div className='flex items-center space-x-4'>
							<Ticket className='w-6 h-6 text-purple-600 dark:text-purple-400' />
							<span className='font-bold text-gray-900 text-xl dark:text-white'>
								Minttix
							</span>
						</div>
						<nav className='flex flex-wrap justify-center gap-4 sm:gap-6'>
							<Link
								className='text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
								href='#'
							>
								Terms of Service
							</Link>
							<Link
								className='text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
								href='#'
							>
								Privacy Policy
							</Link>
							<Link
								className='text-sm hover:text-purple-600 dark:hover:text-purple-400 transition-colors'
								href='#'
							>
								FAQ
							</Link>
							<Link href='/report-issue'>
								<Bug className='w-6 h-6 text-purple-600 dark:text-purple-400' />
							</Link>
						</nav>
					</div>
					<div className='mt-6 text-center text-xs sm:text-sm'>
						© 2023 Minttix. All rights reserved.
					</div>
				</div>
			</motion.footer>
		</div>
	);
}
