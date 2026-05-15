"use client";

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState, useCallback } from 'react';
import { Rocket, ArrowRight, Play, FileText, Zap, Headphones, Signal, Users, ShieldCheck } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Logo } from '@/components/logo';

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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  }, []);

  return (
    <section 
      id="inicio" 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-[100svh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#020617]"
    >
      {/* --- ENHANCED NEURAL AURORA BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#020617]" />
        
        {/* Mouse-reactive gradient */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full bg-cyan-500/10 blur-[180px] transition-all duration-[2000ms] ease-out"
          style={{ 
            left: `${mousePos.x}%`, 
            top: `${mousePos.y}%`, 
            transform: 'translate(-50%, -50%)' 
          }} 
        />
        
        {/* Ambient gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[100vw] h-[100vw] rounded-full bg-cyan-600/[0.08] blur-[160px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-30%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-blue-600/[0.06] blur-[140px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-emerald-500/[0.04] blur-[120px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '-4s' }} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)]" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left space-y-10">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-2xl shadow-[0_0_30px_rgba(6,182,212,0.1)] animate-fade-in-up">
              <div className="relative">
                <Zap className="h-4 w-4 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/30 blur-sm animate-pulse" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-cyan-200/70">
                {t('badge')}
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-5">
              <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.85] tracking-tight uppercase">
                <span className="block text-[0.35em] tracking-[0.5em] mb-3 not-italic font-medium text-white/40">{t('title_line1')}</span>
                <span className="block bg-gradient-to-r from-white via-cyan-100 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                  {t('title_line2')}
                </span>
                <span className="block text-[0.8em] mt-3 text-cyan-300/60 font-light not-italic">{t('title_line3')}</span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/35 max-w-xl font-medium leading-relaxed mx-auto lg:mx-0">
                {t('subtitle')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-4">
              <Button asChild className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_20px_40px_rgba(6,182,212,0.15)] hover:shadow-[0_25px_50px_rgba(6,182,212,0.25)] hover:-translate-y-1 transition-all duration-500 group border-none">
                <Link href="/register" className="flex items-center gap-4">
                  {t('cta_main')} 
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </Button>
              
              <Button variant="outline" className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.3em] rounded-xl border-white/10 bg-white/[0.03] backdrop-blur-2xl text-white/50 hover:bg-white/[0.06] hover:text-white/80 transition-all duration-500 hover:scale-[1.02]">
                <span className="flex items-center gap-3">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {t('cta_secondary')}
                </span>
              </Button>
            </div>
          </div>

          {/* Right Side: Neural Core Visual */}
          <div className="flex-1 relative hidden lg:block">
            <div className="relative aspect-square w-full max-w-[550px] mx-auto">
              {/* Neural Ring 1 */}
              <div className="absolute inset-0 border border-cyan-500/15 rounded-full animate-[spin_60s_linear_infinite]" />
              {/* Neural Ring 2 */}
              <div className="absolute inset-[8%] border border-blue-500/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              {/* Neural Ring 3 */}
              <div className="absolute inset-[16%] border border-emerald-500/15 rounded-full animate-[spin_25s_linear_infinite]" />
              
              {/* Central Core */}
              <div className="absolute inset-[28%] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-500/15 via-blue-600/20 to-emerald-500/15 blur-3xl animate-pulse" />
                <div className="absolute w-28 h-28 bg-white/[0.03] backdrop-blur-3xl rounded-[2rem] border border-white/15 shadow-[0_0_50px_rgba(6,182,212,0.2)] flex items-center justify-center transform rotate-12 animate-float">
                  <Logo className="w-14 h-14 text-white" />
                </div>
              </div>

              {/* Floating Data Link Badges */}
              <div className="absolute top-[8%] -right-5 p-5 rounded-2xl bg-white/[0.03] border border-cyan-500/15 shadow-2xl backdrop-blur-xl animate-float-slow">
                <div className="flex items-center gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                    <Zap className="h-4.5 w-4.5 text-cyan-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">BCV Real-Time</p>
                    <p className="text-[8px] font-bold text-cyan-400/50 uppercase tracking-widest">Latency: 0.2ms</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-[12%] -left-8 p-5 rounded-2xl bg-white/[0.03] border border-blue-500/15 shadow-2xl backdrop-blur-xl animate-float" style={{ animationDelay: '-2s' }}>
                <div className="flex items-center gap-3.5">
                  <div className="h-9 w-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <ShieldCheck className="h-4.5 w-4.5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[9px] font-black text-white/80 uppercase tracking-widest">AES-256 Active</p>
                    <p className="text-[8px] font-bold text-blue-400/50 uppercase tracking-widest">Quantum Shield</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Trust Bar */}
      <div className="w-full py-16 mt-28 relative border-t border-white/[0.03] bg-white/[0.01] backdrop-blur-md">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16">
            {[
              { val: '24/7', label: t('support'), icon: Headphones, color: 'text-cyan-400' },
              { val: '5G', label: t('network'), icon: Signal, color: 'text-blue-400' },
              { val: liveStats.totalUsuarios > 0 ? liveStats.totalUsuarios : '2.4k+', label: t('portals'), icon: Users, color: 'text-emerald-400' },
              { val: '100%', label: t('legal'), icon: ShieldCheck, color: 'text-violet-400' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className={cn("h-12 w-12 rounded-xl bg-white/[0.03] flex items-center justify-center mb-5 border border-white/[0.06] group-hover:scale-105 transition-all duration-500")}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <p className="text-[9px] font-black uppercase tracking-[0.35em] text-white/25 mb-2">{stat.label}</p>
                <p className="text-3xl font-black text-white/80 tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
