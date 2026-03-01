
'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    UserCircle,
    Zap,
    ShieldCheck
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
             isScrolled ? "bg-background/80 backdrop-blur-2xl py-3 border-b shadow-lg" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Brand Identity */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 blur-md rounded-full scale-0 group-hover:scale-125 transition-transform"></div>
                            <Logo className="h-10 w-10 relative z-10" /> 
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-black tracking-tighter text-primary uppercase leading-none">System Kyron</span>
                            <span className="text-[8px] font-bold tracking-[0.3em] text-muted-foreground uppercase opacity-60">Next-Gen Ecosystem</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 bg-secondary/5 border border-primary/5 px-8 py-2 rounded-full backdrop-blur-md">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href} 
                                href={link.href as any} 
                                className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2">
                            <ThemeToggle />
                            <Button variant="ghost" asChild className="rounded-xl h-10 px-5 text-[10px] font-black uppercase tracking-widest hover:bg-primary/5 text-primary border border-transparent hover:border-primary/10">
                                <Link href="/login" className="flex items-center gap-2">
                                    <UserCircle className="h-4 w-4" /> Acceder
                                </Link>
                            </Button>
                            <Button asChild className="rounded-xl h-10 px-6 btn-3d-primary text-[10px] font-black uppercase tracking-widest shadow-xl group">
                                <Link href="/register" className="flex items-center gap-2">
                                    REGISTRO <Zap className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400 group-hover:scale-125 transition-transform"/>
                                </Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Trigger */}
                        <div className="lg:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50 shadow-inner">
                                        <Menu className="h-5 w-5" />
                                    </Button>
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
                                                <Link href="/login">Acceder <UserCircle className="ml-2 h-4 w-4" /></Link>
                                            </Button>
                                            <Button asChild className="w-full justify-center rounded-xl h-12 btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">
                                                <Link href="/register">REGISTRARSE <Zap className="ml-2 h-4 w-4 text-yellow-400 fill-yellow-400"/></Link>
                                            </Button>
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
