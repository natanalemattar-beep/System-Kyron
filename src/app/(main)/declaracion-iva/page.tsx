
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, TrendingUp, TrendingDown, CheckCircle, FilePlus, FileMinus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const resumenMes = {
    debitoFiscal: 46400, // Ventas * 16%
    creditoFiscal: 1564.8, // Compras * 16%
    retencionesSoportadas: 34800, // Ej: 75% del débito fiscal
    ivaRetenidoATerceros: 1173.6, // Ej: 75% del crédito fiscal
    alicuota: 0.16,
};

const cuotaTributaria = resumenMes.debitoFiscal - resumenMes.creditoFiscal;
const totalAPagar = cuotaTributaria - resumenMes.retencionesSoportadas;

const historialDeclaraciones = [
    { id: "IVA-2024-06", periodo: "Junio 2024", monto: 42800.50, fecha: "15/07/2024", estado: "Pagado" },
    { id: "IVA-2024-05", periodo: "Mayo 2024", monto: 39500.00, fecha: "15/06/2024", estado: "Pagado" },
    { id: "IVA-2024-04", periodo: "Abril 2024", monto: 41200.75, fecha: "15/05/2024", estado: "Pagado" },
];

export default function DeclaracionIvaPage() {
    const { toast } = useToast();

    const handleDeclareAndPay = () => {
        toast({
            title: "Declaración y Pago Exitosos",
            description: `El pago del IVA por ${formatCurrency(totalAPagar, 'Bs.')} ha sido procesado.`,
            action: <CheckCircle className="text-green-500" />,
        });
    }

  return (
    <div>
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileText className="h-8 w-8" />
                Declaración de IVA (Contribuyentes Especiales)
            </h1>
            <p className="text-muted-foreground mt-2">
                Realiza la declaración y pago del Impuesto al Valor Agregado conforme a la normativa para Contribuyentes Especiales.
            </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Resumen del Período - Julio 2024</CardTitle>
                        <CardDescription>Cálculo automático basado en los libros de compra y venta, incluyendo retenciones.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Card className="bg-green-500/10 border-green-500/20">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-green-600">Débito Fiscal (Ventas)</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-green-600" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(resumenMes.debitoFiscal, 'Bs.')}</div>
                                </CardContent>
                            </Card>
                             <Card className="bg-destructive/10 border-destructive/20">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-destructive">Crédito Fiscal (Compras)</CardTitle>
                                    <TrendingDown className="h-4 w-4 text-destructive" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(resumenMes.creditoFiscal, 'Bs.')}</div>
                                </CardContent>
                            </Card>
                             <Card className="bg-yellow-400/10 border-yellow-400/20">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-yellow-500">Retenciones Soportadas</CardTitle>
                                    <FileMinus className="h-4 w-4 text-yellow-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(resumenMes.retencionesSoportadas, 'Bs.')}</div>
                                </CardContent>
                            </Card>
                             <Card className="bg-blue-400/10 border-blue-400/20">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-blue-500">IVA Retenido a Terceros</CardTitle>
                                    <FilePlus className="h-4 w-4 text-blue-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{formatCurrency(resumenMes.ivaRetenidoATerceros, 'Bs.')}</div>
                                </CardContent>
                            </Card>
                        </div>
                        <Separator />
                        <div className="space-y-4 text-lg">
                           <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Débito Fiscal:</span>
                                <span className="font-semibold">{formatCurrency(resumenMes.debitoFiscal, 'Bs.')}</span>
                           </div>
                           <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Crédito Fiscal:</span>
                                <span className="font-semibold text-destructive">- {formatCurrency(resumenMes.creditoFiscal, 'Bs.')}</span>
                           </div>
                            <div className="flex justify-between items-center font-bold text-xl border-t pt-4">
                                <span className="text-primary">Cuota Tributaria del Período:</span>
                                <span className="text-primary">{formatCurrency(cuotaTributaria, 'Bs.')}</span>
                           </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">(-) Retenciones de IVA Soportadas:</span>
                                <span className="font-semibold text-orange-500">- {formatCurrency(resumenMes.retencionesSoportadas, 'Bs.')}</span>
                           </div>
                           <div className="flex justify-between items-center font-bold text-2xl border-t pt-4">
                                <span className="text-primary">Total a Pagar al SENIAT:</span>
                                <span className="text-primary">{formatCurrency(totalAPagar, 'Bs.')}</span>
                           </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button className="w-full text-lg py-6" onClick={handleDeclareAndPay}>
                            Declarar y Pagar IVA (Julio 2024)
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
