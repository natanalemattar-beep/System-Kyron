
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserX, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const registros = [
    { id: 1, empleado: "Pedro Martinez", fechaIngreso: "10/01/2022", fechaRetiro: "15/06/2024", motivo: "Renuncia" },
    { id: 2, empleado: "Laura Fernandez", fechaIngreso: "05/03/2021", fechaRetiro: "30/04/2024", motivo: "Fin de Contrato" },
    { id: 3, empleado: "Jorge Castillo", fechaIngreso: "20/11/2023", fechaRetiro: "01/03/2024", motivo: "Renuncia" },
];

export default function LibroPersonalRetiradoPage() {
  const { toast } = useToast();

  const handleExportCSV = () => {
    const headers = ["Empleado", "Fecha de Ingreso", "Fecha de Retiro", "Motivo"];
    const csvContent = [
        headers.join(","),
        ...registros.map(r => [`"${r.empleado}"`, r.fechaIngreso, r.fechaRetiro, r.motivo].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "libro_personal_retirado.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    toast({
      title: "Historial Exportado",
      description: "El historial de personal retirado ha sido exportado.",
    });
  };
  
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <UserX className="h-8 w-8" />
                    Libro de Personal Retirado
                </h1>
                <p className="text-muted-foreground mt-2">
                    Historial de empleados que han cesado su relación laboral con la empresa.
                </p>
            </div>
            <Button variant="outline" onClick={handleExportCSV}>
                <Download className="mr-2" />
                Exportar a Excel
            </Button>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Historial de Retiros</CardTitle>
                <CardDescription>Detalle del personal que ya no forma parte de la empresa.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Fecha de Ingreso</TableHead>
                            <TableHead>Fecha de Retiro</TableHead>
                            <TableHead>Motivo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{reg.fechaIngreso}</TableCell>
                                <TableCell>{reg.fechaRetiro}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{reg.motivo}</Badge>
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
