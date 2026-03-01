
'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    ChevronDown, 
    X,
    Sparkles
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet";
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
import { loginOptions } from "@/lib/login-options";

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
            <div className="w-full px-4 md:px-10">
                <div className="flex h-16 items-center justify-between gap-8">
                    
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-3 transition-transform active:scale-95 shrink-0">
                            <Logo className="h-9 w-9" />
                            <span className="text-xl font-black tracking-tighter text-primary whitespace-nowrap uppercase">System Kyron</span>
                        </Link>

                        {/* Navigation Buttons - Visible from MD (Laptop) */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Button 
                                    key={link.href} 
                                    variant="ghost" 
                                    asChild
                                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all px-4 h-9 rounded-lg"
                                >
                                    <a href={link.href}>{link.label}</a>
                                </Button>
                            ))}
                        </nav>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="btn-3d-primary h-11 px-8 gap-3 text-[11px] font-black tracking-widest rounded-xl shadow-lg uppercase">
                                        ACCESO <ChevronDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl shadow-2xl border bg-background/98 backdrop-blur-xl mt-4">
                                    <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-4 py-3">Portal de Gestión Kyron</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div className="grid grid-cols-1 gap-1 p-1">
                                        {loginOptions.map((opt) => (
                                            <DropdownMenuItem key={opt.href} asChild className="rounded-xl focus:bg-primary/5 cursor-pointer p-0">
                                                <Link href={opt.href} className="flex items-center gap-4 p-3 w-full group">
                                                    <div className="p-2.5 bg-primary/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                                        <opt.icon className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold">{opt.label}</span>
                                                        <span className="text-[10px] text-muted-foreground font-medium">{opt.description.substring(0, 40)}...</span>
                                                    </div>
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button variant="outline" asChild className="rounded-xl px-8 h-11 font-black text-[11px] tracking-widest border-primary/20 hover:bg-primary/5 hover:text-primary transition-all uppercase">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu */}
                        <div className="sm:hidden flex items-center gap-2">
                            <ThemeToggle />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50"><Menu className="h-5 w-5" /></Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-xs p-0 flex flex-col">
                                    <div className="p-6 border-b flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Logo className="h-8 w-8" /> 
                                            <span className="text-lg font-black tracking-tighter text-primary uppercase">System Kyron</span>
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
                                        <Button className="w-full h-12 rounded-xl text-xs font-black tracking-widest btn-3d-primary uppercase" asChild>
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
