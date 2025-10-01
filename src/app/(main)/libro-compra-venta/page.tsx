
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Landmark, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const registros = [
    { id: 1, fecha: "15/07/2024", tipo: "Compra", proveedor: "OficinaTech C.A.", rif: "J-12345678-9", nroFactura: "F-2024-00123", base: 1200, iva: 192, total: 1392 },
    { id: 2, fecha: "16/07/2024", tipo: "Venta", proveedor: "Cliente Final", rif: "V-12345678-9", nroFactura: "V-2024-00567", base: 2500, iva: 400, total: 2900 },
    { id: 3, fecha: "18/07/2024", tipo: "Compra", proveedor: "Suministros Globales", rif: "J-98765432-1", nroFactura: "F-2024-00890", base: 850, iva: 136, total: 986 },
];

export default function LibroCompraVentaPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Landmark className="h-8 w-8" />
                    Libro de Compras y Ventas SENIAT
                </h1>
                <p className="text-muted-foreground mt-2">
                    Registra y consulta tus operaciones fiscales.
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2" />
                Nuevo Registro
            </Button>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Registros del Mes</CardTitle>
                <CardDescription>Visualiza los movimientos de compras y ventas de Julio 2024.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead>Proveedor/Cliente</TableHead>
                            <TableHead>RIF</TableHead>
                            <TableHead>Nro. Factura</TableHead>
                            <TableHead className="text-right">Base Imponible</TableHead>
                            <TableHead className="text-right">IVA (16%)</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell>{reg.fecha}</TableCell>
                                <TableCell>
                                    <Badge variant={reg.tipo === 'Compra' ? 'destructive' : 'default'}>{reg.tipo}</Badge>
                                </TableCell>
                                <TableCell className="font-medium">{reg.proveedor}</TableCell>
                                <TableCell>{reg.rif}</TableCell>
                                <TableCell>{reg.nroFactura}</TableCell>
                                <TableCell className="text-right">{formatCurrency(reg.base, 'Bs.')}</TableCell>
                                <TableCell className="text-right">{formatCurrency(reg.iva, 'Bs.')}</TableCell>
                                <TableCell className="text-right font-semibold">{formatCurrency(reg.total, 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
