
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const solicitudes = [
    {
        id: "SOL-2024-001",
        fecha: "15/07/2024",
        nombres: "Ana Sofía Pérez",
        estado: "Aprobado",
    },
    {
        id: "SOL-2024-002",
        fecha: "18/07/2024",
        nombres: "Luis Alberto Gómez",
        estado: "En Proceso",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Rechazado: "destructive",
};


export default function ActasMatrimonioPage() {
  return (
    <div>
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Actas de Matrimonio</h1>
                <p className="text-muted-foreground">
                    Solicita y gestiona tus actas de matrimonio.
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2" />
                Solicitar Acta
            </Button>
        </header>
      <Card>
        <CardContent className="pt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nro. Solicitud</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Nombres</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {solicitudes.map((solicitud) => (
                        <TableRow key={solicitud.id}>
                            <TableCell className="font-medium">{solicitud.id}</TableCell>
                            <TableCell>{solicitud.fecha}</TableCell>
                            <TableCell>{solicitud.nombres}</TableCell>
                            <TableCell>
                                <Badge variant={statusVariant[solicitud.estado]}>{solicitud.estado}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" className="mr-2">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                {solicitud.estado === "Aprobado" && (
                                    <Button variant="ghost" size="icon">
                                        <FileDown className="h-4 w-4" />
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
