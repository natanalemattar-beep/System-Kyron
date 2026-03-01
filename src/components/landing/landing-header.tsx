'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    X,
    User,
    ChevronDown
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
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
      { href: "#inicio", label: "Inicio" },
      { href: "/ecosistema", label: "Ecosistema" },
      { href: "#tecnologia", label: "Tecnología" },
      { href: "#nosotros", label: "Nosotros" },
      { href: "#faq", label: "FAQ" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
             isScrolled ? "bg-background/95 backdrop-blur-xl py-2 border-b shadow-sm" : "bg-transparent py-6"
        )}>
            <div className="w-full px-4 md:px-10">
                <div className="flex h-16 items-center justify-between gap-8">
                    
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3 shrink-0">
                        <Link href="/" className="flex items-center gap-3 transition-transform active:scale-95">
                            <Logo className="h-10 w-10" />
                            <span className="text-xl font-black tracking-tighter text-foreground uppercase">System Kyron</span>
                        </Link>
                    </div>

                    {/* Navigation Links - ALWAYS VISIBLE ON DESKTOP */}
                    <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href as any}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            
                            <Button variant="outline" asChild className="border-border text-foreground hover:bg-muted rounded-xl h-11 px-6 gap-2 font-black uppercase text-[10px] tracking-widest transition-all">
                                <Link href="/login">Acceder <User className="h-4 w-4" /></Link>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="btn-3d-primary h-11 px-8 text-[10px] uppercase tracking-[0.2em] rounded-xl shadow-xl">
                                        ACCESO <ChevronDown className="ml-2 h-3 w-3" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl shadow-2xl border bg-background/98 backdrop-blur-xl">
                                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 border-b mb-2">Módulos de Gestión</p>
                                    {loginOptions.map((option) => (
                                        <DropdownMenuItem key={option.href} asChild className="rounded-xl">
                                            <Link href={option.href} className="flex items-start gap-3 p-3">
                                                <div className="p-2 bg-primary/10 rounded-lg mt-1">
                                                    <option.icon className="h-4 w-4 text-primary"/>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{option.label}</p>
                                                    <p className="text-[10px] text-muted-foreground leading-tight">{option.description}</p>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Mobile Menu */}
                        <div className="md:hidden flex items-center gap-2">
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
                                                <Link href={link.href as any} className="flex items-center px-4 py-3 text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary rounded-xl transition-all">
                                                    {link.label}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>

                                    <div className="mt-auto p-6 border-t bg-muted/20 space-y-3">
                                        <Button className="w-full h-12 btn-3d-primary" asChild>
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
