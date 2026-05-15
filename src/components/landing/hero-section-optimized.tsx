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
  const rotatingTexts = [
    t('rotating_words.0'),
    'Facturación SENIAT',
    t('rotating_words.2')
  ];

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
    <section id="inicio" ref={containerRef} className="relative min-h-[100svh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#030712]">
      {/* --- NEURAL AURORA BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Space Base */}
        <div className="absolute inset-0 bg-[#030712]" />
        
        {/* Neural Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] rounded-full bg-cyan-600/[0.12] blur-[160px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-30%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-blue-600/[0.08] blur-[140px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/[0.05] blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '-4s' }} />
        
        {/* Scanline & Grid Effect */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_80%)]" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left space-y-12">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-2xl shadow-[0_0_30px_rgba(6,182,212,0.15)] animate-fade-in-up">
              <Zap className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-200/80">
                {t('badge')}
              </span>
            </div>

            {/* Headline Overhaul */}
            <div className="space-y-6">
              <h1 className="text-[clamp(3rem,8vw,5.5rem)] font-black leading-[0.9] tracking-tight text-white uppercase italic">
                <span className="block opacity-60 text-[0.4em] tracking-[0.6em] mb-4 not-italic font-medium">{t('title_line1')}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-400 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                  {t('title_line2')}
                </span>
                <span className="block text-[0.85em] mt-2 text-glow-cyan">{t('title_line3')}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/40 max-w-2xl font-medium leading-relaxed font-outfit mx-auto lg:mx-0">
                {t('subtitle')}
              </p>
            </div>

            {/* Premium Actions */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-6">
              <Button asChild className="h-20 px-14 text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl bg-white text-black hover:bg-cyan-50 shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[0_25px_50px_rgba(6,182,212,0.2)] hover:-translate-y-2 transition-all duration-500 group border-none">
                <Link href="/register" className="flex items-center gap-4">
                  {t('cta_main')} 
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" className="h-20 px-10 text-[12px] font-black uppercase tracking-[0.4em] rounded-2xl border-white/10 bg-white/5 backdrop-blur-2xl text-white/60 hover:bg-white/10 hover:text-white transition-all duration-500 hover:scale-[1.05]">
                <span className="flex items-center gap-4">
                  <Play className="h-4 w-4 fill-current" />
                  {t('cta_secondary')}
                </span>
              </Button>
            </div>
          </div>

          {/* Right Side: Neural Core Visual */}
          <div className="flex-1 relative hidden lg:block">
            <div className="relative aspect-square w-full max-w-[600px] mx-auto">
              {/* Neural Ring 1 */}
              <div className="absolute inset-0 border-2 border-dashed border-cyan-500/20 rounded-full animate-[spin_60s_linear_infinite]" />
              {/* Neural Ring 2 */}
              <div className="absolute inset-[10%] border border-blue-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              {/* Neural Ring 3 */}
              <div className="absolute inset-[20%] border-2 border-dotted border-emerald-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
              
              {/* Central Core */}
              <div className="absolute inset-[30%] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-emerald-500/20 blur-3xl animate-pulse" />
                <div className="absolute w-32 h-32 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/20 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex items-center justify-center transform rotate-12 animate-float">
                  <Logo className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Floating Data Link Badges */}
              <div className="absolute top-[10%] -right-5 p-6 rounded-3xl glass-system-kyron border-cyan-500/20 shadow-2xl animate-float-slow">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">BCV Real-Time</p>
                    <p className="text-[8px] font-bold text-cyan-400/60 uppercase tracking-widest">Latency: 0.2ms</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[15%] -left-10 p-6 rounded-3xl glass-system-kyron border-blue-500/20 shadow-2xl animate-float" style={{ animationDelay: '-2s' }}>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">AES-256 Active</p>
                    <p className="text-[8px] font-bold text-blue-400/60 uppercase tracking-widest">Quantum Shield</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Trust Bar */}
      <div className="w-full py-20 mt-32 relative border-t border-white/5 bg-white/[0.02] backdrop-blur-md">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
            {[
              { val: '24/7', label: t('support'), icon: Headphones, color: 'text-cyan-400' },
              { val: '5G', label: t('network'), icon: Signal, color: 'text-blue-400' },
              { val: liveStats.totalUsuarios > 0 ? liveStats.totalUsuarios : '2.4k+', label: t('portals'), icon: Users, color: 'text-emerald-400' },
              { val: '100%', label: t('legal'), icon: ShieldCheck, color: 'text-violet-400' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className={cn("h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-all duration-500", stat.color.replace('text-', 'shadow-'))}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-3">{stat.label}</p>
                <p className="text-4xl font-black text-white tracking-tighter italic">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


// Re-export icons needed for Stats
import { Headphones, Signal, Users, ShieldCheck } from 'lucide-react';

