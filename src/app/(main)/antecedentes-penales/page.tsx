
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, Shield, Download, FileText, PlusCircle, Eye, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


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
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
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
            setStatus('success');
            toast({
                title: "¡Certificado Generado Exitosamente!",
                description: "Tu certificado de antecedentes penales está listo para descargar.",
                action: <CheckCircle className="text-green-500" />
            });
        }, 3000);
    };
    
    const handleNewRequest = () => {
        setStatus('idle');
        setOrganismo("");
        setMotivo("");
    };

    const getCertificateContent = (solicitud: Solicitud): string => {
    return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 2rem; border: 1px solid #ccc; width: 21cm; height: 29.7cm; margin: auto;">
            <div style="text-align: center; border-bottom: 1px solid #333; padding-bottom: 10px;">
                <h2 style="margin: 0;">REPÚBLICA BOLIVARIANA DE VENEZUELA</h2>
                <h3 style="margin: 5px 0;">MINISTERIO DEL PODER POPULAR PARA RELACIONES INTERIORES, JUSTICIA Y PAZ</h3>
                <h1 style="font-size: 20px; margin: 10px 0;">CERTIFICADO INTERNACIONAL DE ANTECEDENTES PENALES</h1>
            </div>
            <div style="margin-top: 40px; text-align: justify;">
                <p>El Director General de Registros y Archivos Penales, de conformidad con lo establecido en el artículo 28 de la Ley Orgánica de Identificación, certifica que el ciudadano(a):</p>
                <br/>
                <p style="text-align: center; font-size: 18px; font-weight: bold;">${solicitud.solicitante.nombre.toUpperCase()}</p>
                <p style="text-align: center; font-size: 16px;">Titular de la Cédula de Identidad N° ${solicitud.solicitante.cedula}</p>
                <br/>
                <p>Una vez consultada la base de datos del Sistema de Información Policial (SIPOL) y el Sistema de Investigación e Información Policial (SIIPOL), se deja constancia de que, hasta la fecha de emisión de este certificado, <strong>NO POSEE REGISTROS DE ANTECEDENTES PENALES</strong>.</p>
                <br/>
                <p>Esta certificación se expide a solicitud de la parte interesada, para ser presentada ante el <strong>${solicitud.organismo}</strong>.</p>
                <br/>
                <p style="text-align: center;">Válido por noventa (90) días a partir de su emisión.</p>
                <p style="text-align: center; font-size: 12px;">Fecha de Emisión: ${formatDate(solicitud.fecha)}</p>
                <p style="text-align: center; font-size: 12px;">Código de Validación: ${solicitud.id}-VALID</p>
            </div>
             <div style="position: absolute; bottom: 50px; right: 50px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=Certificado-Antecedentes-${solicitud.id}" alt="QR de Verificación"/>
            </div>
        </div>
    `;
    };

    const handleDownload = (solicitud: Solicitud) => {
        const content = getCertificateContent(solicitud);
        const filename = `Certificado_Antecedentes_${solicitud.solicitante.nombre.replace(/ /g, '_')}.doc`;
        const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML to Word</title></head><body>";
        const footer = "</body></html>";
        const sourceHTML = header + content + footer;

        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = filename;
        fileDownload.click();
        document.body.removeChild(fileDownload);

        toast({
            title: "Descarga Iniciada",
            description: `El certificado para ${solicitud.solicitante.nombre} se está descargando.`,
        });
    };


    const statusVariant: { [key: string]: "default" | "secondary" | "destructive" } = {
        Generado: "default",
        "En Proceso": "secondary",
        Rechazado: "destructive",
    };

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Shield className="h-8 w-8"/>
                    Certificado de Antecedentes Penales
                </h1>
                <p className="text-muted-foreground mt-2">
                    Solicita tu certificado internacional de antecedentes penales de forma segura.
                </p>
            </header>
            
            <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Nueva Solicitud de Certificado</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
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
                                    <Textarea id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Ej: Solicitud de visa de estudios, trámite de residencia, etc." />
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
                        {status === 'success' && (
                            <div className="flex flex-col items-center justify-center h-48 text-center animate-in fade-in">
                                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                <p className="text-xl font-bold">¡Certificado Generado!</p>
                                <p className="text-sm text-muted-foreground">Tu documento está listo para ser descargado.</p>
                                 <Button className="mt-6" onClick={() => handleDownload(solicitudes[0])}>
                                    <Download className="mr-2"/>
                                    Descargar Certificado
                                </Button>
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
            
            <Card className="mt-12 bg-card/50 backdrop-blur-sm">
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
                                <TableRow key={solicitud.id}>
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
                                                    <p><strong>Solicitante:</strong> {solicitud.solicitante.nombre} ({solicitud.solicitante.cedula})</p>
                                                    <p><strong>Organismo:</strong> {solicitud.organismo}</p>
                                                    <p><strong>Fecha:</strong> {formatDate(solicitud.fecha)}</p>
                                                    <div className="flex items-center gap-2"><strong>Estado:</strong> <Badge variant={statusVariant[solicitud.estado]}>{solicitud.estado}</Badge></div>
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
                                             <Button variant="ghost" size="icon" onClick={() => handleDownload(solicitud)}>
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
