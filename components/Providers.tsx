"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "./ui/sonner";
import AppWalletProvider from "@/providers/AppWalletProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* <ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			> */}
			<QueryClientProvider client={queryClient}> 
			<AppWalletProvider>{children}</AppWalletProvider>
			</QueryClientProvider>
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
