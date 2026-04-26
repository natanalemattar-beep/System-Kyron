'use client';

import { useState, useEffect } from 'react';
import { PageTracker } from '@/components/page-tracker';
import { LandingHeader } from '@/components/landing/landing-header';
import { WhatsAppButton } from '@/components/whatsapp-button';

export function LandingClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && <PageTracker />}
      <LandingHeader />
      {children}
      {mounted && <WhatsAppButton />}
    </>
  );
}
