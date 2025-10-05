
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Award, PlusCircle, Check, X, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const empleados = [
    { id: 1, nombre: "Ana Pérez", departamento: "Gerencia", nivelAcademico: "Universitario", permisoMenor: false, manutencionPendiente: false },
    { id: 2, nombre: "Luis Gómez", departamento: "Tecnología", nivelAcademico: "Universitario", permisoMenor: false, manutencionPendiente: true },
    { id: 3, nombre: "María Rodriguez", departamento: "Diseño", nivelAcademico: "Técnico Superior", permisoMenor: false, manutencionPendiente: false },
    { id: 4, nombre: "Carlos Sanchez", departamento: "Vigilancia", nivelAcademico: "Bachiller", permisoMenor: false, manutencionPendiente: false },
    { id: 5, nombre: "Jorge Vivas", departamento: "Pasante de Verano", nivelAcademico: "Bachiller", permisoMenor: true, manutencionPendiente: false },
];

const levelVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Universitario: "default",
  "Técnico Superior": "secondary",
  Bachiller: "outline",
};

export default function ClasificacionEmpleadosPage() {
  const { toast } = useToast();

  const handleAddClassification = () => {
    toast({
      title: "Clasificación Añadida",
      description: "El nuevo registro de empleado ha sido añadido exitosamente.",
    });
  };

  return (
    <div>
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Award className="h-8 w-8" />
                    Clasificación de Empleados
                </h1>
                <p className="text-muted-foreground mt-2">
                    Organiza al personal por departamento, nivel académico y permisos especiales.
                </p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Añadir Clasificación
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Añadir Nueva Clasificación de Empleado</DialogTitle>
                        <DialogDescription>
                            Complete los datos para registrar un nuevo empleado.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="nombre" className="text-right">Nombre</Label>
                            <Input id="nombre" placeholder="Nombre del empleado" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="departamento" className="text-right">Departamento</Label>
                            <Input id="departamento" placeholder="Ej: Ventas" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleAddClassification}>Guardar Registro</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Listado de Personal</CardTitle>
                <CardDescription>Detalle de la clasificación del personal activo y sus obligaciones legales.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Departamento</TableHead>
                            <TableHead>Nivel Académico</TableHead>
                            <TableHead className="text-center">Permiso de Menor (LOPNNA)</TableHead>
                             <TableHead className="text-center">Manutención Pendiente (LOPNNA)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {empleados.map((emp) => (
                            <TableRow key={emp.id} className={emp.permisoMenor ? "bg-blue-500/10" : emp.manutencionPendiente ? "bg-red-500/10" : ""}>
                                <TableCell className="font-medium">{emp.nombre}</TableCell>
                                <TableCell>{emp.departamento}</TableCell>
                                <TableCell>
                                    <Badge variant={levelVariant[emp.nivelAcademico]}>{emp.nivelAcademico}</Badge>
                                </TableCell>
                                <TableCell className="text-center">
                                    {emp.permisoMenor ? (
                                        <div className="flex items-center justify-center gap-2 text-green-500">
                                            <Check className="h-5 w-5" />
                                            <span>Sí</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <X className="h-5 w-5" />
                                            <span>No</span>
                                        </div>
                                    )}
                                </TableCell>
                                 <TableCell className="text-center">
                                    {emp.manutencionPendiente ? (
                                        <div className="flex items-center justify-center gap-2 text-red-500">
                                            <AlertTriangle className="h-5 w-5" />
                                            <span>Sí</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <Check className="h-5 w-5" />
                                            <span>No</span>
                                        </div>
                                    )}
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

    
