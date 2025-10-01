
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Timer, PlusCircle, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const registros = [
    { id: 1, empleado: "Ana Pérez", fecha: "15/07/2024", diurnas: 2, nocturnas: 1, totalPagado: 450 },
    { id: 2, empleado: "Luis Gómez", fecha: "18/07/2024", diurnas: 3, nocturnas: 0, totalPagado: 450 },
    { id: 3, empleado: "Carlos Sanchez", fecha: "19/07/2024", diurnas: 0, nocturnas: 4, totalPagado: 800 },
];

export default function LibroHorasExtrasPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Timer className="h-8 w-8" />
                    Libro de Horas Extras
                </h1>
                <p className="text-muted-foreground mt-2">
                    Control detallado del pago de horas extras a los empleados.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">
                    <Download className="mr-2" />
                    Exportar
                </Button>
                <Button>
                    <PlusCircle className="mr-2" />
                    Registrar Horas
                </Button>
            </div>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>Registros de Julio 2024</CardTitle>
                <CardDescription>Visualiza las horas extras trabajadas y el monto pagado por empleado.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-center">H.E. Diurnas</TableHead>
                            <TableHead className="text-center">H.E. Nocturnas</TableHead>
                            <TableHead className="text-right">Total Pagado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{reg.fecha}</TableCell>
                                <TableCell className="text-center">{reg.diurnas}</TableCell>
                                <TableCell className="text-center">{reg.nocturnas}</TableCell>
                                <TableCell className="text-right font-semibold">{formatCurrency(reg.totalPagado, 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
