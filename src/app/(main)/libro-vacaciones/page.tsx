
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plane, PlusCircle, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registros = [
    { id: 1, empleado: "Ana Pérez", periodo: "2022-2023", inicio: "01/08/2023", fin: "21/08/2023", dias: 15, bono: 3500, estado: "Disfrutadas" },
    { id: 2, empleado: "Luis Gómez", periodo: "2023-2024", inicio: "15/09/2024", fin: "05/10/2024", dias: 16, bono: 4200, estado: "Pendientes" },
    { id: 3, empleado: "María Rodriguez", periodo: "2021-2022", inicio: "01/02/2023", fin: "15/02/2023", dias: 15, bono: 3200, estado: "Disfrutadas" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Disfrutadas: "default",
  Pendientes: "secondary",
};


export default function LibroVacacionesPage() {
    const { toast } = useToast();

    const handleExport = () => {
        toast({
        title: "Reporte Exportado",
        description: "El libro de vacaciones ha sido exportado.",
        });
    };

    const handleRegister = () => {
        toast({
            title: "Vacaciones Registradas",
            description: "El período vacacional ha sido registrado y calculado.",
        })
    }

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Plane className="h-8 w-8" />
                    Libro de Vacaciones
                </h1>
                <p className="text-muted-foreground mt-2">
                    Control y registro de los períodos vacacionales de los empleados.
                </p>
            </div>
             <div className="flex gap-2">
                <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2" />
                    Exportar
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Registrar Vacaciones
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Período Vacacional</DialogTitle>
                            <DialogDescription>
                                Complete la información para el registro de vacaciones.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="empleado" className="text-right">Empleado</Label>
                                <Input id="empleado" defaultValue="Luis Gómez" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="periodo" className="text-right">Período</Label>
                                <Input id="periodo" defaultValue="2023-2024" className="col-span-3" />
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="dias" className="text-right">Días</Label>
                                <Input id="dias" type="number" defaultValue="16" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleRegister}>Registrar y Calcular</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Historial de Vacaciones</CardTitle>
                <CardDescription>Visualiza los períodos vacacionales por empleado.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Período</TableHead>
                            <TableHead>Fecha de Inicio</TableHead>
                            <TableHead>Fecha de Fin</TableHead>
                            <TableHead className="text-center">Días</TableHead>
                            <TableHead className="text-right">Bono Vacacional</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{reg.periodo}</TableCell>
                                <TableCell>{reg.inicio}</TableCell>
                                <TableCell>{reg.fin}</TableCell>
                                <TableCell className="text-center">{reg.dias}</TableCell>
                                <TableCell className="text-right">{formatCurrency(reg.bono, 'Bs.')}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={statusVariant[reg.estado]}>{reg.estado}</Badge>
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
