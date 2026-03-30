'use client';

import dynamic from 'next/dynamic';
import { useState, useCallback, useEffect } from 'react';
import { LoadingScreen } from '@/components/landing/loading-screen';

const HeroSection = dynamic(() => import("@/components/landing/hero-section").then(m => ({ default: m.HeroSection })), { ssr: false });
const LandingHeader = dynamic(() => import("@/components/landing/landing-header").then(m => ({ default: m.LandingHeader })), { ssr: false });

const WelcomeTutorial = dynamic(() => import("@/components/welcome-tutorial").then(m => ({ default: m.WelcomeTutorial })), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button").then(m => ({ default: m.WhatsAppButton })), { ssr: false });
const PageTracker = dynamic(() => import("@/components/page-tracker").then(m => ({ default: m.PageTracker })), { ssr: false });

function LandingContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {mounted && (
        <>
          <PageTracker />
          <WelcomeTutorial />
        </>
      )}

      {mounted && <LandingHeader />}

      <main className="flex-1 w-full">
        {mounted && <HeroSection />}
      </main>

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
