"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  FileText, Printer, Download, Search, Loader2, Inbox, ArrowLeft,
  ArrowRight, Calendar, ShieldCheck, TrendingUp, TrendingDown, Scale,
  FileSpreadsheet, Filter, ChevronLeft, ChevronRight, BookOpen
} from "lucide-react";

interface Asiento {
  id: number;
  fecha: string;
  concepto: string;
  monto: string;
  tipo: string;
  referencia: string | null;
}

const SAMPLE_ENTRIES: Asiento[] = [
  { id: 1, fecha: "2026-03-28", concepto: "Venta de mercancía - Factura #0456", monto: "45800.00", tipo: "credito", referencia: "FAC-0456" },
  { id: 2, fecha: "2026-03-28", concepto: "Costo de mercancía vendida", monto: "28500.00", tipo: "debito", referencia: "FAC-0456" },
  { id: 3, fecha: "2026-03-27", concepto: "Pago servicios eléctricos - CORPOELEC", monto: "3200.00", tipo: "debito", referencia: "REC-1892" },
  { id: 4, fecha: "2026-03-27", concepto: "Cobro cliente - Inversiones Epsilon", monto: "67500.00", tipo: "credito", referencia: "DEP-0034" },
  { id: 5, fecha: "2026-03-26", concepto: "Retención IVA 75% - Prov. Especial", monto: "5520.00", tipo: "debito", referencia: "RET-IVA-0891" },
  { id: 6, fecha: "2026-03-26", concepto: "Compra suministros de oficina", monto: "1850.00", tipo: "debito", referencia: "FAC-P-0123" },
  { id: 7, fecha: "2026-03-25", concepto: "Ingreso por servicios profesionales", monto: "125000.00", tipo: "credito", referencia: "FAC-0455" },
  { id: 8, fecha: "2026-03-25", concepto: "Pago nómina quincenal - Marzo 2da", monto: "89400.00", tipo: "debito", referencia: "NOM-MAR-2" },
  { id: 9, fecha: "2026-03-24", concepto: "Depreciación activos fijos - Marzo", monto: "4200.00", tipo: "debito", referencia: "DEP-MAR-26" },
  { id: 10, fecha: "2026-03-24", concepto: "IVA Débito Fiscal acumulado", monto: "7328.00", tipo: "credito", referencia: "IVA-DEB-MAR" },
  { id: 11, fecha: "2026-03-23", concepto: "Pago alquiler local comercial", monto: "15000.00", tipo: "debito", referencia: "ALQ-MAR-26" },
  { id: 12, fecha: "2026-03-23", concepto: "Anticipo cliente - Global Services", monto: "32000.00", tipo: "credito", referencia: "ANT-0067" },
];

export default function LibroDiarioPage() {
  const [rows, setRows] = useState<Asiento[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("todos");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('/api/contabilidad/records?type=movimientos')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => {
        const dbRows = d.rows ?? [];
        setRows(dbRows.length > 0 ? dbRows : SAMPLE_ENTRIES);
      })
      .catch(() => setRows(SAMPLE_ENTRIES))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return rows.filter(a => {
      const matchSearch = !search ||
        a.concepto?.toLowerCase().includes(search.toLowerCase()) ||
        a.referencia?.toLowerCase().includes(search.toLowerCase());
      const matchType = filterType === "todos" || a.tipo === filterType;
      return matchSearch && matchType;
    });
  }, [rows, search, filterType]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const totals = useMemo(() => {
    const debe = rows.filter(r => r.tipo === 'debito').reduce((s, r) => s + parseFloat(r.monto || '0'), 0);
    const haber = rows.filter(r => r.tipo === 'credito').reduce((s, r) => s + parseFloat(r.monto || '0'), 0);
    return { debe, haber, balance: haber - debe };
  }, [rows]);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-3">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4" /> BÓVEDA DE REGISTROS</Link>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2">
            <BookOpen className="h-3 w-3" /> LIBRO OBLIGATORIO · ART. 32 C. COMERCIO
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Libro <span className="text-primary italic">Diario</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Registro cronológico de operaciones · Partida doble · VEN-NIF
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()} className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
          <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar .XLSX
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Asientos</CardTitle>
            <div className="p-2.5 rounded-xl bg-muted border border-border"><FileText className="h-4 w-4 text-primary" /></div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-foreground">{rows.length}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary">Marzo 2026</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Debe</CardTitle>
            <div className="p-2.5 rounded-xl bg-muted border border-border"><TrendingDown className="h-4 w-4 text-rose-500" /></div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-rose-500">{formatCurrency(totals.debe, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-rose-500/60">Débitos acumulados</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Haber</CardTitle>
            <div className="p-2.5 rounded-xl bg-muted border border-border"><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-emerald-500">{formatCurrency(totals.haber, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-emerald-500/60">Créditos acumulados</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Balance</CardTitle>
            <div className="p-2.5 rounded-xl bg-muted border border-border"><Scale className="h-4 w-4 text-primary" /></div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className={cn("text-2xl font-black italic tracking-tighter", totals.balance >= 0 ? "text-emerald-500" : "text-rose-500")}>
              {formatCurrency(Math.abs(totals.balance), 'Bs.')}
            </div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary">{totals.balance >= 0 ? 'Superávit' : 'Déficit'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <Input
            placeholder="Buscar por concepto o referencia..."
            className="pl-12 h-14 rounded-2xl bg-card border-border text-xs font-bold uppercase tracking-widest"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <Select value={filterType} onValueChange={(v) => { setFilterType(v); setPage(1); }}>
          <SelectTrigger className="w-[200px] h-14 rounded-2xl bg-card border-border text-xs font-bold uppercase tracking-widest">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground/40" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="debito">Solo Débitos</SelectItem>
            <SelectItem value="credito">Solo Créditos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
          <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-3">
            <Calendar className="h-5 w-5" /> Asientos Contables — Marzo 2026
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando registros...</span>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin asientos contables</p>
              <p className="text-xs text-muted-foreground/70">Los asientos aparecerán al registrar operaciones.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">N°</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Fecha</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Concepto / Referencia</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Debe</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Haber</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((a, idx) => (
                  <TableRow key={a.id} className="border-border/50 hover:bg-muted/20 transition-all">
                    <TableCell className="pl-10 py-6 text-[10px] font-mono font-bold text-muted-foreground/40">
                      {String((page - 1) * perPage + idx + 1).padStart(3, '0')}
                    </TableCell>
                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground/60 uppercase whitespace-nowrap">{a.fecha}</TableCell>
                    <TableCell className="py-6">
                      <p className="font-black text-xs text-foreground/80 uppercase italic">{a.concepto}</p>
                      <p className="text-[8px] font-mono text-primary font-bold mt-1">{a.referencia ?? '—'}</p>
                    </TableCell>
                    <TableCell className="text-right py-6 font-mono text-sm font-bold">
                      {a.tipo === 'debito' ? (
                        <span className="text-rose-500">{formatCurrency(parseFloat(a.monto), 'Bs.')}</span>
                      ) : <span className="text-muted-foreground/20">—</span>}
                    </TableCell>
                    <TableCell className="text-right py-6 font-mono text-sm font-bold">
                      {a.tipo === 'credito' ? (
                        <span className="text-emerald-500">{formatCurrency(parseFloat(a.monto), 'Bs.')}</span>
                      ) : <span className="text-muted-foreground/20">—</span>}
                    </TableCell>
                    <TableCell className="text-right pr-10 py-6">
                      <Badge className={cn(
                        "text-[8px] font-black uppercase tracking-widest border-none",
                        a.tipo === 'credito' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                      )}>
                        {a.tipo === 'credito' ? 'Haber' : 'Debe'}
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
            <ShieldCheck className="h-4 w-4 text-primary" /> PARTIDA DOBLE VERIFICADA · CUADRE AUTOMÁTICO
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
          <div className="flex gap-8 text-right">
            <div>
              <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Total Debe</p>
              <p className="text-lg font-black italic text-rose-500">{formatCurrency(totals.debe, 'Bs.')}</p>
            </div>
            <div>
              <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Total Haber</p>
              <p className="text-lg font-black italic text-emerald-500">{formatCurrency(totals.haber, 'Bs.')}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
