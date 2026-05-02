'use client';

import { ArrowRight, ShieldCheck, TrendingUp, DollarSign, Users, Calculator, Smartphone, Recycle, Gavel, ChartColumn } from "lucide-react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';

const kpiIcons = [TrendingUp, DollarSign, Users];
const kpiColors = ["text-emerald-400", "text-cyan-400", "text-violet-400"];
const kpiValues = ["Bs. 0", "0", "0"];

const moduleIcons = [Calculator, Users, Smartphone, Gavel, Recycle, ChartColumn];
const moduleColors = ["text-cyan-400", "text-violet-400", "text-blue-400", "text-amber-400", "text-emerald-400", "text-rose-400"];
const moduleBgs = [
    "from-cyan-500/20 to-cyan-500/5", "from-violet-500/20 to-violet-500/5", "from-blue-500/20 to-blue-500/5",
    "from-amber-500/20 to-amber-500/5", "from-emerald-500/20 to-emerald-500/5", "from-rose-500/20 to-rose-500/5"
];
const moduleBorders = [
    "border-cyan-500/25", "border-violet-500/25", "border-blue-500/25",
    "border-amber-500/25", "border-emerald-500/25", "border-rose-500/25"
];
const moduleHrefs = ["/login-empresa", "/login-rrhh", "/login-linea", "/login-escritorio-juridico", "/login-sostenibilidad", "/login-empresa"];

export function PanelControlHero() {
  const t = useTranslations('PanelControlHero');
  const kpis = t.raw('kpis') as Array<{ label: string; delta: string }>;
  const moduleNames = t.raw('modules') as string[];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">

      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0 bg-gradient-to-br from-indigo-50/60 via-blue-50/40 to-violet-50/50 dark:from-[hsl(224,28%,9%)] dark:via-[hsl(224,24%,8%)] dark:to-[hsl(224,28%,10%)]">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full bg-indigo-400/[0.12] dark:bg-indigo-500/[0.05] blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-violet-400/[0.10] dark:bg-violet-500/[0.04] blur-[120px]" />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-400/[0.08] dark:bg-emerald-500/[0.03] blur-[100px]" />
        <div className="absolute top-28 left-6 w-10 h-10 border-t-2 border-l-2 border-primary/20" />
        <div className="absolute top-28 right-6 w-10 h-10 border-t-2 border-r-2 border-primary/20" />
        <div className="absolute bottom-10 left-6 w-6 h-6 border-b-2 border-l-2 border-primary/10" />
        <div className="absolute bottom-10 right-6 w-6 h-6 border-b-2 border-r-2 border-primary/10" />
      </div>

      <div
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        <div className="rounded-xl border border-border/30 bg-card/60 backdrop-blur-2xl overflow-hidden shadow-lg ring-1 ring-black/5">

          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/30 bg-muted/20">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                {t('title')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-border/30">
            {kpis.map((kpi, i) => {
              const Icon = kpiIcons[i];
              return (
                <div
                  key={i}
                  className="p-5 space-y-1 hover:bg-white/[0.02] transition-colors"
                >
                  <Icon className={cn("h-4 w-4 mb-2", kpiColors[i])} />
                  <p className="text-lg font-bold text-foreground leading-none">{kpiValues[i]}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{kpi.label}</p>
                  <span className={cn("text-[10px] font-semibold uppercase tracking-wide", kpiColors[i])}>{kpi.delta}</span>
                </div>
              );
            })}
          </div>

          <div className="p-5 border-t border-border/30">
            <div className="grid grid-cols-3 gap-2.5">
              {moduleNames.map((name, i) => {
                const Icon = moduleIcons[i];
                return (
                  <NextLink
                    key={i}
                    href={moduleHrefs[i]}
                    className={cn(
                      "flex flex-col gap-3 p-4 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover:scale-[1.04] hover:shadow-lg",
                      moduleBgs[i], moduleBorders[i]
                    )}
                  >
                    <div className={cn("p-2 rounded-xl bg-muted/50 w-fit", moduleColors[i])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-tight text-muted-foreground leading-tight">
                      {name}
                    </p>
                  </NextLink>
                );
              })}
            </div>
          </div>

          <NextLink href="/register" className="block group">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary/15 to-transparent border-t border-primary/15 hover:from-primary/25 transition-all">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-primary leading-none">{t('activate')}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{t('activate_sub')}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </NextLink>
        </div>

        <p
          className="text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mt-6"
        >
          {t('tagline')}
        </p>
      </div>
    </section>
  );
}
