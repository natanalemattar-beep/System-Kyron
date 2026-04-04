"use client";

import React, { useState, useEffect, useMemo } from "react";
import { HardDrive, TrendingDown, Calendar, Loader2, Inbox, Printer, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";

interface Activo {
  codigo: string;
  nombre: string;
  categoria: string;
  fechaAdquisicion: string;
  costoOriginal: number;
  vidaUtil: string;
  metodo: string;
  depAcumulada: number;
  depMensual: number;
  valorLibros: number;
  porcentajeDepreciado: number;
}

export default function DepreciacionActivosPage() {
  const [activos, setActivos] = useState<Activo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=activos_fijos')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setActivos(d.rows ?? []))
      .catch(() => setActivos([]))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const costoTotal = activos.reduce((s, a) => s + (a.costoOriginal || 0), 0);
    const depTotal = activos.reduce((s, a) => s + (a.depAcumulada || 0), 0);
    const valorLibros = activos.reduce((s, a) => s + (a.valorLibros || 0), 0);
    const depMensual = activos.reduce((s, a) => s + (a.depMensual || 0), 0);
    return { costoTotal, depTotal, valorLibros, depMensual };
  }, [activos]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <HardDrive className="h-3.5 w-3.5" /> Activos Fijos
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Depreciación de <span className="text-primary">Activos</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">VEN-NIF · Línea recta / Doble saldo · Valores fiscales · ISLR Art. 27</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      {activos.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Costo Total</span>
              <HardDrive className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-black text-primary">{formatCurrency(summary.costoTotal, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Dep. Acumulada</span>
              <TrendingDown className="h-4 w-4 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-rose-500">{formatCurrency(summary.depTotal, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Valor en Libros</span>
              <HardDrive className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-500">{formatCurrency(summary.valorLibros, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Dep. Mensual</span>
              <Calendar className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-500">{formatCurrency(summary.depMensual, 'Bs.')}</p>
          </Card>
        </div>
      )}

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <HardDrive className="h-4 w-4 text-primary" /> Cuadro de Depreciación
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando activos...</span>
            </div>
          ) : activos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin activos fijos registrados</p>
              <p className="text-xs text-muted-foreground/70">Los activos aparecerán aquí al ser registrados en el módulo contable.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 text-xs font-semibold">Código</TableHead>
                  <TableHead className="text-xs font-semibold">Activo</TableHead>
                  <TableHead className="text-xs font-semibold">Categoría</TableHead>
                  <TableHead className="text-xs font-semibold">Costo Original</TableHead>
                  <TableHead className="text-xs font-semibold">Vida Útil</TableHead>
                  <TableHead className="text-xs font-semibold">Dep. Acumulada</TableHead>
                  <TableHead className="text-xs font-semibold">Dep. Mensual</TableHead>
                  <TableHead className="text-xs font-semibold">Valor Libros</TableHead>
                  <TableHead className="pr-6 text-xs font-semibold">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activos.map((a) => (
                  <TableRow key={a.codigo} className="hover:bg-muted/10">
                    <TableCell className="pl-6 font-mono text-[11px] font-bold text-primary">{a.codigo}</TableCell>
                    <TableCell className="text-xs max-w-[200px]">
                      <p className="truncate font-semibold">{a.nombre}</p>
                      <p className="text-[10px] text-muted-foreground">{a.metodo} · Desde: {a.fechaAdquisicion}</p>
                    </TableCell>
                    <TableCell><Badge className="text-[9px] font-semibold bg-muted/50 border-none">{a.categoria}</Badge></TableCell>
                    <TableCell className="text-xs font-mono">{formatCurrency(a.costoOriginal, 'Bs.')}</TableCell>
                    <TableCell className="text-xs text-center">{a.vidaUtil}</TableCell>
                    <TableCell className="text-xs font-mono text-rose-500">{formatCurrency(a.depAcumulada, 'Bs.')}</TableCell>
                    <TableCell className="text-xs font-mono text-amber-500">{formatCurrency(a.depMensual, 'Bs.')}</TableCell>
                    <TableCell className="text-xs font-mono font-bold">{formatCurrency(a.valorLibros, 'Bs.')}</TableCell>
                    <TableCell className="pr-6">
                      <div className="flex items-center gap-2">
                        <Progress value={a.porcentajeDepreciado} className="h-1.5 w-16" />
                        <span className="text-[10px] font-mono">{a.porcentajeDepreciado}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-primary">Cumplimiento Fiscal — ISLR Art. 27</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              Equipos de computación: 5 años (20%). Mobiliario: 10 años (10%). Vehículos: 5 años (20%). Edificaciones: 20 años (5%). Los activos intangibles se amortizan según su vida útil estimada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
