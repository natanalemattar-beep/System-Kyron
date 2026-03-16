
"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, PlusCircle, FileDown, ArrowLeft, Landmark, CheckCircle, Activity } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const mockCompras = [
  { fecha: "01/03/2026", factura: "00123", proveedor: "Suministros Caracas, C.A.", rif: "J-12345678-9", monto: 5000, iva: 800, total: 5800, estado: "Pagado" },
  { fecha: "02/03/2026", factura: "00456", proveedor: "TecnoVentas S.A.", rif: "J-98765432-1", monto: 1200, iva: 192, total: 1392, estado: "Pendiente" },
];

const mockVentas = [
  { fecha: "01/03/2026", factura: "V-001", cliente: "Tech Solutions", rif: "J-11111111-1", monto: 15000, iva: 2400, total: 17400, estado: "Cobrado" },
];

export default function LibroCompraVentaPage() {
  const handleAction = (msg: string) => alert(msg);

  return (
    <div className="p-6 md:p-12 bg-background min-h-screen space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <Button variant="ghost" asChild className="p-0 h-auto text-primary hover:bg-transparent mb-2">
            <Link href="/contabilidad/libros"><ArrowLeft className="mr-2 h-4 w-4"/> VOLVER</Link>
          </Button>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
            <Landmark className="h-8 w-8 text-primary" />
            Compra y Venta
          </h1>
          <p className="text-muted-foreground font-medium text-sm uppercase tracking-widest opacity-60">REGISTRO FISCAL SENIAT • 2026</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/10" onClick={() => handleAction("Generando TXT...")}>
            <FileDown className="mr-2 h-4 w-4" /> EXPORTAR TXT
          </Button>
          <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
            <PlusCircle className="mr-2 h-4 w-4" /> REGISTRAR OPERACIÓN
          </Button>
        </div>
      </header>

      <Card className="glass-card border-none shadow-sm rounded-[2.5rem] overflow-hidden bg-card/40">
        <Tabs defaultValue="ventas" className="w-full">
          <TabsList className="w-full justify-start rounded-none bg-white/5 border-b border-white/5 h-14 px-8 gap-8">
            <TabsTrigger value="ventas" className="text-[10px] font-black uppercase tracking-widest data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full transition-all">Ventas Fiscales</TabsTrigger>
            <TabsTrigger value="compras" className="text-[10px] font-black uppercase tracking-widest data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full transition-all">Compras Fiscales</TabsTrigger>
          </TabsList>

          <div className="p-8">
            <TabsContent value="ventas" className="mt-0 space-y-10">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-none">
                    <TableHead className="pl-8 font-black uppercase text-[10px] tracking-widest opacity-30">Fecha</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest opacity-30">RIF / Cliente</TableHead>
                    <TableHead className="text-right font-black uppercase text-[10px] tracking-widest opacity-30">Monto</TableHead>
                    <TableHead className="text-right font-black uppercase text-[10px] tracking-widest opacity-30">IVA (16%)</TableHead>
                    <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest opacity-30">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVentas.map((v, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-white/[0.02] transition-colors group">
                      <TableCell className="pl-8 text-xs font-bold text-white/40">{v.fecha}</TableCell>
                      <TableCell>
                        <p className="font-black text-xs text-white/80 uppercase italic group-hover:text-primary transition-colors">{v.cliente}</p>
                        <p className="text-[8px] font-mono font-bold text-white/20 uppercase mt-1">{v.rif}</p>
                      </TableCell>
                      <TableCell className="text-right font-mono text-xs font-bold text-white/60">{formatCurrency(v.monto, 'Bs.')}</TableCell>
                      <TableCell className="text-right font-mono text-xs font-bold text-white/40">{formatCurrency(v.iva, 'Bs.')}</TableCell>
                      <TableCell className="text-right pr-8 font-mono text-sm font-black text-primary italic">{formatCurrency(v.total, 'Bs.')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="grid md:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black uppercase text-white/20 mb-1">Base Imponible</p>
                  <p className="text-2xl font-black text-white italic">{formatCurrency(43000, 'Bs.')}</p>
                </div>
                <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black uppercase text-emerald-500/40 mb-1">IVA Débito Fiscal</p>
                  <p className="text-2xl font-black text-emerald-500 italic">{formatCurrency(6880, 'Bs.')}</p>
                </div>
                <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 shadow-glow-sm">
                  <p className="text-[10px] font-black uppercase text-primary mb-1">Ventas Totales</p>
                  <p className="text-2xl font-black text-primary italic">{formatCurrency(49880, 'Bs.')}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="compras" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-none">
                    <TableHead className="pl-8 font-black uppercase text-[10px] tracking-widest opacity-30">Fecha</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest opacity-30">Proveedor</TableHead>
                    <TableHead className="text-right font-black uppercase text-[10px] tracking-widest opacity-30">Monto</TableHead>
                    <TableHead className="text-right pr-8 font-black uppercase text-[10px] tracking-widest opacity-30">IVA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCompras.map((c, i) => (
                    <TableRow key={i} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                      <TableCell className="pl-8 text-xs text-white/40">{c.fecha}</TableCell>
                      <TableCell className="font-black text-xs text-white/80 uppercase italic">{c.proveedor}</TableCell>
                      <TableCell className="text-right font-mono text-xs font-bold text-white/60">{formatCurrency(c.monto, 'Bs.')}</TableCell>
                      <TableCell className="text-right pr-8 font-mono text-xs font-black text-rose-500">{formatCurrency(c.iva, 'Bs.')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
