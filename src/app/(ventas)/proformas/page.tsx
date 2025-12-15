

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, PlusCircle, Eye, FileDown } from "lucide-react";
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
    { id: "PRO-2024-004", fecha: "15/07/2024", cliente: "Global Tech", total: 18000, estado: "Rechazada", items: [{ descripcion: "Consultoría de Sistemas", cantidad: 1, precio: 18000 }] },
    { id: "PRO-2024-005", fecha: "23/07/2024", cliente: "Servicios Creativos", total: 5000, estado: "Enviada", items: [{ descripcion: "Diseño de Marca", cantidad: 1, precio: 5000 }] },
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
            description: "La nueva proforma se ha guardado como borrador.",
        });
    }

    const handleDownload = (proformaId: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `La proforma ${proformaId} se está descargando.`,
        });
    }

    const filteredProformas = proformas.filter(p => {
        if (filter === "todos") return true;
        return p.estado.toLowerCase() === filter;
    });


  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Receipt className="h-8 w-8" />
                    Gestión de Proformas
                </h1>
                <p className="text-muted-foreground mt-2">
                    Crea, envía y gestiona tus cotizaciones y facturas proforma.
                </p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Nueva Proforma
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Crear Nueva Proforma</DialogTitle>
                        <DialogDescription>
                            Complete los datos para generar una nueva proforma.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cliente" className="text-right">Cliente</Label>
                            <Input id="cliente" defaultValue="Nuevo Cliente" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="total" className="text-right">Monto Total</Label>
                            <Input id="total" type="number" defaultValue="5000" className="col-span-3" />
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
                <CardDescription>Listado de las últimas proformas generadas.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="todos" onValueChange={setFilter} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 max-w-xl mb-4">
                        <TabsTrigger value="todos">Todas</TabsTrigger>
                        <TabsTrigger value="borrador">Borrador</TabsTrigger>
                        <TabsTrigger value="enviada">Enviadas</TabsTrigger>
                        <TabsTrigger value="aprobada">Aprobadas</TabsTrigger>
                        <TabsTrigger value="rechazada">Rechazadas</TabsTrigger>
                    </TabsList>
                    <TabsContent value={filter}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nro. Proforma</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead className="text-right">Monto Total</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProformas.map((proforma) => (
                                    <TableRow key={proforma.id}>
                                        <TableCell className="font-medium">{proforma.id}</TableCell>
                                        <TableCell>{proforma.fecha}</TableCell>
                                        <TableCell>{proforma.cliente}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(proforma.total, 'Bs.')}</TableCell>
                                        <TableCell>
                                            <Badge variant={statusVariant[proforma.estado]}>{proforma.estado}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=proforma-${proforma.id}`} alt={`QR for ${proforma.id}`} width={24} height={24} className="inline-block mr-2" />
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="mr-2">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Detalles de Proforma: {proforma.id}</DialogTitle>
                                                        <DialogDescription>
                                                            Cliente: {proforma.cliente} | Fecha: {proforma.fecha}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="py-4">
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
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
                                                                        <TableCell className="text-right">{formatCurrency(item.precio * item.cantidad, 'Bs.')}</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </div>
                                                    <DialogFooter className="border-t pt-4 flex justify-between items-center">
                                                        <p><strong>Estado:</strong> <Badge variant={statusVariant[proforma.estado]}>{proforma.estado}</Badge></p>
                                                        <p className="text-lg font-bold">Total: {formatCurrency(proforma.total, 'Bs.')}</p>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>
                                            <Button variant="ghost" size="icon" onClick={() => handleDownload(proforma.id)}>
                                                <FileDown className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                 {filteredProformas.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center text-muted-foreground">No hay proformas en este estado.</TableCell>
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
