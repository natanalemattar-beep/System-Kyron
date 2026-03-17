
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Timer, CirclePlus as PlusCircle, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const registros = [
    { id: 1, empleado: "Ana Pérez", fecha: "15/07/2024", diurnas: 2, nocturnas: 1, totalPagado: 450 },
    { id: 2, empleado: "Luis Gómez", fecha: "18/07/2024", diurnas: 3, nocturnas: 0, totalPagado: 450 },
    { id: 3, empleado: "Carlos Sanchez", fecha: "19/07/2024", diurnas: 0, nocturnas: 4, totalPagado: 800 },
];

export default function LibroHorasExtrasPage() {
    const { toast } = useToast();

    const handleExportCSV = () => {
        const headers = ["Empleado", "Fecha", "H.E. Diurnas", "H.E. Nocturnas", "Total Pagado"];
        const csvContent = [
            headers.join(","),
            ...registros.map(r => [`"${r.empleado}"`, r.fecha, r.diurnas, r.nocturnas, r.totalPagado].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "libro_horas_extras.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        toast({
        title: "Reporte Exportado",
        description: "El libro de horas extras ha sido exportado.",
        });
    };

    const handleRegisterHours = () => {
        toast({
            title: "Registro Creado",
            description: "Las horas extras han sido registradas y calculadas.",
        })
    }

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
                <Button variant="outline" onClick={handleExportCSV}>
                    <Download className="mr-2" />
                    Exportar a Excel
                </Button>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Registrar Horas
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Horas Extras</DialogTitle>
                            <DialogDescription>
                                Complete la información para registrar y calcular el pago de horas extras.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="empleado" className="text-right">Empleado</Label>
                                <Input id="empleado" defaultValue="Ana Pérez" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="diurnas" className="text-right">H.E. Diurnas</Label>
                                <Input id="diurnas" type="number" defaultValue="2" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="nocturnas" className="text-right">H.E. Nocturnas</Label>
                                <Input id="nocturnas" type="number" defaultValue="1" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleRegisterHours}>Registrar y Calcular</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
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
