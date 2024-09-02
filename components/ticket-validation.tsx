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
	CameraIcon,
} from "lucide-react";
import { toast } from "sonner";
import { QrReader } from 'react-qr-reader';
import { useEffect, useRef } from "react";

// Mock function to simulate backend call
const validateTicket = async (
	code: string
): Promise<{ valid: boolean; ticket?: TicketDetails }> => {
	// Simulate API call delay
	await new Promise((resolve) => setTimeout(resolve, 1000));


	return { valid: true };
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
	useEffect(() => {
		return () => {
			// Cleanup function to ensure camera is released when component unmounts
		};
	}, []);

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

	const handleQRScan = (result: string | null) => {
		if (result) {
			handleValidate(result);
		}
	};

	const handleTabChange = (value: string) => {
		setActiveTab(value as "manual" | "qr");

		if (value !== "qr") {
			// Stop the video stream when switching away from the QR tab
			const videoElement = document.querySelector("video");
			if (videoElement) {
				const stream = videoElement.srcObject as MediaStream;
				if (stream) {
					const tracks = stream.getTracks();
					tracks.forEach((track) => track.stop());
				}
			}
		}
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
						onValueChange={handleTabChange}
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
									{activeTab === 'qr' && !isValidating ? (
										<QrReader
											onResult={(result, error) => {
												if (result) {
													handleQRScan(result.getText());
												}

											}}
											constraints={{ facingMode: 'environment' }}
											className='w-full h-full'
										/>
									) : (
										<div className="flex items-center justify-center">
											<span className="loading loading-spinner loading-lg"></span>
										</div>
									)}
								</div>
								<p className='text-center text-gray-500 dark:text-gray-400'>
									{activeTab === 'qr' ? 'Preparing camera...' : 'Position the QR code within the frame to scan'}
								</p>
							</div>
						</TabsContent>
					</Tabs>
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
				</CardContent>
			</Card>
		</div>
	);
}
