'use client';

import dynamic from 'next/dynamic';
import { Sparkles, ArrowRight, CircleCheck, Shield, Zap, Clock } from "lucide-react";
import { useTranslations } from 'next-intl';
import { ScrollReveal } from './scroll-reveal';

const CtaForm = dynamic(() => import('./cta-form').then(mod => ({ default: mod.CtaForm })), {
    ssr: false,
    loading: () => (
        <div className="space-y-4 p-6 md:p-10 rounded-2xl shadow-xl animate-pulse min-h-[500px] bg-background/80 dark:bg-white/[0.02] border border-border dark:border-white/[0.06]" />
    ),
});

export function CtaSection() {
  const t = useTranslations('CtaSection');
  const checks = [t('check_1'), t('check_2'), t('check_3')];

  return (
    <section className="relative overflow-hidden scroll-mt-20 bg-background">
      <div className="relative py-32 md:py-48">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-kyron-cyan/[0.05] blur-[160px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-kyron-emerald/[0.04] blur-[140px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <ScrollReveal delay={0.1} y={20}>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-kyron-cyan/20 bg-kyron-cyan/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60 mx-auto lg:ml-0">
                  <Sparkles className="h-3.5 w-3.5 text-kyron-cyan" /> {t('badge')}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} y={30} blur={15}>
                <h2 className="text-[clamp(3rem,6vw,5.5rem)] font-black tracking-tighter leading-[0.9] text-foreground uppercase italic">
                  {t('title_highlight')}<br/>
                  <span className="text-glow-cyan not-italic">{t('title_rest')}</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.3} y={15}>
                <p className="text-lg md:text-xl text-muted-foreground/50 max-w-md mx-auto lg:ml-0 leading-relaxed font-medium">
                  {t('subtitle')}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4} className="flex flex-wrap justify-center lg:justify-start gap-5">
                {checks.map((label, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-kyron-emerald/10 border border-kyron-emerald/20 backdrop-blur-sm">
                    <CircleCheck className="h-4 w-4 text-kyron-emerald" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/80">{label}</span>
                  </div>
                ))}
              </ScrollReveal>
            </div>

            <ScrollReveal className="w-full lg:sticky lg:top-32" delay={0.4} x={30} blur={12}>
              <CtaForm />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
