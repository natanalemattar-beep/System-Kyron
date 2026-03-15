"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, PlusCircle, FileDown, ArrowLeft, Landmark, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockCompras = [
  { fecha: "01/03/2026", factura: "00123", proveedor: "Suministros Caracas, C.A.", rif: "J-12345678-9", monto: 5000, iva: 800, total: 5800, estado: "Pagado" },
  { fecha: "02/03/2026", factura: "00456", proveedor: "TecnoVentas S.A.", rif: "J-98765432-1", monto: 1200, iva: 192, total: 1392, estado: "Pendiente" },
  { fecha: "05/03/2026", factura: "00789", proveedor: "Papelería del Este", rif: "J-11223344-5", monto: 450, iva: 72, total: 522, estado: "Pagado" },
  { fecha: "08/03/2026", factura: "00999", proveedor: "Inversiones Marinas", rif: "J-55667788-9", monto: 3000, iva: 480, total: 3480, estado: "Pagado" },
  { fecha: "10/03/2026", factura: "01020", proveedor: "Servicios Generales", rif: "J-00998877-6", monto: 800, iva: 128, total: 928, estado: "Pendiente" },
];

const mockVentas = [
  { fecha: "01/03/2026", factura: "V-001", cliente: "Tech Solutions", rif: "J-11111111-1", monto: 15000, iva: 2400, total: 17400, estado: "Cobrado" },
  { fecha: "03/03/2026", factura: "V-002", cliente: "Distribuidora Master", rif: "J-22222222-2", monto: 8000, iva: 1280, total: 9280, estado: "Cobrado" },
  { fecha: "06/03/2026", factura: "V-003", cliente: "Logística Express", rif: "J-33333333-3", monto: 12000, iva: 1920, total: 13920, estado: "Pendiente" },
  { fecha: "09/03/2026", factura: "V-004", cliente: "Ferretería El Hierro", rif: "J-44444444-4", monto: 2500, iva: 400, total: 2900, estado: "Cobrado" },
  { fecha: "12/03/2026", factura: "V-005", cliente: "Importadora XYZ", rif: "J-55555555-5", monto: 5500, iva: 880, total: 6380, estado: "Pendiente" },
];

export default function LibroCompraVentaPage() {
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
            Libro de Compras y Ventas
          </h1>
          <p className="text-slate-500 font-medium text-sm">Registro fiscal obligatorio según Providencia Administrativa del SENIAT.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]" onClick={() => handleAction("Generando archivo TXT para portal SENIAT...")}>
            <FileDown className="mr-2 h-4 w-4" /> Exportar TXT
          </Button>
          <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl" onClick={() => handleAction("Abriendo formulario de registro...")}>
            <PlusCircle className="mr-2 h-4 w-4" /> Registrar Operación
          </Button>
        </div>
      </header>

      <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
        <Tabs defaultValue="ventas" className="w-full">
          <TabsList className="w-full justify-start rounded-none bg-white border-b h-14 px-6 gap-8">
            <TabsTrigger value="ventas" className="text-xs font-black uppercase tracking-widest data-[state=active]:text-[#0A2472] data-[state=active]:border-b-2 data-[state=active]:border-[#0A2472] rounded-none h-full">Ventas Realizadas</TabsTrigger>
            <TabsTrigger value="compras" className="text-xs font-black uppercase tracking-widest data-[state=active]:text-[#0A2472] data-[state=active]:border-b-2 data-[state=active]:border-[#0A2472] rounded-none h-full">Compras Recibidas</TabsTrigger>
          </TabsList>

          <div className="p-6">
            <TabsContent value="ventas" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold">Fecha</TableHead>
                    <TableHead className="font-bold">Factura</TableHead>
                    <TableHead className="font-bold">Cliente</TableHead>
                    <TableHead className="font-bold">RIF</TableHead>
                    <TableHead className="text-right font-bold">Monto</TableHead>
                    <TableHead className="text-right font-bold">IVA (16%)</TableHead>
                    <TableHead className="text-right font-bold">Total</TableHead>
                    <TableHead className="text-center font-bold">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVentas.map((v, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">{v.fecha}</TableCell>
                      <TableCell className="font-mono text-xs font-bold text-[#0A2472]">{v.factura}</TableCell>
                      <TableCell className="font-bold text-xs">{v.cliente}</TableCell>
                      <TableCell className="text-xs">{v.rif}</TableCell>
                      <TableCell className="text-right text-xs font-medium">{formatCurrency(v.monto, 'Bs.')}</TableCell>
                      <TableCell className="text-right text-xs font-medium">{formatCurrency(v.iva, 'Bs.')}</TableCell>
                      <TableCell className="text-right text-sm font-black text-[#0A2472]">{formatCurrency(v.total, 'Bs.')}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={v.estado === 'Cobrado' ? 'default' : 'secondary'} className="text-[9px] uppercase">{v.estado}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Base Imponible Total</p>
                  <p className="text-xl font-black text-[#0A2472]">{formatCurrency(43000, 'Bs.')}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">IVA Débito Fiscal</p>
                  <p className="text-xl font-black text-[#00A86B]">{formatCurrency(6880, 'Bs.')}</p>
                </div>
                <div className="p-6 bg-[#0A2472] rounded-2xl border border-[#0A2472] shadow-lg">
                  <p className="text-[10px] font-black uppercase text-white/60 mb-1">Ventas Totales</p>
                  <p className="text-xl font-black text-white">{formatCurrency(49880, 'Bs.')}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compras" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="font-bold">Fecha</TableHead>
                    <TableHead className="font-bold">Factura</TableHead>
                    <TableHead className="font-bold">Proveedor</TableHead>
                    <TableHead className="font-bold">RIF</TableHead>
                    <TableHead className="text-right font-bold">Monto</TableHead>
                    <TableHead className="text-right font-bold">IVA (16%)</TableHead>
                    <TableHead className="text-right font-bold">Total</TableHead>
                    <TableHead className="text-center font-bold">Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCompras.map((c, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-xs">{c.fecha}</TableCell>
                      <TableCell className="font-mono text-xs font-bold text-[#0A2472]">{c.factura}</TableCell>
                      <TableCell className="font-bold text-xs">{c.proveedor}</TableCell>
                      <TableCell className="text-xs">{c.rif}</TableCell>
                      <TableCell className="text-right text-xs font-medium">{formatCurrency(c.monto, 'Bs.')}</TableCell>
                      <TableCell className="text-right text-xs font-medium">{formatCurrency(c.iva, 'Bs.')}</TableCell>
                      <TableCell className="text-right text-sm font-black text-[#0A2472]">{formatCurrency(c.total, 'Bs.')}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={c.estado === 'Pagado' ? 'default' : 'secondary'} className="text-[9px] uppercase">{c.estado}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-50 rounded-2xl border">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Compras Totales</p>
                  <p className="text-xl font-black text-[#0A2472]">{formatCurrency(10450, 'Bs.')}</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">IVA Crédito Fiscal</p>
                  <p className="text-xl font-black text-[#00A86B]">{formatCurrency(1672, 'Bs.')}</p>
                </div>
                <div className="p-6 bg-emerald-600 rounded-2xl border border-emerald-600 shadow-lg">
                  <p className="text-[10px] font-black uppercase text-white/60 mb-1">Saldo a Favor</p>
                  <p className="text-xl font-black text-white">{formatCurrency(1672, 'Bs.')}</p>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}