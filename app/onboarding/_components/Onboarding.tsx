"use client";
import { useState } from "react";
import { Calendar, Users, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { Routes } from "@/routes";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { updateUser } from "@/db/users";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export default function Onboarding({ user }: { user: User }) {
	const router = useRouter();
	const session = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const { theme } = useTheme();

	const updateUserOnboardingStatus = async () => {
		try {
			await session.update({ user: { isOnboarded: true } });
			await updateUser(user.id, { ...user, isOnboarded: true });
		} catch (error) {
			throw error;
		}
	};

	const handleGetStarted = async (userRole: "organizer" | "attendee") => {
		setIsLoading(true);
		try {
			await updateUserOnboardingStatus();
			if (userRole === "organizer") {
				router.push(`/${user.id}/events/new`);
			} else {
				router.push(Routes.EVENTS);
			}
		} catch (error) {
			console.error("Error during onboarding:", error);
			toast.error("An error occurred during onboarding. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<div className='flex justify-center items-center bg-background p-4 min-h-screen'>
				<Card className='shadow-lg w-full max-w-4xl overflow-hidden'>
					<CardContent className='p-8 sm:p-12'>
						<div className='flex justify-between items-center mb-8'>
							<h1 className='font-bold text-2xl text-foreground sm:text-3xl tracking-tight'>
								Mintix
							</h1>
							<div className='bg-gradient-to-br from-purple-500 to-blue-500 rounded-full w-8 h-8' />
						</div>
						<div className='space-y-2 mb-10'>
							<h2 className='font-bold text-3xl text-foreground sm:text-4xl md:text-5xl tracking-tight'>
								What brings you to Mintix?
							</h2>
							<p className='text-lg text-muted-foreground'>
								Choose your path and let&apos;s get started.
							</p>
						</div>
						<div className='gap-6 grid sm:grid-cols-2'>
							<Card className='relative hover:shadow-md transition-all duration-300 overflow-hidden group'>
								<CardContent className='p-6'>
									<div className='z-10 absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									<div className='relative z-20 space-y-4'>
										<div className='flex justify-between items-center'>
											<Calendar
												className='w-10 h-10 text-purple-500'
												strokeWidth={1.5}
											/>
											<ChevronRight className='w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1 duration-300' />
										</div>
										<h3 className='font-semibold text-foreground text-xl'>
											I&apos;m an event organizer
										</h3>
										<p className='text-muted-foreground text-sm'>
											Create and manage events, sell tickets, and grow your
											audience.
										</p>
										<Button
											onClick={() => handleGetStarted("organizer")}
											variant='outline'
											className='group-hover:bg-purple-500 group-hover:text-white w-full transition-colors duration-300'
											disabled={isLoading}
										>
											{isLoading ? "Loading..." : "Get Started"}
										</Button>
									</div>
								</CardContent>
							</Card>
							<Card className='relative hover:shadow-md transition-all duration-300 overflow-hidden group'>
								<CardContent className='p-6'>
									<div className='z-10 absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									<div className='relative z-20 space-y-4'>
										<div className='flex justify-between items-center'>
											<Users
												className='w-10 h-10 text-blue-500'
												strokeWidth={1.5}
											/>
											<ChevronRight className='w-5 h-5 text-muted-foreground transition-transform group-hover:translate-x-1 duration-300' />
										</div>
										<h3 className='font-semibold text-foreground text-xl'>
											I&apos;m an attendee
										</h3>
										<p className='text-muted-foreground text-sm'>
											Discover exciting events, purchase tickets, and connect
											with others.
										</p>
										<Button
											onClick={() => handleGetStarted("attendee")}
											variant='outline'
											className='group-hover:bg-blue-500 group-hover:text-white w-full transition-colors duration-300'
											disabled={isLoading}
										>
											{isLoading ? "Loading..." : "Get Started"}
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
}
