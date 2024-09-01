"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "./ui/sonner";
import AppWalletProvider from "@/providers/AppWalletProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<AppWalletProvider>{children}</AppWalletProvider>
			<Toaster closeButton duration={3000} richColors />
			<ProgressBar
				height='4px'
				color='#6426C7'
				options={{ showSpinner: false }}
				shallowRouting
			/>
		</>
	);
};

export default Providers;
