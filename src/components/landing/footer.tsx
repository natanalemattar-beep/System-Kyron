
'use client';

import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { Mail, MapPin, Linkedin, Twitter, FileText, Shield, Gavel } from "lucide-react";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-primary transition-all duration-300 hover:scale-110">
        {children}
    </a>
);

export function Footer() {
    const { isHolidayActive } = useHoliday();
    const t = useTranslations('HeroSection');
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer id="footer" className="py-20 border-t border-white/5 bg-transparent relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none -z-10" />
            
            <div className="container mx-auto px-6 grid md:grid-cols-12 gap-16 md:gap-8">
                <div className="md:col-span-5 space-y-8">
                    <div className="flex items-center gap-4">
                        <Logo className="h-12 w-12 drop-shadow-glow" />
                        <div className="flex flex-col">
                            <span className="text-2xl font-black uppercase italic tracking-tighter text-white leading-none">System Kyron</span>
                            <span className="text-[8px] font-bold text-primary uppercase tracking-[0.4em] mt-2 opacity-60 italic">Telecom, Reciclaje y Control Total</span>
                        </div>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40 leading-relaxed max-w-sm">
                        Ingeniería de software de grado corporativo. Soluciones de misión crítica para el futuro de las finanzas y las telecomunicaciones.
                    </p>
                    <div className="flex gap-6">
                        <SocialIcon href="#"><Linkedin className="h-5 w-5" /></SocialIcon>
                        <SocialIcon href="#"><Twitter className="h-5 w-5" /></SocialIcon>
                    </div>
                </div>

                <div className="md:col-span-3 space-y-8">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Navegación</h4>
                    <nav className="flex flex-col gap-4 text-[10px] font-black uppercase tracking-widest">
                        <a href="#inicio" onClick={(e) => handleAnchorClick(e, '#inicio')} className="text-white/40 hover:text-white transition-colors">Inicio</a>
                        <a href="#servicios" onClick={(e) => handleAnchorClick(e, '#servicios')} className="text-white/40 hover:text-white transition-colors">Ecosistema</a>
                        <a href="#nosotros" onClick={(e) => handleAnchorClick(e, '#nosotros')} className="text-white/40 hover:text-white transition-colors">Nosotros</a>
                        <a href="#faq" onClick={(e) => handleAnchorClick(e, '#faq')} className="text-white/40 hover:text-white transition-colors">Preguntas Frecuentes</a>
                        <a href="#contacto" onClick={(e) => handleAnchorClick(e, '#contacto')} className="text-white/40 hover:text-white transition-colors">Contacto Oficial</a>
                    </nav>
                </div>

                <div className="md:col-span-4 space-y-8">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Centro de Contacto</h4>
                    <div className="space-y-6 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-4 text-white/40 group">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5 group-hover:border-primary/40 transition-colors">
                                <Mail className="h-4 w-4 text-primary" />
                            </div>
                            <a href="mailto:infosystemkyron@gmail.com" className="hover:text-white transition-colors">infosystemkyron@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-4 text-white/40">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/5">
                                <MapPin className="h-4 w-4 text-primary" />
                            </div>
                            <span>Caracas, Venezuela • Distrito Capital</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-24 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/10 italic">
                    &copy; {currentYear || '2026'} System Kyron • Inteligencia Corporativa • MK-2.6
                </p>
                <div className="flex flex-wrap justify-center gap-10 text-[9px] font-black uppercase tracking-widest text-white/20">
                    <Link href="/manual-usuario" className="hover:text-primary transition-all flex items-center gap-2"><FileText className="h-3 w-3"/> Manual de Usuario</Link>
                    <Link href="/terms" className="hover:text-primary transition-all flex items-center gap-2"><Gavel className="h-3 w-3"/> Términos</Link>
                    <Link href="/politica-privacidad" className="hover:text-primary transition-all flex items-center gap-2"><Shield className="h-3 w-3"/> Privacidad</Link>
                </div>
            </div>
        </footer>
    );
}
