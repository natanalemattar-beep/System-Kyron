
'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    UserCircle,
    Zap,
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
            "fixed top-0 left-0 right-0 z-[150] transition-all duration-500",
             isScrolled ? "bg-background/80 backdrop-blur-2xl py-3 border-b shadow-2xl" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16 relative">
                    
                    {/* Left: Navigation (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-8 flex-1">
                        {navLinks.slice(0, 3).map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href as any} 
                                className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/70 hover:text-primary transition-all relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Center: Absolute Brand Identity */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                        <Link href="/" className="flex flex-col items-center group pointer-events-auto">
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                                <Logo className="h-12 w-12 mb-1 relative z-10 group-hover:scale-110 transition-transform duration-500" /> 
                            </div>
                            <span className="text-sm font-black tracking-tighter text-primary uppercase leading-none mt-1">System Kyron</span>
                        </Link>
                    </div>

                    {/* Right: Actions + Menú (PC & Móvil) */}
                    <div className="flex items-center justify-end gap-4 flex-1">
                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            <Button variant="outline" asChild className="rounded-xl h-11 px-6 text-[10px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5 shadow-inner">
                                <Link href="/login" className="flex items-center gap-2">
                                    <UserCircle className="h-4 w-4" /> Acceder
                                </Link>
                            </Button>
                            <Button asChild className="rounded-xl h-11 px-8 btn-3d-primary text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        {/* Hamburger Menu Trigger - ALWAYS VISIBLE */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50 shadow-inner hover:bg-primary/10 transition-all active:scale-90">
                                    <Menu className="h-5 w-5 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-xs p-0 flex flex-col overflow-hidden border-l-primary/10 shadow-[-20px_0_50px_rgba(0,0,0,0.1)]">
                                <div className="p-10 border-b flex flex-col items-center gap-4 bg-gradient-to-br from-primary/10 to-transparent">
                                    <Logo className="h-16 w-16" /> 
                                    <div className="text-center">
                                        <span className="text-xl font-black tracking-tighter text-primary uppercase">System Kyron</span>
                                        <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40 mt-1">Ecosistema Global</p>
                                    </div>
                                </div>
                                <nav className="flex flex-col p-8 gap-2 overflow-y-auto">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.4em] mb-6 italic">Protocolos de Acceso</p>
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <Link href={link.href as any} className="text-xs font-black uppercase tracking-[0.2em] text-foreground hover:text-primary py-3 border-b border-border/30 hover:pl-2 transition-all">
                                                {link.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    
                                    {/* Action Buttons in Menu - Fix for shadow overflow */}
                                    <div className="pt-10 space-y-5 px-2">
                                        <div className="p-1">
                                            <Button variant="outline" asChild className="w-full justify-center rounded-xl h-14 font-black uppercase text-[10px] tracking-widest border-primary/20 shadow-md hover:bg-primary/5">
                                                <Link href="/login" className="flex items-center gap-2">Acceder <UserCircle className="h-4 w-4" /></Link>
                                            </Button>
                                        </div>
                                        <div className="p-1">
                                            <Button asChild className="w-full justify-center rounded-xl h-14 btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">
                                                <Link href="/register" className="flex items-center gap-2">REGISTRARSE <Zap className="h-4 w-4 text-yellow-400 fill-yellow-400"/></Link>
                                            </Button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="mt-auto p-8 text-center border-t border-border/50 bg-muted/20">
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">Status: Sincronizado</span>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
