import dynamic from 'next/dynamic';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';

// Secciones principales — optimizadas para máximo impacto, mínimo scroll
const HeroSection      = dynamic(() => import('@/components/landing/hero-section').then(m => ({ default: m.HeroSection })), { ssr: true });
const FeaturesSection  = dynamic(() => import('@/components/landing/features-section').then(m => ({ default: m.FeaturesSection })), { ssr: true });
const PricingSection   = dynamic(() => import('@/components/landing/pricing-section').then(m => ({ default: m.PricingSection })), { ssr: true });
const ComplianceSection = dynamic(() => import('@/components/landing/compliance-section').then(m => ({ default: m.ComplianceSection })), { ssr: true });
const CommentsSection  = dynamic(() => import('@/components/landing/comments-section').then(m => ({ default: m.CommentsSection })), { ssr: true });
const FaqSection       = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })), { ssr: true });
const CtaSection       = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })), { ssr: true });
const Footer           = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: true });

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent">
      <LandingClientWrapper>
        <main className="w-full bg-[#03050a]">

          {/* 1. Hero — El gancho principal */}
          <div id="inicio">
            <HeroSection />
          </div>

          {/* 2. Features — Qué hace la plataforma */}
          <section id="caracteristicas">
            <FeaturesSection />
          </section>

          {/* 3. Planes — Cuánto cuesta */}
          <section id="planes">
            <PricingSection />
          </section>

          {/* 4. Cumplimiento — Por qué confiar */}
          <section id="cumplimiento">
            <ComplianceSection />
          </section>

          {/* 5. Testimonios — Prueba social */}
          <CommentsSection />

          {/* 6. FAQ — Dudas frecuentes */}
          <section id="preguntas">
            <FaqSection />
          </section>

          {/* 7. CTA — Llamado a la acción */}
          <CtaSection />

        </main>

        <div id="contacto">
          <Footer />
        </div>
      </LandingClientWrapper>
    </div>
  );
}
