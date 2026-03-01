
'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    X,
    User
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetClose } from "@/components/ui/sheet";
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
                <div className="flex h-16 items-center justify-between gap-8">
                    
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3 shrink-0">
                        <Link href="/" className="flex items-center gap-3 transition-transform active:scale-95">
                            <Logo className="h-10 w-10" />
                            <span className="text-xl font-black tracking-tighter text-white uppercase">System Kyron</span>
                        </Link>
                    </div>

                    {/* Navigation Links - Centered and always visible on desktops */}
                    <nav className="hidden lg:flex items-center gap-8 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href as any}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-white transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            
                            <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 rounded-lg h-11 px-6 gap-2 font-bold uppercase text-[10px] tracking-widest transition-all">
                                <Link href="/login">Acceder <User className="h-4 w-4" /></Link>
                            </Button>

                            <Button asChild className="bg-white text-black hover:bg-white/90 rounded-lg h-11 px-8 font-bold uppercase text-[10px] tracking-widest transition-all shadow-xl">
                                <Link href="/register">Registrarse</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu */}
                        <div className="lg:hidden flex items-center gap-2">
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
