import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing';
import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { LazySection } from '@/components/landing/lazy-section';

// Dynamic imports with prefetch and proper loading states
const PartnersSection = dynamic(() => import('@/components/landing/partners-section').then(m => ({ default: m.PartnersSection })), { ssr: true });
const CtaSection = dynamic(() => import('@/components/landing/cta-section').then(m => ({ default: m.CtaSection })), { ssr: true });
const FaqSection = dynamic(() => import('@/components/landing/faq-section').then(m => ({ default: m.FaqSection })), { ssr: true });
const Footer = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: true });
const FeaturesGrid = dynamic(() => import('@/components/landing/features-grid').then(m => ({ default: m.FeaturesGrid })), { ssr: true });
import { JsonLd } from '@/components/seo/json-ld';

export default function LandingPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://systemkyron.replit.app/#organization",
        "name": "System Kyron",
        "url": "https://systemkyron.replit.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://systemkyron.replit.app/og-image.png"
        },
        "description": "Ecosistema corporativo de misión crítica para Venezuela. Especialistas en Contabilidad VEN-NIF, Telecomunicaciones 5G e IA Legal.",
        "sameAs": [
          "https://twitter.com/systemkyron",
          "https://linkedin.com/company/systemkyron"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://systemkyron.replit.app/#website",
        "url": "https://systemkyron.replit.app",
        "name": "System Kyron",
        "publisher": { "@id": "https://systemkyron.replit.app/#organization" }
      },
      {
        "@type": "SoftwareApplication",
        "name": "System Kyron Platform",
        "operatingSystem": "All",
        "applicationCategory": "BusinessApplication",
        "description": "Plataforma integral de gestión empresarial, contabilidad y telecomunicaciones 5G para el mercado venezolano.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent overflow-x-hidden">
      <JsonLd data={structuredData} />
      <LandingClientWrapper>
        <main className="w-full">
            <HeroSection />
            <LazySection fallbackHeight="200px">
                <PartnersSection />
            </LazySection>
            <LazySection fallbackHeight="800px">
                <FeaturesGrid />
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
