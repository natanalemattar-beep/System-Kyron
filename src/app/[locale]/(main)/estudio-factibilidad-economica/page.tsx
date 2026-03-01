
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { 
  Download, 
  Printer, 
  TrendingUp, 
  BarChart, 
  CheckCircle, 
  Zap,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";

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

const indicators = [
    { label: "Valor Actual Neto (VAN)", value: 450000, desc: "Rentabilidad neta en valor presente." },
    { label: "Tasa Interna de Retorno (TIR)", value: "28.5%", desc: "Rendimiento anual esperado." },
    { label: "Recuperación", value: "2.4 años", desc: "Tiempo estimado de retorno." },
    { label: "Margen Op.", value: "32%", desc: "Eficiencia de la plataforma." },
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
                description: "El reporte técnico se ha generado correctamente.",
            });
        }
    };

    if (!isClient) return null;

    return (
        <div className="p-4 md:p-10 space-y-10 w-full">
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
            
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 no-print border-l-4 border-primary pl-8 py-2">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                        <BarChart className="h-8 w-8 text-primary" />
                        ESTUDIO DE FACTIBILIDAD ECONÓMICA
                    </h1>
                    <p className="text-muted-foreground font-medium uppercase text-[10px] tracking-widest">Dictamen técnico de viabilidad financiera • System Kyron</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-10 rounded-xl" onClick={() => handleAction('print')}>
                        <Printer className="mr-2 h-4 w-4" /> Imprimir
                    </Button>
                    <Button size="sm" className="h-10 rounded-xl shadow-lg btn-3d-primary" onClick={() => handleAction('download')}>
                        <Download className="mr-2 h-4 w-4" /> Exportar PDF
                    </Button>
                </div>
            </header>

            <div id="printable-content" className="space-y-10">
                <Card className="border-none shadow-2xl overflow-hidden rounded-[3rem] bg-card/40 backdrop-blur-md">
                    <CardHeader className="text-center bg-primary/5 p-12 border-b border-primary/10 relative">
                        <div className="absolute top-6 left-6 opacity-10">
                            <Logo className="h-12 w-12" />
                        </div>
                        <div className="mx-auto w-fit mb-8 bg-background p-6 rounded-[2rem] shadow-xl border border-primary/5">
                            <Logo className="h-20 w-20" />
                        </div>
                        <CardTitle className="text-4xl font-black uppercase tracking-tighter mb-2 italic">Proyecto de Factibilidad 2025</CardTitle>
                        <CardDescription className="font-black text-primary uppercase tracking-[0.3em]">System Kyron, C.A. | RIF: J-12345678-9</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-8 md:p-16 space-y-20">
                        <section>
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-4 border-l-4 border-primary pl-6 italic">
                                <Zap className="h-6 w-6 text-primary" />
                                1. ANÁLISIS ESTRATÉGICO
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground text-justify font-medium">
                                El ecosistema **System Kyron** representa una disrupción en la gestión empresarial venezolana. Al combinar **IA Predictiva** con un **Ledger Inmutable (Blockchain)**, eliminamos el riesgo operativo y fiscal. El modelo SaaS asegura ingresos recurrentes con costos marginales decrecientes, permitiendo una expansión agresiva en el mercado nacional e internacional.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-4 border-l-4 border-primary pl-6 italic">
                                <FileText className="h-6 w-6 text-primary" />
                                2. ESTRUCTURA DE INVERSIÓN
                            </h3>
                            <div className="border border-primary/10 rounded-[2rem] overflow-hidden bg-background/50 backdrop-blur-sm shadow-inner">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-primary/5">
                                            <TableHead className="font-black py-6 pl-10 uppercase text-[10px] tracking-widest">Concepto de Inversión</TableHead>
                                            <TableHead className="text-center font-black uppercase text-[10px] tracking-widest">Categoría</TableHead>
                                            <TableHead className="text-right font-black pr-10 uppercase text-[10px] tracking-widest">Monto (USD)</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {investmentBreakdown.map((row, i) => (
                                            <TableRow key={i} className="hover:bg-primary/[0.02]">
                                                <TableCell className="font-bold pl-10 py-5">{row.item}</TableCell>
                                                <TableCell className="text-center"><Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">{row.type}</Badge></TableCell>
                                                <TableCell className="text-right font-mono font-black pr-10 text-primary">{formatCurrency(row.cost, 'USD')}</TableCell>
                                            </TableRow>
                                        ))}
                                        <TableRow className="bg-primary/10">
                                            <TableCell className="font-black text-xl pl-10 py-8 italic" colSpan={2}>TOTAL INVERSIÓN INICIAL</TableCell>
                                            <TableCell className="text-right font-black text-2xl text-primary pr-10 italic">{formatCurrency(220000, 'USD')}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {indicators.map(ind => (
                                <div key={ind.label} className="p-8 rounded-[2rem] border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all shadow-lg group">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4 group-hover:text-primary transition-colors">{ind.label}</p>
                                    <p className="text-3xl font-black text-primary leading-none mb-4 italic tracking-tighter">
                                        {typeof ind.value === 'number' ? formatCurrency(ind.value, 'USD') : ind.value}
                                    </p>
                                    <p className="text-[9px] text-muted-foreground leading-relaxed font-bold uppercase tracking-widest opacity-60">{ind.desc}</p>
                                </div>
                            ))}
                        </section>

                        <section className="bg-primary text-primary-foreground p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12 opacity-10">
                                <ShieldCheck className="h-48 w-48 rotate-12" />
                            </div>
                            <h3 className="text-3xl font-black mb-6 flex items-center gap-4 relative z-10 italic uppercase tracking-tighter">
                                <CheckCircle className="h-8 w-8" />
                                DICTAMEN DE VIABILIDAD
                            </h3>
                            <p className="text-xl leading-relaxed relative z-10 font-medium italic opacity-90 text-justify">
                                "El análisis proyectado demuestra que el Ecosistema Kyron posee una robustez financiera excepcional. Con una TIR del **28.5%** y un periodo de recuperación inferior a 30 meses, el proyecto se clasifica como de **ALTO RENDIMIENTO Y BAJO RIESGO**. La integración de servicios de telecomunicaciones y blindaje fiscal crea una barrera de entrada competitiva insuperable."
                            </p>
                        </section>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col items-center justify-center p-20 border-t border-primary/5 bg-primary/[0.02]">
                        <div className="flex gap-32 text-center">
                            <div className="space-y-3">
                                <div className="w-56 h-0.5 bg-foreground/20 mb-4"></div>
                                <p className="font-black text-[10px] uppercase tracking-[0.4em]">Dirección de Finanzas</p>
                                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">System Kyron Master Control</p>
                            </div>
                            <div className="space-y-3">
                                <div className="w-56 h-0.5 bg-foreground/20 mb-4"></div>
                                <p className="font-black text-[10px] uppercase tracking-[0.4em]">Auditoría Técnica</p>
                                <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">Validación Ecosistema 2025</p>
                            </div>
                        </div>
                        <p className="mt-16 text-[8px] uppercase font-black tracking-[0.6em] text-primary/30 italic">Generated by Kyron Intelligence Ledger System</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
