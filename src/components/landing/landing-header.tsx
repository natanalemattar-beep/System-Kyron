
'use client';

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    UserCircle,
    Zap,
    ChevronDown,
    LayoutGrid,
    Sparkles,
    UserCircle2
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
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
                        {navLinks.slice(0, 4).map((link) => (
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
                            <span className="text-sm font-black tracking-tighter text-primary uppercase leading-none mt-1 italic">System Kyron</span>
                        </Link>
                    </div>

                    {/* Right: Actions + Menú (PC & Móvil) */}
                    <div className="flex items-center justify-end gap-4 flex-1">
                        <div className="hidden sm:flex items-center gap-4">
                            <ThemeToggle />
                            
                            {/* Desplegable de Acceso Organizado */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="rounded-xl h-11 px-6 text-[10px] font-black uppercase tracking-widest border-primary/20 hover:bg-primary/5 shadow-inner group">
                                        <UserCircle className="h-4 w-4 mr-2 text-primary" /> 
                                        Acceder
                                        <ChevronDown className="h-3 w-3 ml-2 opacity-40 group-data-[state=open]:rotate-180 transition-transform" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[500px] p-4 rounded-[2.5rem] border-primary/10 bg-background/95 backdrop-blur-3xl shadow-2xl grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-200">
                                    <DropdownMenuLabel className="col-span-2 px-4 py-2 flex items-center gap-2">
                                        <Sparkles className="h-3 w-3 text-primary" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-50">Ecosistema de Portales</span>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="col-span-2 mb-2 opacity-50" />
                                    {loginOptions.map((option) => (
                                        <DropdownMenuItem key={option.href} asChild className="rounded-2xl p-3 cursor-pointer focus:bg-primary/5 group/item border border-transparent focus:border-primary/10 transition-all">
                                            <Link href={option.href} className="flex flex-col items-start gap-1">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-2 bg-primary/10 rounded-xl group-hover/item:scale-110 transition-transform">
                                                        <option.icon className="h-4 w-4 text-primary" />
                                                    </div>
                                                    <span className="font-black text-[11px] tracking-tight uppercase italic">{option.label}</span>
                                                </div>
                                                <p className="text-[9px] text-muted-foreground leading-tight font-medium opacity-70 group-hover/item:opacity-100">{option.description}</p>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button asChild className="rounded-xl h-11 px-8 btn-3d-primary text-[10px] font-black uppercase tracking-widest shadow-2xl">
                                <Link href="/register">REGISTRO</Link>
                            </Button>
                        </div>

                        {/* Hamburger Menu Trigger */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-xl h-11 w-11 bg-muted/50 shadow-inner hover:bg-primary/10 transition-all active:scale-90">
                                    <Menu className="h-5 w-5 text-primary" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full sm:max-w-sm p-0 flex flex-col overflow-hidden border-l-primary/10 shadow-[-20px_0_50px_rgba(0,0,0,0.1)]">
                                <div className="p-10 border-b flex flex-col items-center gap-4 bg-gradient-to-br from-primary/10 to-transparent">
                                    <Logo className="h-16 w-16" /> 
                                    <div className="text-center">
                                        <span className="text-xl font-black tracking-tighter text-primary uppercase italic">System Kyron</span>
                                        <p className="text-[9px] font-black uppercase tracking-[0.5em] opacity-40 mt-1">Ecosistema Global</p>
                                    </div>
                                </div>
                                <nav className="flex-grow flex flex-col p-8 gap-4 overflow-y-auto">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.4em] mb-2 italic px-2">Navegación</p>
                                    {navLinks.map((link) => (
                                        <SheetClose asChild key={link.href}>
                                            <Link href={link.href as any} className="text-xs font-black uppercase tracking-[0.2em] text-foreground hover:text-primary py-4 border-b border-border/30 hover:pl-2 transition-all flex items-center justify-between group">
                                                {link.label}
                                                <LayoutGrid className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    
                                    <div className="pt-10 space-y-4 px-2">
                                        <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-[0.4em] mb-4 italic">Acceso Directo</p>
                                        <div className="grid grid-cols-1 gap-4">
                                            <Button variant="outline" asChild className="w-full justify-center rounded-xl h-14 font-black uppercase text-[10px] tracking-widest border-primary/20 shadow-md">
                                                <Link href="/login">ACCESO <UserCircle2 className="h-4 w-4 ml-2 text-primary" /></Link>
                                            </Button>
                                            <Button asChild className="w-full justify-center rounded-xl h-14 btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl">
                                                <Link href="/register">REGISTRARSE <Zap className="ml-2 h-4 w-4 text-yellow-400 fill-yellow-400 animate-pulse"/></Link>
                                            </Button>
                                        </div>
                                    </div>
                                </nav>
                                <div className="mt-auto p-8 text-center border-t border-border/50 bg-muted/20">
                                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">System Status: Synchronized</span>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}
