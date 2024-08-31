"use client";

import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";

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
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function UserNavMenu({ user }: any) {
	// console.log("user", user.user);
	return (
		<DropdownMenu>
			<TooltipProvider disableHoverableContent>
				<Tooltip delayDuration={100}>
					<TooltipTrigger asChild>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								className='relative dark:border-gray-700 rounded-full w-8 h-8'
							>
								<Avatar className='w-8 h-8'>
									<AvatarImage src='#' alt='Avatar' />
									<AvatarFallback className='border-2 border-gray-300 bg-transparent dark:text-gray-300'>
										{user?.name?.charAt(0).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
					</TooltipTrigger>
					<TooltipContent
						side='bottom'
						className='dark:bg-gray-800 dark:text-gray-200'
					>
						{user?.name}
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>

			<DropdownMenuContent
				className='dark:border-gray-700 dark:bg-gray-800 w-56'
				align='end'
				forceMount
			>
				<DropdownMenuLabel className='font-normal dark:text-gray-200'>
					<div className='flex flex-col space-y-1'>
						<p className='font-medium text-sm dark:text-gray-200 leading-none'>
							{user?.name}
						</p>
						<p className='text-muted-foreground text-xs dark:text-gray-400 leading-none'>
							{user?.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator className='dark:bg-gray-700' />
				<DropdownMenuGroup>
					<DropdownMenuItem
						className='dark:hover:bg-gray-700 hover:cursor-pointer'
						asChild
					>
						<Link
							href='/profile'
							className='flex items-center dark:text-gray-200'
						>
							<User className='mr-3 w-4 h-4 text-muted-foreground dark:text-gray-400' />
							Account
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className='dark:bg-gray-700' />
				<DropdownMenuItem
					className='dark:hover:bg-gray-700 dark:text-gray-200 hover:cursor-pointer'
					onClick={() => signOut()}
				>
					<LogOut className='mr-3 w-4 h-4 text-muted-foreground dark:text-gray-400' />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
