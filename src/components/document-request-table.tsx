
"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Eye, FileDown, TriangleAlert as AlertTriangle, Plus, Send } from "lucide-react";
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
    docTypeLabel?: string;
};

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Aprobado: "default",
  "En Proceso": "secondary",
  Rechazado: "destructive",
  Archivado: "outline",
  Activo: "secondary",
};

const ESTADOS_VE = [
    'Amazonas','Anzoátegui','Apure','Aragua','Barinas','Bolívar','Carabobo',
    'Cojedes','Delta Amacuro','Distrito Capital','Falcón','Guárico','Lara',
    'Mérida','Miranda','Monagas','Nueva Esparta','Portuguesa','Sucre',
    'Táchira','Trujillo','La Guaira','Yaracuy','Zulia',
];

export function DocumentRequestTable({ solicitudes: initialSolicitudes, getDocumentContent, docTypeForDownload, docTypeLabel }: DocumentRequestTableProps) {
    const { toast } = useToast();
    const [solicitudes, setSolicitudes] = useState(initialSolicitudes);
    const [showNewForm, setShowNewForm] = useState(false);
    const [formData, setFormData] = useState({
        nombres: '',
        cedula: '',
        estado: '',
        municipio: '',
        registro: '',
        motivo: '',
    });

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
                description: "Se ha abierto el diálogo de impresión. Selecciona 'Guardar como PDF' para descargar."
            });
        } else {
             toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo abrir la ventana de impresión. Revisa la configuración de tu navegador."
            });
        }
    };

    const handleNewRequest = () => {
        if (!formData.nombres || !formData.cedula || !formData.estado) {
            toast({ variant: "destructive", title: "Campos requeridos", description: "Completa nombre, cédula y estado." });
            return;
        }
        const newId = `${docTypeForDownload.substring(0, 2).toUpperCase()}-${new Date().getFullYear()}-${String(solicitudes.length + 1).padStart(3, '0')}`;
        const newSolicitud: Solicitud = {
            id: newId,
            fecha: new Date().toLocaleDateString('es-VE'),
            nombres: formData.nombres,
            estado: "En Proceso",
            tipo: docTypeForDownload.toLowerCase().replace(/_/g, '-'),
            detalles: {
                acta: "Pendiente",
                folio: "Pendiente",
                tomo: "Pendiente",
                registro: formData.registro || `Registro Civil ${formData.municipio}, ${formData.estado}`,
                ano: new Date().getFullYear(),
            }
        };
        setSolicitudes(prev => [newSolicitud, ...prev]);
        setShowNewForm(false);
        setFormData({ nombres: '', cedula: '', estado: '', municipio: '', registro: '', motivo: '' });
        toast({ title: "Solicitud Enviada", description: `Tu solicitud ${newId} ha sido registrada. Recibirás notificación cuando sea procesada.` });
    };

    const label = docTypeLabel || docTypeForDownload.replace(/_/g, ' ');

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between px-4 pt-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{solicitudes.length} solicitud(es) registrada(s)</p>
                <Button size="sm" className="h-8 rounded-lg text-[10px] font-black uppercase tracking-widest gap-1.5" onClick={() => setShowNewForm(!showNewForm)}>
                    <Plus className="h-3 w-3" /> Nueva Solicitud
                </Button>
            </div>

            {showNewForm && (
                <div className="mx-4 p-5 rounded-xl border border-primary/20 bg-primary/5 space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Nueva Solicitud de {label}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Nombre(s) completo(s) *</Label>
                            <Input placeholder="Ej: Juan Alberto Pérez" value={formData.nombres} onChange={e => setFormData(p => ({ ...p, nombres: e.target.value }))} className="h-9 text-xs" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Cédula de Identidad *</Label>
                            <Input placeholder="V-12345678" value={formData.cedula} onChange={e => setFormData(p => ({ ...p, cedula: e.target.value }))} className="h-9 text-xs" />
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Estado *</Label>
                            <Select value={formData.estado} onValueChange={v => setFormData(p => ({ ...p, estado: v }))}>
                                <SelectTrigger className="h-9 text-xs"><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
                                <SelectContent>
                                    {ESTADOS_VE.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Municipio</Label>
                            <Input placeholder="Ej: Libertador" value={formData.municipio} onChange={e => setFormData(p => ({ ...p, municipio: e.target.value }))} className="h-9 text-xs" />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Registro Civil / Oficina</Label>
                            <Input placeholder="Ej: Registro Civil Parroquia El Valle" value={formData.registro} onChange={e => setFormData(p => ({ ...p, registro: e.target.value }))} className="h-9 text-xs" />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                            <Label className="text-[9px] font-black uppercase tracking-widest">Motivo de la solicitud</Label>
                            <Input placeholder="Ej: Copia certificada para trámite legal" value={formData.motivo} onChange={e => setFormData(p => ({ ...p, motivo: e.target.value }))} className="h-9 text-xs" />
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end pt-2">
                        <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest" onClick={() => setShowNewForm(false)}>Cancelar</Button>
                        <Button size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest gap-1.5" onClick={handleNewRequest}><Send className="h-3 w-3" /> Enviar Solicitud</Button>
                    </div>
                </div>
            )}

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
                                                {solicitud.detalles.acta !== 'N/A' && solicitud.detalles.acta !== 'Pendiente' && <div className="space-y-1"><p className="text-muted-foreground">Nº de Acta</p><p>{solicitud.detalles.acta}</p></div>}
                                                {solicitud.detalles.folio !== 'N/A' && solicitud.detalles.folio !== 'Pendiente' && <div className="space-y-1"><p className="text-muted-foreground">Folio</p><p>{solicitud.detalles.folio}</p></div>}
                                                {solicitud.detalles.tomo !== 'N/A' && solicitud.detalles.tomo !== 'Pendiente' && <div className="space-y-1"><p className="text-muted-foreground">Tomo</p><p>{solicitud.detalles.tomo}</p></div>}
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
                            <TableCell colSpan={5} className="text-center text-muted-foreground py-8">No hay solicitudes registradas. Haz clic en "Nueva Solicitud" para crear una.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
