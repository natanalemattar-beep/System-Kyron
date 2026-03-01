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
    LayoutGrid, 
    ShieldCheck,
    ArrowRight,
    Sparkles
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
    { href: "/login-personal", label: "Acceso Personal", sub: "Trámites y Salud", icon: User, color: "text-blue-400" },
    { href: "/login-empresa", label: "Contabilidad", sub: "Gestión Fiscal", icon: Banknote, color: "text-green-400" },
    { href: "/login-escritorio-juridico", label: "Escritorio Jurídico", sub: "Legal y Contratos", icon: Gavel, color: "text-purple-400" },
    { href: "/login-ventas", label: "Ventas / TPV", sub: "Facturación Real-Time", icon: ShoppingCart, color: "text-orange-400" },
    { href: "/login-rrhh", label: "Recursos Humanos", sub: "Nómina y Beneficios", icon: Briefcase, color: "text-emerald-400" },
    { href: "/login-socios", label: "Portal de Socios", sub: "Holding Estratégico", icon: Users, color: "text-indigo-400" },
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
      { href: "#servicios", label: "Ecosistema" },
      { href: "#caracteristicas", label: "Tecnología" },
      { href: "#nosotros", label: "Nosotros" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
             isScrolled ? "bg-background/90 backdrop-blur-2xl border-b border-white/10 py-2 shadow-2xl" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex h-16 items-center justify-between gap-4">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 group shrink-0">
                        <div className="bg-[#0A2472] p-2.5 rounded-2xl shadow-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 border border-white/10">
                            <Logo className="h-8 w-8 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter uppercase italic text-white leading-none">Kyron</span>
                            <span className="text-[8px] font-black tracking-[0.4em] uppercase text-primary-foreground/40 leading-none mt-1">Ecosystem</span>
                        </div>
                    </Link>
                    
                    {/* Desktop Nav - Middle */}
                    <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/5 backdrop-blur-md">
                        {navLinks.map((link) => (
                            <Button key={link.href} variant="ghost" size="sm" asChild className="rounded-xl px-5 hover:bg-white/10 transition-all group">
                                <a href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-white group-hover:text-white transition-colors">
                                    {link.label}
                                </a>
                            </Button>
                        ))}
                    </nav>

                    {/* Desktop Actions - Right */}
                    <div className="hidden md:flex items-center gap-4 shrink-0">
                        <ThemeToggle />
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="btn-3d-primary h-12 px-8 flex items-center gap-3">
                                    <LayoutGrid className="h-4 w-4" />
                                    ACCESO
                                    <ChevronDown className="h-3 w-3 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 p-3 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border-white/10 bg-background/95 backdrop-blur-3xl">
                                <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60 px-5 py-4">Seleccione su Portal</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <div className="grid gap-1 py-2">
                                    {loginOptions.map((opt) => (
                                        <DropdownMenuItem key={opt.href} asChild className="rounded-2xl p-0 focus:bg-white/5">
                                            <Link href={opt.href} className="flex items-center gap-5 py-4 px-5 cursor-pointer transition-all group">
                                                <div className={cn("p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform", opt.color)}>
                                                    <opt.icon className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="font-black text-xs uppercase tracking-tight text-white">{opt.label}</p>
                                                    <p className="text-[9px] text-muted-foreground font-bold tracking-wide uppercase opacity-60 group-hover:opacity-100 transition-opacity">{opt.sub}</p>
                                                </div>
                                                <ArrowRight className="ml-auto h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
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
                                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                    <Menu className="h-6 w-6 text-white" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-10 bg-background/95 backdrop-blur-3xl border-white/10">
                                <SheetHeader className="mb-16">
                                    <SheetTitle className="flex items-center gap-4">
                                        <div className="bg-[#0A2472] p-2.5 rounded-2xl">
                                            <Logo className="h-8 w-8 text-white" />
                                        </div>
                                        <span className="text-4xl font-black tracking-tighter uppercase italic text-white">Kyron</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-10 mb-auto">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <a href={link.href} className="text-5xl font-black tracking-tighter text-white/40 hover:text-[#4CAF50] transition-all hover:translate-x-2">
                                                {link.label}
                                            </a>
                                        </SheetClose>
                                    ))}
                                </nav>
                                <div className="space-y-4 pt-12 border-t border-white/5">
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