"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { HandCoins, Search, Loader2, Inbox, Printer, AlertTriangle, TrendingDown, Users, Clock } from "lucide-react";

interface CuentaPagar {
  id: string;
  proveedor: string;
  rif: string;
  factura: string;
  fechaVencimiento: string;
  monto: number;
  saldo: number;
  estado: string;
}

export default function CuentasPorPagarPage() {
  const [rows, setRows] = useState<CuentaPagar[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/contabilidad/records?type=cuentas_pagar')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return rows.filter(r =>
      !search || r.proveedor?.toLowerCase().includes(search.toLowerCase()) || r.factura?.includes(search)
    );
  }, [rows, search]);

  const summary = useMemo(() => {
    const totalSaldo = rows.reduce((s, r) => s + (r.saldo || 0), 0);
    const vencidas = rows.filter(r => r.estado === 'Vencida');
    const totalVencido = vencidas.reduce((s, r) => s + (r.saldo || 0), 0);
    return { totalSaldo, totalVencido, proveedores: new Set(rows.map(r => r.proveedor)).size, vencidas: vencidas.length };
  }, [rows]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <HandCoins className="h-3.5 w-3.5" /> Pasivos Corrientes
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Cuentas <span className="text-primary">por Pagar</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Gestión de proveedores · Compromisos de pago · Control de vencimientos</p>
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
              <span className="text-xs font-semibold text-muted-foreground">Deuda Total</span>
              <TrendingDown className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-black">{formatCurrency(summary.totalSaldo, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Monto en Mora</span>
              <AlertTriangle className="h-4 w-4 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-rose-500">{formatCurrency(summary.totalVencido, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Proveedores</span>
              <Users className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black">{summary.proveedores}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Facturas Vencidas</span>
              <Clock className="h-4 w-4 text-amber-500" />
            </div>
            <p className={cn("text-2xl font-black", summary.vencidas > 0 ? "text-amber-500" : "text-emerald-500")}>{summary.vencidas}</p>
          </Card>
        </div>
      )}

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por proveedor o factura..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <HandCoins className="h-4 w-4 text-primary" /> Obligaciones Pendientes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando obligaciones...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin cuentas por pagar</p>
              <p className="text-xs text-muted-foreground/70">Las obligaciones aparecerán al registrar facturas de compra a crédito.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Proveedor</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Factura</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Vencimiento</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Monto</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Saldo</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((r) => (
                  <TableRow key={r.id} className="hover:bg-muted/10">
                    <TableCell className="pl-6 py-4">
                      <p className="text-xs font-semibold">{r.proveedor}</p>
                      <p className="text-[11px] font-mono text-muted-foreground mt-0.5">{r.id}</p>
                    </TableCell>
                    <TableCell className="py-4 font-mono text-xs text-muted-foreground">{r.factura}</TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground">{r.fechaVencimiento}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm">{formatCurrency(r.monto, 'Bs.')}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm font-bold">{formatCurrency(r.saldo, 'Bs.')}</TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <Badge className={cn("text-[10px] font-semibold border-none",
                        r.estado === 'Pagada' ? 'bg-emerald-500/10 text-emerald-500' :
                        r.estado === 'Vencida' ? 'bg-rose-500/10 text-rose-500' :
                        'bg-amber-500/10 text-amber-500'
                      )}>{r.estado}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
