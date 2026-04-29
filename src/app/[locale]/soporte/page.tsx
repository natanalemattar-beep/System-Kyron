import { FaqSection } from "@/components/landing/faq-section";
import { LandingClientWrapper } from "@/components/landing/landing-client-wrapper";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";

export default function SoportePage() {
    return (
        <div className="relative min-h-screen selection:bg-primary/20 w-full bg-transparent overflow-x-hidden">
            <LandingClientWrapper>
                <LandingHeader />
                <main className="pt-24">
                    <FaqSection />
                </main>
                <Footer />
            </LandingClientWrapper>
        </div>
    );
}
