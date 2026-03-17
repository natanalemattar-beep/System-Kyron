
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, CirclePlus as PlusCircle, FileWarning, RefreshCw, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const polizasGenerales = [
    { id: "POL-RC-001", tipo: "Responsabilidad Civil General", aseguradora: "Seguros Caracas", monto: 100000, vencimiento: "2025-06-30", estado: "Vigente" },
    { id: "POL-INC-002", tipo: "Incendio y Líneas Aliadas", aseguradora: "Mercantil Seguros", monto: 500000, vencimiento: "2024-09-15", estado: "Por Vencer" },
    { id: "POL-VEH-003", tipo: "Flota de Vehículos", aseguradora: "Mapfre Seguros", monto: 80000, vencimiento: "2024-07-30", estado: "Vencida" },
    { id: "POL-VIDA-004", tipo: "Colectivo de Vida y Salud", aseguradora: "Banesco Seguros", monto: 0, vencimiento: "2025-01-31", estado: "Vigente" },
    { id: "POL-ELEC-005", tipo: "Seguro para Equipos Electrónicos (Alta Gama)", aseguradora: "Liberty Seguros", monto: 1500, vencimiento: "2025-07-20", estado: "Vigente" },
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

const asientosContables = [
    {
        id: "asiento-1",
        titulo: "Contratación y Pago Completo del Seguro",
        concepto: "Registrar la erogación inicial al pagar la póliza de seguro.",
        debe: "Cuenta 18 (Servicios y otros contratados por anticipado) o cuenta 10 (Efectivo y equivalentes de efectivo) por el total de la póliza.",
        haber: "Cuenta 18 (Servicios y otros contratados por anticipado) o cuenta 10 (Efectivo y equivalentes de efectivo)."
    },
    {
        id: "asiento-2",
        titulo: "Aplicación del Gasto de Seguro (Gasto Devengado)",
        concepto: "Ajustar al cierre de un periodo contable el gasto que corresponde a la cobertura de ese mes.",
        debe: "Cuenta 625 (Primas de seguros) por el importe del seguro consumido en el mes.",
        haber: "Cuenta 18 (Servicios y otros contratados por anticipado) por el mismo importe, reflejando la reducción del gasto anticipado."
    },
    {
        id: "asiento-3",
        titulo: "Registro por Indemnización Recibida",
        concepto: "Contabilizar el ingreso por una indemnización cubierta por el seguro tras un evento.",
        debe: "Cuenta 10 (Efectivo y equivalentes de efectivo) o cuenta por cobrar si la aseguradora aún no ha pagado.",
        haber: "Cuenta 778 (Ingresos extraordinarios) o cuenta similar para registrar el ingreso."
    },
    {
        id: "asiento-4",
        titulo: "Contabilización de Seguros Pagados por un Período Específico",
        concepto: "Registrar el costo del seguro que se ha incurrido en un período determinado.",
        debe: "Cuenta 625 (Primas de seguros), como los 4.067.79 del ejemplo.",
        haber: "Cuenta 18 (Servicios y otros contratados por anticipado), reflejando que la parte del seguro que ya no se debe se ha aplicado al gasto."
    },
    {
        id: "asiento-5",
        titulo: "Asiento de Vencimiento de la Póliza (Contrato de Seguro)",
        concepto: "Registrar la operación de la firma del contrato y el compromiso de pago.",
        debe: "Cuenta 469 (Otras cuentas por pagar diversas).",
        haber: "Cuenta 10 (Efectivo y equivalentes de efectivo) o cuenta 18 (Servicios y otros contratados por anticipado)."
    }
];

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

        <Tabs defaultValue="seguros" className="mb-8">
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
        
        <Card className="bg-card/50 backdrop-blur-sm mt-8">
            <CardHeader>
                <CardTitle>Asientos Contables Típicos para Pólizas de Seguro</CardTitle>
                <CardDescription>Guía de referencia para el registro contable de operaciones de seguros.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Accordion type="single" collapsible className="w-full">
                    {asientosContables.map((asiento) => (
                        <AccordionItem value={asiento.id} key={asiento.id}>
                            <AccordionTrigger>{asiento.titulo}</AccordionTrigger>
                            <AccordionContent>
                               <div className="p-4 bg-secondary/30 rounded-md">
                                    <p className="text-sm text-muted-foreground mb-4">{asiento.concepto}</p>
                                    <div className="space-y-2">
                                        <p><strong>Debe:</strong> {asiento.debe}</p>
                                        <p><strong>Haber:</strong> {asiento.haber}</p>
                                    </div>
                               </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>

    </div>
  );
}
