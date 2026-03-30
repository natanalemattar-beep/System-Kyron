"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  BookOpen, ArrowLeft, Search, ShieldCheck, TrendingUp, TrendingDown,
  Scale, FileSpreadsheet, Printer, Wallet, Landmark, Receipt,
  Building2, Truck, Users, Banknote, ArrowRight
} from "lucide-react";

interface CuentaMayor {
  codigo: string;
  nombre: string;
  naturaleza: 'deudora' | 'acreedora';
  grupo: string;
  movimientos: {
    fecha: string;
    concepto: string;
    debe: number;
    haber: number;
    ref: string;
  }[];
}

const CUENTAS_MAYOR: CuentaMayor[] = [
  {
    codigo: "1.1.01", nombre: "Caja y Bancos", naturaleza: "deudora", grupo: "Activo Circulante",
    movimientos: [
      { fecha: "2026-03-28", concepto: "Cobro factura #0456", debe: 53128, haber: 0, ref: "DEP-0034" },
      { fecha: "2026-03-27", concepto: "Pago CORPOELEC", debe: 0, haber: 3200, ref: "REC-1892" },
      { fecha: "2026-03-27", concepto: "Cobro Inversiones Epsilon", debe: 67500, haber: 0, ref: "DEP-0034" },
      { fecha: "2026-03-25", concepto: "Pago nómina quincenal", debe: 0, haber: 89400, ref: "NOM-MAR-2" },
      { fecha: "2026-03-23", concepto: "Anticipo Global Services", debe: 32000, haber: 0, ref: "ANT-0067" },
      { fecha: "2026-03-23", concepto: "Pago alquiler", debe: 0, haber: 15000, ref: "ALQ-MAR" },
    ]
  },
  {
    codigo: "1.1.03", nombre: "Cuentas por Cobrar", naturaleza: "deudora", grupo: "Activo Circulante",
    movimientos: [
      { fecha: "2026-03-28", concepto: "Factura #0456 emitida", debe: 53128, haber: 0, ref: "FAC-0456" },
      { fecha: "2026-03-28", concepto: "Cobro factura #0456", debe: 0, haber: 53128, ref: "COB-0456" },
      { fecha: "2026-03-25", concepto: "Factura #0455 servicios", debe: 145000, haber: 0, ref: "FAC-0455" },
    ]
  },
  {
    codigo: "1.1.05", nombre: "Inventario de Mercancías", naturaleza: "deudora", grupo: "Activo Circulante",
    movimientos: [
      { fecha: "2026-03-28", concepto: "Costo mercancía vendida", debe: 0, haber: 28500, ref: "FAC-0456" },
      { fecha: "2026-03-20", concepto: "Compra mercancía proveedor", debe: 45200, haber: 0, ref: "FAC-P-0120" },
    ]
  },
  {
    codigo: "1.2.01", nombre: "Mobiliario y Equipo", naturaleza: "deudora", grupo: "Activo Fijo",
    movimientos: [
      { fecha: "2026-03-01", concepto: "Saldo inicial período", debe: 185000, haber: 0, ref: "SI-MAR-26" },
    ]
  },
  {
    codigo: "1.2.02", nombre: "Depreciación Acumulada", naturaleza: "acreedora", grupo: "Activo Fijo",
    movimientos: [
      { fecha: "2026-03-24", concepto: "Depreciación mensual", debe: 0, haber: 4200, ref: "DEP-MAR-26" },
    ]
  },
  {
    codigo: "2.1.01", nombre: "Cuentas por Pagar", naturaleza: "acreedora", grupo: "Pasivo Circulante",
    movimientos: [
      { fecha: "2026-03-26", concepto: "Factura proveedor suministros", debe: 0, haber: 1850, ref: "FAC-P-0123" },
      { fecha: "2026-03-20", concepto: "Factura proveedor mercancía", debe: 0, haber: 45200, ref: "FAC-P-0120" },
    ]
  },
  {
    codigo: "2.1.04", nombre: "IVA Débito Fiscal", naturaleza: "acreedora", grupo: "Pasivo Circulante",
    movimientos: [
      { fecha: "2026-03-28", concepto: "IVA venta factura #0456", debe: 0, haber: 7328, ref: "FAC-0456" },
      { fecha: "2026-03-25", concepto: "IVA servicio factura #0455", debe: 0, haber: 20000, ref: "FAC-0455" },
    ]
  },
  {
    codigo: "2.1.05", nombre: "Retenciones IVA por Enterar", naturaleza: "acreedora", grupo: "Pasivo Circulante",
    movimientos: [
      { fecha: "2026-03-26", concepto: "Retención IVA 75%", debe: 5520, haber: 0, ref: "RET-IVA-0891" },
    ]
  },
  {
    codigo: "4.1.01", nombre: "Ventas", naturaleza: "acreedora", grupo: "Ingresos",
    movimientos: [
      { fecha: "2026-03-28", concepto: "Venta mercancía", debe: 0, haber: 45800, ref: "FAC-0456" },
      { fecha: "2026-03-25", concepto: "Servicios profesionales", debe: 0, haber: 125000, ref: "FAC-0455" },
    ]
  },
  {
    codigo: "5.1.01", nombre: "Costo de Ventas", naturaleza: "deudora", grupo: "Costos",
    movimientos: [
      { fecha: "2026-03-28", concepto: "Costo mercancía vendida", debe: 28500, haber: 0, ref: "FAC-0456" },
    ]
  },
  {
    codigo: "6.1.01", nombre: "Gastos de Personal", naturaleza: "deudora", grupo: "Gastos Operacionales",
    movimientos: [
      { fecha: "2026-03-25", concepto: "Nómina quincenal 2da Marzo", debe: 89400, haber: 0, ref: "NOM-MAR-2" },
    ]
  },
  {
    codigo: "6.1.03", nombre: "Gastos Generales", naturaleza: "deudora", grupo: "Gastos Operacionales",
    movimientos: [
      { fecha: "2026-03-27", concepto: "Electricidad CORPOELEC", debe: 3200, haber: 0, ref: "REC-1892" },
      { fecha: "2026-03-26", concepto: "Suministros de oficina", debe: 1850, haber: 0, ref: "FAC-P-0123" },
      { fecha: "2026-03-23", concepto: "Alquiler local comercial", debe: 15000, haber: 0, ref: "ALQ-MAR-26" },
    ]
  },
];

const GRUPOS = [...new Set(CUENTAS_MAYOR.map(c => c.grupo))];

export default function LibroMayorPage() {
  const [search, setSearch] = useState("");
  const [selectedCuenta, setSelectedCuenta] = useState<string | null>(null);
  const [filterGrupo, setFilterGrupo] = useState<string>("todos");

  const filtered = useMemo(() => {
    return CUENTAS_MAYOR.filter(c => {
      const matchSearch = !search ||
        c.nombre.toLowerCase().includes(search.toLowerCase()) ||
        c.codigo.includes(search);
      const matchGrupo = filterGrupo === "todos" || c.grupo === filterGrupo;
      return matchSearch && matchGrupo;
    });
  }, [search, filterGrupo]);

  const cuenta = selectedCuenta ? CUENTAS_MAYOR.find(c => c.codigo === selectedCuenta) : null;

  const getSaldo = (c: CuentaMayor) => {
    const totalDebe = c.movimientos.reduce((s, m) => s + m.debe, 0);
    const totalHaber = c.movimientos.reduce((s, m) => s + m.haber, 0);
    return c.naturaleza === 'deudora' ? totalDebe - totalHaber : totalHaber - totalDebe;
  };

  const totalActivos = CUENTAS_MAYOR.filter(c => c.grupo.startsWith('Activo')).reduce((s, c) => s + getSaldo(c), 0);
  const totalPasivos = CUENTAS_MAYOR.filter(c => c.grupo.startsWith('Pasivo')).reduce((s, c) => s + getSaldo(c), 0);
  const totalIngresos = CUENTAS_MAYOR.filter(c => c.grupo === 'Ingresos').reduce((s, c) => s + getSaldo(c), 0);
  const totalGastos = CUENTAS_MAYOR.filter(c => c.grupo.startsWith('Gastos') || c.grupo === 'Costos').reduce((s, c) => s + getSaldo(c), 0);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-3">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4" /> BÓVEDA DE REGISTROS</Link>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2">
            <BookOpen className="h-3 w-3" /> LIBRO OBLIGATORIO · ART. 34 C. COMERCIO
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Libro <span className="text-primary italic">Mayor</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Mayores analíticos por cuenta · Saldos en tiempo real · VEN-NIF
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
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Activos</CardTitle>
            <div className="p-2.5 rounded-xl bg-muted border border-border"><Wallet className="h-4 w-4 text-emerald-500" /></div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-emerald-500">{formatCurrency(totalActivos, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-emerald-500/60">Saldo deudor neto</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Pasivos</CardTitle>
            <div className="p-2.5 rounded-xl bg-muted border border-border"><Landmark className="h-4 w-4 text-rose-500" /></div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-rose-500">{formatCurrency(totalPasivos, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-rose-500/60">Obligaciones vigentes</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Ingresos</CardTitle>
            <div className="p-2.5 rounded-xl bg-muted border border-border"><TrendingUp className="h-4 w-4 text-primary" /></div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-primary">{formatCurrency(totalIngresos, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary/60">Ventas del período</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Costos y Gastos</CardTitle>
            <div className="p-2.5 rounded-xl bg-muted border border-border"><TrendingDown className="h-4 w-4 text-amber-500" /></div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-amber-500">{formatCurrency(totalGastos, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-amber-500/60">Egresos operacionales</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <Input
            placeholder="Buscar cuenta por código o nombre..."
            className="pl-12 h-14 rounded-2xl bg-card border-border text-xs font-bold uppercase tracking-widest"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={filterGrupo} onValueChange={setFilterGrupo}>
          <SelectTrigger className="w-[250px] h-14 rounded-2xl bg-card border-border text-xs font-bold uppercase tracking-widest">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los grupos</SelectItem>
            {GRUPOS.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {cuenta ? (
        <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <div className="flex items-center justify-between">
              <div>
                <Button variant="ghost" onClick={() => setSelectedCuenta(null)} className="p-0 h-auto text-primary hover:bg-transparent mb-4 text-xs font-black uppercase tracking-widest">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Volver al listado
                </Button>
                <CardTitle className="text-lg font-black uppercase tracking-[0.2em] text-primary italic">
                  {cuenta.codigo} — {cuenta.nombre}
                </CardTitle>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2">
                  Grupo: {cuenta.grupo} · Naturaleza: {cuenta.naturaleza === 'deudora' ? 'Deudora' : 'Acreedora'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Saldo Actual</p>
                <p className={cn("text-3xl font-black italic", getSaldo(cuenta) >= 0 ? "text-emerald-500" : "text-rose-500")}>
                  {formatCurrency(Math.abs(getSaldo(cuenta)), 'Bs.')}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Fecha</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Concepto</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Referencia</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Debe</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Haber</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(() => {
                  let saldoAcum = 0;
                  return cuenta.movimientos.map((m, idx) => {
                    if (cuenta.naturaleza === 'deudora') {
                      saldoAcum += m.debe - m.haber;
                    } else {
                      saldoAcum += m.haber - m.debe;
                    }
                    return (
                      <TableRow key={idx} className="border-border/50 hover:bg-muted/20 transition-all">
                        <TableCell className="pl-10 py-6 text-[10px] font-bold text-muted-foreground/60 uppercase whitespace-nowrap">{m.fecha}</TableCell>
                        <TableCell className="py-6 font-black text-xs text-foreground/80 uppercase italic">{m.concepto}</TableCell>
                        <TableCell className="py-6 text-[10px] font-mono text-primary font-bold">{m.ref}</TableCell>
                        <TableCell className="text-right py-6 font-mono text-sm font-bold">
                          {m.debe > 0 ? <span className="text-rose-500">{formatCurrency(m.debe, 'Bs.')}</span> : <span className="text-muted-foreground/20">—</span>}
                        </TableCell>
                        <TableCell className="text-right py-6 font-mono text-sm font-bold">
                          {m.haber > 0 ? <span className="text-emerald-500">{formatCurrency(m.haber, 'Bs.')}</span> : <span className="text-muted-foreground/20">—</span>}
                        </TableCell>
                        <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary">{formatCurrency(saldoAcum, 'Bs.')}</TableCell>
                      </TableRow>
                    );
                  });
                })()}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="p-8 border-t border-border bg-primary/5 flex justify-between items-center">
            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
              <ShieldCheck className="h-4 w-4 text-primary" /> SALDO VERIFICADO CONTRA LIBRO DIARIO
            </div>
            <div className="flex gap-8">
              <div className="text-right">
                <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Total Debe</p>
                <p className="text-lg font-black italic text-rose-500">{formatCurrency(cuenta.movimientos.reduce((s, m) => s + m.debe, 0), 'Bs.')}</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Total Haber</p>
                <p className="text-lg font-black italic text-emerald-500">{formatCurrency(cuenta.movimientos.reduce((s, m) => s + m.haber, 0), 'Bs.')}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-3">
              <Scale className="h-5 w-5" /> Plan de Cuentas — Saldos al Cierre
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Código</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Cuenta</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Grupo</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Naturaleza</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Movimientos</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Saldo</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => {
                  const saldo = getSaldo(c);
                  return (
                    <TableRow
                      key={c.codigo}
                      className="border-border/50 hover:bg-muted/20 transition-all cursor-pointer"
                      onClick={() => setSelectedCuenta(c.codigo)}
                    >
                      <TableCell className="pl-10 py-6 font-mono text-xs font-bold text-primary">{c.codigo}</TableCell>
                      <TableCell className="py-6">
                        <p className="font-black text-xs text-foreground/80 uppercase italic">{c.nombre}</p>
                      </TableCell>
                      <TableCell className="py-6">
                        <Badge className="text-[8px] font-black uppercase tracking-widest border-none bg-muted text-muted-foreground">{c.grupo}</Badge>
                      </TableCell>
                      <TableCell className="py-6">
                        <Badge className={cn("text-[8px] font-black uppercase tracking-widest border-none",
                          c.naturaleza === 'deudora' ? 'bg-blue-500/10 text-blue-500' : 'bg-violet-500/10 text-violet-500'
                        )}>
                          {c.naturaleza}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right py-6 text-[10px] font-bold text-muted-foreground/60">{c.movimientos.length}</TableCell>
                      <TableCell className="text-right pr-10 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <span className={cn("font-mono text-sm font-black", saldo >= 0 ? "text-emerald-500" : "text-rose-500")}>
                            {formatCurrency(Math.abs(saldo), 'Bs.')}
                          </span>
                          <ArrowRight className="h-3 w-3 text-muted-foreground/20" />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="p-8 border-t border-border bg-primary/5 flex justify-between items-center">
            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
              <ShieldCheck className="h-4 w-4 text-primary" /> {filtered.length} CUENTAS · SALDOS SINCRONIZADOS CON LIBRO DIARIO
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
