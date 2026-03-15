"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, PlusCircle, ArrowLeft, Download, FileText, Filter } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockRetenciones = [
  { id: 1, fecha: "15/03/2026", proveedor: "Inversiones Marinas, C.A.", rif: "J-12345678-9", tipo: "IVA", base: 5000, pct: "75%", monto: 600, comprobante: "2026030001" },
  { id: 2, fecha: "16/03/2026", proveedor: "TecnoVentas S.A.", rif: "J-98765432-1", tipo: "ISLR", base: 1200, pct: "2%", monto: 24, comprobante: "2026030002" },
  { id: 3, fecha: "17/03/2026", proveedor: "Papelería del Este", rif: "J-11223344-5", tipo: "IVA", base: 450, pct: "100%", monto: 72, comprobante: "2026030003" },
  { id: 4, fecha: "18/03/2026", proveedor: "Servicios Globales", rif: "J-55667788-9", tipo: "ISLR", base: 3000, pct: "3%", monto: 60, comprobante: "2026030004" },
  { id: 5, fecha: "19/03/2026", proveedor: "Construcciones 2000", rif: "J-00998877-6", tipo: "IVA", base: 8000, pct: "75%", monto: 960, comprobante: "2026030005" },
];

export default function RetencionesPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
            <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
          </Button>
          <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-[#00A86B]" />
            Retenciones (IVA e ISLR)
          </h1>
          <p className="text-slate-500 font-medium text-sm">Registro y emisión de comprobantes de retención a proveedores.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]" onClick={() => handleAction("Filtrando retenciones...")}>
            <Filter className="mr-2 h-4 w-4" /> Filtrar
          </Button>
          <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Abriendo formulario de retención...")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Registrar Retención
          </Button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Retenido IVA (Mes)</p>
          <p className="text-3xl font-black text-[#0A2472]">{formatCurrency(1632, 'Bs.')}</p>
        </Card>
        <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
          <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Retenido ISLR (Mes)</p>
          <p className="text-3xl font-black text-[#00A86B]">{formatCurrency(84, 'Bs.')}</p>
        </Card>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Relación de Retenciones Practicadas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold">Fecha</TableHead>
                <TableHead className="font-bold">Proveedor</TableHead>
                <TableHead className="text-center font-bold">Tipo</TableHead>
                <TableHead className="text-right font-bold">Base</TableHead>
                <TableHead className="text-center font-bold">%</TableHead>
                <TableHead className="text-right font-bold">Retenido</TableHead>
                <TableHead className="text-right pr-8 font-bold">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRetenciones.map((r) => (
                <TableRow key={r.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 text-xs">{r.fecha}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-xs text-[#0A2472]">{r.proveedor}</span>
                      <span className="text-[9px] text-slate-400">{r.rif}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={r.tipo === 'IVA' ? 'default' : 'secondary'} className="text-[9px] uppercase">{r.tipo}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">{formatCurrency(r.base, 'Bs.')}</TableCell>
                  <TableCell className="text-center font-black text-xs">{r.pct}</TableCell>
                  <TableCell className="text-right font-mono text-xs font-bold text-[#00A86B]">{formatCurrency(r.monto, 'Bs.')}</TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="h-8 w-8 text-slate-400 hover:text-[#0A2472]" onClick={() => handleAction(`Generando comprobante ${r.comprobante}...`)}>
                      <Download className="h-4 w-4" />
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