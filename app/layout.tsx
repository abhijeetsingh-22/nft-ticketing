import "./globals.css";
import { constructMetadata } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/Providers";
import { GeistSans } from "geist/font/sans";
import { Analytics } from "@vercel/analytics/react"


export const metadata = constructMetadata()
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={GeistSans.className}>
      <link rel="icon" href="/logos/icon.png" />
      <SessionProvider >
        <body
          className='antialiased'>
          <Providers>
            {children}
          </Providers>
          <Analytics />
        </body>
      </SessionProvider>
    </html>
  );
}
