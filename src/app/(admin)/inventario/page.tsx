"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Archive, CirclePlus as PlusCircle, Download, CreditCard as Edit, MoveHorizontal as MoreHorizontal, TriangleAlert as AlertTriangle, Trash2, Send, QrCode } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const initialInventory = [
    { sku: "KYRON-BIN-01", nombre: "Papelera Inteligente (Magnetismo)", categoria: "Tecnología Ambiental", stock: 15, costo: 95, valor: 1425 },
    { sku: "SIM-CARD-01", nombre: "SIM Card Física (Línea Kyron)", categoria: "Telecomunicaciones", stock: 100, costo: 2, valor: 200 },
    { sku: "ESIM-DIG-01", nombre: "eSIM Digital (Línea Kyron)", categoria: "Telecomunicaciones", stock: 1000, costo: 0, valor: 0 },
    { sku: "PROD-001", nombre: "Resma de Papel Carta", categoria: "Papelería", stock: 150, costo: 5, valor: 750 },
    { sku: "PROD-002", nombre: "Impresora Fiscal Térmica", categoria: "Suministros de Oficina", stock: 30, costo: 80, valor: 2400 },
    { sku: "PROD-003", nombre: "Laptop 14 pulgadas", categoria: "Equipos de Computación", stock: 12, costo: 600, valor: 7200 },
];

export default function InventarioPage() {
    const [inventory, setInventory] = useState(initialInventory);
    const { toast } = useToast();

    const handleAction = (action: string) => {
        toast({ title: `Acción: ${action}`, description: `El inventario ha sido actualizado correctamente.` });
    };

    return (
        <div className="space-y-8">
            <header className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
                        <Archive className="h-8 w-8 text-primary" />
                        Gestión de Existencias
                    </h1>
                    <p className="text-muted-foreground mt-2 font-medium">
                        Control de inventario centralizado: Líneas Kyron, papeleras magnéticas y equipos fiscales.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl font-bold text-[10px] uppercase tracking-widest">
                        <Download className="mr-2 h-4 w-4" /> Exportar CSV
                    </Button>
                    <Button className="btn-3d-primary rounded-xl font-black text-[10px] uppercase tracking-widest">
                        <PlusCircle className="mr-2 h-4 w-4" /> Añadir Producto
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                 <Card className="bg-card/50 backdrop-blur-sm border shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Valor del Activo</CardTitle>
                        <Archive className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter italic">{formatCurrency(inventory.reduce((acc, i) => acc + i.valor, 0), 'Bs.')}</div>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm border shadow-sm rounded-2xl">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">SKUs Disponibles</CardTitle>
                         <PlusCircle className="h-4 w-4 text-secondary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black tracking-tighter italic">{inventory.length}</div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border rounded-[2rem] shadow-lg">
                <CardHeader className="p-8">
                    <CardTitle className="text-lg font-black uppercase tracking-tight">Kardex de Inventario</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest">SKU</TableHead>
                                <TableHead className="text-[10px] font-black uppercase tracking-widest">Producto</TableHead>
                                <TableHead className="text-center text-[10px] font-black uppercase tracking-widest">Stock</TableHead>
                                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Costo</TableHead>
                                <TableHead className="text-right text-[10px] font-black uppercase tracking-widest">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map((item) => (
                                <TableRow key={item.sku} className="hover:bg-muted/50 transition-colors">
                                    <TableCell className="font-mono text-xs font-bold text-primary">{item.sku}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm">{item.nombre}</span>
                                            <span className="text-[9px] text-muted-foreground font-bold uppercase">{item.categoria}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-center font-bold">{item.stock}</TableCell>
                                    <TableCell className="text-right font-mono text-xs">{formatCurrency(item.costo, 'Bs.')}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
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