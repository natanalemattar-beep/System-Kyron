
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { Eye, FileDown, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export type Solicitud = {
    id: string;
    fecha: string;
    nombres: string;
    estado: "Aprobado" | "En Proceso" | "Rechazado" | "Archivado" | "Activo";
    motivoRechazo?: string;
    tipo: string;
    detalles: {
      acta: string;
      folio: string;
      tomo: string;
      registro: string;
      ano: number;
      tribunal?: string;
      sala?: string;
      juez?: string;
    }
};

type DocumentRequestTableProps = {
    solicitudes: Solicitud[];
    getDocumentContent: (solicitud: Solicitud) => string;
    docTypeForDownload: string;
};

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Rechazado: "destructive",
  Archivado: "outline",
  Activo: "secondary",
};

export function DocumentRequestTable({ solicitudes, getDocumentContent, docTypeForDownload }: DocumentRequestTableProps) {
    const { toast } = useToast();

    const handleDownload = (solicitud: Solicitud) => {
        const content = getDocumentContent(solicitud);
        const header = "<!DOCTYPE html><html><head><meta charset='utf-8'><title>Documento</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;

        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(sourceHTML);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => { 
                printWindow.print();
                printWindow.close();
            }, 500);
            toast({
                title: "Preparando Descarga",
                description: "Se ha abierto el diálogo de impresión. Por favor, selecciona 'Guardar como PDF' para descargar el documento."
            });
        } else {
             toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo abrir la ventana de impresión. Revisa la configuración de tu navegador."
            });
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nro. Solicitud</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Nombres / Caso</TableHead>
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
                                        <DialogTitle>Detalle de Solicitud: {solicitud.id}</DialogTitle>
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
                                            {solicitud.detalles.acta !== 'N/A' && <div className="space-y-1"><p className="text-muted-foreground">Nº de Acta</p><p>{solicitud.detalles.acta}</p></div>}
                                            {solicitud.detalles.folio !== 'N/A' && <div className="space-y-1"><p className="text-muted-foreground">Folio</p><p>{solicitud.detalles.folio}</p></div>}
                                            {solicitud.detalles.tomo !== 'N/A' && <div className="space-y-1"><p className="text-muted-foreground">Tomo</p><p>{solicitud.detalles.tomo}</p></div>}
                                            {solicitud.detalles.ano && <div className="space-y-1"><p className="text-muted-foreground">Año</p><p>{solicitud.detalles.ano}</p></div>}
                                            {solicitud.detalles.registro !== 'N/A' && <div className="col-span-2 space-y-1"><p className="text-muted-foreground">Registro Civil</p><p>{solicitud.detalles.registro}</p></div>}
                                            {solicitud.detalles.tribunal && <div className="col-span-2 space-y-1"><p className="text-muted-foreground">Tribunal</p><p>{solicitud.detalles.tribunal}</p></div>}
                                            {solicitud.detalles.juez && <div className="col-span-2 space-y-1"><p className="text-muted-foreground">Juez</p><p>{solicitud.detalles.juez}</p></div>}
                                        </div>
                                        <div className="flex justify-center pt-4">
                                            <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=doc-${solicitud.tipo}-${solicitud.id}`} alt={`QR for ${solicitud.id}`} width={100} height={100} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button>Cerrar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            {(solicitud.estado === "Aprobado" || solicitud.estado === "Archivado") && (
                                <Button variant="ghost" size="icon" onClick={() => handleDownload(solicitud)}>
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
