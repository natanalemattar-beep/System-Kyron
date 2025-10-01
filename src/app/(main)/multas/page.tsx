
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CreditCard, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";


const multas = [
    { id: "MUL-001", ente: "SENIAT", motivo: "Retraso en declaración de IVA", fecha: "05/07/2024", monto: 45000, estado: "Pendiente" },
    { id: "MUL-002", ente: "IVSS", motivo: "Inconsistencia en nómina", fecha: "20/06/2024", monto: 15000, estado: "Pagada" },
    { id: "MUL-003", ente: "Alcaldía de Caracas", motivo: "Publicidad exterior no autorizada", fecha: "10/05/2024", monto: 25000, estado: "Pagada" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Pagada: "default",
  Pendiente: "destructive",
};

export default function MultasPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-8 w-8" />
            Gestión de Multas
        </h1>
        <p className="text-muted-foreground mt-2">
            Consulta y paga las multas y sanciones asociadas a tu empresa.
        </p>
      </header>
      <Card>
        <CardHeader>
            <CardTitle>Historial de Multas</CardTitle>
            <CardDescription>Listado completo de multas y su estado actual.</CardDescription>
        </CardHeader>
        <CardContent>
             <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Referencia</TableHead>
                        <TableHead>Ente Emisor</TableHead>
                        <TableHead>Motivo</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead className="text-right">Monto</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {multas.map((multa) => (
                        <TableRow key={multa.id} className={multa.estado === 'Pendiente' ? 'bg-destructive/10' : ''}>
                            <TableCell className="font-medium">{multa.id}</TableCell>
                            <TableCell>{multa.ente}</TableCell>
                            <TableCell>{multa.motivo}</TableCell>
                            <TableCell>{multa.fecha}</TableCell>
                            <TableCell className="text-right">{formatCurrency(multa.monto, "Bs.")}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[multa.estado]}>{multa.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                {multa.estado === "Pendiente" && (
                                     <Button variant="outline" size="sm">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Pagar
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
