"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
	SelectGroup,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import DateTimeSelector from "@/components/ui/TimeDatePicker";
import { states } from "@/lib/constants";
import { createOrUpdateEvent } from "@/db/events";

const schema = z
	.object({
		name: z.string().min(1, "Name is required"),
		slug: z.string().min(1, "Slug is required"),
		description: z.string().min(1, "Description is required"),
		startDate: z.date({ required_error: "Start Date is required" }),
		endDate: z.date({ required_error: "End Date is required" }),
		venueName: z.string().min(1, "Venue Name is required"),
		venueAddress: z.string().min(1, "Venue Address is required"),
		zipCode: z.string().min(1, "Zip Code is required"),
		state: z.string().optional(),
		coverPhoto: z.string().url(),
		thumbnail: z.string().url(),
		numberOfTickets: z.number().min(10, "Number of tickets is required"),
		ticketPrice: z.number().min(0, "Ticket price is required"),
	})
	.refine((data) => data.endDate > data.startDate, {
		message: "End Date should be greater than Start Date",
		path: ["endDate"],
	});

export type EventFormType = z.infer<typeof schema>;

export default function EventsForm({
	userId,
	event,
}: {
	userId: string;
	event?: Event;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		control,
	} = useForm<EventFormType>({
		resolver: zodResolver(schema),
		defaultValues: event ? ({ ...event } as any) : undefined,
	});

	const watchName = watch("name");
	const watchSlug = watch("slug");

	useEffect(() => {
		setValue("slug", watchName?.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
	}, [watchName, watchSlug]);

	const watchStartDate = watch("startDate");
	const watchEndDate = watch("endDate");

	const onSubmit = async (data: any) => {
		data.organizerId = userId;
		setIsLoading(true);
		toast.promise(
			createOrUpdateEvent({ organizerId: userId, ...data })
				.then(() => {
					router.push(`/${userId}/events`);
				})
				.finally(() => {
					setIsLoading(false);
				}),
			{
				loading: "Updating event...",
				success: "Event updated successfully",
				error: "Failed to update event",
			}
		);
	};

	return (
		<div className='min-h-[70vh]'>
			<main className='mx-auto px-4 py-8 container'>
				<form
					className='space-y-8 mx-auto max-w-3xl'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='space-y-2'>
						<Label htmlFor='name'>Event Name</Label>
						<Input
							id='name'
							placeholder='Enter event name'
							{...register("name")}
						/>
						{errors.name && (
							<p className='text-red-500'>{errors.name.message?.toString()}</p>
						)}
					</div>

					<div className='space-y-2'>
						<Label htmlFor='description'>Description</Label>
						<Textarea
							id='description'
							placeholder='Describe your event'
							className='min-h-[100px]'
							{...register("description")}
						/>
						{errors.description && (
							<p className='text-red-500'>
								{errors.description.message?.toString()}
							</p>
						)}
					</div>

					<div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<DateTimeSelector
								selectedDate={watchStartDate}
								onDateChange={(date) => setValue("startDate", date)}
								label='Start Date'
								// disabled={isLoading}
							/>
							{errors.startDate && (
								<p className='text-red-500'>
									{errors.startDate.message?.toString()}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<DateTimeSelector
								selectedDate={watchEndDate}
								onDateChange={(date) => setValue("endDate", date)}
								label='End Date'
								// disabled={isLoading}
							/>
							{errors.endDate && (
								<p className='text-red-500'>
									{errors.endDate.message?.toString()}
								</p>
							)}
						</div>
					</div>

					<div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='venueName'>Venue Name</Label>
							<Input
								id='venueName'
								placeholder='Enter venue name'
								{...register("venueName")}
							/>
							{errors.venueName && (
								<p className='text-red-500'>
									{errors.venueName.message?.toString()}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='venueAddress'>Venue Address</Label>
							<Input
								id='venueAddress'
								placeholder='Enter venue address'
								{...register("venueAddress")}
							/>
							{errors.venueAddress && (
								<p className='text-red-500'>
									{errors.venueAddress.message?.toString()}
								</p>
							)}
						</div>
					</div>
					<div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='zipCode'>Zip Code</Label>
							<Input
								id='zipCode'
								placeholder='Enter zip code'
								{...register("zipCode")}
								onBlur={async (e) => {
									const zip = e.target.value;
									if (zip) {
										// Fetch state based on zip code
										const response = await fetch(
											`https://api.postalpincode.in/pincode/${zip}`
										);
										const data = await response.json();
										console.log(data);
										if (data[0].Status === "Success") {
											const state = data[0].PostOffice[0].State;
											setValue(
												"state",
												states.find((s) => s.label === state)?.value
											);
										}
									}
								}}
							/>
							{errors.zipCode && (
								<p className='text-red-500'>
									{errors.zipCode.message?.toString()}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='state'>State</Label>
							<Controller
								name='state'
								control={control}
								render={({ field }) => (
									<Select
										value={field.value ?? undefined}
										onValueChange={field.onChange}
									>
										<SelectTrigger id='state'>
											<SelectValue placeholder='Select state' />
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
							{errors.state && (
								<p className='text-red-500'>
									{errors.state.message?.toString()}
								</p>
							)}
						</div>
					</div>

					<div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='number-of-tickets'>Number of Tickets</Label>
							<Input
								id='number-of-tickets'
								placeholder='Enter number of tickets'
								type='number'
								{...register("numberOfTickets", { valueAsNumber: true })}
							/>
							{errors.numberOfTickets && (
								<p className='text-red-500'>
									{errors.numberOfTickets.message?.toString()}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label htmlFor='ticket-price'>Ticket Price (USD)</Label>
							<Input
								id='ticket-price'
								placeholder='Enter ticket price in USD'
								type='number'
								step='0.01'
								{...register("ticketPrice", { valueAsNumber: true })}
							/>
							{errors.ticketPrice && (
								<p className='text-red-500'>
									{errors.ticketPrice.message?.toString()}
								</p>
							)}
						</div>
					</div>

					<div className='gap-6 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label>Cover Photo</Label>
							{watch("coverPhoto") ? (
								<Image
									src={watch("coverPhoto")}
									alt='Cover Photo'
									className='w-full h-auto'
									width={200}
									height={200}
								/>
							) : (
								<UploadDropzone
									endpoint='imageUploader'
									onClientUploadComplete={(res: any) => {
										setIsLoading(false);
										setValue("coverPhoto", res[0].url);
										toast.success("Upload Completed");
									}}
									onUploadProgress={(progress) => {
										setIsLoading(true);
									}}
									onUploadError={(error: Error) => {
										console.log("error", error);
										toast.error(`ERROR! ${error.message}`);
									}}
									disabled={isLoading}
								/>
							)}
							{errors.coverPhoto && (
								<p className='text-red-500'>
									{errors.coverPhoto.message?.toString()}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<Label>Thumbnail</Label>
							{watch("thumbnail") ? (
								<Image
									src={watch("thumbnail")}
									alt='Thumbnail'
									className='w-full h-auto'
									width={200}
									height={200}
								/>
							) : (
								<UploadDropzone
									endpoint='imageUploader'
									onClientUploadComplete={(res: any) => {
										setValue("thumbnail", res[0].url);
										setIsLoading(false);
										toast.success("Upload Completed");
									}}
									onUploadProgress={(progress) => {
										setIsLoading(true);
									}}
									onUploadError={(error: Error) => {
										console.log("error", error);
										toast.error(`ERROR! ${error.message}`);
									}}
									disabled={isLoading}
								/>
							)}
							{errors.thumbnail && (
								<p className='text-red-500'>
									{errors.thumbnail.message?.toString()}
								</p>
							)}
						</div>
					</div>

					<div className='flex justify-end space-x-4 pt-6'>
						<Button
							variant='outline'
							onClick={(e) => {
								e.preventDefault();
								router.back();
							}}
							disabled={isLoading}
						>
							Cancel
						</Button>
						<Button type='submit' disabled={isLoading}>
							{isLoading ? "Creating Event..." : "Create Event"}
						</Button>
					</div>
				</form>
			</main>
		</div>
	);
}
