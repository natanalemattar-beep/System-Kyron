
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Landmark, PlusCircle, Download, FileText, Activity, Zap, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const registros = [
    { id: "LIC-001", producto: "Ron Añejo 750ml", tipo: "Destilado", base: 1250, alicuota: "15%", impuesto: 187.50, fecha: "25/07/2024" },
    { id: "LIC-002", producto: "Cerveza Nacional Caja 24", tipo: "Fermentado", base: 850, alicuota: "8%", impuesto: 68.00, fecha: "24/07/2024" },
    { id: "LIC-003", producto: "Vino Tinto Reserva", tipo: "Vino", base: 2100, alicuota: "10%", impuesto: 210.00, fecha: "22/07/2024" },
];

export default function LibroLicoresPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Landmark className="h-3 w-3" /> ÁREA DE ESPECIES
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Libro de <span className="text-primary italic">Licores</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Control de Especies Alcohólicas • Impuestos Especiales 2026</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={() => toast({ title: "REPORTE GENERADO" })}>
                <Download className="mr-2 h-4 w-4" /> EXPORTAR LIBRO
            </Button>
            <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                <PlusCircle className="mr-2 h-4 w-4" /> NUEVA ENTRADA
            </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Zap className="h-24 w-24" /></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Impuesto Acumulado (Mes)</p>
            <p className="text-4xl font-black italic text-primary tracking-tighter shadow-glow-text">{formatCurrency(465.50, 'Bs.')}</p>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-24 w-24" /></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Total Especies en Almacén</p>
            <p className="text-4xl font-black italic text-foreground tracking-tighter">458 Uds.</p>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Landmark className="h-24 w-24" /></div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Estatus Fiscal</p>
            <p className="text-4xl font-black italic text-emerald-500 tracking-tighter uppercase">AL DÍA</p>
        </Card>
      </div>

      <div className="mb-10">
        <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
            <Input placeholder="Buscar por producto o lote..." className="pl-12 h-14 rounded-2xl bg-white/5 border-border text-xs font-bold uppercase tracking-widest" />
        </div>
      </div>

      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Relación de Movimientos Mensuales</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/30 border-none">
                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Producto / ID</TableHead>
                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Categoría</TableHead>
                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Alícuota</TableHead>
                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base Imponible</TableHead>
                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Impuesto Calculado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {registros.map(reg => (
                        <TableRow key={reg.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                            <TableCell className="pl-10 py-6">
                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{reg.producto}</p>
                                <p className="text-[8px] font-mono text-muted-foreground font-bold uppercase tracking-widest">{reg.id} • {reg.fecha}</p>
                            </TableCell>
                            <TableCell className="py-6">
                                <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-border text-foreground/60">{reg.tipo}</Badge>
                            </TableCell>
                            <TableCell className="text-center py-6 font-black text-sm text-primary italic">{reg.alicuota}</TableCell>
                            <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(reg.base, 'Bs.')}</TableCell>
                            <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black italic text-primary">{formatCurrency(reg.impuesto, 'Bs.')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
        <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-center">
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic">Sistema de Control de Especies • Generado por System Kyron</p>
        </CardFooter>
      </Card>
    </div>
  );
}
