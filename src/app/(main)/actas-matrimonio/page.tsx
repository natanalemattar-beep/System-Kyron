
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye, QrCode } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
    <div className="space-y-8">
        <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
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
        <CardHeader>
          <CardTitle>Mis Solicitudes</CardTitle>
          <CardDescription>Seguimiento de las solicitudes de actas de matrimonio.</CardDescription>
        </CardHeader>
        <CardContent>
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
                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=solicitud-${solicitud.id}`} alt={`QR for ${solicitud.id}`} width={24} height={24} className="inline-block mr-2" />
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
