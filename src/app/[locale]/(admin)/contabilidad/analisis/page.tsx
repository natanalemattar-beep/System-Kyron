"use client";

import React from "react";
import { Link } from "@/navigation";
import { ChartPie as PieChart, TrendingUp, ShieldCheck, Activity, Calculator, ChartBar as BarChart3, ChevronRight, Sparkles, Zap, AlertCircle, FileCheck2, Fingerprint } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";

export default function AnalisisPage() {
  const modulos = [
    {
      label: "Pulso de Ingresos",
      href: "/analisis-ventas",
      icon: BarChart3,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      desc: "Auditoría de ingresos y tendencias por libros.",
    },
    {
      label: "Alerta de Morosidad",
      href: "/analisis-riesgo",
      icon: ShieldCheck,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      desc: "Monitor de cuentas incobrables y riesgo de cartera.",
    },
    {
      label: "Rentabilidad",
      href: "/analisis-rentabilidad",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      desc: "Análisis de utilidad neta y eficiencia fiscal.",
    },
    {
      label: "Factibilidad Económica",
      href: "/estudio-factibilidad-economica",
      icon: Calculator,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      border: "border-violet-500/20",
      desc: "VAN, TIR y escenarios de inversión.",
    },
    {
      label: "Auditoría de Costos",
      href: "/estructura-costos",
      icon: Activity,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      desc: "Análisis de centros de costo y gastos fijos.",
    },
  ];

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary">
              <PieChart className="h-3.5 w-3.5" /> Centro Analítico
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-gradient-to-r from-primary to-kyron-cyan text-white shadow-lg shadow-primary/20 italic">
              <Sparkles className="h-3 w-3" /> Professional Plan
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter italic uppercase kyron-gradient-text leading-tight">
            Inteligencia <span className="text-foreground">Estratégica</span>
          </h1>
          <p className="text-sm font-bold text-muted-foreground mt-1">
            Business Intelligence Proyectual · Auditoría Continua con IA
          </p>
        </div>
      </header>

      {/* Real-time Audit Dashboard - Professional Feature */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Card className="rounded-3xl border border-white/[0.05] shadow-2xl overflow-hidden liquid-glass-apple relative group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
            <Fingerprint className="h-48 w-48 text-primary" />
          </div>
          <CardHeader className="pb-4 relative z-10">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-lg font-black italic tracking-tight uppercase kyron-gradient-text">
                <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
                Auditoría Fiscal <span className="text-foreground">en Tiempo Real</span>
              </CardTitle>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase">Live Monitor</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Score de Cumplimiento</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-emerald-500 italic">98.4<span className="text-xl">%</span></span>
                  <Activity className="h-5 w-5 text-emerald-500 mb-1.5" />
                </div>
                <div className="h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[98%]" />
                </div>
              </div>
              
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Riesgo de Multas</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-blue-500 italic">Bajo</span>
                  <ShieldCheck className="h-6 w-6 text-blue-500 mb-1" />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground italic">No se detectan discrepancias críticas</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Alertas Preventivas</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-amber-500 italic">02</span>
                  <AlertCircle className="h-6 w-6 text-amber-500 mb-1" />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground italic underline">Ver conciliaciones bancarias</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Integridad Fiscal</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-primary italic">Óptima</span>
                  <FileCheck2 className="h-6 w-6 text-primary mb-1" />
                </div>
                <p className="text-[10px] font-bold text-muted-foreground italic">Libros legales al día</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modulos.map((item, i) => (
          <Link key={i} href={item.href as any} className="block group">
            <Card className={cn("border rounded-2xl p-6 flex flex-col justify-between min-h-[180px] hover:shadow-lg transition-all", item.border)}>
              <div className="space-y-4">
                <div className={cn("p-3 rounded-xl w-fit border", item.bg, item.border)}>
                  <item.icon className={cn("h-6 w-6", item.color)} />
                </div>
                <div>
                  <h3 className="text-sm font-bold group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-[11px] text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
