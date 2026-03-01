'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    ChevronDown, 
    User, 
    Banknote, 
    Gavel, 
    ShoppingCart, 
    Briefcase, 
    Users, 
    X,
    LayoutGrid
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const loginOptions = [
    { href: "/login-personal", label: "Portal Personal", sub: "Trámites Ciudadanos", icon: User },
    { href: "/login-empresa", label: "Contabilidad", sub: "Gestión Fiscal", icon: Banknote },
    { href: "/login-escritorio-juridico", label: "Legal", sub: "Contratos y Ley", icon: Gavel },
    { href: "/login-ventas", label: "Ventas & TPV", sub: "Operaciones", icon: ShoppingCart },
    { href: "/login-rrhh", label: "Talento Humano", sub: "Nómina e IA", icon: Briefcase },
    { href: "/login-socios", label: "Portal de Socios", sub: "Estrategia", icon: Users },
];

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { href: "#servicios", label: "Servicios" },
      { href: "#tecnologia", label: "Tecnología" },
      { href: "#nosotros", label: "Nosotros" },
      { href: "#faq", label: "FAQ" },
      { href: "#contacto", label: "Contacto" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
             isScrolled ? "bg-background/95 backdrop-blur-xl py-2 border-b border-border/40 shadow-sm" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-14 items-center justify-between gap-4">
                    
                    {/* Logo & Info Buttons */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 transition-transform active:scale-95">
                            <Logo className="h-9 w-9" />
                            <span className="text-xl font-bold tracking-tight text-primary">Kyron</span>
                        </Link>

                        {/* Navigation - Info Buttons */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Button 
                                    key={link.href} 
                                    variant="ghost" 
                                    asChild
                                    className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground hover:text-primary transition-all px-4"
                                >
                                    <a href={link.href}>{link.label}</a>
                                </Button>
                            ))}
                        </nav>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="btn-3d-primary h-10 px-6 gap-3 text-[11px] uppercase tracking-[0.2em] font-bold rounded-xl">
                                        ACCESO <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80 p-3 rounded-2xl shadow-2xl border-border/40 bg-background/98 backdrop-blur-xl mt-4">
                                    <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground px-5 py-4">Centro de Portales</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="grid grid-cols-1 gap-1 p-1">
                                        {loginOptions.map((opt) => (
                                            <DropdownMenuItem key={opt.href} asChild className="rounded-xl focus:bg-primary/5 cursor-pointer p-0">
                                                <Link href={opt.href} className="flex items-center gap-4 p-4 w-full group">
                                                    <div className="p-2.5 bg-primary/5 rounded-xl text-primary border border-primary/5 group-hover:bg-primary group-hover:text-white transition-all">
                                                        <opt.icon className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-foreground">{opt.label}</span>
                                                        <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">{opt.sub}</span>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="outline" asChild className="rounded-xl px-6 h-10 font-bold text-[11px] uppercase tracking-widest border-border/60 hover:bg-muted/50 transition-all">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu */}
                        <div className="lg:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 bg-muted/30"><Menu className="h-5 w-5" /></Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-xs p-0 flex flex-col bg-background/98 backdrop-blur-xl">
                                    <div className="p-6 border-b flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Logo className="h-8 w-8" /> 
                                            <span className="text-lg font-bold text-primary tracking-tight">Kyron</span>
                                        </div>
                                        <SheetClose asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full"><X className="h-5 w-5" /></Button>
                                        </SheetClose>
                                    </div>
                                    
                                    <nav className="flex flex-col p-6 gap-1">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4 px-4">Navegación</p>
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.href}>
                                                <a 
                                                    href={link.href} 
                                                    className="flex items-center px-4 py-4 text-sm font-bold uppercase tracking-[0.1em] text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </nav>

                                    <div className="mt-auto p-6 border-t bg-secondary/5 space-y-3">
                                        <Button className="w-full h-12 rounded-xl text-[11px] font-bold uppercase tracking-widest btn-3d-primary" asChild>
                                            <Link href="/login">INICIAR SESIÓN</Link>
                                        </Button>
                                        <Button variant="outline" className="w-full h-12 rounded-xl text-[11px] font-bold uppercase tracking-widest" asChild>
                                            <Link href="/register">CREAR CUENTA</Link>
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}