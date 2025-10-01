
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banknote, FileDown, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const registros = [
    { id: 1, empleado: "Ana Pérez", cedula: "V-12.345.678", retencionMes: 450, retencionAcumulada: 2700 },
    { id: 2, empleado: "Luis Gómez", cedula: "V-18.765.432", retencionMes: 380, retencionAcumulada: 2280 },
    { id: 3, empleado: "María Rodriguez", cedula: "V-20.111.222", retencionMes: 320, retencionAcumulada: 1920 },
    { id: 4, empleado: "Carlos Sanchez", cedula: "E-8.999.000", retencionMes: 300, retencionAcumulada: 1800 },
];

export default function IslrArcPage() {
  return (
    <div className="p-4 md:p-8">
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
                <Button variant="outline">
                    <Download className="mr-2" />
                    Exportar Reporte Anual
                </Button>
            </div>
        </header>

        <Card>
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
                                    <Button variant="outline" size="sm">
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
