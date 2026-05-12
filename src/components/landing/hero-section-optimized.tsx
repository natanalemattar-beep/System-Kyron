"use client";

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { VideoHeroBg } from './video-hero-bg';
import Image from 'next/image';

// Helper componentes simples
function RotatingWords({ words, interval = 3000 }: { words: string[], interval?: number }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);
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
  const rotatingTexts = t.raw('rotating_words') as string[] || ['Corporativo', 'Empresarial', 'Soberano', 'Elite'];

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
        <VideoHeroBg />
        {/* overlay content */}
        <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              <Link 
                href="/pitch"
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md hover:bg-amber-500/20 transition-all hover:scale-105 group"
              >
                <Sparkles className="h-4 w-4 text-amber-400 group-hover:animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200/80 group-hover:text-amber-100 transition-colors">{t('badge')}</span>
              </Link>
              <h1 className="text-[clamp(2.2rem,7vw,5rem)] font-black leading-tight text-white">
                <span className="block mb-2">{t('title_line1')}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">{t('title_line2')}</span>
                <div className="text-slate-100/30 italic mt-2"><RotatingWords words={rotatingTexts} interval={3500} /></div>
              </h1>
              <p className="text-lg text-slate-100/65 max-w-2xl mx-auto lg:ml-0 font-medium">{t('subtitle')}</p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
                <Button asChild size="lg" className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-500 to-emerald-600 text-white hover:shadow-lg transition-all">
                  <Link href="/login" className="flex items-center gap-2">{t('cta_main')} <ArrowRight className="h-5 w-5" /></Link>
                </Button>
                <Button variant="ghost" size="lg" className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl border-white/5 bg-white/[0.02] text-white/40 hover:bg-white/[0.05] hover:text-white">
                  <span className="flex items-center gap-3"><Play className="h-3 w-3" />{t('cta_secondary')}</span>
                </Button>
              </div>
            </div>
            {/* Image/preview column */}
            <div className="hidden lg:block lg:col-span-5">
              <Image src="/images/landing/hero-dashboard-light.jpg" alt="Demo de dashboard" width={1000} height={600} className="w-full h-auto rounded-2xl shadow-lg" />
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
