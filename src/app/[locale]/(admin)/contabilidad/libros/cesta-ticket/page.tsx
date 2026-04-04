"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BackButton } from "@/components/back-button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import {
  Wallet, Loader2, Inbox, Printer,
  Users, Calendar, Banknote, Calculator
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
        setEmpleados(dbRows.map((e: Empleado) => ({ ...e, diasTrabajados: diasLaboralesMes })));
      })
      .catch(() => setEmpleados([]))
      .finally(() => setLoading(false));
  }, []);

  const summary = useMemo(() => {
    const totalDias = empleados.reduce((s, e) => s + e.diasTrabajados, 0);
    const totalMensual = empleados.reduce((s, e) => s + (cestaTicketDiario * e.diasTrabajados), 0);
    return { totalDias, totalMensual, empleados: empleados.length };
  }, [empleados, cestaTicketDiario]);

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad/libros" label="Libros Contables" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
              <Wallet className="h-3.5 w-3.5" /> LOTTT Art. 105 · Beneficio de Alimentación
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Cesta Ticket / <span className="text-primary">Alimentación</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">Beneficio de alimentación · 0.25 UT por jornada · No salarial</p>
          </div>
          <Button variant="outline" onClick={() => window.print()} className="rounded-xl">
            <Printer className="mr-2 h-4 w-4" /> Imprimir
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">UT Vigente</span>
            <Calculator className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-black">{formatCurrency(UT, 'Bs.')}</p>
        </Card>
        <Card className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Diario (0.25 UT)</span>
            <Banknote className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-500">{formatCurrency(cestaTicketDiario, 'Bs.')}</p>
        </Card>
        <Card className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Empleados</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-black">{summary.empleados}</p>
        </Card>
        <Card className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Días Totales</span>
            <Calendar className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-500">{summary.totalDias}</p>
        </Card>
        <Card className="rounded-2xl border p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase">Costo Mensual</span>
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-black text-primary">{formatCurrency(summary.totalMensual, 'Bs.')}</p>
        </Card>
      </div>

      <Card className="rounded-2xl border shadow-lg overflow-hidden">
        <CardHeader className="p-6 border-b bg-muted/30">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" /> Cálculo Beneficio de Alimentación
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando empleados...</span>
            </div>
          ) : empleados.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10" />
              <p className="text-sm font-bold">Sin empleados registrados</p>
              <p className="text-xs text-muted-foreground/70">Registre empleados en RRHH para calcular el beneficio.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/20">
                  <TableHead className="pl-6 py-4 text-xs font-semibold">Empleado</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Cédula</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Cargo</TableHead>
                  <TableHead className="py-4 text-xs font-semibold">Departamento</TableHead>
                  <TableHead className="text-center py-4 text-xs font-semibold">Días Laborados</TableHead>
                  <TableHead className="text-right py-4 text-xs font-semibold">Diario</TableHead>
                  <TableHead className="text-right pr-6 py-4 text-xs font-semibold">Total Mes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {empleados.map((e) => (
                  <TableRow key={e.id} className="hover:bg-muted/10">
                    <TableCell className="pl-6 py-4 text-xs font-semibold">{e.nombre} {e.apellido}</TableCell>
                    <TableCell className="py-4 text-xs font-mono text-primary">{e.cedula}</TableCell>
                    <TableCell className="py-4 text-xs text-muted-foreground">{e.cargo}</TableCell>
                    <TableCell className="py-4">
                      <Badge className="text-[10px] font-semibold border-none bg-muted text-muted-foreground">{e.departamento}</Badge>
                    </TableCell>
                    <TableCell className="text-center py-4 font-mono text-sm">{e.diasTrabajados}</TableCell>
                    <TableCell className="text-right py-4 font-mono text-sm">{formatCurrency(cestaTicketDiario, 'Bs.')}</TableCell>
                    <TableCell className="text-right pr-6 py-4 font-mono text-sm font-bold text-primary">{formatCurrency(cestaTicketDiario * e.diasTrabajados, 'Bs.')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {empleados.length > 0 && (
          <CardFooter className="p-6 border-t">
            <p className="text-xs text-muted-foreground">Beneficio no salarial · No genera incidencias en prestaciones</p>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
