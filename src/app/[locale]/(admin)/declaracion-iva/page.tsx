
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calculator, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Activity } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function DeclaracionIvaPage() {
    const { toast } = useToast();

    const mockData = {
        periodo: "Marzo 2026",
        ventasGravadas: 150000,
        ivaDebito: 24000,
        comprasGravadas: 80000,
        ivaCredito: 12800,
        totalAPagar: 11200,
    };

    const handleDeclarar = () => {
        toast({
            title: "DECLARACIÓN PROCESADA",
            description: "El expediente fiscal ha sido transmitido al portal del SENIAT.",
            action: <CheckCircle className="text-emerald-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-6 md:pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Activity className="h-3 w-3" /> NODO TRIBUTARIO
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Liquidación <span className="text-primary italic">de IVA</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Gestión de Impuesto al Valor Agregado • 2026</p>
            </header>

            <div className="grid lg:grid-cols-3 gap-10">
                <Card className="lg:col-span-2 glass-card border-none rounded-[3rem] p-1 shadow-2xl bg-card/40">
                    <CardHeader className="p-10 border-b border-border/50">
                        <CardTitle className="text-xl font-black uppercase italic tracking-tighter text-foreground">Resumen del Periodo: {mockData.periodo}</CardTitle>
                        <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">Cálculo asistido por Supervisor IA</CardDescription>
                    </CardHeader>
                    <CardContent className="p-10 space-y-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="p-8 bg-white/[0.03] border border-border rounded-[2rem] shadow-inner space-y-2">
                                <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Débito Fiscal (Ventas)</p>
                                <p className="text-3xl font-black italic text-foreground tracking-tighter">{formatCurrency(mockData.ivaDebito, 'Bs.')}</p>
                            </div>
                            <div className="p-8 bg-white/[0.03] border border-border rounded-[2rem] shadow-inner space-y-2">
                                <p className="text-[9px] font-black uppercase text-muted-foreground/40 tracking-widest">Crédito Fiscal (Compras)</p>
                                <p className="text-3xl font-black italic text-foreground tracking-tighter">{formatCurrency(mockData.ivaCredito, 'Bs.')}</p>
                            </div>
                        </div>
                        
                        <div className="p-10 bg-primary/10 border-2 border-primary/20 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-center gap-10 group hover:border-primary/40 transition-all">
                            <div className="space-y-2 text-center md:text-left">
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Monto Neto a Liquidar</p>
                                <p className="text-5xl font-black italic text-primary tracking-tighter italic-shadow">{formatCurrency(mockData.totalAPagar, 'Bs.')}</p>
                            </div>
                            <Button size="lg" onClick={handleDeclarar} className="w-full md:w-auto btn-3d-primary h-16 px-12 rounded-2xl font-black uppercase text-xs tracking-widest shadow-glow">
                                <Calculator className="mr-3 h-5 w-5" /> DESPACHAR AL SENIAT
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="bg-amber-500/10 border-2 border-amber-500/20 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <AlertTriangle className="h-32 w-32 text-amber-500" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-amber-600 mb-4">CRONOGRAMA</h3>
                            <p className="text-[10px] font-bold text-foreground/60 leading-relaxed uppercase mb-8">Tienes hasta el día 15 del mes en curso para evitar sanciones del Código Orgánico Tributario.</p>
                        </div>
                        <Button variant="outline" className="w-full h-12 rounded-xl border-amber-500/20 bg-amber-500/5 text-amber-600 font-black uppercase text-[10px] tracking-widest shadow-inner">
                            <Download className="mr-2 h-4 w-4" /> BAJAR ARCHIVO .TXT
                        </Button>
                    </Card>

                    <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-card/40">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-3 italic">
                            <Activity className="h-4 w-4" /> Auditoría Previa
                        </h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 leading-relaxed text-justify">
                            El sistema ha validado 45 facturas de venta y 12 de compra. Se ha detectado una exoneración aplicable según Gaceta 6.952.
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
}
