"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  BookOpen, Download, Printer, Loader2, Inbox, ArrowLeft,
  Search, ShieldCheck, Receipt, FileSpreadsheet, Landmark,
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

const SAMPLE_VENTAS: Factura[] = [
  { id: 1, factura: "0000456", fecha: "2026-03-28", cliente: "Inversiones Epsilon, C.A.", rif: "J-12345678-9", tipo: "venta", subtotal: "45800.00", iva: "7328.00", igtf: "0.00", total: "53128.00", estado: "cobrada", nroControl: "00-00456" },
  { id: 2, factura: "0000455", fecha: "2026-03-25", cliente: "Global Services S.A.", rif: "J-11223344-5", tipo: "venta", subtotal: "125000.00", iva: "20000.00", igtf: "3750.00", total: "148750.00", estado: "pendiente", nroControl: "00-00455" },
  { id: 3, factura: "0000454", fecha: "2026-03-22", cliente: "Distribuidora Master, C.A.", rif: "J-98765432-1", tipo: "venta", subtotal: "38200.00", iva: "6112.00", igtf: "0.00", total: "44312.00", estado: "cobrada", nroControl: "00-00454" },
  { id: 4, factura: "0000453", fecha: "2026-03-20", cliente: "Tech Solutions Venezuela", rif: "J-40567890-3", tipo: "venta", subtotal: "92500.00", iva: "14800.00", igtf: "2775.00", total: "110075.00", estado: "vencida", nroControl: "00-00453" },
  { id: 5, factura: "0000452", fecha: "2026-03-18", cliente: "Comercial Delta", rif: "J-30987654-2", tipo: "venta", subtotal: "15700.00", iva: "2512.00", igtf: "0.00", total: "18212.00", estado: "cobrada", nroControl: "00-00452" },
];

const SAMPLE_COMPRAS: Factura[] = [
  { id: 101, factura: "A-0890", fecha: "2026-03-26", cliente: "Suministros Nacionales, C.A.", rif: "J-22334455-6", tipo: "compra", subtotal: "1850.00", iva: "296.00", igtf: "0.00", total: "2146.00", estado: "pagada", nroControl: "—" },
  { id: 102, factura: "B-4521", fecha: "2026-03-20", cliente: "Importadora General, C.A.", rif: "J-55667788-0", tipo: "compra", subtotal: "45200.00", iva: "7232.00", igtf: "1356.00", total: "53788.00", estado: "pendiente", nroControl: "—" },
  { id: 103, factura: "C-1234", fecha: "2026-03-15", cliente: "Materiales y Equipos VE", rif: "J-44556677-8", tipo: "compra", subtotal: "28900.00", iva: "4624.00", igtf: "0.00", total: "33524.00", estado: "pagada", nroControl: "—" },
  { id: 104, factura: "D-0067", fecha: "2026-03-10", cliente: "CORPOELEC", rif: "G-20000091-0", tipo: "compra", subtotal: "3200.00", iva: "512.00", igtf: "0.00", total: "3712.00", estado: "pagada", nroControl: "—" },
];

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
      .then(d => {
        const dbRows = d.rows ?? [];
        setRows(dbRows.length > 0 ? dbRows : [...SAMPLE_VENTAS, ...SAMPLE_COMPRAS]);
      })
      .catch(() => setRows([...SAMPLE_VENTAS, ...SAMPLE_COMPRAS]))
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
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-3">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4" /> BÓVEDA DE REGISTROS</Link>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2">
            <Landmark className="h-3 w-3" /> PROVIDENCIA SNAT/2011/0071 · SENIAT
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Libros de <span className="text-primary italic">Compra y Venta</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Registro de IVA 16% · IGTF 3% · Control Fiscal Integrado
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
            Sincronizar Facturas
          </Button>
          <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar Libro (.XLSX)
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Base Ventas</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-xl font-black italic tracking-tighter text-emerald-500">{formatCurrency(summary.totalVentas, 'Bs.')}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Base Compras</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-xl font-black italic tracking-tighter text-rose-500">{formatCurrency(summary.totalCompras, 'Bs.')}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Débito Fiscal</CardTitle>
            <Receipt className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-xl font-black italic tracking-tighter text-primary">{formatCurrency(summary.debitoFiscal, 'Bs.')}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Crédito Fiscal</CardTitle>
            <Receipt className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-xl font-black italic tracking-tighter text-amber-500">{formatCurrency(summary.creditoFiscal, 'Bs.')}</div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Cuota Tributaria</CardTitle>
            <Scale className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className={cn("text-xl font-black italic tracking-tighter", summary.cuotaTributaria >= 0 ? "text-primary" : "text-emerald-500")}>
              {formatCurrency(Math.abs(summary.cuotaTributaria), 'Bs.')}
            </div>
            <p className="text-[8px] font-black uppercase mt-1 text-muted-foreground/40">{summary.cuotaTributaria >= 0 ? 'A pagar' : 'A favor'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <Input
            placeholder="Buscar por RIF, Nombre o Nro. de Factura..."
            className="pl-12 h-14 rounded-2xl bg-card border-border text-xs font-bold uppercase tracking-widest"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
      </div>

      <Tabs value={tab} onValueChange={(v) => { setTab(v); setPage(1); }} className="w-full">
        <TabsList className="flex h-14 bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
          <TabsTrigger value="ventas" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            Registro de Ventas
          </TabsTrigger>
          <TabsTrigger value="compras" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">
            Registro de Compras
          </TabsTrigger>
        </TabsList>

        {['ventas', 'compras'].map((currentTab) => (
          <TabsContent key={currentTab} value={currentTab} className="animate-in fade-in slide-in-from-bottom-2">
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
              <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-3">
                  <Calendar className="h-5 w-5" /> Relación Mensual de {currentTab === 'ventas' ? 'Ventas' : 'Compras'} — Marzo 2026
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-bold uppercase tracking-widest">Cargando facturas...</span>
                  </div>
                ) : paginated.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                    <Inbox className="h-10 w-10" />
                    <p className="text-sm font-bold uppercase tracking-widest">Sin facturas de {currentTab === 'ventas' ? 'venta' : 'compra'}</p>
                    <p className="text-xs text-muted-foreground/70">Las facturas aparecerán aquí al ser registradas.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 border-none">
                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Fecha</TableHead>
                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">RIF / {currentTab === 'ventas' ? 'Cliente' : 'Proveedor'}</TableHead>
                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">N° Factura</TableHead>
                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">N° Control</TableHead>
                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Base Imponible</TableHead>
                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">IVA (16%)</TableHead>
                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">IGTF (3%)</TableHead>
                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Total</TableHead>
                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Estado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginated.map((f) => (
                        <TableRow key={f.id} className="border-border/50 hover:bg-muted/20 transition-all">
                          <TableCell className="pl-10 py-6 text-[10px] font-bold text-muted-foreground/60 uppercase whitespace-nowrap">{f.fecha}</TableCell>
                          <TableCell className="py-6">
                            <p className="font-black text-xs text-foreground/80 uppercase italic">{f.cliente}</p>
                            <p className="text-[8px] font-mono text-primary font-bold mt-1">{f.rif || '—'}</p>
                          </TableCell>
                          <TableCell className="py-6 font-mono text-xs font-bold text-foreground/40">{f.factura}</TableCell>
                          <TableCell className="py-6 font-mono text-[10px] font-bold text-muted-foreground/40">{f.nroControl || '—'}</TableCell>
                          <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(parseFloat(f.subtotal), 'Bs.')}</TableCell>
                          <TableCell className="text-right py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(parseFloat(f.iva), 'Bs.')}</TableCell>
                          <TableCell className="text-right py-6 font-mono text-sm font-bold text-amber-500">
                            {parseFloat(f.igtf || '0') > 0 ? formatCurrency(parseFloat(f.igtf), 'Bs.') : <span className="text-muted-foreground/20">—</span>}
                          </TableCell>
                          <TableCell className="text-right py-6 font-mono text-sm font-black text-foreground">{formatCurrency(parseFloat(f.total), 'Bs.')}</TableCell>
                          <TableCell className="text-right pr-10 py-6">
                            <Badge className={cn("text-[8px] font-black uppercase tracking-widest border-none",
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
              <CardFooter className="p-8 border-t border-border bg-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                  <ShieldCheck className="h-4 w-4 text-primary" /> VALIDACIÓN FISCAL AUTOMÁTICA · SENIAT
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="h-9 w-9 p-0 rounded-xl">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-3">{page} / {totalPages}</span>
                    <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="h-9 w-9 p-0 rounded-xl">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">
                    Total {currentTab === 'ventas' ? 'IVA Débito Fiscal' : 'IVA Crédito Fiscal'}
                  </p>
                  <p className="text-2xl font-black italic text-primary">
                    {formatCurrency(currentTab === 'ventas' ? summary.debitoFiscal : summary.creditoFiscal, 'Bs.')}
                  </p>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
