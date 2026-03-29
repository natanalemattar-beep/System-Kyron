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
    KeyRound
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
             isScrolled ? "bg-background/80 backdrop-blur-2xl py-3 border-b border-border/40 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08)]" : "bg-transparent py-8 landing-hero-header"
        )}>
            {isScrolled && (
                <div className="absolute bottom-0 left-0 right-0 kyron-accent-line opacity-40" />
            )}
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between h-12 w-full">
                    
                    <div className="flex items-center justify-start shrink-0">
                        <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
                            <Logo className="h-8 w-8 sm:h-10 sm:w-10 transition-all duration-500 group-hover:scale-110 drop-shadow-glow shrink-0" /> 
                            <div className="flex flex-col -mt-1">
                                <span className={cn("text-xs sm:text-sm font-black tracking-[0.3em] sm:tracking-[0.4em] uppercase italic italic-shadow leading-none transition-colors duration-500", isScrolled ? "text-foreground" : "text-white")}>System Kyron</span>
                                <span className="hidden md:inline-block text-[7px] font-bold uppercase tracking-[0.4em] mt-1 opacity-80 kyron-gradient-text">
                                    {tHero('slogan')}
                                </span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-12 flex-1">
                        {navItems.map((item) => (
                            <Link 
                                key={item.labelKey}
                                href={item.href as any} 
                                onClick={(e) => handleAnchorClick(e, item.href)}
                                className={cn("text-[9px] font-black uppercase tracking-[0.4em] hover:text-primary transition-all relative group", isScrolled ? "text-muted-foreground" : "text-white/70 hover:text-white")}
                            >
                                {t(item.labelKey)}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] transition-all group-hover:w-full" style={{ background: 'linear-gradient(90deg, hsl(192 91% 48%), hsl(217 91% 60%), hsl(152 76% 42%))' }} />
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center justify-end gap-3 sm:gap-4 shrink-0">
                        <div className="hidden sm:flex items-center gap-2">
                            <LanguageSwitcher variant="default" align="end" />
                            <ThemeToggle />
                            <Button variant="ghost" asChild className={cn("rounded-xl h-10 px-5 text-[9px] font-black uppercase tracking-[0.2em] border transition-all", isScrolled ? "border-border hover:border-primary/40 hover:text-primary" : "border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40")}>
                                <Link href="/register">{t('register')}</Link>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] kyron-gradient-bg text-white border-0 shadow-kyron hover:shadow-[0_12px_40px_-8px_rgba(14,165,233,0.3)] transition-all duration-300">
                                        <Hexagon className="h-3.5 w-3.5 mr-2.5" /> 
                                        {t('access')}
                                        <ChevronDown className="h-3 w-3 ml-2 opacity-40" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[min(520px,calc(100vw-2rem))] p-0 rounded-2xl border-border/30 bg-card/98 backdrop-blur-2xl shadow-2xl shadow-black/[0.12] overflow-hidden">
                                    <div className="p-5 pb-4 border-b border-border/20">
                                        <DropdownMenuLabel className="p-0 flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/20">
                                                <Sparkles className="h-4.5 w-4.5 text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-foreground tracking-tight">{t('control_center')}</span>
                                                <span className="text-[10px] text-muted-foreground/50 font-medium">{t('security_protocol')}</span>
                                            </div>
                                        </DropdownMenuLabel>
                                    </div>

                                    <div className="p-3 max-h-[65vh] overflow-y-auto custom-scrollbar">
                                        <div className="grid grid-cols-2 gap-2">
                                            {loginOptions.map((option) => (
                                                <DropdownMenuItem key={option.href} asChild className="rounded-xl p-0 cursor-pointer focus:bg-transparent data-[highlighted]:bg-transparent">
                                                    <Link href={option.href as any} className="flex items-center gap-3 p-3 rounded-xl border border-border/25 bg-card/50 hover:bg-card hover:border-border/50 hover:shadow-md hover:shadow-black/[0.03] hover:-translate-y-0.5 transition-all duration-200 group">
                                                        <div className={cn("h-9 w-9 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-110 transition-transform duration-200", option.gradient)}>
                                                            <option.icon className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <span className="text-[12px] font-bold text-foreground/85 group-hover:text-foreground transition-colors block">{option.label}</span>
                                                            <p className="text-[10px] text-muted-foreground/50 line-clamp-1 mt-0.5 leading-snug">{option.description}</p>
                                                        </div>
                                                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/15 group-hover:text-foreground/30 group-hover:translate-x-0.5 transition-all shrink-0" />
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-3 pt-2 border-t border-border/15">
                                        <Link href="/login" className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary/[0.04] hover:bg-primary/[0.08] border border-primary/10 hover:border-primary/20 transition-all group">
                                            <KeyRound className="h-3.5 w-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                                            <span className="text-[11px] font-semibold text-primary/70 group-hover:text-primary transition-colors">{t('see_all_services')}</span>
                                            <ArrowRight className="h-3 w-3 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
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
                                    className="lg:hidden rounded-xl h-10 w-10 bg-muted border border-border"
                                    aria-label={t('mobile_portal')}
                                >
                                    <Menu className="h-5 w-5 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-[85vw] max-w-[340px] p-0 bg-background border-r border-border flex flex-col">
                                <SheetHeader className="p-6 border-b border-border bg-muted/5 flex flex-row items-center gap-4 shrink-0 space-y-0">
                                    <Logo className="h-8 w-8 shrink-0" />
                                    <div className="flex flex-col">
                                        <SheetTitle className="text-sm font-bold tracking-tight text-foreground leading-none">{t('mobile_portal')}</SheetTitle>
                                        <span className="text-[8px] font-semibold uppercase tracking-[0.2em] mt-1 text-muted-foreground/50">
                                            {tHero('slogan')}
                                        </span>
                                    </div>
                                </SheetHeader>
                                <nav className="flex-1 overflow-y-auto p-5 flex flex-col gap-1">
                                    {navItems.map((item) => (
                                        <SheetClose key={item.labelKey} asChild>
                                            <Link 
                                                href={item.href as any} 
                                                onClick={(e) => handleAnchorClick(e, item.href)}
                                                className="text-sm font-semibold py-3.5 px-4 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all flex items-center justify-between"
                                            >
                                                {t(item.labelKey)}
                                                <ChevronRight className="h-3.5 w-3.5 opacity-20" />
                                            </Link>
                                        </SheetClose>
                                    ))}

                                    <div className="mt-3 pt-3 border-t border-border/30">
                                        <p className="text-[10px] font-semibold text-muted-foreground/40 px-4 mb-2">Portales</p>
                                        {loginOptions.map((option) => (
                                            <SheetClose key={option.href} asChild>
                                                <Link 
                                                    href={option.href as any}
                                                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-muted/30 transition-all"
                                                >
                                                    <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shrink-0", option.gradient)}>
                                                        <option.icon className="h-3.5 w-3.5" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <span className="text-[12px] font-semibold text-foreground/80">{option.label}</span>
                                                        <p className="text-[9px] text-muted-foreground/40 line-clamp-1">{option.description}</p>
                                                    </div>
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </div>
                                </nav>
                                <div className="p-5 border-t border-border space-y-3 bg-muted/5 shrink-0">
                                    <div className="flex items-center gap-2 pb-3 border-b border-border/50">
                                        <LanguageSwitcher variant="default" align="start" />
                                        <ThemeToggle />
                                    </div>
                                    <Button asChild className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-cyan-500 text-white font-bold text-xs border-0 shadow-lg">
                                        <Link href="/login"><Hexagon className="mr-2 h-3.5 w-3.5" />{t('access')}</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="w-full h-10 rounded-xl font-semibold text-xs border-border/40 hover:border-primary/30 hover:text-primary">
                                        <Link href="/register">{t('register')}</Link>
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
