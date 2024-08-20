import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

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
    <html lang='en' className='light'>
      <SessionProvider >
        <body
          className={cn(
            'min-h-screen font-sans antialiased grainy',
            fontSans.className
          )}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
