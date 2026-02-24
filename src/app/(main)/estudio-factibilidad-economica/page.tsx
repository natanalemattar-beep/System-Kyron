
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { 
  Download, 
  Printer, 
  TrendingUp, 
  BarChart, 
  CheckCircle, 
  PieChart, 
  ArrowRight,
  FileText
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/logo";

const indicators = [
    { label: "Valor Actual Neto (VAN)", value: 450000, desc: "Mide la rentabilidad en valor presente." },
    { label: "Tasa Interna de Retorno (TIR)", value: "28.5%", desc: "Tasa de rentabilidad anual ofrecida." },
    { label: "Período de Recuperación (Payback)", value: "2.4 años", desc: "Tiempo para recuperar la inversión." },
    { label: "Índice de Rentabilidad (IR)", value: "1.85", desc: "Relación beneficio-costo." },
];

const projections = [
    { year: 1, revenue: 120000, costs: 80000, profit: 40000 },
    { year: 2, revenue: 180000, costs: 95000, profit: 85000 },
    { year: 3, revenue: 250000, costs: 110000, profit: 140000 },
    { year: 4, revenue: 320000, costs: 130000, profit: 190000 },
    { year: 5, revenue: 450000, costs: 150000, profit: 300000 },
];

export default function EstudioFactibilidadPage() {
    const { toast } = useToast();

    const handleAction = (action: 'print' | 'download') => {
        window.print();
        toast({
            title: action === 'print' ? "Impresión Iniciada" : "Preparando Descarga",
            description: "El reporte técnico se está generando con formato oficial.",
        });
    };

    return (
        <div className="p-4 md:p-8 space-y-8">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        #printable-content, #printable-content * { visibility: visible; }
                        #printable-content { position: absolute; left: 0; top: 0; width: 100%; }
                    }
                `}
            </style>
            
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BarChart className="h-8 w-8 text-primary" />
                        Estudio de Factibilidad Económica
                    </h1>
                    <p className="text-muted-foreground mt-1">Análisis técnico de rentabilidad y viabilidad del proyecto.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-10 px-4" onClick={() => handleAction('print')}>
                        <Printer className="mr-2 h-4 w-4" /> Imprimir
                    </Button>
                    <Button size="sm" className="h-10 px-4" onClick={() => handleAction('download')}>
                        <Download className="mr-2 h-4 w-4" /> Descargar PDF
                    </Button>
                </div>
            </header>

            <div id="printable-content" className="space-y-8">
                <Card className="border-none shadow-none print:bg-white bg-card/50 backdrop-blur-sm">
                    <CardHeader className="text-center pb-8 border-b">
                        <div className="mx-auto w-fit mb-4">
                            <Logo className="h-16 w-16" />
                        </div>
                        <CardTitle className="text-3xl font-black uppercase tracking-tighter">Informe de Factibilidad Económica</CardTitle>
                        <CardDescription>System Kyron | Generado: {formatDate(new Date())}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="p-8 space-y-12">
                        <section>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-primary" />
                                Indicadores Financieros Clave
                            </h3>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {indicators.map(ind => (
                                    <div key={ind.label} className="p-4 rounded-xl border bg-secondary/30">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{ind.label}</p>
                                        <p className="text-2xl font-black text-primary">{typeof ind.value === 'number' ? formatCurrency(ind.value, 'USD') : ind.value}</p>
                                        <p className="text-[9px] text-muted-foreground mt-2 leading-tight">{ind.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Separator />

                        <section>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <PieChart className="h-5 w-5 text-primary" />
                                Proyección de Flujo de Caja (5 Años)
                            </h3>
                            <div className="border rounded-xl overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-secondary/50">
                                            <TableHead>Año Fiscal</TableHead>
                                            <TableHead className="text-right">Ingresos</TableHead>
                                            <TableHead className="text-right">Costos</TableHead>
                                            <TableHead className="text-right font-bold">Utilidad Neta</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {projections.map(row => (
                                            <TableRow key={row.year}>
                                                <TableCell className="font-bold">Año {row.year}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(row.revenue, 'USD')}</TableCell>
                                                <TableCell className="text-right text-red-500">({formatCurrency(row.costs, 'USD')})</TableCell>
                                                <TableCell className="text-right font-black text-green-500">{formatCurrency(row.profit, 'USD')}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </section>

                        <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                Dictamen de Factibilidad
                            </h3>
                            <p className="text-sm leading-relaxed text-justify">
                                Basado en el análisis de flujo de caja descontado, el proyecto presenta una <strong>viabilidad económica alta</strong>. La TIR del 28.5% supera el WACC estimado, garantizando creación de valor. El período de recuperación menor a 3 años minimiza el riesgo de liquidez.
                            </p>
                        </section>
                    </CardContent>
                    
                    <CardFooter className="flex flex-col items-center justify-center p-12 border-t mt-8">
                        <div className="w-64 border-t border-black pt-2 text-center">
                            <p className="font-black text-sm">Dirección de Planificación</p>
                            <p className="text-xs text-muted-foreground">System Kyron, C.A.</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
