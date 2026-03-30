
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calculator, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Activity, Terminal, Copy, Landmark, Smartphone, Search, Clock, Zap, CirclePlus as PlusCircle, ShieldCheck } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "@/navigation";

export default function IvaPage() {
    const { toast } = useToast();
    const [base, setBase] = useState<number>(0);
    const [iva, setIva] = useState<number>(0);

    const handleCalculate = () => {
        setIva(base * 0.16);
        toast({ title: "CÁLCULO COMPLETADO", description: "IVA estimado según tasa general del 16%." });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <FileText className="h-3 w-3" /> NODO IVA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Impuesto al <span className="text-primary italic">Valor Agregado</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Prov. 049 (2015) & Decreto 054 (Agosto 2025)</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                        <Link href="/contabilidad/tributos/retenciones-iva">Gestionar Retenciones</Link>
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        DECLARAR AHORA
                    </Button>
                </div>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-10">
                    <Card className="glass-card border-none rounded-[3rem] bg-white dark:bg-card/40 p-1 shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tight text-foreground flex items-center gap-4">
                                <CheckCircle className="text-primary h-6 w-6" /> Registro de Sujetos Pasivos
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">Alineado con Providencia 0049</CardDescription>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Protocolos Activos</h4>
                                    <ul className="space-y-3">
                                        {["Validación de Agente de Retención", "Certificación de Ingresos Brutos", "Control de Débito/Crédito", "Gestión de Notas de Ajuste"].map((doc, i) => (
                                            <li key={i} className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary/40" /> {doc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-6">
                                    <div className="p-6 bg-white/[0.03] border border-border rounded-2xl space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black uppercase text-muted-foreground/40">Cumplimiento Fiscal</span>
                                            <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black px-3">ÓPTIMO</Badge>
                                        </div>
                                        <p className="text-[9px] font-bold text-foreground/60 uppercase leading-relaxed">Sincronizado con Decreto 054 de Agosto 2025.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Simulador de Base Gravable</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Ingresos Brutos del Periodo (Bs.)</Label>
                                <Input type="number" placeholder="0.00" onChange={e => setBase(Number(e.target.value))} className="h-14 rounded-2xl bg-white/5 border-border font-black text-lg" />
                            </div>
                            <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-xl">CALCULAR DÉBITO</Button>
                            
                            <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] flex justify-between items-center group hover:bg-emerald-500/20 transition-all">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-emerald-400">IVA por Liquidar (16%)</p>
                                    <p className="text-3xl font-black italic text-emerald-400 shadow-glow-secondary">{formatCurrency(iva, 'Bs.')}</p>
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black px-4 h-6">ALÍCUOTA GENERAL</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-10">
                    <Card className="glass-card border-none bg-[#050505] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Landmark className="h-32 w-32 text-primary" /></div>
                        <div className="relative z-10 space-y-8">
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-primary">Blindaje SENIAT</h3>
                            <p className="text-xs font-bold text-white/40 leading-relaxed uppercase text-justify">
                                El sistema audita el momento imponible según el Artículo 13 de la Ley de IVA, asegurando que la retención se realice al momento del pago o abono en cuenta, según lo que ocurra primero.
                            </p>
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex flex-col gap-4 text-center">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest italic">Despacho Automático</p>
                                <Button variant="secondary" className="w-full bg-white text-black font-black uppercase text-[9px] tracking-widest h-12 rounded-xl">CONECTAR PORTAL FISCAL</Button>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8 shadow-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <Zap className="h-6 w-6 text-primary animate-pulse" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">Alertas de Auditoría</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                                <p className="text-[9px] font-bold text-muted-foreground uppercase leading-tight">Notas de Crédito sincronizadas con el Ledger histórico.</p>
                            </div>
                            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
                                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                                <p className="text-[9px] font-bold text-muted-foreground uppercase leading-tight">Verificar terminal de RIF para calendario de Marzo.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
