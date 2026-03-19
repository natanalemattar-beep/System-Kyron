"use client";

import { useEffect, useState } from "react";
import { TransactionsTable } from "@/components/transactions/transactions-table";
import { Activity } from "lucide-react";
import type { Transaction } from "@/lib/types";

interface MovimientoRaw {
  id: number;
  fecha_operacion: string;
  concepto: string;
  monto: string;
  tipo: string;
  referencia: string | null;
}

function mapMovToTransaction(m: MovimientoRaw): Transaction {
  return {
    id: String(m.id),
    date: m.fecha_operacion,
    description: m.concepto,
    amount: m.tipo === 'debito' ? -Math.abs(parseFloat(m.monto)) : Math.abs(parseFloat(m.monto)),
    category: m.tipo === 'credito' ? 'Ingreso' : 'Sin Categorizar',
  };
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/movimientos?limit=100')
      .then(r => r.ok ? r.json() : { movimientos: [] })
      .then(data => setTransactions((data.movimientos ?? []).map(mapMovToTransaction)))
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-10 px-6 md:px-10 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-white/5 text-white/40 text-[9px] font-bold uppercase tracking-widest border border-white/5 mb-4">
            <Activity className="h-3 w-3" /> Ledger Transaccional
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white uppercase leading-none italic italic-shadow">Registro de <span className="text-primary">Operaciones</span></h1>
        <p className="text-muted-foreground mt-2 text-[10px] font-bold uppercase tracking-widest opacity-40">
          Movimientos bancarios registrados en la base de datos.
        </p>
      </header>
      
      <div className="titanium-card rounded-[2rem] overflow-hidden">
        <TransactionsTable initialTransactions={transactions} isLoading={loading} />
      </div>
    </div>
  );
}
