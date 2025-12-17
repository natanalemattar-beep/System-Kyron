
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { loginOptions } from "@/lib/login-options";
import dynamic from "next/dynamic";
import { ThemeToggle } from "@/components/theme-toggle";
import type { FC, AnchorHTMLAttributes } from 'react';
import { HeroSection, ServicesSection, FeaturesSection, AboutUsSection, FaqSection, CtaSection, Footer } from '@/components/landing';
import { AppHeader } from "@/components/app-header";
import { adminNavGroups } from "@/components/app-sidebar-nav-items";
import { LandingHeader } from "@/components/landing/landing-header";


const ChatDialog = dynamic(() => import('@/components/chat-dialog').then(mod => mod.ChatDialog), { ssr: false });


export default function LandingPage() {
    
    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
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
