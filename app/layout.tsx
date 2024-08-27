import "./globals.css";
import { constructMetadata } from "@/lib/utils";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/Providers";
import { GeistSans } from "geist/font/sans";


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
          <Providers>
            {children}
          </Providers>
        </body>
      </SessionProvider>
    </html>
  );
}
