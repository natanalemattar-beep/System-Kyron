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
        <footer id="footer" className="relative overflow-hidden border-t border-border/20 bg-gradient-to-b from-slate-50/80 via-slate-100/60 to-slate-100/80 dark:from-[hsl(224,28%,6%)] dark:via-[hsl(224,24%,7%)] dark:to-[hsl(224,28%,5%)]">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] rounded-full bg-blue-400/[0.05] dark:bg-blue-500/[0.02] blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-emerald-400/[0.04] dark:bg-emerald-500/[0.02] blur-[80px]" />
            </div>

            <div className="kyron-accent-line opacity-100" />

            <div className="border-b border-blue-200/30 dark:border-blue-800/20 py-3 overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap">
                    {[...modules, ...modules].map((m, i) => (
                        <span key={i} className="text-[10px] font-semibold uppercase tracking-widest text-foreground/40 shrink-0 flex items-center gap-3">
                            {m} <Hexagon className="h-2 w-2 text-primary/15" />
                        </span>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 pt-16 pb-10">
                <div className="grid md:grid-cols-12 gap-10 md:gap-8">

                    <div className="md:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <Logo className="h-10 w-10 drop-shadow-glow" />
                            <div className="flex flex-col">
                                <span className="text-lg font-bold uppercase tracking-tight text-foreground leading-none">System Kyron</span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.35em] mt-1 kyron-gradient-text">{tHero('slogan')}</span>
                            </div>
                        </div>
                        <p className="text-xs text-foreground/60 font-medium leading-relaxed max-w-sm">
                            {t('description')}
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{t('status_online')}</span>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-5">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest kyron-gradient-text">{t('platform')}</h4>
                        <nav className="flex flex-col gap-3">
                            {navItems.map(item => (
                                <a key={item.label} href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}
                                    className="text-[10px] font-semibold text-foreground/50 hover:text-foreground transition-colors uppercase tracking-widest group flex items-center gap-1">
                                    {item.label}
                                    <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest kyron-gradient-text">{t('modules')}</h4>
                        <nav className="flex flex-col gap-3">
                            {modules.slice(0, 5).map(m => (
                                <Link key={m} href="/login" className="text-[10px] font-semibold text-foreground/50 hover:text-foreground transition-colors uppercase tracking-widest flex items-center gap-1 group">
                                    {m} <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[11px] font-bold uppercase tracking-widest kyron-gradient-text">{t('contact')}</h4>
                        <div className="space-y-4">
                            <a href="mailto:infosystemkyron@gmail.com"
                                className="flex items-center gap-3 group text-foreground/50 hover:text-foreground transition-colors">
                                <div className="h-9 w-9 rounded-xl border border-border/30 bg-primary/5 flex items-center justify-center shrink-0 group-hover:border-[#0ea5e9]/30 group-hover:bg-primary/10 transition-all">
                                    <Mail className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">infosystemkyron@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-foreground/50">
                                <div className="h-9 w-9 rounded-xl border border-border/30 bg-muted/20 flex items-center justify-center shrink-0">
                                    <MapPin className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">{t('location')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/30">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
                        {["SENIAT", "BCV", "VEN-NIF", "LOTTT", "CONATEL", "SUDEBAN"].map(ent => (
                            <span key={ent} className="text-[10px] font-bold uppercase tracking-wider text-foreground/30 flex items-center gap-1.5 hover:text-foreground/50 transition-colors cursor-default">
                                <Shield className="h-2.5 w-2.5 text-primary/25" /> {ent}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-3">
                            <Hexagon className="h-3.5 w-3.5 text-primary/25" />
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/40">
                                &copy; 2026 {t('copyright')}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] font-semibold uppercase tracking-widest text-foreground/40">
                            <Link href="/manual-usuario" className="hover:text-primary transition-all flex items-center gap-1.5"><FileText className="h-3 w-3"/> {t('user_manual')}</Link>
                            <Link href="/terms"                className="hover:text-primary transition-all flex items-center gap-1.5"><Gavel className="h-3 w-3"/> {t('terms')}</Link>
                            <Link href="/politica-privacidad" className="hover:text-primary transition-all flex items-center gap-1.5"><Shield className="h-3 w-3"/> {t('privacy')}</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/15">
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-semibold text-foreground/45 tracking-wide text-[10px]">
                            Carlos Mattar · CEO-Fundador
                        </p>
                        <p className="font-semibold text-foreground/45 tracking-wide text-[10px]">
                            Fernanda Lucia · CEO-Fundadora y también Hermanita de Carlitos ♥️
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            {["Cifrado AES-256", "JWT", "HTTPS", "Auditoría Inmutable"].map((tech, i) => (
                                <span key={i} className="text-[8px] font-bold uppercase tracking-widest text-foreground/25 px-2 py-0.5 rounded-full border border-border/15">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
