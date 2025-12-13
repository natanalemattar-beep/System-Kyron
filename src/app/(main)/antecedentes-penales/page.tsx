
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
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

type Solicitud = {
    id: string;
    organismo: string;
    fecha: string;
    estado: "En Proceso" | "Generado" | "Rechazado";
    motivoRechazo?: string;
};

const initialSolicitudes: Solicitud[] = [
    { id: "AP-2024-001", organismo: "Consulado de España en Caracas", fecha: "2024-07-15", estado: "Generado" },
    { id: "AP-2024-002", organismo: "Embajada de Canadá", fecha: "2024-06-20", estado: "Generado" },
    { id: "AP-2024-003", organismo: "Trámite de Visa para EE.UU.", fecha: "2024-07-20", estado: "En Proceso" },
    {
        id: "AP-2024-004",
        fecha: "2024-07-22",
        organismo: "Universidad Central de Venezuela",
        estado: "Rechazado",
        motivoRechazo: "Falta copia de la cédula de identidad a color."
    },
];

export default function AntecedentesPenalesPage() {
    const [solicitudes, setSolicitudes] = useState(initialSolicitudes);
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
                fecha: new Date().toISOString(),
                estado: "Generado"
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

    const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
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
                                            <SelectItem value="consulado-es">Consulado de España</SelectItem>
                                            <SelectItem value="embajada-ca">Embajada de Canadá</SelectItem>
                                            <SelectItem value="tramite-usa">Trámite de Visa para EE.UU.</SelectItem>
                                            <SelectItem value="otro">Otro</SelectItem>
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
                                <Button className="mt-6">
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
                                        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=antecedentes-${solicitud.id}`} alt={`QR for ${solicitud.id}`} width={24} height={24} className="inline-block mr-2" />
                                        {solicitud.estado === 'Generado' && (
                                            <Button variant="ghost" size="icon" onClick={() => toast({ title: `Descargando ${solicitud.id}`})}>
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
