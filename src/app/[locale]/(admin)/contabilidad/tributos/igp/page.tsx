
"use client";
import { BackButton } from "@/components/back-button";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Download, Calculator, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Activity, Terminal, ShieldCheck, Zap, Landmark, History } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function IgpPage() {
    const { toast } = useToast();
    const [patrimonio, setPatrimonio] = useState<number>(0);
    const [cuota, setCuota] = useState<number>(0);

    const handleCalculate = () => {
        const alicuota = 0.0025; // 0.25% mínima
        setCuota(patrimonio * alicuota);
        toast({ title: "VALORACIÓN PATRIMONIAL", description: "Cálculo basado en alícuota mínima del 0.25%." });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-amber-600 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-600/10 border border-amber-600/20 text-[9px] font-black uppercase tracking-[0.4em] text-amber-600 shadow-glow mb-4">
                        <Coins className="h-3 w-3" /> CENTRO IGP
                    </div>
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Grandes <span className="text-amber-600 italic">Patrimonios</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Declaración Anual • Sujetos Pasivos Especiales</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-amber-600 hover:bg-amber-700 border-none">
                    SOLICITAR VALORACIÓN
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-10 shadow-2xl">
                        <CardHeader className="p-0 mb-10">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tight text-foreground">Determinación de Base Imponible</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Valor neto de activos menos pasivos</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 space-y-10">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Patrimonio Neto Fiscal (Bs.)</Label>
                                <Input type="number" placeholder="0.00" onChange={e => setPatrimonio(Number(e.target.value))} className="h-14 rounded-2xl bg-white/5 border-border font-black text-lg" />
                            </div>
                            <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black uppercase text-xs tracking-widest shadow-xl border-none">EJECUTAR VALORACIÓN IA</Button>
                            
                            <div className="p-10 bg-amber-500/10 border-2 border-amber-500/20 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-10 group hover:border-amber-500/40 transition-all">
                                <div className="space-y-2 text-center md:text-left">
                                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.4em]">Cuota Tributaria Estimada</p>
                                    <p className="text-5xl font-black italic text-amber-600 tracking-tight shadow-glow">{formatCurrency(cuota, 'Bs.')}</p>
                                </div>
                                <div className="text-right">
                                    <Badge className="bg-amber-500/20 text-amber-600 border-none text-[8px] font-black px-4 py-1.5 uppercase">TASA: 0.25%</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <Card className="glass-card border-none bg-amber-600 text-white p-10 rounded-[3rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><ShieldCheck className="h-32 w-32" /></div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6">Calendario IGP</h3>
                        <p className="text-sm font-bold opacity-80 leading-relaxed uppercase mb-8">
                            La declaración de IGP se realiza anualmente durante los meses de octubre y noviembre, según el último dígito del RIF del Sujeto Pasivo Especial.
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
                            <Terminal className="h-4 w-4 text-white" /> Proceso síncrono SENIAT
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.02] p-8 rounded-[2.5rem] shadow-xl">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 mb-6 flex items-center gap-3">
                            <AlertTriangle className="h-4 w-4" /> Nota de Cumplimiento
                        </h4>
                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase leading-relaxed text-justify">
                            El IGP grava el patrimonio que supere las 150.000 Unidades Tributarias. El sistema realiza una tasación preliminar basada en los Libros de Activos Fijos y balances auditados.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
