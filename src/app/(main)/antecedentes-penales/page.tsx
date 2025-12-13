
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
    const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
    const { toast } = useToast();

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write('<html><head><title>Certificado de Antecedentes Penales</title><style>body { margin: 0; } img { width: 100%; }</style></head><body>');
            printWindow.document.write('<img src="/images/Certificado-Antecedentes-Penales-Oficial.png" />');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => { 
                printWindow.print();
            }, 500);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/images/Certificado-Antecedentes-Penales-Oficial.png';
        link.download = 'Certificado_Antecedentes_Penales.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast({
            title: "Descarga Iniciada",
            description: "El certificado de antecedentes penales se está descargando."
        });
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
                    <div className="flex justify-end gap-2 mb-4">
                        <Button variant="outline" onClick={handleNewRequest}>
                            <PlusCircle className="mr-2"/> Realizar Nueva Solicitud
                        </Button>
                        <Button variant="outline" onClick={handlePrint}>
                            <Printer className="mr-2"/> Imprimir
                        </Button>
                        <Button onClick={handleDownload}>
                            <Download className="mr-2"/> Descargar PNG
                        </Button>
                    </div>
                     <Card className="max-w-4xl mx-auto bg-card/90 backdrop-blur-sm shadow-2xl overflow-hidden">
                        <Image 
                            src="/images/Certificado-Antecedentes-Penales-Oficial.png" 
                            alt="Certificado de Antecedentes Penales" 
                            width={1200} 
                            height={1697} 
                            layout="responsive"
                        />
                    </Card>
                </div>
            ) : (
                <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm">
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
                                                </div>
                                                <DialogFooter>
                                                    <Button variant="outline">Cerrar</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>

                                        {solicitud.estado === 'Generado' && (
                                             <Button variant="ghost" size="icon" onClick={() => { setStatus('success'); setSelectedSolicitud(solicitud); }}>
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
