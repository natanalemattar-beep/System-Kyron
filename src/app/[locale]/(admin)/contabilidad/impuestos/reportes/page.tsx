
"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, ArrowLeft, Download, Search, Landmark, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const mockSummary = [
  { id: 1, impuesto: "IVA (Impuesto al Valor Agregado)", monto: 12450.80, variacion: "+5.2%", estado: "Declarado" },
  { id: 2, impuesto: "ISLR (Retenciones)", monto: 2100.50, variacion: "-1.2%", estado: "Declarado" },
  { id: 3, impuesto: "IGTF (Transacciones en Divisas)", monto: 850.30, variacion: "+12.4%", estado: "En Proceso" },
  { id: 4, impuesto: "Municipales (Act. Económica)", monto: 3200.00, variacion: "0%", estado: "Pendiente" },
];

export default function ReportesFiscalesPage() {
  const [periodo, setPeriodo] = useState("marzo-2026");
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <FileText className="h-8 w-8 text-[#00A86B]" />
            Reportes Fiscales
          </h1>
          <p className="text-slate-500 font-medium text-sm">Resúmenes analíticos de cumplimiento y carga tributaria.</p>
        </div>
        <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Generando dossier fiscal consolidado...")}>
          <Download className="mr-2 h-4 w-4" /> Bajar Dossier Completo
        </Button>
      </header>

      <div className="grid md:grid-cols-4 gap-6 items-end">
        <div className="md:col-span-2 space-y-2">
            <Label className="text-[10px] font-black uppercase text-slate-400 ml-1">Periodo de Análisis</Label>
            <Select value={periodo} onValueChange={setPeriodo}>
                <SelectTrigger className="h-12 rounded-xl bg-white border-none shadow-sm font-bold uppercase">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                    <SelectItem value="marzo-2026" className="uppercase text-xs font-bold">Marzo 2026</SelectItem>
                    <SelectItem value="febrero-2026" className="uppercase text-xs font-bold">Febrero 2026</SelectItem>
                    <SelectItem value="enero-2026" className="uppercase text-xs font-bold">Enero 2026</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Button variant="secondary" className="h-12 rounded-xl font-bold uppercase text-[10px] tracking-widest shadow-sm">Generar Vista</Button>
        <Button variant="outline" className="h-12 rounded-xl border-[#0A2472] text-[#0A2472] font-bold uppercase text-[10px] tracking-widest">Histórico Anual</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="p-8 border-b bg-slate-50/50 flex flex-row justify-between items-center">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Resumen de Carga Impositiva</CardTitle>
                    <Badge className="bg-[#0A2472]/10 text-[#0A2472] border-none text-[8px] font-black uppercase">{periodo.replace('-', ' ')}</Badge>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50">
                                <TableHead className="pl-8 font-bold text-[10px] uppercase">Concepto Tributario</TableHead>
                                <TableHead className="text-right font-bold text-[10px] uppercase">Monto Total</TableHead>
                                <TableHead className="text-center font-bold text-[10px] uppercase">Variación</TableHead>
                                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockSummary.map((s) => (
                                <TableRow key={s.id} className="hover:bg-slate-50 transition-colors">
                                    <TableCell className="pl-8 py-6 font-bold text-xs text-slate-700 uppercase italic">{s.impuesto}</TableCell>
                                    <TableCell className="text-right font-mono text-sm font-black text-[#0A2472]">{formatCurrency(s.monto, 'Bs.')}</TableCell>
                                    <TableCell className="text-center">
                                        <span className={cn(
                                            "text-[10px] font-black",
                                            s.variacion.startsWith('+') ? "text-rose-500" : s.variacion === '0%' ? "text-slate-400" : "text-emerald-500"
                                        )}>{s.variacion}</span>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-tighter border-slate-200 text-slate-400">{s.estado}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-8 bg-slate-50/50 border-t flex justify-between items-center">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-slate-400">Total Impuestos del Periodo</p>
                        <p className="text-2xl font-black italic text-[#0A2472]">{formatCurrency(18601.60, 'Bs.')}</p>
                    </div>
                    <Button className="bg-[#00A86B] hover:bg-emerald-600 rounded-xl font-bold uppercase text-[10px] tracking-widest px-8">Descargar PDF</Button>
                </CardFooter>
            </Card>
        </div>

        <div className="space-y-8">
            <Card className="border-none shadow-sm rounded-[2.5rem] bg-white p-10 flex flex-col items-center text-center group hover:shadow-lg transition-all">
                <div className="p-6 bg-slate-50 rounded-3xl mb-6 group-hover:scale-110 transition-transform shadow-inner"><Landmark className="h-12 w-12 text-[#0A2472]" /></div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#0A2472]">Solvencia Fiscal</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2 mb-8">Validación 360° ante el Estado</p>
                <div className="w-full space-y-3 mb-8">
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">SENIAT</span>
                        <span className="text-[9px] font-black text-emerald-500 uppercase">VÁLIDA</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">ALCALDÍA</span>
                        <span className="text-[9px] font-black text-emerald-500 uppercase">VÁLIDA</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">BANCOS</span>
                        <span className="text-[9px] font-black text-amber-500 uppercase">EN PROCESO</span>
                    </div>
                </div>
                <Button variant="outline" className="w-full rounded-xl h-12 border-slate-200 text-slate-400 hover:text-[#0A2472] font-black uppercase text-[10px] tracking-widest">Ver Detalles</Button>
            </Card>

            <Card className="border-none shadow-sm rounded-[2.5rem] bg-[#0A2472] p-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10"><Calculator className="h-32 w-32" /></div>
                <h3 className="text-xl font-black uppercase italic text-[#00A86B] mb-4">Eficiencia Impositiva</h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed uppercase mb-8">Has optimizado el pago de impuestos en un <span className="text-[#00A86B] font-black">12.4%</span> mediante el uso correcto de créditos fiscales.</p>
                <Button variant="link" className="p-0 h-auto text-[#00A86B] font-black uppercase text-[10px] tracking-widest">Sugerencias IA</Button>
            </Card>
        </div>
      </div>
    </div>
  );
}
