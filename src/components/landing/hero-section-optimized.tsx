"use client";

import { useTranslations } from 'next-intl';
import { ArrowRight, Play, Headphones, Users, Building2, TrendingUp, ShieldCheck, Activity } from 'lucide-react';
import { Link } from '@/navigation';
import { Button } from '@/components/ui/button';
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
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-20 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-background mesh-gradient">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-kyron-cyan/[0.04] blur-[120px]" />
        <div className="absolute bottom-[0%] right-[0%] w-[45vw] h-[45vw] rounded-full bg-kyron-violet/[0.03] blur-[140px]" />
        <div className="absolute top-[40%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-kyron-emerald/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-kyron-cyan/20 bg-kyron-cyan/5 shadow-[0_0_30px_rgba(6,182,212,0.1)] animate-fade-in-up backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kyron-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-kyron-cyan" />
              </span>
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
              <Button asChild className="h-16 px-12 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl bg-gradient-to-br from-kyron-cyan to-blue-600 text-primary-foreground hover:from-kyron-cyan/90 hover:to-blue-500 shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:-translate-y-1 transition-all duration-500 group border-none animate-pulse-glow">
                <Link href="/register" className="flex items-center gap-4">
                  {t('cta_main')}
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </Button>

              <Button variant="outline" className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl border-border dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] text-muted-foreground/70 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] hover:text-foreground transition-all duration-500 hover:scale-[1.02] hover:border-border">
                <span className="flex items-center gap-3">
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {t('cta_secondary')}
                </span>
              </Button>

              <Button asChild variant="ghost" className="h-16 px-8 text-[11px] font-black uppercase tracking-[0.3em] rounded-2xl border border-kyron-emerald/20 bg-kyron-emerald/5 text-kyron-emerald/80 hover:bg-kyron-emerald/10 hover:text-kyron-emerald hover:border-kyron-emerald/40 transition-all duration-500 hover:scale-[1.02] group">
                <Link href="/soporte" className="flex items-center gap-3">
                  <Headphones className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Atención al Cliente
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative hidden lg:block w-full animate-fade-in-up-delay-3">
            <div className="mockup-browser group perspective-[1000px]">
              <div className="mockup-browser-bar">
                <div className="mockup-browser-dot bg-rose-500/70" />
                <div className="mockup-browser-dot bg-amber-400/70" />
                <div className="mockup-browser-dot bg-kyron-emerald/70" />
                <div className="mockup-browser-url">
                  <span className="text-[9px] font-medium text-muted-foreground/50 tracking-wide">app.system-kyron.vercel.app/dashboard</span>
                </div>
                <div className="h-5 w-5 rounded-md bg-muted/50 dark:bg-white/[0.03] border border-border/30 dark:border-white/[0.04]" />
              </div>
              <div className="p-4 bg-[#f8fafc] dark:bg-[#0a0e1a]">
                <div className="rounded-xl bg-white dark:bg-[#0f1322] border border-gray-200/80 dark:border-white/[0.04] shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/[0.04]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">Centro de Mando</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-bold px-2 py-1 rounded-md bg-kyron-emerald/10 text-kyron-emerald uppercase tracking-wider">En vivo</span>
                      <Activity className="h-3 w-3 text-kyron-emerald/60" />
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[{ label: 'Ingresos', value: 'Bs. 24.500', trend: '+12%', up: true },
                        { label: 'Gastos', value: 'Bs. 8.200', trend: '-3%', up: false },
                        { label: 'Margen', value: '66.5%', trend: '+8%', up: true }].map((item) => (
                        <div key={item.label} className="rounded-lg bg-gray-50 dark:bg-white/[0.02] p-2.5 border border-gray-100 dark:border-white/[0.03]">
                          <p className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground/40">{item.label}</p>
                          <p className="text-xs font-black text-foreground/80 mt-0.5">{item.value}</p>
                          <p className={`text-[8px] font-bold ${item.up ? 'text-kyron-emerald' : 'text-rose-500'}`}>{item.trend}</p>
                        </div>
                      ))}
                    </div>
                    <div className="h-12 rounded-lg bg-gradient-to-r from-kyron-cyan/5 via-blue-500/5 to-kyron-violet/5 border border-gray-100 dark:border-white/[0.03] flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-kyron-cyan/40 mr-2" />
                      <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground/30">Proyección trimestral: +23.4%</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-kyron-cyan/10 via-blue-500/10 to-kyron-violet/10 rounded-[calc(2rem+4px)] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
            </div>

            <div className="absolute -bottom-4 -right-4 h-20 w-48 rounded-2xl glass-card p-3 shadow-2xl animate-float" style={{ animationDuration: '7s' }}>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-kyron-emerald/10 border border-kyron-emerald/20 flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-kyron-emerald" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-foreground/80 uppercase tracking-tight">Protegido</p>
                  <p className="text-[7px] font-bold text-muted-foreground/40 uppercase tracking-wider">AES-256 + JWT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12 mt-24 relative border-t border-border/30 dark:border-white/[0.03] bg-background/40 dark:bg-white/[0.01] backdrop-blur-sm animate-fade-in-up-delay-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { val: statsVal ? String(statsVal.totalEmpresas) : '—', label: 'Empresas', color: 'text-kyron-emerald', icon: 'building2', sub: 'Registradas' },
              { val: statsVal ? String(statsVal.totalUsuarios) : '—', label: 'Usuarios', color: 'text-kyron-gold', icon: 'users', sub: 'Registrados' },
              { val: '99.9%', label: 'Uptime', color: 'text-kyron-cyan', icon: 'activity', sub: 'Disponibilidad' },
              { val: '24/7', label: 'Soporte', color: 'text-kyron-violet', icon: 'headphones', sub: 'Tiempo real' },
            ].map((stat, i) => (
              <div key={stat.label} className="stat-card text-center group" style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ' + (0.7 + i * 0.1) + 's forwards', opacity: 0 }}>
                <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-500">
                  {stat.icon === 'building2' ? <Building2 className={`${stat.color} h-4 w-4`} /> :
                   stat.icon === 'users' ? <Users className={`${stat.color} h-4 w-4`} /> :
                   stat.icon === 'activity' ? <Activity className={`${stat.color} h-4 w-4`} /> :
                   <Headphones className={`${stat.color} h-4 w-4`} />}
                </div>
                <p className="text-2xl md:text-3xl font-black text-foreground/80 tracking-tighter">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/60 mt-1">{stat.label}</p>
                <p className="text-[8px] font-medium text-muted-foreground/30 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
