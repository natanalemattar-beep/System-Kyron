"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Download, Loader2, Inbox } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { BackButton } from "@/components/back-button";

interface CajaData {
  posicion: {
    saldoBs: string;
    saldoUsd: string;
    cuentas: number;
  } | null;
  flujo: {
    ingresos: string;
    egresos: string;
    neto: string;
    periodo: string;
  } | null;
  indicadores: {
    label: string;
    valor: string;
    estado: string;
  }[];
}

export default function AnalisisCajaPage() {
  const [data, setData] = useState<CajaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contabilidad/records?type=analisis_caja")
      .then((r) => (r.ok ? r.json() : { rows: [] }))
      .then((d) => {
        if (d.rows && d.rows.length > 0) {
          setData(d.rows[0]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
        <BackButton href="/contabilidad" label="Volver al Centro Contable" />
        <div className="flex items-center justify-center py-32 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-bold uppercase tracking-widest">Cargando análisis de caja...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-foreground uppercase tracking-tight flex items-center gap-3">
            <Wallet className="h-8 w-8 text-primary" />
            Análisis de Caja y Flujo
          </h1>
          <p className="text-muted-foreground text-sm font-medium">
            Proyección de Tesorería — Monitoreo de Solvencia y Liquidez.
          </p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </header>

      {!data ? (
        <Card className="border rounded-2xl shadow-sm">
          <CardContent className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
            <Inbox className="h-10 w-10" />
            <p className="text-sm font-bold uppercase tracking-widest">Sin datos de tesorería</p>
            <p className="text-xs text-muted-foreground/70">Los datos de análisis de caja y flujo aparecerán aquí al ser generados.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {data.posicion && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="border rounded-2xl shadow-sm p-6 text-center">
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Saldo en Bs</p>
                <p className="text-2xl font-bold text-primary">{data.posicion.saldoBs}</p>
              </Card>
              <Card className="border rounded-2xl shadow-sm p-6 text-center">
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Saldo en USD</p>
                <p className="text-2xl font-bold text-emerald-600">{data.posicion.saldoUsd}</p>
              </Card>
              <Card className="border rounded-2xl shadow-sm p-6 text-center">
                <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2">Cuentas Activas</p>
                <p className="text-2xl font-bold text-foreground">{data.posicion.cuentas}</p>
              </Card>
            </div>
          )}

          {data.flujo && (
            <Card className="border rounded-2xl shadow-sm p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Flujo de Caja — {data.flujo.periodo}
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Ingresos</p>
                  <p className="text-lg font-bold text-emerald-600">{data.flujo.ingresos}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Egresos</p>
                  <p className="text-lg font-bold text-rose-600">{data.flujo.egresos}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Neto</p>
                  <p className={cn("text-lg font-bold", data.flujo.neto.startsWith("-") ? "text-rose-600" : "text-emerald-600")}>
                    {data.flujo.neto}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {data.indicadores && data.indicadores.length > 0 && (
            <Card className="border rounded-2xl shadow-sm p-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Indicadores de Tesorería
              </h3>
              <div className="space-y-4">
                {data.indicadores.map((ind, i) => (
                  <div key={i} className="flex justify-between items-end border-b border-border/50 pb-4 last:border-none">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase">{ind.label}</p>
                      <p className="text-xl font-bold tracking-tight">{ind.valor}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-bold uppercase">{ind.estado}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
