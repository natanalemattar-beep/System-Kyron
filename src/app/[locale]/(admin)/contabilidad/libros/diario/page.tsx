
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const mockAsientos = [
    { id: "001", fecha: "2026-03-15", glosa: "Venta de servicios - Factura V-001", debe: 17400, haber: 0, ref: "CXC-001" },
    { id: "002", fecha: "2026-03-15", glosa: "Costo de servicios - Factura V-001", debe: 0, haber: 15000, ref: "INV-001" },
    { id: "003", fecha: "2026-03-16", glosa: "Pago de servicios públicos", debe: 0, haber: 450, ref: "CXP-045" },
];

export default function LibroDiarioPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
            <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
                <FileText className="h-8 w-8 text-[#00A86B]" />
                Libro Diario
            </h1>
            <p className="text-slate-500 font-medium">Registro cronológico de operaciones contables.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4"/>Imprimir</Button>
            <Button className="bg-[#0A2472]"><Download className="mr-2 h-4 w-4"/>Exportar PDF</Button>
        </div>
      </header>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input placeholder="Buscar asiento..." className="pl-10 h-12 rounded-xl bg-white border-none shadow-sm" />
      </div>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                        <TableHead className="font-black text-[10px] uppercase pl-8">Ref / Fecha</TableHead>
                        <TableHead className="font-black text-[10px] uppercase">Descripción / Glosa</TableHead>
                        <TableHead className="text-right font-black text-[10px] uppercase">Debe</TableHead>
                        <TableHead className="text-right font-black text-[10px] uppercase">Haber</TableHead>
                        <TableHead className="text-right pr-8 font-black text-[10px] uppercase">Asiento</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockAsientos.map((a) => (
                        <TableRow key={a.id} className="hover:bg-slate-50 transition-colors">
                            <TableCell className="pl-8">
                                <div className="flex flex-col">
                                    <span className="font-bold text-xs text-[#0A2472]">{a.fecha}</span>
                                    <span className="text-[9px] text-slate-400 font-mono">{a.ref}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-xs font-medium text-slate-600 uppercase italic">{a.glosa}</TableCell>
                            <TableCell className="text-right font-mono text-xs font-bold text-emerald-600">{a.debe > 0 ? formatCurrency(a.debe, 'Bs.') : '-'}</TableCell>
                            <TableCell className="text-right font-mono text-xs font-bold text-rose-600">{a.haber > 0 ? formatCurrency(a.haber, 'Bs.') : '-'}</TableCell>
                            <TableCell className="text-right pr-8">
                                <Button variant="ghost" size="sm" onClick={() => alert("En construcción")}>Ver Asiento</Button>
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
