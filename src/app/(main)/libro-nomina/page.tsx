
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Download, Printer } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const registros = [
    { id: 1, empleado: "Ana Pérez", cedula: "V-12.345.678", cargo: "Gerente de Proyectos", totalAsignaciones: 12460, totalDeducciones: 2210, neto: 10250 },
    { id: 2, empleado: "Luis Gómez", cedula: "V-18.765.432", cargo: "Desarrollador Senior", totalAsignaciones: 11000, totalDeducciones: 1980, neto: 9020 },
    { id: 3, empleado: "María Rodriguez", cedula: "V-20.111.222", cargo: "Diseñadora UI/UX", totalAsignaciones: 9500, totalDeducciones: 1575, neto: 7925 },
    { id: 4, empleado: "Carlos Sanchez", cedula: "E-8.999.000", cargo: "Analista de Calidad", totalAsignaciones: 9000, totalDeducciones: 1470, neto: 7530 },
];

export default function LibroNominaPage() {
    const { toast } = useToast();

    const handleExportCSV = () => {
        const headers = ["Cédula", "Nombres y Apellidos", "Cargo", "Total Asignaciones", "Total Deducciones", "Neto a Pagar"];
        const csvContent = [
            headers.join(","),
            ...registros.map(r => [r.cedula, `"${r.empleado}"`, r.cargo, r.totalAsignaciones, r.totalDeducciones, r.neto].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "libro_nomina.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        toast({
            title: "Exportación Completa",
            description: "El libro de nómina ha sido exportado a un archivo CSV.",
        });
    };

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="h-8 w-8" />
                    Libro de Nómina Oficial
                </h1>
                <p className="text-muted-foreground mt-2">
                    Registro de nómina exigido por el Ministerio del Trabajo - Período Julio 2024.
                </p>
            </div>
             <div className="flex gap-2">
                <Button variant="outline" onClick={handleExportCSV}>
                    <Download className="mr-2" />
                    Exportar a Excel
                </Button>
                 <Button onClick={() => window.print()}>
                    <Printer className="mr-2" />
                    Imprimir Libro
                </Button>
            </div>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Libro de Nómina - 1ra Quincena de Julio 2024</CardTitle>
                <CardDescription>Empresa S.A. | RIF: J-12345678-9</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cédula</TableHead>
                            <TableHead>Nombres y Apellidos</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead className="text-right">Total Asignaciones</TableHead>
                            <TableHead className="text-right">Total Deducciones</TableHead>
                            <TableHead className="text-right">Neto a Pagar</TableHead>
                            <TableHead className="text-center">Firma del Empleado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell>{reg.cedula}</TableCell>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{reg.cargo}</TableCell>
                                <TableCell className="text-right">{formatCurrency(reg.totalAsignaciones, 'Bs.')}</TableCell>
                                <TableCell className="text-right text-red-500">({formatCurrency(reg.totalDeducciones, 'Bs.')})</TableCell>
                                <TableCell className="text-right font-bold">{formatCurrency(reg.neto, 'Bs.')}</TableCell>
                                <TableCell className="h-20 border-b-2 border-dashed"></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="justify-end space-x-32 pt-12 pr-12">
                <div className="text-center">
                    <div className="w-64 border-t-2 border-foreground pt-2">Elaborado por: RR.HH.</div>
                </div>
                <div className="text-center">
                    <div className="w-64 border-t-2 border-foreground pt-2">Revisado por: Gerencia</div>
                </div>
            </CardFooter>
        </Card>
    </div>
  );
}
