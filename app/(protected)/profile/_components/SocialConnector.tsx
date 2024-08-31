import React, { useState } from "react";
import { Instagram, Twitter, Github } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { updateSocialLink } from "@/db/users";
import { SocialLink } from "@prisma/client";

export const SocialConnector = ({
	userId,
	socialLinks,
}: {
	userId: string;
	socialLinks: SocialLink;
}) => {
	const [discordUrl, setDiscordUrl] = useState(socialLinks?.discordUrl || "");
	const [twitterUrl, setTwitterUrl] = useState(socialLinks?.twitterUrl || "");
	const [githubUrl, setGithubUrl] = useState(socialLinks?.githubUrl || "");
	const [instagramUrl, setInstagramUrl] = useState(
		socialLinks?.instagramUrl || ""
	);

	const handleConnect = async (
		platform: "instagramUrl" | "twitterUrl" | "githubUrl" | "discordUrl",
		url: string
	) => {
		try {
			await updateSocialLink(userId, platform, url);
			toast.success(`${platform} connected successfully`);
		} catch (error) {
			toast.error(
				`Failed to connect ${platform.replace("Url", "").toUpperCase()}`
			);
		}
	};

	return (
		<motion.div layout className='gap-6 grid grid-cols-1 md:grid-cols-3'>
			<div className='md:col-span-1'>
				<Label className='font-semibold text-lg'>Connect Social Accounts</Label>
				<p className='mt-1 text-gray-500 text-sm dark:text-gray-400'>
					Link your social media accounts to your profile.
				</p>
			</div>
			<div className='gap-4 grid grid-cols-1 sm:grid-cols-2 md:col-span-2'>
				<div className='space-y-2'>
					<Label htmlFor='discord' className='font-medium text-sm'>
						Discord
					</Label>
					<div className='flex items-center space-x-2'>
						<FaDiscord className='w-5 h-5 text-indigo-600' />
						<Input
							id='discord'
							placeholder='https://discord.com/...'
							className='flex-grow'
							value={discordUrl}
							onChange={(e) => setDiscordUrl(e.target.value)}
						/>
					</div>
					<Button
						type='button'
						variant='outline'
						className='bg-white hover:bg-indigo-50 dark:bg-gray-800 w-full text-indigo-600 dark:text-indigo-400'
						onClick={() => handleConnect("discordUrl", discordUrl)}
					>
						Connect Discord
					</Button>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='twitter' className='font-medium text-sm'>
						Twitter
					</Label>
					<div className='flex items-center space-x-2'>
						<Twitter className='w-5 h-5 text-blue-400' />
						<Input
							id='twitter'
							placeholder='https://twitter.com/...'
							className='flex-grow'
							value={twitterUrl}
							onChange={(e) => setTwitterUrl(e.target.value)}
						/>
					</div>
					<Button
						type='button'
						variant='outline'
						className='bg-white hover:bg-blue-50 dark:bg-gray-800 w-full text-blue-400 dark:text-blue-300'
						onClick={() => handleConnect("twitterUrl", twitterUrl)}
					>
						Connect Twitter
					</Button>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='github' className='font-medium text-sm'>
						GitHub
					</Label>
					<div className='flex items-center space-x-2'>
						<Github className='w-5 h-5 text-gray-900' />
						<Input
							id='github'
							placeholder='https://github.com/...'
							className='flex-grow'
							value={githubUrl}
							onChange={(e) => setGithubUrl(e.target.value)}
						/>
					</div>
					<Button
						type='button'
						variant='outline'
						className='bg-white hover:bg-gray-100 dark:bg-gray-800 w-full text-gray-900 dark:text-gray-300'
						onClick={() => handleConnect("githubUrl", githubUrl)}
					>
						Connect GitHub
					</Button>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='instagram' className='font-medium text-sm'>
						Instagram
					</Label>
					<div className='flex items-center space-x-2'>
						<Instagram className='w-5 h-5 text-pink-600' />
						<Input
							id='instagram'
							placeholder='https://instagram.com/...'
							className='flex-grow'
							value={instagramUrl}
							onChange={(e) => setInstagramUrl(e.target.value)}
						/>
					</div>
					<Button
						type='button'
						variant='outline'
						className='bg-white hover:bg-pink-50 dark:bg-gray-800 w-full text-pink-600 dark:text-pink-400'
						onClick={() => handleConnect("instagramUrl", instagramUrl)}
					>
						Connect Instagram
					</Button>
				</div>
			</div>
		</motion.div>
	);
};
