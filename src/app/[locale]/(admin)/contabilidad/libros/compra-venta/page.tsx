
"use client";

import { useState } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, PlusCircle, FileDown, ArrowLeft, Landmark, CheckCircle, Activity, ShieldCheck, Terminal, Filter } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const mockVentas = [
  { fecha: "15/03/2026", factura: "V-001", cliente: "Tech Solutions LLC", rif: "J-12345678-9", base: 15000, iva: 2400, total: 17400, ret: 1800, status: "Conciliado" },
  { fecha: "14/03/2026", factura: "V-002", cliente: "Innovate Corp", rif: "J-98765432-1", base: 8500, iva: 1360, total: 9860, ret: 1020, status: "Sincronizado" },
];

const mockCompras = [
  { fecha: "15/03/2026", factura: "C-450", proveedor: "Suministros Globales", rif: "J-31245678-0", base: 5000, iva: 800, total: 5800, ret: 600, status: "Pagado" },
];

export default function LibroCompraVentaPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("ventas");

  const handleExport = (format: string) => {
    toast({
        title: `GENERANDO ARCHIVO ${format}`,
        description: `Libro de ${activeTab.toUpperCase()} procesado para el periodo actual.`,
        action: <CheckCircle className="text-primary h-4 w-4" />
    });
  };

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Landmark className="h-3 w-3" /> NODO FISCAL
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter italic leading-none italic-shadow text-white">Libros <span className="text-primary">Fiscales</span></h1>
          <p className="text-muted-foreground font-bold text-[10px] uppercase tracking-[0.6em] opacity-40 mt-2 italic">Control de Compra y Venta • Sincronización SENIAT 2026</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={() => handleExport("TXT")}>
            <FileDown className="mr-3 h-4 w-4" /> EXPORTAR TXT
          </Button>
          <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
            <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR FACTURA
          </Button>
        </div>
      </header>

      <Card className="glass-card border-none rounded-[3.5rem] bg-card/40 overflow-hidden shadow-2xl">
        <Tabs defaultValue="ventas" onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none bg-white/5 border-b border-border/50 h-16 px-10 gap-10">
            <TabsTrigger value="ventas" className="text-[10px] font-black uppercase tracking-[0.3em] data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full transition-all">Ventas Fiscales</TabsTrigger>
            <TabsTrigger value="compras" className="text-[10px] font-black uppercase tracking-[0.3em] data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full transition-all">Compras Fiscales</TabsTrigger>
          </TabsList>

          <div className="p-0">
            <TabsContent value="ventas" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-none">
                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha / Referencia</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cliente / RIF</TableHead>
                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base Imponible</TableHead>
                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">IVA (16%)</TableHead>
                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Retención IVA</TableHead>
                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Total Neto</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVentas.map((v, i) => (
                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                      <TableCell className="pl-10 py-6">
                        <p className="font-black text-xs text-foreground/80 uppercase italic">{v.fecha}</p>
                        <p className="text-[8px] font-mono text-muted-foreground font-bold">{v.factura}</p>
                      </TableCell>
                      <TableCell className="py-6">
                        <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{v.cliente}</p>
                        <p className="text-[8px] font-mono text-primary font-bold">{v.rif}</p>
                      </TableCell>
                      <TableCell className="text-right py-6 font-mono text-xs font-bold text-foreground/70">{formatCurrency(v.base, 'Bs.')}</TableCell>
                      <TableCell className="text-right py-6 font-mono text-xs font-bold text-foreground/40">{formatCurrency(v.iva, 'Bs.')}</TableCell>
                      <TableCell className="text-right py-6 font-mono text-xs font-black text-rose-500 italic">({formatCurrency(v.ret, 'Bs.')})</TableCell>
                      <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic shadow-glow-text">{formatCurrency(v.total, 'Bs.')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="compras" className="mt-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-none">
                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha / Factura</TableHead>
                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Proveedor / RIF</TableHead>
                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base Imponible</TableHead>
                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">IVA Soportado</TableHead>
                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Total Operación</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCompras.map((c, i) => (
                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                      <TableCell className="pl-10 py-6 text-xs font-bold text-foreground/60">{c.fecha} • {c.factura}</TableCell>
                      <TableCell className="py-6">
                        <p className="font-black text-xs text-foreground/80 uppercase italic">{c.proveedor}</p>
                        <p className="text-[8px] font-mono text-primary font-bold">{c.rif}</p>
                      </TableCell>
                      <TableCell className="text-right py-6 font-mono text-xs font-bold text-foreground/70">{formatCurrency(c.base, 'Bs.')}</TableCell>
                      <TableCell className="text-right py-6 font-mono text-xs font-black text-rose-500">({formatCurrency(c.iva, 'Bs.')})</TableCell>
                      <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-foreground/80 italic">{formatCurrency(c.total, 'Bs.')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </div>
        </Tabs>
        <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-between items-center">
            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                <Terminal className="h-4 w-4" /> Validado por Kyron Intelligence v2.6.5
            </div>
            <div className="flex gap-10">
                <div className="text-right">
                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Base Imponible Total</p>
                    <p className="text-xl font-black italic text-foreground tracking-tighter">{formatCurrency(23500, 'Bs.')}</p>
                </div>
                <div className="text-right">
                    <p className="text-[8px] font-black uppercase text-primary mb-1">Débito Fiscal Neto</p>
                    <p className="text-xl font-black italic text-primary tracking-tighter shadow-glow-text">{formatCurrency(3760, 'Bs.')}</p>
                </div>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
