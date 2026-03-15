"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Calculator, FileText, ArrowLeft, Download, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockNomina = [
  { id: 1, fecha: "15/03/2026", empleado: "Ana Pérez", ci: "V-12.345.678", cargo: "Gerente Finanzas", sueldo: 15000, bonos: 2500, deduc: 1200, neto: 16300, estado: "Procesado" },
  { id: 2, fecha: "15/03/2026", empleado: "Luis Gómez", ci: "V-18.765.432", cargo: "Analista Contable", sueldo: 8000, bonos: 1500, deduc: 800, neto: 8700, estado: "Procesado" },
  { id: 3, fecha: "15/03/2026", empleado: "María Rodriguez", ci: "V-20.111.222", cargo: "Contador Jr.", sueldo: 6500, bonos: 1000, deduc: 650, neto: 6850, estado: "Pendiente" },
  { id: 4, fecha: "15/03/2026", empleado: "Carlos Sanchez", ci: "E-8.999.000", cargo: "Auditor Externo", sueldo: 12000, bonos: 0, deduc: 1200, neto: 10800, estado: "Procesado" },
  { id: 5, fecha: "15/03/2026", empleado: "Elena Torres", ci: "V-15.555.555", cargo: "Asistente Admin", sueldo: 5500, bonos: 800, deduc: 550, neto: 5750, estado: "Procesado" },
];

export default function LibroNominaPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <Users className="h-8 w-8 text-[#00A86B]" />
            Libro de Nómina
          </h1>
          <p className="text-slate-500 font-medium text-sm">Control legal de remuneraciones y beneficios según la LOTTT.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]" onClick={() => handleAction("Generando reporte de nómina mensual...")}>
            <Download className="mr-2 h-4 w-4" /> Exportar PDF
          </Button>
          <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Iniciando algoritmo de cálculo de quincena...")}>
            <Calculator className="mr-2 h-4 w-4" /> Calcular Nómina
          </Button>
        </div>
      </header>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Sueldos</p>
          <p className="text-xl font-black text-[#0A2472]">{formatCurrency(47000, 'Bs.')}</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Bonos</p>
          <p className="text-xl font-black text-[#00A86B]">{formatCurrency(5800, 'Bs.')}</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Deducciones Ley</p>
          <p className="text-xl font-black text-rose-500">{formatCurrency(4400, 'Bs.')}</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-6 border-l-4 border-[#00A86B]">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Neto a Pagar</p>
          <p className="text-xl font-black text-[#0A2472]">{formatCurrency(48400, 'Bs.')}</p>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Relación Individual de Pagos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold">Fecha</TableHead>
                <TableHead className="font-bold">Empleado</TableHead>
                <TableHead className="font-bold">Cargo</TableHead>
                <TableHead className="text-right font-bold">Sueldo Base</TableHead>
                <TableHead className="text-right font-bold">Bonos</TableHead>
                <TableHead className="text-right font-bold">Neto</TableHead>
                <TableHead className="text-center font-bold">Estado</TableHead>
                <TableHead className="text-right pr-8 font-bold">Recibo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNomina.map((n) => (
                <TableRow key={n.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 text-xs">{n.fecha}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-[#0A2472]">{n.empleado}</span>
                      <span className="text-[9px] text-slate-400">{n.ci}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-500">{n.cargo}</TableCell>
                  <TableCell className="text-right font-mono text-xs">{formatCurrency(n.sueldo, 'Bs.')}</TableCell>
                  <TableCell className="text-right font-mono text-xs text-[#00A86B]">{formatCurrency(n.bonos, 'Bs.')}</TableCell>
                  <TableCell className="text-right font-mono text-sm font-black text-[#0A2472]">{formatCurrency(n.neto, 'Bs.')}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={n.estado === 'Procesado' ? 'default' : 'secondary'} className="text-[9px] uppercase">{n.estado}</Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="h-8 w-8 text-slate-400 hover:text-[#0A2472]" onClick={() => handleAction(`Abriendo recibo digital de ${n.empleado}...`)}>
                      <FileText className="h-4 w-4" />
                    </Button>
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