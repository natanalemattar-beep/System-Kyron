import dynamic from 'next/dynamic';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';

// Above-the-fold — SSR for SEO & LCP
const HeroSection      = dynamic(() => import('@/components/landing/hero-section-optimized').then(m => ({ default: m.HeroSectionOptimized })), { ssr: true });
const FeaturesSection  = dynamic(() => import('@/components/landing/features-section').then(m => ({ default: m.FeaturesSection })), { ssr: true });

// Below-the-fold — client-side only, loaded lazily via IntersectionObserver
const PricingSection    = dynamic(() => import('@/components/landing/pricing-section').then(m => ({ default: m.PricingSection })), { ssr: false });
const ComplianceSection = dynamic(() => import('@/components/landing/compliance-section').then(m => ({ default: m.ComplianceSection })), { ssr: false });
const CommentsSection   = dynamic(() => import('@/components/landing/comments-section').then(m => ({ default: m.CommentsSection })), { ssr: false });
const FaqSection        = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })), { ssr: false });
const CtaSection        = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })), { ssr: false });
const Footer            = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: false });

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent">
      <LandingClientWrapper>
        <main className="w-full bg-[#03050a]">

          {/* 1. Hero — El gancho principal (SSR) */}
          <div id="inicio">
            <HeroSection />
          </div>

          {/* 2. Features — Qué hace la plataforma (SSR) */}
          <section id="caracteristicas">
            <FeaturesSection />
          </section>

          {/* 3. Planes — lazy (client-side) */}
          <LazySection fallbackHeight="600px">
            <section id="planes">
              <PricingSection />
            </section>
          </LazySection>

          {/* 4. Cumplimiento — lazy */}
          <LazySection fallbackHeight="400px">
            <section id="cumplimiento">
              <ComplianceSection />
            </section>
          </LazySection>

          {/* 5. Testimonios — lazy */}
          <LazySection fallbackHeight="400px">
            <CommentsSection />
          </LazySection>

          {/* 6. FAQ — lazy */}
          <LazySection fallbackHeight="300px">
            <section id="preguntas">
              <FaqSection />
            </section>
          </LazySection>

          {/* 7. CTA — lazy */}
          <LazySection fallbackHeight="200px">
            <CtaSection />
          </LazySection>

        </main>

        <LazySection fallbackHeight="200px">
          <div id="contacto">
            <Footer />
          </div>
        </LazySection>
      </LandingClientWrapper>
    </div>
  );
}
