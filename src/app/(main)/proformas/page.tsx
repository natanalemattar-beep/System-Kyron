
"use client";

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


const proformas = [
    { id: "PRO-2024-001", fecha: "19/07/2024", cliente: "Constructora XYZ", total: 15000, estado: "Enviada" },
    { id: "PRO-2024-002", fecha: "20/07/2024", cliente: "Eventos Festivos C.A.", total: 8500, estado: "Aprobada" },
    { id: "PRO-2024-003", fecha: "21/07/2024", cliente: "Inversiones ABC", total: 22000, estado: "Borrador" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Enviada: "secondary",
  Aprobada: "default",
  Borrador: "outline",
  Rechazada: "destructive",
};

export default function ProformasPage() {
    const { toast } = useToast();

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
                        {proformas.map((proforma) => (
                            <TableRow key={proforma.id}>
                                <TableCell className="font-medium">{proforma.id}</TableCell>
                                <TableCell>{proforma.fecha}</TableCell>
                                <TableCell>{proforma.cliente}</TableCell>
                                <TableCell className="text-right">{formatCurrency(proforma.total, 'Bs.')}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[proforma.estado]}>{proforma.estado}</Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" className="mr-2">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Detalles de Proforma: {proforma.id}</DialogTitle>
                                            </DialogHeader>
                                            <div className="py-4 space-y-2">
                                                <p><strong>Cliente:</strong> {proforma.cliente}</p>
                                                <p><strong>Fecha:</strong> {proforma.fecha}</p>
                                                <p><strong>Monto:</strong> {formatCurrency(proforma.total, "Bs.")}</p>
                                                <p><strong>Estado:</strong> {proforma.estado}</p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="ghost" size="icon" onClick={() => handleDownload(proforma.id)}>
                                        <FileDown className="h-4 w-4" />
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
