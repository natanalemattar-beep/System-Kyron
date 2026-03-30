
'use client';

import { ArrowRight, ShieldCheck, TrendingUp, DollarSign, Users, Calculator, Smartphone, Recycle, Gavel, BarChart3 } from "lucide-react";
import NextLink from "next/link";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Ingresos / Mes", value: "Bs. 0", delta: "+0%",   icon: TrendingUp,  color: "text-emerald-400" },
  { label: "Facturas Activas", value: "0",     delta: "SENIAT", icon: DollarSign,  color: "text-cyan-400" },
  { label: "Empleados",        value: "0",     delta: "LOTTT",  icon: Users,       color: "text-violet-400" },
];

const modules = [
  { label: "Contabilidad VEN-NIF", icon: Calculator, color: "text-cyan-400",    bg: "from-cyan-500/20 to-cyan-500/5",      border: "border-cyan-500/25",    href: "/login-empresa" },
  { label: "RRHH & Nómina",        icon: Users,      color: "text-violet-400",  bg: "from-violet-500/20 to-violet-500/5",  border: "border-violet-500/25",  href: "/login-rrhh" },
  { label: "Mi Línea 5G / eSIM",    icon: Smartphone, color: "text-blue-400",    bg: "from-blue-500/20 to-blue-500/5",      border: "border-blue-500/25",    href: "/login-linea" },
  { label: "IA Legal & Permisos",  icon: Gavel,      color: "text-amber-400",   bg: "from-amber-500/20 to-amber-500/5",    border: "border-amber-500/25",   href: "/login-escritorio-juridico" },
  { label: "Eco-Créditos Ameru",   icon: Recycle,    color: "text-emerald-400", bg: "from-emerald-500/20 to-emerald-500/5",border: "border-emerald-500/25", href: "/login-sostenibilidad" },
  { label: "Analítica Avanzada",   icon: BarChart3,  color: "text-rose-400",    bg: "from-rose-500/20 to-rose-500/5",      border: "border-rose-500/25",    href: "/login-empresa" },
];

export function PanelControlHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4">

      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/6 blur-[120px]" />
        <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute top-28 left-6 w-10 h-10 border-t-2 border-l-2 border-primary/20" />
        <div className="absolute top-28 right-6 w-10 h-10 border-t-2 border-r-2 border-primary/20" />
        <div className="absolute bottom-10 left-6 w-6 h-6 border-b-2 border-l-2 border-primary/10" />
        <div className="absolute bottom-10 right-6 w-6 h-6 border-b-2 border-r-2 border-primary/10" />
      </div>

      <div
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        <div className="rounded-[2rem] border border-border/30 dark:border-white/10 bg-card/60 dark:bg-white/[0.03] backdrop-blur-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5">

          <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/30 dark:border-white/8 bg-muted/20 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-muted-foreground">
                Panel de Control — System Kyron
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400/90">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-3 divide-x divide-border/30 dark:divide-white/8">
            {kpis.map((kpi, i) => (
              <div
                key={kpi.label}
                className="p-5 space-y-1 hover:bg-white/[0.02] transition-colors"
              >
                <kpi.icon className={cn("h-4 w-4 mb-2", kpi.color)} />
                <p className="text-lg font-black text-foreground leading-none">{kpi.value}</p>
                <p className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">{kpi.label}</p>
                <span className={cn("text-[8px] font-black uppercase tracking-wide", kpi.color)}>{kpi.delta}</span>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-border/30 dark:border-white/8">
            <div className="grid grid-cols-3 gap-2.5">
              {modules.map((mod, i) => (
                <NextLink
                  key={mod.label}
                  href={mod.href}
                  className={cn(
                    "flex flex-col gap-3 p-4 rounded-2xl border bg-gradient-to-br transition-all duration-300 hover:scale-[1.04] hover:shadow-lg",
                    mod.bg, mod.border
                  )}
                >
                  <div className={cn("p-2 rounded-xl bg-muted/50 dark:bg-black/30 w-fit", mod.color)}>
                    <mod.icon className="h-4 w-4" />
                  </div>
                  <p className="text-[9px] font-black uppercase tracking-tight text-muted-foreground leading-tight">
                    {mod.label}
                  </p>
                </NextLink>
              ))}
            </div>
          </div>

          <NextLink href="/register" className="block group">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-primary/15 to-transparent border-t border-primary/15 hover:from-primary/25 transition-all">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary leading-none">Activar Portal</p>
                  <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Registro gratuito • 2 minutos</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
            </div>
          </NextLink>
        </div>

        <p
          className="text-center text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/70 mt-6"
        >
          Ecosistema Corporativo Venezuela • v2.8.5
        </p>
      </div>
    </section>
  );
}
