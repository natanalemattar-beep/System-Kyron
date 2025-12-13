
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
import { formatDate } from "@/lib/utils";

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
        id: "SOL-2024-001",
        fecha: "15/07/2024",
        nombres: "Ana Sofía Pérez y Carlos Gómez",
        estado: "Aprobado",
        detalles: { acta: "1024", folio: "215", tomo: "3-A", registro: "Parroquia San Juan, Municipio Libertador, D.C.", ano: 2018 }
    },
    {
        id: "SOL-2024-002",
        fecha: "18/07/2024",
        nombres: "Luis Alberto Gómez y Ana García",
        estado: "En Proceso",
        detalles: { acta: "550", folio: "112", tomo: "1-B", registro: "Parroquia Candelaria, Municipio Libertador, D.C.", ano: 2020 }
    },
    {
        id: "SOL-2024-003",
        fecha: "12/07/2024",
        nombres: "Marta Sánchez y Jorge Diaz",
        estado: "Rechazado",
        motivoRechazo: "Número de acta inconsistente. Verifique el número y la fecha del matrimonio.",
        detalles: { acta: "987", folio: "45", tomo: "2-C", registro: "Parroquia El Recreo, Municipio Libertador, D.C.", ano: 2015 }
    },
     {
        id: "SOL-2024-004",
        fecha: "20/07/2024",
        nombres: "Laura Méndez y Pedro Alfonzo",
        estado: "En Proceso",
        detalles: { acta: "123", folio: "88", tomo: "4-A", registro: "Parroquia Sucre, Municipio Libertador, D.C.", ano: 2022 }
    },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Rechazado: "destructive",
};

export default function ActasMatrimonioPage() {
    const { toast } = useToast();
    const [solicitudes, setSolicitudes] = useState(initialSolicitudes);
    const [filter, setFilter] = useState("todos");

    const getDocumentContent = (solicitud: Solicitud) => `
        <div style="font-family: 'Times New Roman', Times, serif; font-size: 12px; line-height: 1.6; padding: 2cm; width: 21cm; height: 29.7cm; margin: auto; border: 1px solid #ddd; background: white; color: black; box-sizing: border-box;">
            <div style="text-align: center; margin-bottom: 2cm;">
                <p style="margin:0; font-weight: bold;">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
                <p style="margin:0; font-weight: bold;">REGISTRO CIVIL</p>
            </div>
            <h1 style="text-align: center; font-size: 16px; font-weight: bold; margin-bottom: 2cm;">ACTA DE MATRIMONIO</h1>
            <p><strong>NÚMERO DE ACTA:</strong> ${solicitud.detalles.acta}</p>
            <p>En el día de hoy, ${new Date(solicitud.detalles.ano, 0, 1).toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' })}, comparecieron ante mí, [NOMBRE DEL REGISTRADOR CIVIL], en mi carácter de Registrador(a) Civil de la Parroquia ${solicitud.detalles.registro}, los ciudadanos:</p>
            <br/>
            <p><strong>Contrayente 1:</strong> ${solicitud.nombres.split(' y ')[0]}</p>
            <p><strong>Contrayente 2:</strong> ${solicitud.nombres.split(' y ')[1]}</p>
            <br/>
            <p>Quienes manifestaron libre y voluntariamente su deseo de contraer matrimonio civil, en virtud de lo cual, y cumplidos los requisitos de ley, los declaro unidos en legítimo matrimonio en nombre de la República y por autoridad de la Ley.</p>
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

    const handleDownload = (solicitud: Solicitud) => {
        const content = getDocumentContent(solicitud);
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Acta de Matrimonio</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `Acta_Matrimonio_${solicitud.id}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Descarga Iniciada",
            description: `El documento ${solicitud.id} se está descargando.`
        });
    }

    const handleCreate = (formData: FormData) => {
        const conyuge1 = formData.get('conyuge1') as string;
        const conyuge2 = formData.get('conyuge2') as string;
        const fechaMatrimonio = formData.get('fecha-matrimonio') as string;
        const numeroActa = formData.get('numero-acta') as string;

        const newId = `SOL-${new Date().getFullYear()}-${String(solicitudes.length + 1).padStart(3, '0')}`;
        
        const newSolicitud: Solicitud = {
            id: newId,
            fecha: new Date().toLocaleDateString('es-VE'),
            nombres: `${conyuge1} y ${conyuge2}`,
            estado: "En Proceso",
            detalles: {
                acta: numeroActa,
                folio: String(Math.floor(Math.random() * 200)),
                tomo: `${Math.floor(Math.random() * 5)}-${['A', 'B', 'C'][Math.floor(Math.random() * 3)]}`,
                registro: "Registro Civil por Determinar",
                ano: new Date(fechaMatrimonio).getFullYear(),
            }
        };

        setSolicitudes(prev => [newSolicitud, ...prev]);

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
                    <form action={handleCreate}>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="conyuge1">Nombre Completo Cónyuge 1</Label>
                                <Input id="conyuge1" name="conyuge1" placeholder="Ej: Ana Sofía Pérez" required />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="conyuge2">Nombre Completo Cónyuge 2</Label>
                                <Input id="conyuge2" name="conyuge2" placeholder="Ej: Carlos Gómez" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                     <Label htmlFor="fecha-matrimonio">Fecha del Matrimonio</Label>
                                    <Input id="fecha-matrimonio" name="fecha-matrimonio" type="date" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numero-acta">Número de Acta</Label>
                                    <Input id="numero-acta" name="numero-acta" placeholder="Ej: 1024" required />
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


function RequestsTable({ solicitudes, onDownload }: { solicitudes: Solicitud[], onDownload: (solicitud: Solicitud) => void }) {
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
                                            <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=acta-${solicitud.id}`} alt={`QR for ${solicitud.id}`} width={100} height={100} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button>Cerrar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            {solicitud.estado === "Aprobado" && (
                                <Button variant="ghost" size="icon" onClick={() => onDownload(solicitud)}>
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
