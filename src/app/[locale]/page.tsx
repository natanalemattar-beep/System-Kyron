import dynamic from 'next/dynamic';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';
import { HeroSectionOptimized } from '@/components/landing/hero-section-optimized';
import Image from 'next/image';

const FeaturesSection = dynamic(() =>
  import('@/components/landing/features-section').then((m) => ({
    default: m.FeaturesSection,
  })),
  { loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-2xl" /> }
);
const SustainabilitySection = dynamic(() =>
  import('@/components/landing/SustainabilitySection').then((m) => ({
    default: m.SustainabilitySection,
  })),
  { loading: () => <div className="h-80 animate-pulse bg-white/5 rounded-2xl" /> }
);
const ModulesSection = dynamic(() =>
  import('@/components/landing/modules-section').then((m) => ({
    default: m.ModulesSection,
  })),
  { loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-2xl" /> }
);
const FaqSection = dynamic(() =>
  import('@/components/landing/faq-section').then((m) => ({ default: m.FaqSection })),
  { loading: () => <div className="h-80 animate-pulse bg-white/5 rounded-2xl" /> }
);
const CtaSection = dynamic(() =>
  import('@/components/landing/cta-section').then((m) => ({ default: m.CtaSection })),
  { loading: () => <div className="h-64 animate-pulse bg-white/5 rounded-2xl" /> }
);
const Footer = dynamic(() =>
  import('@/components/landing/footer').then((m) => ({ default: m.Footer })),
  { loading: () => <div className="h-96 animate-pulse bg-white/5" /> }
);

const showcaseImages = [
  { src: '/images/landing/hero-dashboard.webp', alt: 'Neural Command Center' },
  { src: '/images/landing/features-analytics.webp', alt: 'Corporate Intelligence' },
  { src: '/images/landing/hero-bg.webp', alt: 'Cyber-Sec Infrastructure' },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen selection:bg-kyron-cyan/30 w-full bg-background text-foreground">
      <LandingClientWrapper>
        <main className="w-full">
          <section id="inicio">
            <HeroSectionOptimized />
          </section>

          <section className="relative w-full overflow-hidden py-12 md:py-20 mesh-gradient">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {showcaseImages.map((img, i) => (
                  <div
                    key={i}
                    className="group overflow-hidden rounded-[2rem] bg-background/40 dark:bg-white/[0.02] border border-border/50 dark:border-white/[0.06] shadow-xl transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden rounded-[2rem]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        priority={i === 0}
                        className="object-cover transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0 transition-all">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/90 drop-shadow-lg">
                          {img.alt}
                        </p>
                      </div>
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
