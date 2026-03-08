'use client';

import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { Mail, MapPin, Linkedin, Twitter } from "lucide-react";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        {children}
    </a>
);

export function Footer() {
    const { isHolidayActive } = useHoliday();
    const t = useTranslations('HeroSection');

    return (
        <footer id="footer" className="py-16 border-t border-border/50 bg-transparent">
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Logo className="h-10 w-10" />
                        <div className="flex flex-col">
                            <span className="text-xl font-black uppercase italic tracking-tighter text-foreground leading-none">System Kyron</span>
                            <span className="text-[8px] font-bold text-primary uppercase tracking-widest mt-1 opacity-60 italic">{t('slogan')}</span>
                        </div>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed">
                        Ingeniería de software de misión crítica. <br/> Simplificamos la complejidad operativa.
                    </p>
                </div>
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Navegación</h4>
                    <nav className="flex flex-col gap-3 text-[10px] font-black uppercase tracking-widest">
                        <a href="#inicio" className="text-muted-foreground/60 hover:text-primary transition-colors">Inicio</a>
                        <a href="/ecosistema" className="text-muted-foreground/60 hover:text-primary transition-colors">Ecosistema</a>
                        <a href="#servicios" className="text-muted-foreground/60 hover:text-primary transition-colors">Servicios</a>
                        <a href="#contacto" className="text-muted-foreground/60 hover:text-primary transition-colors">Contacto</a>
                    </nav>
                </div>
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Contacto Oficial</h4>
                    <div className="space-y-4 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-3 text-muted-foreground/60">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href="mailto:infosystemkyron@gmail.com" className="hover:text-primary transition-colors">infosystemkyron@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground/60">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Caracas, Venezuela</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex gap-6">
                    <SocialIcon href="#"><Linkedin className="h-4 w-4" /></SocialIcon>
                    <SocialIcon href="#"><Twitter className="h-4 w-4" /></SocialIcon>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic">
                    &copy; {new Date().getFullYear()} System Kyron • Corporate Intelligence Node
                </p>
                <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                    <Link href="/terms" className="hover:text-primary">Términos</Link>
                    <Link href="/politica-privacidad" className="hover:text-primary">Privacidad</Link>
                </div>
            </div>
        </footer>
    );
}
