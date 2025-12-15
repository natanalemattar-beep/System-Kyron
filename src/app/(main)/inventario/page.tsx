
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Archive, PlusCircle, Download, Edit, MoreHorizontal, AlertTriangle, Trash2, Send, QrCode } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const today = new Date();
const initialInventory = [
    { sku: "PROD-001", nombre: "Resma de Papel Carta", categoria: "Papelería", stock: 150, costo: 5, valor: 750, fechaVencimiento: null },
    { sku: "PROD-002", nombre: "Tóner para Impresora", categoria: "Suministros de Oficina", stock: 30, costo: 80, valor: 2400, fechaVencimiento: null },
    { sku: "PROD-003", nombre: "Laptop 14 pulgadas", categoria: "Equipos de Computación", stock: 12, costo: 600, valor: 7200, fechaVencimiento: null },
    { sku: "PROD-004", nombre: "Silla de Oficina Ergonómica", categoria: "Mobiliario", stock: 25, costo: 150, valor: 3750, fechaVencimiento: null },
    { sku: "FOOD-001", nombre: "Leche Larga Duración 1L", categoria: "Alimentos", stock: 50, costo: 2, valor: 100, fechaVencimiento: addDays(today, 20) },
    { sku: "FOOD-002", nombre: "Atún en lata", categoria: "Alimentos", stock: 100, costo: 1.5, valor: 150, fechaVencimiento: addDays(today, 90) },
    { sku: "FOOD-003", nombre: "Yogurt Griego", categoria: "Alimentos", stock: 30, costo: 3, valor: 90, fechaVencimiento: addDays(today, 5) },
    { sku: "FOOD-004", nombre: "Pan de Molde", categoria: "Alimentos", stock: 20, costo: 2.5, valor: 50, fechaVencimiento: addDays(today, -2) },
];

type InventoryItem = typeof initialInventory[0];

const getStatus = (fechaVencimiento: Date | null) => {
    if (!fechaVencimiento) return { text: 'N/A', variant: 'outline' as const };
    const diffDays = (fechaVencimiento.getTime() - today.getTime()) / (1000 * 3600 * 24);
    if (diffDays < 0) return { text: 'Vencido', variant: 'destructive' as const };
    if (diffDays <= 7) return { text: 'Próximo a Vencer', variant: 'secondary' as const };
    return { text: 'Vigente', variant: 'default' as const };
};

export default function InventarioPage() {
    const [inventory, setInventory] = useState(initialInventory);
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({
            title: `Acción Realizada: ${action}`,
            description: `El inventario ha sido actualizado correctamente.`,
        });
    };

    const handlePromote = (item: InventoryItem) => {
        toast({
            title: "Notificaciones de Promoción Enviadas",
            description: `Se ha notificado al administrador y vendedores sobre ${item.nombre} para su promoción.`,
        });
    }
    
    const handleRemove = (itemSku: string) => {
        setInventory(inventory.filter(item => item.sku !== itemSku));
        toast({
            variant: "destructive",
            title: "Producto Retirado y Desechado",
            description: `El producto ha sido retirado del inventario y movido a cuentas incobrables.`,
        });
    };
    
    const handleExport = () => {
        const headers = ["SKU", "Producto", "Categoría", "Stock", "Costo", "Valor Total", "Vencimiento"];
        const csvContent = [
            headers.join(','),
            ...inventory.map(item => [
                item.sku,
                `"${item.nombre}"`,
                item.categoria,
                item.stock,
                item.costo,
                item.valor,
                item.fechaVencimiento ? formatDate(item.fechaVencimiento) : 'N/A'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "inventario_actual.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        toast({ title: "Exportación Completa", description: "El inventario ha sido exportado a un archivo CSV." });
    };

    const totalInventoryValue = inventory.reduce((acc, item) => acc + item.valor, 0);
    const totalProducts = inventory.length;

    return (
        <div className="space-y-8">
            <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Archive className="h-8 w-8" />
                        Gestión de Inventario
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Control de existencias y valoración. El stock se actualiza en tiempo real con cada venta del TPV.
                    </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full">
                                <PlusCircle className="mr-2" />
                                Añadir Producto
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Añadir Nuevo Producto</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <Input placeholder="Nombre del producto" />
                                <Input placeholder="SKU" />
                                <Input type="number" placeholder="Stock inicial" />
                                <Input type="number" placeholder="Costo unitario" />
                                <div>
                                    <Label>Fecha de Vencimiento (Opcional)</Label>
                                    <Input type="date" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={() => handleAction("Producto añadido")}>Guardar Producto</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="w-full" onClick={handleExport}>
                        <Download className="mr-2" />
                        Exportar
                    </Button>
                </div>
            </header>

            <div className="grid gap-4 md:grid-cols-2">
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Valor Total del Inventario</CardTitle>
                        <Archive className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalInventoryValue, 'Bs.')}</div>
                        <p className="text-xs text-muted-foreground">Valorizado al costo</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
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
                    <CardDescription>Detalle de las existencias actuales, incluyendo fechas de vencimiento.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead className="text-right">Costo</TableHead>
                                    <TableHead className="text-right">Valor Total</TableHead>
                                    <TableHead className="text-center">Vencimiento</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventory.map((item) => {
                                    const status = getStatus(item.fechaVencimiento);
                                    return (
                                    <TableRow key={item.sku} className={status.variant === 'destructive' ? 'bg-destructive/10' : status.variant === 'secondary' ? 'bg-secondary/60' : ''}>
                                        <TableCell className="font-mono whitespace-nowrap">{item.sku}</TableCell>
                                        <TableCell className="font-medium whitespace-nowrap">{item.nombre}</TableCell>
                                        <TableCell className="text-center">{item.stock}</TableCell>
                                        <TableCell className="text-right whitespace-nowrap">{formatCurrency(item.costo, 'Bs.')}</TableCell>
                                        <TableCell className="text-right font-semibold whitespace-nowrap">{formatCurrency(item.valor, 'Bs.')}</TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="whitespace-nowrap">{item.fechaVencimiento ? formatDate(item.fechaVencimiento) : 'N/A'}</span>
                                                <Badge variant={status.variant} className="mt-1">{status.text}</Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=product-${item.sku}`} alt={`QR for ${item.sku}`} width={24} height={24} className="inline-block" />
                                                <Dialog>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DialogTrigger asChild>
                                                                <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Ajustar Stock</DropdownMenuItem>
                                                            </DialogTrigger>
                                                            {status.text === 'Próximo a Vencer' && (
                                                                <DropdownMenuItem onSelect={() => handlePromote(item)}>
                                                                    <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" /> Promocionar
                                                                </DropdownMenuItem>
                                                            )}
                                                            {status.text === 'Vencido' && (
                                                                <DropdownMenuItem onSelect={() => handleRemove(item.sku)} className="text-destructive">
                                                                    <Trash2 className="mr-2 h-4 w-4" /> Retirar y Desechar
                                                                </DropdownMenuItem>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Ajustar Stock para {item.nombre}</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-4">
                                                            <Label htmlFor="new-stock">Nuevo Stock</Label>
                                                            <Input id="new-stock" type="number" defaultValue={item.stock}/>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button onClick={() => handleAction("Stock ajustado")}>Ajustar Stock</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )})}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
