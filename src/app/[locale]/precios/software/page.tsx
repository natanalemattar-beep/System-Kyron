import { LandingClientWrapper } from '@/components/landing/landing-client-wrapper';
import { PricingSection } from '@/components/landing/pricing-section';
import { LazySection } from '@/components/landing/lazy-section';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('@/components/landing/footer').then(m => ({ default: m.Footer })), { ssr: true });

export default function SoftwarePricingPage() {
  return (
    <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent">
      <LandingClientWrapper>
        <main className="w-full pt-20">
            <PricingSection category="software" />
        </main>
        <LazySection fallbackHeight="200px">
            <Footer />
        </LazySection>
      </LandingClientWrapper>
    </div>
  );
}
