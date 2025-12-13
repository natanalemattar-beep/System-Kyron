
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
import { Input } from "@/components/ui/input";
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
        <div style="font-family: 'Times New Roman', Times, serif; line-height: 1.6; padding: 2cm; width: 21cm; height: 29.7cm; margin: auto; border: 1px solid #ddd; background: white; color: black; box-sizing: border-box; position: relative;">
            <div style="text-align: center; border-bottom: 1px solid #000; padding-bottom: 10px; margin-bottom: 30px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Escudo_de_la_República_Bolivariana_de_Venezuela.svg/100px-Escudo_de_la_República_Bolivariana_de_Venezuela.svg.png" alt="Escudo de Venezuela" style="height: 60px; margin-bottom: 10px;">
                <p style="margin: 0; font-size: 12px; font-weight: bold;">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
                <p style="margin: 2px 0; font-size: 12px; font-weight: bold;">MINISTERIO DEL PODER POPULAR PARA RELACIONES INTERIORES, JUSTICIA Y PAZ</p>
                <p style="margin: 2px 0; font-size: 10px;">Despacho del Viceministro del Sistema Integrado de Investigación Penal</p>
                <p style="margin: 2px 0; font-size: 10px;">Providencia Administrativa Nro. 001-2022 de fecha 01/01/2022</p>
            </div>
            <h1 style="text-align: center; font-size: 18px; font-weight: bold; margin: 40px 0;">CERTIFICADO INTERNACIONAL DE ANTECEDENTES PENALES</h1>
            <div style="text-align: justify; font-size: 12pt;">
                <p>El Director General de Registros y Archivos Penales, en uso de las atribuciones conferidas en el Artículo 28 de la Ley Orgánica de Identificación, publicada en la Gaceta Oficial de la República Bolivariana de Venezuela N° 38.459 de fecha 15 de junio de 2006, certifica que el ciudadano(a):</p>
                <br/>
                <p style="text-align: center; font-size: 16px; font-weight: bold;">${solicitud.solicitante.nombre.toUpperCase()}</p>
                <p style="text-align: center; font-size: 14px;">Titular de la Cédula de Identidad N° ${solicitud.solicitante.cedula}</p>
                <br/>
                <p>Una vez consultada la base de datos del Sistema de Información Policial (SIPOL) y el Sistema de Investigación e Información Policial (SIIPOL), se deja constancia de que, hasta la fecha de emisión de este certificado, <strong>NO POSEE REGISTROS DE ANTECEDENTES PENALES</strong>.</p>
                <br/>
                <p>Esta certificación se expide a solicitud de la parte interesada, para ser presentada ante el <strong>${solicitud.organismo}</strong>.</p>
                <br/>
                <p style="text-align: center; font-weight: bold;">Válido por noventa (90) días a partir de la fecha de su emisión.</p>
            </div>
            <div style="position: absolute; bottom: 80px; width: calc(100% - 4cm);">
                <div style="display: flex; justify-content: space-between; align-items: flex-end;">
                     <div style="text-align: center;">
                        <p style="font-size: 11px;">Fecha de Emisión: ${formatDate(solicitud.fecha)}</p>
                        <p style="font-size: 11px;">Código de Validación: ${solicitud.id}-VALID</p>
                    </div>
                     <div style="text-align: center;">
                        <img src="https://www.justiciaypaz.gob.ve/images/viceministerios/vsiip/firma_director.png" alt="Firma Autorizada" style="height: 60px; margin-bottom: -10px;">
                        <p style="border-top: 1px solid #000; padding-top: 5px; font-size: 11px; font-weight: bold;">Director(a) General de Registros y Archivos Penales</p>
                    </div>
                    <div style="text-align: center;">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=Certificado-Antecedentes-${solicitud.id}" alt="QR de Verificación"/>
                        <p style="font-size: 9px; margin-top: 5px;">Verificar Documento</p>
                    </div>
                </div>
                 <div style="text-align: center; margin-top: 20px; border-top: 1px solid #000; padding-top: 5px;">
                     <img src="https://www.justiciaypaz.gob.ve/images/logo-footer.png" alt="Sello del Ministerio" style="height: 40px;">
                </div>
            </div>
        </div>
    `;
    };
    
    const handleAction = (solicitud: Solicitud, action: 'print' | 'download') => {
        const content = getCertificateContent(solicitud);
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Certificado de Antecedentes Penales</title></head><body style="margin:0;">');
            printWindow.document.write(content);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            
            setTimeout(() => { 
                printWindow.print();
                if (action === 'download') {
                     toast({
                        title: "Preparando Descarga",
                        description: `Selecciona 'Guardar como PDF' para descargar el certificado de ${solicitud.solicitante.nombre}.`,
                    });
                } else {
                     toast({
                        title: "Preparando Impresión",
                        description: `El certificado de ${solicitud.solicitante.nombre} se está enviando a la impresora.`,
                    });
                }
                // No se puede cerrar automáticamente si se quiere que el usuario guarde como PDF
                // printWindow.close();
            }, 500);
        }
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
                <div className="animate-in fade-in">
                     <div id="printable-content" className="hidden print:block" dangerouslySetInnerHTML={{ __html: getCertificateContent(selectedSolicitud) }} />
                    <div className="flex justify-end gap-2 mb-4">
                        <Button variant="outline" onClick={handleNewRequest}>
                            <PlusCircle className="mr-2"/> Realizar Nueva Solicitud
                        </Button>
                        <Button variant="outline" onClick={() => handleAction(selectedSolicitud, 'print')}>
                            <Printer className="mr-2"/> Imprimir
                        </Button>
                        <Button onClick={() => handleAction(selectedSolicitud, 'download')}>
                            <Download className="mr-2"/> Descargar PDF
                        </Button>
                    </div>
                     <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-2xl">
                        <div className="scale-[0.8] origin-top">
                           <div dangerouslySetInnerHTML={{ __html: getCertificateContent(selectedSolicitud) }} />
                        </div>
                    </Card>
                </div>
            ) : (
                <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Nueva Solicitud de Certificado</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleCreate}>
                        <CardContent>
                            {status === 'idle' && (
                                <div className="space-y-4 animate-in fade-in">
                                    <div className="p-4 bg-yellow-400/10 border-l-4 border-yellow-500 text-yellow-300">
                                      <AlertTitle>Importante</AlertTitle>
                                      <AlertDescription>
                                        Asegúrate de que tus datos (nombres, apellidos, cédula) estén correctamente registrados en tu perfil antes de continuar.
                                      </AlertDescription>
                                    </div>
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
                                             <Button variant="ghost" size="icon" onClick={() => handleAction(solicitud, 'download')}>
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

