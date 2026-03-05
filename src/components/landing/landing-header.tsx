'use client';

import { useState, useEffect, useCallback } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { 
    Menu, 
    UserCircle,
    ChevronDown,
    Sparkles,
    ArrowRight,
    BookOpen,
    Users2,
    Info,
    LayoutGrid,
    Target,
    ShieldCheck
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
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

    const handleScroll = useCallback(() => {
        const scrolled = window.scrollY > 20;
        if (scrolled !== isScrolled) {
            setIsScrolled(scrolled);
        }
    }, [isScrolled]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-[150] transition-all duration-300 gpu-accelerated w-full",
             isScrolled ? "bg-black/95 backdrop-blur-2xl py-2 border-b border-white/5 shadow-2xl" : "bg-transparent py-6"
        )}>
            <div className="w-full px-6 md:px-12">
                <div className="grid grid-cols-3 items-center h-16 w-full">
                    
                    {/* SECCIÓN IZQUIERDA */}
                    <div className="flex justify-start items-center gap-10">
                        <nav className="hidden lg:flex items-center gap-10">
                            <Link href="/#inicio" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-primary transition-all relative group">
                                Inicio
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full shadow-glow"></span>
                            </Link>
                            <Link href="/ecosistema" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-primary transition-all relative group">
                                Ecosistema
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full shadow-glow"></span>
                            </Link>
                            <Link href="/#nosotros" className="text-[10px] font-black uppercase tracking-[0.4em] text-primary shadow-glow-text transition-all relative group flex items-center gap-2">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                NOSOTROS
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full shadow-glow"></span>
                            </Link>
                        </nav>
                    </div>

                    {/* SECCIÓN CENTRAL */}
                    <div className="flex justify-center items-center">
                        <Link href="/" className="flex flex-col items-center group">
                            <Logo className="h-10 w-10 mb-1.5 transition-transform duration-500 group-hover:scale-110 drop-shadow-glow" /> 
                            <span className="text-[9px] font-black tracking-[0.5em] text-primary uppercase italic italic-shadow">System Kyron</span>
                        </Link>
                    </div>

                    {/* SECCIÓN DERECHA */}
                    <div className="flex items-center justify-end gap-8">
                        <nav className="hidden lg:flex items-center gap-10">
                            <Link 
                                href="/manual-usuario" 
                                className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-primary transition-all relative group flex items-center gap-2"
                            >
                                <BookOpen className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100" />
                                MANUAL
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full shadow-glow"></span>
                            </Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="hidden sm:flex rounded-xl h-10 px-6 text-[9px] font-black uppercase tracking-[0.2em] border-primary/20 hover:bg-primary/5 shadow-inner transition-all">
                                        <UserCircle className="h-3.5 w-3.5 mr-2.5 text-primary" /> 
                                        ACCESO
                                        <ChevronDown className="h-3 w-3 ml-2 opacity-40" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[600px] p-0 rounded-[2rem] border-white/5 bg-black/95 backdrop-blur-3xl shadow-2xl overflow-hidden">
                                    <div className="p-8 pb-4">
                                        <DropdownMenuLabel className="px-0 py-0 flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <Sparkles className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Ecosistema Kyron</span>
                                                <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest">Selecciona tu portal maestro</span>
                                            </div>
                                        </DropdownMenuLabel>
                                    </div>
                                    <div className="px-8 pb-8 pt-2 space-y-6 max-h-[60vh] overflow-y-auto">
                                        <section>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Portal Ciudadano</span>
                                                <div className="h-px flex-1 bg-white/5"></div>
                                            </div>
                                            {loginOptions.filter(o => o.href === '/login-personal').map((option) => (
                                                <DropdownMenuItem key={option.href} asChild className="rounded-2xl p-4 cursor-pointer focus:bg-primary/5 border border-white/5 mb-4">
                                                    <Link href={option.href as any} className="flex items-center gap-4">
                                                        <div className="p-3 bg-primary/10 rounded-xl">
                                                            <option.icon className="h-6 w-6 text-primary" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="font-black text-xs uppercase italic text-primary">{option.label}</span>
                                                            <p className="text-[10px] text-white/40 leading-tight">{option.description}</p>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </section>
                                        <section>
                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20">Corporativos</span>
                                                <div className="h-px flex-1 bg-white/5"></div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                {loginOptions.filter(o => o.href !== '/login-personal').map((option) => (
                                                    <DropdownMenuItem key={option.href} asChild className="rounded-xl p-3 cursor-pointer focus:bg-primary/5 border border-transparent">
                                                        <Link href={option.href as any} className="flex items-start gap-3">
                                                            <div className="p-2 bg-primary/5 rounded-lg">
                                                                <option.icon className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <div className="flex flex-col gap-0.5">
                                                                <span className="font-black text-[10px] uppercase italic text-white/90">{option.label}</span>
                                                                <p className="text-[8px] text-white/30 line-clamp-1">{option.description}</p>
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="lg:hidden rounded-xl h-10 w-10 bg-white/5 border border-white/5">
                                        <Menu className="h-5 w-5 text-primary" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full sm:max-w-md p-0 bg-black border-l-white/5">
                                    <SheetHeader className="p-8 border-b border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Logo className="h-8 w-8" />
                                            <SheetTitle className="text-lg font-black tracking-tight text-white uppercase italic">KYRON MENU</SheetTitle>
                                        </div>
                                        <SheetDescription className="sr-only">Navegación móvil institucional.</SheetDescription>
                                    </SheetHeader>
                                    <nav className="flex-grow p-8 space-y-10 overflow-y-auto">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] italic">Navegación</p>
                                            <SheetClose asChild><Link href="/#inicio" className="text-sm font-black uppercase tracking-widest py-4 border-b border-white/5 flex items-center justify-between group">Inicio</Link></SheetClose>
                                            <SheetClose asChild><Link href="/ecosistema" className="text-sm font-black uppercase tracking-widest py-4 border-b border-white/5 flex items-center justify-between group">Ecosistema</Link></SheetClose>
                                            <SheetClose asChild><Link href="/#nosotros" className="text-sm font-black uppercase tracking-widest py-4 border-b border-white/5 flex items-center justify-between group">Nosotros</Link></SheetClose>
                                            <SheetClose asChild><Link href="/manual-usuario" className="text-sm font-black uppercase tracking-widest py-4 border-b border-white/5 flex items-center justify-between group text-primary">Manual de Usuario</Link></SheetClose>
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
