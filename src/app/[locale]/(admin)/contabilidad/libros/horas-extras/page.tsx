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
  Clock, Download, ArrowLeft, Loader2, Inbox,
  ShieldCheck, FileSpreadsheet, Users, Calendar, Timer, AlertTriangle
} from "lucide-react";

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  cargo: string;
  departamento: string;
  salario: string;
  activo?: boolean;
}

interface HoraExtra {
  empleadoId: number;
  nombre: string;
  cedula: string;
  cargo: string;
  diurnas: number;
  nocturnas: number;
  feriadas: number;
  salarioHora: number;
}

const SAMPLE_HORAS: HoraExtra[] = [
  { empleadoId: 1, nombre: "Carlos Alejandro Mendoza", cedula: "V-18.456.712", cargo: "Técnico de Redes", diurnas: 8, nocturnas: 4, feriadas: 0, salarioHora: 45.50 },
  { empleadoId: 2, nombre: "María Gabriela González", cedula: "V-20.187.493", cargo: "Analista Contable", diurnas: 6, nocturnas: 0, feriadas: 8, salarioHora: 52.30 },
  { empleadoId: 3, nombre: "José Alberto Rodríguez", cedula: "V-15.234.871", cargo: "Supervisor de Operaciones", diurnas: 12, nocturnas: 6, feriadas: 4, salarioHora: 65.00 },
  { empleadoId: 4, nombre: "Ana Isabel Martínez", cedula: "V-21.345.672", cargo: "Ejecutiva Comercial", diurnas: 4, nocturnas: 0, feriadas: 0, salarioHora: 48.75 },
  { empleadoId: 5, nombre: "Pedro Luis Hernández", cedula: "V-17.654.328", cargo: "Ingeniero de Sistemas", diurnas: 10, nocturnas: 8, feriadas: 0, salarioHora: 72.00 },
];

export default function HorasExtrasPage() {
  const [horasData, setHorasData] = useState<HoraExtra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contabilidad/records?type=empleados')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => {
        const empleados = (d.rows ?? []).filter((e: Empleado & { activo: boolean }) => e.activo);
        if (empleados.length > 0) {
          setHorasData(empleados.map((e: Empleado) => ({
            empleadoId: e.id,
            nombre: `${e.nombre} ${e.apellido}`,
            cedula: e.cedula,
            cargo: e.cargo,
            diurnas: 0, nocturnas: 0, feriadas: 0,
            salarioHora: parseFloat(e.salario || '0') / 240
          })));
        } else {
          setHorasData(SAMPLE_HORAS);
        }
      })
      .catch(() => setHorasData(SAMPLE_HORAS))
      .finally(() => setLoading(false));
  }, []);

  const recargoDiurna = 1.5;
  const recargoNocturna = 1.8;
  const recargoFeriada = 2.5;

  const calcPago = (h: HoraExtra) => {
    return (h.diurnas * h.salarioHora * recargoDiurna) +
           (h.nocturnas * h.salarioHora * recargoNocturna) +
           (h.feriadas * h.salarioHora * recargoFeriada);
  };

  const summary = useMemo(() => {
    const totalDiurnas = horasData.reduce((s, h) => s + h.diurnas, 0);
    const totalNocturnas = horasData.reduce((s, h) => s + h.nocturnas, 0);
    const totalFeriadas = horasData.reduce((s, h) => s + h.feriadas, 0);
    const totalPago = horasData.reduce((s, h) => s + calcPago(h), 0);
    const conHoras = horasData.filter(h => h.diurnas + h.nocturnas + h.feriadas > 0).length;
    return { totalDiurnas, totalNocturnas, totalFeriadas, totalPago, conHoras, totalHoras: totalDiurnas + totalNocturnas + totalFeriadas };
  }, [horasData]);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-3">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4" /> BÓVEDA DE REGISTROS</Link>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2">
            <Clock className="h-3 w-3" /> LOTTT · ARTS. 178-183 · MÁXIMO 100 H/AÑO
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Libro de <span className="text-primary italic">Horas Extras</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Recargos: Diurna +50% · Nocturna +80% · Feriada +150% · LOTTT
          </p>
        </div>
        <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar .XLSX
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Total Horas</CardTitle>
            <Timer className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-foreground">{summary.totalHoras}h</div>
            <p className="text-[9px] font-black uppercase mt-2 text-primary">Marzo 2026</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Empleados</CardTitle>
            <Users className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-emerald-500">{summary.conHoras}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-emerald-500/60">Con horas extras</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Costo Total</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-amber-500">{formatCurrency(summary.totalPago, 'Bs.')}</div>
            <p className="text-[9px] font-black uppercase mt-2 text-amber-500/60">Recargos incluidos</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
            <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">Distribución</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black uppercase"><span className="text-muted-foreground/60">Diurnas</span><span className="text-foreground">{summary.totalDiurnas}h</span></div>
              <div className="flex justify-between text-[9px] font-black uppercase"><span className="text-muted-foreground/60">Nocturnas</span><span className="text-foreground">{summary.totalNocturnas}h</span></div>
              <div className="flex justify-between text-[9px] font-black uppercase"><span className="text-muted-foreground/60">Feriadas</span><span className="text-foreground">{summary.totalFeriadas}h</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
          <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-3">
            <Timer className="h-5 w-5" /> Control de Horas Extraordinarias — Marzo 2026
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando empleados...</span>
            </div>
          ) : horasData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin registro de horas extras</p>
              <p className="text-xs text-muted-foreground/70">Registre empleados y sus horas extraordinarias.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Empleado</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Cédula</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Cargo</TableHead>
                  <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Diurnas (+50%)</TableHead>
                  <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Nocturnas (+80%)</TableHead>
                  <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Feriadas (+150%)</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Valor/Hora</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Total a Pagar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {horasData.map((h) => {
                  const totalHoras = h.diurnas + h.nocturnas + h.feriadas;
                  const pago = calcPago(h);
                  return (
                    <TableRow key={h.empleadoId} className="border-border/50 hover:bg-muted/20 transition-all">
                      <TableCell className="pl-10 py-6 font-black text-xs text-foreground/80 uppercase italic">{h.nombre}</TableCell>
                      <TableCell className="py-6 text-[10px] font-mono text-primary font-bold">{h.cedula}</TableCell>
                      <TableCell className="py-6 text-xs text-muted-foreground/60">{h.cargo}</TableCell>
                      <TableCell className="text-center py-6">
                        {h.diurnas > 0 ? <Badge className="bg-blue-500/10 text-blue-500 border-none text-[10px] font-black">{h.diurnas}h</Badge> : <span className="text-muted-foreground/20">—</span>}
                      </TableCell>
                      <TableCell className="text-center py-6">
                        {h.nocturnas > 0 ? <Badge className="bg-violet-500/10 text-violet-500 border-none text-[10px] font-black">{h.nocturnas}h</Badge> : <span className="text-muted-foreground/20">—</span>}
                      </TableCell>
                      <TableCell className="text-center py-6">
                        {h.feriadas > 0 ? <Badge className="bg-amber-500/10 text-amber-500 border-none text-[10px] font-black">{h.feriadas}h</Badge> : <span className="text-muted-foreground/20">—</span>}
                      </TableCell>
                      <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/60">{formatCurrency(h.salarioHora, 'Bs.')}</TableCell>
                      <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(pago, 'Bs.')}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="p-8 border-t border-border bg-primary/5 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
            <ShieldCheck className="h-4 w-4 text-primary" /> LOTTT ART. 178: MÁXIMO 100 HORAS EXTRAS POR AÑO POR TRABAJADOR
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Total Recargos del Mes</p>
            <p className="text-2xl font-black italic text-primary">{formatCurrency(summary.totalPago, 'Bs.')}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
