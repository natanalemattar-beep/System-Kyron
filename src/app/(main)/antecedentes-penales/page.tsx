
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Shield, Download, FileText, PlusCircle, Eye, AlertTriangle, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";


type Solicitud = {
    id: string;
    organismo: string;
    fecha: string;
    estado: "En Proceso" | "Generado" | "Rechazado";
    motivoRechazo?: string;
    solicitante: {
        nombre: string;
        cedula: string;
    }
};

const initialSolicitudes: Solicitud[] = [
    { id: "AP-2024-001", organismo: "Consulado de España en Caracas", fecha: "2024-07-15", estado: "Generado", solicitante: { nombre: "Juan Pérez", cedula: "V-12.345.678" } },
    { id: "AP-2024-002", organismo: "Embajada de Canadá", fecha: "2024-06-20", estado: "Generado", solicitante: { nombre: "Juan Pérez", cedula: "V-12.345.678" } },
    { id: "AP-2024-003", organismo: "Trámite de Visa para EE.UU.", fecha: "2024-07-20", estado: "En Proceso", solicitante: { nombre: "Juan Pérez", cedula: "V-12.345.678" } },
    {
        id: "AP-2024-004",
        fecha: "2024-07-22",
        organismo: "Universidad Central de Venezuela",
        estado: "Rechazado",
        motivoRechazo: "Falta copia de la cédula de identidad a color.",
        solicitante: { nombre: "Juan Pérez", cedula: "V-12.345.678" }
    },
];

export default function AntecedentesPenalesPage() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>(initialSolicitudes);
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [organismo, setOrganismo] = useState("");
    const [motivo, setMotivo] = useState("");
    const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
    const { toast } = useToast();

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
         if (!organismo || !motivo) {
             toast({
                variant: "destructive",
                title: "Faltan Datos",
                description: "Por favor, selecciona el organismo y describe el motivo de la solicitud.",
            });
            return;
        }

        setStatus('processing');
        toast({
            title: "Procesando Solicitud...",
            description: "Estamos validando tu identidad y generando el certificado.",
        });

        setTimeout(() => {
            const newId = `AP-2024-${String(solicitudes.length + 1).padStart(3, '0')}`;
            const newSolicitud: Solicitud = {
                id: newId,
                organismo: organismo,
                fecha: new Date().toISOString().split('T')[0],
                estado: "Generado",
                solicitante: {
                    nombre: "Juan Pérez",
                    cedula: "V-12.345.678"
                }
            };
            setSolicitudes(prev => [newSolicitud, ...prev]);
            setSelectedSolicitud(newSolicitud);
            setStatus('success');
            toast({
                title: "¡Certificado Generado Exitosamente!",
                description: "Tu certificado de antecedentes penales está listo.",
                action: <CheckCircle className="text-green-500" />
            });
        }, 3000);
    };
    
    const handleNewRequest = () => {
        setStatus('idle');
        setOrganismo("");
        setMotivo("");
        setSelectedSolicitud(null);
    };

    const getCertificateContent = (solicitud: Solicitud | null): string => {
        if (!solicitud) return "";
        return `
          <div style="font-family: 'Times New Roman', Times, serif; line-height: 1.8; padding: 2.5cm; width: 21cm; height: 29.7cm; margin: auto; border: 1px solid #ddd; background: white; color: black;">
              <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px;">
                  <p style="margin: 0; font-size: 14px; font-weight: bold;">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
                  <p style="margin: 5px 0; font-size: 16px; font-weight: bold;">MINISTERIO DEL PODER POPULAR PARA RELACIONES INTERIORES, JUSTICIA Y PAZ</p>
                  <h1 style="font-size: 18px; margin: 15px 0 5px 0;">CERTIFICADO INTERNACIONAL DE ANTECEDENTES PENALES</h1>
              </div>
              <div style="margin-top: 50px; text-align: justify; font-size: 12pt;">
                  <p>El Director General de Registros y Archivos Penales, de conformidad con lo establecido en el artículo 28 de la Ley Orgánica de Identificación, certifica que el ciudadano(a):</p>
                  <br/>
                  <p style="text-align: center; font-size: 16px; font-weight: bold;">${solicitud.solicitante.nombre.toUpperCase()}</p>
                  <p style="text-align: center; font-size: 14px;">Titular de la Cédula de Identidad N° ${solicitud.solicitante.cedula}</p>
                  <br/>
                  <p>Una vez consultada la base de datos del Sistema de Información Policial (SIPOL) y el Sistema de Investigación e Información Policial (SIIPOL), se deja constancia de que, hasta la fecha de emisión de este certificado, <strong>NO POSEE REGISTROS DE ANTECEDENTES PENALES</strong>.</p>
                  <br/>
                  <p>Esta certificación se expide a solicitud de la parte interesada, para ser presentada ante el <strong>${solicitud.organismo}</strong>.</p>
                  <br/>
                  <p style="text-align: center;">Válido por noventa (90) días a partir de su emisión.</p>
                  <p style="text-align: center; font-size: 11px;">Fecha de Emisión: ${formatDate(solicitud.fecha)}</p>
                  <p style="text-align: center; font-size: 11px;">Código de Validación: ${solicitud.id}-VALID</p>
              </div>
               <div style="position: absolute; bottom: 50px; right: 50px;">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Certificado-Antecedentes-${solicitud.id}" alt="QR de Verificación"/>
              </div>
          </div>
        `;
    };

    const handleDownload = () => {
        const content = getCertificateContent(selectedSolicitud);
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Certificado de Antecedentes Penales</title></head><body>');
            printWindow.document.write(content);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            
            setTimeout(() => { 
                 printWindow.print();
            }, 500);
        }

        toast({
            title: "Preparando Descarga/Impresión",
            description: `Se ha abierto el diálogo de impresión para el certificado de ${selectedSolicitud?.solicitante.nombre}. Selecciona 'Guardar como PDF' para descargar.`,
        });
    };


    const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
        Generado: "default",
        "En Proceso": "secondary",
        Rechazado: "destructive",
    };

    return (
        <div className="space-y-8">
             <style>
                {`
                    @media print {
                        body * {
                            visibility: hidden;
                        }
                        #printable-content, #printable-content * {
                            visibility: visible;
                        }
                        #printable-content {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            background-color: white;
                        }
                    }
                `}
            </style>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Shield className="h-8 w-8"/>
                    Certificado de Antecedentes Penales
                </h1>
                <p className="text-muted-foreground mt-2">
                    Solicita tu certificado internacional de antecedentes penales de forma segura.
                </p>
            </header>
            
            {status === 'success' && selectedSolicitud ? (
                <div id="printable-content" className="animate-in fade-in">
                    <div className="flex justify-end gap-2 mb-4 print:hidden">
                        <Button variant="outline" onClick={handleNewRequest}>
                            <PlusCircle className="mr-2"/> Realizar Nueva Solicitud
                        </Button>
                        <Button variant="outline" onClick={handleDownload}>
                            <Printer className="mr-2"/> Imprimir
                        </Button>
                        <Button onClick={handleDownload}>
                            <Download className="mr-2"/> Descargar PDF
                        </Button>
                    </div>
                     <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-2xl print:shadow-none print:border-none">
                        <CardHeader className="text-center p-8 border-b">
                            <h2 className="font-bold text-lg">REPÚBLICA BOLIVARIANA DE VENEZUELA</h2>
                            <h3 className="text-md">MINISTERIO DEL PODER POPULAR PARA RELACIONES INTERIORES, JUSTICIA Y PAZ</h3>
                            <CardTitle className="text-xl pt-4">CERTIFICADO INTERNACIONAL DE ANTECEDENTES PENALES</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 prose prose-sm dark:prose-invert max-w-none text-justify space-y-6">
                            <p>
                                El Director General de Registros y Archivos Penales, de conformidad con lo establecido en el artículo 28 de la Ley Orgánica de Identificación, certifica que el ciudadano(a):
                            </p>
                            <div className="text-center space-y-1">
                                <p className="text-lg font-bold tracking-wider">{selectedSolicitud.solicitante.nombre.toUpperCase()}</p>
                                <p>Titular de la Cédula de Identidad N° {selectedSolicitud.solicitante.cedula}</p>
                            </div>
                            <p>
                                Una vez consultada la base de datos del Sistema de Información Policial (SIPOL) y el Sistema de Investigación e Información Policial (SIIPOL), se deja constancia de que, hasta la fecha de emisión de este certificado, <strong>NO POSEE REGISTROS DE ANTECEDENTES PENALES</strong>.
                            </p>
                            <p>
                                Esta certificación se expide a solicitud de la parte interesada, para ser presentada ante el <strong>{selectedSolicitud.organismo}</strong>.
                            </p>
                            <p className="text-center">Válido por noventa (90) días a partir de su emisión.</p>
                        </CardContent>
                         <CardFooter className="p-8 flex justify-between items-end border-t">
                            <div className="text-xs text-muted-foreground">
                                <p>Fecha de Emisión: {formatDate(selectedSolicitud.fecha)}</p>
                                <p>Código de Validación: {selectedSolicitud.id}-VALID</p>
                            </div>
                             <div className="flex flex-col items-center">
                                <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Certificado-Antecedentes-${selectedSolicitud.id}`} alt="QR de Verificación" width={80} height={80} />
                                <p className="text-xs text-muted-foreground mt-1">Escanear para verificar</p>
                            </div>
                            <div className="text-center">
                                <p className="border-t-2 border-foreground inline-block px-8 pt-2">Firma Autorizada</p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            ) : (
                <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Nueva Solicitud de Certificado</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleCreate}>
                        <CardContent className="space-y-6">
                            {status === 'idle' && (
                                <div className="space-y-4 animate-in fade-in">
                                    <div className="space-y-2">
                                        <Label htmlFor="organismo">Organismo que solicita el certificado</Label>
                                        <Select onValueChange={setOrganismo} value={organismo}>
                                            <SelectTrigger id="organismo">
                                                <SelectValue placeholder="Selecciona un organismo..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Consulado de España en Caracas">Consulado de España en Caracas</SelectItem>
                                                <SelectItem value="Embajada de Canadá">Embajada de Canadá</SelectItem>
                                                <SelectItem value="Trámite de Visa para EE.UU.">Trámite de Visa para EE.UU.</SelectItem>
                                                <SelectItem value="Otro">Otro</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="motivo">Motivo de la Solicitud</Label>
                                        <Input id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Ej: Solicitud de visa de estudios, trámite de residencia, etc." />
                                    </div>
                                </div>
                            )}
                            {status === 'processing' && (
                                <div className="flex flex-col items-center justify-center h-48 text-center animate-in fade-in">
                                    <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
                                    <p className="font-semibold">Validando y Procesando...</p>
                                    <p className="text-sm text-muted-foreground">Esto puede tardar unos segundos.</p>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="border-t pt-6">
                            {status === 'idle' ? (
                                <Button type="submit" className="w-full" disabled={!organismo || !motivo}>
                                    <FileText className="mr-2"/>
                                    Iniciar Solicitud
                                </Button>
                            ) : (
                                <Button type="button" variant="outline" className="w-full" onClick={handleNewRequest}>
                                    <PlusCircle className="mr-2"/>
                                    Realizar Nueva Solicitud
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Card>
            )}
            
            <Card className="mt-12 bg-card/50 backdrop-blur-sm print:hidden">
                <CardHeader>
                    <CardTitle>Historial de Solicitudes</CardTitle>
                    <CardDescription>Consulta el estado y descarga tus certificados anteriores.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nro. Solicitud</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Organismo Solicitante</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {solicitudes.map((solicitud) => (
                                <TableRow key={solicitud.id} className="cursor-pointer hover:bg-muted/50" onClick={() => solicitud.estado === 'Generado' && setSelectedSolicitud(solicitud)}>
                                    <TableCell className="font-mono">{solicitud.id}</TableCell>
                                    <TableCell>{formatDate(solicitud.fecha)}</TableCell>
                                    <TableCell>{solicitud.organismo}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[solicitud.estado]}>{solicitud.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Detalle de la Solicitud: {solicitud.id}</DialogTitle>
                                                </DialogHeader>
                                                <div className="py-4 space-y-4">
                                                    {solicitud.estado === 'Rechazado' && solicitud.motivoRechazo && (
                                                        <Alert variant="destructive">
                                                            <AlertTriangle className="h-4 w-4" />
                                                            <AlertTitle>Solicitud Rechazada</AlertTitle>
                                                            <AlertDescription>{solicitud.motivoRechazo}</AlertDescription>
                                                        </Alert>
                                                    )}
                                                    <div className="flex items-center gap-2"><strong>Estado:</strong> <Badge variant={statusVariant[solicitud.estado]}>{solicitud.estado}</Badge></div>
                                                    <p><strong>Solicitante:</strong> {solicitud.solicitante.nombre} ({solicitud.solicitante.cedula})</p>
                                                    <p><strong>Organismo:</strong> {solicitud.organismo}</p>
                                                    <p><strong>Fecha:</strong> {formatDate(solicitud.fecha)}</p>
                                                    <div className="flex justify-center pt-4">
                                                        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=antecedentes-${solicitud.id}`} alt={`QR for ${solicitud.id}`} width={100} height={100} />
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <Button variant="outline">Cerrar</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        {solicitud.estado === 'Generado' && (
                                             <Button variant="ghost" size="icon" onClick={() => setSelectedSolicitud(solicitud)}>
                                                <Download className="h-4 w-4" />
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

    