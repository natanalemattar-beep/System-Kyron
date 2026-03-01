
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Banknote, Download, FileText, UserCheck } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

const arcData = [
    { id: 1, empleado: "Ana Pérez", ci: "V-12.345.678", acumulado: 120000, retenciones: 1200 },
    { id: 2, empleado: "Luis Gómez", ci: "V-18.765.432", acumulado: 105000, retenciones: 1050 },
];

export default function IslrArcPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Banknote className="h-8 w-8 text-primary" />
                    Declaración Estimada e ISLR (AR-C)
                </h1>
                <p className="text-muted-foreground mt-2">Gestión de comprobantes de retención para el personal.</p>
            </header>

            <Card>
                <CardHeader>
                    <CardTitle>Comprobantes AR-C del Ejercicio Actual</CardTitle>
                    <CardDescription>Genera y descarga los archivos de retención acumulada.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Empleado</TableHead>
                                <TableHead>Cédula</TableHead>
                                <TableHead className="text-right">Ingreso Acumulado</TableHead>
                                <TableHead className="text-right">Retención Acumulada</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {arcData.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell className="font-bold">{row.empleado}</TableCell>
                                    <TableCell>{row.ci}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(row.acumulado)}</TableCell>
                                    <TableCell className="text-right text-red-500">{formatCurrency(row.retenciones)}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" /> Generar AR-C
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
