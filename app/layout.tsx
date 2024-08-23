import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/Providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = constructMetadata()
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={fontSans.className}>
      <SessionProvider >
        <body
          className=
          'min-h-screen font-sans antialiased grainy'>
          <Navbar />
          <Providers>
            {children}
          </Providers>
        </body>
      </SessionProvider>
    </html>
  );
}
