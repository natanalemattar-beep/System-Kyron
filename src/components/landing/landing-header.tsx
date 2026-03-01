
'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    X,
    UserCircle
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
      { href: "#servicios", label: "Servicios" },
      { href: "#tecnologia", label: "Tecnología" },
      { href: "#nosotros", label: "Nosotros" },
      { href: "#faq", label: "FAQ" },
    ];

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 lg:hidden",
             isScrolled ? "bg-background/95 backdrop-blur-xl py-2 border-b shadow-md" : "bg-transparent py-6"
        )}>
            <div className="w-full px-6">
                <div className="flex items-center justify-between h-16 relative">
                    
                    <div className="flex items-center">
                        <ThemeToggle />
                    </div>

                    <Link href="/" className="flex flex-col items-center gap-1 absolute left-1/2 -translate-x-1/2 group">
                        <Logo className="h-11 w-11 group-active:scale-95 transition-transform" /> 
                        <span className="text-[8px] font-black tracking-[0.3em] text-primary uppercase">System Kyron</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" asChild className="rounded-xl h-11 w-11 hover:bg-primary/5">
                            <Link href="/login"><UserCircle className="h-6 w-6 text-primary"/></Link>
                        </Button>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50 shadow-inner"><Menu className="h-5 w-5" /></Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-xs p-0 flex flex-col">
                                <div className="p-8 border-b flex flex-col items-center gap-3 bg-gradient-to-br from-primary/10 to-transparent">
                                    <Logo className="h-14 w-14" /> 
                                    <span className="text-xl font-black tracking-tighter text-primary uppercase">System Kyron</span>
                                </div>
                                <nav className="flex flex-col p-8 gap-4 overflow-y-auto">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.3em] mb-4 italic">Navegación</p>
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <Link href={link.href as any} className="text-xs font-black uppercase tracking-[0.2em] text-foreground hover:text-primary py-2 border-b border-border/50">
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    <div className="pt-8 space-y-4">
                                        <Button variant="outline" asChild className="w-full justify-center rounded-xl h-12 font-black uppercase text-[10px] tracking-widest border-primary/20">
                                            <Link href="/login">Acceder</Link>
                                        </Button>
                                        <Button asChild className="w-full justify-center rounded-xl h-12 btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">
                                            <Link href="/register">Registrarse</Link>
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
