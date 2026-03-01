'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, User, Banknote, Gavel, ShoppingCart, Briefcase, Users, Megaphone, Signal, Cpu, X, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { href: "#inicio", label: "Inicio" },
      { href: "#servicios", label: "Ecosistema" },
      { href: "#caracteristicas", label: "Tecnología" },
      { href: "#nosotros", label: "Nosotros" },
    ];

    const loginOptions = [
        { href: "/login-personal", label: "Acceso Personal", sub: "Trámites y Salud", icon: User },
        { href: "/login-empresa", label: "Centro de Contabilidad", sub: "Gestión Fiscal", icon: Banknote },
        { href: "/login-escritorio-juridico", label: "Jurídico", sub: "Legal y Contratos", icon: Gavel },
        { href: "/login-ventas", label: "Ventas", sub: "TPV y Facturación", icon: ShoppingCart },
        { href: "/login-rrhh", label: "RR.HH.", sub: "Nómina y Talento", icon: Briefcase },
        { href: "/login-socios", label: "Portal Socios", sub: "Holding y KPIs", icon: Users },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
             isScrolled ? "bg-background/80 backdrop-blur-xl border-b py-2" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-12 items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <Logo className="h-10 w-10 transition-transform group-hover:scale-110" />
                        <span className="text-2xl font-black tracking-tighter uppercase italic text-[#0A2472] dark:text-white">Kyron</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Button key={link.href} variant="ghost" size="sm" asChild className="rounded-full h-9 px-4">
                                <a href={link.href} className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-[#0A2472] dark:hover:text-[#4CAF50] transition-colors">
                                    {link.label}
                                </a>
                            </Button>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="btn-3d-primary h-10 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest gap-2">
                                    Acceso <ChevronDown className="h-3.5 w-3.5 opacity-70" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-2xl bg-card/95 backdrop-blur-xl border-primary/5">
                                <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-3 py-2">Portales de Gestión</DropdownMenuLabel>
                                {loginOptions.map((opt) => (
                                    <DropdownMenuItem key={opt.href} asChild className="rounded-xl">
                                        <Link href={opt.href} className="flex items-center gap-3 py-2.5 cursor-pointer group">
                                            <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-[#4CAF50]/10 transition-colors">
                                                <opt.icon className="h-4 w-4 text-primary group-hover:text-[#4CAF50]" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-xs">{opt.label}</p>
                                                <p className="text-[9px] text-muted-foreground">{opt.sub}</p>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button asChild className="btn-3d-secondary h-10 px-6 text-[11px] font-black uppercase tracking-widest rounded-xl">
                            <Link href="/register">Registro</Link>
                        </Button>
                    </div>

                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-secondary/50">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full flex flex-col bg-background/95 backdrop-blur-2xl p-8">
                                <SheetHeader className="mb-12">
                                    <SheetTitle asChild>
                                        <Link href="/" className="flex items-center gap-3">
                                            <Logo className="h-12 w-12" />
                                            <span className="text-2xl font-black tracking-tighter uppercase italic">Kyron</span>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-6">
                                    {navLinks.map((link) => (
                                        <a key={link.href} href={link.href} className="text-4xl font-black tracking-tighter hover:text-[#4CAF50] transition-colors">
                                            {link.label}
                                        </a>
                                    ))}
                                </nav>
                                <div className="mt-auto space-y-4">
                                    <Button className="btn-3d-primary w-full h-14 rounded-xl text-sm font-black" asChild>
                                      <Link href="/login">Acceder al Sistema</Link>
                                    </Button>
                                    <Button className="btn-3d-secondary w-full h-14 rounded-xl text-sm font-black" asChild>
                                        <Link href="/register">Crear Cuenta Gratis</Link>
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
