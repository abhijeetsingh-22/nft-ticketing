"use client";

import Link from "next/link";
import { ArrowUp, ChevronUp, LayoutGrid, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
	TooltipProvider,
} from "@/components/ui/tooltip";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User as PrismaUser } from "@prisma/client";
// import { signOut } from "@/auth";
import { signOut } from "next-auth/react";
export function UserNav({
	isOpen,
	user,
}: {
	isOpen: boolean;
	user: PrismaUser;
}) {
	return (
		<>
			<div className='flex items-end w-full grow'>
				<TooltipProvider disableHoverableContent>
					<Tooltip delayDuration={100}>
						<TooltipTrigger asChild>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									{!isOpen ? (
										<Button
											variant='outline'
											className='relative rounded-full w-8 h-8'
										>
											<Avatar className='w-8 h-8'>
												<AvatarImage src='#' alt='Avatar' />
												<AvatarFallback className='border-2 border-gray-300 bg-transparent'>
													{user?.name?.charAt(0).toUpperCase()}
												</AvatarFallback>
											</Avatar>
										</Button>
									) : (
										<Button variant='outline' className='relative w-full h-14'>
											<div className='flex items-center gap-2 w-full'>
												<Avatar className='w-10 h-10'>
													<AvatarImage src='#' alt='Avatar' />
													<AvatarFallback className='bg-transparent'>
														{user?.name?.charAt(0).toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<div className='flex flex-col justify-center items-start'>
													<p className='font-bold'>{user?.name}</p>
													<span className='text-xs'>{user?.email}</span>
												</div>
											</div>
											<ChevronUp className='w-6 h-6' />
										</Button>
									)}
								</DropdownMenuTrigger>

								<DropdownMenuContent className='w-56' align='end' forceMount>
									<DropdownMenuGroup>
										<DropdownMenuItem className='hover:cursor-pointer' asChild>
											<Link href='/profile' className='flex items-center'>
												<User className='mr-3 w-4 h-4 text-muted-foreground' />
												Account
											</Link>
										</DropdownMenuItem>
									</DropdownMenuGroup>
									<DropdownMenuSeparator />
									<DropdownMenuItem
										className='hover:cursor-pointer'
										onClick={() => signOut()}
									>
										<LogOut className='mr-3 w-4 h-4 text-muted-foreground' />
										Sign out
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TooltipTrigger>
						{isOpen === false && (
							<TooltipContent side='right'>Profile</TooltipContent>
						)}
					</Tooltip>
				</TooltipProvider>
			</div>
		</>
	);
}
