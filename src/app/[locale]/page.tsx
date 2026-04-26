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
const AboutUsSection = dynamic(() => import('@/components/landing/about-us-section').then(m => ({ default: m.AboutUsSection })), { ssr: true });
const AccountingSpecialSection = dynamic(() => import('@/components/landing/accounting-special-section').then(m => ({ default: m.AccountingSpecialSection })), { ssr: true });
const PillarShowcaseSection = dynamic(() => import('@/components/landing/pillar-showcase-section').then(m => ({ default: m.PillarShowcaseSection })), { ssr: true });
const PublicAssistant = dynamic(() => import('@/components/ai/public-assistant').then(m => ({ default: m.PublicAssistant })), { ssr: false });


import { JsonLd } from '@/components/seo/json-ld';

export default function LandingPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://system-kyron.vercel.app');

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "System Kyron",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/og-image.png`
        },
        "description": "Ecosistema corporativo de misión crítica para Venezuela. Especialistas en Contabilidad VEN-NIF, Telecomunicaciones 5G e IA Legal.",
        "sameAs": [
          "https://twitter.com/systemkyron",
          "https://linkedin.com/company/systemkyron"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "System Kyron",
        "publisher": { "@id": `${baseUrl}/#organization` }
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
                <AccountingSpecialSection />
            </LazySection>
            <LazySection fallbackHeight="600px">
                <PillarShowcaseSection />
            </LazySection>

            <LazySection fallbackHeight="600px">
                <AboutUsSection />
            </LazySection>
            <LazySection fallbackHeight="600px">
                <CtaSection />
            </LazySection>
            <LazySection fallbackHeight="600px">
                <PublicAssistant />
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
