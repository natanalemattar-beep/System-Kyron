

"use client";

import { CashFlowAnalysis } from "@/components/finanzas/cash-flow-analysis";
import { CashPosition } from "@/components/finanzas/cash-position";
import { CollectionForecast } from "@/components/finanzas/collection-forecast";

export default function AnalisisCajaPage() {
  return (
    <div className="space-y-8">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Análisis de Caja</h1>
            <p className="text-muted-foreground mt-2">
                Monitorea, proyecta y optimiza el corazón financiero de tu empresa.
            </p>
        </header>

        <CashPosition />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
                <CashFlowAnalysis />
            </div>
            <div className="lg:col-span-2">
                <CollectionForecast />
            </div>
        </div>
    </div>
  );
}
