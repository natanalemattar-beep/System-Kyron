
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, Calculator, ShieldAlert, Activity, Terminal, ShieldX, TrendingDown, RefreshCw, Zap, TriangleAlert as AlertTriangle } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function MultasFiscalesPage() {
    const { toast } = useToast();
    const [tributo, setTributo] = useState<number>(0);
    const [tipoTributo, setTipoTributo] = useState("iva");
    const [multa, setMulta] = useState<number>(0);
    const [intereses, setIntereses] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);

    const handleCalculate = () => {
        if (tributo <= 0) {
            toast({
                variant: "destructive",
                title: "VALOR INVÁLIDO",
                description: "Introduzca el monto del tributo omitido para procesar."
            });
            return;
        }

        // Lógica diferenciada para DPP
        let factorMulta = 2; // 200% por defecto (COT)
        
        if (tipoTributo === 'dpp') {
            // La ley de pensiones establece hasta 1000 veces el TC, pero para el simulador
            // usamos un factor representativo de sanción máxima.
            factorMulta = 3; 
        }

        const calculatedMulta = tributo * factorMulta;
        const calculatedIntereses = tributo * 0.12; // Interés moratorio estimado
        
        setMulta(calculatedMulta);
        setIntereses(calculatedIntereses);
        setTotal(tributo + calculatedMulta + calculatedIntereses);

        toast({ 
            title: "SIMULACIÓN COMPLETADA", 
            description: `Calculado para ${tipoTributo.toUpperCase()} bajo protocolo de contingencia.` 
        });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10 min-h-screen">
            <header className="border-l-4 border-rose-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-500 shadow-sm mb-4">
                        <ShieldAlert className="h-3 w-3" /> ÁREA DE CONTINGENCIA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow text-white">Multas y <span className="text-rose-500 italic">Sanciones</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Código Orgánico Tributario (COT) • Prevención de Riesgos</p>
                </div>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <Card className="glass-card border-none rounded-[3rem] bg-white/[0.02] overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-rose-500 italic">Calculadora de Contingencia Fiscal</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase text-white/40 ml-1">Tributo Omitido</Label>
                                    <Select value={tipoTributo} onValueChange={setTipoTributo}>
                                        <SelectTrigger className="h-14 bg-white/[0.03] border-white/10 rounded-2xl font-bold uppercase text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black/95 border-white/10">
                                            <SelectItem value="iva" className="uppercase text-xs font-bold">IVA (Impuesto al Valor Agregado)</SelectItem>
                                            <SelectItem value="islr" className="uppercase text-xs font-bold">ISLR (Impuesto sobre la Renta)</SelectItem>
                                            <SelectItem value="igtf" className="uppercase text-xs font-bold">IGTF (Transacciones Divisas)</SelectItem>
                                            <SelectItem value="dpp" className="uppercase text-xs font-bold text-emerald-400">DPP (Protección de Pensiones)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase text-white/40 ml-1">Monto Omitido (Bs.)</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="0.00" 
                                        onChange={e => setTributo(Number(e.target.value))} 
                                        className="h-14 rounded-2xl bg-white/[0.03] border-white/10 font-black text-lg text-white" 
                                    />
                                </div>
                            </div>

                            {tipoTributo === 'dpp' && (
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in fade-in zoom-in-95">
                                    <div className="flex items-start gap-3">
                                        <AlertTriangle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                                        <p className="text-[10px] font-bold text-white/60 uppercase leading-relaxed">
                                            Nota DPP: El incumplimiento de este aporte conlleva multas de hasta <span className="text-emerald-400">1.000 veces el tipo de cambio oficial</span> de la moneda de mayor valor (BCV).
                                        </p>
                                    </div>
                                </div>
                            )}

                            <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase text-xs tracking-widest shadow-2xl border-none">EJECUTAR SIMULACIÓN</Button>
                            
                            <div className="space-y-4 pt-6">
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                    <span className="text-white/30 uppercase font-bold text-[10px] tracking-widest">Multa Estimada {tipoTributo === 'dpp' ? '(Máxima Ley)' : '(COT 200%)'}</span>
                                    <span className="font-black text-rose-500">{formatCurrency(multa, 'Bs.')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                    <span className="text-white/30 uppercase font-bold text-[10px] tracking-widest">Intereses Moratorios</span>
                                    <span className="font-black text-rose-500">{formatCurrency(intereses, 'Bs.')}</span>
                                </div>
                                <div className="flex justify-between items-center p-8 bg-rose-500/5 rounded-[2rem] border border-rose-500/10">
                                    <span className="font-black uppercase text-xs text-rose-600 italic tracking-tighter">Deuda Total Proyectada</span>
                                    <span className="text-3xl font-black italic text-rose-500 tracking-tighter shadow-glow-sm">{formatCurrency(total, 'Bs.')}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-10">
                    <Card className="glass-card border-none bg-white/[0.02] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Calculator className="h-32 w-32 text-white" /></div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-6">Ajuste por TC</h3>
                        <p className="text-xs font-bold text-white/40 leading-relaxed uppercase mb-8 text-justify">
                            De acuerdo al Código Orgánico Tributario, las multas deben ser liquidadas al tipo de cambio oficial de la moneda de mayor valor publicado por el BCV al momento del pago efectivo.
                        </p>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-emerald-400 italic">
                            <RefreshCw className="h-4 w-4 animate-spin-slow" /> Sincronización BCV: Activa
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.01] p-10 rounded-[2.5rem] shadow-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-rose-500 mb-8 flex items-center gap-3 italic">
                            <ShieldX className="h-4 w-4" /> Protocolo de Gravedad
                        </h4>
                        <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/30 leading-relaxed">
                            <li className="flex gap-4"><span className="text-rose-500 font-black">»</span> Leve: 100% del tributo omitido.</li>
                            <li className="flex gap-4"><span className="text-rose-500 font-black">»</span> Grave: 300% del tributo omitido.</li>
                            <li className="flex gap-4"><span className="text-rose-500 font-black">»</span> Reincidencia: Agravante del 50%.</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
}
