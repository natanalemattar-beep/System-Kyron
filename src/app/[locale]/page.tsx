
'use client';

import { LandingHeader } from "@/components/landing/landing-header";
import { PanelControlHero } from "@/components/landing/panel-control-hero";
import { ServicesSection } from "@/components/landing";
import { Footer } from "@/components/landing";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { ChatDialog } from "@/components/chat-dialog";
import { motion, useScroll, useSpring } from "framer-motion";
import { use } from 'react';

export default function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 40, restDelta: 0.001 });

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden w-full bg-[#0a0a14]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-primary/60 origin-left z-[200]"
        style={{ scaleX }}
      />

      <LandingHeader />

      <main className="relative flex-1 w-full">
        <PanelControlHero />

        <div className="border-t border-white/5 pt-24 pb-32">
          <div className="container mx-auto px-4 md:px-10 max-w-7xl">
            <ServicesSection />
          </div>
        </div>

        <Footer />
      </main>

      <div className="fixed inset-0 pointer-events-none -z-10 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <WhatsAppButton />
      <ChatDialog />
    </div>
  );
}
