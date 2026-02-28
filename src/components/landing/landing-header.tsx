'use client';

import { useState, useEffect, type FC, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, User, Banknote, Gavel, ShoppingCart, Briefcase, Users, Megaphone, Signal, Cpu } from "lucide-react";
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
import { loginOptions } from "@/lib/login-options";

const SmoothScrollLink: FC<AnchorHTMLAttributes<HTMLAnchorElement> & { onLinkClick?: () => void }> = ({ href, onLinkClick, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href!.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
             const yOffset = -80;
            const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
        if (onLinkClick) {
            onLinkClick();
        }
    };

    return <a href={href} onClick={handleClick} {...props} />;
};

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Ecosistema" },
  { href: "#caracteristicas", label: "Tecnología" },
  { href: "#nosotros", label: "Nosotros" },
];

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                 isScrolled ? "bg-background/80 backdrop-blur-xl border-b py-2" : "bg-transparent py-6"
            )}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex h-12 items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Logo className="h-9 w-9 transition-transform group-hover:scale-110" />
                            <span className="text-xl font-black tracking-tighter uppercase italic">Kyron</span>
                        </Link>
                        
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Button key={link.href} variant="ghost" size="sm" asChild className="rounded-full h-9 px-4">
                                    <SmoothScrollLink href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
                                        {link.label}
                                    </SmoothScrollLink>
                                </Button>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-9 px-4 text-[10px] font-black uppercase tracking-widest gap-2 hover:bg-primary/5 transition-colors rounded-full border border-transparent hover:border-primary/10">
                                        Acceso <ChevronDown className="h-3 w-3 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-2xl bg-card/95 backdrop-blur-xl border-primary/5">
                                    <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-3 py-2">Portales Principales</DropdownMenuLabel>
                                    <DropdownMenuItem asChild className="rounded-xl">
                                        <Link href="/login-personal" className="flex items-center gap-3 py-2.5 cursor-pointer">
                                            <div className="p-2 bg-primary/5 rounded-lg"><User className="h-4 w-4 text-primary" /></div>
                                            <span className="font-bold text-xs">Acceso Personal</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="rounded-xl">
                                        <Link href="/login-empresa" className="flex items-center gap-3 py-2.5 cursor-pointer">
                                            <div className="p-2 bg-primary/5 rounded-lg"><Banknote className="h-4 w-4 text-primary" /></div>
                                            <span className="font-bold text-xs">Centro de Contabilidad</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuSeparator className="my-2 opacity-50" />
                                    
                                    <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-3 py-2">Gestión y Operaciones</DropdownMenuLabel>
                                    <div className="grid grid-cols-1 gap-1">
                                        {[
                                            { href: "/login-escritorio-juridico", label: "Jurídico", icon: Gavel },
                                            { href: "/login-ventas", label: "Ventas", icon: ShoppingCart },
                                            { href: "/login-rrhh", label: "Recursos Humanos", icon: Briefcase },
                                        ].map((item) => (
                                            <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                                <Link href={item.href} className="flex items-center gap-3 py-2 cursor-pointer">
                                                    <item.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="text-xs font-medium">{item.label}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>

                                    <DropdownMenuSeparator className="my-2 opacity-50" />

                                    <DropdownMenuLabel className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 px-3 py-2">Especializados</DropdownMenuLabel>
                                    <div className="grid grid-cols-2 gap-1">
                                        {[
                                            { href: "/login-socios", label: "Socios", icon: Users },
                                            { href: "/login-marketing", label: "Marketing", icon: Megaphone },
                                            { href: "/login-telecom", label: "Telecom", icon: Signal },
                                            { href: "/login-informatica", label: "IT / Ing.", icon: Cpu },
                                        ].map((item) => (
                                            <DropdownMenuItem key={item.href} asChild className="rounded-xl">
                                                <Link href={item.href} className="flex items-center gap-2 py-2 cursor-pointer">
                                                    <item.icon className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-[10px] font-medium">{item.label}</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="h-4 w-px bg-border" />
                            <Button asChild className="h-9 px-5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95">
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
                                <SheetContent side="right" className="w-full flex flex-col bg-background/95 backdrop-blur-2xl p-8 border-none">
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
                                            <SmoothScrollLink key={link.href} href={link.href} className="text-4xl font-black tracking-tighter hover:text-primary transition-colors">
                                                {link.label}
                                            </SmoothScrollLink>
                                        ))}
                                    </nav>
                                    <div className="mt-auto space-y-4">
                                        <Button variant="outline" className="w-full h-12 rounded-xl text-sm font-bold" asChild>
                                          <Link href="/login">Acceder</Link>
                                        </Button>
                                        <Button className="w-full h-12 rounded-xl text-sm font-black shadow-xl" asChild>
                                            <Link href="/register">Registrarse</Link>
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
