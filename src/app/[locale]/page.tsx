
'use client';

import { HeroSection, ServicesSection, FeaturesSection, AboutUsSection, FaqSection, CtaSection, Footer } from '@/components/landing';
import { LandingHeader } from "@/components/landing/landing-header";
import { ChatDialog } from "@/components/chat-dialog";
import { DynamicBackground } from '@/components/ui/dynamic-background';

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <DynamicBackground />
            <LandingHeader />
            <main className="flex-1 pt-16">
                <HeroSection />
                <ServicesSection />
                <FeaturesSection />
                <AboutUsSection />
                <FaqSection />
                <CtaSection />
            </main>
            <Footer />
            <ChatDialog />
        </div>
    );
}
