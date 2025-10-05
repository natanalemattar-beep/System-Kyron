
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banknote, FileDown, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const registros = [
    { id: 1, empleado: "Ana Pérez", cedula: "V-12.345.678", retencionMes: 450, retencionAcumulada: 2700 },
    { id: 2, empleado: "Luis Gómez", cedula: "V-18.765.432", retencionMes: 380, retencionAcumulada: 2280 },
    { id: 3, empleado: "María Rodriguez", cedula: "V-20.111.222", retencionMes: 320, retencionAcumulada: 1920 },
    { id: 4, empleado: "Carlos Sanchez", cedula: "E-8.999.000", retencionMes: 300, retencionAcumulada: 1800 },
];

export default function IslrArcPage() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Reporte Generado",
      description: "El reporte anual de ISLR ha sido exportado exitosamente.",
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
                    Gestión de ISLR y AR-C
                </h1>
                <p className="text-muted-foreground mt-2">
                    Genera y consulta los Comprobantes de Retención de ISLR (AR-C).
                </p>
            </div>
             <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2" />
                    Exportar Reporte Anual
                </Button>
            </div>
        </header>

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
                            <TableHead>Cédula</TableHead>
                            <TableHead className="text-right">Retención del Mes</TableHead>
                            <TableHead className="text-right">Retención Acumulada (Año)</TableHead>
                             <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{reg.cedula}</TableCell>
                                <TableCell className="text-right">{formatCurrency(reg.retencionMes, 'Bs.')}</TableCell>
                                <TableCell className="text-right">{formatCurrency(reg.retencionAcumulada, 'Bs.')}</TableCell>
                                <TableCell className="text-right">
                                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=arc-${reg.id}`} alt={`QR for ${reg.id}`} width={24} height={24} className="inline-block mr-2" />
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
