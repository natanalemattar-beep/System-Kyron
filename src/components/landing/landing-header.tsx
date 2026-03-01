'use client';

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    UserCircle,
    Zap,
    ChevronDown,
    LayoutGrid,
    Sparkles,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { loginOptions } from "@/lib/login-options";

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

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

    const navLinks = [
      { href: "#inicio", label: "Inicio" },
      { href: "/ecosistema", label: "Ecosistema" },
      { href: "#servicios", label: "Servicios" },
      { href: "#tecnologia", label: "Tecnología" },
      { href: "#nosotros", label: "Nosotros" },
      { href: "#faq", label: "FAQ" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[150] transition-all duration-300 gpu-accelerated",
             isScrolled ? "bg-background/85 backdrop-blur-xl py-2 border-b shadow-lg" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16 relative">
                    
                    {/* Left: Navigation (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-8 flex-1">
                        {navLinks.slice(0, 4).map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href as any} 
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/70 hover:text-primary transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Center: Absolute Brand Identity */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                        <Link href="/" className="flex flex-col items-center group pointer-events-auto">
                            <div className="relative">
                                <Logo className="h-12 w-12 mb-1 relative z-10 transition-transform duration-300 group-hover:scale-105" /> 
                            </div>
                            <span className="text-sm font-black tracking-tighter text-primary uppercase leading-none mt-1 italic">System Kyron</span>
                        </Link>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center justify-end gap-2 md:gap-4 flex-1">
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="hidden xs:block">
                                <ThemeToggle />
                            </div>
                            
                            {/* BOTÓN DE ACCESO: Organizado por Secciones */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-xl h-10 md:h-11 px-3 md:px-6 text-[10px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5 shadow-inner group bg-background/50 backdrop-blur-sm transition-all duration-200">
                                        <UserCircle className="h-4 w-4 md:mr-2 text-primary" /> 
                                        <span className="hidden sm:inline">ACCESO</span>
                                        <ChevronDown className="h-3 w-3 ml-1 md:ml-2 opacity-40 group-data-[state=open]:rotate-180 transition-transform" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[90vw] sm:w-[640px] p-0 rounded-[2.5rem] border-primary/10 bg-background/95 backdrop-blur-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                    <div className="p-8 pb-4">
                                        <DropdownMenuLabel className="px-0 py-0 flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Sparkles className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Ecosistema Kyron</span>
                                                <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Selecciona tu portal de gestión</span>
                                            </div>
                                        </DropdownMenuLabel>
                                    </div>
                                    
                                    <div className="px-8 pb-8 pt-2 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                        {/* Sección Ciudadana */}
                                        <section>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Portal Ciudadano</span>
                                                <div className="h-px flex-1 bg-border/50"></div>
                                            </div>
                                            <div className="grid grid-cols-1">
                                                {loginOptions.filter(o => o.href === '/login-personal').map((option) => (
                                                    <DropdownMenuItem key={option.href} asChild className="rounded-2xl p-5 cursor-pointer focus:bg-primary/5 group/item border border-primary/5 hover:border-primary/20 transition-all bg-primary/[0.02]">
                                                        <Link href={option.href} className="flex items-center gap-6">
                                                            <div className="p-4 bg-primary/10 rounded-2xl group-hover/item:bg-primary/20 transition-all shadow-inner">
                                                                <option.icon className="h-7 w-7 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5 flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-black text-sm tracking-tight uppercase italic text-primary">{option.label}</span>
                                                                    <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">Biométrico</span>
                                                                </div>
                                                                <p className="text-xs text-muted-foreground leading-relaxed font-medium opacity-80">{option.description}</p>
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>
                                        </section>

                                        {/* Sección Corporativa */}
                                        <section>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Portales Corporativos</span>
                                                <div className="h-px flex-1 bg-border/50"></div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {loginOptions.filter(o => o.href !== '/login-personal').map((option) => (
                                                    <DropdownMenuItem key={option.href} asChild className="rounded-xl p-4 cursor-pointer focus:bg-primary/5 group/item border border-transparent focus:border-primary/10 transition-all">
                                                        <Link href={option.href} className="flex items-start gap-4">
                                                            <div className="p-2.5 bg-primary/5 rounded-xl group-hover/item:bg-primary/10 transition-all shadow-inner">
                                                                <option.icon className="h-5 w-5 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col gap-1">
                                                                <span className="font-black text-xs tracking-tight uppercase italic leading-none">{option.label}</span>
                                                                <p className="text-[9px] text-muted-foreground leading-tight font-medium opacity-70 group-hover/item:opacity-100 line-clamp-2">{option.description}</p>
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                    
                                    <div className="p-4 bg-muted/30 border-t flex justify-center">
                                        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic">System Kyron Secured • Nivel 5</p>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button asChild className="hidden sm:flex rounded-xl h-11 px-8 btn-3d-primary text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl h-10 md:h-11 w-10 md:w-11 bg-muted/50 shadow-inner hover:bg-primary/10 transition-all active:scale-95">
                                    <Menu className="h-5 w-5 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col overflow-hidden border-l-primary/10 shadow-2xl">
                                <div className="p-10 border-b flex flex-col items-center gap-4 bg-gradient-to-br from-primary/10 to-transparent">
                                    <Logo className="h-16 w-16" /> 
                                    <div className="text-center">
                                        <span className="text-xl font-black tracking-tighter text-primary uppercase italic">System Kyron</span>
                                        <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40 mt-1">Ecosistema Global</p>
                                    </div>
                                </div>
                                <nav className="flex-grow flex flex-col p-6 gap-2 overflow-y-auto custom-scrollbar">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.4em] mb-4 italic px-4">Navegación</p>
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <Link href={link.href as any} className="text-xs font-black uppercase tracking-[0.2em] text-foreground hover:text-primary py-4 px-4 border-b border-border/30 hover:pl-6 transition-all flex items-center justify-between group">
                                                {link.label}
                                                <LayoutGrid className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    
                                    <div className="pt-8 space-y-4 px-2">
                                        <Button asChild className="w-full justify-center rounded-xl h-14 btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">
                                            <Link href="/register">REGISTRARSE <Zap className="ml-2 h-4 w-4 text-yellow-400 fill-yellow-400"/></Link>
                                        </Button>
                                        <div className="flex justify-center sm:hidden">
                                            <ThemeToggle />
                                        </div>
                                    </div>
                                </nav>
                                <div className="mt-auto p-8 text-center border-t border-border/50 bg-muted/20">
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">System Status: Synchronized</span>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
