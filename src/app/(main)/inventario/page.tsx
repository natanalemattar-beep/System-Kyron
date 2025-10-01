
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Archive, PlusCircle, Download, Edit } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialInventory = [
    { sku: "PROD-001", nombre: "Resma de Papel Carta", categoria: "Papelería", stock: 150, costo: 5, valor: 750 },
    { sku: "PROD-002", nombre: "Tóner para Impresora", categoria: "Suministros de Oficina", stock: 30, costo: 80, valor: 2400 },
    { sku: "PROD-003", nombre: "Laptop 14 pulgadas", categoria: "Equipos de Computación", stock: 12, costo: 600, valor: 7200 },
    { sku: "PROD-004", nombre: "Silla de Oficina Ergonómica", categoria: "Mobiliario", stock: 25, costo: 150, valor: 3750 },
];

export default function InventarioPage() {
    const [inventory, setInventory] = useState(initialInventory);
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Acción Realizada: ${action}`,
            description: `El inventario ha sido actualizado correctamente.`,
        });
    };
    
    const totalInventoryValue = inventory.reduce((acc, item) => acc + item.valor, 0);
    const totalProducts = inventory.length;

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Archive className="h-8 w-8" />
                        Gestión de Inventario
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Control de existencias y valoración según normativa SENIAT.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <PlusCircle className="mr-2" />
                                Añadir Producto
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Añadir Nuevo Producto al Inventario</DialogTitle>
                            </DialogHeader>
                            {/* Formulario para añadir producto */}
                            <div className="grid gap-4 py-4">
                                <Input placeholder="Nombre del producto" />
                                <Input placeholder="SKU" />
                                <Input type="number" placeholder="Stock inicial" />
                                <Input type="number" placeholder="Costo unitario" />
                            </div>
                            <DialogFooter>
                                <Button onClick={() => handleAction("Producto añadido")}>Guardar Producto</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline">
                        <Download className="mr-2" />
                        Exportar Inventario
                    </Button>
                </div>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Total del Inventario</CardTitle>
                        <Archive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalInventoryValue, 'Bs.')}</div>
                        <p className="text-xs text-muted-foreground">Valorizado al costo</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Productos en Inventario</CardTitle>
                         <PlusCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground">Tipos de productos distintos</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Listado de Productos</CardTitle>
                    <CardDescription>Detalle de las existencias actuales.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SKU</TableHead>
                                <TableHead>Producto</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead className="text-center">Stock</TableHead>
                                <TableHead className="text-right">Costo Unitario</TableHead>
                                <TableHead className="text-right">Valor Total</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map((item) => (
                                <TableRow key={item.sku}>
                                    <TableCell className="font-mono">{item.sku}</TableCell>
                                    <TableCell className="font-medium">{item.nombre}</TableCell>
                                    <TableCell>{item.categoria}</TableCell>
                                    <TableCell className="text-center">{item.stock}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.costo, 'Bs.')}</TableCell>
                                    <TableCell className="text-right font-semibold">{formatCurrency(item.valor, 'Bs.')}</TableCell>
                                    <TableCell className="text-right">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Ajustar Stock de {item.nombre}</DialogTitle>
                                                </DialogHeader>
                                                 <div className="grid gap-4 py-4">
                                                     <Label htmlFor="new-stock">Nuevo Stock</Label>
                                                    <Input id="new-stock" type="number" defaultValue={item.stock} />
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={() => handleAction("Stock ajustado")}>Ajustar Stock</Button>
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
