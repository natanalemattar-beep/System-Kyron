"use client";

import { useTranslations } from 'next-intl';
import { ArrowRight, Play, Headphones, Users, Building2 } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export function HeroSectionOptimized() {
  const t = useTranslations('HeroSection');
  const { data: statsData } = useSWR('/api/stats', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000,
  });

  const liveStats = statsData?.data ?? statsData;
  const statsVal = liveStats?.totalUsuarios !== undefined || liveStats?.totalEmpresas !== undefined
    ? { totalUsuarios: liveStats?.totalUsuarios ?? 0, totalEmpresas: liveStats?.totalEmpresas ?? 0 }
    : null;

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-accent/5 blur-[150px]" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-10">
            <div
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-kyron-cyan/20 bg-kyron-cyan/5 shadow-[0_0_30px_rgba(6,182,212,0.1)] animate-fade-in-up"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.35em] text-kyron-cyan/70">
                {t('badge')}
              </span>
            </div>

            <div className="space-y-5 animate-fade-in-up-delay-1">

                <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.85] tracking-tighter uppercase">
                  <span className="block text-[0.3em] tracking-[0.6em] mb-4 not-italic font-medium text-muted-foreground/60 uppercase">
                    {t('badge')}
                  </span>
                  <span className="block bg-gradient-to-br from-foreground via-kyron-cyan to-blue-700 dark:from-white dark:via-kyron-cyan dark:to-blue-400 bg-clip-text text-transparent dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                    {t('title_line2')}
                  </span>
                  <span className="block text-[0.75em] mt-4 text-kyron-cyan/60 font-light not-italic tracking-wide italic">
                    {t('title_line3')}
                  </span>
                </h1>

              <p className="text-lg md:text-xl text-muted-foreground/80 max-w-xl font-medium leading-relaxed mx-auto lg:mx-0 border-l-2 border-kyron-cyan/30 pl-6">
                {t('subtitle')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-8 animate-fade-in-up-delay-2">
              <Button
                asChild
                className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl bg-gradient-to-br from-kyron-cyan to-blue-600 text-primary-foreground hover:from-kyron-cyan/90 hover:to-blue-500 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:-translate-y-1 transition-all duration-500 group border-none animate-pulse-glow"
              >
                <Link href="/register" className="flex items-center gap-4">
                  {t('cta_main')}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl border-border dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-muted-foreground/70 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:text-foreground transition-all duration-500 hover:scale-[1.02] hover:border-border"
              >
                <span className="flex items-center gap-3">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {t('cta_secondary')}
                </span>
              </Button>

              <Button
                asChild
                variant="ghost"
                className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl border border-kyron-emerald/20 bg-kyron-emerald/5 text-kyron-emerald/80 hover:bg-kyron-emerald/10 hover:text-kyron-emerald hover:border-kyron-emerald/40 transition-all duration-500 hover:scale-[1.02] group"
              >
                <Link href="/soporte" className="flex items-center gap-3">
                  <Headphones className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Atención al Cliente
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block animate-fade-in-up-delay-3">
            <div className="relative aspect-square w-full max-w-[500px] mx-auto flex items-center justify-center">
              <div className="absolute inset-0 border border-border/80 dark:border-white/5 rounded-full animate-[spin_100s_linear_infinite]" />
              <div className="absolute inset-12 border border-border/80 dark:border-white/10 rounded-full animate-[spin_60s_linear_infinite_reverse]" />
              <div className="relative z-10 w-40 h-40 rounded-full bg-black/[0.02] dark:bg-white/[0.02] border border-border/80 dark:border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.1)] flex items-center justify-center animate-float">
                <Logo className="w-16 h-16 text-foreground opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-16 mt-28 relative border-t border-border/40 dark:border-white/[0.03] bg-black/[0.01] dark:bg-white/[0.01] animate-fade-in-up-delay-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-16">
            {[
              { val: statsVal ? String(statsVal.totalEmpresas) : '—', label: 'Empresas', color: 'text-kyron-emerald', icon: 'building2' },
              { val: statsVal ? String(statsVal.totalUsuarios) : '—', label: t('portals'), color: 'text-kyron-gold', icon: 'users' },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center group"
                style={{
                  animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ' + (0.7 + i * 0.1) + 's forwards',
                  opacity: 0,
                }}
              >
                <div className="h-12 w-12 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] flex items-center justify-center mb-5 border border-border/50 dark:border-white/[0.06] transition-all duration-500">
                  {stat.icon === 'building2' ? (
                    <Building2 className={stat.color + ' h-5 w-5'} />
                  ) : (
                    <Users className={stat.color + ' h-5 w-5'} />
                  )}
                </div>
                <p className="text-[10px] md:text-[9px] font-black uppercase tracking-[0.25em] md:tracking-[0.35em] text-muted-foreground/60 mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl font-black text-foreground/80 tracking-tighter">
                  {stat.val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
