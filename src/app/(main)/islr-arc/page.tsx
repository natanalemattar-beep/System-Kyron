
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banknote, FileDown, Download, HelpCircle, FileWarning } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const registros = [
    { id: 1, empleado: "Ana Pérez", cedula: "V-12.345.678", remuneracionAnual: 149520, retencionMes: 450, retencionAcumulada: 2700 },
    { id: 2, empleado: "Luis Gómez", cedula: "V-18.765.432", remuneracionAnual: 132000, retencionMes: 380, retencionAcumulada: 2280 },
    { id: 3, empleado: "María Rodriguez", cedula: "V-20.111.222", remuneracionAnual: 114000, retencionMes: 320, retencionAcumulada: 1920 },
    { id: 4, empleado: "Carlos Sanchez", cedula: "E-8.999.000", remuneracionAnual: 108000, retencionMes: 300, retencionAcumulada: 1800 },
];

export default function IslrArcPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Reporte Generado",
      description: "El reporte de ISLR ha sido exportado exitosamente.",
    });
  };

  const handleGenerateARC = (empleado: string) => {
    toast({
      title: `AR-C Generado para ${empleado}`,
      description: "El comprobante de retención mensual está listo para descargar.",
    });
  }

  return (
    <div>
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Banknote className="h-8 w-8" />
                    Declaración Estimada del SENIAT para el Personal
                </h1>
                <p className="text-muted-foreground mt-2">
                    Genera y consulta los Comprobantes de Retención de ISLR (AR-C).
                </p>
            </div>
             <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2" />
                    Exportar Reporte
                </Button>
            </div>
        </header>
        
        <Alert variant="destructive" className="mb-8">
            <FileWarning className="h-4 w-4" />
            <AlertTitle>Alerta de Pago Pendiente</AlertTitle>
            <AlertDescription>
                Se ha detectado que el pago de las retenciones de ISLR del período anterior aún no ha sido enterado al SENIAT.
                <Button size="sm" className="ml-4">Pagar Ahora</Button>
            </AlertDescription>
        </Alert>

        <Card className="mb-8 bg-blue-500/10 border-blue-500/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><HelpCircle className="h-5 w-5"/>¿Quién debe presentar la Declaración Estimada de Rentas?</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-blue-200">
                    La Declaración Estimada de Rentas es la obligación de anticipar el pago de Impuesto Sobre la Renta, prevista en el Decreto-Ley de ISLR y su Reglamento. 
                    Le corresponde efectuarla a todo aquel contribuyente que haya obtenido un <strong>Enriquecimiento Neto Gravable superior a 1.500 Unidades Tributarias</strong> en el ejercicio fiscal anterior. La base de cálculo para la estimación es el <strong>ochenta por ciento (80%)</strong> de dicho enriquecimiento.
                </p>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Retenciones de Julio 2024</CardTitle>
                <CardDescription>Listado de retenciones de ISLR por empleado para el período actual.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Remuneración Anual (Bs.)</TableHead>
                            <TableHead className="text-right">Porción de Retención del Mes (Bs.)</TableHead>
                            <TableHead className="text-right">Total Retenido del Mes (Bs.)</TableHead>
                            <TableHead className="text-right">Acumulado (Año)</TableHead>
                             <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{formatCurrency(reg.remuneracionAnual, 'Bs.')}</TableCell>
                                <TableCell className="text-right">{formatCurrency(reg.retencionMes, 'Bs.')}</TableCell>
                                <TableCell className="text-right font-semibold">{formatCurrency(reg.retencionMes, 'Bs.')}</TableCell>
                                <TableCell className="text-right">{formatCurrency(reg.retencionAcumulada, 'Bs.')}</TableCell>
                                <TableCell className="text-right">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=RIF:${'J-12345678-9'},ARC:${reg.id},Empleado:${reg.cedula},Monto:${reg.retencionMes}`} alt={`QR for ${reg.id}`} width={24} height={24} className="inline-block mr-2" />
                                    <Button variant="outline" size="sm" onClick={() => handleGenerateARC(reg.empleado)}>
                                        <FileDown className="mr-2 h-4 w-4" />
                                        Generar AR-C Mensual
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
