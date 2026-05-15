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
  const rotatingTexts = t.raw('rotating_words') as string[] || ['Automatización', 'Seguridad', 'Riesgo Cero'];

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
    <section id="inicio" ref={containerRef} className="relative min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden transition-colors duration-700 bg-background">
      {/* --- ELITE DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Base Layer */}
        <div className="absolute inset-0 bg-[#f8faff] dark:bg-[#02040a] transition-colors duration-1000" />
        
        {/* Cinematic Mesh Blobs */}
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-blue-600/[0.1] dark:bg-blue-600/[0.08] blur-[150px] animate-mesh-drift" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-emerald-500/[0.1] dark:bg-emerald-500/[0.07] blur-[150px] animate-mesh-drift" style={{ animationDelay: '-8s' }} />
        <div className="absolute top-[40%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-400/[0.08] dark:bg-cyan-400/[0.05] blur-[120px] animate-mesh-drift" style={{ animationDelay: '-12s' }} />
        
        {/* Subtle HUD Patterns */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] hud-grid mix-blend-overlay" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-center text-center space-y-10">
          
          {/* Gold Status Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-amber-600/5 backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.1)] group hover:border-amber-500/40 transition-all duration-500">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,1)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 dark:text-amber-400/90 group-hover:text-amber-500 transition-colors">
              {t('badge')}
            </span>
          </div>

          {/* Main Title Overhaul */}
          <div className="space-y-4 max-w-5xl">
            <h1 className="text-[clamp(2.5rem,9vw,6.5rem)] font-black leading-[0.85] tracking-[-0.05em] text-[#0a1020] dark:text-white">
              <span className="block opacity-90 drop-shadow-sm italic">{t('title_line1')}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 dark:from-blue-400 dark:via-cyan-300 dark:to-emerald-400 drop-shadow-xl py-2">
                {t('title_line2')}
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 py-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/20" />
                <div className="text-xl md:text-2xl font-black uppercase tracking-[0.2em] text-primary italic drop-shadow-glow">
                    <RotatingWords words={rotatingTexts} interval={3000} />
                </div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/20" />
            </div>
          </div>

          {/* Premium Subtext */}
          <p className="text-lg md:text-xl text-slate-500 dark:text-white/40 max-w-3xl font-medium leading-relaxed font-inter transition-colors">
            {t('subtitle')}
          </p>

          {/* High-Impact Actions */}
          <div className="flex flex-col sm:flex-row gap-6 pt-8 w-full sm:w-auto">
            <Button asChild className="h-20 px-14 text-[12px] font-black uppercase tracking-[0.3em] rounded-3xl bg-primary text-white shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_25px_50px_-12px_rgba(37,99,235,0.6)] hover:-translate-y-1.5 transition-all duration-500 group overflow-hidden border-none relative">
              <Link href="/precios" className="flex items-center gap-3 relative z-10">
                {t('cta_main')} 
                <div className="p-1 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors">
                    <ArrowRight className="h-5 w-5" />
                </div>
              </Link>
            </Button>
            
            <Button variant="outline" className="h-20 px-10 text-[12px] font-black uppercase tracking-[0.3em] rounded-3xl border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-xl text-slate-600 dark:text-white/50 hover:bg-white dark:hover:bg-white/10 hover:text-primary dark:hover:text-white transition-all duration-500 hover:scale-[1.02]">
              <span className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                    <Play className="h-3 w-3 fill-current" />
                </div>
                {t('cta_secondary')}
              </span>
            </Button>
          </div>

          {/* Visual Hook - Floating Mockup */}
          <div className="hidden lg:block w-full max-w-6xl pt-20 perspective-1000">
            <div className="relative rounded-[3rem] p-3 bg-gradient-to-b from-white/20 to-transparent dark:from-white/5 dark:to-transparent border border-white/20 shadow-2xl backdrop-blur-2xl animate-float-slow transform rotateX-10">
                <div className="relative aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden bg-black shadow-inner">
                    <Image 
                      src="/images/landing/hero-dashboard-dark.jpg" 
                      alt="Kyron Neural Interface" 
                      fill 
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    
                    {/* Inner HUD Overlay */}
                    <div className="absolute top-8 left-8 flex gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                        <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.5em]">System.Core Active</span>
                    </div>
                </div>
                
                {/* Out-of-bounds Floating Badges */}
                <div className="absolute -top-10 -right-10 p-6 rounded-3xl glass-system-kyron border-amber-500/20 shadow-2xl animate-float">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-2xl bg-amber-500/20 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-amber-500" />
                        </div>
                        <div className="text-left">
                            <p className="text-[10px] font-black text-white uppercase tracking-widest">IA Generativa</p>
                            <p className="text-[8px] font-bold text-amber-500/80 uppercase tracking-widest">Optimización 98%</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar Overhaul */}
      <div className="w-full py-16 mt-20 relative border-y border-black/[0.05] dark:border-white/[0.05] bg-white/20 dark:bg-black/20 backdrop-blur-sm">
        <div className="container mx-auto px-6 max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { val: '24/7', label: t('support'), icon: Headphones },
            { val: '5G', label: t('network'), icon: Signal },
            { val: liveStats.totalUsuarios > 0 ? liveStats.totalUsuarios : '500+', label: t('portals'), icon: Users },
            { val: '100%', label: t('legal'), icon: ShieldCheck }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <stat.icon className="h-5 w-5 text-slate-400 dark:text-white/20 group-hover:text-primary transition-colors" />
              </div>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/30 mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-[#0a1020] dark:text-white tracking-tighter">{stat.val}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// Re-export icons needed for Stats
import { Headphones, Signal, Users, ShieldCheck } from 'lucide-react';

