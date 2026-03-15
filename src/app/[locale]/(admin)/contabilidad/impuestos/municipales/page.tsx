"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Landmark, ArrowLeft, Download, PlusCircle, MapPin, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const mockMunicipales = [
  { id: 1, municipio: "Vargas (La Guaira)", concepto: "Actividad Económica", periodo: "02-2026", monto: 1250, fecha: "10/03/2026", estado: "Pagado" },
  { id: 2, municipio: "Libertador (Ccs)", concepto: "Inmuebles Urbanos", periodo: "1er Trim 2026", monto: 450, fecha: "15/03/2026", estado: "Pendiente" },
  { id: 3, municipio: "Vargas (La Guaira)", concepto: "Publicidad y Propaganda", periodo: "Anual 2026", monto: 800, fecha: "20/03/2026", estado: "Pendiente" },
  { id: 4, municipio: "Chacao (Miranda)", concepto: "Actividad Económica", periodo: "02-2026", monto: 2100, fecha: "05/03/2026", estado: "Pagado" },
  { id: 5, municipio: "Libertador (Ccs)", concepto: "Vehículos", periodo: "Anual 2026", monto: 120, fecha: "12/03/2026", estado: "Pagado" },
];

export default function ImpuestosMunicipalesPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <Landmark className="h-8 w-8 text-[#00A86B]" />
            Impuestos Municipales
          </h1>
          <p className="text-slate-500 font-medium text-sm">Control de tasas por jurisdicción y actividad económica local.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]" onClick={() => handleAction("Generando solvencia municipal...")}>
            <Download className="mr-2 h-4 w-4" /> Bajar Solvencias
          </Button>
          <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Abriendo formulario de pago municipal...")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Pagar Impuesto
          </Button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-4 items-end mb-6">
        <div className="flex-1 space-y-2">
          <p className="text-[10px] font-black uppercase text-slate-400 ml-1">Filtrar por Jurisdicción</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input placeholder="Buscar municipio..." className="pl-10 h-12 rounded-xl bg-white border-none shadow-sm" />
          </div>
        </div>
        <div className="p-4 bg-[#0A2472]/5 rounded-2xl flex items-center gap-4 border border-[#0A2472]/10 h-12">
            <MapPin className="h-4 w-4 text-[#0A2472]" />
            <span className="text-[10px] font-black uppercase text-[#0A2472]">3 Municipios Activos</span>
        </div>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Relación de Pagos Municipales</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold text-[10px] uppercase">Municipio</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Concepto</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Periodo</TableHead>
                <TableHead className="text-right font-bold text-[10px] uppercase">Monto</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Fecha Pago</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMunicipales.map((m) => (
                <TableRow key={m.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg"><MapPin className="h-3 w-3 text-slate-400" /></div>
                        <span className="font-bold text-xs text-slate-800 uppercase">{m.municipio}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-500 uppercase">{m.concepto}</TableCell>
                  <TableCell className="text-center text-xs font-bold text-slate-400">{m.periodo}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-bold text-[#0A2472]">{formatCurrency(m.monto, 'Bs.')}</TableCell>
                  <TableCell className="text-center text-xs text-slate-500">{m.fecha}</TableCell>
                  <TableCell className="text-right pr-8">
                    <Badge variant={m.estado === 'Pagado' ? 'default' : 'secondary'} className="text-[8px] uppercase tracking-tighter h-6 px-3">
                        {m.estado}
                    </Badge>
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