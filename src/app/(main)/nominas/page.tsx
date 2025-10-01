
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, PlusCircle, FileText, Edit, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const empleados = [
    { id: 1, nombre: "Ana Pérez", cedula: "V-12.345.678", cargo: "Gerente de Proyectos", salarioBase: 12000, estado: "Activo" },
    { id: 2, nombre: "Luis Gómez", cedula: "V-18.765.432", cargo: "Desarrollador Senior", salarioBase: 10500, estado: "Activo" },
    { id: 3, nombre: "María Rodriguez", cedula: "V-20.111.222", cargo: "Diseñadora UI/UX", salarioBase: 9000, estado: "De Vacaciones" },
    { id: 4, nombre: "Carlos Sanchez", cedula: "E-8.999.000", cargo: "Analista de Calidad", salarioBase: 8500, estado: "Activo" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  Activo: "default",
  "De Vacaciones": "secondary",
  Inactivo: "outline",
};

export default function NominasPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="h-8 w-8" />
                    Gestión de Nóminas
                </h1>
                <p className="text-muted-foreground mt-2">
                    Administra el personal y calcula la nómina de tu empresa.
                </p>
            </div>
            <div className="flex gap-2">
                <Button variant="outline">
                    <PlusCircle className="mr-2" />
                    Agregar Empleado
                </Button>
                <Button>
                    <Calculator className="mr-2" />
                    Calcular Nómina
                </Button>
            </div>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>Lista de Empleados</CardTitle>
                <CardDescription>Visualiza la información de los empleados activos e inactivos.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Cédula</TableHead>
                            <TableHead>Cargo</TableHead>
                            <TableHead className="text-right">Salario Base</TableHead>
                            <TableHead className="text-center">Estado</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {empleados.map((emp) => (
                            <TableRow key={emp.id}>
                                <TableCell className="font-medium">{emp.nombre}</TableCell>
                                <TableCell>{emp.cedula}</TableCell>
                                <TableCell>{emp.cargo}</TableCell>
                                <TableCell className="text-right">{formatCurrency(emp.salarioBase, 'Bs.')}</TableCell>
                                <TableCell className="text-center">
                                    <Badge variant={statusVariant[emp.estado]}>{emp.estado}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="mr-2">
                                        <FileText className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Edit className="h-4 w-4" />
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
