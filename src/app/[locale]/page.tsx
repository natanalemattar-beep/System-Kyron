
'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Menu, AlertTriangle } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { loginOptions } from "@/lib/login-options";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import type { FC, AnchorHTMLAttributes } from 'react';
import { HeroSection, ServicesSection, FeaturesSection, AboutUsSection, FaqSection, CtaSection, Footer } from '@/components/landing';

const ChatDialog = dynamic(() => import('@/components/chat-dialog').then(mod => mod.ChatDialog), { ssr: false });

const SmoothScrollLink: FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({ href, ...props }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetId = href!.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
        // This part is for closing the mobile sheet menu if a link is clicked
        const sheetCloseButton = document.querySelector('[data-radix-dialog-close]');
        if (sheetCloseButton instanceof HTMLElement) {
            sheetCloseButton.click();
        }
    };

    return <a href={href} onClick={handleClick} {...props} />;
};

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#caracteristicas", label: "Características" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export default function LandingPage() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="flex flex-col min-h-dvh bg-background text-foreground">
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                 isScrolled ? "bg-background/80 backdrop-blur-lg" : "bg-transparent"
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
                    <div className={cn(
                        "flex h-16 items-center justify-between px-4 md:px-6 transition-all duration-300",
                        isScrolled ? "border rounded-full mt-4" : "mt-0 md:mt-4"
                    )}>
                        <Link href="/" className="flex items-center gap-3">
                            <Logo />
                            <span className="text-xl font-bold">System Kyron</span>
                        </Link>
                        <nav className="hidden md:flex gap-6">
                            {navLinks.map((link) => (
                                <SmoothScrollLink key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                    {link.label}
                                </SmoothScrollLink>
                            ))}
                        </nav>
                        <div className="hidden md:flex items-center gap-2">
                            <LanguageSwitcher />
                            <ThemeToggle />
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost">Acceder <User className="ml-2 h-4 w-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-64">
                                    <DropdownMenuLabel>Selecciona un Portal</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {loginOptions.map((opt) => (
                                        <DropdownMenuItem key={opt.href} asChild>
                                            <Link href={opt.href} className="flex items-center justify-start">
                                                <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p>{opt.label}</p>
                                                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                                                </div>
                                            </Link>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button asChild>
                                <Link href="/register">Registrarse</Link>
                            </Button>
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu />
                                    <span className="sr-only">Abrir menú</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <SheetHeader>
                                    <SheetTitle className="flex items-center gap-3">
                                        <Logo />
                                        <span className="text-xl font-bold">System Kyron</span>
                                    </SheetTitle>
                                </SheetHeader>
                                <nav className="grid gap-4 text-lg font-medium mt-8">
                                    {navLinks.map((link) => (
                                        <SmoothScrollLink key={link.href} href={link.href}>{link.label}</SmoothScrollLink>
                                    ))}
                                </nav>
                                <div className="mt-auto space-y-4">
                                    <div className="flex gap-2">
                                        <LanguageSwitcher />
                                        <ThemeToggle />
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full justify-start">
                                                <User className="mr-2 h-4 w-4" /> Acceder
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start" side="top" className="w-64 mb-2">
                                            <DropdownMenuLabel>Selecciona un Portal</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {loginOptions.map((opt) => (
                                                <DropdownMenuItem key={opt.href} asChild>
                                                    <Link href={opt.href} className="flex items-center justify-start">
                                                        <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                                        <div>
                                                            <p>{opt.label}</p>
                                                            <p className="text-xs text-muted-foreground">{opt.description}</p>
                                                        </div>
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button asChild className="w-full">
                                        <Link href="/register">Registrarse</Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </motion.div>
                <motion.div 
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                      delay: 1,
                      type: 'spring',
                      stiffness: 80,
                  }}
                  className="bg-yellow-400/10 border-y border-yellow-400/20 py-2"
                >
                    <div className="container mx-auto text-center text-xs text-yellow-500 flex items-center justify-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <p>
                            <strong>Atención:</strong> Esta es una versión de prueba. La información y las funcionalidades están sujetas a cambios.
                        </p>
                    </div>
                </motion.div>
            </header>

            <main className="flex-1 pt-24 md:pt-32">
                <HeroSection />
                <ServicesSection />
                <FeaturesSection />
                <AboutUsSection />
                <FaqSection />
                <CtaSection />
            </main>

            <Footer />
            <ChatDialog />
        </div>
    );
}
