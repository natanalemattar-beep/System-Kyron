import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { PricingSection } from '@/components/landing/pricing-section';
import { LazySection } from '@/components/landing/lazy-section';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: true, loading: () => <div className="h-96 animate-pulse bg-white/5" /> });

export default function HardwarePricingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent">
      <LandingClientWrapper>
        <main className="w-full pt-20">
            <PricingSection />
        </main>
        <LazySection fallbackHeight="200px">
            <Footer />
        </LazySection>
      </LandingClientWrapper>
    </div>
  );
}
