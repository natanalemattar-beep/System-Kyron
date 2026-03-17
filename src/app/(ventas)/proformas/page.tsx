
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, CirclePlus as PlusCircle, Eye, FileDown, CircleCheck as CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Item = {
  descripcion: string;
  cantidad: number;
  precio: number;
};

type Proforma = {
  id: string;
  fecha: string;
  cliente: string;
  total: number;
  estado: "Enviada" | "Aprobada" | "Borrador" | "Rechazada";
  items: Item[];
};

const proformas: Proforma[] = [
    { id: "PRO-2024-001", fecha: "19/07/2024", cliente: "Constructora XYZ", total: 15000, estado: "Enviada", items: [{ descripcion: "Licencia Anual Software", cantidad: 1, precio: 12000 }, { descripcion: "Soporte Premium", cantidad: 1, precio: 3000 }] },
    { id: "PRO-2024-002", fecha: "20/07/2024", cliente: "Eventos Festivos C.A.", total: 8500, estado: "Aprobada", items: [{ descripcion: "Punto de Venta Móvil", cantidad: 2, precio: 4250 }] },
    { id: "PRO-2024-003", fecha: "21/07/2024", cliente: "Inversiones ABC", total: 22000, estado: "Borrador", items: [{ descripcion: "Servidores Dedicados", cantidad: 1, precio: 22000 }] },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Enviada: "secondary",
  Aprobada: "default",
  Borrador: "outline",
  Rechazada: "destructive",
};

export default function ProformasPage() {
    const { toast } = useToast();
    const [filter, setFilter] = useState("todos");

    const handleCreateProforma = () => {
        toast({
            title: "Proforma Creada",
            description: "La nueva proforma se ha guardado como borrador exitosamente.",
        });
    }

    const handleDownload = (proformaId: string) => {
        toast({
            title: "Generando PDF",
            description: `La proforma ${proformaId} está siendo preparada para su descarga.`,
            action: <CheckCircle className="text-green-500 h-4 w-4" />
        });
        
        // Simular descarga via activación de diálogo de impresión
        window.print();
    }

    const filteredProformas = proformas.filter(p => {
        if (filter === "todos") return true;
        return p.estado.toLowerCase() === filter;
    });


  return (
    <div className="p-4 md:p-8">
        <style>
            {`
                @media print {
                    body * { visibility: hidden; }
                    .proforma-print, .proforma-print * { visibility: visible; }
                    .proforma-print { position: absolute; left: 0; top: 0; width: 100%; }
                }
            `}
        </style>
        <header className="mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Receipt className="h-8 w-8 text-primary" />
                    Gestión de Proformas
                </h1>
                <p className="text-muted-foreground mt-2">
                    Crea, envía y gestiona tus cotizaciones y facturas preliminares.
                </p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nueva Proforma
                    </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                    <DialogHeader>
                        <DialogTitle>Crear Nueva Proforma</DialogTitle>
                        <DialogDescription>
                            Complete los datos básicos para generar el borrador.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="cliente">Cliente</Label>
                            <Input id="cliente" defaultValue="Nuevo Cliente" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="total">Monto Total Estimado (Bs.)</Label>
                            <Input id="total" type="number" defaultValue="5000" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreateProforma}>Crear Borrador</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Proformas Recientes</CardTitle>
                <CardDescription>Estado de las últimas cotizaciones emitidas a clientes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="todos" onValueChange={setFilter} className="w-full">
                    <TabsList className="grid w-full grid-cols-4 max-w-xl mb-6 h-auto">
                        <TabsTrigger value="todos" className="py-2">Todas</TabsTrigger>
                        <TabsTrigger value="borrador" className="py-2">Borrador</TabsTrigger>
                        <TabsTrigger value="enviada" className="py-2">Enviadas</TabsTrigger>
                        <TabsTrigger value="aprobada" className="py-2">Aprobadas</TabsTrigger>
                    </TabsList>
                    <TabsContent value={filter}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nro. Proforma</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="text-right">Monto Total</TableHead>
                                    <TableHead className="text-center">Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProformas.map((proforma) => (
                                    <TableRow key={proforma.id}>
                                        <TableCell className="font-mono text-xs font-bold text-primary">{proforma.id}</TableCell>
                                        <TableCell className="text-sm">{proforma.fecha}</TableCell>
                                        <TableCell className="font-medium">{proforma.cliente}</TableCell>
                                        <TableCell className="text-right font-mono">{formatCurrency(proforma.total, 'Bs.')}</TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={statusVariant[proforma.estado]}>{proforma.estado}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-2xl proforma-print">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-2xl font-black">Proforma {proforma.id}</DialogTitle>
                                                            <DialogDescription>
                                                                {proforma.cliente} | {proforma.fecha}
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="py-6">
                                                            <Table>
                                                                <TableHeader>
                                                                    <TableRow className="bg-secondary/30">
                                                                        <TableHead>Descripción</TableHead>
                                                                        <TableHead className="text-center">Cant.</TableHead>
                                                                        <TableHead className="text-right">Total</TableHead>
                                                                    </TableRow>
                                                                </TableHeader>
                                                                <TableBody>
                                                                    {proforma.items.map((item, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell>{item.descripcion}</TableCell>
                                                                            <TableCell className="text-center">{item.cantidad}</TableCell>
                                                                            <TableCell className="text-right font-mono">{formatCurrency(item.precio * item.cantidad, 'Bs.')}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                            <div className="mt-6 flex justify-end">
                                                                <p className="text-xl font-black text-primary border-t-2 pt-2 min-w-[200px] text-right">TOTAL: {formatCurrency(proforma.total, 'Bs.')}</p>
                                                            </div>
                                                        </div>
                                                        <DialogFooter className="border-t pt-4 flex sm:justify-between items-center print:hidden">
                                                            <Badge variant={statusVariant[proforma.estado]}>{proforma.estado}</Badge>
                                                            <Button size="sm" onClick={() => handleDownload(proforma.id)}><FileDown className="mr-2 h-4 w-4"/> Descargar PDF</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(proforma.id)}>
                                                    <FileDown className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                 {filteredProformas.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-12 text-muted-foreground italic">No hay proformas que coincidan con el filtro.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
