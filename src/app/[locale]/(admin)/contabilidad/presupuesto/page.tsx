"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Target, TrendingUp, TrendingDown, TriangleAlert, Download, Loader2, Inbox, Printer, ArrowUpRight, ArrowDownRight, Calculator } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface Partida {
  nombre: string;
  presupuestado: number;
  ejecutado: number;
  tipo: string;
}

export default function PresupuestoPage() {
  const [partidas, setPartidas] = useState<Partida[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=presupuesto')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setPartidas(d.rows ?? []))
      .catch(() => setPartidas([]))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const totalPresupuestado = partidas.reduce((s, c) => s + (c.presupuestado || 0), 0);
    const totalEjecutado = partidas.reduce((s, c) => s + (c.ejecutado || 0), 0);
    const desviacion = totalPresupuestado > 0 ? ((totalEjecutado - totalPresupuestado) / totalPresupuestado * 100) : 0;
    const ejecucion = totalPresupuestado > 0 ? (totalEjecutado / totalPresupuestado * 100) : 0;
    return { totalPresupuestado, totalEjecutado, desviacion, ejecucion };
  }, [partidas]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
              <Target className="h-3.5 w-3.5" /> Planificación Financiera
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Presupuesto <span className="text-primary">Empresarial</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Planificación · Ejecución vs. real · Desviaciones · Proyecciones</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando presupuesto...</span>
        </div>
      ) : partidas.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin partidas presupuestarias</p>
              <p className="text-xs text-muted-foreground/70">Las partidas aparecerán al configurar el presupuesto del período.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Presupuestado</span>
                <Target className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{formatCurrency(summary.totalPresupuestado, 'Bs.')}</p>
            </Card>
            <Card className="rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Ejecutado</span>
                <Calculator className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-emerald-500">{formatCurrency(summary.totalEjecutado, 'Bs.')}</p>
            </Card>
            <Card className="rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Desviación</span>
                {summary.desviacion > 0 ? <ArrowUpRight className="h-4 w-4 text-rose-500" /> : <ArrowDownRight className="h-4 w-4 text-emerald-500" />}
              </div>
              <p className={cn("text-2xl font-bold", summary.desviacion > 5 ? "text-rose-500" : "text-emerald-500")}>{summary.desviacion.toFixed(1)}%</p>
            </Card>
            <Card className="rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Ejecución</span>
                <TrendingUp className="h-4 w-4 text-cyan-500" />
              </div>
              <p className="text-2xl font-bold text-cyan-500">{summary.ejecucion.toFixed(0)}%</p>
            </Card>
          </div>

          <div className="space-y-4">
            {partidas.map((cat, i) => {
              const pct = cat.presupuestado > 0 ? (cat.ejecutado / cat.presupuestado) * 100 : 0;
              const desviacion = cat.presupuestado > 0 ? ((cat.ejecutado - cat.presupuestado) / cat.presupuestado * 100) : 0;
              const esExceso = cat.ejecutado > cat.presupuestado;
              return (
                <Card key={i} className="rounded-2xl border p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Calculator className={cn("h-5 w-5", esExceso ? "text-rose-500" : "text-emerald-500")} />
                      <div>
                        <p className="text-sm font-bold">{cat.nombre}</p>
                        <p className="text-[10px] text-muted-foreground">
                          Presupuesto: {formatCurrency(cat.presupuestado, 'Bs.')} | Ejecutado: {formatCurrency(cat.ejecutado, 'Bs.')}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn("text-[11px] font-bold border-none", esExceso ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500")}>
                      {esExceso ? "+" : ""}{desviacion.toFixed(1)}%
                    </Badge>
                  </div>
                  <Progress value={Math.min(pct, 100)} className="h-2" />
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[11px] text-muted-foreground">{pct.toFixed(0)}% ejecutado</span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {esExceso ? `Exceso: ${formatCurrency(cat.ejecutado - cat.presupuestado, 'Bs.')}` : `Disponible: ${formatCurrency(cat.presupuestado - cat.ejecutado, 'Bs.')}`}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

          {partidas.some(c => c.ejecutado > c.presupuestado) && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Alerta de Desviación</p>
                  <p className="text-[11px] text-muted-foreground mt-1">
                    {partidas.filter(c => c.ejecutado > c.presupuestado).length} partida(s) presupuestaria(s) exceden el monto planificado. Se recomienda revisar la estructura de costos.
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
