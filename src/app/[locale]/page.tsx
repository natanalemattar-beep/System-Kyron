import dynamic from 'next/dynamic';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';
import { HeroSectionOptimized } from '@/components/landing/hero-section-optimized';
import Image from 'next/image';

const FeaturesSection = dynamic(() =>
  import('@/components/landing/features-section').then((m) => ({
    default: m.FeaturesSection,
  }))
);
const SustainabilitySection = dynamic(() =>
  import('@/components/landing/SustainabilitySection').then((m) => ({
    default: m.SustainabilitySection,
  }))
);
const ModulesSection = dynamic(() =>
  import('@/components/landing/modules-section').then((m) => ({
    default: m.ModulesSection,
  }))
);
const FaqSection = dynamic(() =>
  import('@/components/landing/faq-section').then((m) => ({ default: m.FaqSection }))
);
const CtaSection = dynamic(() =>
  import('@/components/landing/cta-section').then((m) => ({ default: m.CtaSection }))
);
const Footer = dynamic(() =>
  import('@/components/landing/footer').then((m) => ({ default: m.Footer }))
);

const showcaseImages = [
  {
    src: '/images/landing/hero-dashboard.webp',
    alt: 'Neural Command Center',
  },
  {
    src: '/images/landing/features-analytics.webp',
    alt: 'Corporate Intelligence',
  },
  {
    src: '/images/landing/hero-bg.webp',
    alt: 'Cyber-Sec Infrastructure',
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-kyron-cyan/30 w-full bg-background text-foreground">
      <LandingClientWrapper>
        <main className="w-full">
          <section id="inicio">
            <HeroSectionOptimized />
          </section>

          <section className="relative w-full overflow-hidden py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {showcaseImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative group overflow-hidden rounded-3xl aspect-[4/3] bg-muted dark:bg-slate-900/50 border border-border dark:border-white/5"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      priority={i === 0}
                      className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                        {img.alt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="caracteristicas">
            <FeaturesSection />
          </section>

          <LazySection fallbackHeight="500px">
            <ModulesSection />
          </LazySection>

          <SustainabilitySection />

          <LazySection fallbackHeight="600px">
            <section id="faq">
              <FaqSection />
            </section>
          </LazySection>

          <LazySection fallbackHeight="400px">
            <CtaSection />
          </LazySection>
        </main>

        <LazySection fallbackHeight="200px">
          <section id="contacto">
            <Footer />
          </section>
        </LazySection>
      </LandingClientWrapper>
    </div>
  );
}
