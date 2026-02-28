'use client';

import { useState, useEffect, type FC, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, LogIn } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const SmoothScrollLink: FC<AnchorHTMLAttributes<HTMLAnchorElement> & { onLinkClick?: () => void }> = ({ href, onLinkClick, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href!.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
             const yOffset = -80;
            const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
        if (onLinkClick) {
            onLinkClick();
        }
    };

    return <a href={href} onClick={handleClick} {...props} />;
};

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Ecosistema" },
  { href: "#caracteristicas", label: "Tecnología" },
  { href: "#nosotros", label: "Nosotros" },
];

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                 isScrolled ? "bg-background/80 backdrop-blur-xl border-b py-2" : "bg-transparent py-6"
            )}>
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex h-12 items-center justify-between">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Logo className="h-8 w-8 transition-transform group-hover:scale-110" />
                            <span className="text-xl font-black tracking-tighter uppercase italic">Kyron</span>
                        </Link>
                        
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Button key={link.href} variant="ghost" size="sm" asChild className="rounded-full h-9 px-4">
                                    <SmoothScrollLink href={link.href} className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary">
                                        {link.label}
                                    </SmoothScrollLink>
                                </Button>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
                            <Button variant="ghost" asChild className="h-9 px-4 text-[10px] font-black uppercase tracking-widest">
                                <Link href="/login">Acceso</Link>
                            </Button>
                            <div className="h-4 w-px bg-border" />
                            <Button asChild className="h-9 px-5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                <Link href="/register">Registro</Link>
                            </Button>
                        </div>

                        <div className="flex md:hidden items-center gap-2">
                            <ThemeToggle />
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-secondary/50">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full flex flex-col bg-background/95 backdrop-blur-2xl p-8 border-none">
                                    <SheetHeader className="mb-12">
                                        <SheetTitle asChild>
                                            <Link href="/" className="flex items-center gap-3">
                                                <Logo className="h-12 w-12" />
                                                <span className="text-2xl font-black tracking-tighter uppercase italic">Kyron</span>
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col gap-6">
                                        {navLinks.map((link) => (
                                            <SmoothScrollLink key={link.href} href={link.href} className="text-4xl font-black tracking-tighter hover:text-primary transition-colors">
                                                {link.label}
                                            </SmoothScrollLink>
                                        ))}
                                    </nav>
                                    <div className="mt-auto space-y-4">
                                        <Button variant="outline" className="w-full h-12 rounded-xl text-sm font-bold" asChild>
                                          <Link href="/login">Acceder</Link>
                                        </Button>
                                        <Button className="w-full h-12 rounded-xl text-sm font-black shadow-xl" asChild>
                                            <Link href="/register">Registrarse</Link>
                                        </Button>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>
    )
}
