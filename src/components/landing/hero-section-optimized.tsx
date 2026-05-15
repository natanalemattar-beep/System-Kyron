"use client";

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import { Rocket, ArrowRight, Play, FileText, Zap } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Logo } from '@/components/logo';

// Helper componentes simples
function RotatingWords({ words, interval = 3000 }: { words: string[], interval?: number }) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  if (!mounted) return <div className="relative h-[1.3em]" />;

  return (
    <div className="relative h-[1.3em] overflow-hidden">
      <div className="absolute inset-0 block text-glow-gold transition-opacity duration-500" style={{ opacity: 1 }}>{words[index]}</div>
    </div>
  );
}

export function HeroSectionOptimized() {
  const t = useTranslations('HeroSection');
  const containerRef = useRef<HTMLElement>(null);
  const [liveStats, setLiveStats] = useState({ totalUsuarios: 0 });
  const rotatingTexts = t.raw('rotating_words') as string[] || ['Corporativo', 'Empresarial', 'Autónomo', 'System Kyron'];

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(json => {
        const data = json.data ?? json;
        if (data.totalUsuarios !== undefined) setLiveStats({ totalUsuarios: data.totalUsuarios });
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <section id="inicio" ref={containerRef} className="relative min-h-[90svh] flex flex-col items-center justify-center pt-24 pb-8 md:pt-20 md:pb-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black z-0 pointer-events-none" />
        {/* overlay content */}
        <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 mb-8">
                <div className="w-24 h-24 lg:w-32 lg:h-32 shrink-0 p-4 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl shadow-2xl">
                  <Logo className="w-full h-full" />
                </div>
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/login"
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md hover:bg-emerald-500/20 transition-all hover:scale-105 group"
                  >
                    <Zap className="h-4 w-4 text-emerald-400 group-hover:animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200/80 group-hover:text-emerald-100 transition-colors">SaaS INTEGRADO V2.8</span>
                  </Link>
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 pl-1">Protocolo de Confianza</p>
                </div>
              </div>
              <h1 className="text-[clamp(2.2rem,7vw,5rem)] font-black leading-tight text-white">
                <span className="block mb-2">{t('title_line1')}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">{t('title_line2')}</span>
                <div className="text-slate-100/30 font-outfit mt-2 uppercase tracking-[0.2em]"><RotatingWords words={rotatingTexts} interval={3500} /></div>
              </h1>
              <p className="text-lg text-slate-100/65 max-w-2xl mx-auto lg:ml-0 font-medium">{t('subtitle')}</p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <Button asChild size="lg" className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-500 to-emerald-600 text-white hover:shadow-lg transition-all">
                  <Link href="/precios" className="flex items-center gap-2">{t('cta_main')} <ArrowRight className="h-5 w-5" /></Link>
                </Button>
                <Button variant="ghost" size="lg" className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl border-white/5 bg-white/[0.02] text-white/40 hover:bg-white/[0.05] hover:text-white">
                  <span className="flex items-center gap-3"><Play className="h-3 w-3" />{t('cta_secondary')}</span>
                </Button>
              </div>
            </div>
            {/* Image/preview column */}
            <div className="hidden lg:block lg:col-span-5 relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl glass-system-kyron-interactive p-2 aspect-[4/3] lg:aspect-auto">
                <Image 
                  src="/images/landing/hero-dashboard-dark.jpg" 
                  alt="System Kyron Interface" 
                  fill
                  priority
                  className="object-cover rounded-[2rem] transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating HUD Card */}
                <div className="absolute bottom-10 -left-10 p-6 rounded-3xl glass-liquid-hud border border-white/20 shadow-2xl animate-float max-w-[240px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <Zap className="h-4 w-4 text-cyan-400" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white">Panel Inteligente</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-cyan-500 rounded-full" />
                    </div>
                    <div className="h-1.5 w-[60%] bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-blue-500 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Second Floating Badge */}
                <div className="absolute top-10 -right-6 p-4 rounded-2xl glass-system-kyron border border-white/10 shadow-xl animate-float-slow">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Red Ultra-Rápida</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Stats bar below hero */}
        <div className="w-full bg-[#050816] py-4 mt-8">
          <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ val: '24/7', label: t('support') },{ val: '5G', label: t('network') },{ val: '12', label: t('portals') },{ val: '100%', label: t('legal') }].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-xs font-bold uppercase text-white/60">{stat.label}</p>
                <p className="text-xl font-black text-white">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
