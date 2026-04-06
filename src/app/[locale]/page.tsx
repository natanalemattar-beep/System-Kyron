'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { LoadingScreen } from '@/components/landing/loading-screen';
import { LandingHeader } from '@/components/landing/landing-header';
import { HeroSection } from '@/components/landing';
import { PageTracker } from '@/components/page-tracker';
import { useDevicePerformance } from '@/hooks/use-device-performance';

const TrustNumbersBanner = dynamic(() => import('@/components/landing/trust-numbers-banner').then(m => ({ default: m.TrustNumbersBanner })), { ssr: false });
const WhyKyronSection = dynamic(() => import('@/components/landing/why-kyron-section').then(m => ({ default: m.WhyKyronSection })), { ssr: false });
const ModulesGridSection = dynamic(() => import('@/components/landing/modules-grid-section').then(m => ({ default: m.ModulesGridSection })), { ssr: false });
const HowItWorksSection = dynamic(() => import('@/components/landing/how-it-works-section').then(m => ({ default: m.HowItWorksSection })), { ssr: false });
const FeaturesSection = dynamic(() => import('@/components/landing/features-section').then(m => ({ default: m.FeaturesSection })), { ssr: false });
const ShowcaseSection = dynamic(() => import('@/components/landing/showcase-section').then(m => ({ default: m.ShowcaseSection })), { ssr: false });
const ServicesSection = dynamic(() => import('@/components/landing/services-section').then(m => ({ default: m.ServicesSection })), { ssr: false });
const ComplianceSection = dynamic(() => import('@/components/landing/compliance-section').then(m => ({ default: m.ComplianceSection })), { ssr: false });
const IntegrationsStrip = dynamic(() => import('@/components/landing/integrations-strip').then(m => ({ default: m.IntegrationsStrip })), { ssr: false });
const AboutUsSection = dynamic(() => import('@/components/landing/about-us-section').then(m => ({ default: m.AboutUsSection })), { ssr: false });
const CommentsSection = dynamic(() => import('@/components/landing/comments-section').then(m => ({ default: m.CommentsSection })), { ssr: false });
const FaqSection = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })), { ssr: false });
const CtaSection = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })), { ssr: false });
const Footer = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: false });
const WelcomeTutorial = dynamic(() => import('@/components/welcome-tutorial').then(m => ({ default: m.WelcomeTutorial })), { ssr: false });
const WhatsAppButton = dynamic(() => import('@/components/whatsapp-button').then(m => ({ default: m.WhatsAppButton })), { ssr: false });


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
          <LandingHeader />
        </>
      )}

      <main className="w-full">
        {mounted && (
          <>
            <HeroSection />
            <TrustNumbersBanner />
            <div className="section-divider" />
            <LazySection fallbackHeight="700px"><WhyKyronSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="600px"><ModulesGridSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="500px"><HowItWorksSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="600px"><FeaturesSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="600px"><ShowcaseSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="500px"><ServicesSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="500px"><ComplianceSection /></LazySection>
            <div className="section-divider" />
            <LazySection fallbackHeight="400px"><IntegrationsStrip /></LazySection>
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
