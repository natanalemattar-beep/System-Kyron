'use client';

import { useState, useEffect, type FC, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, LogIn, LayoutGrid } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
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
  { href: "#faq", label: "FAQ" },
];

export function LandingHeader() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
            
            const sections = navLinks.map(link => document.getElementById(link.href.substring(1))).filter(Boolean);
            let currentSection = "";

            sections.forEach(section => {
                if (section) {
                    const sectionTop = section.offsetTop - 150;
                    if (window.scrollY >= sectionTop) {
                        currentSection = section.id;
                    }
                }
            });
            setActiveSection(currentSection);
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
                            <Logo className="h-10 w-10 transition-transform group-hover:scale-110" />
                            <span className="text-2xl font-black tracking-tighter uppercase italic">Kyron</span>
                        </Link>
                        
                        <nav className="hidden md:flex items-center bg-secondary/20 backdrop-blur-md rounded-full px-2 py-1 border border-primary/5">
                            {navLinks.map((link) => (
                                <Button key={link.href} variant="ghost" size="sm" asChild className="rounded-full h-9 px-5">
                                    <SmoothScrollLink href={link.href} className={cn(
                                        "text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                        isClient && activeSection === link.href.substring(1) ? "text-primary bg-background shadow-sm" : "text-muted-foreground hover:text-primary"
                                    )}>
                                        {link.label}
                                    </SmoothScrollLink>
                                </Button>
                            ))}
                        </nav>

                        <div className="hidden md:flex items-center gap-3">
                            <ThemeToggle />
                            <Button variant="ghost" asChild className="rounded-xl h-10 px-5 text-xs font-bold">
                                <Link href="/login" className="flex items-center gap-2">
                                    Acceso <LogIn className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild className="rounded-xl h-10 px-6 text-xs font-black shadow-lg btn-3d-primary uppercase tracking-widest">
                                <Link href="/register">Registro</Link>
                            </Button>
                        </div>

                        <div className="flex md:hidden items-center gap-2">
                            <ThemeToggle />
                            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                                <SheetTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-secondary/50">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-full flex flex-col bg-background/95 backdrop-blur-2xl p-8 border-none">
                                    <SheetHeader className="mb-12">
                                        <SheetTitle asChild>
                                            <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                                                <Logo className="h-12 w-12" />
                                                <span className="text-2xl font-black tracking-tighter uppercase italic">Kyron</span>
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex flex-col gap-6">
                                        {navLinks.map((link) => (
                                            <SmoothScrollLink key={link.href} href={link.href} onLinkClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-black tracking-tighter hover:text-primary transition-colors">
                                                {link.label}
                                            </SmoothScrollLink>
                                        ))}
                                    </nav>
                                    <div className="mt-auto space-y-4">
                                        <Button variant="outline" className="w-full h-14 rounded-2xl text-lg font-bold" asChild>
                                          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Acceder</Link>
                                        </Button>
                                        <Button className="w-full h-14 rounded-2xl text-lg font-black shadow-xl" asChild>
                                            <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Registrarse</Link>
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