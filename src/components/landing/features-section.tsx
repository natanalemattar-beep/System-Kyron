'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  Gauge, Timer, Shield, TrendingUp,
  ChartColumn, ArrowRight, Headphones,
  FileSearch, Brain, Sparkles,
} from 'lucide-react';
import { Link } from '@/navigation';
import { ScrollReveal } from './scroll-reveal';
import { AnimatedNumber } from '@/components/animations/animated-number';
import { useInView } from 'react-intersection-observer';

const agentList = [
  { icon: Headphones, title: 'Atención al Cliente', desc: 'Agente proactivo que detecta situaciones y genera acciones automáticas', color: 'kyron-cyan' },
  { icon: ChartColumn, title: 'Dashboard AI', desc: 'Insights automáticos, detección de anomalías y pronósticos', color: 'blue' },
  { icon: FileSearch, title: 'Análisis Documental', desc: 'Extracción, validación y análisis de cumplimiento normativo', color: 'kyron-emerald' },
  { icon: TrendingUp, title: 'Análisis Financiero', desc: 'FODA, riesgos, análisis de mercado y recomendaciones', color: 'amber' },
  { icon: Shield, title: 'Generador de Documentos', desc: 'Facturas, contratos y documentos profesionales automáticos', color: 'rose' },
];

const agentColorMap: Record<string, string> = {
  'kyron-cyan': 'border-kyron-cyan/20 bg-kyron-cyan/10 text-kyron-cyan group-hover:bg-kyron-cyan/20 group-hover:shadow-kyron-cyan/10',
  blue: 'border-blue-500/20 bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:shadow-blue-500/10',
  'kyron-emerald': 'border-kyron-emerald/20 bg-kyron-emerald/10 text-kyron-emerald group-hover:bg-kyron-emerald/20 group-hover:shadow-kyron-emerald/10',
  amber: 'border-amber-500/20 bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 group-hover:shadow-amber-500/10',
  rose: 'border-rose-500/20 bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 group-hover:shadow-rose-500/10',
};

function AnimatedProgress({ target = 90 }: { target?: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '-50px 0px' });
  return (
    <div ref={ref} className="h-2 w-full bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-gradient-to-r from-blue-500 to-kyron-cyan" style={{ width: inView ? `${target}%` : '0%', transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1) 0.3s' }} />
    </div>
  );
}

export function FeaturesSection() {
  const t = useTranslations('FeaturesSection');
  const metrics = t.raw('metrics') as { value: number; suffix: string; label: string }[];
  const features = t.raw('features') as { title: string; description: string }[];

  return (
    <section className="py-32 md:py-48 relative overflow-hidden bg-transparent mesh-gradient">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-5%] w-[50vw] h-[50vw] rounded-full bg-kyron-cyan/[0.04] blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-500/[0.03] blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <ScrollReveal className="text-center mb-24 md:mb-32 space-y-8">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-kyron-cyan/20 bg-kyron-cyan/5 mx-auto shadow-lg backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-kyron-cyan" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-kyron-cyan/60">{t('badge')}</span>
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black text-foreground leading-[0.9] tracking-tighter uppercase italic">
            {t('title_highlight')}
            <br />
            <span className="text-glow-cyan not-italic">{t('title_rest')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto font-medium leading-relaxed">
            {t('subtitle')}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <ScrollReveal delay={0.1} className="md:col-span-8 glass-card p-8 md:p-12 group hover:border-kyron-cyan/20">
            <div className="relative z-10 space-y-4 md:space-y-6 max-w-xl">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-kyron-cyan/20 to-blue-500/20 border border-kyron-cyan/20 flex items-center justify-center text-kyron-cyan group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-kyron-cyan/5">
                <Gauge className="h-7 w-7" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tighter italic">{features[0].title}</h3>
              <p className="text-base md:text-lg text-muted-foreground/70 leading-relaxed font-medium">{features[0].description}</p>
              <div className="grid grid-cols-2 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-border/50 dark:border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">Sincronización</p>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kyron-emerald opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-kyron-emerald" />
                    </span>
                    <p className="text-3xl font-black text-foreground tracking-tighter italic">En vivo</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-kyron-emerald/40 uppercase tracking-widest">Cumplimiento</p>
                  <p className="text-3xl font-black text-kyron-emerald tracking-tighter italic">Total</p>
                </div>
              </div>
            </div>
            <div className="absolute right-[-10%] bottom-[-10%] w-[60%] opacity-10 group-hover:opacity-30 transition-opacity duration-1000">
              <Image src="/images/landing/features-analytics.webp" alt="Viz" width={1200} height={800} className="w-full h-full object-contain" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} className="md:col-span-4 glass-card p-6 md:p-10 group hover:border-blue-500/20 flex flex-col justify-between">
            <div className="space-y-4 md:space-y-6">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-kyron-cyan/20 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-blue-500/5">
                <Timer className="h-6 w-6" />
              </div>
              <h3 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-tighter italic">{features[1].title}</h3>
              <p className="text-sm md:text-base text-muted-foreground/70 font-medium leading-relaxed">{features[1].description}</p>
            </div>
            <div className="pt-6 md:pt-10">
              <AnimatedProgress target={90} />
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-3">Disponibilidad de Red</p>
            </div>
          </ScrollReveal>

          {features.slice(2, 5).map((feat, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.1} className="md:col-span-4 glass-card p-8 group hover:border-amber-500/10">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-muted/80 to-muted/30 dark:from-white/[0.04] dark:to-white/[0.01] border border-border/50 dark:border-white/10 flex items-center justify-center text-muted-foreground/60 group-hover:text-foreground group-hover:bg-foreground/5 transition-all duration-500 shadow-lg">
                  {i === 0 ? <Shield className="h-6 w-6" /> : i === 1 ? <TrendingUp className="h-6 w-6" /> : <ChartColumn className="h-6 w-6" />}
                </div>
                <h3 className="text-xl font-black text-foreground uppercase tracking-tighter">{feat.title}</h3>
                <p className="text-sm text-muted-foreground/50 font-medium leading-relaxed">{feat.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8">
          <div className="glass-card p-6 md:p-14 group">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-6 md:mb-10">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-kyron-cyan/20 to-violet-500/20 border border-kyron-cyan/30 flex items-center justify-center text-kyron-cyan shadow-lg shadow-kyron-cyan/5">
                <Brain className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-foreground uppercase tracking-tighter italic">
                  Agentes AI <span className="text-glow-cyan not-italic">Inteligentes</span>
                </h3>
                <p className="text-base text-muted-foreground/50 mt-1">6 agentes especializados que trabajan para tu empresa 24/7</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {agentList.map((agent, i) => (
                <Link key={i} href="/soporte" className="glass-card rounded-[2rem] p-6 group/card hover:-translate-y-1.5 block animate-module" style={{ animationDelay: (i * 0.08) + 's' }}>
                  <div className={'h-10 w-10 rounded-xl border flex items-center justify-center mb-4 transition-all duration-500 shadow-lg ' + agentColorMap[agent.color]}>
                    <agent.icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-black text-foreground uppercase tracking-tight mb-1">{agent.title}</h4>
                  <p className="text-xs text-muted-foreground/50 font-medium leading-relaxed">{agent.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 border-y border-border/30 dark:border-white/[0.04] py-10 md:py-16">
          {metrics.map((metric, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3 group animate-slideUp-stagger" style={{ animationDelay: (i * 0.1) + 's' }}>
              <span className="text-4xl md:text-6xl font-black text-foreground tracking-tighter italic group-hover:text-glow-cyan transition-all duration-500">
                <AnimatedNumber target={metric.value} suffix={metric.suffix} />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">{metric.label}</span>
            </div>
          ))}
        </div>

        <ScrollReveal className="flex justify-center mt-32">
          <Link href="/register" className="group relative px-12 py-7 rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 block shadow-2xl glass-card gradient-border">
            <div className="flex items-center gap-6 relative z-10">
              <div className="h-10 w-10 rounded-full bg-kyron-cyan/10 flex items-center justify-center text-kyron-cyan group-hover:rotate-45 transition-transform duration-500">
                <ArrowRight className="h-5 w-5" />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.5em] text-foreground">ACTIVAR ECOSISTEMA</span>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
