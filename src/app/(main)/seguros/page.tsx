
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, PlusCircle, FileWarning, RefreshCw, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const polizasGenerales = [
    { id: "POL-RC-001", tipo: "Responsabilidad Civil General", aseguradora: "Seguros Caracas", monto: 100000, vencimiento: "2025-06-30", estado: "Vigente" },
    { id: "POL-INC-002", tipo: "Incendio y Líneas Aliadas", aseguradora: "Mercantil Seguros", monto: 500000, vencimiento: "2024-09-15", estado: "Por Vencer" },
    { id: "POL-VEH-003", tipo: "Flota de Vehículos", aseguradora: "Mapfre Seguros", monto: 80000, vencimiento: "2024-07-30", estado: "Vencida" },
    { id: "POL-VIDA-004", tipo: "Colectivo de Vida y Salud", aseguradora: "Banesco Seguros", monto: 0, vencimiento: "2025-01-31", estado: "Vigente" },
];

const polizasFianza = [
    { id: "FIA-FC-001", tipo: "Fiel Cumplimiento de Contrato", aseguradora: "La Previsora", monto: 25000, vencimiento: "2024-12-31", estado: "Vigente" },
    { id: "FIA-AL-002", tipo: "Anticipo y Laboral", aseguradora: "Estark Seguros", monto: 50000, vencimiento: "2024-10-20", estado: "Vigente" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Vigente: "default",
  "Por Vencer": "secondary",
  Vencida: "destructive",
};

export default function SegurosPage() {
    const { toast } = useToast();

    const handleAction = (message: string) => {
        toast({
            title: "Acción Solicitada",
            description: message,
        });
    };
    
     const handleRegister = () => {
        toast({
            title: "Póliza Registrada",
            description: "La nueva póliza ha sido añadida al sistema.",
        });
    };

  return (
    <div className="p-4 md:p-8">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <ShieldCheck className="h-8 w-8" />
                    Gestión de Pólizas de Seguro y Fianzas
                </h1>
                <p className="text-muted-foreground mt-2">
                    Administra todas las coberturas y garantías de tu empresa.
                </p>
            </div>
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2" />
                        Registrar Nueva Póliza
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Registrar Nueva Póliza o Fianza</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Input placeholder="Tipo de Póliza (Ej: Responsabilidad Civil)" />
                        <Input placeholder="Compañía Aseguradora" />
                        <Input type="number" placeholder="Monto Asegurado/Afianzado" />
                        <div className="space-y-2">
                            <Label>Fecha de Vencimiento</Label>
                            <Input type="date" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleRegister}>Guardar Póliza</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </header>

        <Tabs defaultValue="seguros">
            <TabsList className="grid w-full grid-cols-2 max-w-lg mb-8">
                <TabsTrigger value="seguros">Pólizas de Seguro Generales</TabsTrigger>
                <TabsTrigger value="fianzas">Pólizas de Fianza</TabsTrigger>
            </TabsList>
            <TabsContent value="seguros">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Listado de Pólizas de Seguro</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tipo de Póliza</TableHead>
                                    <TableHead>Aseguradora</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Monto Asegurado</TableHead>
                                    <TableHead>Vencimiento</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {polizasGenerales.map((poliza) => (
                                    <TableRow key={poliza.id} className={poliza.estado === 'Vencida' ? 'bg-destructive/10' : poliza.estado === 'Por Vencer' ? 'bg-secondary/60' : ''}>
                                        <TableCell className="font-medium">{poliza.tipo}</TableCell>
                                        <TableCell>{poliza.aseguradora}</TableCell>
                                        <TableCell><Badge variant={statusVariant[poliza.estado]}>{poliza.estado}</Badge></TableCell>
                                        <TableCell className="text-right">{poliza.monto > 0 ? formatCurrency(poliza.monto, 'Bs.') : "N/A"}</TableCell>
                                        <TableCell>{formatDate(poliza.vencimiento)}</TableCell>
                                        <TableCell className="text-right space-x-1">
                                             <Button variant="ghost" size="icon" title="Ver Detalles"><Eye className="h-4 w-4"/></Button>
                                             <Button variant="ghost" size="icon" title="Reportar Siniestro" onClick={() => handleAction(`Reporte de siniestro iniciado para póliza ${poliza.id}.`)}><FileWarning className="h-4 w-4"/></Button>
                                             <Button variant="ghost" size="icon" title="Renovar Póliza" onClick={() => handleAction(`Solicitud de renovación enviada para ${poliza.id}.`)}><RefreshCw className="h-4 w-4"/></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="fianzas">
                 <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Listado de Pólizas de Fianza</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tipo de Fianza</TableHead>
                                    <TableHead>Aseguradora</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="text-right">Monto Afianzado</TableHead>
                                    <TableHead>Vencimiento</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {polizasFianza.map((fianza) => (
                                    <TableRow key={fianza.id}>
                                        <TableCell className="font-medium">{fianza.tipo}</TableCell>
                                        <TableCell>{fianza.aseguradora}</TableCell>
                                        <TableCell><Badge variant={statusVariant[fianza.estado]}>{fianza.estado}</Badge></TableCell>
                                        <TableCell className="text-right">{formatCurrency(fianza.monto, 'Bs.')}</TableCell>
                                        <TableCell>{formatDate(fianza.vencimiento)}</TableCell>
                                        <TableCell className="text-right space-x-1">
                                             <Button variant="ghost" size="icon" title="Ver Detalles"><Eye className="h-4 w-4"/></Button>
                                             <Button variant="ghost" size="icon" title="Ejecutar Fianza" onClick={() => handleAction(`Proceso de ejecución de fianza ${fianza.id} iniciado.`)}><FileWarning className="h-4 w-4"/></Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
}

