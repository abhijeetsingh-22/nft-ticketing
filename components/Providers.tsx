'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Toaster } from './ui/sonner';
import { ThemeProvider } from '@/providers/theme-provider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}

      {children}
      <Toaster />
      <ProgressBar
        height="4px"
        color="#0047ab"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {/* </ThemeProvider> */}
    </>
  );
};

export default Providers;