
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Percent, Download, FileText, CheckCircle, Calculator, ShieldCheck, Activity } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function RetencionesIvaPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Percent className="h-3 w-3" /> NODO IMPOSITIVO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Retenciones <span className="text-primary italic">de IVA</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Providencia Administrativa SNAT/2015/0049</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <Download className="mr-3 h-4 w-4" /> EXPORTAR TXT
                </Button>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Total Retenido (Mes)</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter">{formatCurrency(12450.80, 'Bs.')}</p>
                </Card>
                <Card className="glass-card border-none bg-emerald-500/5 rounded-[2.5rem] p-8 shadow-2xl border-l-4 border-emerald-500">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-4">Alícuota Aplicada</p>
                    <p className="text-4xl font-black italic text-emerald-500 tracking-tighter">75% PRO</p>
                </Card>
                <Card className="glass-card border-none bg-primary/5 rounded-[2.5rem] p-8 shadow-2xl border-l-4 border-primary">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-4">Estatus Agente</p>
                    <p className="text-4xl font-black italic text-primary tracking-tighter uppercase">ACTIVO</p>
                </Card>
            </div>

            <Tabs defaultValue="practicadas" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
                    <TabsTrigger value="agentes" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Agentes</TabsTrigger>
                    <TabsTrigger value="practicadas" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Practicadas</TabsTrigger>
                </TabsList>

                <TabsContent value="practicadas" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Relación de Retenciones Practicadas - Marzo 2026</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Proveedor / RIF</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base Imponible</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">IVA (16%)</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Retenido (75%)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { date: "15/03/2026", name: "Inversiones Marinas, C.A.", rif: "J-12345678-9", base: 5000, iva: 800, ret: 600 },
                                        { date: "14/03/2026", name: "TecnoVentas S.A.", rif: "J-98765432-1", base: 1200, iva: 192, ret: 144 },
                                        { date: "12/03/2026", name: "Papelería del Este", rif: "J-11223344-5", base: 450, iva: 72, ret: 54 },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="pl-10 py-6 text-[10px] font-bold text-muted-foreground/60 uppercase">{row.date}</TableCell>
                                            <TableCell className="py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic">{row.name}</p>
                                                <p className="text-[8px] font-mono text-primary font-bold">{row.rif}</p>
                                            </TableCell>
                                            <TableCell className="py-6 font-mono text-xs font-bold text-foreground/70">{formatCurrency(row.base, 'Bs.')}</TableCell>
                                            <TableCell className="text-center py-6 font-mono text-xs font-bold text-foreground/40">{formatCurrency(row.iva, 'Bs.')}</TableCell>
                                            <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(row.ret, 'Bs.')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                <ShieldCheck className="h-4 w-4 text-primary" /> Validación Blockchain Activa
                            </div>
                            <Button variant="outline" className="h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Generar Comprobantes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
