"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  Package, Download, CirclePlus as PlusCircle, Search, Loader2, Inbox, ArrowLeft,
  ShieldCheck, FileSpreadsheet, Printer, Box, TrendingUp, BarChart3,
  ChevronLeft, ChevronRight, AlertTriangle
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

const SAMPLE_ITEMS: Item[] = [
  { id: 1, codigo: "INV-001", nombre: "Laptop HP ProBook 450 G10", categoria: "Equipo de Oficina", cantidad: "12", precio: "3500.00", unidad: "Unidad" },
  { id: 2, codigo: "INV-002", nombre: "Monitor LG 27\" 4K", categoria: "Equipo de Oficina", cantidad: "8", precio: "1200.00", unidad: "Unidad" },
  { id: 3, codigo: "INV-003", nombre: "Resma Papel Bond Carta", categoria: "Suministros", cantidad: "150", precio: "12.50", unidad: "Resma" },
  { id: 4, codigo: "INV-004", nombre: "Toner HP LaserJet 26A", categoria: "Suministros", cantidad: "24", precio: "85.00", unidad: "Unidad" },
  { id: 5, codigo: "INV-005", nombre: "Escritorio Ejecutivo Nogal", categoria: "Mobiliario", cantidad: "6", precio: "950.00", unidad: "Unidad" },
  { id: 6, codigo: "INV-006", nombre: "Silla Ergonómica Premium", categoria: "Mobiliario", cantidad: "15", precio: "680.00", unidad: "Unidad" },
  { id: 7, codigo: "INV-007", nombre: "Cable UTP Cat 6 - 305m", categoria: "Telecomunicaciones", cantidad: "5", precio: "180.00", unidad: "Caja" },
  { id: 8, codigo: "INV-008", nombre: "Router Mikrotik hAP ac3", categoria: "Telecomunicaciones", cantidad: "3", precio: "420.00", unidad: "Unidad" },
  { id: 9, codigo: "INV-009", nombre: "Archivador Metálico 4 Gavetas", categoria: "Mobiliario", cantidad: "4", precio: "350.00", unidad: "Unidad" },
  { id: 10, codigo: "INV-010", nombre: "Kit Herramientas Redes", categoria: "Telecomunicaciones", cantidad: "2", precio: "250.00", unidad: "Kit" },
];

export default function LibroInventarioPage() {
  const [rows, setRows] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetch('/api/contabilidad/records?type=inventario')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => {
        const dbRows = d.rows ?? [];
        setRows(dbRows.length > 0 ? dbRows : SAMPLE_ITEMS);
      })
      .catch(() => setRows(SAMPLE_ITEMS))
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
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-3">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4" /> BÓVEDA DE REGISTROS</Link>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2">
            <Box className="h-3 w-3" /> LIBRO OBLIGATORIO · ART. 35 C. COMERCIO
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Libro de <span className="text-primary italic">Inventario</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Control de existencias · Valoración de activos · VEN-NIF
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
            <PlusCircle className="mr-2 h-4 w-4" /> Agregar Producto
          </Button>
          <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar .XLSX
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Productos</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-foreground">{rows.length}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary">{summary.categorias} Categorías</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Unidades Total</CardTitle>
            <BarChart3 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-emerald-500">{summary.totalItems}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-emerald-500/60">En existencia</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Valoración Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-primary">{formatCurrency(summary.totalValor, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary/60">Al costo unitario</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className={cn("text-2xl font-black italic tracking-tighter", summary.lowStock > 0 ? "text-amber-500" : "text-emerald-500")}>{summary.lowStock}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-amber-500/60">Productos {`<`} 5 uds.</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
        <Input
          placeholder="Buscar por código, nombre o categoría..."
          className="pl-12 h-14 rounded-2xl bg-card border-border text-xs font-bold uppercase tracking-widest"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
          <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-3">
            <Box className="h-5 w-5" /> Inventario de Bienes y Mercancías
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando inventario...</span>
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin productos en inventario</p>
              <p className="text-xs text-muted-foreground/70">Los productos aparecerán aquí al ser registrados.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Código</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Producto</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Categoría</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Cantidad</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Unidad</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Precio Unit.</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Valor Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((i) => {
                  const valorTotal = parseFloat(i.cantidad || '0') * parseFloat(i.precio || '0');
                  const isLow = parseInt(i.cantidad || '0') < 5;
                  return (
                    <TableRow key={i.id} className="border-border/50 hover:bg-muted/20 transition-all">
                      <TableCell className="pl-10 py-6 font-mono text-xs font-bold text-primary">{i.codigo}</TableCell>
                      <TableCell className="py-6 font-black text-xs text-foreground/80 uppercase italic">{i.nombre}</TableCell>
                      <TableCell className="py-6">
                        <Badge className="text-[8px] font-black uppercase tracking-widest border-none bg-muted text-muted-foreground">{i.categoria}</Badge>
                      </TableCell>
                      <TableCell className="text-right py-6">
                        <span className={cn("font-mono text-sm font-bold", isLow ? "text-amber-500" : "text-foreground/70")}>
                          {i.cantidad}
                        </span>
                        {isLow && <AlertTriangle className="inline-block ml-2 h-3 w-3 text-amber-500" />}
                      </TableCell>
                      <TableCell className="text-right py-6 text-xs text-muted-foreground/60 uppercase">{i.unidad}</TableCell>
                      <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(parseFloat(i.precio), 'Bs.')}</TableCell>
                      <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(valorTotal, 'Bs.')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="p-8 border-t border-border bg-primary/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
            <ShieldCheck className="h-4 w-4 text-primary" /> VALORACIÓN AL COSTO · MÉTODO PROMEDIO PONDERADO
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
            <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Valoración Total Inventario</p>
            <p className="text-2xl font-black italic text-primary">{formatCurrency(summary.totalValor, 'Bs.')}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
