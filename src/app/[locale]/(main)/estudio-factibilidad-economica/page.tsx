
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { Download, Printer, TrendingUp, ChartBar as BarChart, CircleCheck as CheckCircle, Zap, FileText, ShieldCheck, Activity, Target, ChartBar as BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

const indicators = [
    { label: "Valor Actual Neto (VAN)", value: 450000, desc: "Flujo de caja descontado proyectado.", icon: TrendingUp },
    { label: "Tasa Interna de Retorno (TIR)", value: 0.285, desc: "Rendimiento anual del capital.", icon: Target },
    { label: "Período de Recuperación", value: "2.4 años", desc: "Retorno total de inversión inicial.", icon: Activity },
    { label: "Margen de Contribución", value: 0.32, desc: "Eficiencia neta por transacción.", icon: BarChart3 },
];

const projections = [
    { year: 1, revenue: 125000, profit: 40000, margin: 0.32 },
    { year: 2, revenue: 210000, profit: 100000, margin: 0.47 },
    { year: 3, revenue: 380000, profit: 240000, margin: 0.63 },
    { year: 4, revenue: 550000, profit: 370000, margin: 0.67 },
    { year: 5, revenue: 820000, profit: 600000, margin: 0.73 },
];

export default function EstudioFactibilidadPage() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20 animate-in fade-in duration-700 bg-black min-h-screen">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        #printable-report, #printable-report * { visibility: visible; }
                        #printable-report { position: absolute; left: 0; top: 0; width: 100%; border: none !important; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>
            
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 no-print border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary">
                        <Activity className="h-3 w-3" /> Audit: 2025-MASTER
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase italic text-foreground">Factibilidad <span className="text-primary">Económica</span></h1>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest opacity-40">Dictamen Técnico-Financiero • System Kyron 2025</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button className="h-12 px-8 rounded-xl text-[10px] font-semibold uppercase tracking-widest shadow-lg">
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR PDF
                    </Button>
                </div>
            </header>

            <div id="printable-report" className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {indicators.map((ind, i) => (
                        <Card key={i} className="glass-card border-white/5 p-8 rounded-xl hover:scale-[1.02] transition-all bg-white/[0.02]">
                            <div className="flex justify-between items-start mb-6">
                                <p className="text-[10px] font-semibold uppercase tracking-widest text-primary/60">{ind.label}</p>
                                <ind.icon className="h-4 w-4 text-primary animate-pulse" />
                            </div>
                            <p className="text-3xl font-bold text-white leading-none mb-3">
                                {typeof ind.value === 'number' ? 
                                    (ind.value < 1 ? formatPercentage(ind.value) : formatCurrency(ind.value, 'USD')) 
                                    : ind.value}
                            </p>
                            <p className="text-[11px] text-white/20 uppercase font-bold tracking-tight">{ind.desc}</p>
                        </Card>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-2 glass-card rounded-[2.5rem] border-white/5 overflow-hidden bg-black/40">
                        <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider flex items-center gap-3 text-white/90">
                                <TrendingUp className="text-primary h-5 w-5" /> Proyección Operativa Quinquenal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-white/[0.02] border-none">
                                        <TableHead className="pl-10 py-5 font-semibold uppercase text-[10px] tracking-widest text-white/40">Periodo Fiscal</TableHead>
                                        <TableHead className="text-right font-semibold uppercase text-[10px] tracking-widest text-white/40">Ingresos Brutos</TableHead>
                                        <TableHead className="text-right font-semibold uppercase text-[10px] tracking-widest text-white/40">Utilidad Neta</TableHead>
                                        <TableHead className="text-right pr-10 font-semibold uppercase text-[10px] tracking-widest text-white/40">Margen</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {projections.map(row => (
                                        <TableRow key={row.year} className="border-white/5 hover:bg-primary/5 transition-colors group">
                                            <TableCell className="pl-10 font-bold text-primary italic">AÑO 0{row.year}</TableCell>
                                            <TableCell className="text-right font-mono text-sm font-bold text-white/70">{formatCurrency(row.revenue, 'USD')}</TableCell>
                                            <TableCell className="text-right font-mono text-sm font-bold text-white">{formatCurrency(row.profit, 'USD')}</TableCell>
                                            <TableCell className="text-right pr-10">
                                                <Badge variant="outline" className="text-[10px] font-bold border-primary/20 text-primary bg-primary/5">{formatPercentage(row.margin)}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden border-none">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck className="h-48 w-48" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold uppercase italic tracking-tight mb-6 flex items-center gap-3">
                                <CheckCircle className="h-6 w-6" /> Dictamen Maestro
                            </h3>
                            <p className="text-lg font-medium italic leading-relaxed opacity-90 text-justify">
                                "El ecosistema Kyron demuestra una viabilidad estructural basada en la inmutabilidad de datos y la escalabilidad del modelo SaaS. El análisis de flujo de caja descontado confirma que el punto de equilibrio se alcanza en el mes 28 de operación continua."
                            </p>
                        </div>
                        <div className="pt-10 border-t border-white/20">
                            <p className="text-[10px] font-semibold uppercase tracking-wider opacity-60">Firma de Validación</p>
                            <p className="text-sm font-semibold uppercase italic mt-2 tracking-widest">CENTRO ESTRATÉGICO 2025</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
