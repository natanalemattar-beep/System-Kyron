'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    ShieldCheck,
    ArrowRight,
    UserPlus
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from "@/components/language-switcher";

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const tHero = useTranslations('HeroSection');
    const t = useTranslations('LandingHeader');

    useEffect(() => {
        setMounted(true);
        const onScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[150] transition-all duration-500 w-full",
            isScrolled
                ? "bg-background/85 backdrop-blur-3xl py-2.5 shadow-[0_1px_20px_-4px_rgba(0,0,0,0.06)]"
                : "bg-transparent py-6 landing-hero-header"
        )}>
            {isScrolled && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            )}
            <div className="container mx-auto px-5 md:px-10">
                <div className="flex items-center justify-between h-11 w-full">
                    
                    <div className="flex items-center justify-start shrink-0">
                        <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
                            <Logo className="h-8 w-8 sm:h-9 sm:w-9 transition-all duration-300 group-hover:scale-105 drop-shadow-glow shrink-0" /> 
                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-xs sm:text-[13px] font-black tracking-[0.25em] sm:tracking-[0.3em] uppercase italic leading-none transition-colors duration-300",
                                    isScrolled ? "text-foreground" : "text-white"
                                )}>
                                    System Kyron
                                </span>
                                <span className={cn(
                                    "hidden md:inline-block text-[7px] font-bold uppercase tracking-[0.35em] mt-1 transition-opacity duration-300",
                                    isScrolled ? "kyron-gradient-text opacity-70" : "text-white/50"
                                )}>
                                    {tHero('slogan')}
                                </span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
                        <div className="hidden sm:flex items-center gap-1.5">
                            <LanguageSwitcher variant="default" align="end" />
                            <ThemeToggle />
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <Button variant="ghost" asChild data-guide="register" className={cn(
                                "rounded-xl h-9 px-5 text-[9px] font-black uppercase tracking-[0.15em] border-2 transition-all duration-300 relative overflow-hidden group",
                                isScrolled
                                    ? "border-emerald-500/30 text-emerald-500 hover:border-emerald-500/50 hover:text-emerald-400 hover:bg-emerald-500/5 hover:shadow-[0_0_15px_-4px_rgba(16,185,129,0.25)]"
                                    : "border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/50 hover:text-emerald-200"
                            )}>
                                <Link href="/register" className="flex items-center gap-2">
                                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <UserPlus className="h-3 w-3 group-hover:scale-110 transition-transform" />
                                    {t('register')}
                                </Link>
                            </Button>
                            <Button asChild data-guide="access" className="rounded-xl h-9 px-5 text-[9px] font-black uppercase tracking-[0.15em] border-0 text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-[#0ea5e9] via-[#3b82f6] to-[#0ea5e9] bg-[length:200%_100%] animate-gradient-flow">
                                <Link href="/login" className="flex items-center gap-2">
                                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <ShieldCheck className="h-3 w-3 mr-1 group-hover:scale-110 transition-transform" /> 
                                    {t('access')}
                                    <ArrowRight className="h-3 w-3 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </Button>
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className={cn(
                                        "lg:hidden rounded-xl h-9 w-9 border transition-all",
                                        isScrolled
                                            ? "bg-muted/50 border-border/60"
                                            : "bg-white/10 border-white/15 text-white"
                                    )}
                                    aria-label={t('mobile_portal')}
                                >
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[85vw] max-w-[340px] p-0 bg-background border-r border-border/30 flex flex-col">
                                <SheetHeader className="p-5 border-b border-border/20 bg-muted/5 flex flex-row items-center gap-3.5 shrink-0 space-y-0">
                                    <Logo className="h-8 w-8 shrink-0" />
                                    <div className="flex flex-col">
                                        <SheetTitle className="text-[13px] font-black tracking-tight text-foreground leading-none">{t('mobile_portal')}</SheetTitle>
                                        <span className="text-[7px] font-bold uppercase tracking-[0.2em] mt-1 text-muted-foreground/40">
                                            {tHero('slogan')}
                                        </span>
                                    </div>
                                </SheetHeader>
                                <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 px-4 mb-1">{t('mobile_portal')}</p>
                                </nav>
                                <div className="p-4 border-t border-border/20 space-y-3 bg-muted/5 shrink-0">
                                    <div className="flex items-center gap-2 pb-2.5 border-b border-border/20">
                                        <LanguageSwitcher variant="default" align="start" />
                                        <ThemeToggle />
                                    </div>
                                    <Button asChild variant="outline" className="w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest border-2 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/60 hover:text-emerald-300 hover:shadow-[0_0_20px_-4px_rgba(16,185,129,0.3)] transition-all duration-300 relative overflow-hidden group">
                                        <Link href="/register" className="flex items-center justify-center gap-2.5">
                                            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <UserPlus className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                                            {t('register')}
                                        </Link>
                                    </Button>
                                    <Button asChild className="w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest border-0 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-[#0ea5e9] via-[#3b82f6] to-[#0ea5e9] bg-[length:200%_100%] animate-gradient-flow">
                                        <Link href="/login" className="flex items-center justify-center gap-2.5">
                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <ShieldCheck className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                                            {t('access')}
                                            <ArrowRight className="h-3.5 w-3.5 opacity-70 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
