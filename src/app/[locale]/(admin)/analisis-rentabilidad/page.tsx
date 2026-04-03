"use client";

import { ProfitabilityAnalyzer } from '@/components/rentabilidad/profitability-analyzer';
import { GrowthStrategies } from '@/components/rentabilidad/growth-strategies';
import { CostOptimization } from '@/components/rentabilidad/cost-optimization';
import { TrendingUp, Activity, Terminal } from "lucide-react";

/**
 * @fileOverview Análisis de Rentabilidad Pro.
 */

export default function AnalisisRentabilidadPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <TrendingUp className="h-3 w-3" /> CENTRO ANALÍTICO
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Rentabilidad <span className="text-primary italic">Avanzada</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Inteligencia de Negocio • Optimización de Márgenes 2026</p>
      </header>

      <div className="space-y-10">
        <ProfitabilityAnalyzer />
        <div className="grid lg:grid-cols-2 gap-10">
            <GrowthStrategies />
            <CostOptimization />
        </div>
      </div>
    </div>
  );
}
