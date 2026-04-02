'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { LoadingScreen } from '@/components/landing/loading-screen';
import { LandingHeader } from '@/components/landing/landing-header';
import { HeroSection } from '@/components/landing';
import { PageTracker } from '@/components/page-tracker';
import { useDevicePerformance } from '@/hooks/use-device-performance';

const FeaturesSection = dynamic(() => import('@/components/landing/features-section').then(m => ({ default: m.FeaturesSection })), { ssr: false });
const ShowcaseSection = dynamic(() => import('@/components/landing/showcase-section').then(m => ({ default: m.ShowcaseSection })), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/landing/services-section').then(m => ({ default: m.ServicesSection })), { ssr: false });
const AboutUsSection = dynamic(() => import('@/components/landing/about-us-section').then(m => ({ default: m.AboutUsSection })), { ssr: false });
const CommentsSection = dynamic(() => import('@/components/landing/comments-section').then(m => ({ default: m.CommentsSection })), { ssr: false });
const FaqSection = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })), { ssr: false });
const CtaSection = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })), { ssr: false });
const Footer = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: false });
const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(m => ({ default: m.WelcomeTutorial })), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/whatsapp-button').then(m => ({ default: m.WhatsAppButton })), { ssr: false });
const HeaderGuideArrows = dynamic(() => import('@/components/landing/header-guide-arrows').then(m => ({ default: m.HeaderGuideArrows })), { ssr: false });

function LazySection({ children, fallbackHeight = '200px' }: { children: React.ReactNode; fallbackHeight?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {visible ? children : <div style={{ minHeight: fallbackHeight }} />}
    </div>
  );
}

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
          <HeaderGuideArrows />
          <LandingHeader />
        </>
      )}

      <main className="w-full">
        {mounted && (
          <>
            <HeroSection />
            <div className="section-divider" />
            <LazySection fallbackHeight="600px"><FeaturesSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="600px"><ShowcaseSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="500px"><ServicesSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="500px"><AboutUsSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="400px"><CommentsSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="300px"><CtaSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="400px"><FaqSection /></LazySection>
          </>
        )}
      </main>

      {mounted && <LazySection fallbackHeight="200px"><Footer /></LazySection>}
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
