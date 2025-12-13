
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye, QrCode, Heart } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

type Solicitud = {
  id: string;
  fecha: string;
  nombres: string;
  estado: "Aprobado" | "En Proceso" | "Rechazado";
};

const solicitudes: Solicitud[] = [
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
    {
        id: "PN-2024-003",
        fecha: "15/07/2024",
        nombres: "Pedro Luis Alcantara",
        estado: "En Proceso",
    },
    {
        id: "PN-2024-004",
        fecha: "05/06/2024",
        nombres: "Sofía Valentina Herrera",
        estado: "Rechazado",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Rechazado: "destructive",
};

export default function PartidasNacimientoPage() {
    const [filter, setFilter] = useState("todos");
    const { toast } = useToast();

    const filteredSolicitudes = solicitudes.filter(s => {
        if (filter === "todos") return true;
        return s.estado.toLowerCase().replace(" ", "-") === filter;
    });

    const handleDownload = (id: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `El documento ${id} se está descargando.`
        });
    }

  return (
    <div className="space-y-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Heart className="h-8 w-8"/>
                    Partidas de Nacimiento
                </h1>
                <p className="text-muted-foreground">
                    Solicita y gestiona tus partidas de nacimiento.
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2" />
                Solicitar Partida
            </Button>
        </header>
      <Card>
        <CardHeader>
            <CardTitle>Mis Solicitudes</CardTitle>
            <CardDescription>Seguimiento de las solicitudes de partidas de nacimiento.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="todos" onValueChange={setFilter} className="w-full">
                <TabsList className="grid w-full grid-cols-4 max-w-lg mb-4">
                    <TabsTrigger value="todos">Todas</TabsTrigger>
                    <TabsTrigger value="aprobado">Aprobadas</TabsTrigger>
                    <TabsTrigger value="en-proceso">En Proceso</TabsTrigger>
                    <TabsTrigger value="rechazado">Rechazadas</TabsTrigger>
                </TabsList>
                <TabsContent value="todos">
                    <RequestsTable solicitudes={solicitudes} onDownload={handleDownload} />
                </TabsContent>
                <TabsContent value="aprobado">
                     <RequestsTable solicitudes={solicitudes.filter(s => s.estado === 'Aprobado')} onDownload={handleDownload} />
                </TabsContent>
                 <TabsContent value="en-proceso">
                     <RequestsTable solicitudes={solicitudes.filter(s => s.estado === 'En Proceso')} onDownload={handleDownload} />
                </TabsContent>
                 <TabsContent value="rechazado">
                     <RequestsTable solicitudes={solicitudes.filter(s => s.estado === 'Rechazado')} onDownload={handleDownload} />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function RequestsTable({ solicitudes, onDownload }: { solicitudes: Solicitud[], onDownload: (id: string) => void }) {
    return (
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
                {solicitudes.length > 0 ? (
                    solicitudes.map((solicitud) => (
                    <TableRow key={solicitud.id}>
                        <TableCell className="font-medium">{solicitud.id}</TableCell>
                        <TableCell>{solicitud.fecha}</TableCell>
                        <TableCell>{solicitud.nombres}</TableCell>
                        <TableCell>
                            <Badge variant={statusVariant[solicitud.estado]}>{solicitud.estado}</Badge>
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
                                        <DialogTitle>Detalle de la Solicitud: {solicitud.id}</DialogTitle>
                                    </DialogHeader>
                                    <div className="py-4 space-y-2">
                                        <p><strong>Nombres:</strong> {solicitud.nombres}</p>
                                        <p><strong>Fecha:</strong> {solicitud.fecha}</p>
                                        <p><strong>Estado:</strong> {solicitud.estado}</p>
                                        <div className="flex justify-center pt-4">
                                            <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=partida-${solicitud.id}`} alt={`QR for ${solicitud.id}`} width={100} height={100} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button>Cerrar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            {solicitud.estado === "Aprobado" && (
                                <Button variant="ghost" size="icon" onClick={() => onDownload(solicitud.id)}>
                                    <FileDown className="h-4 w-4" />
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">No hay solicitudes en este estado.</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
