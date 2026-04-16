'use client';

import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import { 
    Mail, MapPin, FileText, Shield, Gavel, 
    ArrowUpRight, Hexagon, Github, Twitter, 
    Linkedin, Heart 
} from "lucide-react";

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

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
        <footer id="footer" className="relative overflow-hidden border-t border-white/[0.04] bg-gradient-to-b from-slate-50/80 via-slate-100/60 to-slate-100/80 dark:from-[#040810] dark:via-[#050a12] dark:to-[#030608]">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[250px] rounded-full bg-blue-500/[0.02] blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] rounded-full bg-emerald-500/[0.02] blur-[80px]" />
            </div>

            <div className="h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 via-violet-500 to-pink-500" />

            <div className="border-b border-white/[0.04] py-3 overflow-hidden">
                <div className="flex gap-8 animate-marquee whitespace-nowrap">
                    {[...modules, ...modules].map((m, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20 shrink-0 flex items-center gap-3">
                            {m} <Hexagon className="h-2 w-2 text-cyan-500/10" />
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
                                <span className="text-lg font-black uppercase tracking-tight text-foreground leading-none">System Kyron</span>
                                <span className="text-[9px] font-bold uppercase tracking-[0.3em] mt-1 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">{tHero('slogan')}</span>
                            </div>
                        </div>
                        <p className="text-xs text-foreground/45 font-medium leading-relaxed max-w-sm">
                            {t('description')}
                        </p>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">{t('status_online')}</span>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{t('platform')}</h4>
                        <nav className="flex flex-col gap-3">
                            {navItems.map(item => (
                                <a key={item.label} href={item.href} onClick={(e) => handleAnchorClick(e, item.href)}
                                    className="text-[10px] font-semibold text-foreground/30 hover:text-foreground/60 transition-colors uppercase tracking-[0.15em] group flex items-center gap-1">
                                    {item.label}
                                    <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{t('modules')}</h4>
                        <nav className="flex flex-col gap-3">
                            {modules.slice(0, 5).map(m => (
                                <Link key={m} href="/login" className="text-[10px] font-semibold text-foreground/30 hover:text-foreground/60 transition-colors uppercase tracking-[0.15em] flex items-center gap-1 group">
                                    {m} <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-5">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">{t('contact')}</h4>
                        <div className="space-y-4">
                            <a href="mailto:infosystemkyron@gmail.com"
                                className="flex items-center gap-3 group text-foreground/30 hover:text-foreground/60 transition-colors">
                                <div className="h-9 w-9 rounded-xl border border-white/[0.06] bg-cyan-500/[0.04] flex items-center justify-center shrink-0 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/[0.08] transition-all">
                                    <Mail className="h-4 w-4 text-cyan-400" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">infosystemkyron@gmail.com</span>
                            </a>
                            <div className="flex items-center gap-3 text-foreground/30">
                                <div className="h-9 w-9 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-center shrink-0">
                                    <MapPin className="h-4 w-4 text-violet-400" />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-wide">{t('location')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/[0.04]">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
                        {["SENIAT", "BCV", "VEN-NIF", "LOTTT", "CONATEL", "SUDEBAN"].map(ent => (
                            <span key={ent} className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/35 flex items-center gap-1.5 hover:text-foreground/55 transition-colors cursor-default">
                                <Shield className="h-2.5 w-2.5 text-cyan-500/30" /> {ent}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <Hexagon className="h-3.5 w-3.5 text-cyan-500/30" />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/40">
                                    &copy; 2026 {t('copyright')}
                                </p>
                            </div>
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-400/50 ml-6">
                                Fundador y CEO Carlos Mattar
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <a href="https://twitter.com/systemkyron" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-foreground/20 hover:text-cyan-400 hover:border-cyan-500/20 hover:bg-cyan-500/[0.06] transition-all duration-300">
                                <Twitter className="h-3.5 w-3.5" />
                            </a>
                            <a href="https://linkedin.com/company/systemkyron" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-foreground/20 hover:text-blue-400 hover:border-blue-500/20 hover:bg-blue-500/[0.06] transition-all duration-300">
                                <Linkedin className="h-3.5 w-3.5" />
                            </a>
                            <a href="https://github.com/systemkyron" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-lg border border-white/[0.06] bg-white/[0.02] flex items-center justify-center text-foreground/20 hover:text-foreground/60 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
                                <Github className="h-3.5 w-3.5" />
                            </a>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/20">
                            <Link href="/manual-usuario" className="hover:text-cyan-400 transition-all flex items-center gap-1.5"><FileText className="h-3 w-3"/> {t('user_manual')}</Link>
                            <Link href="/terms"                className="hover:text-cyan-400 transition-all flex items-center gap-1.5"><Gavel className="h-3 w-3"/> {t('terms')}</Link>
                            <Link href="/politica-privacidad" className="hover:text-cyan-400 transition-all flex items-center gap-1.5"><Shield className="h-3 w-3"/> {t('privacy')}</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.03]">
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 mt-2">
                            {["AES-256", "JWT", "HTTPS", "VEN-NIF"].map((tech, i) => (
                                <span key={i} className="text-[8px] font-bold uppercase tracking-[0.2em] text-foreground/10 px-2 py-0.5 rounded-full border border-white/[0.04]">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-foreground/20 mt-8 flex items-center gap-2">
                             Lucia Fernanda hermanita de carlitos <Heart className="h-2.5 w-2.5 text-rose-500/80 fill-rose-500/60 animate-pulse" />
                        </p>

                    </div>
                </div>
            </div>
        </footer>

    );
}
