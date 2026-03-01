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
    Search
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
    { href: "/login-personal", label: "PERSONAL", sub: "TRÁMITES Y SALUD", icon: User, color: "text-blue-400" },
    { href: "/login-empresa", label: "CONTABILIDAD", sub: "GESTIÓN FISCAL", icon: Banknote, color: "text-green-400" },
    { href: "/login-escritorio-juridico", label: "JURÍDICO", sub: "CONTRATOS Y LEY", icon: Gavel, color: "text-purple-400" },
    { href: "/login-ventas", label: "VENTAS", sub: "FACTURACIÓN TPV", icon: ShoppingCart, color: "text-orange-400" },
    { href: "/login-rrhh", label: "RECURSOS HUMANOS", sub: "NÓMINA Y TALENTO", icon: Briefcase, color: "text-emerald-400" },
    { href: "/login-socios", label: "SOCIOS", sub: "HOLDING ESTRATÉGICO", icon: Users, color: "text-indigo-400" },
];

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { href: "#inicio", label: "INICIO" },
      { href: "#servicios", label: "ECOSISTEMA" },
      { href: "#caracteristicas", label: "TECNOLOGÍA" },
      { href: "#nosotros", label: "NOSOTROS" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
             isScrolled ? "bg-background/80 backdrop-blur-2xl py-2 border-b border-white/5" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex h-16 items-center justify-between gap-8">
                    
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 group shrink-0">
                        <div className="bg-primary/10 p-2 rounded-xl border border-primary/20 group-hover:rotate-12 transition-transform">
                            <Logo className="h-8 w-8" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-black tracking-tighter uppercase italic leading-none">Kyron</span>
                            <span className="text-[8px] font-black tracking-[0.5em] text-primary uppercase leading-none mt-1">Ecosystem</span>
                        </div>
                    </Link>
                    
                    {/* Desktop Nav - Middle */}
                    <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5 backdrop-blur-xl">
                        {navLinks.map((link) => (
                            <Button key={link.href} variant="ghost" size="sm" asChild className="rounded-full px-6 hover:bg-white/5 transition-all h-9">
                                <a href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:text-white">
                                    {link.label}
                                </a>
                            </Button>
                        ))}
                    </nav>

                    {/* Desktop Actions - Right */}
                    <div className="hidden lg:flex items-center gap-4 shrink-0">
                        <Button variant="ghost" size="icon" className="text-white/40 hover:text-white"><Search className="h-4 w-4"/></Button>
                        <ThemeToggle />
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="btn-3d-primary h-11 px-8 flex items-center gap-3">
                                    <LayoutGrid className="h-4 w-4" />
                                    ACCESO MAESTRO
                                    <ChevronDown className="h-3 w-3 opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-80 p-3 titanium-card rounded-2xl">
                                <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.3em] text-primary px-5 py-4">Centro de Mando</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <div className="grid gap-1 py-2">
                                    {loginOptions.map((opt) => (
                                        <DropdownMenuItem key={opt.href} asChild className="rounded-xl p-0 focus:bg-white/5">
                                            <Link href={opt.href} className="flex items-center gap-5 py-4 px-5 cursor-pointer group">
                                                <div className={cn("p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform", opt.color)}>
                                                    <opt.icon className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <p className="font-black text-[11px] uppercase tracking-tighter text-white">{opt.label}</p>
                                                    <p className="text-[8px] text-muted-foreground font-bold tracking-widest uppercase">{opt.sub}</p>
                                                </div>
                                                <ArrowRight className="ml-auto h-3 w-3 opacity-0 group-hover:opacity-100 transition-all" />
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button asChild className="btn-3d-secondary h-11 px-8">
                            <Link href="/register">REGISTRO</Link>
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="flex lg:hidden items-center gap-2">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-white/5 border border-white/10">
                                    <Menu className="h-6 w-6 text-white" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full bg-background/95 backdrop-blur-3xl border-white/5 p-10">
                                <SheetHeader className="mb-16">
                                    <SheetTitle className="flex items-center gap-4">
                                        <Logo className="h-10 w-10" />
                                        <span className="text-4xl font-black tracking-tighter uppercase italic">Kyron</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="flex flex-col gap-8 mb-auto">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <a href={link.href} className="text-4xl font-black tracking-tighter text-white/20 hover:text-primary transition-all">
                                                {link.label}
                                            </a>
                                        </SheetClose>
                                    ))}
                                </nav>
                                <div className="space-y-4 pt-12 border-t border-white/5 mt-12">
                                    <Button className="btn-3d-primary w-full h-16 text-lg font-black" asChild>
                                        <Link href="/login">ACCESO</Link>
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