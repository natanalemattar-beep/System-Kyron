
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Download, Printer, CircleCheck as CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const resumenAnual = [
    { id: 1, empleado: "Ana Pérez", salarioAnual: 144000, bonificaciones: 18000, utilidades: 12000, prestaciones: 0, total: 174000 },
    { id: 2, empleado: "Luis Gómez", salarioAnual: 126000, bonificaciones: 15000, utilidades: 10500, prestaciones: 0, total: 151500 },
    { id: 3, empleado: "María Rodriguez", salarioAnual: 108000, bonificaciones: 12000, utilidades: 9000, prestaciones: 0, total: 129000 },
    { id: 4, empleado: "Carlos Sanchez", salarioAnual: 102000, bonificaciones: 10000, utilidades: 8500, prestaciones: 0, total: 120500 },
    { id: 5, empleado: "Pedro Martinez", salarioAnual: 57000, bonificaciones: 6000, utilidades: 4750, prestaciones: 10250, total: 77000 },
];

export default function ResumenAnualEmpleadosPage() {
    const { toast } = useToast();

    const handleAction = (action: 'impreso' | 'descargado') => {
        if (action === 'impreso') {
            window.print();
            toast({
                title: "Iniciando Impresión",
                description: "El reporte se ha enviado a la cola de impresión.",
            });
        } else {
            // Activar diálogo de impresión que permite Guardar como PDF
            window.print();
            toast({
                title: "Generando Reporte",
                description: "Preparando la versión PDF del resumen anual.",
                action: <CheckCircle className="text-green-500 h-4 w-4" />
            });
        }
    };

    return (
        <div className="p-4 md:p-8">
            <style>
                {`
                    @media print {
                        body * { visibility: hidden; }
                        #report-content, #report-content * { visibility: visible; }
                        #report-content { position: absolute; left: 0; top: 0; width: 100%; border: none; }
                        .no-print { display: none !important; }
                    }
                `}
            </style>
            <header className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 no-print">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-primary" />
                        Resumen Anual de Ingresos
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Consolidado fiscal de remuneraciones y beneficios pagados durante el ejercicio actual.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleAction('impreso')}>
                        <Printer className="mr-2 h-4 w-4"/> Imprimir
                    </Button>
                    <Button size="sm" onClick={() => handleAction('descargado')}>
                        <Download className="mr-2 h-4 w-4"/> Descargar PDF
                    </Button>
                </div>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm" id="report-content">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Resumen del Ejercicio Fiscal 2024</CardTitle>
                            <CardDescription>
                                Desglose consolidado de ingresos totales por trabajador para fines de declaración AR-C.
                            </CardDescription>
                        </div>
                        <div className="text-right hidden print:block">
                            <p className="font-bold">System Kyron, C.A.</p>
                            <p className="text-xs">RIF: J-12345678-9</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-secondary/30">
                                <TableHead className="font-bold">Empleado</TableHead>
                                <TableHead className="text-right font-bold">Salario Anual</TableHead>
                                <TableHead className="text-right font-bold">Bonificaciones</TableHead>
                                <TableHead className="text-right font-bold">Utilidades</TableHead>
                                <TableHead className="text-right font-bold">Prestaciones</TableHead>
                                <TableHead className="text-right font-bold text-primary">Ingreso Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resumenAnual.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.empleado}</TableCell>
                                    <TableCell className="text-right font-mono">{formatCurrency(item.salarioAnual, 'Bs.')}</TableCell>
                                    <TableCell className="text-right font-mono">{formatCurrency(item.bonificaciones, 'Bs.')}</TableCell>
                                    <TableCell className="text-right font-mono">{formatCurrency(item.utilidades, 'Bs.')}</TableCell>
                                    <TableCell className="text-right font-mono">{item.prestaciones > 0 ? formatCurrency(item.prestaciones, 'Bs.') : "N/A"}</TableCell>
                                    <TableCell className="text-right font-bold text-primary font-mono">{formatCurrency(item.total, 'Bs.')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="print:block hidden pt-12">
                    <div className="grid grid-cols-2 gap-24 text-center text-xs">
                        <div className="border-t border-foreground pt-2">Firma del Responsable RR.HH.</div>
                        <div className="border-t border-foreground pt-2">Sello de la Empresa</div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
