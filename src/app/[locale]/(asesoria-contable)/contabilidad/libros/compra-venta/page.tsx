"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  Printer, Loader2, Inbox, Search, Receipt, Landmark,
  TrendingUp, TrendingDown, Scale, Calendar, ChevronLeft, ChevronRight
} from "lucide-react";

interface Factura {
  id: number;
  factura: string;
  fecha: string;
  cliente: string;
  rif: string;
  tipo: string;
  subtotal: string;
  iva: string;
  igtf: string;
  total: string;
  estado: string;
  nroControl: string;
}

export default function LibroCompraVentaPage() {
  const [rows, setRows] = useState<Factura[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("ventas");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('/api/contabilidad/records?type=facturas')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const typeKey = tab === 'ventas' ? 'venta' : 'compra';
    return rows.filter(r => {
      const matchType = r.tipo === typeKey;
      const matchSearch = !search ||
        r.cliente?.toLowerCase().includes(search.toLowerCase()) ||
        r.factura?.includes(search) ||
        r.rif?.toLowerCase().includes(search.toLowerCase());
      return matchType && matchSearch;
    });
  }, [rows, tab, search]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const summary = useMemo(() => {
    const ventaRows = rows.filter(r => r.tipo === 'venta');
    const compraRows = rows.filter(r => r.tipo === 'compra');
    const totalVentasIVA = ventaRows.reduce((s, r) => s + parseFloat(r.iva || '0'), 0);
    const totalComprasIVA = compraRows.reduce((s, r) => s + parseFloat(r.iva || '0'), 0);
    const totalVentasBruto = ventaRows.reduce((s, r) => s + parseFloat(r.subtotal || '0'), 0);
    const totalComprasBruto = compraRows.reduce((s, r) => s + parseFloat(r.subtotal || '0'), 0);
    return {
      debitoFiscal: totalVentasIVA,
      creditoFiscal: totalComprasIVA,
      cuotaTributaria: totalVentasIVA - totalComprasIVA,
      totalVentas: totalVentasBruto,
      totalCompras: totalComprasBruto,
    };
  }, [rows]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/libros" label="Libros Contables" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
              <Landmark className="h-3.5 w-3.5" /> Providencia SNAT/2011/0071 · SENIAT
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Libros de <span className="text-primary">Compra y Venta</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Registro de IVA 16% · IGTF 3% · Control Fiscal Integrado</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      {rows.length > 0 && (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { label: "Base Ventas", val: formatCurrency(summary.totalVentas, 'Bs.'), icon: TrendingUp, color: "text-emerald-500" },
            { label: "Base Compras", val: formatCurrency(summary.totalCompras, 'Bs.'), icon: TrendingDown, color: "text-rose-500" },
            { label: "Débito Fiscal", val: formatCurrency(summary.debitoFiscal, 'Bs.'), icon: Receipt, color: "text-primary" },
            { label: "Crédito Fiscal", val: formatCurrency(summary.creditoFiscal, 'Bs.'), icon: Receipt, color: "text-amber-500" },
            { label: "Cuota Tributaria", val: formatCurrency(Math.abs(summary.cuotaTributaria), 'Bs.'), icon: Scale, color: summary.cuotaTributaria >= 0 ? "text-primary" : "text-emerald-500" },
          ].map((kpi, i) => (
            <Card key={i} className="rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-lg font-bold", kpi.color)}>{kpi.val}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por RIF, nombre o Nro. de factura..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      <Tabs value={tab} onValueChange={(v) => { setTab(v); setPage(1); }} className="w-full">
        <TabsList className="flex h-12 border rounded-xl p-1 mb-6 max-w-md">
          <TabsTrigger value="ventas" className="flex-1 rounded-lg font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-white">
            Registro de Ventas
          </TabsTrigger>
          <TabsTrigger value="compras" className="flex-1 rounded-lg font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-white">
            Registro de Compras
          </TabsTrigger>
        </TabsList>

        {['ventas', 'compras'].map((currentTab) => (
          <TabsContent key={currentTab} value={currentTab}>
            <Card className="rounded-2xl border shadow-lg overflow-hidden">
              <CardHeader className="p-6 border-b bg-muted/30">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" /> Relación Mensual de {currentTab === 'ventas' ? 'Ventas' : 'Compras'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-semibold">Cargando facturas...</span>
                  </div>
                ) : paginated.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                    <Inbox className="h-10 w-10" />
                    <p className="text-sm font-bold">Sin facturas de {currentTab === 'ventas' ? 'venta' : 'compra'}</p>
                    <p className="text-xs text-muted-foreground/70">Las facturas aparecerán aquí al ser registradas.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/20">
                        <TableHead className="pl-6 py-4 text-xs font-semibold">Fecha</TableHead>
                        <TableHead className="py-4 text-xs font-semibold">RIF / {currentTab === 'ventas' ? 'Cliente' : 'Proveedor'}</TableHead>
                        <TableHead className="py-4 text-xs font-semibold">N° Factura</TableHead>
                        <TableHead className="text-right py-4 text-xs font-semibold">Base Imponible</TableHead>
                        <TableHead className="text-right py-4 text-xs font-semibold">IVA (16%)</TableHead>
                        <TableHead className="text-right py-4 text-xs font-semibold">IGTF (3%)</TableHead>
                        <TableHead className="text-right py-4 text-xs font-semibold">Total</TableHead>
                        <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginated.map((f) => (
                        <TableRow key={f.id} className="hover:bg-muted/10">
                          <TableCell className="pl-6 py-4 text-xs text-muted-foreground whitespace-nowrap">{f.fecha}</TableCell>
                          <TableCell className="py-4">
                            <p className="text-xs font-semibold">{f.cliente}</p>
                            <p className="text-[11px] font-mono text-primary mt-0.5">{f.rif || '—'}</p>
                          </TableCell>
                          <TableCell className="py-4 font-mono text-xs text-muted-foreground">{f.factura}</TableCell>
                          <TableCell className="text-right py-4 font-mono text-sm">{formatCurrency(parseFloat(f.subtotal), 'Bs.')}</TableCell>
                          <TableCell className="text-right py-4 font-mono text-sm font-semibold text-primary">{formatCurrency(parseFloat(f.iva), 'Bs.')}</TableCell>
                          <TableCell className="text-right py-4 font-mono text-sm text-amber-500">
                            {parseFloat(f.igtf || '0') > 0 ? formatCurrency(parseFloat(f.igtf), 'Bs.') : <span className="text-muted-foreground/30">—</span>}
                          </TableCell>
                          <TableCell className="text-right py-4 font-mono text-sm font-bold">{formatCurrency(parseFloat(f.total), 'Bs.')}</TableCell>
                          <TableCell className="text-right pr-6 py-4">
                            <Badge className={cn("text-[10px] font-semibold border-none",
                              f.estado === 'cobrada' || f.estado === 'pagada' ? 'bg-emerald-500/10 text-emerald-500' :
                              f.estado === 'vencida' ? 'bg-rose-500/10 text-rose-500' :
                              'bg-amber-500/10 text-amber-500'
                            )}>
                              {f.estado}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
              {rows.length > 0 && (
                <CardFooter className="p-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs text-muted-foreground">Validación fiscal automática · SENIAT</p>
                  {totalPages > 1 && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="h-9 w-9 p-0 rounded-xl">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-xs font-semibold text-muted-foreground px-3">{page} / {totalPages}</span>
                      <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="h-9 w-9 p-0 rounded-xl">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
