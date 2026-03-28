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
  Wallet, Download, ArrowLeft, Loader2, Inbox,
  ShieldCheck, FileSpreadsheet, Users, Calendar, Banknote, Calculator
} from "lucide-react";

interface Empleado {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  cargo: string;
  departamento: string;
  salario: string;
  activo: boolean;
}

const SAMPLE_EMPLEADOS: (Empleado & { diasTrabajados: number })[] = [
  { id: 1, nombre: "Carlos", apellido: "Mendoza", cedula: "V-18.456.712", cargo: "Técnico de Redes", departamento: "Telecomunicaciones", salario: "10920.00", activo: true, diasTrabajados: 22 },
  { id: 2, nombre: "María", apellido: "González", cedula: "V-20.187.493", cargo: "Analista Contable", departamento: "Contabilidad", salario: "12552.00", activo: true, diasTrabajados: 20 },
  { id: 3, nombre: "José", apellido: "Rodríguez", cedula: "V-15.234.871", cargo: "Supervisor", departamento: "Operaciones", salario: "15600.00", activo: true, diasTrabajados: 22 },
  { id: 4, nombre: "Ana", apellido: "Martínez", cedula: "V-21.345.672", cargo: "Ejecutiva Comercial", departamento: "Ventas", salario: "11700.00", activo: true, diasTrabajados: 18 },
  { id: 5, nombre: "Pedro", apellido: "Hernández", cedula: "V-17.654.328", cargo: "Ing. Sistemas", departamento: "Tecnología", salario: "17280.00", activo: true, diasTrabajados: 22 },
  { id: 6, nombre: "Luisa", apellido: "Pérez", cedula: "V-22.891.345", cargo: "Asistente RRHH", departamento: "Recursos Humanos", salario: "9600.00", activo: true, diasTrabajados: 21 },
];

export default function CestaTicketPage() {
  const [empleados, setEmpleados] = useState<(Empleado & { diasTrabajados: number })[]>([]);
  const [loading, setLoading] = useState(true);

  const UT = 9.00;
  const cestaTicketDiario = 0.25 * UT;
  const diasLaboralesMes = 22;

  useEffect(() => {
    fetch('/api/contabilidad/records?type=empleados')
      .then(r => r.ok ? r.json() : { rows: [] })
      .then(d => {
        const dbRows = (d.rows ?? []).filter((e: Empleado) => e.activo);
        if (dbRows.length > 0) {
          setEmpleados(dbRows.map((e: Empleado) => ({ ...e, diasTrabajados: diasLaboralesMes })));
        } else {
          setEmpleados(SAMPLE_EMPLEADOS);
        }
      })
      .catch(() => setEmpleados(SAMPLE_EMPLEADOS))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const totalDias = empleados.reduce((s, e) => s + e.diasTrabajados, 0);
    const totalMensual = empleados.reduce((s, e) => s + (cestaTicketDiario * e.diasTrabajados), 0);
    return { totalDias, totalMensual, empleados: empleados.length };
  }, [empleados, cestaTicketDiario]);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-3">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4" /> BÓVEDA DE REGISTROS</Link>
          </Button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-2">
            <Wallet className="h-3 w-3" /> LOTTT ART. 105 · DECRETO CESTATICKET SOCIALISTA
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            Cesta Ticket / <span className="text-primary italic">Alimentación</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Beneficio de alimentación · 0.25 UT por jornada · No salarial
          </p>
        </div>
        <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
          <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar .XLSX
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-5">
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">UT Vigente</CardTitle>
            <Calculator className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-foreground">{formatCurrency(UT, 'Bs.')}</div>
            <p className="text-[8px] font-black uppercase mt-1 text-primary">Gaceta 2026</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Diario (0.25 UT)</CardTitle>
            <Banknote className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-emerald-500">{formatCurrency(cestaTicketDiario, 'Bs.')}</div>
            <p className="text-[8px] font-black uppercase mt-1 text-emerald-500/60">Por jornada</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Empleados</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-foreground">{summary.empleados}</div>
            <p className="text-[8px] font-black uppercase mt-1 text-primary">Activos</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Días Totales</CardTitle>
            <Calendar className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-amber-500">{summary.totalDias}</div>
            <p className="text-[8px] font-black uppercase mt-1 text-amber-500/60">Jornadas laborales</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-5">
            <CardTitle className="text-[8px] font-black uppercase tracking-widest text-muted-foreground/60">Costo Mensual</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="text-2xl font-black italic tracking-tighter text-primary">{formatCurrency(summary.totalMensual, 'Bs.')}</div>
            <p className="text-[8px] font-black uppercase mt-1 text-primary/60">Marzo 2026</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
          <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic flex items-center gap-3">
            <Wallet className="h-5 w-5" /> Cálculo Beneficio de Alimentación — Marzo 2026
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Cargando empleados...</span>
            </div>
          ) : empleados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold uppercase tracking-widest">Sin empleados registrados</p>
              <p className="text-xs text-muted-foreground/70">Registre empleados en RRHH para calcular el beneficio.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Empleado</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Cédula</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Cargo</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Departamento</TableHead>
                  <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Días Laborados</TableHead>
                  <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Diario</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-40">Total Mes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empleados.map((e) => (
                  <TableRow key={e.id} className="border-border/50 hover:bg-muted/20 transition-all">
                    <TableCell className="pl-10 py-6 font-black text-xs text-foreground/80 uppercase italic">{e.nombre} {e.apellido}</TableCell>
                    <TableCell className="py-6 text-[10px] font-mono text-primary font-bold">{e.cedula}</TableCell>
                    <TableCell className="py-6 text-xs text-muted-foreground/60">{e.cargo}</TableCell>
                    <TableCell className="py-6">
                      <Badge className="text-[8px] font-black uppercase tracking-widest border-none bg-muted text-muted-foreground">{e.departamento}</Badge>
                    </TableCell>
                    <TableCell className="text-center py-6 font-mono text-sm font-bold text-foreground/70">{e.diasTrabajados}</TableCell>
                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/60">{formatCurrency(cestaTicketDiario, 'Bs.')}</TableCell>
                    <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(cestaTicketDiario * e.diasTrabajados, 'Bs.')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        <CardFooter className="p-8 border-t border-border bg-primary/5 flex justify-between items-center">
          <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
            <ShieldCheck className="h-4 w-4 text-primary" /> BENEFICIO NO SALARIAL · NO GENERA INCIDENCIAS EN PRESTACIONES
          </div>
          <div className="text-right">
            <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Total Cesta Ticket Mensual</p>
            <p className="text-2xl font-black italic text-primary">{formatCurrency(summary.totalMensual, 'Bs.')}</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
