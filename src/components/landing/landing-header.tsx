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
    { href: "/login-personal", label: "Portal Personal", sub: "Trámites y Salud", icon: User },
    { href: "/login-empresa", label: "Contabilidad", sub: "Gestión Fiscal", icon: Banknote },
    { href: "/login-escritorio-juridico", label: "Legal", sub: "Contratos y Ley", icon: Gavel },
    { href: "/login-ventas", label: "Ventas & TPV", sub: "Operaciones", icon: ShoppingCart },
    { href: "/login-rrhh", label: "Recursos Humanos", sub: "Nómina e IA", icon: Briefcase },
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
      { href: "#faq", label: "Ayuda" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
             isScrolled ? "bg-background/95 backdrop-blur-md py-3 border-b border-border/50 shadow-sm" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex h-12 items-center justify-between">
                    
                    <Link href="/" className="flex items-center gap-3 group">
                        <Logo className="h-9 w-9" />
                        <span className="text-xl font-semibold tracking-tight">Kyron</span>
                    </Link>
                    
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Button key={link.href} variant="ghost" size="sm" asChild className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                <a href={link.href}>{link.label}</a>
                            </Button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-3">
                            <ThemeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="default" className="btn-minimal-primary gap-2">
                                        Acceso <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-xl border-border/50">
                                    <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 py-2">Seleccione Portal</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {loginOptions.map((opt) => (
                                        <DropdownMenuItem key={opt.href} asChild className="rounded-xl focus:bg-primary/5 cursor-pointer">
                                            <Link href={opt.href} className="flex items-center gap-4 p-2">
                                                <div className="p-2 bg-muted rounded-lg text-primary">
                                                    <opt.icon className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold">{opt.label}</span>
                                                    <span className="text-[10px] text-muted-foreground">{opt.sub}</span>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button variant="outline" asChild className="rounded-xl px-6 h-10 font-medium">
                                <Link href="/register">Registro</Link>
                            </Button>
                        </div>

                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl"><Menu className="h-6 w-6" /></Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-xs p-8 flex flex-col">
                                    <SheetHeader className="mb-12">
                                        <SheetTitle className="flex items-center gap-3 text-2xl font-bold">
                                            <Logo className="h-8 w-8" /> Kyron
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col gap-6 mb-auto">
                                        {navLinks.map((link) => (
                                            <SheetClose asChild key={link.href}>
                                                <a href={link.href} className="text-xl font-medium text-muted-foreground hover:text-foreground transition-colors">
                                                    {link.label}
                                                </a>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                    <div className="pt-8 border-t border-border space-y-4">
                                        <Button className="w-full h-12 rounded-xl text-lg font-semibold" asChild>
                                            <Link href="/login">Acceder</Link>
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