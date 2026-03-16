
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Gavel, Calculator, ShieldAlert, Activity, Terminal, ShieldX, TrendingDown, RefreshCw } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MultasFiscalesPage() {
    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-rose-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-rose-500 shadow-glow mb-4">
                        <ShieldAlert className="h-3 w-3" /> NODO DE CONTINGENCIA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Multas y <span className="text-rose-500 italic">Sanciones</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Código Orgánico Tributario (COT) • Control de Riesgos</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-rose-600 hover:bg-rose-700 border-none">
                    CALCULAR RIESGO
                </Button>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-none bg-rose-500/5 p-8 rounded-[2rem] shadow-2xl border-l-4 border-rose-500">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500/60 mb-4">Multas por Liquidar</p>
                    <p className="text-4xl font-black italic text-rose-500 tracking-tighter">{formatCurrency(5400, 'Bs.')}</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Intereses Moratorios (Acum.)</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter">{formatCurrency(850.30, 'Bs.')}</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Tipo de Cambio (BCV)</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter">40.50 Bs.</p>
                </Card>
            </div>

            <Tabs defaultValue="calculadora" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner max-w-lg">
                    <TabsTrigger value="calculadora" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-rose-500 data-[state=active]:text-white transition-all">Calculadora</TabsTrigger>
                    <TabsTrigger value="historial" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-rose-500 data-[state=active]:text-white transition-all">Expedientes</TabsTrigger>
                    <TabsTrigger value="ajuste" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-rose-500 data-[state=active]:text-white transition-all">Ajuste TC</TabsTrigger>
                </TabsList>

                <TabsContent value="calculadora" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-rose-500 italic">Simulador de Sanciones COT</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Impuesto Omitido</Label>
                                    <Input type="number" placeholder="0.00" className="h-14 rounded-2xl bg-white/5 border-border font-black italic text-lg" />
                                </div>
                                <div className="space-y-3">
                                    <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Tipo de Infracción</Label>
                                    <select className="w-full h-14 bg-white/5 border border-border rounded-2xl px-4 font-bold text-xs uppercase appearance-none text-foreground/80">
                                        <option>Declaración Extemporánea (100%)</option>
                                        <option>Defraudación Tributaria (300%)</option>
                                        <option>Resistencia a la Autoridad</option>
                                    </select>
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black uppercase text-xs tracking-widest">CALCULAR MULTA</Button>
                            </div>
                            <div className="flex flex-col justify-center items-center text-center p-10 bg-white/5 rounded-[2.5rem] border border-border/50">
                                <p className="text-[10px] font-black uppercase text-muted-foreground/40 mb-2">Multa Estimada en USD (TC BCV)</p>
                                <p className="text-5xl font-black italic text-rose-500 tracking-tighter">$ 0.00</p>
                                <p className="text-[8px] font-bold uppercase text-muted-foreground mt-4 italic">El pago debe realizarse en VES según el tipo de cambio del día.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
