
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layers, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ClasificacionFacturacionPage() {
    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Layers className="h-8 w-8" />
                    Clasificación de Facturación por Estados y Sucursales
                </h1>
                <p className="text-muted-foreground mt-2">
                    Guía para estructurar la facturación en un sistema contable y analizar la rentabilidad por centro de costo.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>1. Definición de las Dimensiones Analíticas</CardTitle>
                    <CardDescription>
                        El primer paso es crear las etiquetas (Dimensiones Analíticas o Centros de Costo/Beneficio) que usarás para clasificar cada transacción.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Dimensión</TableHead>
                                <TableHead>Objetivo</TableHead>
                                <TableHead>Ejemplos de Códigos</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-semibold">Estado (Geografía)</TableCell>
                                <TableCell>Analizar la facturación y los costos a nivel estatal.</TableCell>
                                <TableCell className="font-mono">01-MIR (Miranda), 02-CAR (Carabobo), 03-ZUL (Zulia)</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell className="font-semibold">Sucursal (Operación)</TableCell>
                                <TableCell>Analizar la facturación y los costos a nivel de tienda o punto de venta.</TableCell>
                                <TableCell className="font-mono">100 (Sucursal Centro), 101 (Sucursal Este)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Alert className="mt-4">
                        <FileText className="h-4 w-4" />
                        <AlertTitle>Implementación Clave</AlertTitle>
                        <AlertDescription>
                            Al crear una factura en el sistema, el usuario debe ser obligado a asignar un código de Sucursal y/o Estado a las líneas de la factura para asegurar la correcta clasificación.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>2. Clasificación de Ingresos y Gastos</CardTitle>
                    <CardDescription>
                        Para un análisis completo, no solo los ingresos sino también los gastos deben ser etiquetados con su correspondiente centro de costo.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold mb-2">A. Facturación por Sucursal y Estado</h4>
                        <p className="text-muted-foreground">Al registrar el ingreso de una venta, se le debe adjuntar la Dimensión Sucursal. Si el sistema tiene una estructura jerárquica (Sucursal Este pertenece a Miranda), el ingreso se consolida automáticamente a nivel de Estado.</p>
                    </div>
                     <div>
                        <h4 className="font-semibold mb-2">B. Clasificación de Gastos</h4>
                         <p className="text-muted-foreground">Al registrar gastos como nómina o alquiler, el contador debe asignar el código de la sucursal a la que corresponde dicho gasto. Los gastos centrales (como publicidad regional) se asignan a nivel de Estado o se distribuyen entre sucursales.</p>
                    </div>
                </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>3. Reportes Clave para la Dirección</CardTitle>
                    <CardDescription>Una vez clasificada la data, puedes generar informes jerárquicos para una visión clara del rendimiento.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Reporte de Ingresos por Estado</h4>
                        <div className="text-sm text-muted-foreground">
                            <p className="font-medium text-foreground">Estado Miranda: $50,000</p>
                            <ul className="list-disc pl-5">
                                <li>Sucursal Centro: $20,000</li>
                                <li>Sucursal Este: $30,000</li>
                            </ul>
                            <p className="font-medium text-foreground mt-2">Estado Carabobo: $25,000</p>
                             <ul className="list-disc pl-5">
                                <li>Sucursal Valencia: $25,000</li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Estado de Resultados por Sucursal (Centro de Costo)</h4>
                        <div className="text-sm text-muted-foreground">
                             <p className="font-medium text-foreground">Sucursal Este</p>
                             <ul className="list-disc pl-5">
                                <li>Ingresos por Ventas: $30,000</li>
                                <li>Costo de Ventas: ($12,000)</li>
                                <li>Utilidad Bruta: $18,000</li>
                                <li>Gastos Operacionales: ($8,000)</li>
                                <li className="font-semibold text-primary">Utilidad Neta de la Sucursal: $10,000</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
