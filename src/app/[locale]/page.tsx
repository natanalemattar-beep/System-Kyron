
'use client';

import {
  ServicesSection,
  AboutUsSection,
  CommentsSection,
  FaqSection,
  CtaSection,
  Footer,
  HeroSection
} from "@/components/landing";
import { LandingHeader } from "@/components/landing/landing-header";
import { motion, useScroll, useSpring } from "framer-motion";
import { WelcomeTutorial } from "@/components/welcome-tutorial";
import { DemoBanner } from "@/components/demo-banner";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PageTracker } from "@/components/page-tracker";
import { use } from 'react';

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

      <main className="relative flex-1 w-full">
        <HeroSection />

        <div className="space-y-0 pb-0">
          <div className="container mx-auto px-4 md:px-10 max-w-7xl">
            <ServicesSection />
          </div>

          <AboutUsSection />

          <CommentsSection />

          <div className="container mx-auto px-4 md:px-10 max-w-7xl">
            <FaqSection />
            <CtaSection />
          </div>

          <Footer />
        </div>
      </main>

      <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.03] dark:opacity-[0.05] hud-grid" />

      <WhatsAppButton />
    </div>
  );
}
