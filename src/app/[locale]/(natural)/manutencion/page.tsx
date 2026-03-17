
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, Calculator, History, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Download, Terminal } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const depositos = [
    { id: "DEP-001", fecha: "15/07/2024", monto: 1200, concepto: "Mensualidad Julio", estado: "Confirmado" },
    { id: "DEP-002", fecha: "15/06/2024", monto: 1200, concepto: "Mensualidad Junio", estado: "Confirmado" },
    { id: "DEP-003", fecha: "15/05/2024", monto: 1200, concepto: "Mensualidad Mayo", estado: "Confirmado" },
];

export default function ManutencionPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12">
            <header className="flex flex-col md:flex-row justify-between md:items-end gap-8 border-l-4 border-primary pl-8 py-2">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-white italic-shadow flex items-center gap-4">
                        <Gavel className="h-8 w-8 text-primary" />
                        Obligación de Manutención
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Cumplimiento LOPNNA • Nodo de Responsabilidad Civil</p>
                </div>
                <Button className="btn-3d-primary h-14 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => toast({ title: "Calculadora Activa", description: "Sincronizando con Unidad Tributaria vigente." })}>
                    <Calculator className="mr-3 h-5 w-5"/> CALCULAR APORTE
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-white/[0.01] overflow-hidden shadow-2xl">
                    <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <History className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black uppercase italic tracking-tighter">Historial de Depósitos</CardTitle>
                                <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Registro Inmutable de Aportes</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-white/[0.02] border-none">
                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Concepto</TableHead>
                                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto</TableHead>
                                    <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {depositos.map(dep => (
                                    <TableRow key={dep.id} className="border-white/5 hover:bg-white/[0.02] transition-all group">
                                        <TableCell className="pl-10 py-6 text-[10px] font-bold text-white/30 uppercase">{dep.fecha}</TableCell>
                                        <TableCell className="py-6 font-black uppercase text-xs text-white/80 group-hover:text-white">{dep.concepto}</TableCell>
                                        <TableCell className="text-right py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(dep.monto, 'Bs.')}</TableCell>
                                        <TableCell className="text-center py-6">
                                            <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest border-emerald-500/20 text-emerald-400 bg-emerald-500/5 h-6 px-3 rounded-lg">{dep.estado}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="p-8 border-t border-white/5 flex justify-center bg-white/[0.01]">
                        <Button variant="link" className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-primary">
                            <Download className="mr-3 h-4 w-4"/> DESCARGAR ESTADO DE CUENTA LEDGER
                        </Button>
                    </CardFooter>
                </Card>

                <div className="lg:col-span-4 space-y-10">
                    <Card className="bg-emerald-600 text-white rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow-secondary border-none">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <CheckCircle className="h-32 w-32" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-none">Estatus Legal: <br/> CUMPLIMIENTO</h3>
                            <p className="text-xs font-bold opacity-80 leading-relaxed uppercase">Su historial transaccional no registra deudas ni retrasos. El blindaje legal está activo.</p>
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8 border border-white/5">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 flex items-center gap-3 italic">
                                <AlertTriangle className="h-4 w-4" /> Protocolo LOPNNA
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed text-justify">
                            <div className="flex gap-4">
                                <span className="font-black text-primary">[Art. 365]</span>
                                <span>La manutención es un derecho de orden público e irrenunciable. El sistema monitorea la Unidad Tributaria para ajustes síncronos.</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
