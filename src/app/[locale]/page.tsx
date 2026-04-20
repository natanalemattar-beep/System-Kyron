import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';

// Dynamic imports with prefetch and proper loading states
const PartnersSection = dynamic(() => import('@/components/landing/partners-section').then(m => ({ default: m.PartnersSection })), { ssr: true });
const PricingSection = dynamic(() => import('@/components/landing/pricing-section').then(m => ({ default: m.PricingSection })), { ssr: true });
const CtaSection = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })), { ssr: true });
const FaqSection = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })), { ssr: true });
const Footer = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: true });

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent">
      <LandingClientWrapper>
        <main className="w-full">
            <HeroSection />
            <LazySection fallbackHeight="200px">
                <PartnersSection />
            </LazySection>
            <LazySection fallbackHeight="600px">
                <PricingSection />
            </LazySection>
            <LazySection fallbackHeight="600px">
                <CtaSection />
            </LazySection>
            <LazySection fallbackHeight="400px">
                <FaqSection />
            </LazySection>
        </main>
        <LazySection fallbackHeight="200px">
            <Footer />
        </LazySection>
      </LandingClientWrapper>
    </div>
  );
}
