
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, Printer, TrendingUp, ChartBar as BarChart, CircleCheck as CheckCircle, ChartPie as PieChart, ArrowRight, FileText, ShieldCheck, Zap, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

const indicators = [
    { label: "Valor Actual Neto (VAN)", value: 450000, desc: "Rentabilidad neta en valor presente descontando la inversión." },
    { label: "Tasa Interna de Retorno (TIR)", value: "28.5%", desc: "Rendimiento anual esperado del capital invertido." },
    { label: "Período de Recuperación", value: "2.4 años", desc: "Tiempo estimado para retornar la inversión inicial." },
    { label: "Margen Operativo", value: "32%", desc: "Eficiencia de la plataforma tras costos directos." },
];

const investmentBreakdown = [
    { item: "Infraestructura Cloud & IA", cost: 45000, type: "CapEx" },
    { item: "Desarrollo de Software Ecosistema", cost: 120000, type: "CapEx" },
    { item: "Implementación Nodo Blockchain", cost: 15000, type: "CapEx" },
    { item: "Marketing y Lanzamiento", cost: 30000, type: "OpEx" },
    { item: "Reserva de Contingencia", cost: 10000, type: "Reserva" },
];

const projections = [
    { year: 1, revenue: 125000, costs: 85000, profit: 40000, clients: 120 },
    { year: 2, revenue: 210000, costs: 110000, profit: 100000, clients: 250 },
    { year: 3, revenue: 380000, costs: 140000, profit: 240000, clients: 500 },
    { year: 4, revenue: 550000, costs: 180000, profit: 370000, clients: 850 },
    { year: 5, revenue: 820000, costs: 220000, profit: 600000, clients: 1400 },
];

export default function EstudioFactibilidadPage() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleAction = (action: 'print' | 'download') => {
        if (typeof window !== 'undefined') {
            window.print();
            toast({
                title: action === 'print' ? "Impresión Iniciada" : "Preparando PDF",
                description: "El reporte técnico se ha generado con el sello oficial de System Kyron.",
            });
        }
    };

    if (!isClient) return null;

    return (
        <div className="p-4 md:p-8 space-y-8 max-w-6xl mx-auto">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        #printable-content, #printable-content * { visibility: visible; }
                        #printable-content { position: absolute; left: 0; top: 0; width: 100%; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>
            
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                        <BarChart className="h-8 w-8 text-primary" />
                        ANÁLISIS DE FACTIBILIDAD ECONÓMICA
                    </h1>
                    <p className="text-muted-foreground font-medium">Dictamen técnico de viabilidad financiera - Ecosistema Kyron.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-10 rounded-xl" onClick={() => handleAction('print')}>
                        <Printer className="mr-2 h-4 w-4" /> Imprimir Informe
                    </Button>
                    <Button size="sm" className="h-10 rounded-xl shadow-lg" onClick={() => handleAction('download')}>
                        <Download className="mr-2 h-4 w-4" /> Exportar PDF
                    </Button>
                </div>
            </header>

            <div id="printable-content" className="space-y-8">
                <Card className="border-2 shadow-2xl overflow-hidden rounded-[2rem]">
                    <CardHeader className="text-center bg-secondary/30 p-10 border-b relative">
                        <div className="absolute top-6 left-6 opacity-20">
                            <Logo className="h-12 w-12" />
                        </div>
                        <div className="mx-auto w-fit mb-6 bg-background p-4 rounded-3xl shadow-inner border">
                            <Logo className="h-20 w-20" />
                        </div>
                        <CardTitle className="text-4xl font-black uppercase tracking-tighter mb-2">Proyecto de Factibilidad 2025</CardTitle>
                        <CardDescription className="font-bold text-primary">System Kyron, C.A. | RIF: J-12345678-9</CardDescription>
                        <div className="mt-4 flex justify-center gap-4">
                            <Badge variant="outline" className="bg-background">Confidencial</Badge>
                            <Badge variant="outline" className="bg-background">Versión 1.0.2</Badge>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="p-8 md:p-12 space-y-16">
                        {/* Resumen Ejecutivo */}
                        <section>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3 border-l-4 border-primary pl-4">
                                <Zap className="h-5 w-5 text-primary" />
                                1. RESUMEN EJECUTIVO
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground text-justify">
                                El presente estudio evalúa la implementación del ecosistema integral de gestión **System Kyron**. La propuesta se basa en un modelo de negocio híbrido que combina servicios **SaaS (Software as a Service)**, integración de pagos **FinTech** y provisión de infraestructura tecnológica. El análisis financiero proyecta una alta rentabilidad derivada de la escalabilidad de la plataforma IA y la retención de clientes mediante el sellado Blockchain de transacciones fiscales.
                            </p>
                        </section>

                        {/* Inversión Inicial */}
                        <section>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3 border-l-4 border-primary pl-4">
                                <FileText className="h-5 w-5 text-primary" />
                                2. ESTRUCTURA DE INVERSIÓN (CapEx)
                            </h3>
                            <div className="border rounded-2xl overflow-hidden bg-card">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-secondary/50">
                                            <TableHead className="font-black">Concepto de Inversión</TableHead>
                                            <TableHead className="text-center font-black">Categoría</TableHead>
                                            <TableHead className="text-right font-black">Monto (USD)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {investmentBreakdown.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{row.item}</TableCell>
                                                <TableCell className="text-center text-xs font-bold uppercase tracking-widest opacity-60">{row.type}</TableCell>
                                                <TableCell className="text-right font-mono font-bold">{formatCurrency(row.cost, 'USD')}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="bg-primary/5">
                                            <TableCell className="font-black text-lg" colSpan={2}>TOTAL INVERSIÓN INICIAL</TableCell>
                                            <TableCell className="text-right font-black text-lg text-primary">{formatCurrency(220000, 'USD')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        {/* Proyección Financiera */}
                        <section>
                            <h3 className="text-xl font-black mb-6 flex items-center gap-3 border-l-4 border-primary pl-4">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                3. PROYECCIÓN DE FLUJO DE CAJA (5 AÑOS)
                            </h3>
                            <div className="border rounded-2xl overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-secondary/50">
                                            <TableHead className="font-black">Período</TableHead>
                                            <TableHead className="text-center font-black">Clientes Est.</TableHead>
                                            <TableHead className="text-right font-black">Ingresos Brutos</TableHead>
                                            <TableHead className="text-right font-black">Costos Op.</TableHead>
                                            <TableHead className="text-right font-black">Utilidad Neta</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projections.map(row => (
                                            <TableRow key={row.year}>
                                                <TableCell className="font-black text-primary">Año {row.year}</TableCell>
                                                <TableCell className="text-center font-mono">{row.clients}</TableCell>
                                                <TableCell className="text-right font-medium">{formatCurrency(row.revenue, 'USD')}</TableCell>
                                                <TableCell className="text-right text-red-500 font-medium">({formatCurrency(row.costs, 'USD')})</TableCell>
                                                <TableCell className="text-right font-black text-green-600 bg-green-500/5">{formatCurrency(row.profit, 'USD')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        {/* Indicadores Clave */}
                        <section>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {indicators.map(ind => (
                                    <div key={ind.label} className="p-6 rounded-2xl border-2 border-primary/5 bg-secondary/20 hover:border-primary/20 transition-all">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">{ind.label}</p>
                                        <p className="text-2xl font-black text-primary leading-none mb-3">
                                            {typeof ind.value === 'number' ? formatCurrency(ind.value, 'USD') : ind.value}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground leading-tight font-medium">{ind.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Dictamen */}
                        <section className="bg-primary text-primary-foreground p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-10 opacity-10">
                                <ShieldCheck className="h-40 w-40" />
                            </div>
                            <h3 className="text-2xl font-black mb-4 flex items-center gap-3 relative z-10">
                                <CheckCircle className="h-6 w-6" />
                                DICTAMEN DE FACTIBILIDAD
                            </h3>
                            <p className="text-lg leading-relaxed relative z-10 font-medium italic opacity-90">
                                "Tras el análisis exhaustivo de los flujos de caja descontados y la capacidad de escalabilidad técnica del Ecosistema Kyron, se dictamina una **VIABILIDAD ECONÓMICA SOBRESALIENTE**. La robustez del modelo SaaS permite absorber los costos operativos rápidamente, proyectando una TIR del 28.5%, la cual supera con creces el costo de capital promedio ponderado (WACC) estimado para el sector tecnológico en la región."
                            </p>
                        </section>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col items-center justify-center p-16 border-t bg-secondary/10">
                        <div className="flex gap-24 text-center">
                            <div className="space-y-2">
                                <div className="w-48 h-px bg-foreground mb-2"></div>
                                <p className="font-black text-xs uppercase tracking-widest">Dirección de Finanzas</p>
                                <p className="text-[10px] text-muted-foreground">System Kyron, C.A.</p>
                            </div>
                            <div className="space-y-2">
                                <div className="w-48 h-px bg-foreground mb-2"></div>
                                <p className="font-black text-xs uppercase tracking-widest">Auditor Externo</p>
                                <p className="text-[10px] text-muted-foreground">Validación Técnica 2025</p>
                            </div>
                        </div>
                        <p className="mt-12 text-[9px] uppercase font-black tracking-[0.4em] text-muted-foreground/40">Powered by Kyron Intelligence System</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
