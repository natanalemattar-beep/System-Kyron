'use client';

import { PageTracker } from '@/components/page-tracker';
import { LandingHeader } from '@/components/landing/landing-header';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { AIChatButton } from '@/components/ui/ai-chat-button';

export function LandingClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTracker />
      <LandingHeader />
      {children}
      <WhatsAppButton />
      <AIChatButton
        contextKey="system-kyron-soporte"
        className="bottom-28 right-6"
        chatClassName="bottom-48"
      />
    </>
  );
}
