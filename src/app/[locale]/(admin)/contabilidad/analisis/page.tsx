"use client";

import React from "react";
import { Link } from "@/navigation";
import { ChartPie as PieChart, TrendingUp, ShieldCheck, Activity, Calculator, ChartBar as BarChart3, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
            <PieChart className="h-3.5 w-3.5" /> Centro Analítico
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Inteligencia <span className="text-primary">Estratégica</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Business intelligence · Control proyectivo · Análisis financiero</p>
        </div>
      </header>

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
