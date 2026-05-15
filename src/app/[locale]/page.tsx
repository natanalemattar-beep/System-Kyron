import dynamic from 'next/dynamic';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';

// Above-the-fold — SSR for SEO & LCP
const HeroSection      = dynamic(() => import('@/components/landing/hero-section-optimized').then(m => ({ default: m.HeroSectionOptimized })), { ssr: true });
const FeaturesSection  = dynamic(() => import('@/components/landing/features-section').then(m => ({ default: m.FeaturesSection })), { ssr: true });
const SustainabilitySection = dynamic(() => import('@/components/landing/SustainabilitySection').then(m => ({ default: m.SustainabilitySection })), { ssr: true });

// Below-the-fold — loaded dynamically
const PricingSection    = dynamic(() => import('@/components/landing/pricing-section').then(m => ({ default: m.PricingSection })));
const FaqSection        = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })));
const CtaSection        = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })));
const Footer            = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })));

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30 w-full bg-[#030712] text-white font-outfit">
      <LandingClientWrapper>
        <main className="w-full">

          {/* 1. Hero — El gancho principal (SSR) */}
          <div id="inicio">
            <HeroSection />
          </div>

          {/* 2. Features — Qué hace la plataforma (SSR) */}
          <section id="caracteristicas">
            <FeaturesSection />
          </section>

          {/* 2.5 Sustainability — Impacto Ambiental (SSR) */}
          <SustainabilitySection />

          {/* 3. Pricing — Planes y precios */}
          <LazySection fallbackHeight="800px">
            <PricingSection />
          </LazySection>

          {/* 4. FAQ — Dudas comunes */}
          <LazySection fallbackHeight="600px">
            <div id="faq">
              <FaqSection />
            </div>
          </LazySection>

          {/* 5. CTA — El cierre rápido */}
          <LazySection fallbackHeight="400px">
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
