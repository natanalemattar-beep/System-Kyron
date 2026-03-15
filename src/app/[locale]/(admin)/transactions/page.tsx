"use client";

import { TransactionsTable } from "@/components/transactions/transactions-table";
import { Activity } from "lucide-react";
import { mockTransactions } from "@/lib/data";

export default function TransactionsPage() {
  return (
    <div className="space-y-10 px-6 md:px-10 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest border border-white/5 mb-4">
            <Activity className="h-3 w-3" /> Ledger Transaccional Simulado
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase leading-none italic italic-shadow">Registro de <span className="text-primary">Operaciones</span></h1>
        <p className="text-muted-foreground mt-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
          Visualización de datos de demostración corporativa.
        </p>
      </header>
      
      <div className="titanium-card rounded-[2rem] overflow-hidden">
        <TransactionsTable initialTransactions={mockTransactions} isLoading={false} />
      </div>
    </div>
  );
}