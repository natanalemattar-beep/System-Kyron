
"use client";

import { useState, useMemo }from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, PlusCircle, Trash2, CheckCircle, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const librosPrincipales = [
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
        nombre: "Libro de Inventario y Balances",
        descripcion: "Detalle de los activos, pasivos y patrimonio de la empresa.",
        ultimaActualizacion: "30/06/2024",
    }
];

const librosAuxiliares = [
    { nombre: "Libro de Compras y Ventas", href: "/libro-compra-venta", descripcion: "Registro fiscal para el SENIAT." },
    { nombre: "Libro de Nómina", href: "/nominas", descripcion: "Registro oficial para el Ministerio del Trabajo." },
    { nombre: "Libro de Licores", href: "/libro-licores", descripcion: "Control de entradas y salidas de bebidas alcohólicas." },
    { nombre: "Libro de Horas Extras", href: "/libro-horas-extras", descripcion: "Control del pago de horas extraordinarias." },
]

type AsientoLinea = {
    id: number;
    cuenta: string;
    debe: number;
    haber: number;
};

const initialAsientoState: AsientoLinea[] = [
    { id: 1, cuenta: "", debe: 0, haber: 0 },
    { id: 2, cuenta: "", debe: 0, haber: 0 },
];

export default function LibrosContablesPage() {
    const { toast } = useToast();
    const [lineasAsiento, setLineasAsiento] = useState<AsientoLinea[]>(initialAsientoState);

    const totalDebe = useMemo(() => lineasAsiento.reduce((sum, linea) => sum + (linea.debe || 0), 0), [lineasAsiento]);
    const totalHaber = useMemo(() => lineasAsiento.reduce((sum, linea) => sum + (linea.haber || 0), 0), [lineasAsiento]);
    const isCuadrado = totalDebe === totalHaber && totalDebe > 0;

    const handleCreateAuxBook = () => {
        toast({
            title: "Libro Auxiliar Creado",
            description: "El nuevo libro auxiliar ha sido creado exitosamente.",
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
            action: <CheckCircle className="text-green-500"/>
        });
        // Reset form or close dialog
    };
    
    const handleLineaChange = (id: number, field: 'cuenta' | 'debe' | 'haber', value: string | number) => {
        setLineasAsiento(lineas => lineas.map(linea => 
            linea.id === id ? { ...linea, [field]: value } : linea
        ));
    };

    const addLinea = () => {
        setLineasAsiento(lineas => [...lineas, { id: Date.now(), cuenta: "", debe: 0, haber: 0 }]);
    };

    const removeLinea = (id: number) => {
        if (lineasAsiento.length > 2) {
            setLineasAsiento(lineas => lineas.filter(linea => linea.id !== id));
        }
    };

  return (
    <div className="p-4 md:p-8 space-y-8">
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <BookOpen className="h-8 w-8" />
                    Centro de Libros Contables
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gestiona los libros contables principales y auxiliares de tu empresa.
                </p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Registrar Asiento en Libro Diario
                    </Button>
                </DialogTrigger>
                 <DialogContent className="sm:max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>Registrar Nuevo Asiento en Libro Diario</DialogTitle>
                        <DialogDescription>
                        Introduce los detalles de la transacción. El total del Debe debe ser igual al total del Haber.
                        </DialogDescription>
                    </DialogHeader>
                     <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fecha">Fecha de Operación</Label>
                                <Input id="fecha" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="asiento-nro">Número de Asiento</Label>
                                <Input id="asiento-nro" type="number" placeholder="Ej: 001" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="concepto">Concepto</Label>
                                <Input id="concepto" placeholder="Ej: Pago de alquiler de oficina" />
                            </div>
                        </div>
                        <div className="space-y-2 mt-4">
                            <Label>Cuentas Afectadas</Label>
                            <div className="border rounded-md overflow-x-auto">
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
                                        {lineasAsiento.map((linea) => (
                                            <TableRow key={linea.id}>
                                                <TableCell className="min-w-[200px]">
                                                    <Input placeholder="Ej: 628 - Gastos de Alquiler" value={linea.cuenta} onChange={(e) => handleLineaChange(linea.id, 'cuenta', e.target.value)} />
                                                </TableCell>
                                                <TableCell className="min-w-[120px]">
                                                    <Input type="number" placeholder="0.00" className="text-right" value={linea.debe || ""} onChange={(e) => handleLineaChange(linea.id, 'debe', Number(e.target.value))} />
                                                </TableCell>
                                                <TableCell className="min-w-[120px]">
                                                    <Input type="number" placeholder="0.00" className="text-right" value={linea.haber || ""} onChange={(e) => handleLineaChange(linea.id, 'haber', Number(e.target.value))} />
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
                                <div className="p-2 border-t flex justify-between items-center">
                                    <Button variant="outline" size="sm" onClick={addLinea}>
                                        <PlusCircle className="mr-2 h-4 w-4" />
                                        Añadir Línea
                                    </Button>
                                    <div className="flex justify-end gap-4 font-bold text-sm pr-12">
                                        <span>Total Debe: <span className="font-mono">{formatCurrency(totalDebe, 'Bs.')}</span></span>
                                        <span>Total Haber: <span className="font-mono">{formatCurrency(totalHaber, 'Bs.')}</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleSaveAsiento} disabled={!isCuadrado}>
                            Guardar Asiento
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Libros Contables Principales</CardTitle>
                <CardDescription>Registros obligatorios que sirven como base de la contabilidad.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre del Libro</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Última Actualización</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {librosPrincipales.map((libro) => (
                            <TableRow key={libro.nombre}>
                                <TableCell className="font-medium">{libro.nombre}</TableCell>
                                <TableCell>{libro.descripcion}</TableCell>
                                <TableCell>{libro.ultimaActualizacion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Libros Auxiliares</CardTitle>
                <CardDescription>Registros complementarios para el desglose y control de cuentas específicas.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre del Libro</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="text-right">Acción</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {librosAuxiliares.map((libro) => (
                            <TableRow key={libro.nombre}>
                                <TableCell className="font-medium">{libro.nombre}</TableCell>
                                <TableCell>{libro.descripcion}</TableCell>
                                <TableCell className="text-right">
                                    <Button asChild variant="outline" size="sm">
                                        <Link href={libro.href}>
                                          Ver Detalle <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary">
                            <PlusCircle className="mr-2" />
                            Crear Libro Auxiliar
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Crear Nuevo Libro Auxiliar</DialogTitle>
                            <DialogDescription>
                                Dale un nombre a tu nuevo libro auxiliar.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="book-name">Nombre del Libro</Label>
                                <Input id="book-name" placeholder="Ej: Libro de Caja" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleCreateAuxBook}>Crear Libro</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    </div>
  );
}
