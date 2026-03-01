'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, User, Banknote, Gavel, ShoppingCart, Briefcase, Users, Sparkles, LayoutGrid, Globe, ShieldCheck } from "lucide-react";
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

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
        { href: "/login-personal", label: "Acceso Personal", sub: "Bóveda Ciudadana", icon: User },
        { href: "/login-empresa", label: "Contabilidad", sub: "Control Fiscal", icon: Banknote },
        { href: "/login-escritorio-juridico", label: "Jurídico", sub: "Legal y Contratos", icon: Gavel },
        { href: "/login-ventas", label: "Ventas / TPV", sub: "Facturación Real", icon: ShoppingCart },
        { href: "/login-rrhh", label: "Gestión Humana", sub: "Nómina y Talento", icon: Briefcase },
        { href: "/login-socios", label: "Portal Socios", sub: "Holding Estratégico", icon: Users },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
             isScrolled ? "bg-background/90 backdrop-blur-xl border-b py-2 shadow-xl" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-4 group">
                        <div className="bg-[#0A2472] p-2 rounded-xl shadow-2xl transition-transform group-hover:rotate-6">
                            <Logo className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-3xl font-black tracking-tighter uppercase italic text-[#0A2472] dark:text-white">Kyron</span>
                    </Link>
                    
                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Button key={link.href} variant="ghost" size="sm" asChild className="rounded-full px-6 hover:bg-primary/5 transition-all">
                                <a href={link.href} className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-[#0A2472] dark:hover:text-[#4CAF50]">
                                    {link.label}
                                </a>
                            </Button>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <ThemeToggle />
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="btn-3d-primary h-12 px-8 flex items-center gap-3">
                                    <LayoutGrid className="h-4 w-4" />
                                    ACCEDER
                                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 p-3 rounded-3xl shadow-3xl border-primary/10">
                                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40 px-5 py-4">Seleccione su Portal</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="grid gap-1 py-2">
                                    {loginOptions.map((opt) => (
                                        <DropdownMenuItem key={opt.href} asChild className="rounded-2xl p-0">
                                            <Link href={opt.href} className="flex items-center gap-5 py-4 px-5 cursor-pointer hover:bg-primary/5 transition-all">
                                                <div className="p-3 bg-secondary/10 rounded-xl">
                                                    <opt.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="font-black text-xs uppercase tracking-tight">{opt.label}</p>
                                                    <p className="text-[9px] text-muted-foreground font-bold tracking-wide uppercase opacity-60">{opt.sub}</p>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button asChild className="btn-3d-secondary h-12 px-8">
                            <Link href="/register" className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4" />
                                REGISTRO
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-primary/5 border border-primary/10">
                                    <Menu className="h-6 w-6 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-10">
                                <SheetHeader className="mb-16">
                                    <SheetTitle className="flex items-center gap-4">
                                        <div className="bg-[#0A2472] p-2 rounded-xl">
                                            <Logo className="h-8 w-8 text-white" />
                                        </div>
                                        <span className="text-4xl font-black tracking-tighter uppercase italic text-[#0A2472]">Kyron</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-8 mb-auto">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <a href={link.href} className="text-5xl font-black tracking-tighter hover:text-[#4CAF50] transition-all">
                                                {link.label}
                                            </a>
                                        </SheetClose>
                                    ))}
                                </nav>
                                <div className="space-y-4 pt-12 border-t">
                                    <Button className="btn-3d-primary w-full h-16 text-lg font-black" asChild>
                                        <Link href="/login">ACCESO</Link>
                                    </Button>
                                    <Button className="btn-3d-secondary w-full h-16 text-lg font-black" asChild>
                                        <Link href="/register">REGISTRO</Link>
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