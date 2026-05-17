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
  Users, Loader2, Inbox, Printer,
  Wallet, TrendingDown, Calendar, Banknote
} from "lucide-react";

interface Nomina {
  id: number;
  periodo: string;
  fecha: string;
  bruto: string;
  deducciones: string;
  neto: string;
  estado: string;
  empleados?: number;
}

export default function LibroNominaPage() {
  const [rows, setRows] = useState<Nomina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=nominas')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const totalBruto = rows.reduce((s, r) => s + parseFloat(r.bruto || '0'), 0);
    const totalDeducciones = rows.reduce((s, r) => s + parseFloat(r.deducciones || '0'), 0);
    const totalNeto = rows.reduce((s, r) => s + parseFloat(r.neto || '0'), 0);
    const pagadas = rows.filter(r => r.estado === 'pagada').length;
    return { totalBruto, totalDeducciones, totalNeto, pagadas };
  }, [rows]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/libros" label="Libros Contables" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
              <Users className="h-3.5 w-3.5" /> LOTTT · Arts. 98-105 · SSO · FAOV · INCES
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Libro de <span className="text-primary">Nómina</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Registro quincenal · Deducciones legales · LOTTT / LOPCYMAT</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      {rows.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Total Bruto</span>
              <Banknote className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{formatCurrency(summary.totalBruto, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Deducciones</span>
              <TrendingDown className="h-4 w-4 text-rose-500" />
            </div>
            <p className="text-2xl font-bold text-rose-500">{formatCurrency(summary.totalDeducciones, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Neto Pagado</span>
              <Wallet className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-500">{formatCurrency(summary.totalNeto, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Nóminas Pagadas</span>
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{summary.pagadas} / {rows.length}</p>
          </Card>
        </div>
      )}

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" /> Historial de Nóminas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando nóminas...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin nóminas procesadas</p>
              <p className="text-xs text-muted-foreground/70">Las nóminas aparecerán aquí al ser generadas en el módulo de RRHH.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Período</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Fecha Pago</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Empleados</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Salario Bruto</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Deducciones</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Neto a Pagar</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((n) => (
                  <TableRow key={n.id} className="hover:bg-muted/10">
                    <TableCell className="pl-6 py-4 text-xs font-semibold">{n.periodo}</TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground whitespace-nowrap">{n.fecha}</TableCell>
                    <TableCell className="py-4 font-mono text-xs">{n.empleados || '—'}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm">{formatCurrency(parseFloat(n.bruto), 'Bs.')}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm text-rose-500">{formatCurrency(parseFloat(n.deducciones), 'Bs.')}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm font-bold text-emerald-500">{formatCurrency(parseFloat(n.neto), 'Bs.')}</TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <Badge className={cn("text-[10px] font-semibold border-none",
                        n.estado === 'pagada' ? 'bg-emerald-500/10 text-emerald-500' :
                        n.estado === 'procesada' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-muted text-muted-foreground'
                      )}>
                        {n.estado}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {rows.length > 0 && (
          <CardFooter className="p-6 border-t">
            <p className="text-xs text-muted-foreground">LOTTT · SSO 4% · FAOV 2% · INCES 2% · ISLR variable</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
