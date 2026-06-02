'use client';

import { Link } from "@/navigation";
import { Logo } from "@/components/logo";
import {
  Mail, MapPin, FileText, Shield, Gavel,
  ArrowUpRight, Hexagon, Github, Twitter,
  Linkedin, Heart, Instagram
} from "lucide-react";

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');
  const tHero = useTranslations('HeroSection');
  const modules = t.raw('module_list') as string[];

  const navItems = [
    { label: t('nav_home'), href: "/#inicio" },
    { label: t('nav_platform'), href: "/#caracteristicas" },
    { label: "Planes & Precios", href: "/precios" },
  ];

  return (
    <footer className="relative overflow-hidden bg-muted/30 dark:bg-[#030712] border-t border-border dark:border-white/5">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-kyron-cyan/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-kyron-emerald/[0.03] blur-[120px]" />
      </div>

      <div className="h-[2px] bg-gradient-to-r from-kyron-cyan via-blue-500 via-violet-500 to-pink-500" />

      <div className="border-b border-border dark:border-white/[0.04] py-3 overflow-hidden">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...modules, ...modules].map((m, i) => (
            <span key={`${m}-${i}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 shrink-0 flex items-center gap-3">
              {m} <Hexagon className="h-2 w-2 text-kyron-cyan/20" />
            </span>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 pt-16 pb-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <Logo className="h-12 w-12 drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
              <div className="flex flex-col">
                <span className="text-xl font-black uppercase tracking-tighter text-foreground leading-none italic">System Kyron</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mt-2 text-glow-cyan">{tHero('slogan')}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground/70 font-medium leading-relaxed max-w-sm">
              {t('description')}
            </p>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl border border-kyron-emerald/20 bg-kyron-emerald/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kyron-emerald opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-kyron-emerald" />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-kyron-emerald">{t('status_online')}</span>
            </div>
          </div>

          <div className="md:col-span-2 space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] bg-gradient-to-r from-kyron-cyan to-blue-400 bg-clip-text text-transparent">{t('platform')}</h4>
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href as any}
                  className="py-2 text-xs md:text-[10px] font-semibold text-muted-foreground/55 hover:text-foreground/90 transition-colors uppercase tracking-[0.15em] group flex items-center gap-1"
                >
                  {item.label}
                  <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3 space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{t('modules')}</h4>
            <nav className="flex flex-col">
              {modules.slice(0, 5).map((m) => (
                <Link
                  key={m}
                  href="/login"
                  className="py-2 text-xs md:text-[10px] font-semibold text-muted-foreground/55 hover:text-foreground/90 transition-colors uppercase tracking-[0.15em] flex items-center gap-1 group"
                >
                  {m} <ArrowUpRight className="h-2.5 w-2.5 opacity-0 group-hover:opacity-70 transition-opacity" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3 space-y-5">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-6">{t('contact')}</h4>
            <div className="space-y-6">
              <a
                href="mailto:infosystemkyron@gmail.com"
                className="flex items-center gap-4 group text-muted-foreground/60 hover:text-foreground transition-all"
              >
                <div className="h-10 w-10 rounded-xl border border-border dark:border-white/5 bg-muted/50 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:border-kyron-cyan/30 group-hover:bg-kyron-cyan/10 transition-all">
                  <Mail className="h-5 w-5 text-kyron-cyan" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">infosystemkyron@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-muted-foreground/50">
                <div className="h-10 w-10 rounded-xl border border-border dark:border-white/5 bg-muted/50 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-kyron-emerald" />
                </div>
                <span className="text-[11px] font-black uppercase tracking-widest">{t('location')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border dark:border-white/[0.04]">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
            {['SENIAT', 'BCV', 'VEN-NIF', 'LOTTT', 'CONATEL', 'SUDEBAN'].map((ent) => (
              <span
                key={ent}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/35 transition-colors cursor-default flex items-center gap-1.5"
              >
                <Shield className="h-2.5 w-2.5 text-muted-foreground/20" /> {ent}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <Hexagon className="h-3.5 w-3.5 text-kyron-cyan/30" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/40">
                  &copy; 2026 {t('copyright')}
                </p>
              </div>
              <div className="flex items-center gap-3 ml-6">
                <p className="text-[10px] md:text-[9px] font-black uppercase tracking-[0.2em] text-kyron-cyan/50">
                  Fundador: Carlos Mattar
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com/systemkyron" target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-xl border border-border dark:border-white/[0.06] bg-muted/50 dark:bg-white/[0.02] flex items-center justify-center text-muted-foreground/20 hover:text-pink-500 hover:border-pink-500/20 hover:bg-pink-500/[0.06] transition-all duration-300">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://twitter.com/systemkyron" target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-xl border border-border dark:border-white/[0.06] bg-muted/50 dark:bg-white/[0.02] flex items-center justify-center text-muted-foreground/20 hover:text-kyron-cyan hover:border-kyron-cyan/20 hover:bg-kyron-cyan/[0.06] transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/company/systemkyron" target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-xl border border-border dark:border-white/[0.06] bg-muted/50 dark:bg-white/[0.02] flex items-center justify-center text-muted-foreground/20 hover:text-blue-400 hover:border-blue-500/20 hover:bg-blue-500/[0.06] transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://github.com/systemkyron" target="_blank" rel="noopener noreferrer" className="h-11 w-11 rounded-xl border border-border dark:border-white/[0.06] bg-muted/50 dark:bg-white/[0.02] flex items-center justify-center text-muted-foreground/20 hover:text-foreground/60 hover:border-gray-300 dark:hover:border-white/[0.12] hover:bg-muted dark:hover:bg-white/[0.04] transition-all duration-300">
                <Github className="h-4 w-4" />
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs md:text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/20">
              <Link href="/manual-usuario" className="py-2 hover:text-kyron-cyan transition-all flex items-center gap-1.5">
                <FileText className="h-3 w-3" /> {t('user_manual')}
              </Link>
              <Link href="/terms" className="py-2 hover:text-kyron-cyan transition-all flex items-center gap-1.5">
                <Gavel className="h-3 w-3" /> {t('terms')}
              </Link>
              <Link href="/politica-privacidad" className="py-2 hover:text-kyron-cyan transition-all flex items-center gap-1.5">
                <Shield className="h-3 w-3" /> {t('privacy')}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border dark:border-white/[0.03]">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 mt-2">
              {['AES-256', 'JWT', 'HTTPS', 'VEN-NIF'].map((tech) => (
                <span
                  key={tech}
                  className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/10 px-2 py-0.5 rounded-full border border-border dark:border-white/[0.04]"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-[9px] md:text-[7px] font-black uppercase tracking-[0.3em] text-muted-foreground/20 mt-8 flex items-center gap-2">
              Lucia Fernanda hermanita de carlitos{' '}
              <Heart className="h-2.5 w-2.5 text-rose-500/80 fill-rose-500/60 animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
