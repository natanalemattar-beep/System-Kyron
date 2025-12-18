
'use client';

import { useState, useEffect, type FC, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { loginOptions } from "@/lib/login-options";

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
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="default" className="btn-3d-primary">
                                        Acceder <User className="ml-2 h-4 w-4" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="w-screen max-w-sm">
                                    <div className="p-4 grid grid-cols-1 gap-2">
                                        {loginOptions.map((option) => (
                                            <Link href={option.href} key={option.href} className="block p-3 rounded-lg hover:bg-accent transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <option.icon className="h-6 w-6 text-primary mt-1 shrink-0"/>
                                                    <div>
                                                        <p className="font-semibold">{option.label}</p>
                                                        <p className="text-xs text-muted-foreground">{option.description}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
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
                                    <Button asChild className="w-full">
                                      <Link href="/login">Acceder</Link>
                                    </Button>
                                    <Button asChild variant="outline" className="w-full">
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
