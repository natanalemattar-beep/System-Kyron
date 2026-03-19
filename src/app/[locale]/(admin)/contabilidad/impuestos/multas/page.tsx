"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, ArrowLeft, Download, Eye, Gavel, Landmark } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockMultas = [
  { id: 1, fecha: "10/03/2026", ente: "SENIAT", concepto: "Declaración Extemporánea IVA Feb", monto: 5400, estado: "Pendiente", ref: "S-2026-X1" },
  { id: 2, fecha: "05/03/2026", ente: "Municipio Vargas", concepto: "Cartel de Publicidad no Declarado", monto: 1200, estado: "Pagada", ref: "M-0045" },
  { id: 3, fecha: "28/02/2026", ente: "INPSASEL", concepto: "Falta de cartelera informativa", monto: 850, estado: "Pagada", ref: "INS-99" },
  { id: 4, fecha: "15/02/2026", ente: "IVSS", concepto: "Retraso en pago quincena 01", monto: 320, estado: "Pagada", ref: "V-12" },
];

export default function MultasFiscalesPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-rose-500" />
            Multas y Sanciones
          </h1>
          <p className="text-slate-500 font-medium text-sm">Registro de infracciones y control legal de contingencias.</p>
        </div>
        <Button variant="outline" className="rounded-xl border-rose-500 text-rose-500" onClick={() => handleAction("Generando reporte de riesgo legal...")}>
          <Download className="mr-2 h-4 w-4" /> Exportar Registro
        </Button>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8 border-l-4 border-rose-500">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Monto por Liquidar</p>
          <p className="text-3xl font-black text-rose-500">{formatCurrency(5400, 'Bs.')}</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Pagado (Año)</p>
          <p className="text-3xl font-black text-[#0A2472]">{formatCurrency(2370, 'Bs.')}</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Infracciones Activas</p>
          <p className="text-3xl font-black text-slate-800">1 Evento</p>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Expediente de Sanciones</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold text-[10px] uppercase">Fecha</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Ente Emisor</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Concepto / Motivo</TableHead>
                <TableHead className="text-right font-bold text-[10px] uppercase">Monto Multa</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Referencia</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estatus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMultas.map((m) => (
                <TableRow key={m.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 text-xs">{m.fecha}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Landmark className="h-3 w-3 text-slate-400" />
                        <span className="font-black text-[10px] text-slate-800">{m.ente}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-slate-500 uppercase tracking-tight max-w-[200px]">{m.concepto}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-black text-rose-500">{formatCurrency(m.monto, 'Bs.')}</TableCell>
                  <TableCell className="text-center font-mono text-[10px] text-slate-400">{m.ref}</TableCell>
                  <TableCell className="text-right pr-8">
                    <Badge variant={m.estado === 'Pagada' ? 'default' : 'secondary'} className={cn(
                        "text-[8px] font-black uppercase tracking-widest px-3 h-6",
                        m.estado === 'Pendiente' && "bg-rose-100 text-rose-600 border-none"
                    )}>
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