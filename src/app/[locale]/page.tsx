'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useCallback, useEffect, useRef } from 'react';
import { LoadingScreen } from '@/components/landing/loading-screen';

const HeroSection = dynamic(() => import("@/components/landing/hero-section").then(m => ({ default: m.HeroSection })), { ssr: false });
const LandingHeader = dynamic(() => import("@/components/landing/landing-header").then(m => ({ default: m.LandingHeader })), { ssr: false });

const WelcomeTutorial = dynamic(() => import("@/components/welcome-tutorial").then(m => ({ default: m.WelcomeTutorial })), { ssr: false });
const DemoBanner = dynamic(() => import("@/components/demo-banner").then(m => ({ default: m.DemoBanner })), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button").then(m => ({ default: m.WhatsAppButton })), { ssr: false });
const PageTracker = dynamic(() => import("@/components/page-tracker").then(m => ({ default: m.PageTracker })), { ssr: false });

const ServicesSection = dynamic(() => import("@/components/landing/services-section").then(m => ({ default: m.ServicesSection })), { ssr: false });
const AboutUsSection = dynamic(() => import("@/components/landing/about-us-section").then(m => ({ default: m.AboutUsSection })), { ssr: false });
const CommentsSection = dynamic(() => import("@/components/landing/comments-section").then(m => ({ default: m.CommentsSection })), { ssr: false });
const FaqSection = dynamic(() => import("@/components/landing/faq-section").then(m => ({ default: m.FaqSection })), { ssr: false });
const CtaSection = dynamic(() => import("@/components/landing/cta-section").then(m => ({ default: m.CtaSection })), { ssr: false });
const Footer = dynamic(() => import("@/components/landing/footer").then(m => ({ default: m.Footer })), { ssr: false });

function LandingContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    const ric = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));
    ric(() => setBelowFoldReady(true), { timeout: 1500 });
  }, []);

  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (CSS.supports?.('animation-timeline', 'scroll()')) return;
    const el = progressRef.current;
    if (!el) return;
    const onScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      el.style.setProperty('--scroll-progress', String(progress));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {mounted && (
        <>
          <PageTracker />
          <WelcomeTutorial />
          <DemoBanner />
        </>
      )}

      <div ref={progressRef} className="fixed top-0 left-0 right-0 h-1 bg-primary/60 origin-left z-[200] scroll-progress-bar" />

      {mounted && <LandingHeader />}

      <main className="flex-1 w-full">
        {mounted && <HeroSection />}

        {belowFoldReady && (
          <>
            <Suspense fallback={null}>
              <ServicesSection />
            </Suspense>

            <Suspense fallback={null}>
              <AboutUsSection />
            </Suspense>

            <Suspense fallback={null}>
              <CommentsSection />
            </Suspense>

            <Suspense fallback={null}>
              <FaqSection />
            </Suspense>

            <Suspense fallback={null}>
              <CtaSection />
            </Suspense>
          </>
        )}
      </main>

      {belowFoldReady && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}

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
