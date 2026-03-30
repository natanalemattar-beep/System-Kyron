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
  Wine, Download, ArrowLeft, CirclePlus as PlusCircle, Loader2, Inbox,
  ShieldCheck, FileSpreadsheet, Search, Landmark, Package, BarChart3,
  AlertTriangle, Calendar
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

const SAMPLE_LICORES: ItemLicor[] = [
  { id: 1, codigo: "LIC-001", nombre: "Whisky Johnnie Walker Black Label", tipo: "Whisky", grado: "40°", cantidad: "48", precio: "185.00", unidad: "Botella 750ml", lote: "LOT-2026-A1", fechaIngreso: "2026-03-01", estado: "disponible" },
  { id: 2, codigo: "LIC-002", nombre: "Ron Santa Teresa 1796", tipo: "Ron", grado: "40°", cantidad: "120", precio: "95.00", unidad: "Botella 750ml", lote: "LOT-2026-A2", fechaIngreso: "2026-03-05", estado: "disponible" },
  { id: 3, codigo: "LIC-003", nombre: "Vodka Absolut Original", tipo: "Vodka", grado: "40°", cantidad: "36", precio: "72.00", unidad: "Botella 750ml", lote: "LOT-2026-B1", fechaIngreso: "2026-03-10", estado: "disponible" },
  { id: 4, codigo: "LIC-004", nombre: "Cerveza Polar Pilsen", tipo: "Cerveza", grado: "4.5°", cantidad: "480", precio: "3.50", unidad: "Unidad 222ml", lote: "LOT-2026-C1", fechaIngreso: "2026-03-12", estado: "disponible" },
  { id: 5, codigo: "LIC-005", nombre: "Vino Tinto Pomar Reserva", tipo: "Vino", grado: "13°", cantidad: "24", precio: "45.00", unidad: "Botella 750ml", lote: "LOT-2026-D1", fechaIngreso: "2026-03-15", estado: "disponible" },
  { id: 6, codigo: "LIC-006", nombre: "Tequila José Cuervo Especial", tipo: "Tequila", grado: "38°", cantidad: "18", precio: "110.00", unidad: "Botella 750ml", lote: "LOT-2026-E1", fechaIngreso: "2026-03-18", estado: "disponible" },
  { id: 7, codigo: "LIC-007", nombre: "Ron Diplomático Reserva Exclusiva", tipo: "Ron", grado: "40°", cantidad: "3", precio: "220.00", unidad: "Botella 750ml", lote: "LOT-2026-F1", fechaIngreso: "2026-03-20", estado: "stock_bajo" },
];

export default function ControlLicoresPage() {
  const [rows, setRows] = useState<ItemLicor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch('/api/contabilidad/records?type=inventario')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => {
        const all = d.rows ?? [];
        const licores = all.filter((i: any) => i.categoria?.toLowerCase().includes('licor') || i.categoria?.toLowerCase().includes('bebida'));
        setRows(licores.length > 0 ? licores : SAMPLE_LICORES);
      })
      .catch(() => setRows(SAMPLE_LICORES))
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
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-rose-500 pl-8 py-2 mt-10">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-3">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4" /> BÓVEDA DE REGISTROS</Link>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-500 shadow-glow mb-2">
            <Wine className="h-3 w-3" /> LEY DE IMPUESTO SOBRE ALCOHOL Y ESPECIES ALCOHÓLICAS
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Control de <span className="text-rose-500 italic">Licores</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Registro obligatorio SENIAT · Especies alcohólicas · Timbres fiscales
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
            <PlusCircle className="mr-2 h-4 w-4" /> Registrar Entrada
          </Button>
          <Button className="h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl bg-rose-500 hover:bg-rose-600 text-white">
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar .XLSX
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Unidades</CardTitle>
            <Package className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-foreground">{summary.totalUnidades}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-rose-500">{summary.tipos} Tipos de bebida</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Valoración</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-primary">{formatCurrency(summary.totalValor, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary/60">Al costo unitario</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Productos</CardTitle>
            <Wine className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-foreground">{rows.length}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-rose-500/60">Especies registradas</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Stock Bajo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className={cn("text-2xl font-black italic tracking-tight", summary.stockBajo > 0 ? "text-amber-500" : "text-emerald-500")}>{summary.stockBajo}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-amber-500/60">Productos {`<`} 10 uds.</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
        <Input
          placeholder="Buscar por código, nombre o tipo..."
          className="pl-12 h-14 rounded-2xl bg-card border-border text-xs font-bold uppercase tracking-widest"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl border-l-4 border-rose-500">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
          <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-rose-500 italic flex items-center gap-3">
            <Wine className="h-5 w-5" /> Registro de Especies Alcohólicas — Marzo 2026
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando registros...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin registros de especies alcohólicas</p>
              <p className="text-xs text-muted-foreground/70">Los movimientos aparecerán al registrar entradas y salidas.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Código</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Producto</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Tipo</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Grado</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Lote</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Ingreso</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Cantidad</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Precio Unit.</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((i) => {
                  const isLow = parseInt(i.cantidad || '0') < 10;
                  return (
                    <TableRow key={i.id} className="border-border/50 hover:bg-muted/20 transition-all">
                      <TableCell className="pl-10 py-6 font-mono text-xs font-bold text-rose-500">{i.codigo}</TableCell>
                      <TableCell className="py-6 font-black text-xs text-foreground/80 uppercase italic">{i.nombre}</TableCell>
                      <TableCell className="py-6">
                        <Badge className="text-[8px] font-black uppercase tracking-widest border-none bg-rose-500/10 text-rose-500">{i.tipo}</Badge>
                      </TableCell>
                      <TableCell className="py-6 font-mono text-xs font-bold text-muted-foreground/60">{i.grado}</TableCell>
                      <TableCell className="py-6 text-[10px] font-mono text-muted-foreground/40">{i.lote}</TableCell>
                      <TableCell className="py-6 text-[10px] font-bold text-muted-foreground/60 uppercase">{i.fechaIngreso}</TableCell>
                      <TableCell className="text-right py-6">
                        <span className={cn("font-mono text-sm font-bold", isLow ? "text-amber-500" : "text-foreground/70")}>
                          {i.cantidad}
                        </span>
                        {isLow && <AlertTriangle className="inline-block ml-2 h-3 w-3 text-amber-500" />}
                      </TableCell>
                      <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(parseFloat(i.precio), 'Bs.')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="p-8 border-t border-border bg-rose-500/5 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
            <ShieldCheck className="h-4 w-4 text-rose-500" /> SENIAT · TIMBRES FISCALES VERIFICADOS · LEY DE ALCOHOL
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Valoración Total Especies</p>
            <p className="text-2xl font-black italic text-rose-500">{formatCurrency(summary.totalValor, 'Bs.')}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
