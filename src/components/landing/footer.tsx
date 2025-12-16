
'use client';

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";
import { Button } from "../ui/button";

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
        {children}
    </a>
);


export function Footer() {
    return (
        <footer id="footer" className="py-16 bg-card border-t">
            <div className="container px-4 md:px-6 grid md:grid-cols-3 gap-12">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                    <Logo />
                    <span className="text-xl font-bold">System Kyron</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Tu aliado en gestión empresarial. Simplificamos lo complejo.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold">Enlaces Rápidos</h4>
                    <nav className="flex flex-col gap-2 text-sm">
                        <a href="#inicio" className="text-muted-foreground hover:text-primary">Inicio</a>
                        <a href="#caracteristicas" className="text-muted-foreground hover:text-primary">Funcionalidades</a>
                        <a href="#nosotros" className="text-muted-foreground hover:text-primary">Equipo</a>
                        <a href="#contacto" className="text-muted-foreground hover:text-primary">Contacto</a>
                    </nav>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold">Contáctanos</h4>
                    <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0"/>
                        <a href="tel:+58424XXXXXXX" className="hover:text-primary">+58 424-XXX-XXXX</a>
                    </div>
                    <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0"/>
                        <a href="mailto:info@systemkyron.com" className="hover:text-primary">info@systemkyron.com</a>
                    </div>
                    <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0"/>
                        <span>Caracas, Venezuela</span>
                    </div>
                    </div>
                </div>
            </div>
            <div className="container px-4 md:px-6 mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex gap-4">
                    <SocialIcon href="#"><Linkedin className="h-5 w-5" /></SocialIcon>
                    <SocialIcon href="#"><Twitter className="h-5 w-5" /></SocialIcon>
                    {/* Assuming Instagram icon might be needed */}
                    <SocialIcon href="#">
                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                    </SocialIcon>
                </div>
                <p className="text-center text-sm text-muted-foreground">&copy; {new Date().getFullYear()} System Kyron. Todos los derechos reservados.</p>
                <div className="text-sm">
                    <Link href="/terms" className="text-muted-foreground hover:text-primary">Términos de Servicio</Link>
                    <span className="mx-2 text-muted-foreground">|</span>
                    <Link href="/politica-privacidad" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link>
                </div>
            </div>
        </footer>
    );
}
