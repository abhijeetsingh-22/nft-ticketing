"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Ticket,
	QrCode,
	X,
	Check,
	AlertCircle,
	Calendar,
	Clock,
	MapPin,
	User,
} from "lucide-react";
import { toast } from "sonner";

// Mock function to simulate backend call
const validateTicket = async (
	code: string
): Promise<{ valid: boolean; ticket?: TicketDetails }> => {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Mock validation logic
	if (code === "123456" || code === "qr-123456") {
		return {
			valid: true,
			ticket: {
				id: "1",
				eventName: "Cosmic Beats Festival",
				date: "2023-08-15",
				time: "20:00",
				location: "Neon Arena, New York",
				attendeeName: "John Doe",
			},
		};
	}
	return { valid: false };
};

interface TicketDetails {
	id: string;
	eventName: string;
	date: string;
	time: string;
	location: string;
	attendeeName: string;
}

export function TicketValidation() {
	const [activeTab, setActiveTab] = useState<"manual" | "qr">("manual");
	const [manualCode, setManualCode] = useState("");
	const [isValidating, setIsValidating] = useState(false);
	const [validatedTicket, setValidatedTicket] = useState<TicketDetails | null>(
		null
	);
	const [showDialog, setShowDialog] = useState(false);

	const handleValidate = async (code: string) => {
		setIsValidating(true);
		toast.promise(validateTicket(code), {
			loading: "Validating ticket...",
			success: (result) => {
				if (result.valid && result.ticket) {
					setValidatedTicket(result.ticket);
					setShowDialog(true);
					return "Ticket validated successfully!";
				} else {
					throw new Error("The ticket code is invalid or not found.");
				}
			},
			error: "An error occurred while validating the ticket.",
		});
		setIsValidating(false);
		setManualCode("");
	};

	const handleManualSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (manualCode.length === 6) {
			handleValidate(manualCode);
		}
	};

	const handleQRScan = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			const videoElement = document.querySelector("video") as HTMLVideoElement;

			if (videoElement) {
				videoElement.srcObject = stream;
				videoElement.play();
			}

			const canvas = document.createElement("canvas");
			const context = canvas.getContext("2d");

			const checkForQRCode = () => {
				if (context) {
					context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
					// Implement QR code detection logic here
					// handleValidate("qr-123456");
				}
			};

			const intervalId = setInterval(checkForQRCode, 1000);

			videoElement.onloadedmetadata = () => {
				videoElement.play();
			};

			videoElement.onended = () => {
				clearInterval(intervalId);
				stream.getTracks().forEach((track) => track.stop());
			};
		} catch (error) {
			console.error("Error accessing the camera: ", error);
			toast.error("Could not access the camera. Please check permissions.");
		}
	};

	const handleOpenCamera = () => {
		handleQRScan();
	};

	return (
		<div className='flex justify-center items-center dark:bg-gray-900 p-4 min-h-[70vh]'>
			<Card className='w-full max-w-md'>
				<CardHeader>
					<CardTitle className='font-bold text-2xl text-center'>
						Ticket Validation
					</CardTitle>
					<CardDescription className='text-center'>
						Enter the 6-digit code or scan the QR code
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs
						value={activeTab}
						onValueChange={(value) => setActiveTab(value as "manual" | "qr")}
						className='w-full'
					>
						<TabsList className='grid grid-cols-2 w-full'>
							<TabsTrigger value='manual'>Manual Entry</TabsTrigger>
							<TabsTrigger value='qr'>QR Scan</TabsTrigger>
						</TabsList>
						<TabsContent value='manual'>
							<form onSubmit={handleManualSubmit} className='space-y-4'>
								<Input
									type='text'
									placeholder='Enter 6-digit code'
									value={manualCode}
									onChange={(e) => setManualCode(e.target.value)}
									maxLength={6}
									className='text-2xl text-center tracking-widest'
								/>
								<Button
									type='submit'
									className='w-full'
									disabled={manualCode.length !== 6 || isValidating}
								>
									{isValidating ? "Validating..." : "Validate Ticket"}
								</Button>
							</form>
						</TabsContent>
						<TabsContent value='qr'>
							<div className='flex flex-col items-center space-y-4'>
								<div className='flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-lg w-64 h-64'>
									<video className='w-full h-full' autoPlay muted></video>
								</div>
								<Button
									onClick={handleOpenCamera}
									className='w-full'
									disabled={isValidating}
								>
									{isValidating ? "Scanning..." : "Open Camera"}
								</Button>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>

			<Dialog open={showDialog} onOpenChange={setShowDialog}>
				<DialogContent className='shadow-2xl dark:shadow-purple-900/20 sm:max-w-[600px]'>
					<DialogHeader>
						<DialogTitle className='mb-4 font-bold text-3xl text-center'>
							Ticket Validated
						</DialogTitle>
						<DialogDescription className='text-center text-lg'>
							The ticket has been successfully verified and marked as used.
						</DialogDescription>
					</DialogHeader>
					{validatedTicket && (
						<div className='space-y-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg'>
							<div className='flex justify-center items-center mb-6'>
								<div className='flex justify-center items-center bg-green-100 dark:bg-green-900 rounded-full w-16 h-16'>
									<Check className='w-10 h-10 text-green-600 dark:text-green-400' />
								</div>
							</div>
							<h3 className='mb-4 font-semibold text-2xl text-center'>
								{validatedTicket.eventName}
							</h3>
							<div className='gap-4 grid grid-cols-2'>
								<div className='flex items-center'>
									<Calendar className='mr-2 w-5 h-5 text-gray-500 dark:text-gray-400' />
									<span>{validatedTicket.date}</span>
								</div>
								<div className='flex items-center'>
									<Clock className='mr-2 w-5 h-5 text-gray-500 dark:text-gray-400' />
									<span>{validatedTicket.time}</span>
								</div>
								<div className='flex items-center col-span-2'>
									<MapPin className='mr-2 w-5 h-5 text-gray-500 dark:text-gray-400' />
									<span>{validatedTicket.location}</span>
								</div>
								<div className='flex items-center col-span-2'>
									<User className='mr-2 w-5 h-5 text-gray-500 dark:text-gray-400' />
									<span>{validatedTicket.attendeeName}</span>
								</div>
							</div>
						</div>
					)}
					<DialogFooter className='sm:justify-center'>
						<Button
							onClick={() => setShowDialog(false)}
							className='w-full sm:w-auto'
						>
							Close
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
