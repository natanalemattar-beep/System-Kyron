"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  Package, Search, Loader2, Inbox, Printer,
  Box, TrendingUp, BarChart3, ChevronLeft, ChevronRight, AlertTriangle
} from "lucide-react";

interface Item {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  cantidad: string;
  precio: string;
  unidad: string;
}

export default function LibroInventarioPage() {
  const [rows, setRows] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('/api/contabilidad/records?type=inventario')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return rows.filter(i =>
      !search || i.nombre?.toLowerCase().includes(search.toLowerCase()) || i.codigo?.toLowerCase().includes(search.toLowerCase()) || i.categoria?.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const summary = useMemo(() => {
    const totalValor = rows.reduce((s, i) => s + (parseFloat(i.cantidad || '0') * parseFloat(i.precio || '0')), 0);
    const categorias = [...new Set(rows.map(i => i.categoria))].length;
    const totalItems = rows.reduce((s, i) => s + parseInt(i.cantidad || '0'), 0);
    const lowStock = rows.filter(i => parseInt(i.cantidad || '0') < 5).length;
    return { totalValor, categorias, totalItems, lowStock };
  }, [rows]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/libros" label="Libros Contables" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
              <Box className="h-3.5 w-3.5" /> Libro Obligatorio · Art. 35 C. Comercio
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Libro de <span className="text-primary">Inventario</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Control de existencias · Valoración de activos · VEN-NIF</p>
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
              <span className="text-xs font-semibold text-muted-foreground">Productos</span>
              <Package className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold">{rows.length}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{summary.categorias} categorías</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Unidades Total</span>
              <BarChart3 className="h-4 w-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-bold text-emerald-500">{summary.totalItems}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Valoración Total</span>
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">{formatCurrency(summary.totalValor, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Stock Bajo</span>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <p className={cn("text-2xl font-bold", summary.lowStock > 0 ? "text-amber-500" : "text-emerald-500")}>{summary.lowStock}</p>
          </Card>
        </div>
      )}

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por código, nombre o categoría..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Box className="h-4 w-4 text-primary" /> Inventario de Bienes y Mercancías
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando inventario...</span>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin productos en inventario</p>
              <p className="text-xs text-muted-foreground/70">Los productos aparecerán aquí al ser registrados.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Código</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Producto</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Categoría</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Cantidad</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Unidad</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Precio Unit.</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Valor Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((i) => {
                  const valorTotal = parseFloat(i.cantidad || '0') * parseFloat(i.precio || '0');
                  const isLow = parseInt(i.cantidad || '0') < 5;
                  return (
                    <TableRow key={i.id} className="hover:bg-muted/10">
                      <TableCell className="pl-6 py-4 font-mono text-xs font-bold text-primary">{i.codigo}</TableCell>
                      <TableCell className="py-4 text-xs font-semibold">{i.nombre}</TableCell>
                      <TableCell className="py-4">
                        <Badge className="text-[10px] font-semibold border-none bg-muted text-muted-foreground">{i.categoria}</Badge>
                      </TableCell>
                      <TableCell className="text-right py-4">
                        <span className={cn("font-mono text-sm font-semibold", isLow ? "text-amber-500" : "text-foreground")}>
                          {i.cantidad}
                        </span>
                        {isLow && <AlertTriangle className="inline-block ml-2 h-3 w-3 text-amber-500" />}
                      </TableCell>
                      <TableCell className="text-right py-4 text-xs text-muted-foreground">{i.unidad}</TableCell>
                      <TableCell className="text-right py-4 font-mono text-sm">{formatCurrency(parseFloat(i.precio), 'Bs.')}</TableCell>
                      <TableCell className="text-right pr-6 py-4 font-mono text-sm font-bold text-primary">{formatCurrency(valorTotal, 'Bs.')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {rows.length > 0 && (
          <CardFooter className="p-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">Valoración al costo · Método promedio ponderado</p>
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
