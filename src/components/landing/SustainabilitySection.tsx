import React from 'react';
import Image from 'next/image';
import { Leaf, Recycle, Wind, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function SustainabilitySection() {
  const t = useTranslations('SustainabilitySection');

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-kyron-emerald/[0.08] blur-[160px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-green-600/[0.04] blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-kyron-emerald/30 bg-kyron-emerald/10 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.15)] animate-fade-in-up">
              <Leaf className="h-4 w-4 text-kyron-emerald animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-kyron-emerald/80">
                {t('badge')}
              </span>
            </div>

            <div className="space-y-8">
              <h2 className="text-[clamp(3rem,8vw,5.5rem)] font-black text-foreground leading-[0.9] tracking-tighter uppercase italic">
                {t('title_main')}<br/>
                <span className="text-glow-emerald not-italic">{t('title_highlight')}</span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground/50 max-w-2xl font-medium leading-relaxed">
                {t('description')}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              {[
                { icon: Recycle, title: t('smart_bins_title'), desc: t('smart_bins_desc') },
                { icon: Wind, title: t('eco_credits_title'), desc: t('eco_credits_desc') },
              ].map((card, i) => (
                <div
                  key={i}
                  className="group/card p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] bg-background/50 dark:bg-white/[0.02] border border-border/5 dark:border-white/5 hover:border-kyron-emerald/30 transition-all duration-700 hover:-translate-y-2"
                >
                  <div className="h-10 md:h-14 w-10 md:w-14 rounded-xl md:rounded-2xl bg-kyron-emerald/10 border border-kyron-emerald/20 flex items-center justify-center text-kyron-emerald mb-6 md:mb-8 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all">
                    <card.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-black text-foreground uppercase tracking-tighter mb-4 italic">{card.title}</h4>
                  <p className="text-base text-muted-foreground/50 font-medium leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-kyron-emerald/20 blur-[120px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="relative rounded-[4rem] overflow-hidden border border-border/10 dark:border-white/10 p-4 bg-background/50 dark:bg-white/[0.01] backdrop-blur-md shadow-2xl">
              <div className="relative aspect-square w-full rounded-[3rem] overflow-hidden group/img">
                <Image
                  src="/images/salto-angel.jpg"
                  alt="Kyron Sostenibilidad"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover/img:scale-105"
                />
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(16,185,129,0.06),rgba(0,255,0,0.02),rgba(16,185,129,0.06))] bg-[length:100%_2px,3px_100%]" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-60" />
              </div>

              <div className="absolute top-12 left-12 p-8 rounded-[2.5rem] bg-background/60 dark:bg-black/60 backdrop-blur-sm border border-border/20 dark:border-white/20 shadow-2xl animate-float transition-all hover:scale-105">
                <p className="text-[10px] font-black text-kyron-emerald uppercase tracking-[0.4em] mb-2">{t('overlay_label')}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-black text-foreground tracking-tighter italic">{t('overlay_value')}</h3>
                  <div className="h-2 w-2 rounded-full bg-kyron-emerald animate-ping" />
                </div>
                <p className="text-[9px] text-muted-foreground/60 font-black uppercase tracking-[0.2em] mt-3">{t('overlay_sublabel')}</p>
              </div>

              <div className="absolute bottom-12 right-12 p-6 rounded-[1.5rem] bg-kyron-emerald/10 backdrop-blur-sm border border-kyron-emerald/20 shadow-2xl transition-all hover:bg-kyron-emerald/20">
                <div className="flex items-center gap-5">
                  <div className="h-12 w-12 rounded-xl bg-kyron-emerald/20 flex items-center justify-center text-kyron-emerald">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <p className="text-[11px] font-black text-foreground uppercase tracking-[0.3em] leading-tight">
                    {t('certification_label')}<br/>
                    <span className="text-kyron-emerald/60">Verified Active</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
