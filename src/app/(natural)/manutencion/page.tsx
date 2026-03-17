
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, Calculator, History, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const depositos = [
    { id: "DEP-001", fecha: "15/07/2024", monto: 1200, concepto: "Mensualidad Julio", estado: "Confirmado" },
    { id: "DEP-002", fecha: "15/06/2024", monto: 1200, concepto: "Mensualidad Junio", estado: "Confirmado" },
    { id: "DEP-003", fecha: "15/05/2024", monto: 1200, concepto: "Mensualidad Mayo", estado: "Confirmado" },
];

export default function ManutencionPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gavel className="h-8 w-8 text-primary" />
                        Obligación de Manutención (LOPNNA)
                    </h1>
                    <p className="text-muted-foreground mt-2">Seguimiento de cumplimiento y gestión de aportes para menores.</p>
                </div>
                <Button onClick={() => toast({ title: "Próximamente", description: "La calculadora de manutención basada en la unidad tributaria estará disponible pronto." })}>
                    <Calculator className="mr-2 h-4 w-4"/> Calcular Aporte
                </Button>
            </header>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><History className="h-5 w-5"/> Historial de Depósitos</CardTitle>
                        <CardDescription>Registro de los últimos aportes realizados y verificados.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Concepto</TableHead>
                                    <TableHead className="text-right">Monto</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {depositos.map(dep => (
                                    <TableRow key={dep.id}>
                                        <TableCell>{dep.fecha}</TableCell>
                                        <TableCell className="font-medium">{dep.concepto}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(dep.monto, 'Bs.')}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="default" className="bg-green-500/10 text-green-500 border-none">{dep.estado}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4"/> Descargar Estado de Cuenta (PDF)
                        </Button>
                    </CardFooter>
                </Card>

                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-primary"/>
                                Estatus Legal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-4">
                            <p className="font-medium text-primary">Cumplimiento al día.</p>
                            <p className="text-muted-foreground">No se registran solicitudes de revisión de monto ni retrasos en el presente ejercicio fiscal.</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <AlertTriangle className="h-5 w-5 text-yellow-500"/>
                                Información Clave
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-xs text-muted-foreground space-y-3">
                            <p>La Obligación de Manutención es un derecho de orden público e irrenunciable según el Art. 365 de la LOPNNA.</p>
                            <p>El monto debe ajustarse periódicamente según la inflación o cambios en la unidad tributaria para garantizar el bienestar del menor.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
