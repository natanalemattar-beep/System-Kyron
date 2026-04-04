"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  Clock, Loader2, Inbox, Printer,
  Users, Calendar, Timer
} from "lucide-react";

interface HoraExtra {
  empleadoId: number;
  nombre: string;
  cedula: string;
  cargo: string;
  diurnas: number;
  nocturnas: number;
  feriadas: number;
  salarioHora: number;
}

export default function HorasExtrasPage() {
  const [horasData, setHorasData] = useState<HoraExtra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=horas_extras')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setHorasData(d.rows ?? []))
      .catch(() => setHorasData([]))
      .finally(() => setLoading(false));
  }, []);

  const recargoDiurna = 1.5;
  const recargoNocturna = 1.8;
  const recargoFeriada = 2.5;

  const calcPago = (h: HoraExtra) => {
    return (h.diurnas * h.salarioHora * recargoDiurna) +
           (h.nocturnas * h.salarioHora * recargoNocturna) +
           (h.feriadas * h.salarioHora * recargoFeriada);
  };

  const summary = useMemo(() => {
    const totalDiurnas = horasData.reduce((s, h) => s + h.diurnas, 0);
    const totalNocturnas = horasData.reduce((s, h) => s + h.nocturnas, 0);
    const totalFeriadas = horasData.reduce((s, h) => s + h.feriadas, 0);
    const totalPago = horasData.reduce((s, h) => s + calcPago(h), 0);
    const conHoras = horasData.filter(h => h.diurnas + h.nocturnas + h.feriadas > 0).length;
    return { totalDiurnas, totalNocturnas, totalFeriadas, totalPago, conHoras, totalHoras: totalDiurnas + totalNocturnas + totalFeriadas };
  }, [horasData]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/libros" label="Libros Contables" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <Clock className="h-3.5 w-3.5" /> LOTTT · Arts. 178-183 · Máximo 100 h/año
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Libro de <span className="text-primary">Horas Extras</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Recargos: Diurna +50% · Nocturna +80% · Feriada +150% · LOTTT</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      {horasData.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Total Horas</span>
              <Timer className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-black">{summary.totalHoras}h</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Empleados</span>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-500">{summary.conHoras}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Costo Total</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-amber-500">{formatCurrency(summary.totalPago, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Distribución</span>
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-1 mt-1">
              <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">Diurnas</span><span className="font-bold">{summary.totalDiurnas}h</span></div>
              <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">Nocturnas</span><span className="font-bold">{summary.totalNocturnas}h</span></div>
              <div className="flex justify-between text-[11px]"><span className="text-muted-foreground">Feriadas</span><span className="font-bold">{summary.totalFeriadas}h</span></div>
            </div>
          </Card>
        </div>
      )}

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Timer className="h-4 w-4 text-primary" /> Control de Horas Extraordinarias
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando empleados...</span>
            </div>
          ) : horasData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin registro de horas extras</p>
              <p className="text-xs text-muted-foreground/70">Registre empleados y sus horas extraordinarias.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Empleado</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Cédula</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Cargo</TableHead>
                  <TableHead className="text-center py-4 text-xs font-semibold">Diurnas (+50%)</TableHead>
                  <TableHead className="text-center py-4 text-xs font-semibold">Nocturnas (+80%)</TableHead>
                  <TableHead className="text-center py-4 text-xs font-semibold">Feriadas (+150%)</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Valor/Hora</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Total a Pagar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {horasData.map((h) => {
                  const pago = calcPago(h);
                  return (
                    <TableRow key={h.empleadoId} className="hover:bg-muted/10">
                      <TableCell className="pl-6 py-4 text-xs font-semibold">{h.nombre}</TableCell>
                      <TableCell className="py-4 text-xs font-mono text-primary">{h.cedula}</TableCell>
                      <TableCell className="py-4 text-xs text-muted-foreground">{h.cargo}</TableCell>
                      <TableCell className="text-center py-4">
                        {h.diurnas > 0 ? <Badge className="bg-blue-500/10 text-blue-500 border-none text-[10px] font-bold">{h.diurnas}h</Badge> : <span className="text-muted-foreground/30">—</span>}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {h.nocturnas > 0 ? <Badge className="bg-violet-500/10 text-violet-500 border-none text-[10px] font-bold">{h.nocturnas}h</Badge> : <span className="text-muted-foreground/30">—</span>}
                      </TableCell>
                      <TableCell className="text-center py-4">
                        {h.feriadas > 0 ? <Badge className="bg-amber-500/10 text-amber-500 border-none text-[10px] font-bold">{h.feriadas}h</Badge> : <span className="text-muted-foreground/30">—</span>}
                      </TableCell>
                      <TableCell className="text-right py-4 font-mono text-sm">{formatCurrency(h.salarioHora, 'Bs.')}</TableCell>
                      <TableCell className="text-right pr-6 py-4 font-mono text-sm font-bold text-primary">{formatCurrency(pago, 'Bs.')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {horasData.length > 0 && (
          <CardFooter className="p-6 border-t">
            <p className="text-xs text-muted-foreground">LOTTT Art. 178: Máximo 100 horas extras por año por trabajador</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
