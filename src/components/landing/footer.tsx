
'use client';

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer id="contacto" className="py-16 bg-card border-t">
            <div className="container px-4 md:px-6 grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                    <Logo />
                    <span className="text-xl font-bold">System Kyron</span>
                    </div>
                    <p className="text-sm text-muted-foreground">La solución definitiva para la gestión empresarial en Venezuela.</p>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold">Contacto</h4>
                    <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5"/>
                        <a href="mailto:contacto@kyron.com" className="hover:text-primary">contacto@kyron.com</a>
                    </div>
                    <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-muted-foreground mt-0.5"/>
                        <a href="tel:+584141234567" className="hover:text-primary">+58 414-1234567</a>
                    </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold">Legal</h4>
                    <nav className="flex flex-col gap-2 text-sm">
                        <Link href="/terms" className="text-muted-foreground hover:text-primary">Términos de Servicio</Link>
                        <Link href="/politica-privacidad" className="text-muted-foreground hover:text-primary">Política de Privacidad</Link>
                    </nav>
                </div>
            </div>
            <div className="container px-4 md:px-6 mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} System Kyron. Todos los derechos reservados.
            </div>
        </footer>
    );
}
