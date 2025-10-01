
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, FileUp, PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

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
    const { toast } = useToast();

    const handleCreateBook = () => {
        toast({
            title: "Libro Creado",
            description: "El nuevo libro contable ha sido creado exitosamente.",
        });
    };

    const handleUploadEntry = (bookName: string) => {
        toast({
            title: "Asiento Cargado",
            description: `Se ha cargado un nuevo asiento en el ${bookName}.`,
        });
    }

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
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Crear Nuevo Libro
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Nuevo Libro Contable</DialogTitle>
                        <DialogDescription>
                            Elige el tipo de libro que deseas crear.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="book-name" className="text-right">Nombre</Label>
                            <Input id="book-name" defaultValue="Libro de Actas" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreateBook}>Crear Libro</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
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
                                    <Button variant="outline" size="sm" onClick={() => handleUploadEntry(libro.nombre)}>
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
