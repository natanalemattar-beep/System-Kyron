
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
    ShieldCheck
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
    { href: "/login-personal", label: "Acceso Personal", sub: "Trámites Ciudadanos", icon: User },
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
             isScrolled ? "bg-background/95 backdrop-blur-xl py-2 border-b shadow-sm" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex h-14 items-center justify-between gap-4">
                    
                    {/* Logo & Navigation */}
                    <div className="flex items-center gap-10">
                        <Link href="/" className="flex items-center gap-3 transition-transform active:scale-95">
                            <Logo className="h-9 w-9" />
                            <span className="text-xl font-bold tracking-tight text-primary">System Kyron</span>
                        </Link>

                        {/* DESKTOP NAV - Visible from tablet upwards */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Button 
                                    key={link.href} 
                                    variant="ghost" 
                                    asChild
                                    className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all px-4 h-9 rounded-lg"
                                >
                                    <a href={link.href}>{link.label}</a>
                                </Button>
                            ))}
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="btn-3d-primary h-10 px-6 gap-2 text-xs font-bold rounded-xl shadow-md">
                                        ACCESO <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl shadow-2xl border bg-background/98 backdrop-blur-xl mt-4">
                                    <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-4 py-3">Selecciona tu Portal</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="grid grid-cols-1 gap-1 p-1">
                                        {loginOptions.map((opt) => (
                                            <DropdownMenuItem key={opt.href} asChild className="rounded-xl focus:bg-primary/5 cursor-pointer p-0">
                                                <Link href={opt.href} className="flex items-center gap-4 p-3 w-full group">
                                                    <div className="p-2 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                        <opt.icon className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold">{opt.label}</span>
                                                        <span className="text-[10px] text-muted-foreground font-medium">{opt.sub}</span>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="outline" asChild className="rounded-xl px-6 h-10 font-bold text-xs border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        {/* MOBILE MENU */}
                        <div className="md:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 bg-muted/50"><Menu className="h-5 w-5" /></Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-xs p-0 flex flex-col">
                                    <div className="p-6 border-b flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Logo className="h-8 w-8" /> 
                                            <span className="text-lg font-bold text-primary">System Kyron</span>
                                        </div>
                                        <SheetClose asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full"><X className="h-5 w-5" /></Button>
                                        </SheetClose>
                                    </div>
                                    
                                    <nav className="flex flex-col p-6 gap-1">
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.href}>
                                                <a href={link.href} className="flex items-center px-4 py-3 text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                                                    {link.label}
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </nav>

                                    <div className="mt-auto p-6 border-t bg-muted/20 space-y-3">
                                        <Button className="w-full h-12 rounded-xl text-sm font-bold btn-3d-primary" asChild>
                                            <Link href="/login">INICIAR SESIÓN</Link>
                                        </Button>
                                        <Button variant="outline" className="w-full h-12 rounded-xl text-sm font-bold" asChild>
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
