
'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    X,
    User,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

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
                <div className="flex items-center justify-between h-16 relative">
                    
                    {/* Left: Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-8">
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

                    <div className="lg:hidden flex items-center">
                         <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50"><Menu className="h-5 w-5" /></Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-full sm:max-w-xs p-0 flex flex-col">
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
                            </SheetContent>
                        </Sheet>
                    </div>

                    {/* Center: Absolute centered Logo & Brand */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <Link href="/" className="flex flex-col items-center group transition-transform active:scale-95">
                            <Logo className="h-9 w-9 mb-1 transition-transform group-hover:scale-110" />
                            <span className="text-[9px] font-black tracking-[0.4em] text-foreground uppercase whitespace-nowrap">System Kyron</span>
                        </Link>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center justify-end gap-2 md:gap-4">
                        <div className="hidden sm:flex items-center gap-3">
                            <ThemeToggle />
                            <Button variant="outline" asChild className="border-border text-foreground hover:bg-muted rounded-xl h-10 px-5 gap-2 font-black uppercase text-[9px] tracking-widest transition-all">
                                <Link href="/login">Acceder <User className="h-3.5 w-3.5" /></Link>
                            </Button>
                            <Button asChild className="btn-3d-primary h-10 px-6 text-[9px] uppercase tracking-[0.2em] rounded-xl shadow-xl">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>
                        <div className="sm:hidden">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
