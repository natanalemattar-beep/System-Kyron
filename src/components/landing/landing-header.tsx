
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
      { href: "#inicio", label: "Inicio" },
      { href: "#servicios", label: "Servicios" },
      { href: "#tecnologia", label: "Tecnología" },
      { href: "#nosotros", label: "Nosotros" },
      { href: "#faq", label: "FAQ" },
      { href: "#contacto", label: "Contacto" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
             isScrolled ? "bg-background/80 backdrop-blur-xl py-2 border-b border-border/40 shadow-sm" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-14 items-center justify-between">
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
                        <Logo className="h-9 w-9" />
                        <span className="text-xl font-bold tracking-tight text-primary">Kyron</span>
                    </Link>
                    
                    {/* Desktop Navigation - Informative Buttons */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Button 
                                key={link.href} 
                                variant="ghost" 
                                asChild
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-xl px-4 transition-all"
                            >
                                <a href={link.href}>{link.label}</a>
                            </Button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-3">
                            <ThemeToggle />
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="btn-3d-primary h-10 px-6 gap-2 text-[10px] uppercase tracking-widest font-bold">
                                        ACCESO <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-2xl border-border/40 bg-background/95 backdrop-blur-xl">
                                    <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground px-4 py-3">Terminales de Control</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="grid grid-cols-1 gap-1">
                                        {loginOptions.map((opt) => (
                                            <DropdownMenuItem key={opt.href} asChild className="rounded-xl focus:bg-primary/5 cursor-pointer p-0">
                                                <Link href={opt.href} className="flex items-center gap-4 p-3 w-full">
                                                    <div className="p-2.5 bg-primary/5 rounded-xl text-primary border border-primary/5">
                                                        <opt.icon className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-foreground">{opt.label}</span>
                                                        <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{opt.sub}</span>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="outline" asChild className="rounded-xl px-6 h-10 font-bold text-[10px] uppercase tracking-widest border-border/60">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl"><Menu className="h-5 w-5" /></Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-xs p-0 flex flex-col bg-background/95 backdrop-blur-xl">
                                    <div className="p-6 border-b flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Logo className="h-8 w-8" /> 
                                            <span className="text-lg font-bold text-primary">Kyron</span>
                                        </div>
                                        <SheetClose asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full"><X className="h-5 w-5" /></Button>
                                        </SheetClose>
                                    </div>
                                    
                                    <nav className="flex flex-col p-6 gap-2">
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 px-4">Navegación</p>
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.href}>
                                                <a 
                                                    href={link.href} 
                                                    className="flex items-center px-4 py-3 text-sm font-bold uppercase tracking-[0.1em] text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </nav>

                                    <div className="mt-auto p-6 border-t bg-secondary/10">
                                        <Button className="w-full h-12 rounded-xl text-xs font-bold uppercase tracking-widest btn-3d-primary" asChild>
                                            <Link href="/login">ACCEDER AL PORTAL</Link>
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
