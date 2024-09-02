"use client";

import Link from "next/link";
import { Ellipsis, Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipProvider,
} from "@/components/ui/tooltip";
import { UserNav } from "./user-nav";
import { useContext } from "react";
import { User } from "@prisma/client";
import { LoggedInUserContext } from "@/contexts/LoggedInUserContext";

interface MenuProps {
	isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { user } = useContext(LoggedInUserContext);
	const menuList = getMenuList(pathname, user?.id || "");

	return (
		<div className='flex flex-col justify-between items-end mt-8 w-full h-full'>
			<div className='flex flex-col items-start space-y-1 px-2 w-full h-full'>
				<TooltipProvider disableHoverableContent>
					<Tooltip delayDuration={100}>
						<TooltipTrigger asChild>
							<Button
								onClick={() => {
									router.push(`/${user?.id}/events/new`);
								}}
								className='justify-center w-full h-10'
							>
								<span className={cn(isOpen === false ? "" : "mr-4")}>
									<Plus size={18} />
								</span>
								<p
									className={cn(
										"whitespace-nowrap",
										isOpen === false ? "opacity-0 hidden" : "opacity-100"
									)}
								>
									Create New Event
								</p>
							</Button>
						</TooltipTrigger>
						{isOpen === false && (
							<TooltipContent side='right'>Create New Event</TooltipContent>
						)}
					</Tooltip>
				</TooltipProvider>
				{menuList.map(({ groupLabel, menus }, index) => (
					<div className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
						{(isOpen && groupLabel) || isOpen === undefined ? (
							<p className='px-4 pb-2 max-w-[248px] font-medium text-muted-foreground text-sm truncate'>
								{groupLabel}
							</p>
						) : !isOpen && isOpen !== undefined && groupLabel ? (
							<TooltipProvider>
								<Tooltip delayDuration={100}>
									<TooltipTrigger className='w-full'>
										<div className='flex justify-center items-center w-full'>
											<Ellipsis className='w-5 h-5' />
										</div>
									</TooltipTrigger>
									<TooltipContent side='right'>
										<p>{groupLabel}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						) : (
							<p className='pb-2'></p>
						)}
						{menus.map(({ href, label, icon: Icon, active, submenus }, index) =>
							submenus.length === 0 ? (
								<div className='w-full' key={index}>
									<TooltipProvider disableHoverableContent>
										<Tooltip delayDuration={100}>
											<TooltipTrigger asChild>
												<Button
													variant={active ? "secondary" : "ghost"}
													className='justify-start mb-1 w-full h-10'
													asChild
												>
													<Link href={href}>
														<span
															className={cn(isOpen === false ? "" : "mr-4")}
														>
															<Icon size={18} />
														</span>
														<p
															className={cn(
																"max-w-[200px] truncate",
																isOpen === false
																	? "-translate-x-96 opacity-0"
																	: "translate-x-0 opacity-100"
															)}
														>
															{label}
														</p>
													</Link>
												</Button>
											</TooltipTrigger>
											{isOpen === false && (
												<TooltipContent side='right'>{label}</TooltipContent>
											)}
										</Tooltip>
									</TooltipProvider>
								</div>
							) : (
								<div className='w-full' key={index}>
									<CollapseMenuButton
										icon={Icon}
										label={label}
										active={active}
										submenus={submenus}
										isOpen={isOpen}
									/>
								</div>
							)
						)}
					</div>
				))}
			</div>

			<UserNav isOpen={isOpen || false} user={user as User} />
		</div>
	);
}
