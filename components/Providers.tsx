"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "./ui/sonner";
// import { ThemeProvider } from "@/providers/theme-provider";
import AppWalletProvider from "@/providers/AppWalletProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* <ThemeProvider
				attribute='class'
				defaultTheme='system'
				enableSystem
				disableTransitionOnChange
			> */}
			<AppWalletProvider>{children}</AppWalletProvider>
			<Toaster closeButton position='top-right' duration={3000} richColors />
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
