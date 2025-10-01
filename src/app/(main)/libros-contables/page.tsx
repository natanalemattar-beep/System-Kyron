
"use client";

import { useState, useMemo }from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, FileUp, PlusCircle, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

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

type AsientoLinea = {
    id: number;
    cuenta: string;
    debe: number;
    haber: number;
};

export default function LibrosContablesPage() {
    const { toast } = useToast();
    const [isAsientoDialogOpen, setIsAsientoDialogOpen] = useState(false);
    const [lineasAsiento, setLineasAsiento] = useState<AsientoLinea[]>([
        { id: 1, cuenta: "", debe: 0, haber: 0 },
        { id: 2, cuenta: "", debe: 0, haber: 0 },
    ]);

    const totalDebe = useMemo(() => lineasAsiento.reduce((sum, linea) => sum + (linea.debe || 0), 0), [lineasAsiento]);
    const totalHaber = useMemo(() => lineasAsiento.reduce((sum, linea) => sum + (linea.haber || 0), 0), [lineasAsiento]);
    const isCuadrado = totalDebe === totalHaber && totalDebe > 0;

    const handleCreateBook = () => {
        toast({
            title: "Libro Creado",
            description: "El nuevo libro contable ha sido creado exitosamente.",
        });
    };

    const handleSaveAsiento = () => {
        if (!isCuadrado) {
             toast({
                variant: "destructive",
                title: "Error en el Asiento",
                description: "El total del Debe debe ser igual al total del Haber y mayor que cero.",
            });
            return;
        }
        toast({
            title: "Asiento Contable Registrado",
            description: "La transacción se ha registrado correctamente en el Libro Diario.",
        });
        setIsAsientoDialogOpen(false);
        setLineasAsiento([
            { id: 1, cuenta: "", debe: 0, haber: 0 },
            { id: 2, cuenta: "", debe: 0, haber: 0 },
        ]);
    };
    
    const handleLineaChange = (id: number, field: keyof AsientoLinea, value: string | number) => {
        setLineasAsiento(lineas => lineas.map(linea => 
            linea.id === id ? { ...linea, [field]: value } : linea
        ));
    };

    const addLinea = () => {
        setLineasAsiento(lineas => [...lineas, { id: Date.now(), cuenta: "", debe: 0, haber: 0 }]);
    };

    const removeLinea = (id: number) => {
        setLineasAsiento(lineas => lineas.filter(linea => linea.id !== id));
    };

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
                                    <Dialog open={isAsientoDialogOpen} onOpenChange={setIsAsientoDialogOpen}>
                                        <DialogTrigger asChild>
                                             <Button variant="outline" size="sm" disabled={libro.nombre !== "Libro Diario"}>
                                                <FileUp className="mr-2 h-4 w-4" />
                                                Cargar Asiento
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                            <DialogHeader>
                                                <DialogTitle>Registrar Asiento en el Libro Diario</DialogTitle>
                                                <DialogDescription>
                                                   Introduce los detalles de la transacción. El total del Debe debe ser igual al total del Haber.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="fecha">Fecha de Operación</Label>
                                                        <Input id="fecha" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="concepto">Concepto</Label>
                                                        <Input id="concepto" placeholder="Ej: Pago de alquiler de oficina" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 mt-4">
                                                    <Label>Cuentas Afectadas</Label>
                                                    <div className="border rounded-md">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead>Cuenta</TableHead>
                                                                    <TableHead className="text-right">Debe</TableHead>
                                                                    <TableHead className="text-right">Haber</TableHead>
                                                                    <TableHead></TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                            <TableBody>
                                                                {lineasAsiento.map((linea, index) => (
                                                                    <TableRow key={linea.id}>
                                                                        <TableCell>
                                                                            <Input placeholder="Ej: 628 - Gastos de Alquiler" value={linea.cuenta} onChange={(e) => handleLineaChange(linea.id, 'cuenta', e.target.value)} />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Input type="number" placeholder="0.00" className="text-right" value={linea.debe} onChange={(e) => handleLineaChange(linea.id, 'debe', Number(e.target.value))} />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            <Input type="number" placeholder="0.00" className="text-right" value={linea.haber} onChange={(e) => handleLineaChange(linea.id, 'haber', Number(e.target.value))} />
                                                                        </TableCell>
                                                                        <TableCell>
                                                                             <Button variant="ghost" size="icon" onClick={() => removeLinea(linea.id)} disabled={lineasAsiento.length <= 2}>
                                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                                            </Button>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                        <div className="p-2 border-t">
                                                             <Button variant="outline" size="sm" onClick={addLinea}>
                                                                <PlusCircle className="mr-2 h-4 w-4" />
                                                                Añadir Línea
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex justify-end gap-8 font-bold mt-2 pr-12">
                                                    <span>Total Debe: <span className="font-mono">{formatCurrency(totalDebe, 'Bs.')}</span></span>
                                                    <span>Total Haber: <span className="font-mono">{formatCurrency(totalHaber, 'Bs.')}</span></span>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button type="button" onClick={handleSaveAsiento} disabled={!isCuadrado}>
                                                    Guardar Asiento
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
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
