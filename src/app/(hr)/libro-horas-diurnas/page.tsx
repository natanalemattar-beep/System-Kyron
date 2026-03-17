
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sun, CirclePlus as PlusCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const registros = [
    { id: 1, empleado: "Ana Pérez", fecha: "20/07/2024", horas: 8, observacion: "Jornada regular" },
    { id: 2, empleado: "Luis Gómez", fecha: "20/07/2024", horas: 8, observacion: "Jornada regular" },
    { id: 3, empleado: "María Rodriguez", fecha: "21/07/2024", horas: 8, observacion: "Jornada regular" },
];

export default function LibroHorasDiurnasPage() {
    const { toast } = useToast();

    const handleExportCSV = () => {
        const headers = ["Empleado", "Fecha", "Horas Diurnas", "Observación"];
        const csvContent = [
            headers.join(","),
            ...registros.map(r => [`"${r.empleado}"`, r.fecha, r.horas, `"${r.observacion}"`].join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "libro_horas_diurnas.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        toast({
        title: "Reporte Exportado",
        description: "El libro de horas diurnas ha sido exportado.",
        });
    };

     const handleNewEntry = () => {
        toast({
            title: "Registro Creado",
            description: "El nuevo registro de horas diurnas ha sido añadido.",
        })
    }


  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Sun className="h-8 w-8" />
                    Libro de Horas Diurnas
                </h1>
                <p className="text-muted-foreground mt-2">
                    Registro y control de las horas trabajadas en jornada diurna.
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
                            Nuevo Registro
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Nuevo Registro de Horas Diurnas</DialogTitle>
                            <DialogDescription>
                                Complete los detalles del registro.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="empleado" className="text-right">Empleado</Label>
                                <Input id="empleado" defaultValue="Ana Pérez" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="horas" className="text-right">Horas</Label>
                                <Input id="horas" type="number" defaultValue="8" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleNewEntry}>Guardar Registro</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Registros de Julio 2024</CardTitle>
                <CardDescription>Visualiza las horas diurnas registradas para cada empleado.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-center">Horas Diurnas</TableHead>
                            <TableHead>Observación</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{reg.fecha}</TableCell>
                                <TableCell className="text-center">{reg.horas}</TableCell>
                                <TableCell>{reg.observacion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
