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
    { sku: "PROD-002", nombre: "Impresora Fiscal Térmica", categoria: "Suministros de Oficina", stock: 30, costo: 80, valor: 2400, fechaVencimiento: null },
    { sku: "KYRON-BIN-01", nombre: "Papelera Inteligente (Magnetismo)", categoria: "Tecnología Ambiental", stock: 15, costo: 95, valor: 1425, fechaVencimiento: null },
    { sku: "PHONE-001", nombre: "Smartphone Kyron Pro X", categoria: "Telecomunicaciones", stock: 25, costo: 180, valor: 4500, fechaVencimiento: null },
    { sku: "SIM-CARD-01", nombre: "Número Telefónico (SIM)", categoria: "Telecomunicaciones", stock: 100, costo: 2, valor: 200, fechaVencimiento: null },
    { sku: "PROD-003", nombre: "Laptop 14 pulgadas", categoria: "Equipos de Computación", stock: 12, costo: 600, valor: 7200, fechaVencimiento: null },
    { sku: "FOOD-003", nombre: "Yogurt Griego", categoria: "Alimentos", stock: 30, costo: 3, valor: 90, fechaVencimiento: addDays(today, 5) },
];

type InventoryItem = typeof initialInventory[0];

const getStatus = (fechaVencimiento: Date | null) => {
    if (!fechaVencimiento) return { text: 'Vigente', variant: 'default' as const };
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
                        <Archive className="h-8 w-8 text-primary" />
                        Gestión de Existencias
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Control de inventario centralizado. Comercialización de equipos, papeleras magnéticas y líneas.
                    </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full btn-3d-primary rounded-xl h-11 px-6">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Añadir Producto
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="rounded-[2rem]">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-black">Añadir Nuevo Producto</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest opacity-60">Nombre del producto</Label>
                                    <Input placeholder="Ej: Smartphone Kyron X" className="rounded-xl h-11 bg-secondary/30 border-none" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-60">SKU</Label>
                                        <Input placeholder="KRN-001" className="rounded-xl h-11 bg-secondary/30 border-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-60">Categoría</Label>
                                        <Input placeholder="Telecom" className="rounded-xl h-11 bg-secondary/30 border-none" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-60">Stock Inicial</Label>
                                        <Input type="number" placeholder="0" className="rounded-xl h-11 bg-secondary/30 border-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-xs font-black uppercase tracking-widest opacity-60">Costo Unitario</Label>
                                        <Input type="number" placeholder="0.00" className="rounded-xl h-11 bg-secondary/30 border-none" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={() => handleAction("Producto añadido")} className="w-full h-12 rounded-xl font-black btn-3d-primary shadow-lg">Guardar Producto</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" className="w-full rounded-xl h-11 px-6 font-bold uppercase text-[10px] tracking-widest" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" />
                        Exportar CSV
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                 <Card className="bg-card/50 backdrop-blur-sm border-primary/5 rounded-2xl shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Valor del Activo Circulante</CardTitle>
                        <div className="p-2 bg-primary/5 rounded-lg">
                            <Archive className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter italic">{formatCurrency(totalInventoryValue, 'Bs.')}</div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Valorización al Costo Real</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border-primary/5 rounded-2xl shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">SKUs Disponibles</CardTitle>
                         <div className="p-2 bg-secondary/5 rounded-lg">
                            <PlusCircle className="h-4 w-4 text-secondary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter italic">{totalProducts}</div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Ítems Únicos en Almacén</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/5 rounded-[2rem] shadow-lg">
                <CardHeader className="p-8">
                    <CardTitle className="text-lg font-black uppercase tracking-tight">Kardex de Inventario</CardTitle>
                    <CardDescription className="text-xs font-medium">Control detallado de existencias, incluyendo tecnología de magnetismo y dispositivos móviles.</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-primary/5">
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">SKU</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Producto</TableHead>
                                    <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">Stock</TableHead>
                                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Costo</TableHead>
                                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Valor Total</TableHead>
                                    <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
                                    <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventory.map((item) => {
                                    const status = getStatus(item.fechaVencimiento);
                                    return (
                                    <TableRow key={item.sku} className="border-primary/5 hover:bg-primary/[0.02] transition-colors">
                                        <TableCell className="font-mono text-[10px] font-bold text-primary">{item.sku}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm leading-none">{item.nombre}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium uppercase mt-1">{item.categoria}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-bold">{item.stock}</TableCell>
                                        <TableCell className="text-right font-mono text-xs">{formatCurrency(item.costo, 'Bs.')}</TableCell>
                                        <TableCell className="text-right font-black text-xs italic">{formatCurrency(item.valor, 'Bs.')}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={status.variant} className="text-[9px] font-black uppercase tracking-widest h-5">{status.text}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=product-${item.sku}`} alt={`QR for ${item.sku}`} width={20} height={20} className="mr-2 opacity-50 hover:opacity-100 transition-opacity" />
                                                <Dialog>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg"><MoreHorizontal className="h-4 w-4" /></Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="rounded-xl border-primary/10 shadow-2xl">
                                                            <DialogTrigger asChild>
                                                                <DropdownMenuItem className="text-xs font-bold"><Edit className="mr-2 h-3.5 w-3.5" /> Ajustar Stock</DropdownMenuItem>
                                                            </DialogTrigger>
                                                            <DropdownMenuItem className="text-xs font-bold" onSelect={() => handleAction("QR Generado")}><QrCode className="mr-2 h-3.5 w-3.5" /> Generar QR</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-xs font-bold text-destructive" onSelect={() => handleRemove(item.sku)}><Trash2 className="mr-2 h-3.5 w-3.5" /> Eliminar</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <DialogContent className="rounded-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-lg font-black">Ajustar Existencias: {item.nombre}</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="grid gap-4 py-6">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="new-stock" className="text-xs font-black uppercase tracking-widest opacity-60">Nuevo Nivel de Stock</Label>
                                                                <Input id="new-stock" type="number" defaultValue={item.stock} className="h-12 text-lg font-black bg-secondary/30 border-none rounded-xl" />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button onClick={() => handleAction("Stock ajustado")} className="w-full h-12 rounded-xl font-black btn-3d-primary shadow-lg">Confirmar Ajuste</Button>
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