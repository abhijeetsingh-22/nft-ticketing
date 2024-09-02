"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authenticate } from "@/app/(public)/(auth)/login/actions";
import { Label } from "../ui/label";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Routes } from "@/routes";
import { auth } from "@/auth";
import { getUserById } from "@/db/users";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";

const loginSchema = z.object({
	email: z
		.string()
		.email("Invalid email address")
		.min(5, "Email must be at least 5 characters long")
		.max(255, "Email must be at most 255 characters long"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

type loginInput = z.infer<typeof loginSchema>;

export default function LoginForm() {
	const router = useRouter();

	const form = useForm<loginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleGoogleSignIn = () => {
		signIn("google", { callbackUrl: Routes.DASHBOARD });
	};

	const handleSubmit = async (values: loginInput) => {
		toast.promise(authenticate(values.email, values.password), {
			loading: "Logging in...",
			success: "Logged in successfully",
			error: "Failed to log in",
		});
	};

	return (
		<form
			className='border-gray-200 dark:border-gray-700 bg-white/75 dark:bg-gray-800/75 shadow-lg dark:shadow-gray-900 backdrop-blur-lg mx-auto p-10 border-b rounded-3xl w-full max-w-lg'
			onSubmit={form.handleSubmit(handleSubmit)}
		>
			<div className='max-w-lg'>
				<h1 className='font-bold text-gray-900 text-lg dark:text-gray-100'>
					Log In
				</h1>
				<span className='mt-2 text-gray-600 dark:text-gray-300'>
					Please log in to continue
				</span>
				<div className='space-y-8 mt-8'>
					<div className='gap-8 sm:gap-4 grid grid-cols-1'>
						<div>
							<Label className='text-gray-700 dark:text-gray-200'>Email</Label>
							<Input
								{...form.register("email")}
								type='email'
								className='bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
							/>
							{form.formState.errors.email && (
								<p className='text-red-500/70 text-xs dark:text-red-400/70'>
									{form.formState.errors.email.message}
								</p>
							)}
						</div>
						<div>
							<Label className='text-gray-700 dark:text-gray-200'>
								Password
							</Label>
							<Input
								{...form.register("password")}
								type='password'
								className='bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
							/>
							{form.formState.errors.password && (
								<p className='text-red-500/70 text-xs dark:text-red-400/70'>
									{form.formState.errors.password.message}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
			<Button
				className='bg-purple-600 hover:bg-purple-700 dark:hover:bg-purple-600 dark:bg-purple-500 mt-8 w-full text-white'
				type='submit'
			>
				Log in
			</Button>
			<Button
				type='button'
				onClick={handleGoogleSignIn}
				className='border-gray-300 bg-white hover:bg-gray-100 mt-4 border w-full text-gray-700'
			>
				<FaGoogle className='mr-2' />
				Sign in with Google
			</Button>
			<Link
				className={cn("mt-4 w-full", buttonVariants({ variant: "outline" }))}
				href='/signup'
			>
				No account yet? Sign up
			</Link>
		</form>
	);
}
