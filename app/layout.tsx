// import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { constructMetadata } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/Providers";
import { GeistSans } from "geist/font/sans";
import Navbar from "@/components/Navbar";

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// })

export const metadata = constructMetadata()
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={GeistSans.className}>
      <SessionProvider >
        <body
          className='antialiased'>
          {/* <Navbar /> */}
          <Providers>
            {children}
          </Providers>
        </body>
      </SessionProvider>
    </html>
  );
}
