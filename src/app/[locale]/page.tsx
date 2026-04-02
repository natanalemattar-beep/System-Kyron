'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LoadingScreen } from '@/components/landing/loading-screen';
import { LandingHeader } from '@/components/landing/landing-header';
import { HeroSection } from '@/components/landing';
import { PageTracker } from '@/components/page-tracker';
import { useDevicePerformance } from '@/hooks/use-device-performance';

const Footer = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: false });
const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(m => ({ default: m.WelcomeTutorial })), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/whatsapp-button').then(m => ({ default: m.WhatsAppButton })), { ssr: false });

function LandingContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { tier } = useDevicePerformance();

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const skipLoadingScreen = tier === 'low';

  useEffect(() => {
    if (skipLoadingScreen && isLoading) {
      setIsLoading(false);
    }
  }, [skipLoadingScreen, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      setMounted(true);
    }
  }, [isLoading]);

  return (
    <>
      {isLoading && !skipLoadingScreen && <LoadingScreen onComplete={handleLoadingComplete} />}

      {mounted && (
        <>
          <PageTracker />
          <WelcomeTutorial />
          <LandingHeader />
        </>
      )}

      <main className="w-full">
        {mounted && <HeroSection />}
      </main>

      {mounted && <Footer />}
      {mounted && <WhatsAppButton />}
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent">
      <LandingContent />
    </div>
  );
}
