"use client";

import { IntelligentPortfolioManager } from "@/components/cobranza/intelligent-portfolio-manager";
import { AutomatedCollectionSystem } from "@/components/cobranza/automated-collection-system";
import { PaymentReconciliation } from "@/components/cobranza/payment-reconciliation";
import { Activity, Landmark, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

/**
 * @fileOverview Gestión Inteligente de Cuentas por Cobrar.
 */

export default function CuentasPorCobrarPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
        <header className="border-l-4 border-primary pl-8 py-2 mt-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Landmark className="h-3 w-3" /> NODO DE ACTIVOS
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Cuentas <span className="text-primary italic">por Cobrar</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Clientes • Conciliación de Ingresos 2026</p>
        </header>

        <div className="grid gap-10">
            <IntelligentPortfolioManager />
            <div className="grid lg:grid-cols-2 gap-10">
                <AutomatedCollectionSystem />
                <PaymentReconciliation />
            </div>
        </div>
    </div>
  );
}
