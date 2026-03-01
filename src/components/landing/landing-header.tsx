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
             isScrolled ? "bg-background/80 backdrop-blur-2xl py-3 border-b shadow-lg" : "bg-transparent py-6"
        )}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-16 relative">
                    
                    {/* Left: Navigation Links (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-6 flex-1">
                        {navLinks.slice(0, 3).map((link) => (
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

                    {/* Center: Brand Identity - Absolutely Centered */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                        <Link href="/" className="flex flex-col items-center group">
                            <Logo className="h-10 w-10 mb-1 group-hover:scale-110 transition-transform duration-500" /> 
                            <span className="text-sm font-black tracking-tighter text-primary uppercase leading-none">System Kyron</span>
                        </Link>
                    </div>

                    {/* Right: Actions + Menu Button */}
                    <div className="flex items-center justify-end gap-4 flex-1">
                        <div className="hidden sm:flex items-center gap-3">
                            <ThemeToggle />
                            <Button variant="outline" asChild className="rounded-xl h-10 px-4 text-[10px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5">
                                <Link href="/login" className="flex items-center gap-2">
                                    <UserCircle className="h-4 w-4" /> Acceder
                                </Link>
                            </Button>
                            <Button asChild className="rounded-xl h-10 px-6 btn-3d-primary text-[10px] font-black uppercase tracking-widest shadow-xl">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        {/* Menu Trigger (Visible on PC too as requested) */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50 shadow-inner hover:bg-primary/10 transition-all">
                                    <Menu className="h-5 w-5 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-xs p-0 flex flex-col">
                                <div className="p-8 border-b flex flex-col items-center gap-3 bg-gradient-to-br from-primary/10 to-transparent">
                                    <Logo className="h-14 w-14" /> 
                                    <span className="text-xl font-black tracking-tighter text-primary uppercase">System Kyron</span>
                                    <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40">Ecosistema Global</p>
                                </div>
                                <nav className="flex flex-col p-8 gap-4 overflow-y-auto">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.3em] mb-4 italic">Explorar Módulos</p>
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
        </header>
    )
}