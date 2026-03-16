
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, Calculator, ShieldAlert, Activity, Terminal, ShieldX, TrendingDown, RefreshCw, Zap } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function MultasFiscalesPage() {
    const { toast } = useToast();
    const [tributo, setTributo] = useState<number>(0);
    const [multa, setMulta] = useState<number>(0);
    const [intereses, setIntereses] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const handleCalculate = () => {
        const calculatedMulta = tributo * 2; // Promedio 200% según COT
        const calculatedIntereses = tributo * 0.12; // Simulado
        setMulta(calculatedMulta);
        setIntereses(calculatedIntereses);
        setTotal(tributo + calculatedMulta + calculatedIntereses);
        toast({ title: "SIMULACIÓN COMPLETADA", description: "Basado en el tipo de cambio oficial BCV." });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
            <header className="border-l-4 border-rose-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-500 shadow-sm mb-4">
                        <ShieldAlert className="h-3 w-3" /> NODO DE CONTINGENCIA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">Multas y <span className="text-rose-500 italic">Sanciones</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Código Orgánico Tributario (COT) • Prevención de Riesgos</p>
                </div>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <Card className="glass-card border-none rounded-[3rem] bg-white overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-slate-100 bg-rose-50/30">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-rose-500 italic">Calculadora de Multas COT</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase text-slate-400 ml-1">Monto del Tributo Omitido (Bs.)</Label>
                                <Input type="number" placeholder="0.00" onChange={e => setTributo(Number(e.target.value))} className="h-14 rounded-2xl bg-slate-50 border-slate-200 font-black text-lg" />
                            </div>
                            <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase text-xs tracking-widest shadow-2xl border-none">EJECUTAR SIMULACIÓN</Button>
                            
                            <div className="space-y-4 pt-6">
                                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                                    <span className="text-slate-400 uppercase font-bold text-[10px]">Multa Estimada (COT 200%)</span>
                                    <span className="font-black text-rose-500">{formatCurrency(multa, 'Bs.')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
                                    <span className="text-slate-400 uppercase font-bold text-[10px]">Intereses Moratorios</span>
                                    <span className="font-black text-rose-500">{formatCurrency(intereses, 'Bs.')}</span>
                                </div>
                                <div className="flex justify-between items-center p-6 bg-rose-500/5 rounded-2xl border border-rose-500/10">
                                    <span className="font-black uppercase text-xs text-rose-600 italic">Total Proyectado a Pagar</span>
                                    <span className="text-2xl font-black italic text-rose-500 tracking-tighter">{formatCurrency(total, 'Bs.')}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-10">
                    <Card className="glass-card border-none bg-[#0A2472] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Calculator className="h-32 w-32 text-white" /></div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-6">Ajuste por TC</h3>
                        <p className="text-xs font-bold text-white/60 leading-relaxed uppercase mb-8 text-justify">
                            De acuerdo al COT, las multas deben pagarse al tipo de cambio oficial de la moneda de mayor valor publicado por el BCV al momento del pago. El sistema recalcula la deuda diariamente.
                        </p>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-[#00A86B] italic">
                            <RefreshCw className="h-4 w-4 animate-spin-slow" /> Sincronización BCV: Activa
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-white p-8 rounded-[2.5rem] shadow-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-rose-500 mb-6 flex items-center gap-3 italic">
                            <ShieldX className="h-4 w-4" /> Protocolo de Gravedad
                        </h4>
                        <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 leading-relaxed">
                            <li><span className="text-rose-500">»</span> Leve: 100% del tributo omitido.</li>
                            <li><span className="text-rose-500">»</span> Grave: 300% del tributo omitido.</li>
                            <li><span className="text-rose-500">»</span> Reincidencia: Agravante del 50%.</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
}
