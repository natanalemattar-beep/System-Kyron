"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Download, ChartColumn } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { BackButton } from "@/components/back-button";

interface DashboardData {
  ingresos: number;
  gastos: number;
  utilidadNeta: number;
  liquidezTotal: number;
  facturas: { emitidas: number; cobradas: number; vencidas: number };
}

export default function ReportesPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight flex items-center gap-3">
            <FileText className="h-8 w-8 text-emerald-600" />
            Reportes Tributarios
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Resumen ejecutivo de la situación fiscal del período actual.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Exportar Reporte
        </Button>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-bold uppercase tracking-widest">Generando reporte...</span>
        </div>
      ) : !data ? (
        <Card className="border rounded-2xl shadow-sm p-12 text-center">
          <ChartColumn className="h-10 w-10 mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sin datos fiscales disponibles</p>
          <p className="text-xs text-muted-foreground/70 mt-2">Registre operaciones para generar reportes tributarios.</p>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border rounded-2xl shadow-sm p-8">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">Ingresos del Período</p>
            <p className="text-3xl font-bold text-foreground">{formatCurrency(data.ingresos, "Bs.")}</p>
          </Card>
          <Card className="border rounded-2xl shadow-sm p-8">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">Gastos del Período</p>
            <p className="text-3xl font-bold text-rose-600">{formatCurrency(data.gastos, "Bs.")}</p>
          </Card>
          <Card className="border rounded-2xl shadow-sm p-8">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">Utilidad Neta</p>
            <p className="text-3xl font-bold text-emerald-600">{formatCurrency(data.utilidadNeta, "Bs.")}</p>
          </Card>
          <Card className="border rounded-2xl shadow-sm p-8">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">Liquidez Total</p>
            <p className="text-3xl font-bold text-foreground">{formatCurrency(data.liquidezTotal, "Bs.")}</p>
          </Card>
          <Card className="border rounded-2xl shadow-sm p-8">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">Facturas Emitidas</p>
            <p className="text-3xl font-bold text-amber-600">{data.facturas.emitidas}</p>
          </Card>
          <Card className="border rounded-2xl shadow-sm p-8">
            <p className="text-[10px] font-semibold uppercase text-muted-foreground mb-1">Facturas Vencidas</p>
            <p className="text-3xl font-bold text-rose-600">{data.facturas.vencidas}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
