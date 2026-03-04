'use client';

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    UserCircle,
    ChevronDown,
    Sparkles,
    ArrowRight
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

    const leftLinks = [
      { href: "#inicio", label: "Inicio" },
      { href: "/ecosistema", label: "Ecosistema" },
    ];

    const rightLinks = [
      { href: "#servicios", label: "Servicios" },
      { href: "#nosotros", label: "Nosotros" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[150] transition-all duration-300 gpu-accelerated",
             isScrolled ? "bg-background/85 backdrop-blur-xl py-2 border-b shadow-lg" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16 relative">
                    
                    {/* Izquierda: Navegación (Escritorio) */}
                    <nav className="hidden lg:flex items-center gap-8 flex-1">
                        {leftLinks.map((link) => (
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

                    {/* Centro: Identidad de Marca */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                        <Link href="/" className="flex flex-col items-center group pointer-events-auto">
                            <Logo className="h-12 w-12 mb-1 transition-transform duration-300 group-hover:scale-105" /> 
                            <span className="text-xs font-black tracking-tighter text-primary uppercase italic">System Kyron</span>
                        </Link>
                    </div>

                    {/* Derecha: Acciones y Navegación Secundaria */}
                    <div className="flex items-center justify-end gap-6 flex-1">
                        <nav className="hidden lg:flex items-center gap-8 mr-4">
                            {rightLinks.map((link) => (
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

                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-xl h-11 px-6 text-[10px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5 shadow-inner group transition-all">
                                        <UserCircle className="h-4 w-4 mr-2 text-primary" /> 
                                        ACCESO
                                        <ChevronDown className="h-3 w-3 ml-2 opacity-40 group-data-[state=open]:rotate-180 transition-transform" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[640px] p-0 rounded-[2rem] border-primary/10 bg-background/95 backdrop-blur-3xl shadow-2xl overflow-hidden">
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
                                    <div className="px-8 pb-8 pt-2 space-y-6 max-h-[60vh] overflow-y-auto">
                                        <section>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Portal Ciudadano</span>
                                                <div className="h-px flex-1 bg-border/50"></div>
                                            </div>
                                            {loginOptions.filter(o => o.href === '/login-personal').map((option) => (
                                                <DropdownMenuItem key={option.href} asChild className="rounded-2xl p-4 cursor-pointer focus:bg-primary/5 border border-primary/5 mb-4">
                                                    <Link href={option.href} className="flex items-center gap-4">
                                                        <div className="p-3 bg-primary/10 rounded-xl">
                                                            <option.icon className="h-6 w-6 text-primary" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="font-black text-xs uppercase italic text-primary">{option.label}</span>
                                                            <p className="text-[10px] text-muted-foreground leading-tight">{option.description}</p>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </section>
                                        <section>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Portales Corporativos</span>
                                                <div className="h-px flex-1 bg-border/50"></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {loginOptions.filter(o => o.href !== '/login-personal').map((option) => (
                                                    <DropdownMenuItem key={option.href} asChild className="rounded-xl p-3 cursor-pointer focus:bg-primary/5">
                                                        <Link href={option.href} className="flex items-start gap-3">
                                                            <div className="p-2 bg-primary/5 rounded-lg">
                                                                <option.icon className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col gap-0.5">
                                                                <span className="font-black text-[10px] uppercase italic">{option.label}</span>
                                                                <p className="text-[8px] text-muted-foreground line-clamp-1">{option.description}</p>
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden rounded-xl h-11 w-11 bg-muted/50 shadow-inner hover:bg-primary/10 transition-all">
                                    <Menu className="h-5 w-5 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col overflow-hidden border-l-primary/10">
                                <div className="p-8 border-b flex flex-col items-center gap-4 bg-primary/5">
                                    <Logo className="h-14 w-14" /> 
                                    <div className="text-center">
                                        <span className="text-lg font-black tracking-tighter text-primary uppercase italic">System Kyron</span>
                                        <p className="text-[8px] font-black uppercase tracking-[0.5em] opacity-40 mt-1">Interfaz Móvil</p>
                                    </div>
                                </div>
                                <nav className="flex-grow p-6 space-y-8 overflow-y-auto">
                                    <section>
                                        <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.4em] mb-4 italic">Navegación</p>
                                        <div className="flex flex-col gap-1">
                                            {[...leftLinks, ...rightLinks].map((link) => (
                                                <SheetClose asChild key={link.href}>
                                                    <Link href={link.href as any} className="text-[10px] font-black uppercase tracking-[0.2em] py-4 px-4 border-b border-white/5 flex items-center justify-between group">
                                                        {link.label}
                                                        <ArrowRight className="h-3 w-3 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <p className="text-[9px] font-black uppercase text-primary/60 tracking-[0.4em] mb-4 italic">Portales de Acceso</p>
                                        <div className="grid grid-cols-1 gap-2">
                                            {loginOptions.map((option) => (
                                                <SheetClose asChild key={option.href}>
                                                    <Link href={option.href as any} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5 active:bg-primary/5 transition-all">
                                                        <div className="p-2 bg-primary/10 rounded-lg">
                                                            <option.icon className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <span className="font-black text-[10px] uppercase italic">{option.label}</span>
                                                    </Link>
                                                </SheetClose>
                                            ))}
                                        </div>
                                    </section>
                                </nav>
                                <div className="p-6 border-t border-white/5 bg-muted/20 text-center">
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">Estado del Sistema: Conectado</p>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
