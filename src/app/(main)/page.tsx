'use client';

import { HeroSection, ServicesSection, FeaturesSection, AboutUsSection, FaqSection, CtaSection } from '@/components/landing';
import { WelcomeTutorial } from '@/components/welcome-tutorial';

export default function LandingPage() {
    
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <FeaturesSection />
            <AboutUsSection />
            <FaqSection />
            <CtaSection />
            <WelcomeTutorial />
        </>
    );
}
