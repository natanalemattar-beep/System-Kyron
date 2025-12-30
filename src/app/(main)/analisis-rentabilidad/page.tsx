
"use client";

import { ProfitabilityAnalyzer } from '@/components/rentabilidad/profitability-analyzer';
import { GrowthStrategies } from '@/components/rentabilidad/growth-strategies';
import { CostOptimization } from '@/components/rentabilidad/cost-optimization';

export default function AnalisisRentabilidadPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Análisis Avanzado de Rentabilidad
        </h1>
        <p className="text-muted-foreground mt-2">
          Inteligencia de negocio para maximizar la utilidad y optimizar la estructura de costos.
        </p>
      </header>

      <div className="mb-8">
        <ProfitabilityAnalyzer />
      </div>
      <div className="mb-8">
        <GrowthStrategies />
      </div>
      <div className="mb-8">
        <CostOptimization />
      </div>

    </div>
  );
}
