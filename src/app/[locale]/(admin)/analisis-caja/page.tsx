
"use client";

import { CashFlowAnalysis } from "@/components/finanzas/cash-flow-analysis";
import { CashPosition } from "@/components/finanzas/cash-position";
import { CollectionForecast } from "@/components/finanzas/collection-forecast";
import { Activity, Wallet, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalisisCajaPage() {
  return (
    <div className="space-y-12 pb-20">
        <header className="border-l-4 border-primary pl-8 py-2 mt-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Wallet className="h-3 w-3" /> NODO DE LIQUIDEZ
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Análisis de <span className="text-primary italic">Caja y Flujo</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Proyección de Tesorería • Monitoreo de Solvencia 2026</p>
        </header>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <CashPosition />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
                <CashFlowAnalysis />
            </div>
            <div className="lg:col-span-5">
                <CollectionForecast />
            </div>
        </div>
    </div>
  );
}
