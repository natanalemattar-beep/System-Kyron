'use client';

import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { Mail, MapPin, FileText, Shield, Gavel, ArrowUpRight, Hexagon } from "lucide-react";
import { useTranslations } from 'next-intl';

export function Footer() {
    const t = useTranslations('Footer');
    const tHero = useTranslations('HeroSection');
    const modules = t.raw('module_list') as string[];

    const navItems = [
        { label: t('nav_home'), href: "#inicio" },
        { label: t('nav_platform'), href: "#caracteristicas" },
        { label: t('nav_services'), href: "#servicios" },
        { label: t('nav_about'), href: "#nosotros" },
        { label: t('nav_contact'), href: "#contacto" },
    ];

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="footer" className="relative overflow-hidden border-t border-border/30 bg-gradient-to-b from-slate-50/80 via-slate-100/60 to-slate-100/80 dark:from-[hsl(224,28%,6%)] dark:via-[hsl(224,24%,7%)] dark:to-[hsl(224,28%,6%)]">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] rounded-full bg-blue-400/[0.06] dark:bg-blue-500/[0.03] blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-emerald-400/[0.04] dark:bg-emerald-500/[0.02] blur-[80px]" />
                <div className="absolute top-0 left-[50%] w-[500px] h-[200px] rounded-full bg-indigo-400/[0.04] dark:bg-indigo-500/[0.02] blur-[120px]" />
            </div>

            <div className="kyron-accent-line opacity-100" />

            <div className="border-b border-blue-200/40 dark:border-blue-800/30 py-3 overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap">
                    {[...modules, ...modules].map((m, i) => (
                        <span key={i} className="text-[11px] sm:text-[10px] font-semibold uppercase tracking-wider text-foreground/50 shrink-0 flex items-center gap-3">
                            {m} <Hexagon className="h-2 w-2 text-primary/20" />
                        </span>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 pt-16 pb-10">
                <div className="grid md:grid-cols-12 gap-8 md:gap-8">

                    <div className="md:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <Logo className="h-10 w-10 drop-shadow-glow" />
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold uppercase tracking-tight text-foreground leading-none">System Kyron</span>
                                <span className="text-[10px] sm:text-[10px] font-bold uppercase tracking-[0.35em] mt-1 kyron-gradient-text">{tHero('slogan')}</span>
                            </div>
                        </div>
                        <p className="text-xs text-foreground/60 font-medium leading-relaxed max-w-sm">
                            {t('description')}
                        </p>
                    </div>

                    <div className="md:col-span-2 space-y-5">
                        <h4 className="text-[11px] font-semibold uppercase tracking-wider kyron-gradient-text">{t('platform')}</h4>
                        <nav className="flex flex-col gap-3">
                            {navItems.map(item => (
                                <a key={item.label} href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}
                                    className="text-[10px] font-semibold text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest">
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[11px] font-semibold uppercase tracking-wider kyron-gradient-text">{t('modules')}</h4>
                        <nav className="flex flex-col gap-3">
                            {modules.slice(0, 5).map(m => (
                                <Link key={m} href="/login" className="text-[10px] font-semibold text-foreground/60 hover:text-foreground transition-colors uppercase tracking-widest flex items-center gap-1 group">
                                    {m} <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[11px] font-semibold uppercase tracking-wider kyron-gradient-text">{t('contact')}</h4>
                        <div className="space-y-4">
                            <a href="mailto:infosystemkyron@gmail.com"
                                className="flex items-center gap-3 group text-foreground/60 hover:text-foreground transition-colors">
                                <div className="h-8 w-8 rounded-xl border border-border/40 bg-primary/5 flex items-center justify-center shrink-0 group-hover:border-[#0ea5e9]/30 transition-colors">
                                    <Mail className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">infosystemkyron@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-foreground/60">
                                <div className="h-8 w-8 rounded-xl border border-border/40 bg-muted/20 flex items-center justify-center shrink-0">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">{t('location')}</span>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 bg-muted/20 mt-2">
                            <span className="kyron-dot animate-pulse" />
                            <span className="text-[10px] sm:text-[10px] font-semibold uppercase tracking-wide text-foreground/50">{t('status_online')}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/40 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Hexagon className="h-3.5 w-3.5 text-primary/30" />
                        <p className="text-[10px] sm:text-[10px] font-semibold uppercase tracking-wider text-foreground/50">
                            &copy; 2026 {t('copyright')}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-foreground/50">
                        <Link href="/manual-usuario" className="hover:text-primary transition-all flex items-center gap-1.5"><FileText className="h-3 w-3"/> {t('user_manual')}</Link>
                        <Link href="/terms"                className="hover:text-primary transition-all flex items-center gap-1.5"><Gavel className="h-3 w-3"/> {t('terms')}</Link>
                        <Link href="/politica-privacidad" className="hover:text-primary transition-all flex items-center gap-1.5"><Shield className="h-3 w-3"/> {t('privacy')}</Link>
                    </div>
                </div>

                <div className="mt-6 pt-5 border-t border-border/20">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4">
                        {["SENIAT", "BCV", "VEN-NIF", "LOTTT", "CONATEL", "SUDEBAN"].map(ent => (
                            <span key={ent} className="text-[10px] font-semibold uppercase tracking-wide text-foreground/40 flex items-center gap-1.5">
                                <Shield className="h-2 w-2 text-primary/30" /> {ent}
                            </span>
                        ))}
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                        <p className="font-semibold text-foreground/50 tracking-wide text-[10px] sm:text-[10px]">
                            Carlos Mattar · CEO-Fundador
                        </p>
                        <p className="font-semibold text-foreground/50 tracking-wide text-[10px] sm:text-[10px]">
                            Fernanda Lucia · CEO-Fundadora y también Hermanita de Carlitos ♥️
                        </p>
                        <p className="font-semibold text-foreground/40 tracking-wide text-[10px] sm:text-[7px] mt-1">
                            Cifrado AES-256 · JWT · HTTPS · Auditoría Inmutable
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
