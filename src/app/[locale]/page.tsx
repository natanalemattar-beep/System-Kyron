'use client';

import { useState, useCallback, useEffect } from 'react';
import { LoadingScreen } from '@/components/landing/loading-screen';
import { LandingHeader } from '@/components/landing/landing-header';
import {
  HeroSection,
  FeaturesSection,
  ScrollCinematicSection,
  DatabaseSection,
  ServicesSection,
  AboutUsSection,
  CommentsSection,
  FaqSection,
  CtaSection,
  Footer,
} from '@/components/landing';
import { WelcomeTutorial } from '@/components/welcome-tutorial';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { PageTracker } from '@/components/page-tracker';
import { useDevicePerformance } from '@/hooks/use-device-performance';

function LandingContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { tier, isMobile } = useDevicePerformance();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const skipLoadingScreen = tier === 'low';

  useEffect(() => {
    if (skipLoadingScreen && isLoading) {
      setIsLoading(false);
    }
  }, [skipLoadingScreen, isLoading]);

  return (
    <>
      {isLoading && !skipLoadingScreen && <LoadingScreen onComplete={handleLoadingComplete} />}

      {mounted && (
        <>
          <PageTracker />
          <WelcomeTutorial />
        </>
      )}

      {mounted && <LandingHeader />}

      <main className="flex-1 w-full">
        {mounted && (
          <>
            <HeroSection />
            <FeaturesSection />
            {tier !== 'low' && <ScrollCinematicSection />}
            <ServicesSection />
            <DatabaseSection />
            <AboutUsSection />
            <CommentsSection />
            <CtaSection />
            <FaqSection />
          </>
        )}
      </main>

      {mounted && <Footer />}
      {mounted && <WhatsAppButton />}
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20 w-full bg-transparent">
      <LandingContent />
    </div>
  );
}
