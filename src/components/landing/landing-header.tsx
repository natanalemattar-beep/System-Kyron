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
    Smartphone
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
                y: bannerVisible && !isScrolled ? 36 : 0,
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
                    <nav className="hidden xl:flex items-center gap-7 flex-1 justify-center">
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
                                    <Link href="/dashboard-rrhh" prefetch={false} className="flex items-center gap-3 p-3 hover:bg-white/[0.04] transition-all group">
                                        <div className="h-9 w-9 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400 shrink-0">
                                            <UserPlus className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Nexo RRHH & Nómina</p>
                                            <p className="text-[11px] text-muted-foreground">Gestión LOTTT Integral</p>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 mb-1 focus:bg-transparent">
                                    <Link href="/dashboard-empresa" prefetch={false} className="flex items-center gap-3 p-3 hover:bg-white/[0.04] transition-all group">
                                        <div className="h-9 w-9 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                                            <Building2 className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Nexo Contable</p>
                                            <p className="text-[11px] text-muted-foreground">VEN-NIF & SENIAT 360</p>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 focus:bg-transparent">
                                    <Link href="/mi-linea" prefetch={false} className="flex items-center gap-3 p-3 hover:bg-white/[0.04] transition-all group">
                                        <div className="h-9 w-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                                            <Smartphone className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Nexo Telecom</p>
                                            <p className="text-[11px] text-muted-foreground">Gestión de Flota & 5G</p>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Empresa Dropdown */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 hover:text-cyan-400 transition-colors duration-200 outline-none cursor-pointer">
                                {t('company')}
                                <ChevronDown className="h-3 w-3 opacity-50 transition-transform group-data-[state=open]:rotate-180" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-56 p-2 rounded-2xl border border-white/[0.06] bg-card/98 backdrop-blur-3xl shadow-2xl mt-3">
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                    <Link href="/soporte" className="flex items-center gap-3 p-3 hover:bg-white/[0.04]">
                                        <ShieldCheck className="h-4 w-4 text-blue-400" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{t('support')}</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                    <a href="#contacto" onClick={(e) => handleAnchorClick(e, '#contacto')} className="flex items-center gap-3 p-3 hover:bg-white/[0.04]">
                                        <User className="h-4 w-4 text-emerald-400" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{t('contact')}</span>
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="hidden sm:flex items-center gap-1.5">
                            <LanguageSwitcher variant="default" align="end" />
                            <ThemeToggle />
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <div className="hidden xl:block">
                                <BcvRateBadge />
                            </div>
                            <Button variant="ghost" asChild className="h-9 px-4 text-[10px] font-black uppercase tracking-[0.18em] border border-white/10 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                <Link href="/register" prefetch={false} className="flex items-center gap-1.5">
                                    <UserPlus className="h-3.5 w-3.5" />
                                    {t('register')}
                                </Link>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="h-9 px-5 text-[10px] font-black uppercase tracking-[0.18em] rounded-xl bg-zinc-900 border border-white/10 hover:border-cyan-500/40 text-white transition-all relative overflow-hidden group">
                                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                        <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-cyan-400" />
                                        {t('access')}
                                        <ChevronDown className="h-3 w-3 ml-1.5 opacity-40" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[min(500px,calc(100vw-2rem))] p-0 rounded-2xl border border-white/[0.06] bg-card/98 backdrop-blur-3xl shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                                    <div className="p-4 pb-3 border-b border-white/[0.06]">
                                        <DropdownMenuLabel className="p-0 flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                                <Sparkles className="h-4 w-4 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">Panel de Gestión</p>
                                                <p className="text-[10px] text-muted-foreground/40">Acceso Seguro</p>
                                            </div>
                                        </DropdownMenuLabel>
                                    </div>
                                    <div className="p-3 max-h-[60vh] overflow-y-auto">
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {loginOptions.map((option) => (
                                                <DropdownMenuItem key={option.href} asChild className="rounded-xl p-0 cursor-pointer focus:bg-transparent data-[highlighted]:bg-transparent">
                                                    <Link href={option.href as any} prefetch={false} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/[0.08] hover:-translate-y-0.5 transition-all duration-200 group">
                                                        <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform", option.gradient)}>
                                                            <option.icon className="h-3.5 w-3.5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[11px] font-bold text-foreground/60 group-hover:text-foreground/80 transition-colors">{option.label}</p>
                                                            <p className="text-[9px] text-muted-foreground/30 line-clamp-1 mt-0.5">{option.description}</p>
                                                        </div>
                                                        <ChevronRight className="h-3 w-3 text-muted-foreground/10 group-hover:text-foreground/20 transition-all shrink-0" />
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="p-3 pt-2 border-t border-white/[0.04]">
                                        <Link href="/login" prefetch={false} className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/[0.04] hover:bg-cyan-500/[0.08] border border-cyan-500/10 hover:border-cyan-500/20 transition-all group">
                                            <KeyRound className="h-3 w-3 text-cyan-400/50 group-hover:text-cyan-400 transition-colors" />
                                            <span className="text-[10px] font-semibold text-cyan-400/50 group-hover:text-cyan-400 transition-colors">{t('see_all_services')}</span>
                                            <ArrowRight className="h-2.5 w-2.5 text-cyan-400/30 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                                        </Link>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="xl:hidden rounded-xl h-9 w-9 border border-white/[0.08] text-white bg-white/[0.03]"
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
                                            { label: t('support'), href: '/soporte' },
                                        ].map((item) => (
                                            <SheetClose key={item.href} asChild>
                                                <a href={item.href} onClick={(e) => handleAnchorClick(e as any, item.href)} className="text-sm font-semibold py-2.5 px-3 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-between cursor-pointer">
                                                    {item.label}
                                                    <ChevronRight className="h-3.5 w-3.5 opacity-20" />
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                    <div className="p-4 border-b border-white/[0.04]">
                                        <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20 mb-3 px-1">Acceder a un Portal</p>
                                        <div className="grid grid-cols-1 gap-1.5">
                                            {loginOptions.map((option) => (
                                                <SheetClose key={option.href} asChild>
                                                    <Link href={option.href as any} prefetch={false} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all group">
                                                        <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0", option.gradient)}>
                                                            <option.icon className="h-3.5 w-3.5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[12px] font-bold text-white/70 group-hover:text-white block">{option.label}</p>
                                                            <p className="text-[10px] text-white/25 line-clamp-1 mt-0.5">{option.description}</p>
                                                        </div>
                                                        <ChevronRight className="h-3.5 w-3.5 text-white/10 shrink-0" />
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 border-t border-white/[0.06] space-y-2.5 shrink-0">
                                    <div className="flex items-center gap-2 pb-3 border-b border-white/[0.05]">
                                        <LanguageSwitcher variant="default" align="start" />
                                        <ThemeToggle />
                                    </div>
                                    <Button asChild variant="outline" className="w-full h-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] border-2 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/[0.06] hover:border-emerald-500/40">
                                        <Link href="/register" prefetch={false} className="flex items-center justify-center gap-2">
                                            <UserPlus className="h-4 w-4" />
                                            {t('register')}
                                        </Link>
                                    </Button>
                                    <Button asChild className="w-full h-12 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600">
                                        <Link href="/login" prefetch={false} className="flex items-center justify-center gap-2">
                                            <ShieldCheck className="h-4 w-4" />
                                            {t('access')}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
