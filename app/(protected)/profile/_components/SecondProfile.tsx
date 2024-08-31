"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocialLink, User } from "@prisma/client";
import { toast } from "sonner";
import { updateUser } from "@/db/users";
import ConnectWallet from "@/app/(protected)/profile/_components/ConnectWallet";
import { SocialConnector } from "./SocialConnector";
import { countries, currencies, states } from "@/lib/constants";

const schema = z.object({
	name: z.string().min(1, "Name is required"),
	bio: z.string().optional(),
	email: z.string().email("Invalid email address"),
	publicEmail: z.boolean().optional(),
	streetAddress: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	postalCode: z.string().optional(),
	country: z.string().optional(),
	currency: z.string().optional(),
});

export default function SecondProfile({
	profile,
}: {
	profile: User & { socialLink: SocialLink };
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [copiedWallet, setCopiedWallet] = useState<string | null>(null);

	const handleCopyWallet = async () => {
		navigator.clipboard.writeText(profile.walletAddress || "");
		toast.success("Copied to clipboard");
		setCopiedWallet(profile.walletAddress);
		await new Promise((resolve) => setTimeout(resolve, 5000));
		setCopiedWallet(null);
	};
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
		setError,
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: profile,
	});

	const connectedWallets = [
		{ name: "Solana", address: profile?.walletAddress },
	];

	const onSubmit = async (data: any) => {
		setIsLoading(true);

		toast.promise(updateUser(profile.id, data), {
			loading: "Updating profile...",
			success: "Profile updated successfully",
			error: "Failed to update profile",
		});

		setIsLoading(false);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
		if (
			event.key === "Enter" &&
			(event.target as HTMLElement).tagName !== "TEXTAREA"
		) {
			event.preventDefault();
		}
	};

	return (
		<>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className='min-h-screen text-gray-900 dark:text-gray-100'
			>
				<main className='mx-auto px-4 py-8 max-w-6xl'>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-8'
						onKeyDown={handleKeyDown}
					>
						<motion.div
							layout
							className='gap-6 grid grid-cols-1 md:grid-cols-3'
						>
							<div className='md:col-span-1'>
								<Label htmlFor='name' className='font-semibold text-lg'>
									Name
								</Label>
								<p className='mt-1 text-gray-500 text-sm dark:text-gray-400'>
									This will be displayed on your public profile.
								</p>
							</div>
							<div className='md:col-span-2'>
								<Input
									id='name'
									placeholder='Enter your name'
									className='w-full'
									{...register("name")}
								/>
								{errors.name && (
									<p className='text-red-500'>
										{errors.name.message?.toString()}
									</p>
								)}
							</div>
						</motion.div>

						<Separator className='my-8' />

						<motion.div
							layout
							className='gap-6 grid grid-cols-1 md:grid-cols-3'
						>
							<div className='md:col-span-1'>
								<Label htmlFor='bio' className='font-semibold text-lg'>
									Bio
								</Label>
								<p className='mt-1 text-gray-500 text-sm dark:text-gray-400'>
									This will be displayed on your public profile. Maximum 240
									characters.
								</p>
							</div>
							<div className='md:col-span-2'>
								<Textarea
									id='bio'
									placeholder='Enter your bio'
									className='w-full min-h-[100px]'
									{...register("bio")}
								/>
								{errors.bio && (
									<p className='text-red-500'>
										{errors.bio.message?.toString()}
									</p>
								)}
							</div>
						</motion.div>

						<Separator className='my-8' />

						<motion.div
							layout
							className='gap-6 grid grid-cols-1 md:grid-cols-3'
						>
							<div className='md:col-span-1'>
								<Label htmlFor='email' className='font-semibold text-lg'>
									Email
								</Label>
								<p className='mt-1 text-gray-500 text-sm dark:text-gray-400'>
									This is how people can contact you.
								</p>
							</div>
							<div className='space-y-4 md:col-span-2'>
								<Input
									id='email'
									disabled
									type='email'
									placeholder='Enter your email'
									className='w-full'
									{...register("email")}
								/>
								{errors.email && (
									<p className='text-red-500'>
										{errors.email.message?.toString()}
									</p>
								)}
								<div className='flex items-center space-x-2'>
									<Controller
										name='publicEmail'
										control={control}
										render={({ field }) => (
											<Switch
												id='publicEmail'
												checked={field.value || false}
												onCheckedChange={field.onChange}
											/>
										)}
									/>
									<Label htmlFor='publicEmail'>
										Show email on public profile
									</Label>
								</div>
							</div>
						</motion.div>

						<Separator className='my-8' />

						<motion.div
							layout
							className='gap-6 grid grid-cols-1 md:grid-cols-3'
						>
							<div className='md:col-span-1'>
								<Label className='font-semibold text-lg'>
									Connected Web3 Wallets
								</Label>
								<p className='mt-1 text-gray-500 text-sm dark:text-gray-400'>
									Manage your connected Web3 wallets.
								</p>
							</div>
							<div className='space-y-4 md:col-span-2'>
								<AnimatePresence>
									{connectedWallets.map((wallet, index) => {
										if (!wallet?.address || wallet?.address === null)
											return null;
										return (
											<motion.div
												key={wallet.address}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -20 }}
												transition={{ duration: 0.3, delay: index * 0.1 }}
												className='flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded-lg'
											>
												<div>
													<p className='font-medium'>{wallet.name}</p>
													<p className='text-gray-500 text-sm dark:text-gray-400'>
														{wallet.address}
													</p>
												</div>
												<Button
													type='button'
													variant='ghost'
													size='sm'
													onClick={handleCopyWallet}
													className='text-blue-600 hover:text-blue-800'
												>
													{copiedWallet === wallet.address ? (
														<Check className='w-4 h-4' />
													) : (
														<Copy className='w-4 h-4' />
													)}
												</Button>
											</motion.div>
										);
									})}
								</AnimatePresence>
								{/* <Button variant="outline" className="w-full" >Connect New Wallet</Button> */}
								<ConnectWallet />
							</div>
						</motion.div>

						<Separator className='my-8' />

						<SocialConnector
							userId={profile.id}
							socialLinks={profile.socialLink}
						/>

						<Separator className='my-8' />

						<motion.div
							layout
							className='gap-6 grid grid-cols-1 md:grid-cols-3'
						>
							<div className='md:col-span-1'>
								<Label className='font-semibold text-lg'>Address</Label>
								<p className='mt-1 text-gray-500 text-sm dark:text-gray-400'>
									This is your registered address.
								</p>
							</div>
							<div className='space-y-4 md:col-span-2'>
								<Input
									placeholder='Street address'
									className='w-full'
									{...register("streetAddress")}
								/>
								<Input
									placeholder='City'
									className='w-full'
									{...register("city")}
								/>
								<div className='gap-4 grid grid-cols-2'>
									<Controller
										name='state'
										control={control}
										render={({ field }) => (
											<Select
												value={field.value || ""}
												onValueChange={field.onChange}
											>
												<SelectTrigger>
													<SelectValue placeholder='State/Province' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{states.map((state) => (
															<SelectItem key={state.value} value={state.value}>
																{state.label}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
										)}
									/>
									<Input
										id='postalCode'
										placeholder='Enter zip code'
										{...register("postalCode")}
										onBlur={async (e) => {
											const zip = e.target.value;
											if (zip) {
												// Fetch state, city, and country based on zip code
												const response = await fetch(
													`https://api.postalpincode.in/pincode/${zip}`
												);
												const data = await response.json();
												console.log(data);
												if (data[0].Status === "Success") {
													const state = data[0].PostOffice[0].State;
													const city = data[0].PostOffice[0].District;
													const country = "INDIA"; // Assuming the API is for India
													setValue(
														"state",
														states.find((s) => s.label === state)?.value || null
													);
													setValue("city", city || null);
													setValue(
														"country",
														countries.find((c) => c.value === country)?.value ||
															null
													);
												} else {
													// Show error if the zip is not valid
													toast.error(
														"Zip code not found! Please select the state and country manually."
													);
													setError("postalCode", {
														type: "manual",
														message:
															"Zip code not found! Please select the state and country manually.",
													});
												}
											}
										}}
									/>
								</div>
								<Controller
									name='country'
									control={control}
									render={({ field }) => (
										<Select
											value={field.value || ""}
											onValueChange={field.onChange}
										>
											<SelectTrigger>
												<SelectValue placeholder='Country' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													{countries.map((country) => (
														<SelectItem
															key={country.value}
															value={country.value}
														>
															{country.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</motion.div>

						<Separator className='my-8' />

						<motion.div
							layout
							className='gap-6 grid grid-cols-1 md:grid-cols-3'
						>
							<div className='md:col-span-1'>
								<Label htmlFor='currency' className='font-semibold text-lg'>
									Currency
								</Label>
								<p className='mt-1 text-gray-500 text-sm dark:text-gray-400'>
									The currency that you will be using.
								</p>
							</div>
							<div className='md:col-span-2'>
								<Controller
									name='currency'
									control={control}
									render={({ field }) => (
										<Select
											value={field.value || ""}
											onValueChange={field.onChange}
										>
											<SelectTrigger id='currency'>
												<SelectValue placeholder='Select currency' />
											</SelectTrigger>
											<SelectContent>
												{currencies.map((currency) => (
													<SelectItem
														key={currency.value}
														value={currency.value}
													>
														{currency.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									)}
								/>
							</div>
						</motion.div>

						<Separator className='my-8' />

						<motion.div layout className='flex justify-end space-x-4 pt-6'>
							<Button type='submit' disabled={isLoading}>
								{isLoading ? (
									<Loader2 className='mr-2 w-4 h-4 animate-spin' />
								) : null}
								{isLoading ? "Saving..." : "Save changes"}
							</Button>
						</motion.div>
					</form>
				</main>
			</motion.div>
		</>
	);
}
