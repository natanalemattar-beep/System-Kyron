
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gavel, PlusCircle, CheckCircle, Edit, Users, Building, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

const initialPoderes = [
    { id: "POD-001", tipo: "Poder General de Administración", apoderado: "Ana Pérez (V-12.345.678)", registro: "Reg. Mercantil 1ro, N° 45, Tomo 2-A", expediente: "N/A", estado: "Activo" },
    { id: "POD-002", tipo: "Apoderado Judicial Especial", apoderado: "Luis Gómez (V-18.765.432)", registro: "N/A", expediente: "AP11-V-2024-000123", estado: "Activo" },
    { id: "POD-003", tipo: "Poder para Actos de Disposición", apoderado: "Carlos Sanchez (E-8.999.000)", registro: "Notaría Pública 3ra, N° 12, Tomo 5-B", expediente: "N/A", estado: "Revocado" },
];

const holdingData = [
    { id: 1, nombre: "Ana Pérez", rol: "Socio / Director", cedula: "V-12.345.678", participacion: "50%" },
    { id: 2, nombre: "Luis Gómez", rol: "Socio / Director", cedula: "V-18.765.432", participacion: "50%" },
];

const holdingCompanies = [
    { id: 1, nombre: "Empresa Filial A, C.A.", rif: "J-23456789-0", rol: "Subsidiaria", jurisdiccion: "Nacional" },
    { id: 2, nombre: "Servicios Integrados B, S.A.", rif: "J-34567890-1", rol: "Aliada Estratégica", jurisdiccion: "Nacional" },
    { id: 3, nombre: "International Holdings LLC", rif: "N/A", rol: "Casa Matriz", jurisdiccion: "Internacional" },
];


type Poder = typeof initialPoderes[0];

const statusVariant: { [key: string]: "default" | "destructive" } = {
  Activo: "default",
  Revocado: "destructive",
};

export default function PoderesRepresentacionPage() {
    const [poderes, setPoderes] = useState(initialPoderes);
    const [isJudicial, setIsJudicial] = useState(false);
    const { toast } = useToast();

    const handleRegister = () => {
        toast({
            title: "Poder Registrado Exitosamente",
            description: "El nuevo poder o representación ha sido añadido al sistema.",
            action: <CheckCircle className="text-green-500" />
        });
    };

    return (
        <div className="p-4 md:p-8">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Gavel className="h-8 w-8" />
                        Poderes y Representación Legal
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Gestiona los apoderados judiciales y los poderes notariales de la empresa.
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2" />
                            Registrar Nuevo Poder
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                        <DialogHeader>
                            <DialogTitle>Registrar Poder o Representación</DialogTitle>
                            <DialogDescription>
                                Complete los datos del poder, apoderado y los registros correspondientes.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                             <div className="space-y-2">
                                <Label htmlFor="tipo-poder">Tipo de Poder o Representación</Label>
                                <Select>
                                    <SelectTrigger id="tipo-poder">
                                        <SelectValue placeholder="Seleccione el tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="general">Poder General de Administración</SelectItem>
                                        <SelectItem value="especial">Poder Especial para Acto Específico</SelectItem>
                                        <SelectItem value="judicial">Apoderado Judicial (Apud Acta)</SelectItem>
                                        <SelectItem value="socio-holding">Socio de Holding</SelectItem>
                                        <SelectItem value="nuevos-socios">Nuevos Socios</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="apoderado">Nombre y C.I. del Apoderado</Label>
                                <Input id="apoderado" placeholder="Ej: Ana Pérez (V-12.345.678)" />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="is-judicial" checked={isJudicial} onCheckedChange={(checked) => setIsJudicial(checked as boolean)} />
                                <Label htmlFor="is-judicial">¿Es un apoderado judicial para un caso específico?</Label>
                            </div>
                            {isJudicial ? (
                                <div className="space-y-2 p-4 border rounded-md bg-secondary/30">
                                    <Label htmlFor="expediente">Expediente Judicial Asociado</Label>
                                    <Input id="expediente" placeholder="Ej: AP11-V-2024-000123" />
                                </div>
                            ) : (
                                <div className="space-y-2 p-4 border rounded-md bg-secondary/30">
                                    <Label htmlFor="registro-saren">Datos del Registro (SAREN / Notaría)</Label>
                                    <Input id="registro-saren" placeholder="Ej: Reg. Mercantil 1ro, N° 45, Tomo 2-A" />
                                </div>
                            )}
                        </div>
                        <DialogFooter>
                            <Button onClick={handleRegister}>Registrar Poder</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Listado de Poderes y Representaciones</CardTitle>
                    <CardDescription>Registro de las personas autorizadas para actuar en nombre de la empresa.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tipo de Poder</TableHead>
                                <TableHead>Apoderado</TableHead>
                                <TableHead>Datos de Registro (SAREN)</TableHead>
                                <TableHead>Expediente Judicial</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {poderes.map((poder) => (
                                <TableRow key={poder.id}>
                                    <TableCell className="font-medium">{poder.tipo}</TableCell>
                                    <TableCell>{poder.apoderado}</TableCell>
                                    <TableCell>{poder.registro}</TableCell>
                                    <TableCell className="font-mono">{poder.expediente}</TableCell>
                                    <TableCell>
                                        <Badge variant={statusVariant[poder.estado]}>{poder.estado}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=poder-${poder.id}`} alt={`QR for ${poder.id}`} width={24} height={24} className="inline-block mr-2" />
                                        <Button variant="ghost" size="icon">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="mt-8 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-6 w-6 text-primary" />
                        Holding de Representantes y Socios
                    </CardTitle>
                    <CardDescription>
                        Detalle de la participación accionaria de los representantes legales y socios, requerido para fiscalización.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Rol</TableHead>
                                <TableHead>Cédula / RIF</TableHead>
                                <TableHead className="text-right">Participación (%)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {holdingData.map((socio) => (
                                <TableRow key={socio.id}>
                                    <TableCell className="font-medium">{socio.nombre}</TableCell>
                                    <TableCell>{socio.rol}</TableCell>
                                    <TableCell>{socio.cedula}</TableCell>
                                    <TableCell className="text-right font-semibold">{socio.participacion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            
            <Card className="mt-8 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-6 w-6 text-primary" />
                        Listado de Empresas del Holding
                    </CardTitle>
                    <CardDescription>
                        Detalle de las empresas que componen el holding y acceso a sus estados financieros.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Razón Social</TableHead>
                                <TableHead>RIF</TableHead>
                                <TableHead>Rol en el Holding</TableHead>
                                <TableHead>Jurisdicción</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {holdingCompanies.map((company) => (
                                <TableRow key={company.id}>
                                    <TableCell className="font-medium">{company.nombre}</TableCell>
                                    <TableCell>{company.rif}</TableCell>
                                    <TableCell>{company.rol}</TableCell>
                                    <TableCell>
                                        <Badge variant={company.jurisdiccion === 'Nacional' ? 'secondary' : 'outline'}>
                                            {company.jurisdiccion}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">
                                            <Eye className="mr-2 h-4 w-4" />
                                            Ver Estados de Cuenta
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="mt-8 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Building className="h-6 w-6 text-primary" />
                        Estructura Organizativa del Holding
                    </CardTitle>
                    <CardDescription>
                        Más allá de la tecnología, el holding o la empresa administradora debe tener departamentos específicos para soportar el riesgo y la operación.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold">Departamento de Tecnología y Seguridad (IT)</h4>
                        <p className="text-sm text-muted-foreground">Encargado de mantener la plataforma, la seguridad de los datos (cifrado) y prevenir ciberataques.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Departamento de Cumplimiento (Compliance)</h4>
                        <p className="text-sm text-muted-foreground">Responsable de la auditoría interna, asegurar el cumplimiento del SENIAT y las regulaciones AML/CFT.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Departamento de Riesgo y Cobranza</h4>
                        <p className="text-sm text-muted-foreground">Administra el motor de scoring, monitorea las tasas de morosidad y ejecuta las estrategias de cobro.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
