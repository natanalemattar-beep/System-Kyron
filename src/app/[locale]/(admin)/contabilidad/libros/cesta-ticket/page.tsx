"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banknote, CirclePlus as PlusCircle, ArrowLeft, History, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockCestaTicket = [
  { id: 1, fecha: "01/03/2026", empleado: "Ana Pérez", asignado: 1200, usado: 450, saldo: 750, periodo: "Marzo Q1" },
  { id: 2, fecha: "01/03/2026", empleado: "Luis Gómez", asignado: 1200, usado: 1200, saldo: 0, periodo: "Marzo Q1" },
  { id: 3, fecha: "01/03/2026", empleado: "María Rodriguez", asignado: 1200, usado: 0, saldo: 1200, periodo: "Marzo Q1" },
  { id: 4, fecha: "01/03/2026", empleado: "Carlos Sanchez", asignado: 1200, usado: 800, saldo: 400, periodo: "Marzo Q1" },
  { id: 5, fecha: "01/03/2026", empleado: "Elena Torres", asignado: 1200, usado: 300, saldo: 900, periodo: "Marzo Q1" },
];

export default function LibroCestaTicketPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <Banknote className="h-8 w-8 text-[#00A86B]" />
            Libro de Cesta Ticket
          </h1>
          <p className="text-slate-500 font-medium text-sm">Registro mensual del beneficio de alimentación socialista.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]" onClick={() => handleAction("Abriendo filtros avanzados...")}>
            <Filter className="mr-2 h-4 w-4" /> Filtrar Mes
          </Button>
          <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Asignando monto legal a toda la nómina...")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Asignar Cesta Ticket
          </Button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Monto Asignado (Mes)</p>
            <p className="text-3xl font-black text-[#0A2472]">{formatCurrency(6000, 'Bs.')}</p>
          </div>
          <History className="h-10 w-10 text-slate-100" />
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8 flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Monto Ejecutado</p>
            <p className="text-3xl font-black text-[#00A86B]">{formatCurrency(2750, 'Bs.')}</p>
          </div>
          <div className="h-10 w-10 rounded-full border-4 border-slate-100 border-t-[#00A86B] animate-spin" />
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Relación por Trabajador</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold">Fecha</TableHead>
                <TableHead className="font-bold">Empleado</TableHead>
                <TableHead className="font-bold text-center">Período</TableHead>
                <TableHead className="text-right font-bold">Monto Asignado</TableHead>
                <TableHead className="text-right font-bold">Monto Usado</TableHead>
                <TableHead className="text-right pr-8 font-bold">Saldo Disponible</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCestaTicket.map((c) => (
                <TableRow key={c.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 text-xs">{c.fecha}</TableCell>
                  <TableCell className="font-bold text-xs text-[#0A2472]">{c.empleado}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className="text-[9px] uppercase font-bold text-slate-400">{c.periodo}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs font-bold">{formatCurrency(c.asignado, 'Bs.')}</TableCell>
                  <TableCell className="text-right font-mono text-xs text-rose-500">{formatCurrency(c.usado, 'Bs.')}</TableCell>
                  <TableCell className="text-right pr-8 font-mono text-sm font-black text-[#00A86B]">{formatCurrency(c.saldo, 'Bs.')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}