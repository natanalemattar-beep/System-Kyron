
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Calendar, ShieldCheck, AlertTriangle, Terminal, Zap, Activity } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function ProteccionPensionesPage() {
    const { toast } = useToast();
    const [nomina, setNomina] = useState<number>(0);
    const [empleados, setEmpleados] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const handleCalculate = () => {
        const calculated = nomina * 0.09;
        const minBase = empleados * 130;
        setTotal(Math.max(calculated, minBase));
        toast({ title: "CÁLCULO COMPLETADO", description: "Base mínima validada (130 Bs por empleado)." });
    };

    const calendar = [
        { rif: "0", dec: "20", pay: "27" },
        { rif: "1", dec: "23", pay: "28" },
        { rif: "2", dec: "18", pay: "17" },
        { rif: "3", dec: "12", pay: "23" },
        { rif: "4", dec: "25", pay: "22" },
        { rif: "5", dec: "13", pay: "18" },
        { rif: "6", dec: "19", pay: "25" },
        { rif: "7", dec: "24", pay: "19" },
        { rif: "8", dec: "26", pay: "24" },
        { rif: "9", dec: "27", pay: "30" },
    ];

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-emerald-500 pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600 shadow-glow mb-4">
                    <ShieldCheck className="h-3 w-3" /> GACETA OFICIAL N° 6.806
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Protección <span className="text-emerald-500 italic">de Pensiones</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Contribución Especial del 9% • Sector Privado 2026</p>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-10">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600 italic">Simulador de Contribución DPP</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Total Nómina del Mes (Bs.)</Label>
                                    <Input type="number" placeholder="0.00" onChange={e => setNomina(Number(e.target.value))} className="h-14 rounded-2xl bg-white/5 border-border font-black text-lg" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Nro. de Empleados</Label>
                                    <Input type="number" placeholder="0" onChange={e => setEmpleados(Number(e.target.value))} className="h-14 rounded-2xl bg-white/5 border-border font-black text-lg" />
                                </div>
                            </div>
                            <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl btn-3d-secondary font-black uppercase text-xs tracking-widest shadow-xl">CALCULAR APORTE</Button>
                            
                            <div className="p-10 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-[2.5rem] flex justify-between items-center group hover:border-emerald-500/40 transition-all">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Total a Liquidar</p>
                                    <p className="text-4xl font-black italic text-emerald-500 tracking-tighter shadow-glow-secondary">{formatCurrency(total, 'Bs.')}</p>
                                </div>
                                <div className="text-right">
                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black px-4 py-1">100% DEDUCIBLE ISLR</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Cronograma de Declaración y Pago 2026</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Último Dígito RIF</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Día Declaración</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Día Máx. Pago</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {calendar.map((row) => (
                                        <TableRow key={row.rif} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="py-4 text-center font-black text-sm text-primary">{row.rif}</TableCell>
                                            <TableCell className="py-4 text-center text-xs font-bold text-foreground/60">Día {row.dec} de cada mes</TableCell>
                                            <TableCell className="py-4 text-center text-xs font-bold text-foreground/60">Día {row.pay} de cada mes</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-10">
                    <Card className="bg-rose-600/10 border-2 border-rose-600/20 rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><AlertTriangle className="h-32 w-32 text-rose-500" /></div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-rose-500 mb-6 flex items-center gap-4">
                                <Zap className="h-6 w-6" /> Riesgo por Extemporaneidad
                            </h3>
                            <p className="text-sm font-bold opacity-80 leading-relaxed uppercase mb-8 text-justify text-white/70">
                                El retraso en la declaración acarrea una sanción de <span className="text-rose-500 font-black">1.000 veces el tipo de cambio oficial</span> del BCV. El sistema Kyron bloquea el cierre de nómina si no se valida el provisorio de DPP.
                            </p>
                        </div>
                        <Button variant="destructive" className="w-full h-12 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-2xl border-none">ACTIVAR ALERTA PREVENTIVA</Button>
                    </Card>

                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-2xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500 mb-10 flex items-center gap-3 italic">
                            <Terminal className="h-4 w-4" /> Inferencia Legal Pro
                        </h4>
                        <div className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/40 leading-relaxed text-justify">
                            <p><span className="text-emerald-500">»</span> Base mínima garantizada: 130 Bs por trabajador (Ajuste automático).</p>
                            <p><span className="text-emerald-500">»</span> Sujetos Pasivos: Todas las personas jurídicas del sector privado.</p>
                            <p><span className="text-emerald-500">»</span> El aporte es 100% patronal. No debe descontarse del salario.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
