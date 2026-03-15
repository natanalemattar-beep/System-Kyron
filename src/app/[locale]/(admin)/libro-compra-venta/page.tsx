
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Landmark, Download, FileSpreadsheet, Activity, Search, ShieldCheck } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function LibroCompraVentaPage() {
    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Landmark className="h-3 w-3" /> FORMALIDADES FISCALES
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Libros de <span className="text-primary italic">Compra y Venta</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Providencia Administrativa SNAT/2011/0071 • SENIAT</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                        Sincronizar Facturas
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                        <FileSpreadsheet className="mr-2 h-4 w-4" /> EXPORTAR LIBRO (.XLSX)
                    </Button>
                </div>
            </header>

            <div className="mb-10">
                <div className="relative max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input placeholder="Buscar por RIF, Nombre o Nro. de Factura..." className="pl-12 h-14 rounded-2xl bg-white/5 border-border text-xs font-bold uppercase tracking-widest" />
                </div>
            </div>

            <Tabs defaultValue="ventas" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
                    <TabsTrigger value="ventas" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Registro de Ventas</TabsTrigger>
                    <TabsTrigger value="compras" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Registro de Compras</TabsTrigger>
                </TabsList>
                
                <TabsContent value="ventas" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Relación Mensual de Ventas - Marzo 2026</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">RIF / Razón Social</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Nro. Factura</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base Imponible</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">IVA (16%)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { date: "08/03/2026", name: "Inversiones Epsilon, C.A.", rif: "J-12345678-9", invoice: "0000123", amount: 1500.00, iva: 240.00 },
                                        { date: "07/03/2026", name: "Distribuidora Master", rif: "J-98765432-1", invoice: "0000124", amount: 850.50, iva: 136.08 },
                                        { date: "06/03/2026", name: "Global Services S.A.", rif: "J-11223344-5", invoice: "0000125", amount: 2300.00, iva: 368.00 },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="pl-10 py-6 text-[10px] font-bold text-muted-foreground/60 uppercase">{row.date}</TableCell>
                                            <TableCell className="py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic">{row.name}</p>
                                                <p className="text-[8px] font-mono text-primary font-bold">{row.rif}</p>
                                            </TableCell>
                                            <TableCell className="py-6 font-mono text-xs font-bold text-foreground/40">{row.invoice}</TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(row.amount, 'Bs.')}</TableCell>
                                            <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(row.iva, 'Bs.')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                                <ShieldCheck className="h-4 w-4 text-primary" /> VALIDACIÓN FISCAL AUTOMÁTICA
                            </div>
                            <div className="text-right">
                                <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Total IVA Débito Fiscal</p>
                                <p className="text-2xl font-black italic text-primary">{formatCurrency(744.08, 'Bs.')}</p>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="compras" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl border-l-4 border-rose-500">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-rose-500 italic">Relación Mensual de Compras - Marzo 2026</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 text-center py-20 opacity-40">
                            <FileSpreadsheet className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Sincronizando con Bóveda de Egresos...</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
