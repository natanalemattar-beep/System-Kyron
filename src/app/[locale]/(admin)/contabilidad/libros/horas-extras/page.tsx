"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Clock, CirclePlus as PlusCircle, ArrowLeft, Timer, FileSpreadsheet, CircleCheck as CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockHoras = [
  { id: 1, fecha: "15/03/2026", empleado: "Ana Pérez", diurnas: 4, nocturnas: 2, total: 6, pago: 1250, estado: "Aprobado" },
  { id: 2, fecha: "16/03/2026", empleado: "Luis Gómez", diurnas: 2, nocturnas: 0, total: 2, pago: 400, estado: "Pendiente" },
  { id: 3, fecha: "17/03/2026", empleado: "María Rodriguez", diurnas: 3, nocturnas: 1, total: 4, pago: 850, estado: "Aprobado" },
  { id: 4, fecha: "18/03/2026", empleado: "Carlos Sanchez", diurnas: 0, nocturnas: 4, total: 4, pago: 1100, estado: "Aprobado" },
  { id: 5, fecha: "19/03/2026", empleado: "Elena Torres", diurnas: 1, nocturnas: 0, total: 1, pago: 200, estado: "Rechazado" },
];

export default function LibroHorasExtrasPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <Clock className="h-8 w-8 text-[#00A86B]" />
            Libro de Horas Extras
          </h1>
          <p className="text-slate-500 font-medium text-sm">Registro de tiempo laborado fuera de la jornada regular.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]" onClick={() => handleAction("Generando reporte de horas mensuales...")}>
            <FileSpreadsheet className="mr-2 h-4 w-4" /> Exportar a Excel
          </Button>
          <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Cargando nuevas horas extras...")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Registrar Horas
          </Button>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8 flex items-center gap-6">
          <div className="p-4 bg-blue-50 rounded-2xl"><Timer className="h-8 w-8 text-[#0A2472]" /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Horas Acumuladas</p>
            <p className="text-2xl font-black text-[#0A2472]">17 Horas</p>
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8 flex items-center gap-6">
          <div className="p-4 bg-emerald-50 rounded-2xl"><PlusCircle className="h-8 w-8 text-[#00A86B]" /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Monto a Liquidar</p>
            <p className="text-2xl font-black text-[#00A86B]">{formatCurrency(3800, 'Bs.')}</p>
          </div>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8 flex items-center gap-6">
          <div className="p-4 bg-orange-50 rounded-2xl"><CheckCircle className="h-8 w-8 text-orange-500" /></div>
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Estatus General</p>
            <p className="text-2xl font-black text-orange-500">Auditado</p>
          </div>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Control de Jornada Extraordinaria</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold">Fecha</TableHead>
                <TableHead className="font-bold">Empleado</TableHead>
                <TableHead className="text-center font-bold">H. Diurnas</TableHead>
                <TableHead className="text-center font-bold">H. Nocturnas</TableHead>
                <TableHead className="text-center font-bold">Total Horas</TableHead>
                <TableHead className="text-right font-bold">Monto a Pagar</TableHead>
                <TableHead className="text-right pr-8 font-bold">Estatus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHoras.map((h) => (
                <TableRow key={h.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 text-xs">{h.fecha}</TableCell>
                  <TableCell className="font-bold text-xs text-[#0A2472]">{h.empleado}</TableCell>
                  <TableCell className="text-center font-medium text-xs">{h.diurnas}</TableCell>
                  <TableCell className="text-center font-medium text-xs">{h.nocturnas}</TableCell>
                  <TableCell className="text-center font-black text-xs text-[#0A2472]">{h.total}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-bold text-[#00A86B]">{formatCurrency(h.pago, 'Bs.')}</TableCell>
                  <TableCell className="text-right pr-8">
                    <Badge variant={h.estado === 'Aprobado' ? 'default' : h.estado === 'Pendiente' ? 'secondary' : 'destructive'} className="text-[9px] uppercase">{h.estado}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}