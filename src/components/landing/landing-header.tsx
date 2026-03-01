
'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    X,
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
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 lg:hidden",
             isScrolled ? "bg-background/95 backdrop-blur-xl py-2 border-b shadow-sm" : "bg-transparent py-6"
        )}>
            <div className="w-full px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Placeholder para equilibrar el logo centrado en móvil */}
                    <div className="w-10 lg:hidden" />

                    <Link href="/" className="flex flex-col items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        <Logo className="h-10 w-10" /> 
                        <span className="text-[8px] font-black tracking-[0.3em] text-primary uppercase">System Kyron</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50 shadow-inner"><Menu className="h-5 w-5" /></Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-xs p-0 flex flex-col">
                                <div className="p-8 border-b flex flex-col items-center gap-3 bg-primary/5">
                                    <Logo className="h-12 w-12" /> 
                                    <span className="text-lg font-black tracking-tighter text-primary uppercase">System Kyron</span>
                                </div>
                                <nav className="flex flex-col p-8 gap-4">
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <Link href={link.href as any} className="text-xs font-black uppercase tracking-[0.2em] text-foreground hover:text-primary transition-all">
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    <div className="pt-8 space-y-4 border-t mt-4">
                                        <Button variant="outline" asChild className="w-full justify-center rounded-xl h-12 font-black uppercase text-[10px] tracking-widest">
                                            <Link href="/login">Acceder</Link>
                                        </Button>
                                        <Button asChild className="w-full justify-center rounded-xl h-12 btn-3d-primary font-black uppercase text-[10px] tracking-widest">
                                            <Link href="/register">Registro</Link>
                                        </Button>
                                    </div>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
