'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    ChevronDown,
    Sparkles,
    ShieldCheck,
    ArrowRight,
    ChevronRight,
    KeyRound,
    UserPlus,
    User,
    Building2,
    Smartphone,
    Construction
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { loginOptions } from "@/lib/login-options";
import { BcvRateBadge } from '../bcv-rate-badge';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTheme } from "next-themes";
import { useBannerVisible } from "@/components/demo-banner";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const t = useTranslations('LandingHeader');
    const { resolvedTheme } = useTheme();
    const bannerVisible = useBannerVisible();

    const { scrollY, scrollYProgress } = useScroll();
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

    useEffect(() => {
        setMounted(true);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 30);
    });

    const navItems = [
        { labelKey: 'home' as const, href: '/' },
        { labelKey: 'platform' as const, href: '#caracteristicas' },
        { labelKey: 'plans' as const, href: '#planes' },
    ];

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.header
            className="fixed left-0 right-0 z-[150]"
            initial={false}
            animate={{
                top: isScrolled ? 12 : 0,
                y: bannerVisible ? 36 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        >
            <div className={cn(
                "mx-auto px-4 transition-all duration-500",
                isScrolled
                    ? "max-w-[1080px] rounded-[2rem] border border-white/10 bg-[#060a14]/85 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                    : "max-w-full px-6 md:px-10"
            )}>
                {/* Scroll progress bar */}
                {isScrolled && (
                    <motion.div
                        className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 origin-left"
                        style={{ scaleX: smoothProgress }}
                    />
                )}

                <div className="flex items-center justify-between h-14 sm:h-16 w-full">

                    {/* Logo */}
                    <Link href="/" prefetch={false} className="flex items-center gap-2.5 group shrink-0">
                        <Logo className="h-8 w-8 transition-transform duration-300 group-hover:scale-105 drop-shadow-glow shrink-0" />
                        <div className="flex flex-col leading-none">
                            <span className="text-[13px] font-black tracking-[0.12em] uppercase text-white">
                                System <span className="text-cyan-400">Kyron</span>
                            </span>
                            <span className={cn(
                                "text-[7px] font-bold uppercase tracking-[0.28em] bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent transition-all duration-500",
                                isScrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                            )}>
                                Intelligence Platform
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-5 flex-1 justify-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.labelKey}
                                href={item.href}
                                onClick={(e) => handleAnchorClick(e, item.href)}
                                className="relative text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-cyan-400 transition-colors duration-200 group py-1"
                            >
                                {t(item.labelKey)}
                                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-cyan-400 transition-all duration-300 group-hover:w-4" />
                            </Link>
                        ))}

                        {/* Soluciones Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-cyan-400 transition-colors duration-200 outline-none cursor-pointer">
                                {t('solutions')}
                                <ChevronDown className="h-3 w-3 opacity-50 group-data-[state=open]:rotate-180 transition-transform" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-72 p-2 rounded-2xl border border-white/[0.06] bg-card/98 backdrop-blur-3xl shadow-2xl mt-3">
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 mb-1 focus:bg-transparent">
                                    <div className="flex items-center gap-3 p-3 opacity-50 cursor-not-allowed">
                                        <div className="h-9 w-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                                            <UserPlus className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Nexo RRHH & Nómina</p>
                                            <p className="text-[11px] text-muted-foreground">Próximamente</p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 mb-1 focus:bg-transparent">
                                    <div className="flex items-center gap-3 p-3 opacity-50 cursor-not-allowed">
                                        <div className="h-9 w-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                                            <Building2 className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Nexo Contable</p>
                                            <p className="text-[11px] text-muted-foreground">Próximamente</p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="hidden lg:flex items-center gap-1.5">
                            <LanguageSwitcher variant="default" align="end" />
                            <ThemeToggle />
                        </div>
                        <div className="hidden lg:flex items-center gap-2">
                             {/* Aviso de Construcción en Header */}
                             <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <Construction className="h-3.5 w-3.5 text-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-200/60">En Construcción</span>
                            </div>
                        </div>

                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="lg:hidden rounded-xl h-9 w-9 border border-white/[0.08] text-white bg-white/[0.03]"
                                    aria-label={t('mobile_portal')}
                                >
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[88vw] max-w-[360px] p-0 bg-[#060a14] border-r border-white/[0.06] flex flex-col overflow-hidden">
                                <SheetHeader className="p-5 pb-4 border-b border-white/[0.06] flex flex-row items-center gap-3.5 shrink-0 space-y-0 bg-gradient-to-br from-cyan-500/5 to-transparent">
                                    <Logo className="h-9 w-9 shrink-0" />
                                    <div>
                                        <SheetTitle className="text-[14px] font-black tracking-tight text-white leading-none">System Kyron</SheetTitle>
                                        <span className="text-[8px] font-bold uppercase tracking-[0.3em] mt-1 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent block">
                                            Inteligencia Corporativa
                                        </span>
                                    </div>
                                </SheetHeader>
                                <div className="flex-1 overflow-y-auto">
                                    <nav className="p-4 pb-2 border-b border-white/[0.04]">
                                        <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20 mb-2 px-2">Navegación</p>
                                        {[
                                            { label: t('home'), href: '/' },
                                            { label: t('platform'), href: '#caracteristicas' },
                                            { label: t('plans'), href: '#planes' },
                                        ].map((item) => (
                                            <SheetClose key={item.href} asChild>
                                                <a href={item.href} onClick={(e) => handleAnchorClick(e as any, item.href)} className="text-sm font-semibold py-2.5 px-3 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-between cursor-pointer">
                                                    {item.label}
                                                    <ChevronRight className="h-3.5 w-3.5 opacity-20" />
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                    <div className="p-6 text-center space-y-4">
                                        <Construction className="h-12 w-12 text-amber-500 mx-auto animate-pulse" />
                                        <div className="space-y-1">
                                            <p className="text-white font-black uppercase text-xs tracking-widest">Plataforma en Desarrollo</p>
                                            <p className="text-zinc-500 text-[10px] font-medium leading-relaxed uppercase tracking-tighter">Los accesos públicos están restringidos temporalmente.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-white/[0.06] space-y-2.5 shrink-0">
                                    <div className="flex items-center gap-2 pb-3 border-b border-white/[0.05]">
                                        <LanguageSwitcher variant="default" align="start" />
                                        <ThemeToggle />
                                    </div>
                                    <div className="w-full py-4 text-center bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em]">⚠️ Mantenimiento ⚠️</span>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
