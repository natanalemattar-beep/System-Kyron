
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye, QrCode, FileText, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


type Solicitud = {
  id: string;
  fecha: string;
  nombres: string;
  estado: "Aprobado" | "En Proceso" | "Rechazado";
  motivoRechazo?: string;
};

const solicitudes: Solicitud[] = [
    {
        id: "SOL-2024-001",
        fecha: "15/07/2024",
        nombres: "Ana Sofía Pérez y Carlos Gómez",
        estado: "Aprobado",
    },
    {
        id: "SOL-2024-002",
        fecha: "18/07/2024",
        nombres: "Luis Alberto Gómez y Ana García",
        estado: "En Proceso",
    },
    {
        id: "SOL-2024-003",
        fecha: "12/07/2024",
        nombres: "Marta Sánchez y Jorge Diaz",
        estado: "Rechazado",
        motivoRechazo: "Número de acta inconsistente. Verifique el número y la fecha del matrimonio."
    },
     {
        id: "SOL-2024-004",
        fecha: "20/07/2024",
        nombres: "Laura Méndez y Pedro Alfonzo",
        estado: "En Proceso",
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Rechazado: "destructive",
};

export default function ActasMatrimonioPage() {
    const { toast } = useToast();
    const [filter, setFilter] = useState("todos");

    const handleDownload = (id: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `El acta de matrimonio ${id} se está descargando.`
        });
    }

    const handleCreate = () => {
        toast({
            title: "Solicitud Recibida",
            description: "Tu solicitud de acta de matrimonio ha sido creada y está en proceso."
        });
    }

    const filteredSolicitudes = solicitudes.filter(s => {
        if (filter === "todos") return true;
        return s.estado.toLowerCase().replace(" ", "-") === filter;
    });

  return (
    <div className="space-y-8">
        <header className="mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <FileText className="h-8 w-8"/>
                    Actas de Matrimonio
                </h1>
                <p className="text-muted-foreground">
                    Solicita y gestiona tus actas de matrimonio.
                </p>
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Solicitar Acta
                    </Button>
                </DialogTrigger>
                <DialogContent>
                     <DialogHeader>
                        <DialogTitle>Solicitar Nueva Acta de Matrimonio</DialogTitle>
                        <DialogDescription>
                            Completa los datos para iniciar el trámite.
                        </DialogDescription>
                    </DialogHeader>
                     <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="conyuge1">Nombre Completo Cónyuge 1</Label>
                            <Input id="conyuge1" placeholder="Ej: Ana Sofía Pérez" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="conyuge2">Nombre Completo Cónyuge 2</Label>
                            <Input id="conyuge2" placeholder="Ej: Carlos Gómez" />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="fecha-matrimonio">Fecha del Matrimonio</Label>
                            <Input id="fecha-matrimonio" type="date" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleCreate}>Enviar Solicitud</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Mis Solicitudes</CardTitle>
          <CardDescription>Seguimiento de las solicitudes de actas de matrimonio.</CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="todos" onValueChange={setFilter} className="w-full">
                <TabsList className="grid w-full grid-cols-4 max-w-lg mb-4">
                    <TabsTrigger value="todos">Todas</TabsTrigger>
                    <TabsTrigger value="aprobado">Aprobadas</TabsTrigger>
                    <TabsTrigger value="en-proceso">En Proceso</TabsTrigger>
                    <TabsTrigger value="rechazado">Rechazadas</TabsTrigger>
                </TabsList>
                <TabsContent value={filter}>
                    <RequestsTable solicitudes={filteredSolicitudes} onDownload={handleDownload} />
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
                                        {solicitud.estado === 'Rechazado' && solicitud.motivoRechazo && (
                                            <Alert variant="destructive">
                                                <AlertTriangle className="h-4 w-4" />
                                                <AlertTitle>Solicitud Rechazada</AlertTitle>
                                                <AlertDescription>
                                                    {solicitud.motivoRechazo}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                        <p><strong>Nombres:</strong> {solicitud.nombres}</p>
                                        <p><strong>Fecha:</strong> {solicitud.fecha}</p>
                                        <p><strong>Estado:</strong> {solicitud.estado}</p>
                                        <div className="flex justify-center pt-4">
                                            <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=acta-${solicitud.id}`} alt={`QR for ${solicitud.id}`} width={100} height={100} />
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
