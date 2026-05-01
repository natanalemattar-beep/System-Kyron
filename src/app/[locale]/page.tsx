import dynamic from 'next/dynamic';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';

// Dynamic imports with prefetch and proper loading states
const HeroSection = dynamic(() => import('@/components/landing/hero-section').then(m => ({ default: m.HeroSection })), { ssr: true });
const TrustNumbersBanner = dynamic(() => import('@/components/landing/trust-numbers-banner').then(m => ({ default: m.TrustNumbersBanner })), { ssr: true });
const WhyKyronSection = dynamic(() => import('@/components/landing/why-kyron-section').then(m => ({ default: m.WhyKyronSection })), { ssr: true });
const ModulesGridSection = dynamic(() => import('@/components/landing/modules-grid-section').then(m => ({ default: m.ModulesGridSection })), { ssr: true });
const HowItWorksSection = dynamic(() => import('@/components/landing/how-it-works-section').then(m => ({ default: m.HowItWorksSection })), { ssr: true });
const PartnersSection = dynamic(() => import('@/components/landing/partners-section').then(m => ({ default: m.PartnersSection })), { ssr: true });
const FeaturesSection = dynamic(() => import('@/components/landing/features-section').then(m => ({ default: m.FeaturesSection })), { ssr: true });
const PricingSection = dynamic(() => import('@/components/landing/pricing-section').then(m => ({ default: m.PricingSection })), { ssr: true });
const ComplianceSection = dynamic(() => import('@/components/landing/compliance-section').then(m => ({ default: m.ComplianceSection })), { ssr: true });
const IntegrationsStrip = dynamic(() => import('@/components/landing/integrations-strip').then(m => ({ default: m.IntegrationsStrip })), { ssr: true });
const AboutUsSection = dynamic(() => import('@/components/landing/about-us-section').then(m => ({ default: m.AboutUsSection })), { ssr: true });
const CommentsSection = dynamic(() => import('@/components/landing/comments-section').then(m => ({ default: m.CommentsSection })), { ssr: true });
const ShowcaseSection = dynamic(() => import('@/components/landing/showcase-section').then(m => ({ default: m.ShowcaseSection })), { ssr: true });
const CtaSection = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })), { ssr: true });
const FaqSection = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })), { ssr: true });
const Footer = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: true });

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent">
      <LandingClientWrapper>
        <main className="w-full">
            <HeroSection />
            
            <LazySection fallbackHeight="100px">
                <TrustNumbersBanner />
            </LazySection>

            <LazySection fallbackHeight="400px">
                <WhyKyronSection />
            </LazySection>

            <LazySection fallbackHeight="600px">
                <ModulesGridSection />
            </LazySection>

            <LazySection fallbackHeight="500px">
                <HowItWorksSection />
            </LazySection>

            <LazySection fallbackHeight="200px">
                <PartnersSection />
            </LazySection>

            <LazySection fallbackHeight="400px">
                <FeaturesSection />
            </LazySection>

            <LazySection fallbackHeight="600px">
                <PricingSection />
            </LazySection>

            <LazySection fallbackHeight="400px">
                <ShowcaseSection />
            </LazySection>

            <LazySection fallbackHeight="400px">
                <ComplianceSection />
            </LazySection>

            <LazySection fallbackHeight="100px">
                <IntegrationsStrip />
            </LazySection>

            <LazySection fallbackHeight="400px">
                <AboutUsSection />
            </LazySection>

            <LazySection fallbackHeight="400px">
                <CommentsSection />
            </LazySection>

            <LazySection fallbackHeight="600px">
                <CtaSection />
            </LazySection>

            <LazySection fallbackHeight="400px">
                <FaqSection />
            </LazySection>
        </main>
        <Footer />
      </LandingClientWrapper>
    </div>
  );
}
