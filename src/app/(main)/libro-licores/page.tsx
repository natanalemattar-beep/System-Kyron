"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wine, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const movimientos = [
    { id: 1, fecha: "15/07/2024", tipo: "Entrada", producto: "Ron Añejo 0.75L", cantidad: 24, origen: "Proveedor A", nroGuia: "G-12345" },
    { id: 2, fecha: "16/07/2024", tipo: "Salida", producto: "Vino Tinto 0.75L", cantidad: 12, destino: "Venta Cliente B", nroGuia: "N/A" },
    { id: 3, fecha: "18/07/2024", tipo: "Entrada", producto: "Cerveza Pilsen (Caja 24)", cantidad: 50, origen: "Proveedor C", nroGuia: "G-67890" },
];

export default function LibroLicoresPage() {
    const { toast } = useToast();

    const handleRegisterMovement = () => {
        toast({
            title: "Movimiento Registrado",
            description: "El movimiento de inventario ha sido registrado en el libro de licores.",
        })
    }

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Wine className="h-8 w-8" />
                    Libro de Licores
                </h1>
                <p className="text-muted-foreground mt-2">
                    Control de entradas y salidas de bebidas alcohólicas.
                </p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Registrar Movimiento
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Movimiento de Licores</DialogTitle>
                        <DialogDescription>
                            Complete los detalles de la entrada o salida de inventario.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="producto" className="text-right">Producto</Label>
                            <Input id="producto" defaultValue="Ron Añejo 0.75L" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cantidad" className="text-right">Cantidad</Label>
                            <Input id="cantidad" type="number" defaultValue="24" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleRegisterMovement}>Registrar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Movimientos de Inventario</CardTitle>
                <CardDescription>Registro de entradas y salidas de licores.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-center">Cantidad (Uds.)</TableHead>
                            <TableHead>Origen/Destino</TableHead>
                            <TableHead>Nro. Guía / Ref.</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {movimientos.map((mov) => (
                            <TableRow key={mov.id}>
                                <TableCell>{mov.fecha}</TableCell>
                                <TableCell>
                                    <Badge variant={mov.tipo === 'Entrada' ? 'secondary' : 'outline'}>{mov.tipo}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">{mov.producto}</TableCell>
                                <TableCell className="text-center">{mov.cantidad}</TableCell>
                                <TableCell>{mov.origen || mov.destino}</TableCell>
                                <TableCell>{mov.nroGuia}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
