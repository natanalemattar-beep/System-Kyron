
"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Heart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocumentRequestTable, type Solicitud } from "@/components/document-request-table";

const initialSolicitudes: Solicitud[] = [
    {
        id: "PN-2024-001",
        fecha: "10/07/2024",
        nombres: "Juan Carlos Rodríguez",
        estado: "Aprobado",
        tipo: "Partida de Nacimiento",
        detalles: { acta: "1234", folio: "56", tomo: "A-1", registro: "Parroquia Sucre, Municipio Libertador, D.C.", ano: 1990 }
    },
    {
        id: "PN-2024-002",
        fecha: "22/07/2024",
        nombres: "María Gabriela López",
        estado: "En Proceso",
        tipo: "Partida de Nacimiento",
        detalles: { acta: "5678", folio: "120", tomo: "B-3", registro: "Parroquia El Recreo, Municipio Libertador, D.C.", ano: 1995 }
    },
    {
        id: "PN-2024-003",
        fecha: "15/07/2024",
        nombres: "Pedro Luis Alcantara",
        estado: "En Proceso",
        tipo: "Partida de Nacimiento",
        detalles: { acta: "9101", folio: "88", tomo: "C-2", registro: "Parroquia Altagracia, Municipio Libertador, D.C.", ano: 2001 }
    },
    {
        id: "PN-2024-004",
        fecha: "05/06/2024",
        nombres: "Sofía Valentina Herrera",
        estado: "Rechazado",
        motivoRechazo: "La fecha de nacimiento no coincide con los registros. Por favor, verifique los datos y vuelva a intentarlo.",
        tipo: "Partida de Nacimiento",
        detalles: { acta: "1121", folio: "33", tomo: "D-1", registro: "Parroquia San Juan, Municipio Libertador, D.C.", ano: 1988 }
    },
];


const getPartidaNacimientoContent = (solicitud: Solicitud) => `
    <div style="font-family: 'Times New Roman', Times, serif; font-size: 12px; line-height: 1.6; padding: 2cm; width: 21cm; height: 29.7cm; margin: auto; border: 1px solid #ddd; background: white; color: black; box-sizing: border-box;">
        <div style="text-align: center; margin-bottom: 2cm;">
            <p style="margin:0; font-weight: bold;">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
            <p style="margin:0; font-weight: bold;">REGISTRO CIVIL</p>
        </div>
        <h1 style="text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 2cm;">PARTIDA DE NACIMIENTO</h1>
        <p><strong>NÚMERO DE ACTA:</strong> ${solicitud.detalles.acta}</p>
        <p>En el día de hoy, ${new Date(solicitud.detalles.ano, 0, 1).toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' })}, se ha presentado ante este Despacho a un niño(a) a quien se le dio el nombre de:</p>
        <br/>
        <p style="text-align: center; font-size: 14px; font-weight: bold;">${solicitud.nombres.toUpperCase()}</p>
        <br/>
        <p>Hijo(a) de [Nombre del Padre] y [Nombre de la Madre].</p>
        <br/>
        <p><strong>Lugar del Registro:</strong> ${solicitud.detalles.registro}</p>
        <p><strong>Libro/Tomo:</strong> ${solicitud.detalles.tomo} | <strong>Folio:</strong> ${solicitud.detalles.folio} | <strong>Año:</strong> ${solicitud.detalles.ano}</p>
        <br/><br/><br/>
        <div style="display: flex; justify-content: space-around; text-align: center; padding-top: 3cm;">
            <div><p style="border-top: 1px solid black; padding-top: 5px;">Firma Registrador(a)</p></div>
            <div><p style="border-top: 1px solid black; padding-top: 5px;">Sello del Registro</p></div>
        </div>
    </div>
`;


export default function PartidasNacimientoPage() {
    const [solicitudes, setSolicitudes] = useState(initialSolicitudes);
    const [filter, setFilter] = useState("todos");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast();

    const nombresRef = useRef<HTMLInputElement>(null);
    const fechaNacimientoRef = useRef<HTMLInputElement>(null);
    const numeroActaRef = useRef<HTMLInputElement>(null);

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        const nombres = nombresRef.current?.value;
        const fechaNacimiento = fechaNacimientoRef.current?.value;
        const numeroActa = numeroActaRef.current?.value;

        if (!nombres || !fechaNacimiento || !numeroActa) {
            toast({ variant: 'destructive', title: 'Error', description: 'Por favor, complete todos los campos.' });
            return;
        }

        const newId = `PN-${new Date().getFullYear()}-${String(solicitudes.length + 1).padStart(3, '0')}`;
        
        const newSolicitud: Solicitud = {
            id: newId,
            fecha: new Date().toLocaleDateString('es-VE'),
            nombres: nombres,
            estado: "En Proceso",
            tipo: "Partida de Nacimiento",
            detalles: {
                acta: numeroActa,
                folio: String(Math.floor(Math.random() * 200)),
                tomo: `${Math.floor(Math.random() * 5)}-${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
                registro: "Registro Civil por Determinar",
                ano: new Date(fechaNacimiento).getFullYear(),
            }
        };

        setSolicitudes(prev => [newSolicitud, ...prev]);
        setIsDialogOpen(false);
        
        toast({
            title: "Solicitud Recibida",
            description: "Tu solicitud de partida de nacimiento ha sido creada y está en proceso."
        });

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
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                                <Input ref={nombresRef} id="nombres" name="nombres" placeholder="Ej: Juan Carlos Rodríguez" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fecha-nacimiento">Fecha de Nacimiento</Label>
                                    <Input ref={fechaNacimientoRef} id="fecha-nacimiento" name="fecha-nacimiento" type="date" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numero-acta">Número de Acta</Label>
                                    <Input ref={numeroActaRef} id="numero-acta" name="numero-acta" placeholder="Ej: 1234" required/>
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
                    <DocumentRequestTable 
                        solicitudes={filteredSolicitudes} 
                        getDocumentContent={getPartidaNacimientoContent}
                        docTypeForDownload="Partida_Nacimiento"
                    />
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

    