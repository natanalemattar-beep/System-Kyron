
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Download, Activity, ShieldCheck, Terminal, Search, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const mockIgtf = [
    { id: "TX-001", fecha: "15/03/2026", montoUsd: 1500, montoBs: 60750, igtf: 1822.50, status: "Liquidado" },
    { id: "TX-002", fecha: "14/03/2026", montoUsd: 850, montoBs: 34425, igtf: 1032.75, status: "Pendiente" },
    { id: "TX-003", fecha: "12/03/2026", montoUsd: 2300, montoBs: 93150, igtf: 2794.50, status: "Liquidado" },
];

export default function IgtfPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <CreditCard className="h-3 w-3" /> NODO DE DIVISAS
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión <span className="text-primary italic">de IGTF</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Impuesto a Grandes Transacciones Financieras • 3% Alícuota</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => toast({ title: "REPORTE GENERADO" })}>
                    <Download className="mr-3 h-4 w-4" /> EXPORTAR LIBRO IGTF
                </Button>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Monto Gravado (Mes)</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter">{formatCurrency(4650, 'USD')}</p>
                </Card>
                <Card className="glass-card border-none bg-primary/5 rounded-[2.5rem] p-8 shadow-2xl border-l-4 border-primary">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-4">IGTF por Pagar</p>
                    <p className="text-4xl font-black italic text-primary tracking-tighter shadow-glow-text">{formatCurrency(5649.75, 'Bs.')}</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Transacciones en Divisas</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter">12 EVENTOS</p>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registro de Operaciones en Moneda Extranjera</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha / ID</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto USD</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Bs. (BCV)</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">IGTF 3%</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockIgtf.map(row => (
                                <TableRow key={row.id} className="border-border/50 hover:bg-muted/20 transition-all">
                                    <TableCell className="pl-10 py-6">
                                        <p className="font-black text-xs text-foreground/80 uppercase italic">{row.fecha}</p>
                                        <p className="text-[8px] font-mono text-primary font-bold uppercase">{row.id}</p>
                                    </TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/70">{formatCurrency(row.montoUsd, 'USD')}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/40">{formatCurrency(row.montoBs, 'Bs.')}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(row.igtf, 'Bs.')}</TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Badge variant={row.status === 'Liquidado' ? 'default' : 'secondary'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{row.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                        <ShieldCheck className="h-4 w-4 text-primary" /> Validación síncrona con Tasa BCV
                    </div>
                    <Button variant="outline" className="h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Generar TXT para SENIAT</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
