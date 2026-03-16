
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Bell, ShieldCheck, Activity, Terminal, ArrowRight, Clock, AlertTriangle } from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const obligations = [
    { name: "IVA (Sujetos Pasivos Especiales)", freq: "Mensual", date: "Según terminal RIF", urgency: "high", note: "Días 12 al 27" },
    { name: "ISLR (Declaración Estimada)", freq: "Mensual", date: "Mismo día que IVA", urgency: "medium", note: "Anticipos 1%" },
    { name: "IGTF (Divisas / Cripto)", freq: "Mensual", date: "Mismo día que IVA", urgency: "low", note: "Alícuota 3%" },
    { name: "IGP (Grandes Patrimonios)", freq: "Anual", date: "Marzo 2026", urgency: "critical", note: "Vencimiento Próximo" },
    { name: "Aporte Entes Descentralizados (70%)", freq: "Mensual", date: "Mismo día que IVA", urgency: "low", note: "Fondo Especial" },
];

export default function CalendarioFiscalPage() {
    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-amber-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-amber-600 shadow-glow mb-4">
                        <Calendar className="h-3 w-3" /> NODO CRONOLÓGICO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Calendario <span className="text-amber-500 italic">Fiscal 2026</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Providencia SNAT/2025/000091 • SENIAT</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-[#0A2472]">
                    <Bell className="mr-3 h-4 w-4" /> ACTIVAR ALERTAS
                </Button>
            </header>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-amber-600 italic">Estatus de Obligaciones Próximas</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Obligación Tributaria</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Periodicidad</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Vencimiento</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Nota Técnica</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {obligations.map((row, i) => (
                                <TableRow key={i} className={cn(
                                    "border-border/50 hover:bg-muted/20 transition-all",
                                    row.urgency === 'critical' && "bg-amber-500/10"
                                )}>
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            {row.urgency === 'critical' && <AlertTriangle className="h-4 w-4 text-amber-500 animate-pulse" />}
                                            <p className="font-black text-xs text-foreground/80 uppercase italic">{row.name}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 text-center text-[10px] font-bold text-muted-foreground uppercase">{row.freq}</TableCell>
                                    <TableCell className="py-6 text-center">
                                        <Badge variant="outline" className={cn(
                                            "text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg",
                                            row.urgency === 'critical' ? "border-amber-500 text-amber-600 bg-white" : "border-border text-muted-foreground"
                                        )}>{row.date}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-10 py-6 font-mono text-[10px] font-bold text-primary italic uppercase">{row.note}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-8 border-t border-border bg-amber-500/5 flex justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-600 italic">Los Sujetos Pasivos Especiales deben declarar según el último dígito de su RIF.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
