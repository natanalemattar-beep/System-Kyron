
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Download, Printer } from "lucide-react";
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

    const handleAction = (action: string) => {
        toast({
            title: `Reporte ${action}`,
            description: `El resumen anual ha sido ${action === 'impreso' ? 'enviado a la impresora' : 'descargado en formato PDF'}.`,
        });
        if (action === 'impreso') {
            window.print();
        }
    };

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BookOpen className="h-8 w-8" />
                        Resumen Anual de Ingresos por Empleado
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Consolidado de todas las remuneraciones y beneficios pagados durante el año fiscal.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleAction('impreso')}>
                        <Printer className="mr-2"/> Imprimir
                    </Button>
                    <Button onClick={() => handleAction('descargado')}>
                        <Download className="mr-2"/> Descargar PDF
                    </Button>
                </div>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Resumen del Ejercicio Fiscal 2024</CardTitle>
                    <CardDescription>
                        Desglose de los ingresos totales por cada trabajador.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Empleado</TableHead>
                                <TableHead className="text-right">Salario Anual</TableHead>
                                <TableHead className="text-right">Total Bonificaciones</TableHead>
                                <TableHead className="text-right">Utilidades</TableHead>
                                <TableHead className="text-right">Liquidación Prestaciones</TableHead>
                                <TableHead className="text-right font-bold">Ingreso Anual Total</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {resumenAnual.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.empleado}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.salarioAnual, 'Bs.')}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.bonificaciones, 'Bs.')}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.utilidades, 'Bs.')}</TableCell>
                                    <TableCell className="text-right">{item.prestaciones > 0 ? formatCurrency(item.prestaciones, 'Bs.') : "N/A"}</TableCell>
                                    <TableCell className="text-right font-bold text-primary">{formatCurrency(item.total, 'Bs.')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
