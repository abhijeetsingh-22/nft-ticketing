"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { sendEmailUsingNodemailer } from "@/lib/email/sendEmail";
import { toast } from "sonner";
import { buildMailBodyForReportIssue } from "@/lib/email/emailBody";

// Define the validation schema using Zod
const reportSchema = z.object({
	area: z.string().min(1, "Area is required"),
	security: z.string().min(1, "Security is required"),
	subject: z.string().min(1, "Subject is required"),
	description: z.string().min(1, "Description is required"),
});

type ReportFormData = z.infer<typeof reportSchema>;

export default function ReportCard() {
	const {
		control,
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ReportFormData>({
		resolver: zodResolver(reportSchema),
	});

	const onSubmit = async (data: ReportFormData) => {
		console.log(data);
		const to = process.env.NEXT_PUBLIC_NEXT_PUBLIC_ADMIN_EMAIL;
		if (!to) {
			toast.error("Failed to register your issue. Please try again");
			return;
		}
		const mailBody: string = await buildMailBodyForReportIssue(data);

		try {
			// const response = await sendEmailUsingNodemailer(
			// 	to,
			// 	"Report Issue",
			// 	mailBody
			// );
			const response = null
			if (response) {
				toast.success("Issue reported successfully");
				reset(); // Clear all values after successful submission
			} else {
				throw new Error("Email sending failed");
			}
		} catch (error) {
			toast.error("Failed to register your issue. Please try again");
		}
	};

	return (
		<Card className='bg-white dark:bg-gray-800 shadow-lg w-[400px]'>
			<CardHeader>
				<CardTitle className='font-semibold text-2xl text-black dark:text-white'>
					Report an issue
				</CardTitle>
				<p className='text-black text-sm dark:text-white'>
					What area are you having problems with?
				</p>
			</CardHeader>
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardContent className='space-y-4'>
					<div className='space-y-2'>
						<label
							htmlFor='area'
							className='font-medium text-black text-sm dark:text-white'
						>
							Area
						</label>
						<Controller
							name='area'
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger
										id='area'
										className='border-gray-300 dark:border-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400'
									>
										<SelectValue placeholder='Select area' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='buy-tickets'>Buy Tickets</SelectItem>
										<SelectItem value='create-event'>Create Event</SelectItem>
										<SelectItem value='account'>Account</SelectItem>
										<SelectItem value='other'>Other</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.area && (
							<p className='text-red-500'>{errors.area.message}</p>
						)}
					</div>
					<div className='space-y-2'>
						<label
							htmlFor='security'
							className='font-medium text-black text-sm dark:text-white'
						>
							Security Level
						</label>
						<Controller
							name='security'
							control={control}
							render={({ field }) => (
								<Select onValueChange={field.onChange} value={field.value}>
									<SelectTrigger
										id='security'
										className='border-gray-300 dark:border-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400'
									>
										<SelectValue placeholder='Select security level' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='low'>Low priority</SelectItem>
										<SelectItem value='medium'>Medium priority</SelectItem>
										<SelectItem value='high'>High priority</SelectItem>
									</SelectContent>
								</Select>
							)}
						/>
						{errors.security && (
							<p className='text-red-500'>{errors.security.message}</p>
						)}
					</div>
					<div className='space-y-2'>
						<label
							htmlFor='subject'
							className='font-medium text-black text-sm dark:text-white'
						>
							Subject
						</label>
						<Input
							id='subject'
							placeholder='I need help with...'
							className='border-gray-300 dark:border-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400'
							{...register("subject")}
						/>
						{errors.subject && (
							<p className='text-red-500'>{errors.subject.message}</p>
						)}
					</div>
					<div className='space-y-2'>
						<label
							htmlFor='description'
							className='font-medium text-black text-sm dark:text-white'
						>
							Description
						</label>
						<Textarea
							id='description'
							placeholder='Please include all information relevant to your issue.'
							className='border-gray-300 dark:border-gray-600 focus:ring-gray-500 dark:focus:ring-gray-400 min-h-[100px]'
							{...register("description")}
						/>
						{errors.description && (
							<p className='text-red-500'>{errors.description.message}</p>
						)}
					</div>
				</CardContent>
				<CardFooter className='flex justify-between'>
					<Button
						variant='outline'
						className='border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-900 text-black dark:text-white'
						onClick={() => reset()} // Reset form on cancel
					>
						Cancel
					</Button>
					<Button
						type='submit'
						className='bg-primary hover:bg-primary-dark dark:bg-primary-dark text-white'
					>
						Submit
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
}
