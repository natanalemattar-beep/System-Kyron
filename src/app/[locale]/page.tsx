import dynamic from 'next/dynamic';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';
import Image from 'next/image';

// Above-the-fold — SSR for SEO & LCP
const HeroSection      = dynamic(() => import('@/components/landing/hero-section-optimized').then(m => ({ default: m.HeroSectionOptimized })), { ssr: true });
const FeaturesSection  = dynamic(() => import('@/components/landing/features-section').then(m => ({ default: m.FeaturesSection })), { ssr: true });
const SustainabilitySection = dynamic(() => import('@/components/landing/SustainabilitySection').then(m => ({ default: m.SustainabilitySection })), { ssr: true });

// Below-the-fold — loaded dynamically
const FaqSection        = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })));
const CtaSection        = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })));
const Footer            = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })));

const showImages = [
  { src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200&auto=format&fit=crop", alt: "System Kyron Intelligence Core" },
  { src: "https://images.unsplash.com/photo-1639322537228-f710d8463eaa?q=80&w=1200&auto=format&fit=crop", alt: "Digital Security Shield" },
  { src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop", alt: "Technology Infrastructure" },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30 w-full bg-[#030712] text-white font-outfit">
      <LandingClientWrapper>
        <main className="w-full">

          {/* 1. Hero — El gancho principal (SSR) */}
          <div id="inicio">
            <HeroSection />
          </div>

          {/* 1.5 Showcase — Imagenes de alto impacto */}
          <section className="relative w-full overflow-hidden py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {showImages.map((img, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-3xl aspect-[4/3] bg-slate-900/50 border border-white/5">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/80">{img.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 2. Features — Qué hace la plataforma (SSR) */}
          <section id="caracteristicas">
            <FeaturesSection />
          </section>

          {/* 2.5 Sustainability — Impacto Ambiental (SSR) */}
          <SustainabilitySection />

          {/* 3. FAQ — Dudas comunes */}
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
