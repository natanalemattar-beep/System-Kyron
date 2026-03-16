
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Banknote, Download, Calculator, CheckCircle, 
    AlertTriangle, Activity, Terminal, Copy, Landmark, 
    Search, History, Zap, ShieldCheck
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IslrPage() {
    const { toast } = useToast();
    const [base, setBase] = useState<number>(0);
    const [retencion, setRetencion] = useState<number>(0);

    const handleCalculate = () => {
        setRetencion(base * 0.03); // Tasa honorarios base
        toast({ title: "CÁLCULO COMPLETADO", description: "Retención estimada según tasa del 3% (Honorarios Prof.)." });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-indigo-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-indigo-500 shadow-glow mb-4">
                        <Banknote className="h-3 w-3" /> NODO ISLR
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Renta y <span className="text-indigo-500 italic">Retenciones</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Declaraciones Definitivas y Estimadas • Decreto 1.800</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                        PLANILLA ARI
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-[#0A2472]">
                        DECLARACIÓN ANUAL
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="calculadora" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
                    <TabsTrigger value="calculadora" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Calculadora</TabsTrigger>
                    <TabsTrigger value="tarifas" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Tarifas</TabsTrigger>
                    <TabsTrigger value="estimadas" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Estimadas</TabsTrigger>
                </TabsList>

                <TabsContent value="calculadora">
                    <div className="grid gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-7 space-y-10">
                            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-10 shadow-2xl">
                                <div className="space-y-8">
                                    <div className="space-y-3">
                                        <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Monto de la Factura (Base Imponible)</Label>
                                        <Input type="number" placeholder="0.00" onChange={e => setBase(Number(e.target.value))} className="h-14 rounded-2xl bg-white/5 border-border font-black text-lg" />
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Concepto de Retención</Label>
                                        <Select defaultValue="honorarios">
                                            <SelectTrigger className="h-12 rounded-xl bg-white/5 border-border font-bold uppercase"><SelectValue /></SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                <SelectItem value="honorarios" className="uppercase text-xs font-bold">Honorarios Profesionales (3%)</SelectItem>
                                                <SelectItem value="arrendamiento" className="uppercase text-xs font-bold">Arrendamiento Inmuebles (3%)</SelectItem>
                                                <SelectItem value="comision" className="uppercase text-xs font-bold">Comisiones Mercantiles (3%)</SelectItem>
                                                <SelectItem value="publicidad" className="uppercase text-xs font-bold">Publicidad y Propaganda (3%)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl btn-3d-primary bg-indigo-600 hover:bg-indigo-700 font-black uppercase text-xs tracking-widest shadow-xl">SIMULAR RETENCIÓN</Button>
                                    
                                    <div className="p-8 bg-indigo-500/10 border border-indigo-500/30 rounded-[2rem] flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black uppercase text-indigo-400">Monto a Retener</p>
                                            <p className="text-3xl font-black italic text-indigo-400">{formatCurrency(retencion, 'Bs.')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase text-muted-foreground/40">Neto a Pagar</p>
                                            <p className="text-xl font-bold text-foreground/60">{formatCurrency(base - retencion, 'Bs.')}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div className="lg:col-span-5 space-y-10">
                            <Card className="glass-card border-none bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-10"><Zap className="h-32 w-32" /></div>
                                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-6">Aviso SPE</h3>
                                <p className="text-xs font-bold text-white/60 leading-relaxed uppercase text-justify">
                                    Los Sujetos Pasivos Especiales deben enterar las retenciones de ISLR según el calendario de pagos de IVA. System Kyron automatiza el archivo XML de carga masiva para el portal SENIAT.
                                </p>
                            </Card>
                            
                            <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-6 flex items-center gap-3">
                                    <ShieldCheck className="h-4 w-4" /> Blindaje Fiscal
                                </h4>
                                <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                    <li>• Validación de RIF contra base SENIAT.</li>
                                    <li>• Verificación de sustraendo acumulado.</li>
                                    <li>• Generación automática de comprobantes.</li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
