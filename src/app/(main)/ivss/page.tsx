
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Briefcase, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const movimientos = [
    { id: 1, empleado: "Ana Pérez", fechaIngreso: "10/01/2022", fechaMovimiento: "11/01/2022", tipo: "Ingreso (14-01)" },
    { id: 2, empleado: "Luis Gómez", fechaIngreso: "15/03/2021", fechaMovimiento: "16/03/2021", tipo: "Ingreso (14-01)" },
    { id: 3, empleado: "Pedro Martinez", fechaIngreso: "10/01/2022", fechaMovimiento: "16/06/2024", tipo: "Egreso (14-02)" },
];

const typeVariant: { [key: string]: "default" | "destructive" } = {
  "Ingreso (14-01)": "default",
  "Egreso (14-02)": "destructive",
};


export default function IvssPage() {
    const { toast } = useToast();

    const handleRegister = (type: string) => {
        toast({
            title: "Movimiento Registrado",
            description: `El ${type} del empleado ha sido registrado en el IVSS.`,
        })
    }

  return (
    <div>
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Briefcase className="h-8 w-8" />
                    Gestión IVSS (Form. 14-01 y 14-02)
                </h1>
                <p className="text-muted-foreground mt-2">
                    Inscripción y retiro automático de empleados en el IVSS.
                </p>
            </div>
            <div className="flex gap-2">
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Registrar Ingreso (14-01)
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Ingreso de Empleado (14-01)</DialogTitle>
                            <DialogDescription>
                                Complete los datos del empleado para su inscripción en el IVSS.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="empleado-ingreso" className="text-right">Empleado</Label>
                                <Input id="empleado-ingreso" placeholder="Nombre del Empleado" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={() => handleRegister("ingreso")}>Registrar Ingreso</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="destructive">
                            <PlusCircle className="mr-2" />
                            Registrar Egreso (14-02)
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Registrar Egreso de Empleado (14-02)</DialogTitle>
                            <DialogDescription>
                                Complete los datos del empleado para su retiro del IVSS.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="empleado-egreso" className="text-right">Empleado</Label>
                                <Input id="empleado-egreso" placeholder="Nombre del Empleado" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" variant="destructive" onClick={() => handleRegister("egreso")}>Registrar Egreso</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Historial de Movimientos</CardTitle>
                <CardDescription>Registro de inscripciones y retiros de empleados en el IVSS.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Fecha de Ingreso a la Empresa</TableHead>
                            <TableHead>Fecha del Movimiento IVSS</TableHead>
                            <TableHead className="text-center">Tipo de Movimiento</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movimientos.map((mov) => (
                            <TableRow key={mov.id}>
                                <TableCell className="font-medium">{mov.empleado}</TableCell>
                                <TableCell>{mov.fechaIngreso}</TableCell>
                                <TableCell>{mov.fechaMovimiento}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={typeVariant[mov.tipo]}>{mov.tipo}</Badge>
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
