
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShoppingCart, PlusCircle, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const registros = [
    { id: 1, empleado: "Ana Pérez", periodo: "Julio 2024", monto: 1460, fechaPago: "15/07/2024" },
    { id: 2, empleado: "Luis Gómez", periodo: "Julio 2024", monto: 1460, fechaPago: "15/07/2024" },
    { id: 3, empleado: "María Rodriguez", periodo: "Julio 2024", monto: 1460, fechaPago: "15/07/2024" },
    { id: 4, empleado: "Carlos Sanchez", periodo: "Julio 2024", monto: 1460, fechaPago: "15/07/2024" },
];

export default function LibroCestaTicketPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <ShoppingCart className="h-8 w-8" />
                    Libro de Cesta Ticket
                </h1>
                <p className="text-muted-foreground mt-2">
                    Registro y control del beneficio de alimentación.
                </p>
            </div>
             <div className="flex gap-2">
                <Button variant="outline">
                    <Download className="mr-2" />
                    Exportar
                </Button>
                <Button>
                    <PlusCircle className="mr-2" />
                    Registrar Pago
                </Button>
            </div>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Pagos de Julio 2024</CardTitle>
                <CardDescription>Listado de pagos del bono de alimentación por empleado.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Empleado</TableHead>
                            <TableHead>Período</TableHead>
                            <TableHead>Fecha de Pago</TableHead>
                            <TableHead className="text-right">Monto Pagado</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((reg) => (
                            <TableRow key={reg.id}>
                                <TableCell className="font-medium">{reg.empleado}</TableCell>
                                <TableCell>{reg.periodo}</TableCell>
                                <TableCell>{reg.fechaPago}</TableCell>
                                <TableCell className="text-right font-semibold">{formatCurrency(reg.monto, 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
