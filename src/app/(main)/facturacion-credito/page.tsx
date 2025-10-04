
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FilePlus, PlusCircle, Trash2, CreditCard } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const clientes = [
    { id: "CLI-001", nombre: "Tech Solutions LLC" },
    { id: "CLI-002", nombre: "Innovate Corp" },
    { id: "CLI-003", nombre: "Marketing Pro" },
];

const initialFacturas = [
    { id: "FACC-001", cliente: "Tech Solutions LLC", fechaEmision: "2024-07-25", fechaVencimiento: "2024-08-24", monto: 5500, estado: "Pendiente", metodo: "Crédito Directo" },
    { id: "FACC-002", cliente: "Innovate Corp", fechaEmision: "2024-06-15", fechaVencimiento: "2024-07-15", monto: 3200, estado: "Vencida", metodo: "Cashea" },
];

type Item = { id: number; descripcion: string; cantidad: number; precio: number };
type Factura = typeof initialFacturas[0];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Pagada: "default",
  Pendiente: "secondary",
  Vencida: "destructive",
};

export default function FacturacionCreditoPage() {
    const [facturas, setFacturas] = useState<Factura[]>(initialFacturas);
    const [items, setItems] = useState<Item[]>([{ id: 1, descripcion: '', cantidad: 1, precio: 0 }]);
    const { toast } = useToast();
    
    const totalFactura = items.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);

    const handleAddItem = () => {
        setItems([...items, { id: Date.now(), descripcion: '', cantidad: 1, precio: 0 }]);
    };

    const handleRemoveItem = (id: number) => {
        if (items.length > 1) {
            setItems(items.filter(item => item.id !== id));
        }
    };
    
    const handleCreateInvoice = () => {
        toast({
            title: "Factura a Crédito Creada",
            description: "La nueva factura se ha registrado como pendiente de cobro.",
        });
    }

    const handleRegisterPayment = (facturaId: string) => {
        setFacturas(facturas.map(f => f.id === facturaId ? { ...f, estado: "Pagada" } : f));
        toast({
            title: "Pago Registrado",
            description: `Se ha marcado la factura ${facturaId} como pagada.`,
        });
    }

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <CreditCard className="h-8 w-8" />
                        Facturación a Crédito (Cuentas por Cobrar)
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Genera y gestiona las facturas para tus clientes a crédito.
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Crear Factura a Crédito
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-3xl">
                        <DialogHeader>
                            <DialogTitle>Nueva Factura a Crédito</DialogTitle>
                            <DialogDescription>
                                Completa los datos del cliente, los items y las condiciones de pago.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cliente">Cliente</Label>
                                    <Select>
                                        <SelectTrigger id="cliente">
                                            <SelectValue placeholder="Selecciona un cliente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {clientes.map(c => <SelectItem key={c.id} value={c.id}>{c.nombre}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="metodo-credito">Método de Crédito</Label>
                                     <Select>
                                        <SelectTrigger id="metodo-credito">
                                            <SelectValue placeholder="Selecciona el método" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="directo">Crédito Directo Empresa</SelectItem>
                                            <SelectItem value="cashea">Cashea</SelectItem>
                                            <SelectItem value="krece">Krece</SelectItem>
                                            <SelectItem value="rapikom">Rapikom</SelectItem>
                                            <SelectItem value="popclik">Popclik</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="terminos">Términos de Pago</Label>
                                     <Select>
                                        <SelectTrigger id="terminos">
                                            <SelectValue placeholder="Selecciona los términos" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="30">Neto 30 días</SelectItem>
                                            <SelectItem value="60">Neto 60 días</SelectItem>
                                            <SelectItem value="90">Neto 90 días</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            
                            <div className="space-y-2 pt-4">
                                <Label>Items de la Factura</Label>
                                <div className="space-y-2">
                                    {items.map((item, index) => (
                                        <div key={item.id} className="flex gap-2 items-center">
                                            <Input placeholder="Descripción del producto o servicio" className="flex-grow" />
                                            <Input type="number" placeholder="Cant." className="w-20" defaultValue={1} />
                                            <Input type="number" placeholder="Precio" className="w-28" />
                                            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)} disabled={items.length <= 1}>
                                                <Trash2 className="h-4 w-4 text-destructive"/>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <Button variant="outline" size="sm" onClick={handleAddItem}>
                                    <PlusCircle className="mr-2 h-4 w-4"/> Añadir Item
                                </Button>
                            </div>
                        </div>
                        <DialogFooter className="border-t pt-4">
                            <div className="flex justify-between items-center w-full">
                                <span className="text-lg font-bold">Total: {formatCurrency(totalFactura, 'Bs.')}</span>
                                <Button onClick={handleCreateInvoice}>Guardar Factura</Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Historial de Facturas a Crédito</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nro. Factura</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Método</TableHead>
                                <TableHead>Vencimiento</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facturas.map((factura) => (
                                <TableRow key={factura.id}>
                                    <TableCell className="font-mono">{factura.id}</TableCell>
                                    <TableCell className="font-medium">{factura.cliente}</TableCell>
                                    <TableCell>{factura.metodo}</TableCell>
                                    <TableCell>{formatDate(factura.fechaVencimiento)}</TableCell>
                                    <TableCell className="text-right font-semibold">{formatCurrency(factura.monto, 'Bs.')}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={statusVariant[factura.estado]}>{factura.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {factura.estado !== "Pagada" && (
                                            <Button size="sm" variant="outline" onClick={() => handleRegisterPayment(factura.id)}>
                                                Registrar Pago
                                            </Button>
                                        )}
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
