
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const solicitudes = [
    {
        id: "PN-2024-001",
        fecha: "10/07/2024",
        nombres: "Juan Carlos Rodríguez",
        estado: "Aprobado",
    },
    {
        id: "PN-2024-002",
        fecha: "22/07/2024",
        nombres: "María Gabriela López",
        estado: "En Proceso",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Rechazado: "destructive",
};

export default function PartidasNacimientoPage() {
  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Partidas de Nacimiento</h1>
                <p className="text-muted-foreground">
                    Solicita y gestiona tus partidas de nacimiento.
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2" />
                Solicitar Partida
            </Button>
        </header>
      <Card className="bg-card/50 backdrop-blur-sm">
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
                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=partida-${solicitud.id}`} alt={`QR for ${solicitud.id}`} width={24} height={24} className="inline-block mr-2" />
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
