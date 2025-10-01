
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Moon, PlusCircle, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const registros = [
    { id: 1, empleado: "Carlos Sanchez", fecha: "19/07/2024", horas: 7, observacion: "Turno de vigilancia" },
    { id: 2, empleado: "Luis Gómez", fecha: "22/07/2024", horas: 7, observacion: "Mantenimiento nocturno" },
    { id: 3, empleado: "Carlos Sanchez", fecha: "26/07/2024", horas: 7, observacion: "Turno de vigilancia" },
];

export default function LibroHorarioNocturnoPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Moon className="h-8 w-8" />
                    Libro de Horario Nocturno
                </h1>
                <p className="text-muted-foreground mt-2">
                    Registro de las jornadas de trabajo en horario nocturno.
                </p>
            </div>
             <div className="flex gap-2">
                <Button variant="outline">
                    <Download className="mr-2" />
                    Exportar
                </Button>
                <Button>
                    <PlusCircle className="mr-2" />
                    Nuevo Registro
                </Button>
            </div>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Registros de Julio 2024</CardTitle>
                <CardDescription>Detalle de las horas nocturnas por empleado.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-center">Horas Nocturnas</TableHead>
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
