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
    Printer,
    Receipt,
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
import { motion, useMotionValueEvent, useScroll, useTransform, useSpring } from "framer-motion";

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const tHero = useTranslations('HeroSection');
    const t = useTranslations('LandingHeader');
    const { resolvedTheme } = useTheme();
    const isDark = mounted && resolvedTheme === 'dark';
    const bannerVisible = useBannerVisible();

    const { scrollY } = useScroll();
    const headerBlur = useTransform(scrollY, [0, 60], [0, 24]);
    const headerOpacity = useTransform(scrollY, [0, 40], [0, 1]);
    const smoothBlur = useSpring(headerBlur, { stiffness: 200, damping: 30 });
    const smoothOpacity = useSpring(headerOpacity, { stiffness: 200, damping: 30 });
    const borderGlowOpacity = useTransform(scrollY, [10, 80], [0, 0.3]);
    const smoothBorderGlow = useSpring(borderGlowOpacity, { stiffness: 150, damping: 25 });

    useEffect(() => {
        setMounted(true);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    const navItems = [
        { labelKey: 'home' as const, href: '/' },
        { labelKey: 'platform' as const, href: '#caracteristicas' },
        { label: 'Soluciones', href: '#caracteristicas' },
        { label: 'Soporte', href: '/soporte' }
    ];

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <motion.div
            initial={false}
            animate={{
                top: bannerVisible
                    ? (isScrolled ? 44 : 36)
                    : (isScrolled ? 12 : 0),
                paddingTop: isScrolled ? 6 : 24,
                paddingBottom: isScrolled ? 6 : 24,
                borderRadius: isScrolled ? 20 : 0,
                marginLeft: isScrolled ? 12 : 0,
                marginRight: isScrolled ? 12 : 0,
            }}
            transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
                mass: 0.9,
            }}
            className={cn(
                "fixed left-0 right-0 z-[150] transition-[background-color,box-shadow,backdrop-filter,border-color] duration-500 ease-out",
                isScrolled
                    ? cn(
                        "border",
                        isDark
                            ? "bg-[#060a14]/85 backdrop-blur-2xl border-white/[0.06] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6),0_2px_16px_-4px_rgba(14,165,233,0.08)]"
                            : "bg-white/80 backdrop-blur-2xl border-black/[0.04] shadow-[0_8px_40px_-8px_rgba(0,0,0,0.1),0_2px_16px_-4px_rgba(14,165,233,0.06)]"
                      )
                    : "bg-transparent shadow-none backdrop-blur-0 border-transparent landing-hero-header"
            )}
            role="banner"
        >
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                    scaleX: isScrolled ? 1 : 0,
                    opacity: isScrolled ? 0.5 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25, delay: isScrolled ? 0.15 : 0 }}
                className="absolute -bottom-[1px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent origin-center rounded-full"
            />
            <div className="container mx-auto px-5 md:px-10">
                <div className="flex items-center justify-between h-16 sm:h-20 w-full">
                    
                    <div className="flex items-center justify-start shrink-0">
                        <Link href="/" prefetch={false} className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
                            <Logo className="h-8 w-8 sm:h-9 sm:w-9 transition-all duration-300 group-hover:scale-105 drop-shadow-glow shrink-0" /> 
                            <div className="flex flex-col">
                                <span className={cn(
                                    "text-xs sm:text-[13px] font-black tracking-[0.15em] sm:tracking-wide uppercase leading-none transition-colors duration-500",
                                    "text-foreground"
                                )}>
                                    System Kyron
                                </span>
                                <span className={cn(
                                    "hidden md:inline-block text-[7px] font-bold uppercase tracking-[0.3em] mt-1 transition-opacity duration-500",
                                    "bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent opacity-0"
                                )}>
                                    System Kyron
                                </span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-10 flex-1">
                        <Link 
                            href="/" 
                            className={cn(
                                "text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group py-1 cursor-pointer",
                                isScrolled ? "text-foreground/70 hover:text-cyan-400" : "text-foreground/65 hover:text-cyan-500"
                            )}
                        >
                            {t('home')}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
                        </Link>

                        {/* Dropdown de Plataforma */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(
                                "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group py-1 cursor-pointer outline-none",
                                isScrolled ? "text-foreground/70 hover:text-cyan-400" : "text-foreground/65 hover:text-cyan-500"
                            )}>
                                {t('platform')}
                                <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-transform group-data-[state=open]:rotate-180" />
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full group-data-[state=open]:w-full" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-64 p-2 rounded-2xl border border-white/[0.06] bg-card/98 backdrop-blur-3xl shadow-2xl mt-2">
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                    <a href="#caracteristicas" onClick={(e) => handleAnchorClick(e, '#caracteristicas')} className="flex items-center gap-3 p-3 hover:bg-white/[0.04]">
                                        <Sparkles className="h-4 w-4 text-cyan-400" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{t('features')}</span>
                                    </a>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                    <a href="#beneficios" onClick={(e) => handleAnchorClick(e, '#beneficios')} className="flex items-center gap-3 p-3 hover:bg-white/[0.04]">
                                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{t('benefits')}</span>
                                    </a>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Dropdown de Soluciones */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(
                                "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group py-1 cursor-pointer outline-none",
                                isScrolled ? "text-foreground/70 hover:text-cyan-400" : "text-foreground/65 hover:text-cyan-500"
                            )}>
                                {t('solutions')}
                                <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-transform group-data-[state=open]:rotate-180" />
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full group-data-[state=open]:w-full" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-80 p-2 rounded-2xl border border-white/[0.06] bg-card/98 backdrop-blur-3xl shadow-2xl mt-2">
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 mb-1 focus:bg-transparent">
                                    <Link href="/dashboard-rrhh" prefetch={false} className="flex items-center gap-4 p-3 hover:bg-white/[0.04] transition-all group">
                                        <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                                            <UserPlus className="h-5 w-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Nexo RRHH & Nómina</span>
                                            <span className="text-[11px] text-muted-foreground">Gestión LOTTT Integral</span>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 mb-1 focus:bg-transparent">
                                    <Link href="/dashboard-empresa" prefetch={false} className="flex items-center gap-4 p-3 hover:bg-white/[0.04] transition-all group">
                                        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                            <Building2 className="h-5 w-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Nexo Contable</span>
                                            <span className="text-[11px] text-muted-foreground">VEN-NIF & SENIAT 360</span>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer p-0 focus:bg-transparent">
                                    <Link href="/mi-linea" prefetch={false} className="flex items-center gap-4 p-3 hover:bg-white/[0.04] transition-all group">
                                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                                            <Smartphone className="h-5 w-5" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Nexo Telecom</span>
                                            <span className="text-[11px] text-muted-foreground">Gestión de Flota & 5G</span>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Planes */}
                        <a 
                            href="#servicios" 
                            onClick={(e) => handleAnchorClick(e, '#servicios')}
                            className={cn(
                                "text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group py-1 cursor-pointer",
                                isScrolled ? "text-foreground/70 hover:text-cyan-400" : "text-foreground/65 hover:text-cyan-500"
                            )}
                        >
                            {t('plans')}
                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
                        </a>

                        {/* Dropdown de Empresa */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(
                                "flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group py-1 cursor-pointer outline-none",
                                isScrolled ? "text-foreground/70 hover:text-cyan-400" : "text-foreground/65 hover:text-cyan-500"
                            )}>
                                {t('company')}
                                <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-transform group-data-[state=open]:rotate-180" />
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full group-data-[state=open]:w-full" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="center" className="w-64 p-2 rounded-2xl border border-white/[0.06] bg-card/98 backdrop-blur-3xl shadow-2xl mt-2">
                                <DropdownMenuItem asChild className="rounded-xl cursor-pointer">
                                    <Link href="/pitch" className="flex items-center gap-3 p-3 hover:bg-white/[0.04]">
                                        <Sparkles className="h-4 w-4 text-amber-400" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{t('pitch')}</span>
                                    </Link>
                                </DropdownMenuItem>
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

                    <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
                        <div className="hidden sm:flex items-center gap-1.5">
                            <LanguageSwitcher variant="default" align="end" />
                            <ThemeToggle />
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <div className="hidden lg:block mr-1">
                                <BcvRateBadge />
                            </div>
                            
                            {/* BÓTON DE PITCH DESTACADO PARA COMPETENCIA */}
                            <Button variant="ghost" asChild className={cn(
                                "rounded-xl h-9 px-4 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative overflow-hidden group border",
                                isScrolled 
                                    ? "bg-slate-900/80 border-amber-500/40 text-amber-400 hover:border-amber-400 hover:text-amber-300 hover:bg-slate-800 shadow-lg shadow-amber-500/20"
                                    : "bg-slate-900/50 backdrop-blur-md border-amber-500/30 text-amber-400 hover:bg-slate-900/80 hover:border-amber-400 shadow-lg shadow-amber-500/10"
                            )}>
                                <Link href="/pitch" className="flex items-center gap-1.5">
                                    <span className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/15 to-amber-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    <Sparkles className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                                    PITCH
                                </Link>
                            </Button>

                            <Button variant="ghost" asChild data-guide="register" className={cn(
                                "rounded-xl h-9 px-4 lg:px-5 text-[10px] font-bold uppercase tracking-[0.15em] border-2 transition-all duration-300 relative overflow-hidden group",
                                isScrolled
                                    ? "border-emerald-500/25 text-emerald-400 hover:border-emerald-500/40 hover:text-emerald-300 hover:bg-emerald-500/5"
                                    : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/40"
                            )}>
                                <Link href="/register" prefetch={false} className="flex items-center gap-2">
                                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                    <UserPlus className="h-3 w-3 group-hover:scale-110 transition-transform" />
                                    {t('register')}
                                </Link>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button data-guide="access" className="rounded-xl h-9 px-5 text-[10px] font-bold uppercase tracking-[0.15em] border-0 text-white shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600">
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/15" />
                                        <ShieldCheck className="h-3.5 w-3.5 mr-2 group-hover:scale-110 transition-transform drop-shadow-sm" /> 
                                        {t('access')}
                                        <ChevronDown className="h-2.5 w-2.5 ml-1.5 opacity-70" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[min(520px,calc(100vw-2rem))] p-0 rounded-2xl border border-white/[0.06] bg-card/98 backdrop-blur-3xl shadow-2xl shadow-black/[0.15] overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />
                                    <div className="p-5 pb-4 border-b border-white/[0.06]">
                                        <DropdownMenuLabel className="p-0 flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                                <Sparkles className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-foreground tracking-tight">{t('control_center')}</span>
                                                <span className="text-[10px] text-muted-foreground/40 font-medium">{t('security_protocol')}</span>
                                            </div>
                                        </DropdownMenuLabel>
                                    </div>

                                    <div className="p-3 max-h-[65vh] overflow-y-auto custom-scrollbar">
                                        <div className="grid grid-cols-2 gap-1.5">
                                            {loginOptions.map((option) => (
                                                <DropdownMenuItem key={option.href} asChild className="rounded-xl p-0 cursor-pointer focus:bg-transparent data-[highlighted]:bg-transparent">
                                                    <Link href={option.href as any} prefetch={false} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/[0.08] hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group">
                                                        <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200", option.gradient)}>
                                                            <option.icon className="h-3.5 w-3.5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <span className="text-[11px] font-bold text-foreground/60 group-hover:text-foreground/80 transition-colors block">{option.label}</span>
                                                            <p className="text-[10px] text-muted-foreground/30 line-clamp-1 mt-0.5 leading-snug">{option.description}</p>
                                                        </div>
                                                        <ChevronRight className="h-3 w-3 text-muted-foreground/10 group-hover:text-foreground/20 group-hover:translate-x-0.5 transition-all shrink-0" />
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

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className={cn(
                                        "lg:hidden rounded-xl h-9 w-9 border transition-all duration-500",
                                        isScrolled
                                            ? "bg-white/[0.03] border-white/[0.08] text-foreground"
                                            : "bg-black/[0.03] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.06] text-foreground"
                                    )}
                                    aria-label={t('mobile_portal')}
                                >
                                    <Menu className="h-4 w-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[88vw] max-w-[360px] p-0 bg-[#060a14] border-r border-white/[0.06] flex flex-col overflow-hidden">
                                {/* Header */}
                                <SheetHeader className="p-5 pb-4 border-b border-white/[0.06] flex flex-row items-center gap-3.5 shrink-0 space-y-0 bg-gradient-to-br from-cyan-500/5 to-transparent">
                                    <Logo className="h-9 w-9 shrink-0 drop-shadow-[0_0_12px_rgba(34,211,238,0.4)]" />
                                    <div className="flex flex-col">
                                        <SheetTitle className="text-[14px] font-black tracking-tight text-white leading-none">System Kyron</SheetTitle>
                                        <span className="text-[8px] font-bold uppercase tracking-[0.3em] mt-1 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                            Inteligencia Corporativa
                                        </span>
                                    </div>
                                </SheetHeader>

                                {/* Scrollable body */}
                                <div className="flex-1 overflow-y-auto">
                                    {/* Nav links */}
                                    <nav className="p-4 pb-2 border-b border-white/[0.04]">
                                        <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20 mb-2 px-2">Navegación</p>
                                        <SheetClose asChild>
                                            <Link href="/" className="text-sm font-semibold py-2.5 px-3 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-between cursor-pointer">
                                                {t('home')}
                                                <ChevronRight className="h-3.5 w-3.5 opacity-20" />
                                            </Link>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <a href="#caracteristicas" onClick={(e) => handleAnchorClick(e, '#caracteristicas')} className="text-sm font-semibold py-2.5 px-3 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-between cursor-pointer">
                                                {t('platform')}
                                                <ChevronRight className="h-3.5 w-3.5 opacity-20" />
                                            </a>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <a href="#servicios" onClick={(e) => handleAnchorClick(e, '#servicios')} className="text-sm font-semibold py-2.5 px-3 rounded-xl text-white/50 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-between cursor-pointer">
                                                {t('plans')}
                                                <ChevronRight className="h-3.5 w-3.5 opacity-20" />
                                            </a>
                                        </SheetClose>
                                        <SheetClose asChild>
                                            <Link href="/pitch" className="text-sm font-semibold py-2.5 px-3 rounded-xl text-amber-400/60 hover:text-amber-300 hover:bg-amber-500/[0.05] transition-all flex items-center justify-between cursor-pointer">
                                                {t('pitch')}
                                                <ChevronRight className="h-3.5 w-3.5 opacity-20" />
                                            </Link>
                                        </SheetClose>
                                    </nav>

                                    {/* Portals */}
                                    <div className="p-4 border-b border-white/[0.04]">
                                        <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/20 mb-3 px-1">Acceder a un Portal</p>
                                        <div className="grid grid-cols-1 gap-1.5">
                                            {loginOptions.map((option) => (
                                                <SheetClose key={option.href} asChild>
                                                    <Link href={option.href as any} prefetch={false} className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.05] hover:border-white/[0.08] transition-all group">
                                                        <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform", option.gradient)}>
                                                            <option.icon className="h-3.5 w-3.5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <span className="text-[12px] font-bold text-white/70 group-hover:text-white transition-colors block leading-tight">{option.label}</span>
                                                            <p className="text-[10px] text-white/25 line-clamp-1 mt-0.5 leading-snug">{option.description}</p>
                                                        </div>
                                                        <ChevronRight className="h-3.5 w-3.5 text-white/10 group-hover:text-white/30 transition-colors shrink-0" />
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer CTAs */}
                                <div className="p-4 border-t border-white/[0.06] space-y-2.5 bg-white/[0.01] shrink-0">
                                    <div className="flex items-center gap-2 pb-3 border-b border-white/[0.05]">
                                        <LanguageSwitcher variant="default" align="start" />
                                        <ThemeToggle />
                                    </div>
                                    <Button asChild variant="outline" className="w-full h-12 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] border-2 border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/[0.06] hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden group">
                                        <Link href="/register" prefetch={false} className="flex items-center justify-center gap-2.5">
                                            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                            <UserPlus className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                                            {t('register')}
                                        </Link>
                                    </Button>
                                    <Button asChild className="w-full h-12 rounded-2xl font-bold text-xs uppercase tracking-[0.15em] border-0 text-white shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600">
                                        <Link href="/login" prefetch={false} className="flex items-center justify-center gap-2.5">
                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" />
                                            <ShieldCheck className="h-4 w-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                                            {t('access')}
                                            <ArrowRight className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-1 transition-transform duration-300" />
                                        </Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>

                    </div>
                </div>
            </div>
        </motion.div>
    )
}
