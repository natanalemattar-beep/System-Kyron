
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Banknote, Download, FileText, UserCheck, Activity, Terminal, ShieldCheck } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const arcData = [
    { id: 1, empleado: "Ana Patricia Velásquez", ci: "V-16.892.437", acumulado: 120000, retenciones: 1200, status: "Generado" },
    { id: 2, empleado: "Luis Eduardo Ramírez", ci: "V-19.456.283", acumulado: 105000, retenciones: 1050, status: "Pendiente" },
    { id: 3, empleado: "Carlos Mattar", ci: "V-32.855.496", acumulado: 150000, retenciones: 1500, status: "Generado" },
];

export default function IslrArcPage() {
    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Banknote className="h-3 w-3" /> NODO DE PERSONAL
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Retenciones <span className="text-primary italic">AR-C</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Comprobantes de Retención de ISLR • Ejercicio Fiscal 2026</p>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Relación de Comprobantes AR-C</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Empleado / ID</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Ingreso Acumulado</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">ISLR Retenido</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estado</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {arcData.map(row => (
                                        <TableRow key={row.id} className="border-border/50 hover:bg-muted/20 transition-all group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{row.empleado}</p>
                                                <p className="text-[8px] font-mono text-muted-foreground font-bold">{row.ci}</p>
                                            </TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(row.acumulado, 'Bs.')}</TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-black text-rose-600 italic">({formatCurrency(row.retenciones, 'Bs.')})</TableCell>
                                            <TableCell className="text-center py-6">
                                                <Badge variant={row.status === 'Generado' ? 'default' : 'outline'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{row.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                                <ShieldCheck className="h-4 w-4 text-primary" /> VALIDACIÓN DE CARGA FAMILIAR ACTIVA
                            </div>
                            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[10px] tracking-widest">PROCESAR LOTE MASIVO</Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
                            <Terminal className="h-32 w-32" />
                        </div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-6">Guía de Retención</h3>
                        <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
                            El comprobante AR-C es obligatorio según el Reglamento de la Ley de ISLR. El sistema consolida los pagos de nómina y calcula el porcentaje de retención basado en la planilla ARI de cada trabajador.
                        </p>
                        <div className="space-y-4 border-t border-border pt-6">
                            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest opacity-40">
                                <span>Periodo de Carga:</span>
                                <span className="text-foreground">Enero - Diciembre</span>
                            </div>
                            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest opacity-40">
                                <span>Próximo Cierre:</span>
                                <span className="text-primary">31 de Marzo</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
