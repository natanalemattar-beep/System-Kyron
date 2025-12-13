
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown, Eye, QrCode, Heart, AlertTriangle } from "lucide-react";
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
  detalles: {
    acta: string;
    folio: string;
    tomo: string;
    registro: string;
    ano: number;
  }
};

const initialSolicitudes: Solicitud[] = [
    {
        id: "PN-2024-001",
        fecha: "10/07/2024",
        nombres: "Juan Carlos Rodríguez",
        estado: "Aprobado",
        detalles: { acta: "1234", folio: "56", tomo: "A-1", registro: "Parroquia Sucre, Municipio Libertador, D.C.", ano: 1990 }
    },
    {
        id: "PN-2024-002",
        fecha: "22/07/2024",
        nombres: "María Gabriela López",
        estado: "En Proceso",
        detalles: { acta: "5678", folio: "120", tomo: "B-3", registro: "Parroquia El Recreo, Municipio Libertador, D.C.", ano: 1995 }
    },
    {
        id: "PN-2024-003",
        fecha: "15/07/2024",
        nombres: "Pedro Luis Alcantara",
        estado: "En Proceso",
        detalles: { acta: "9101", folio: "88", tomo: "C-2", registro: "Parroquia Altagracia, Municipio Libertador, D.C.", ano: 2001 }
    },
    {
        id: "PN-2024-004",
        fecha: "05/06/2024",
        nombres: "Sofía Valentina Herrera",
        estado: "Rechazado",
        motivoRechazo: "La fecha de nacimiento no coincide con los registros. Por favor, verifique los datos y vuelva a intentarlo.",
        detalles: { acta: "1121", folio: "33", tomo: "D-1", registro: "Parroquia San Juan, Municipio Libertador, D.C.", ano: 1988 }
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Rechazado: "destructive",
};

export default function PartidasNacimientoPage() {
    const [solicitudes, setSolicitudes] = useState(initialSolicitudes);
    const [filter, setFilter] = useState("todos");
    const { toast } = useToast();

    const handleDownload = (id: string) => {
        toast({
            title: "Descarga Iniciada",
            description: `El documento ${id} se está descargando.`
        });
    }

    const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const nombres = formData.get('nombres') as string;
        const fechaNacimiento = formData.get('fecha-nacimiento') as string;
        const numeroActa = formData.get('numero-acta') as string;

        const newId = `PN-${new Date().getFullYear()}-${String(solicitudes.length + 1).padStart(3, '0')}`;
        
        const newSolicitud: Solicitud = {
            id: newId,
            fecha: new Date().toLocaleDateString('es-VE'),
            nombres: nombres,
            estado: "En Proceso",
            detalles: {
                acta: numeroActa,
                folio: String(Math.floor(Math.random() * 200)),
                tomo: `${Math.floor(Math.random() * 5)}-${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
                registro: "Registro Civil por Determinar",
                ano: new Date(fechaNacimiento).getFullYear(),
            }
        };

        setSolicitudes(prev => [newSolicitud, ...prev]);

        toast({
            title: "Solicitud Recibida",
            description: "Tu solicitud de partida de nacimiento ha sido creada y está en proceso."
        });

        // This would ideally close the dialog, but requires more complex state management (e.g., passing setOpen)
    }

    const filteredSolicitudes = solicitudes.filter(s => {
        if (filter === "todos") return true;
        return s.estado.toLowerCase().replace(" ", "-") === filter;
    });

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
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Solicitar Partida
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <form onSubmit={handleCreate}>
                        <DialogHeader>
                            <DialogTitle>Solicitar Nueva Partida de Nacimiento</DialogTitle>
                            <DialogDescription>
                                Completa los datos para iniciar el trámite.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombres">Nombres y Apellidos Completos</Label>
                                <Input id="nombres" name="nombres" placeholder="Ej: Juan Carlos Rodríguez" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fecha-nacimiento">Fecha de Nacimiento</Label>
                                    <Input id="fecha-nacimiento" name="fecha-nacimiento" type="date" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numero-acta">Número de Acta</Label>
                                    <Input id="numero-acta" name="numero-acta" placeholder="Ej: 1234" required/>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Enviar Solicitud</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
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
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Detalle de la Solicitud: {solicitud.id}</DialogTitle>
                                        <DialogDescription>
                                            <span className="font-semibold">{solicitud.nombres}</span>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="py-4 space-y-4">
                                        {solicitud.estado === 'Rechazado' && solicitud.motivoRechazo && (
                                            <Alert variant="destructive">
                                                <AlertTriangle className="h-4 w-4" />
                                                <AlertTitle>Solicitud Rechazada</AlertTitle>
                                                <AlertDescription>
                                                    {solicitud.motivoRechazo}
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div className="space-y-1"><p className="text-muted-foreground">Estado</p><p><Badge variant={statusVariant[solicitud.estado]}>{solicitud.estado}</Badge></p></div>
                                            <div className="space-y-1"><p className="text-muted-foreground">Fecha Solicitud</p><p>{solicitud.fecha}</p></div>
                                            <div className="space-y-1"><p className="text-muted-foreground">Nº de Acta</p><p>{solicitud.detalles.acta}</p></div>
                                            <div className="space-y-1"><p className="text-muted-foreground">Folio</p><p>{solicitud.detalles.folio}</p></div>
                                            <div className="space-y-1"><p className="text-muted-foreground">Tomo</p><p>{solicitud.detalles.tomo}</p></div>
                                            <div className="space-y-1"><p className="text-muted-foreground">Año</p><p>{solicitud.detalles.ano}</p></div>
                                            <div className="col-span-2 space-y-1"><p className="text-muted-foreground">Registro Civil</p><p>{solicitud.detalles.registro}</p></div>
                                        </div>
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
