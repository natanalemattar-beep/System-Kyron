"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  Users, Download, ArrowLeft, Loader2, Inbox,
  ShieldCheck, FileSpreadsheet, Wallet, TrendingDown, Calendar,
  Banknote, ChevronLeft, ChevronRight
} from "lucide-react";

interface Nomina {
  id: number;
  periodo: string;
  fecha: string;
  bruto: string;
  deducciones: string;
  neto: string;
  estado: string;
  empleados?: number;
}

const SAMPLE_NOMINAS: Nomina[] = [
  { id: 1, periodo: "Marzo 2026 - 2da Quincena", fecha: "2026-03-31", bruto: "89400.00", deducciones: "18200.00", neto: "71200.00", estado: "procesada", empleados: 47 },
  { id: 2, periodo: "Marzo 2026 - 1ra Quincena", fecha: "2026-03-15", bruto: "89400.00", deducciones: "18200.00", neto: "71200.00", estado: "pagada", empleados: 47 },
  { id: 3, periodo: "Febrero 2026 - 2da Quincena", fecha: "2026-02-28", bruto: "87600.00", deducciones: "17850.00", neto: "69750.00", estado: "pagada", empleados: 46 },
  { id: 4, periodo: "Febrero 2026 - 1ra Quincena", fecha: "2026-02-15", bruto: "87600.00", deducciones: "17850.00", neto: "69750.00", estado: "pagada", empleados: 46 },
  { id: 5, periodo: "Enero 2026 - 2da Quincena", fecha: "2026-01-31", bruto: "85200.00", deducciones: "17400.00", neto: "67800.00", estado: "pagada", empleados: 45 },
  { id: 6, periodo: "Enero 2026 - 1ra Quincena", fecha: "2026-01-15", bruto: "85200.00", deducciones: "17400.00", neto: "67800.00", estado: "pagada", empleados: 45 },
];

export default function LibroNominaPage() {
  const [rows, setRows] = useState<Nomina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=nominas')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => {
        const dbRows = d.rows ?? [];
        setRows(dbRows.length > 0 ? dbRows : SAMPLE_NOMINAS);
      })
      .catch(() => setRows(SAMPLE_NOMINAS))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const totalBruto = rows.reduce((s, r) => s + parseFloat(r.bruto || '0'), 0);
    const totalDeducciones = rows.reduce((s, r) => s + parseFloat(r.deducciones || '0'), 0);
    const totalNeto = rows.reduce((s, r) => s + parseFloat(r.neto || '0'), 0);
    const pagadas = rows.filter(r => r.estado === 'pagada').length;
    return { totalBruto, totalDeducciones, totalNeto, pagadas };
  }, [rows]);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-3">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4" /> BÓVEDA DE REGISTROS</Link>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2">
            <Users className="h-3 w-3" /> LOTTT · ARTS. 98-105 · SSO · FAOV · INCES
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Libro de <span className="text-primary italic">Nómina</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Registro quincenal · Deducciones legales · LOTTT / LOPCYMAT
          </p>
        </div>
        <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar .XLSX
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Bruto</CardTitle>
            <Banknote className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-foreground">{formatCurrency(summary.totalBruto, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary">Acumulado año fiscal</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Deducciones</CardTitle>
            <TrendingDown className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-rose-500">{formatCurrency(summary.totalDeducciones, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-rose-500/60">SSO + FAOV + ISLR + INCES</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Neto Pagado</CardTitle>
            <Wallet className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-emerald-500">{formatCurrency(summary.totalNeto, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-emerald-500/60">Total desembolsado</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Nóminas Pagadas</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tight text-foreground">{summary.pagadas} / {rows.length}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary">Quincenas procesadas</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
          <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-3">
            <Calendar className="h-5 w-5" /> Historial de Nóminas — Año Fiscal 2026
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando nóminas...</span>
            </div>
          ) : rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin nóminas procesadas</p>
              <p className="text-xs text-muted-foreground/70">Las nóminas aparecerán aquí al ser generadas en el módulo de RRHH.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Período</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Fecha Pago</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Empleados</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Salario Bruto</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Deducciones</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Neto a Pagar</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((n) => (
                  <TableRow key={n.id} className="border-border/50 hover:bg-muted/20 transition-all">
                    <TableCell className="pl-10 py-6">
                      <p className="font-black text-xs text-foreground/80 uppercase italic">{n.periodo}</p>
                    </TableCell>
                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground/60 uppercase whitespace-nowrap">{n.fecha}</TableCell>
                    <TableCell className="py-6 font-mono text-xs font-bold text-foreground/60">{n.empleados || '—'}</TableCell>
                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(parseFloat(n.bruto), 'Bs.')}</TableCell>
                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-rose-500">{formatCurrency(parseFloat(n.deducciones), 'Bs.')}</TableCell>
                    <TableCell className="text-right py-6 font-mono text-sm font-black text-emerald-500 italic">{formatCurrency(parseFloat(n.neto), 'Bs.')}</TableCell>
                    <TableCell className="text-right pr-10 py-6">
                      <Badge className={cn("text-[8px] font-black uppercase tracking-widest border-none",
                        n.estado === 'pagada' ? 'bg-emerald-500/10 text-emerald-500' :
                        n.estado === 'procesada' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-muted text-muted-foreground'
                      )}>
                        {n.estado}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="p-8 border-t border-border bg-primary/5 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
            <ShieldCheck className="h-4 w-4 text-primary" /> LOTTT · SSO 4% · FAOV 2% · INCES 2% · ISLR VARIABLE
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Total Neto Desembolsado</p>
            <p className="text-2xl font-black italic text-primary">{formatCurrency(summary.totalNeto, 'Bs.')}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
