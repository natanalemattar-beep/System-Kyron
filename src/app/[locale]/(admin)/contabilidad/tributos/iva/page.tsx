
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    FileText, Download, Calculator, CheckCircle, 
    AlertTriangle, Activity, Terminal, Copy, Landmark, 
    Smartphone, Search, Clock, Zap
} from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockHistory = [
    { date: "15/03/2026", period: "02-2026", amount: 12450.80, status: "Declarado", ref: "IVA-2026-X1" },
    { date: "15/02/2026", period: "01-2026", amount: 10800.20, status: "Declarado", ref: "IVA-2026-X0" },
];

export default function IvaPage() {
    const { toast } = useToast();
    const [base, setBase] = useState<number>(0);
    const [iva, setIva] = useState<number>(0);

    const handleCalculate = () => {
        setIva(base * 0.16);
        toast({ title: "CÁLCULO COMPLETADO", description: "IVA estimado según tasa general del 16%." });
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: "COPIADO", description: "Dato bancario al portapapeles." });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <FileText className="h-3 w-3" /> NODO IVA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Impuesto al <span className="text-primary italic">Valor Agregado</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Liquidación Mensual • SNAT/2025/000091</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50" onClick={() => alert("Generando reporte Excel...")}>
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR LIBRO
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        DECLARAR AHORA
                    </Button>
                </div>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-10">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Calculadora de Liquidación IVA</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[9px] font-black uppercase text-muted-foreground/40 ml-1">Base Imponible Gravada (Ventas)</Label>
                                <Input type="number" placeholder="0.00" onChange={e => setBase(Number(e.target.value))} className="h-14 rounded-2xl bg-white/5 border-border font-black text-lg" />
                            </div>
                            <Button onClick={handleCalculate} className="w-full h-16 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-xl">EJECUTAR SIMULACIÓN</Button>
                            
                            <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-[2rem] flex justify-between items-center group hover:bg-emerald-500/20 transition-all">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-emerald-400">Débito Fiscal Estimado (16%)</p>
                                    <p className="text-3xl font-black italic text-emerald-400 shadow-glow-secondary">{formatCurrency(iva, 'Bs.')}</p>
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black px-4 h-6">TASA GENERAL</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Historial de Declaraciones IVA</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Periodo</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha Presentación</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Liquidado</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Comprobante</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockHistory.map((row, i) => (
                                        <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="pl-10 py-6 font-black text-xs uppercase italic">{row.period}</TableCell>
                                            <TableCell className="py-6 text-[10px] font-bold text-muted-foreground uppercase">{row.date}</TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-black text-primary">{formatCurrency(row.amount, 'Bs.')}</TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 text-primary">
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-10">
                    <Card className="glass-card border-none bg-[#0A2472] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Landmark className="h-32 w-32" /></div>
                        <div className="relative z-10 space-y-8">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#00A86B]">Terminal de Liquidación</h3>
                            
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Banco Receptor</p>
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <span className="text-xs font-bold uppercase">Banco de Venezuela</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => copyToClipboard("Banco de Venezuela")}><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Nro. de Cuenta</p>
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <span className="text-xs font-mono font-bold text-white/80">0102-0001-22-0000123456</span>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10" onClick={() => copyToClipboard("0102-0001-22-0000123456")}><Copy className="h-3 w-3" /></Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40">Planilla Única (PUB)</p>
                                    <Input placeholder="Ingrese número de planilla..." className="h-12 bg-white/5 border-white/10 rounded-xl text-xs font-mono text-white placeholder:opacity-20" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8 shadow-xl">
                        <div className="flex items-center gap-4 mb-6">
                            <Zap className="h-6 w-6 text-primary animate-pulse" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-foreground">Gestión de Alertas</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between group">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-primary transition-colors">WhatsApp 15 días antes</span>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[7px] font-black uppercase">ACTIVE</Badge>
                            </div>
                            <div className="flex items-center justify-between group">
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-primary transition-colors">Email 3 días antes</span>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[7px] font-black uppercase">ACTIVE</Badge>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
