import dynamic from 'next/dynamic';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';

// Above-the-fold — SSR for SEO & LCP
const HeroSection      = dynamic(() => import('@/components/landing/hero-section-optimized').then(m => ({ default: m.HeroSectionOptimized })), { ssr: true });
const FeaturesSection  = dynamic(() => import('@/components/landing/features-section').then(m => ({ default: m.FeaturesSection })), { ssr: true });

// Below-the-fold — loaded dynamically
const CtaSection        = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })));
const Footer            = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })));

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

          {/* 3. CTA — El cierre rápido */}
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
