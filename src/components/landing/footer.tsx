'use client';

import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { Mail, MapPin, Linkedin, Twitter, FileText, Shield, Gavel, ArrowUpRight, Hexagon } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
        className="h-9 w-9 rounded-xl border border-border/40 dark:border-white/8 bg-muted/30 dark:bg-white/[0.02] flex items-center justify-center text-muted-foreground/70 hover:text-[#0ea5e9] hover:border-[#0ea5e9]/30 hover:bg-[#0ea5e9]/5 transition-all duration-300">
        {children}
    </a>
);

export function Footer() {
    const t = useTranslations('Footer');
    const tHero = useTranslations('HeroSection');
    const [currentYear, setCurrentYear] = useState<number | null>(null);
    const modules = t.raw('module_list') as string[];

    useEffect(() => { setCurrentYear(new Date().getFullYear()); }, []);

    const navItems = [
        { label: t('nav_home'), href: "#inicio" },
        { label: t('nav_ecosystem'), href: "#servicios" },
        { label: t('nav_about'), href: "#nosotros" },
        { label: t('nav_faq'), href: "#faq" },
        { label: t('nav_contact'), href: "#contacto" },
    ];

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('#')) {
            e.preventDefault();
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer id="footer" className="relative overflow-hidden border-t border-border/40 dark:border-white/8 bg-transparent">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] rounded-full bg-[#0ea5e9]/4 blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-[#22c55e]/3 blur-[80px]" />
            </div>

            <div className="kyron-accent-line opacity-100" />

            <div className="border-b border-border/40 dark:border-white/8 py-3 overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap">
                    {[...modules, ...modules].map((m, i) => (
                        <span key={i} className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/50 shrink-0 flex items-center gap-3">
                            {m} <Hexagon className="h-2 w-2 text-primary/20" />
                        </span>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-6 pt-16 pb-10">
                <div className="grid md:grid-cols-12 gap-12 md:gap-8">

                    <div className="md:col-span-4 space-y-6">
                        <div className="flex items-center gap-3">
                            <Logo className="h-10 w-10 drop-shadow-glow" />
                            <div className="flex flex-col">
                                <span className="text-lg font-black uppercase tracking-tight text-foreground leading-none">System Kyron</span>
                                <span className="text-[8px] font-bold uppercase tracking-[0.35em] mt-1 kyron-gradient-text">{tHero('slogan')}</span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground/70 font-medium leading-relaxed max-w-sm">
                            {t('description')}
                        </p>
                        <div className="flex gap-2">
                            <SocialIcon href="#"><Linkedin className="h-3.5 w-3.5" /></SocialIcon>
                            <SocialIcon href="#"><Twitter className="h-3.5 w-3.5" /></SocialIcon>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-5">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] kyron-gradient-text">{t('platform')}</h4>
                        <nav className="flex flex-col gap-3">
                            {navItems.map(item => (
                                <a key={item.label} href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}
                                    className="text-[10px] font-semibold text-muted-foreground/70 hover:text-foreground transition-colors uppercase tracking-widest">
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] kyron-gradient-text">{t('modules')}</h4>
                        <nav className="flex flex-col gap-3">
                            {modules.slice(0, 5).map(m => (
                                <Link key={m} href="/login" className="text-[10px] font-semibold text-muted-foreground/70 hover:text-foreground transition-colors uppercase tracking-widest flex items-center gap-1 group">
                                    {m} <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] kyron-gradient-text">{t('contact')}</h4>
                        <div className="space-y-4">
                            <a href="mailto:infosystemkyron@gmail.com"
                                className="flex items-center gap-3 group text-muted-foreground/70 hover:text-foreground transition-colors">
                                <div className="h-8 w-8 rounded-xl border border-border/40 dark:border-white/8 bg-primary/5 flex items-center justify-center shrink-0 group-hover:border-[#0ea5e9]/30 transition-colors">
                                    <Mail className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">infosystemkyron@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-muted-foreground/70">
                                <div className="h-8 w-8 rounded-xl border border-border/40 dark:border-white/8 bg-muted/20 dark:bg-white/[0.02] flex items-center justify-center shrink-0">
                                    <MapPin className="h-3.5 w-3.5 text-primary" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">{t('location')}</span>
                            </div>
                        </div>

                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 dark:border-white/8 bg-muted/20 dark:bg-white/[0.02] mt-2">
                            <span className="kyron-dot animate-pulse" />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">{t('status_online')}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border/40 dark:border-white/8 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Hexagon className="h-3.5 w-3.5 text-primary/30" />
                        <p className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/60">
                            &copy; {currentYear || '2026'} {t('copyright')}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                        <Link href="/manual-usuario" className="hover:text-primary transition-all flex items-center gap-1.5"><FileText className="h-3 w-3"/> {t('user_manual')}</Link>
                        <Link href="/terms"                className="hover:text-primary transition-all flex items-center gap-1.5"><Gavel className="h-3 w-3"/> {t('terms')}</Link>
                        <Link href="/politica-privacidad" className="hover:text-primary transition-all flex items-center gap-1.5"><Shield className="h-3 w-3"/> {t('privacy')}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
