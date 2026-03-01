'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, User, Banknote, Gavel, ShoppingCart, Briefcase, Users, Sparkles, X } from "lucide-react";
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
import { motion, AnimatePresence } from "framer-motion";

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
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
             isScrolled ? "bg-background/80 backdrop-blur-xl border-b py-2 shadow-sm" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-14 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group relative z-50">
                        <Logo className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110" />
                        <span className="text-2xl font-black tracking-tighter uppercase italic text-[#0A2472] dark:text-white">Kyron</span>
                    </Link>
                    
                    {/* Navigation Links - Desktop */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Button key={link.href} variant="ghost" size="sm" asChild className="rounded-full h-10 px-5 transition-all">
                                <a href={link.href} className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-[#0A2472] dark:hover:text-[#4CAF50]">
                                    {link.label}
                                </a>
                            </Button>
                        ))}
                    </nav>

                    {/* Action Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="btn-3d-primary h-11 px-8 text-[11px] font-black uppercase tracking-widest gap-2 flex items-center group">
                                    <span>Acceso</span>
                                    <ChevronDown className="h-3.5 w-3.5 opacity-70 group-data-[state=open]:rotate-180 transition-transform" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 p-2 rounded-[2rem] shadow-2xl bg-card/95 backdrop-blur-xl border-primary/5">
                                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-4 py-3">Selecciona tu Portal</DropdownMenuLabel>
                                <DropdownMenuSeparator className="mx-2 opacity-50" />
                                <div className="grid gap-1 py-2">
                                    {loginOptions.map((opt) => (
                                        <DropdownMenuItem key={opt.href} asChild className="rounded-2xl p-0 overflow-hidden">
                                            <Link href={opt.href} className="flex items-center gap-4 py-3 px-4 cursor-pointer group hover:bg-[#4CAF50]/10 transition-all">
                                                <div className="p-2.5 bg-primary/5 rounded-xl group-hover:bg-[#4CAF50]/20 transition-colors">
                                                    <opt.icon className="h-5 w-5 text-primary group-hover:text-[#4CAF50]" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="font-black text-xs uppercase tracking-tight">{opt.label}</p>
                                                    <p className="text-[10px] text-muted-foreground font-medium">{opt.sub}</p>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button asChild className="btn-3d-secondary h-11 px-8 text-[11px] font-black uppercase tracking-widest">
                            <Link href="/register">Registro</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="flex md:hidden items-center gap-2 relative z-50">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl bg-secondary/20 hover:bg-secondary/30 transition-colors">
                                    <Menu className="h-6 w-6 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-md flex flex-col bg-background/95 backdrop-blur-3xl p-8 border-none shadow-2xl">
                                <SheetHeader className="mb-12">
                                    <SheetTitle asChild>
                                        <Link href="/" className="flex items-center gap-3">
                                            <Logo className="h-14 w-14" />
                                            <span className="text-3xl font-black tracking-tighter uppercase italic">Kyron</span>
                                        </Link>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-8 mb-12">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <a href={link.href} className="text-5xl font-black tracking-tighter hover:text-[#4CAF50] transition-all transform hover:translate-x-2">
                                                {link.label}
                                            </a>
                                        </SheetClose>
                                    ))}
                                </nav>
                                <div className="mt-auto space-y-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="btn-3d-primary w-full h-16 text-lg font-black tracking-widest gap-2">
                                                ACCEDER <ChevronDown className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-[calc(100vw-4rem)] sm:w-80 rounded-[2rem] p-4">
                                            {loginOptions.map((opt) => (
                                                <DropdownMenuItem key={opt.href} asChild>
                                                    <Link href={opt.href} className="flex items-center gap-4 p-3 rounded-2xl">
                                                        <opt.icon className="h-5 w-5 text-primary" />
                                                        <span className="font-bold text-sm uppercase">{opt.label}</span>
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button className="btn-3d-secondary w-full h-16 text-lg font-black tracking-widest" asChild>
                                        <Link href="/register">REGISTRARSE</Link>
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