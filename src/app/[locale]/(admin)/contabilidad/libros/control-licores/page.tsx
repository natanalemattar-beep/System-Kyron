"use client";

import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Landmark, PlusCircle, ArrowLeft, Download, Search, Info } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const mockLicores = [
  { id: 1, fecha: "15/03/2026", producto: "Ron Añejo 750ml", cant: 24, lote: "L-2024-01", proveedor: "Destilerías Unidas", tipo: "Entrada", doc: "F-123" },
  { id: 2, fecha: "16/03/2026", producto: "Vino Tinto Reserva", cant: 12, lote: "V-9988", proveedor: "Bodegas del Valle", tipo: "Entrada", doc: "F-456" },
  { id: 3, fecha: "17/03/2026", producto: "Cerveza Nacional 24x", cant: 50, lote: "C-0012", proveedor: "Cervecería Polar", tipo: "Salida", doc: "V-001" },
  { id: 4, fecha: "18/03/2026", producto: "Whisky 12 Años", cant: 6, lote: "W-5544", proveedor: "Importadora Global", tipo: "Entrada", doc: "F-789" },
  { id: 5, fecha: "19/03/2026", producto: "Ron Añejo 750ml", cant: 5, lote: "L-2024-01", proveedor: "Cliente VIP", tipo: "Salida", doc: "V-002" },
];

export default function LibroControlLicoresPage() {
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
            Libro de Control de Licores
          </h1>
          <p className="text-slate-500 font-medium text-sm">Registro de especies alcohólicas y control de alícuotas especiales.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]" onClick={() => handleAction("Generando reporte de especies alcohólicas...")}>
            <Download className="mr-2 h-4 w-4" /> Bajar Libro
          </Button>
          <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Abriendo formulario de registro de lote...")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Registrar Movimiento
          </Button>
        </div>
      </header>

      <Card className="bg-[#0A2472] border-none rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Landmark className="h-32 w-32" /></div>
        <div className="relative z-10 grid md:grid-cols-3 gap-8">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Total Existencias</p>
            <p className="text-3xl font-black italic tracking-tighter">458 Botellas</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Alícuota Pendiente</p>
            <p className="text-3xl font-black italic tracking-tighter text-[#00A86B]">{formatCurrency(4560, 'Bs.')}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">Último Cierre Fiscal</p>
            <p className="text-3xl font-black italic tracking-tighter">28/02/2026</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 space-y-2">
          <Label className="text-[10px] font-black uppercase text-slate-400">Buscar en Registro</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            <Input placeholder="Producto, Lote o Factura..." className="pl-10 h-12 rounded-xl bg-white border-none shadow-sm" />
          </div>
        </div>
        <Button variant="secondary" className="h-12 px-8 rounded-xl font-bold uppercase text-[10px] tracking-widest">Aplicar Filtros</Button>
      </div>

      <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
        <CardHeader className="p-8 border-b bg-slate-50/50">
          <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Relación de Movimientos de Especies</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="pl-8 font-bold text-[10px] uppercase">Fecha</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Producto</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Cant.</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Lote</TableHead>
                <TableHead className="font-bold text-[10px] uppercase">Proveedor/Destino</TableHead>
                <TableHead className="text-center font-bold text-[10px] uppercase">Tipo</TableHead>
                <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Documento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLicores.map((l) => (
                <TableRow key={l.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell className="pl-8 text-xs">{l.fecha}</TableCell>
                  <TableCell className="font-bold text-xs text-slate-800">{l.producto}</TableCell>
                  <TableCell className="text-center font-black text-xs">{l.cant}</TableCell>
                  <TableCell className="font-mono text-[10px] text-slate-400">{l.lote}</TableCell>
                  <TableCell className="text-xs font-medium text-slate-500">{l.proveedor}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={l.tipo === 'Entrada' ? 'default' : 'secondary'} className="text-[8px] uppercase">{l.tipo}</Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8 font-mono text-xs font-bold text-[#0A2472]">{l.doc}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="p-6 bg-slate-50 border-t flex items-center gap-3">
          <Info className="h-4 w-4 text-[#0A2472]" />
          <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Los datos aquí presentados cumplen con la Ley de Impuestos sobre Alcohol y Especies Alcohólicas.</p>
        </CardFooter>
      </Card>
    </div>
  );
}