
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Landmark, MapPin, Download, PlusCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockMunicipales = [
    { id: 1, municipio: "Vargas (La Guaira)", concepto: "Actividad Económica", periodo: "02-2026", monto: 1250, estado: "Pagado" },
    { id: 2, municipio: "Libertador (Ccs)", concepto: "Inmuebles Urbanos", periodo: "1er Trim 2026", monto: 450, estado: "Pendiente" },
    { id: 3, municipio: "Vargas (La Guaira)", concepto: "Publicidad", periodo: "Anual 2026", monto: 800, estado: "En Proceso" },
];

export default function ImpuestosMunicipalesPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
                <Landmark className="h-8 w-8 text-[#00A86B]" />
                Impuestos Municipales
            </h1>
            <p className="text-slate-500 font-medium">Gestión de tasas y patentes por jurisdicción local.</p>
        </div>
        <Button className="bg-[#0A2472] rounded-xl font-bold"><PlusCircle className="mr-2 h-4 w-4"/>Pagar Tasa</Button>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-[#0A2472] text-white p-8 overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><MapPin className="h-24 w-24" /></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Municipios Activos</p>
            <p className="text-4xl font-black italic tracking-tighter leading-none">03</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Total Trimestre</p>
            <p className="text-4xl font-black italic text-[#0A2472] tracking-tighter leading-none">{formatCurrency(2500, 'Bs.')}</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8 border-l-4 border-rose-500">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-2">Alertas Vencimiento</p>
            <p className="text-4xl font-black italic text-slate-800 tracking-tighter leading-none">01 Trámite</p>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl">
        <CardHeader className="p-8 border-b bg-slate-50/50">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472]">Relación de Compromisos Municipales</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50 border-none">
                        <TableHead className="pl-8 font-black text-[10px] uppercase">Jurisdicción</TableHead>
                        <TableHead className="font-black text-[10px] uppercase">Concepto Tributario</TableHead>
                        <TableHead className="text-center font-black text-[10px] uppercase">Periodo</TableHead>
                        <TableHead className="text-right font-black text-[10px] uppercase">Monto</TableHead>
                        <TableHead className="text-right pr-8 font-black text-[10px] uppercase">Estatus</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockMunicipales.map(m => (
                        <TableRow key={m.id} className="border-border/50 hover:bg-slate-100 transition-all">
                            <TableCell className="pl-8 font-bold text-xs text-[#0A2472] uppercase italic">{m.municipio}</TableCell>
                            <TableCell className="text-xs font-medium text-slate-500 uppercase">{m.concepto}</TableCell>
                            <TableCell className="text-center font-mono text-[10px] text-slate-400">{m.periodo}</TableCell>
                            <TableCell className="text-right font-mono text-sm font-black text-slate-700">{formatCurrency(m.monto, 'Bs.')}</TableCell>
                            <TableCell className="text-right pr-8">
                                <Badge variant={m.estado === 'Pagado' ? 'default' : 'secondary'} className="text-[8px] font-black uppercase px-3">{m.estado}</Badge>
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
