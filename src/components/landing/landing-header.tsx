'use client';

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    ChevronDown,
    Sparkles,
    ShieldCheck
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

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const t = useTranslations('HeroSection');

    const handleScroll = useCallback(() => {
        const scrolled = window.scrollY > 20;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    }, [isScrolled]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const navItems = [
        { label: 'Inicio', href: '#inicio' },
        { label: 'Ecosistema', href: '#servicios' },
        { label: 'Nosotros', href: '#nosotros' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contacto', href: '#contacto' }
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
             isScrolled ? "bg-background/80 backdrop-blur-3xl py-3 border-b border-border shadow-2xl" : "bg-transparent py-8"
        )}>
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between h-12 w-full">
                    
                    {/* LOGO (LEFT) */}
                    <div className="flex items-center justify-start shrink-0">
                        <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
                            <Logo className="h-8 w-8 sm:h-10 sm:w-10 transition-all duration-500 group-hover:scale-110 drop-shadow-glow shrink-0" /> 
                            <div className="flex flex-col -mt-1">
                                <span className="text-xs sm:text-sm font-black tracking-[0.3em] sm:tracking-[0.4em] text-foreground uppercase italic italic-shadow leading-none">System Kyron</span>
                                <span className="hidden md:inline-block text-[7px] font-bold text-primary uppercase tracking-[0.4em] mt-1 opacity-80">
                                    {t('slogan')}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* NAV (CENTER) */}
                    <nav className="hidden lg:flex items-center justify-center gap-8 xl:gap-12 flex-1">
                        {navItems.map((item) => (
                            <Link 
                                key={item.label}
                                href={item.href as any} 
                                onClick={(e) => handleAnchorClick(e, item.href)}
                                className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all relative group"
                            >
                                {item.label}
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary transition-all group-hover:w-full shadow-glow"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* ACTIONS (RIGHT) */}
                    <div className="flex items-center justify-end gap-3 sm:gap-6 shrink-0">
                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] btn-3d-primary shadow-glow">
                                        <ShieldCheck className="h-3.5 w-3.5 mr-2.5" /> 
                                        ACCESO
                                        <ChevronDown className="h-3 w-3 ml-2 opacity-40" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[480px] p-0 rounded-[2rem] border-border bg-card/95 backdrop-blur-3xl shadow-2xl overflow-hidden">
                                    <div className="p-8 border-b border-border bg-muted/30">
                                        <DropdownMenuLabel className="p-0 flex items-center gap-4">
                                            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                                                <Sparkles className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black uppercase tracking-[0.3em] text-foreground">Centro de Control</span>
                                                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-1 italic">Protocolo de Seguridad Nivel 5</span>
                                            </div>
                                        </DropdownMenuLabel>
                                    </div>
                                    <div className="p-6 grid grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                        {loginOptions.map((option) => (
                                            <DropdownMenuItem key={option.href} asChild className="rounded-2xl p-4 cursor-pointer focus:bg-primary/10 border border-border bg-muted/10 hover:border-primary/30 transition-all">
                                                <Link href={option.href as any} className="flex items-start gap-4">
                                                    <div className="p-2 bg-primary/5 rounded-lg">
                                                        <option.icon className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-black text-[10px] uppercase italic text-foreground/90">{option.label}</span>
                                                        <p className="text-[8px] text-muted-foreground line-clamp-1 font-medium">{option.description}</p>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                    <div className="p-4 bg-muted/20 border-t border-border text-center">
                                        <Link href="/login" className="text-[8px] font-black uppercase tracking-[0.4em] text-primary hover:text-foreground transition-colors">Ver Todos los Servicios</Link>
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
                                    aria-label="Menú móvil"
                                >
                                    <Menu className="h-5 w-5 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-background border-l-border">
                                <SheetHeader className="p-10 border-b border-border flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Logo className="h-8 w-8" />
                                        <SheetTitle className="text-xl font-black tracking-tight text-foreground uppercase italic">PORTAL KYRON</SheetTitle>
                                    </div>
                                </SheetHeader>
                                <nav className="p-10 flex flex-col gap-2">
                                    {navItems.map((item) => (
                                        <SheetClose key={item.label} asChild>
                                            <Link 
                                                href={item.href as any} 
                                                onClick={(e) => handleAnchorClick(e, item.href)}
                                                className="text-lg font-black uppercase tracking-[0.2em] py-4 border-b border-border text-muted-foreground hover:text-primary transition-all"
                                            >
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    <div className="pt-10">
                                        <Button asChild className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase tracking-widest text-[10px]">
                                            <Link href="/login">ACCEDER AL PORTAL</Link>
                                        </Button>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}