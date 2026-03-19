"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Receipt, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardData {
  ingresos: number;
  gastos: number;
  utilidadNeta: number;
  facturas: { emitidas: number; cobradas: number; vencidas: number };
}

export function StatsCards() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard', { cache: 'no-store' })
      .then(r => r.ok ? r.json() : null)
      .then(json => { if (json) setData(json); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    {
      title: "Ingresos Totales",
      value: data ? formatCurrency(data.ingresos, 'Bs.') : null,
      trend: data?.ingresos === 0 ? "Sin movimientos" : "+Este mes",
      icon: DollarSign,
      positive: true,
    },
    {
      title: "Gastos Totales",
      value: data ? formatCurrency(data.gastos, 'Bs.') : null,
      trend: data?.gastos === 0 ? "Sin movimientos" : "Egresos acumulados",
      icon: TrendingDown,
      positive: false,
    },
    {
      title: "Utilidad Neta",
      value: data ? formatCurrency(data.utilidadNeta, 'Bs.') : null,
      trend: data ? (data.utilidadNeta >= 0 ? "Positiva" : "Negativa") : "—",
      icon: TrendingUp,
      positive: data ? data.utilidadNeta >= 0 : true,
    },
    {
      title: "Facturas Activas",
      value: data ? String(data.facturas.emitidas) : null,
      trend: data ? `${data.facturas.vencidas} vencidas` : "—",
      icon: Receipt,
      positive: data ? data.facturas.vencidas === 0 : true,
    },
  ];

  return (
    <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 w-full">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-[#050505] border border-[#1f1f1f] group hover:border-[#333] transition-all">
          <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
            <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.title}</CardTitle>
            <stat.icon className="h-3.5 w-3.5 text-white/20 group-hover:text-white transition-colors" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            {loading ? (
              <Skeleton className="h-7 w-24 bg-white/10 rounded mb-2" />
            ) : (
              <div className="text-xl font-bold text-white mb-1">{stat.value ?? '—'}</div>
            )}
            <p className={cn(
              "text-[10px] font-bold uppercase tracking-widest",
              stat.positive ? "text-emerald-400" : "text-rose-400"
            )}>{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
