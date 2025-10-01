
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Archive, PlusCircle, Download, Edit, MoreHorizontal, AlertTriangle, Trash2, Send } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addDays } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

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
                    <CardDescription>Detalle de las existencias actuales, incluyendo fechas de vencimiento.</CardDescription>
                </CardHeader>
                <CardContent>
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
                                    <TableCell className="font-mono">{item.sku}</TableCell>
                                    <TableCell className="font-medium">{item.nombre}</TableCell>
                                    <TableCell className="text-center">{item.stock}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(item.costo, 'Bs.')}</TableCell>
                                    <TableCell className="text-right font-semibold">{formatCurrency(item.valor, 'Bs.')}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex flex-col items-center">
                                            <span>{item.fechaVencimiento ? formatDate(item.fechaVencimiento) : 'N/A'}</span>
                                            <Badge variant={status.variant} className="mt-1">{status.text}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                         <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                 <DialogTrigger asChild>
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4" /> Ajustar Stock
                                                    </DropdownMenuItem>
                                                 </DialogTrigger>
                                                {status.text === 'Próximo a Vencer' && (
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                            <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" /> Promocionar
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                )}
                                                {status.text === 'Vencido' && (
                                                    <DialogTrigger asChild>
                                                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Retirar y Desechar
                                                        </DropdownMenuItem>
                                                    </DialogTrigger>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Dialogs for actions. Using one set of dialogs and managing content would be more optimized, but this is simpler for now. */}
            <Dialog>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajustar Stock</DialogTitle>
                    </DialogHeader>
                     <div className="grid gap-4 py-4">
                         <Label htmlFor="new-stock">Nuevo Stock</Label>
                        <Input id="new-stock" type="number" />
                    </div>
                    <DialogFooter>
                        <Button onClick={() => handleAction("Stock ajustado")}>Ajustar Stock</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

             <Dialog>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Notificar Promoción</DialogTitle>
                        <DialogDescription>
                           Se enviará una notificación al administrador y a los vendedores para promocionar este producto.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-2">
                        <p><strong>Producto:</strong> Leche Larga Duración 1L</p>
                        <p><strong>Stock:</strong> 50</p>
                        <p><strong>Vence en:</strong> 20 días</p>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => handlePromote(inventory[0])}>
                            <Send className="mr-2 h-4 w-4" /> Enviar Notificaciones (WhatsApp & Email)
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

             <Dialog>
                 <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Confirmar Retiro de Producto Vencido</DialogTitle>
                        <DialogDescription>
                           ¿Está seguro de que desea retirar y desechar <strong>Pan de Molde</strong>? Esta acción es irreversible y moverá el costo a cuentas incobrables.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="ghost">Cancelar</Button>
                         <Button variant="destructive" onClick={() => handleRemove("FOOD-004")}>
                            <Trash2 className="mr-2 h-4 w-4" /> Sí, retirar y desechar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
}
    