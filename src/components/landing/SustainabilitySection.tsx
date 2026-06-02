import React from 'react';
import Image from 'next/image';
import { Leaf, Recycle, Wind } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from './scroll-reveal';

export function SustainabilitySection() {
  const t = useTranslations('SustainabilitySection');

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-kyron-emerald/[0.06] blur-[160px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-green-600/[0.04] blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-12">
            <ScrollReveal y={20}>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-kyron-emerald/30 bg-kyron-emerald/10 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <Leaf className="h-4 w-4 text-kyron-emerald" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-kyron-emerald/80">
                  {t('badge')}
                </span>
              </div>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal y={30}>
                <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-black text-foreground leading-[0.9] tracking-tighter uppercase italic">
                  {t('title_main')}<br/>
                  <span className="text-glow-emerald not-italic">{t('title_highlight')}</span>
                </h2>
              </ScrollReveal>
              <ScrollReveal y={15} delay={0.1}>
                <p className="text-xl md:text-2xl text-muted-foreground/50 max-w-2xl font-medium leading-relaxed">
                  {t('description')}
                </p>
              </ScrollReveal>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              {[
                { icon: Recycle, title: t('smart_bins_title'), desc: t('smart_bins_desc'), color: 'emerald' },
                { icon: Wind, title: t('eco_credits_title'), desc: t('eco_credits_desc'), color: 'green' },
              ].map((card, i) => (
                <ScrollReveal key={card.title} delay={0.2 + i * 0.1} y={20}>
                  <div className="group/card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] glass-card hover:border-kyron-emerald/20 hover:-translate-y-2 transition-all duration-700">
                    <div className="h-10 md:h-14 w-10 md:w-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-kyron-emerald/20 to-green-500/20 border border-kyron-emerald/20 flex items-center justify-center text-kyron-emerald mb-6 md:mb-8 group-hover/card:scale-110 group-hover/card:rotate-6 transition-all shadow-lg shadow-kyron-emerald/5">
                      <card.icon className="h-7 w-7" />
                    </div>
                    <h4 className="text-xl font-black text-foreground uppercase tracking-tighter mb-4 italic">{card.title}</h4>
                    <p className="text-base text-muted-foreground/50 font-medium leading-relaxed">{card.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal x={30} delay={0.2}>
            <div className="relative group">
              <div className="absolute inset-0 bg-kyron-emerald/20 blur-[120px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
              <div className="relative rounded-[4rem] overflow-hidden border border-border/10 dark:border-white/10 p-3 glass-card">
                <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden group/img">
                  <Image
                    src="/images/salto-angel.jpg"
                    alt="Kyron Sostenibilidad"
                    fill
                    className="object-cover transition-all duration-1000 group-hover/img:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent" />
                  <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(16,185,129,0.06),rgba(0,255,0,0.02),rgba(16,185,129,0.06))] bg-[length:100%_2px,3px_100%]" />
                  
                  <div className="absolute top-8 left-8 p-6 rounded-[2rem] bg-black/50 backdrop-blur-md border border-white/[0.12] shadow-2xl hover:scale-105 transition-all duration-500">
                    <p className="text-[10px] font-black text-kyron-emerald uppercase tracking-[0.4em] mb-2">{t('overlay_label')}</p>
                    <div className="flex items-baseline gap-2">
                      <h3 className="text-4xl font-black text-white tracking-tighter italic">{t('overlay_value')}</h3>
                      <div className="h-2 w-2 rounded-full bg-kyron-emerald" />
                    </div>
                    <p className="text-[9px] text-white/40 font-black uppercase tracking-[0.2em] mt-2">{t('overlay_sublabel')}</p>
                  </div>

                  <div className="absolute bottom-8 right-8 p-5 rounded-[1.5rem] bg-kyron-emerald/20 backdrop-blur-md border border-kyron-emerald/30 shadow-2xl hover:bg-kyron-emerald/30 transition-all duration-500">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-kyron-emerald/20 flex items-center justify-center text-kyron-emerald">
                        <Recycle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-white uppercase tracking-[0.2em] leading-tight">Alianza Kyron-Ameru</p>
                        <p className="text-[9px] font-bold text-kyron-emerald/60 uppercase tracking-wider mt-0.5">Reciclaje Electrónico</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
