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
    ArrowRight,
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
      { href: "#servicios", label: "Ecosistema" },
      { href: "#caracteristicas", label: "Tecnología" },
      { href: "#nosotros", label: "Nosotros" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
             isScrolled ? "bg-background/80 backdrop-blur-xl py-3 border-b border-border/40 shadow-sm" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-12 items-center justify-between">
                    
                    <Link href="/" className="flex items-center gap-3 group transition-transform active:scale-95">
                        <Logo className="h-8 w-8" />
                        <span className="text-lg font-bold tracking-tight text-primary">Kyron</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a 
                                key={link.href} 
                                href={link.href}
                                className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="btn-3d-primary h-10 px-6 gap-2 text-xs uppercase tracking-widest font-bold">
                                        ACCESO <ChevronDown className="h-3 w-3 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-2xl border-border/40 bg-background/95 backdrop-blur-xl">
                                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground px-4 py-3">Terminales de Control</DropdownMenuLabel>
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
                            <Button variant="outline" asChild className="rounded-xl px-6 h-10 font-bold text-xs uppercase tracking-widest">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl"><Menu className="h-5 w-5" /></Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-xs p-10 flex flex-col bg-background/95 backdrop-blur-xl">
                                    <SheetHeader className="mb-16">
                                        <SheetTitle className="flex items-center gap-4 text-2xl font-bold">
                                            <Logo className="h-8 w-8" /> <span className="text-primary tracking-tighter">Kyron</span>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col gap-8 mb-auto">
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.href}>
                                                <a href={link.href} className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors">
                                                    {link.label}
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                    <div className="pt-10 border-t border-border/40 space-y-4">
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