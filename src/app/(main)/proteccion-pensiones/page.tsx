
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, CheckCircle, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const resumenNomina = {
    totalNomina: 29000, // Suma de salarios y bonos no salariales
    porcentajeContribucion: 0.09, // 9%
};

const totalAPagar = resumenNomina.totalNomina * resumenNomina.porcentajeContribucion;

const historialDeclaraciones = [
    { id: "PENSION-2024-06", periodo: "Junio 2024", monto: 4280.50, fecha: "15/07/2024", estado: "Pagado" },
    { id: "PENSION-2024-05", periodo: "Mayo 2024", monto: 3950.00, fecha: "15/06/2024", estado: "Pagado" },
    { id: "PENSION-2024-04", periodo: "Abril 2024", monto: 4120.75, fecha: "15/05/2024", estado: "Pagado" },
];

export default function ProteccionPensionesPage() {
    const { toast } = useToast();

    const handleDeclareAndPay = () => {
        toast({
            title: "Declaración y Pago Exitosos",
            description: `El pago de la Contribución Especial por ${formatCurrency(totalAPagar, 'Bs.')} ha sido procesado.`,
            action: <CheckCircle className="text-green-500" />,
        });
    }

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="h-8 w-8" />
                Ley de Protección de Pensiones
            </h1>
            <p className="text-muted-foreground mt-2">
                Realiza la declaración y pago de la Contribución Especial para la Protección de las Pensiones.
            </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Resumen del Período - Julio 2024</CardTitle>
                        <CardDescription>Cálculo automático basado en el total de la nómina (pagos realizados a los trabajadores).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4 text-lg">
                           <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Total Pagado en Nómina (Base de Cálculo):</span>
                                <span className="font-semibold">{formatCurrency(resumenNomina.totalNomina, 'Bs.')}</span>
                           </div>
                           <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Porcentaje de Contribución Especial:</span>
                                <span className="font-semibold flex items-center gap-2">
                                    <Percent className="h-4 w-4"/> {resumenNomina.porcentajeContribucion * 100}%
                                </span>
                           </div>
                            <Separator />
                            <div className="flex justify-between items-center font-bold text-2xl pt-2">
                                <span className="text-primary">Total a Pagar:</span>
                                <span className="text-primary">{formatCurrency(totalAPagar, 'Bs.')}</span>
                           </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full text-lg py-6" onClick={handleDeclareAndPay}>
                            Declarar y Pagar Contribución
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            
            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Historial de Declaraciones</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Período</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historialDeclaraciones.map((dec) => (
                                <TableRow key={dec.id}>
                                    <TableCell className="font-medium">{dec.periodo}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(dec.monto, 'Bs.')}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge>{dec.estado}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    </div>
  );
}
