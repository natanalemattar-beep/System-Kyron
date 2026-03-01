
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
    User,
    Building2,
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
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { loginOptions } from "@/lib/login-options";

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isAccesoOpen, setIsAccesoOpen] = useState(false);

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
            "fixed top-0 left-0 right-0 z-[150] transition-all duration-300",
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

                    {/* Right: Actions + Menú (PC & Móvil) */}
                    <div className="flex items-center justify-end gap-4 flex-1">
                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-xl h-11 px-6 text-[10px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5 shadow-inner group">
                                        <UserCircle className="h-4 w-4 mr-2 text-primary" /> 
                                        ACCESO
                                        <ChevronDown className="h-3 w-3 ml-2 opacity-40 group-data-[state=open]:rotate-180 transition-transform" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[600px] p-6 rounded-[2.5rem] border-primary/10 bg-background/95 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                                    <DropdownMenuLabel className="px-4 py-2 flex items-center gap-3">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Ecosistema Kyron</span>
                                            <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Selecciona tu portal de gestión</span>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="my-4 opacity-50" />
                                    <div className="grid grid-cols-2 gap-3">
                                        {loginOptions.map((option) => (
                                            <DropdownMenuItem key={option.href} asChild className="rounded-2xl p-4 cursor-pointer focus:bg-primary/5 group/item border border-transparent focus:border-primary/10 transition-all">
                                                <Link href={option.href} className="flex items-start gap-4">
                                                    <div className="p-3 bg-primary/10 rounded-xl group-hover/item:bg-primary/20 transition-all shadow-inner">
                                                        <option.icon className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="font-black text-xs tracking-tight uppercase italic leading-none">{option.label}</span>
                                                        <p className="text-[9px] text-muted-foreground leading-tight font-medium opacity-70 group-hover/item:opacity-100">{option.description}</p>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button asChild className="rounded-xl h-11 px-8 btn-3d-primary text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50 shadow-inner hover:bg-primary/10 transition-all active:scale-95">
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
                                        <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.4em] mb-4 italic px-2">Portales de Gestión</p>
                                        <div className="flex flex-col gap-4">
                                            <Collapsible open={isAccesoOpen} onOpenChange={setIsAccesoOpen} className="w-full">
                                                <CollapsibleTrigger asChild>
                                                    <Button variant="outline" className="w-full justify-between rounded-xl h-14 font-black uppercase text-[10px] tracking-widest border-primary/20 shadow-md px-6">
                                                        <span>ACCESO AL SISTEMA</span> 
                                                        <ChevronDown className={cn("h-4 w-4 text-primary transition-transform duration-300", isAccesoOpen && "rotate-180")} />
                                                    </Button>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className="animate-in fade-in slide-in-from-top-2 duration-300 pt-4 space-y-6">
                                                    {/* Sección Ciudadano con Envoltorio */}
                                                    <div className="p-4 rounded-[1.5rem] bg-primary/[0.03] border border-primary/10 space-y-4">
                                                        <div className="flex items-center gap-2 px-2">
                                                            <User className="h-3 w-3 text-primary" />
                                                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Portal Ciudadano</span>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {loginOptions.filter(o => o.href === '/login-personal').map((option) => (
                                                                <Link 
                                                                    key={option.href} 
                                                                    href={option.href as any}
                                                                    className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-primary/5 hover:border-primary/20 transition-all group/item shadow-sm hover:shadow-md"
                                                                >
                                                                    <div className="p-2 bg-primary/5 rounded-xl shadow-inner">
                                                                        <option.icon className="h-5 w-5 text-primary" />
                                                                    </div>
                                                                    <span className="text-[10px] font-black uppercase tracking-tight italic">{option.label}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Sección Corporativa con Envoltorio */}
                                                    <div className="p-4 rounded-[1.5rem] bg-secondary/[0.03] border border-border/50 space-y-4">
                                                        <div className="flex items-center gap-2 px-2">
                                                            <Building2 className="h-3 w-3 text-muted-foreground" />
                                                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground">Portales Corporativos</span>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {loginOptions.filter(o => o.href !== '/login-personal').map((option) => (
                                                                <Link 
                                                                    key={option.href} 
                                                                    href={option.href as any}
                                                                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-background border border-border/50 transition-all text-center group/item h-24 shadow-sm hover:shadow-md hover:border-primary/20"
                                                                >
                                                                    <div className="p-2 bg-secondary/5 rounded-xl mb-2 transition-transform shadow-inner group-hover/item:scale-110">
                                                                        <option.icon className="h-4 w-4 text-primary" />
                                                                    </div>
                                                                    <span className="text-[7px] font-black uppercase tracking-tighter leading-tight">{option.label}</span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </CollapsibleContent>
                                            </Collapsible>
                                            <Button asChild className="w-full justify-center rounded-xl h-14 btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">
                                                <Link href="/register">REGISTRARSE <Zap className="ml-2 h-4 w-4 text-yellow-400 fill-yellow-400"/></Link>
                                            </Button>
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
