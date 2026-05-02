"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  Wine, Search, Loader2, Inbox, Printer,
  Package, ChartColumn, AlertTriangle
} from "lucide-react";

interface ItemLicor {
  id: number;
  codigo: string;
  nombre: string;
  tipo: string;
  grado: string;
  cantidad: string;
  precio: string;
  unidad: string;
  lote: string;
  fechaIngreso: string;
  estado: string;
}

export default function ControlLicoresPage() {
  const [rows, setRows] = useState<ItemLicor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/contabilidad/records?type=licores')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => setRows(d.rows ?? []))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return rows.filter(i =>
      !search || i.nombre?.toLowerCase().includes(search.toLowerCase()) || i.codigo?.toLowerCase().includes(search.toLowerCase()) || i.tipo?.toLowerCase().includes(search.toLowerCase())
    );
  }, [rows, search]);

  const summary = useMemo(() => {
    const totalUnidades = rows.reduce((s, i) => s + parseInt(i.cantidad || '0'), 0);
    const totalValor = rows.reduce((s, i) => s + (parseInt(i.cantidad || '0') * parseFloat(i.precio || '0')), 0);
    const tipos = [...new Set(rows.map(i => i.tipo))].length;
    const stockBajo = rows.filter(i => parseInt(i.cantidad || '0') < 10).length;
    return { totalUnidades, totalValor, tipos, stockBajo };
  }, [rows]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/libros" label="Libros Contables" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[10px] font-semibold uppercase tracking-wide text-rose-500 mb-3">
              <Wine className="h-3.5 w-3.5" /> Ley de Impuesto sobre Alcohol y Especies Alcohólicas
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Control de <span className="text-rose-500">Licores</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Registro obligatorio SENIAT · Especies alcohólicas · Timbres fiscales</p>
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
              <span className="text-xs font-semibold text-muted-foreground">Total Unidades</span>
              <Package className="h-4 w-4 text-rose-500" />
            </div>
            <p className="text-2xl font-bold">{summary.totalUnidades}</p>
            <p className="text-[11px] text-muted-foreground mt-1">{summary.tipos} tipos de bebida</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Valoración</span>
              <ChartColumn className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">{formatCurrency(summary.totalValor, 'Bs.')}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Productos</span>
              <Wine className="h-4 w-4 text-rose-500" />
            </div>
            <p className="text-2xl font-bold">{rows.length}</p>
          </Card>
          <Card className="rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground">Stock Bajo</span>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
            </div>
            <p className={cn("text-2xl font-bold", summary.stockBajo > 0 ? "text-amber-500" : "text-emerald-500")}>{summary.stockBajo}</p>
          </Card>
        </div>
      )}

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por código, nombre o tipo..."
          className="pl-12 h-12 rounded-xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Wine className="h-4 w-4 text-rose-500" /> Registro de Especies Alcohólicas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando registros...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin registros de especies alcohólicas</p>
              <p className="text-xs text-muted-foreground/70">Los movimientos aparecerán al registrar entradas y salidas.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Código</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Producto</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Tipo</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Grado</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Lote</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Ingreso</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Cantidad</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Precio Unit.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((i) => {
                  const isLow = parseInt(i.cantidad || '0') < 10;
                  return (
                    <TableRow key={i.id} className="hover:bg-muted/10">
                      <TableCell className="pl-6 py-4 font-mono text-xs font-bold text-rose-500">{i.codigo}</TableCell>
                      <TableCell className="py-4 text-xs font-semibold">{i.nombre}</TableCell>
                      <TableCell className="py-4">
                        <Badge className="text-[10px] font-semibold border-none bg-rose-500/10 text-rose-500">{i.tipo}</Badge>
                      </TableCell>
                      <TableCell className="py-4 font-mono text-xs text-muted-foreground">{i.grado}</TableCell>
                      <TableCell className="py-4 text-xs font-mono text-muted-foreground">{i.lote}</TableCell>
                      <TableCell className="py-4 text-xs text-muted-foreground">{i.fechaIngreso}</TableCell>
                      <TableCell className="text-right py-4">
                        <span className={cn("font-mono text-sm font-semibold", isLow ? "text-amber-500" : "text-foreground")}>
                          {i.cantidad}
                        </span>
                        {isLow && <AlertTriangle className="inline-block ml-2 h-3 w-3 text-amber-500" />}
                      </TableCell>
                      <TableCell className="text-right pr-6 py-4 font-mono text-sm font-bold text-primary">{formatCurrency(parseFloat(i.precio), 'Bs.')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {rows.length > 0 && (
          <CardFooter className="p-6 border-t">
            <p className="text-xs text-muted-foreground">SENIAT · Timbres fiscales verificados · Ley de Alcohol</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
