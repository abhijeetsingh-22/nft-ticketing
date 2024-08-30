import "./globals.css";
import { constructMetadata } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/Providers";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata = constructMetadata();
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' className={GeistSans.className} suppressHydrationWarning>
			<body className='antialiased'>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					<SessionProvider>
						<Providers>{children}</Providers>
						<Analytics />
					</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
