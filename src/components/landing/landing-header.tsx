
'use client';

import { useState, useEffect, type FC, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Menu, LogIn } from "lucide-react";
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
             const yOffset = -80; // Offset to account for sticky header
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
                    const sectionTop = section.offsetTop - 100;
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
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                 isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
            )}>
                <motion.div 
                    className="container mx-auto px-4 md:px-6"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        type: 'spring',
                        stiffness: 70,
                        damping: 20,
                        mass: 1,
                        delay: 0.5
                    }}
                >
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <Logo />
                            <span className="text-xl font-bold">System Kyron</span>
                        </Link>
                        <nav className="hidden md:flex gap-2">
                            {navLinks.map((link) => (
                                <Button key={link.href} variant="ghost" size="sm" asChild>
                                    <SmoothScrollLink href={link.href} className={cn(
                                        "text-muted-foreground",
                                        isClient && activeSection === link.href.substring(1) && "text-foreground font-semibold"
                                    )}>
                                        {link.label}
                                    </SmoothScrollLink>
                                </Button>
                            ))}
                        </nav>
                        <div className="hidden md:flex items-center gap-2">
                            <ThemeToggle />
                            <Button variant="outline" asChild>
                                <Link href="/login" className="flex items-center gap-2">
                                    Acceder <LogIn className="h-4 w-4" />
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">Registrarse</Link>
                            </Button>
                        </div>
                        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu />
                                    <span className="sr-only">Abrir menú</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col bg-background/80 backdrop-blur-lg shadow-lg">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-3">
                                        <Logo />
                                        <span className="text-xl font-bold">System Kyron</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="grid gap-4 text-lg font-medium mt-8">
                                    {navLinks.map((link) => (
                                        <SmoothScrollLink key={link.href} href={link.href} onLinkClick={() => setIsMobileMenuOpen(false)}>{link.label}</SmoothScrollLink>
                                    ))}
                                </nav>
                                <div className="mt-auto space-y-4">
                                    <div className="flex gap-2">
                                        <ThemeToggle />
                                    </div>
                                    <Button variant="outline" className="w-full" asChild>
                                      <Link href="/login" className="flex items-center justify-center gap-2">
                                        Acceder <LogIn className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                    <Button asChild className="w-full">
                                        <Link href="/register">Registrarse</Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </motion.div>
            </header>
    )
}
