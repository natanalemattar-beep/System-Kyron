"use client";

import React, { useState, useEffect } from "react";
import { RefreshCw, Building2, Banknote, TrendingUp, Clock, Loader2, Inbox, AlertTriangle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface CuentaBancaria {
  id: number;
  banco: string;
  cuenta: string;
  saldo: number;
  movimientos: number;
  estado: string;
  match: number;
}

interface Movimiento {
  id: number;
  fecha: string;
  concepto: string;
  monto: number;
  banco: string;
  tipo: string;
  estado: string;
}

export default function ConciliacionBancariaPage() {
  const { toast } = useToast();
  const [cuentas, setCuentas] = useState<CuentaBancaria[]>([]);
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/contabilidad/records?type=cuentas_bancarias').then(r => r.ok ? r.json() : { rows: [] }),
      fetch('/api/contabilidad/records?type=movimientos_bancarios').then(r => r.ok ? r.json() : { rows: [] }),
    ])
      .then(([c, m]) => {
        setCuentas(c.rows ?? []);
        setMovimientos(m.rows ?? []);
      })
      .catch(() => {
        setCuentas([]);
        setMovimientos([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "contabilidad", subcategoria: "conciliacion_bancaria", descripcion: "Sincronización y conciliación bancaria" }),
      });
      if (res.ok) {
        toast({ title: "Solicitud registrada", description: "La conciliación bancaria ha sido solicitada." });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo iniciar la conciliación." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3">
              <RefreshCw className="h-3.5 w-3.5" /> Conciliación Bancaria
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Gestión y <span className="text-blue-500">Conciliación</span> Bancaria
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Sincronización de cuentas bancarias · Control de movimientos</p>
          </div>
          <Button onClick={handleSync} disabled={isSyncing} className="rounded-xl">
            {isSyncing ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Solicitar Conciliación
          </Button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Cargando datos bancarios...</span>
        </div>
      ) : cuentas.length === 0 && movimientos.length === 0 ? (
        <Card className="rounded-2xl border">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin cuentas bancarias registradas</p>
              <p className="text-xs text-muted-foreground/70">Las cuentas y movimientos aparecerán al configurar la integración bancaria.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {cuentas.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-blue-500" />
                <h2 className="text-sm font-bold text-muted-foreground">Cuentas Bancarias</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cuentas.map((b) => (
                  <Card key={b.id} className="rounded-2xl border p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-bold">{b.banco}</p>
                        <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{b.cuenta}</p>
                      </div>
                      <Badge className={cn("text-[10px] font-semibold border-none",
                        b.estado === 'CONCILIADO' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                      )}>
                        {b.estado}
                      </Badge>
                    </div>
                    <p className="text-lg font-black">{b.saldo?.toLocaleString('es-VE')} Bs.</p>
                    <p className="text-xs text-muted-foreground">{b.movimientos} movimientos este mes</p>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {movimientos.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-sm font-bold text-muted-foreground">Movimientos Recientes</h2>
              <Card className="rounded-2xl border overflow-hidden">
                <div className="divide-y divide-border">
                  {movimientos.slice(0, 20).map((m) => (
                    <div key={m.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-2 h-2 rounded-full shrink-0", m.tipo === "CRÉDITO" ? "bg-emerald-500" : "bg-rose-500")} />
                        <div>
                          <p className="text-xs font-semibold">{m.concepto}</p>
                          <p className="text-[11px] text-muted-foreground">{m.fecha} · {m.banco}</p>
                        </div>
                      </div>
                      <p className={cn("text-sm font-bold", m.tipo === "CRÉDITO" ? "text-emerald-500" : "text-rose-500")}>
                        {m.tipo === "CRÉDITO" ? "+" : "-"} {m.monto?.toLocaleString('es-VE')} Bs.
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
          )}
        </>
      )}

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Nota</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              La conciliación bancaria requiere la integración con los portales bancarios correspondientes. Los datos mostrados provienen del registro interno del sistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
