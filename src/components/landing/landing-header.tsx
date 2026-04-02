'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    ChevronDown,
    Sparkles,
    ShieldCheck,
    Hexagon,
    ArrowRight,
    ChevronRight,
    KeyRound,
    Zap,
    Shield,
    BarChart3,
    UserPlus
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

    const navItems = [
        { labelKey: 'home' as const, href: '#inicio' },
        { labelKey: 'ecosystem' as const, href: '#servicios' },
        { labelKey: 'about' as const, href: '#nosotros' },
        { labelKey: 'faq' as const, href: '#faq' },
        { labelKey: 'contact' as const, href: '#contacto' }
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
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[150] transition-all duration-500 w-full",
            isScrolled
                ? "bg-background/80 backdrop-blur-3xl py-2.5 shadow-[0_1px_20px_-4px_rgba(14,165,233,0.06),0_4px_16px_-8px_rgba(0,0,0,0.04)]"
                : "bg-transparent py-6 landing-hero-header"
        )}>
            {isScrolled && (
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
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

                    <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-10 flex-1">
                        {navItems.map((item) => (
                            <Link 
                                key={item.labelKey}
                                href={item.href as any} 
                                onClick={(e) => handleAnchorClick(e, item.href)}
                                className={cn(
                                    "text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-200 relative group py-1",
                                    isScrolled
                                        ? "text-muted-foreground/70 hover:text-primary"
                                        : "text-white/60 hover:text-white"
                                )}
                            >
                                {t(item.labelKey)}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] rounded-full bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button data-guide="access" className="rounded-xl h-9 px-5 text-[9px] font-black uppercase tracking-[0.15em] border-0 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] via-[#3b82f6] to-[#8b5cf6] bg-[length:300%_100%] animate-gradient-flow">
                                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                        <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
                                        <ShieldCheck className="h-3.5 w-3.5 mr-2 group-hover:scale-110 transition-transform drop-shadow-sm" /> 
                                        {t('access')}
                                        <ChevronDown className="h-2.5 w-2.5 ml-1.5 opacity-70" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[min(520px,calc(100vw-2rem))] p-0 rounded-2xl border-border/30 bg-card/98 backdrop-blur-3xl shadow-2xl shadow-black/[0.08] overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                                    <div className="p-5 pb-4 border-b border-border/15">
                                        <DropdownMenuLabel className="p-0 flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/20">
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
                                                    <Link href={option.href as any} className="flex items-center gap-3 p-3 rounded-xl border border-border/20 bg-card/40 hover:bg-card hover:border-border/40 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group">
                                                        <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200", option.gradient)}>
                                                            <option.icon className="h-3.5 w-3.5" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <span className="text-[11px] font-bold text-foreground/80 group-hover:text-foreground transition-colors block">{option.label}</span>
                                                            <p className="text-[9px] text-muted-foreground/40 line-clamp-1 mt-0.5 leading-snug">{option.description}</p>
                                                        </div>
                                                        <ChevronRight className="h-3 w-3 text-muted-foreground/10 group-hover:text-foreground/25 group-hover:translate-x-0.5 transition-all shrink-0" />
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-3 pt-2 border-t border-border/10">
                                        <Link href="/login" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/[0.04] hover:bg-primary/[0.08] border border-primary/10 hover:border-primary/20 transition-all group">
                                            <KeyRound className="h-3 w-3 text-primary/50 group-hover:text-primary transition-colors" />
                                            <span className="text-[10px] font-semibold text-primary/60 group-hover:text-primary transition-colors">{t('see_all_services')}</span>
                                            <ArrowRight className="h-2.5 w-2.5 text-primary/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
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
                                <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-0.5">
                                    {navItems.map((item) => (
                                        <SheetClose key={item.labelKey} asChild>
                                            <Link 
                                                href={item.href as any} 
                                                onClick={(e) => handleAnchorClick(e, item.href)}
                                                className="text-sm font-semibold py-3 px-4 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-all flex items-center justify-between"
                                            >
                                                {t(item.labelKey)}
                                                <ChevronRight className="h-3.5 w-3.5 opacity-15" />
                                            </Link>
                                        </SheetClose>
                                    ))}

                                    <div className="mt-4 pt-4 border-t border-border/10">
                                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 px-4 mb-2.5">{t('mobile_portal')}</p>
                                        <div className="grid grid-cols-4 gap-1.5 px-1">
                                            {[
                                                { icon: Zap, label: "IA", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/15" },
                                                { icon: Shield, label: "AES-256", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/15" },
                                                { icon: BarChart3, label: "Analítica", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/15" },
                                                { icon: Hexagon, label: "Blockchain", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/15" },
                                            ].map((feat) => (
                                                <div key={feat.label} className={cn("flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border", feat.border, feat.bg, "transition-all duration-200")}>
                                                    <feat.icon className={cn("h-3.5 w-3.5", feat.color)} />
                                                    <span className="text-[7px] font-bold text-center text-muted-foreground/50 leading-tight">{feat.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
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
                                    <Button asChild className="w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest border-0 text-white shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-[#06b6d4] via-[#0ea5e9] via-[#3b82f6] to-[#8b5cf6] bg-[length:300%_100%] animate-gradient-flow">
                                        <Link href="/login" className="flex items-center justify-center gap-2.5">
                                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                                            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" />
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
        </header>
    )
}
