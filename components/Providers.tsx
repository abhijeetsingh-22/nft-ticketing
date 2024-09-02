"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "./ui/sonner";
// import { ThemeProvider } from "@/providers/theme-provider";
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
			<Toaster closeButton position='top-right' duration={3000} />
			<ProgressBar
				height='4px'
				color='#0047ab'
				options={{ showSpinner: false }}
				shallowRouting
			/>
			{/* </ThemeProvider> */}
		</>
	);
};

export default Providers;
