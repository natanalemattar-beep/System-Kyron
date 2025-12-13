
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
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
    { id: "AP-2024-004", fecha: "2024-07-22", organismo: "Universidad Central de Venezuela", estado: "Rechazado", motivoRechazo: "Falta copia de la cédula de identidad a color.", solicitante: { nombre: "Juan Pérez", cedula: "V-12.345.678" } },
];

export default function AntecedentesPenalesPage() {
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>(initialSolicitudes);
    const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');
    const [organismo, setOrganismo] = useState("");
    const [motivo, setMotivo] = useState("");
    const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(solicitudes.find(s => s.id === 'AP-2024-001') || null);
    const { toast } = useToast();

    const getCertificateContent = (solicitud: Solicitud | null) => {
        if (!solicitud) return "";
        
        return `
            <div style="font-family: 'Times New Roman', Times, serif; font-size: 11px; line-height: 1.5; max-width: 800px; margin: auto; padding: 2cm; border: 1px solid #ccc; position: relative; background: white; color: black; box-sizing: border-box;">
                
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); opacity: 0.08; pointer-events: none; width: 400px; height: 400px;">
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="48" fill="none" stroke="#000" stroke-width="1"/>
                        <text x="50" y="15" text-anchor="middle" font-size="6" font-weight="bold">MINISTERIO DEL PODER POPULAR PARA RELACIONES INTERIORES</text>
                        <text x="50" y="88" text-anchor="middle" font-size="6" font-weight="bold">JUSTICIA Y PAZ</text>
                    </svg>
                </div>

                <div style="text-align: center; margin-bottom: 1rem;">
                    <p style="margin: 0; font-weight: bold; font-size: 12px;">REPÚBLICA BOLIVARIANA DE VENEZUELA</p>
                    <div style="margin: 1rem 0;">
                        <img src="/images/escudo.png" alt="Escudo de Venezuela" style="width: 70px; height: auto; margin: auto;"/>
                    </div>
                    <p style="margin: 0; font-size: 10px; line-height: 1.2;">MINISTERIO DEL PODER POPULAR PARA RELACIONES INTERIORES, JUSTICIA Y PAZ<br>DESPACHO DEL VICEMINISTERIO DE POLÍTICA INTERIOR Y SEGURIDAD JURÍDICA<br>DIRECCIÓN GENERAL DE JUSTICIA, INSTITUCIONES RELIGIOSAS Y CULTOS<br>COORDINACIÓN DE ANTECEDENTES PENALES</p>
                </div>
                
                <h1 style="text-align: center; font-size: 13px; font-weight: bold; margin: 2rem 0;">CERTIFICACIÓN DE ANTECEDENTES PENALES</h1>
                
                <p style="text-align: justify; margin-bottom: 1rem;">
                    En nombre del Ciudadano Ministro del Poder Popular para Relaciones Interiores, Justicia y Paz, la Dirección General de Justicia, Instituciones Religiosas y Cultos, en ejercicio de sus funciones y cumpliendo la Ley de Registro de Antecedentes Penales, publicada en la Gaceta Oficial de la República de Venezuela (hoy República Bolivariana de Venezuela) Nro. 31.791, de fecha 03 de agosto de 1979, a solicitud de parte interesada expide, certificado de antecedentes penales al ciudadano (a):
                </p>

                 <p style="text-align: center; margin: 1rem 0;">CI: V - ${solicitud.solicitante.cedula.replace('V-', '')}</p>

                <p style="text-align: justify; margin-bottom: 1rem;">
                    Se constata, luego de revisada la base de datos de la Oficina de Antecedentes Penales y hasta la emisión del presente documento, que el referido ciudadano(a) <strong>NO REGISTRA ANTECEDENTES PENALES EN LA REPÚBLICA BOLIVARIANA DE VENEZUELA</strong>.
                </p>
                
                <div style="text-align: center; margin: 1rem 0;">
                     <p>*****</p>
                </div>
                
                <p style="text-align: justify; margin-bottom: 1rem;">
                    El presente certificado se emite a efectos de ser presentado ante las autoridades de REINO DE ESPAÑA.
                </p>

                <p style="text-align: justify;">
                    Certificación que se expide en la ciudad de Caracas, el 13 de Julio del 2022.
                </p>
                
                <div style="position: relative; text-align: center; margin-top: 2rem;">
                    <div style="display: inline-block; position: relative;">
                        <img src="/images/sign-sample.png" alt="Firma Autorizada" style="width: 180px; height: auto;"/>
                        <img src="/images/seal-sample.png" alt="Sello" style="width: 120px; height: auto; position: absolute; left: 50%; top: 40%; transform: translate(-50%, -50%); opacity: 0.7;"/>
                    </div>
                    <p style="margin: 0; font-weight: bold; font-size: 11px;">ALANA, VANESSA ZULOAGA RUIZ</p>
                    <p style="margin: 0; font-size: 10px; font-weight: bold;">VICEMINISTRA DE POLÍTICA INTERIOR Y SEGURIDAD JURÍDICA</p>
                    <p style="margin: 0; font-size: 9px;">Designada según Decreto N° 4.294 de fecha 11 de Septiembre de 2020.</p>
                    <p style="margin: 0; font-size: 9px;">Publicado en Gaceta Oficial de la República Bolivariana de Venezuela</p>
                    <p style="margin: 0; font-size: 9px;">N° 6.574 Extraordinario en la misma fecha.</p>
                </div>
                
                <div style="margin-top: 2rem; font-size: 8px; text-align: justify; border-top: 1px solid #ccc; padding-top: 0.5rem;">
                    <strong>Atención:</strong> Este documento consta de una (1) hoja, el cual no debe contener enmiendas, tachaduras, modificaciones o superposiciones. Los datos de identificación del solicitante son suministrados por el Servicio Administrativo de Identificación, Migración y Extranjería (SAIME). La autenticidad de este certificado lo puede verificar a través del portal www.mpprijp.gob.ve con el Nro. ******** o escaneando el código QR.
                </div>
            </div>
      `;
    };
    
    const handleAction = (solicitud: Solicitud, action: 'print' | 'download') => {
        const content = getCertificateContent(solicitud);
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Certificado de Antecedentes Penales</title></head><body>' + content + '</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => { 
                printWindow.print();
                if (action === 'print') {
                    printWindow.close();
                }
            }, 500);
            if(action === 'download') {
                toast({
                    title: "Preparando Descarga",
                    description: "Se ha abierto el diálogo de impresión. Por favor, selecciona 'Guardar como PDF' para descargar el documento."
                });
            } else {
                 toast({
                    title: "Imprimiendo...",
                    description: "El certificado se está enviando a la impresora."
                });
            }
        }
    };
    
    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!organismo || !motivo) {
             toast({
                variant: "destructive",
                title: "Faltan Datos",
                description: "Por favor, completa todos los campos del formulario.",
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
                        .printable-certificate, .printable-certificate * {
                            visibility: visible;
                        }
                        .printable-certificate {
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: auto;
                            padding: 0;
                            margin: 0;
                            border: none;
                            box-shadow: none;
                        }
                         body {
                            background-color: white !important;
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="animate-in fade-in">
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
                     <Card className="max-w-4xl mx-auto shadow-2xl overflow-hidden printable-certificate" >
                         <CardContent className="p-0" dangerouslySetInnerHTML={{ __html: getCertificateContent(selectedSolicitud) }} />
                    </Card>
                </motion.div>
            ) : (
                <Card className="max-w-3xl mx-auto">
                    <CardHeader>
                        <CardTitle>Nueva Solicitud de Certificado</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleCreate}>
                        <CardContent>
                            {status === 'idle' ? (
                                <div className="space-y-6 animate-in fade-in">
                                    <Alert>
                                      <AlertTriangle className="h-4 w-4" />
                                      <AlertTitle>Importante</AlertTitle>
                                      <AlertDescription>
                                        Asegúrate de que tus datos (nombres, apellidos, cédula) estén correctamente registrados en tu perfil antes de continuar.
                                      </AlertDescription>
                                    </Alert>
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
                                                <SelectItem value="Universidad Central de Venezuela">Universidad Central de Venezuela</SelectItem>
                                                <SelectItem value="Otro">Otro (Especificar en Motivo)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="motivo">Motivo de la Solicitud</Label>
                                        <Input id="motivo" value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Ej: Solicitud de visa de estudios, trámite de residencia, etc." />
                                    </div>
                                </div>
                            ) : (
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
            
            <Card className="mt-12 print:hidden">
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
                                                </div>
                                                <DialogFooter>
                                                    <Button variant="outline">Cerrar</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        {solicitud.estado === 'Generado' && (
                                             <Button variant="ghost" size="icon" onClick={() => { setStatus('success'); setSelectedSolicitud(solicitud); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
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
