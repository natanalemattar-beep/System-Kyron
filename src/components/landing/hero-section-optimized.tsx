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
      className="relative min-h-[100svh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-background"
    >
      {/* --- MINIMALIST NEURAL BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        
        {/* Subtle reactive light */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] transition-all duration-1000 ease-out"
          style={{ 
            left: `${mousePos.x}%`, 
            top: `${mousePos.y}%`, 
            transform: 'translate(-50%, -50%)' 
          }} 
        />
        
        {/* Minimalist ambient glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-blue-600/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/5 blur-[150px]" />
        
        {/* Very subtle grid */}
        <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#02040a_90%)]" />
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
               <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.85] tracking-tighter uppercase">
                 <span className="block text-[0.3em] tracking-[0.6em] mb-4 not-italic font-medium text-white/30 uppercase">SISTEMA DE MANDO ÚNICO</span>
                 <span className="block bg-gradient-to-br from-white via-cyan-100 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                   {t('title_line2')}
                 </span>
                 <span className="block text-[0.75em] mt-4 text-cyan-400/60 font-light not-italic tracking-wide italic">
                   {t('title_line3')}
                 </span>
               </h1>
               
               <p className="text-lg md:text-xl text-white/40 max-w-xl font-medium leading-relaxed mx-auto lg:mx-0 border-l-2 border-cyan-500/30 pl-6">
                 {t('subtitle')}
               </p>
             </div>


            {/* Actions */}
             <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8">
               <Button asChild className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:-translate-y-1 transition-all duration-500 group border-none">
                 <Link href="/register" className="flex items-center gap-4">
                   {t('cta_main')} 
                   <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                 </Link>
               </Button>
               
               <Button variant="outline" className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl border-white/10 bg-white/[0.03] backdrop-blur-3xl text-white/50 hover:bg-white/[0.08] hover:text-white transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
                 <span className="flex items-center gap-3">
                   <Play className="h-3.5 w-3.5 fill-current" />
                   {t('cta_secondary')}
                 </span>
               </Button>
             </div>

          </div>

           {/* Right Side: Minimal Neural Core */}
           <div className="flex-1 relative hidden lg:block">
             <div className="relative aspect-square w-full max-w-[500px] mx-auto flex items-center justify-center">
               {/* Single, elegant rotating ring */}
               <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_100s_linear_infinite]" />
               <div className="absolute inset-12 border border-white/10 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
               
               {/* Central Core */}
               <div className="relative z-10 w-40 h-40 rounded-full bg-white/[0.02] backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)] flex items-center justify-center animate-float">
                 <Logo className="w-16 h-16 text-white opacity-90" />
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
