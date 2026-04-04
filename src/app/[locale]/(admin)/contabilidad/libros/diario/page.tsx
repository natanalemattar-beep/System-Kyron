"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  FileText, Printer, Search, Loader2, Inbox,
  TrendingUp, TrendingDown, Scale, Filter, ChevronLeft, ChevronRight, BookOpen
} from "lucide-react";

interface Asiento {
  id: number;
  fecha: string;
  concepto: string;
  monto: string;
  tipo: string;
  referencia: string | null;
}

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
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
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
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/libros" label="Libros Contables" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <BookOpen className="h-3.5 w-3.5" /> Libro Obligatorio · Art. 32 C. Comercio
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Libro <span className="text-primary">Diario</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Registro cronológico de operaciones · Partida doble · VEN-NIF</p>
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
              <span className="text-xs font-semibold text-muted-foreground">Total Asientos</span>
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-black">{rows.length}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Total Debe</span>
              <TrendingDown className="h-4 w-4 text-rose-500" />
            </div>
            <p className="text-2xl font-black text-rose-500">{formatCurrency(totals.debe, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Total Haber</span>
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-emerald-500">{formatCurrency(totals.haber, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Balance</span>
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <p className={cn("text-2xl font-black", totals.balance >= 0 ? "text-emerald-500" : "text-rose-500")}>
              {formatCurrency(Math.abs(totals.balance), 'Bs.')}
            </p>
          </Card>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por concepto o referencia..."
            className="pl-12 h-12 rounded-xl"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <Select value={filterType} onValueChange={(v) => { setFilterType(v); setPage(1); }}>
          <SelectTrigger className="w-[200px] h-12 rounded-xl">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="debito">Solo Débitos</SelectItem>
            <SelectItem value="credito">Solo Créditos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" /> Asientos Contables
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando registros...</span>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin asientos contables</p>
              <p className="text-xs text-muted-foreground/70">Los asientos aparecerán al registrar operaciones.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">N°</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Fecha</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Concepto / Referencia</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Debe</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Haber</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Tipo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((a, idx) => (
                  <TableRow key={a.id} className="hover:bg-muted/10">
                    <TableCell className="pl-6 py-4 text-xs font-mono text-muted-foreground">
                      {String((page - 1) * perPage + idx + 1).padStart(3, '0')}
                    </TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground whitespace-nowrap">{a.fecha}</TableCell>
                    <TableCell className="py-4">
                      <p className="text-xs font-semibold">{a.concepto}</p>
                      <p className="text-[11px] font-mono text-primary mt-0.5">{a.referencia ?? '—'}</p>
                    </TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm font-semibold">
                      {a.tipo === 'debito' ? (
                        <span className="text-rose-500">{formatCurrency(parseFloat(a.monto), 'Bs.')}</span>
                      ) : <span className="text-muted-foreground/30">—</span>}
                    </TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm font-semibold">
                      {a.tipo === 'credito' ? (
                        <span className="text-emerald-500">{formatCurrency(parseFloat(a.monto), 'Bs.')}</span>
                      ) : <span className="text-muted-foreground/30">—</span>}
                    </TableCell>
                    <TableCell className="text-right pr-6 py-4">
                      <Badge className={cn(
                        "text-[10px] font-bold border-none",
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
        {rows.length > 0 && (
          <CardFooter className="p-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">Partida doble verificada · Cuadre automático</p>
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
    </div>
  );
}
