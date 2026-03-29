'use client';

import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { Mail, MapPin, Linkedin, Twitter, FileText, Shield, Gavel, ArrowUpRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
        className="h-9 w-9 rounded-xl border border-border/40 dark:border-white/8 bg-muted/30 dark:bg-white/[0.02] flex items-center justify-center text-muted-foreground/70 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
        {children}
    </a>
);

const modules = [
    "Contabilidad VEN-NIF", "RRHH & Nómina", "Mi Línea 5G / eSIM",
    "IA Legal & Permisos", "Ameru Eco-Créditos", "Analítica Avanzada",
    "Facturación SENIAT", "Tributos & Retenciones", "Dashboard Ejecutivo"
];

export function Footer() {
    const t = useTranslations('HeroSection');
    const [currentYear, setCurrentYear] = useState<number | null>(null);

    useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="footer" className="relative overflow-hidden border-t border-border/40 dark:border-white/8 bg-transparent">

            {/* Background */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-[100px]" />
            </div>

            {/* Module ticker */}
            <div className="border-b border-border/40 dark:border-white/8 py-3 overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap">
                    {[...modules, ...modules].map((m, i) => (
                        <span key={i} className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/60 shrink-0">
                            {m} <span className="text-primary/40 mx-2">·</span>
                        </span>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 pt-16 pb-10">
                <div className="grid md:grid-cols-12 gap-12 md:gap-8">

                    {/* Brand */}
                    <div className="md:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <Logo className="h-10 w-10 drop-shadow-glow" />
                            <div className="flex flex-col">
                                <span className="text-lg font-black uppercase tracking-tight text-foreground leading-none">System Kyron</span>
                                <span className="text-[8px] font-bold text-primary/60 uppercase tracking-[0.35em] mt-1">{t('slogan')}</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground/70 font-medium leading-relaxed max-w-sm">
                            Ingeniería de software de grado corporativo. Soluciones de misión crítica para el futuro de las finanzas y telecomunicaciones de Venezuela.
                        </p>
                        <div className="flex gap-2">
                            <SocialIcon href="#"><Linkedin className="h-3.5 w-3.5" /></SocialIcon>
                            <SocialIcon href="#"><Twitter className="h-3.5 w-3.5" /></SocialIcon>
                        </div>
                    </div>

                    {/* Nav */}
                    <div className="md:col-span-2 space-y-5">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Plataforma</h4>
                        <nav className="flex flex-col gap-3">
                            {[
                                { label: "Inicio",      href: "#inicio" },
                                { label: "Ecosistema",  href: "#servicios" },
                                { label: "Nosotros",    href: "#nosotros" },
                                { label: "FAQ",         href: "#faq" },
                                { label: "Contacto",    href: "#contacto" },
                            ].map(item => (
                                <a key={item.label} href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}
                                    className="text-[10px] font-semibold text-muted-foreground/70 hover:text-foreground transition-colors uppercase tracking-widest">
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Modules */}
                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Módulos</h4>
                        <nav className="flex flex-col gap-3">
                            {modules.slice(0, 5).map(m => (
                                <Link key={m} href="/login" className="text-[10px] font-semibold text-muted-foreground/70 hover:text-foreground transition-colors uppercase tracking-widest flex items-center gap-1 group">
                                    {m} <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Contacto</h4>
                        <div className="space-y-4">
                            <a href="mailto:infosystemkyron@gmail.com"
                                className="flex items-center gap-3 group text-muted-foreground/70 hover:text-foreground transition-colors">
                                <div className="h-8 w-8 rounded-xl border border-border/40 dark:border-white/8 bg-primary/5 flex items-center justify-center shrink-0 group-hover:border-primary/30 transition-colors">
                                    <Mail className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">infosystemkyron@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-muted-foreground/70">
                                <div className="h-8 w-8 rounded-xl border border-border/40 dark:border-white/8 bg-muted/20 dark:bg-white/[0.02] flex items-center justify-center shrink-0">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">Caracas, Venezuela · Distrito Capital</span>
                            </div>
                        </div>

                        {/* Version badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 dark:border-white/8 bg-muted/20 dark:bg-white/[0.02] mt-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">v2.8.5 — Estable</span>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-border/40 dark:border-white/8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <p className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">
                        &copy; {currentYear || '2026'} System Kyron · Inteligencia Corporativa · v2.8.5
                    </p>
                    <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                        <Link href="/manual-usuario" className="hover:text-primary transition-all flex items-center gap-1.5"><FileText className="h-3 w-3"/> Manual de Usuario</Link>
                        <Link href="/terms"                className="hover:text-primary transition-all flex items-center gap-1.5"><Gavel className="h-3 w-3"/> Términos</Link>
                        <Link href="/politica-privacidad" className="hover:text-primary transition-all flex items-center gap-1.5"><Shield className="h-3 w-3"/> Privacidad</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
