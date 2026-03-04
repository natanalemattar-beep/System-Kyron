'use client';

import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { Mail, MapPin, Linkedin, Twitter } from "lucide-react";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
        {children}
    </a>
);

export function Footer() {
    const { isHolidayActive } = useHoliday();
    return (
        <footer id="footer" className={cn("py-16 border-t border-white/5", isHolidayActive ? "bg-transparent" : "bg-[#020202]")}>
            <div className="container mx-auto px-6 grid md:grid-cols-3 gap-16">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Logo className="h-10 w-10" />
                        <span className="text-xl font-black uppercase italic tracking-tighter text-white">System Kyron</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-white/40 leading-relaxed">
                        Ingeniería de software de misión crítica. <br/> Simplificamos la complejidad operativa.
                    </p>
                </div>
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Navegación</h4>
                    <nav className="flex flex-col gap-3 text-[10px] font-black uppercase tracking-widest">
                        <a href="#inicio" className="text-white/40 hover:text-primary transition-colors">Inicio</a>
                        <a href="/ecosistema" className="text-white/40 hover:text-primary transition-colors">Ecosistema</a>
                        <a href="#servicios" className="text-white/40 hover:text-primary transition-colors">Servicios</a>
                        <a href="#contacto" className="text-white/40 hover:text-primary transition-colors">Contacto</a>
                    </nav>
                </div>
                <div className="space-y-6">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Contacto Oficial</h4>
                    <div className="space-y-4 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-3 text-white/40">
                            <Mail className="h-4 w-4 text-primary" />
                            <a href="mailto:infosystemkyron@gmail.com" className="hover:text-primary transition-colors">infosystemkyron@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-3 text-white/40">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span>Caracas, Venezuela</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex gap-6">
                    <SocialIcon href="#"><Linkedin className="h-4 w-4" /></SocialIcon>
                    <SocialIcon href="#"><Twitter className="h-4 w-4" /></SocialIcon>
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20 italic">
                    &copy; {new Date().getFullYear()} System Kyron • Corporate Intelligence Node
                </p>
                <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-white/20">
                    <Link href="/terms" className="hover:text-primary">Términos</Link>
                    <Link href="/politica-privacidad" className="hover:text-primary">Privacidad</Link>
                </div>
            </div>
        </footer>
    );
}
