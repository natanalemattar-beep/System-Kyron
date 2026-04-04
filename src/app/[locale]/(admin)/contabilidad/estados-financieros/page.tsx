"use client";

import React, { useState, useEffect } from "react";
import { FileText, TrendingUp, Activity, Wallet, BookOpen, Landmark, ShieldCheck, Loader2, Inbox, Printer } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";

interface FinancialData {
  total_activos: string;
  total_pasivos: string;
  total_patrimonio: string;
  total_ingresos: string;
  total_gastos: string;
}

const formatNum = (v: string | number) => {
  const n = typeof v === 'string' ? parseFloat(v) : v;
  return isNaN(n) ? '0,00' : n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function EstadosFinancierosPage() {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=estados_financieros')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => {
        if (d.rows && d.rows.length > 0) {
          setData(d.rows[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activos = parseFloat(data?.total_activos || '0');
  const pasivos = parseFloat(data?.total_pasivos || '0');
  const patrimonio = parseFloat(data?.total_patrimonio || '0');
  const ingresos = parseFloat(data?.total_ingresos || '0');
  const gastos = parseFloat(data?.total_gastos || '0');
  const utilidad = ingresos - gastos;
  const hasData = activos !== 0 || pasivos !== 0 || ingresos !== 0 || gastos !== 0;

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <FileText className="h-3.5 w-3.5" /> Estados Financieros
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Estados <span className="text-primary">Financieros</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">VEN-NIF · NIIF PYMES · NIC 1 / NIC 7 · Providencia 0071</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Generando estados financieros...</span>
        </div>
      ) : !hasData ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin datos contables para generar estados financieros</p>
              <p className="text-xs text-muted-foreground/70">Registre asientos contables y configure su plan de cuentas para generar reportes financieros.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="border rounded-2xl overflow-hidden border-primary/20">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl border bg-primary/10 border-primary/20">
                    <Landmark className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Balance General</CardTitle>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Estado de Situación Financiera</p>
                  </div>
                </div>
                <Badge className="text-[9px] font-bold border-none bg-primary/10 text-primary">VEN-NIF</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Total Activos</p>
                  <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{formatNum(activos)} Bs.</p>
                </div>
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                  <p className="text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase">Total Pasivos</p>
                  <p className="text-xl font-black text-rose-600 dark:text-rose-400 mt-1">{formatNum(pasivos)} Bs.</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Patrimonio</p>
                  <p className="text-xl font-black text-blue-600 dark:text-blue-400 mt-1">{formatNum(patrimonio)} Bs.</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-muted/30 text-xs text-muted-foreground">
                Ecuación patrimonial: Activos ({formatNum(activos)}) = Pasivos ({formatNum(pasivos)}) + Patrimonio ({formatNum(patrimonio)})
              </div>
            </CardContent>
          </Card>

          <Card className="border rounded-2xl overflow-hidden border-emerald-500/20">
            <CardHeader className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl border bg-emerald-500/10 border-emerald-500/20">
                    <TrendingUp className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Estado de Resultados</CardTitle>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Ganancias y Pérdidas del Período</p>
                  </div>
                </div>
                <Badge className="text-[9px] font-bold border-none bg-emerald-500/10 text-emerald-500">PERÍODO</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-2 space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                  <span className="text-xs font-semibold">Ingresos Totales</span>
                  <span className="text-sm font-black text-emerald-600">{formatNum(ingresos)} Bs.</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                  <span className="text-xs font-semibold">Gastos y Costos Totales</span>
                  <span className="text-sm font-black text-rose-500">({formatNum(gastos)}) Bs.</span>
                </div>
                <div className={cn("flex justify-between items-center p-4 rounded-xl border-2", utilidad >= 0 ? "bg-emerald-500/10 border-emerald-500/30" : "bg-rose-500/10 border-rose-500/30")}>
                  <span className="text-xs font-bold uppercase">{utilidad >= 0 ? 'Utilidad Neta' : 'Pérdida Neta'}</span>
                  <span className={cn("text-xl font-black", utilidad >= 0 ? "text-emerald-600" : "text-rose-500")}>{formatNum(utilidad)} Bs.</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border rounded-2xl overflow-hidden border-cyan-500/20">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl border bg-cyan-500/10 border-cyan-500/20">
                    <Activity className="h-6 w-6 text-cyan-500" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Flujo de Efectivo</CardTitle>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Basado en movimientos bancarios registrados</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <p className="text-xs text-muted-foreground">El flujo de efectivo se calcula automáticamente a partir de los movimientos bancarios y asientos contables registrados en el sistema.</p>
              </CardContent>
            </Card>

            <Card className="border rounded-2xl overflow-hidden border-violet-500/20">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl border bg-violet-500/10 border-violet-500/20">
                    <Wallet className="h-6 w-6 text-violet-500" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-bold">Movimiento del Patrimonio</CardTitle>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Cambios en el Patrimonio Neto</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-2">
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                  <span className="text-xs font-semibold">Patrimonio Actual</span>
                  <span className="text-sm font-black text-violet-500">{formatNum(patrimonio)} Bs.</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Conformidad VEN-NIF</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Los estados financieros se generan conforme a las Normas Venezolanas de Información Financiera (VEN-NIF), las Normas Internacionales de Contabilidad (NIC 1, NIC 7) y las NIIF para PYMES. Los datos se calculan en tiempo real a partir de los asientos contables y el plan de cuentas del usuario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
