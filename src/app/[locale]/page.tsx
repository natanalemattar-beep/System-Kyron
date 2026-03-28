'use client';

import dynamic from 'next/dynamic';
import { HeroSection } from "@/components/landing/hero-section";
import { LandingHeader } from "@/components/landing/landing-header";
import { motion, useScroll, useSpring } from "framer-motion";
import { WelcomeTutorial } from "@/components/welcome-tutorial";
import { DemoBanner } from "@/components/demo-banner";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PageTracker } from "@/components/page-tracker";
import { use, Suspense } from 'react';

const ServicesSection = dynamic(() => import("@/components/landing/services-section").then(m => ({ default: m.ServicesSection })), { ssr: false });
const AboutUsSection = dynamic(() => import("@/components/landing/about-us-section").then(m => ({ default: m.AboutUsSection })), { ssr: false });
const CommentsSection = dynamic(() => import("@/components/landing/comments-section").then(m => ({ default: m.CommentsSection })), { ssr: false });
const FaqSection = dynamic(() => import("@/components/landing/faq-section").then(m => ({ default: m.FaqSection })), { ssr: false });
const CtaSection = dynamic(() => import("@/components/landing/cta-section").then(m => ({ default: m.CtaSection })), { ssr: false });
const Footer = dynamic(() => import("@/components/landing/footer").then(m => ({ default: m.Footer })), { ssr: false });

export default function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 40, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden selection:bg-primary/20 w-full bg-transparent">
      <PageTracker />
      <WelcomeTutorial />

      <DemoBanner />

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/60 shadow-glow origin-left z-[200]"
        style={{ scaleX }}
      />

      <LandingHeader />

      <main className="flex-1 w-full">
        <HeroSection />

        <Suspense fallback={null}>
          <ServicesSection />
        </Suspense>

        <Suspense fallback={null}>
          <AboutUsSection />
        </Suspense>

        <Suspense fallback={null}>
          <CommentsSection />
        </Suspense>

        <Suspense fallback={null}>
          <FaqSection />
        </Suspense>

        <Suspense fallback={null}>
          <CtaSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <WhatsAppButton />
    </div>
  );
}
