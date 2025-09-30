
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, PlusCircle, Eye, FileDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

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
            <Button>
                <PlusCircle className="mr-2" />
                Nueva Proforma
            </Button>
        </header>

        <Card>
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
                                    <Button variant="ghost" size="icon" className="mr-2">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
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
