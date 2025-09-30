
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, FileUp, PlusCircle } from "lucide-react";

const libros = [
    {
        nombre: "Libro Diario",
        descripcion: "Registro cronológico de todas las transacciones.",
        ultimaActualizacion: "15/07/2024",
    },
    {
        nombre: "Libro Mayor",
        descripcion: "Resumen de las transacciones por cuenta contable.",
        ultimaActualizacion: "15/07/2024",
    },
    {
        nombre: "Libro de Inventario",
        descripcion: "Detalle de los activos y pasivos de la empresa.",
        ultimaActualizacion: "30/06/2024",
    }
];

export default function LibrosContablesPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <BookOpen className="h-8 w-8" />
                    Libros Contables
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gestiona los libros contables oficiales de tu empresa.
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2" />
                Crear Nuevo Libro
            </Button>
        </header>

        <Card>
            <CardHeader>
                <CardTitle>Libros Oficiales</CardTitle>
                <CardDescription>Visualiza y actualiza tus libros contables.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre del Libro</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Última Actualización</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {libros.map((libro) => (
                            <TableRow key={libro.nombre}>
                                <TableCell className="font-medium">{libro.nombre}</TableCell>
                                <TableCell>{libro.descripcion}</TableCell>
                                <TableCell>{libro.ultimaActualizacion}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        <FileUp className="mr-2 h-4 w-4" />
                                        Cargar Asiento
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
