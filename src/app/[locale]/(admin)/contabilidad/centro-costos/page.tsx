"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Layers, Building2, Download, Loader2, Inbox, TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface Centro {
  codigo: string;
  nombre: string;
  responsable: string;
  presupuesto: number;
  ejecutado: number;
  ingresos: number;
}

export default function CentroCostosPage() {
  const [centros, setCentros] = useState<Centro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=centros_costos')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setCentros(d.rows ?? []))
      .catch(() => setCentros([]))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const totalPresupuesto = centros.reduce((s, c) => s + (c.presupuesto || 0), 0);
    const totalEjecutado = centros.reduce((s, c) => s + (c.ejecutado || 0), 0);
    const pctGlobal = totalPresupuesto > 0 ? (totalEjecutado / totalPresupuesto * 100) : 0;
    return { totalPresupuesto, totalEjecutado, pctGlobal };
  }, [centros]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
              <Layers className="h-3.5 w-3.5" /> Contabilidad Analítica
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Centro de <span className="text-primary">Costos</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Análisis por departamento · Presupuesto vs real · Eficiencia operativa</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Download className="mr-2 h-4 w-4" /> Exportar
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando centros de costos...</span>
        </div>
      ) : centros.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin centros de costos configurados</p>
              <p className="text-xs text-muted-foreground/70">Los centros de costos aparecerán al ser configurados en el módulo contable.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Centros Activos</span>
                <Layers className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold">{centros.length}</p>
            </Card>
            <Card className="rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Presupuesto Total</span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-emerald-500">{formatCurrency(summary.totalPresupuesto, 'Bs.')}</p>
            </Card>
            <Card className="rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground">Ejecución Global</span>
                <Layers className="h-4 w-4 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">{summary.pctGlobal.toFixed(0)}%</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {centros.map((centro) => {
              const pct = centro.presupuesto > 0 ? (centro.ejecutado / centro.presupuesto) * 100 : 0;
              return (
                <Card key={centro.codigo} className="rounded-2xl border overflow-hidden">
                  <CardHeader className="p-5 pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono font-bold text-muted-foreground">{centro.codigo}</p>
                          <CardTitle className="text-sm font-bold">{centro.nombre}</CardTitle>
                          <p className="text-[10px] text-muted-foreground">{centro.responsable}</p>
                        </div>
                      </div>
                      <Badge className="text-[11px] font-bold bg-primary/10 text-primary border-none">{pct.toFixed(0)}%</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 pt-2">
                    <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                      <span>Presupuestado: {formatCurrency(centro.presupuesto, 'Bs.')}</span>
                      <span>Ejecutado: {formatCurrency(centro.ejecutado, 'Bs.')}</span>
                    </div>
                    <Progress value={Math.min(pct, 100)} className="h-2 mb-2" />
                    {centro.ingresos > 0 && (
                      <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                        <TrendingUp className="h-3 w-3 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500">Ingresos generados: {formatCurrency(centro.ingresos, 'Bs.')}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
