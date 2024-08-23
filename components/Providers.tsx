'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Toaster } from './ui/sonner';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster />
      <ProgressBar
        height="4px"
        color="#0047ab"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default Providers;