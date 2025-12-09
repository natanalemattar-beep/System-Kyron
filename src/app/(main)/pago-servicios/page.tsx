
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Search, Download, CheckCircle, CreditCard } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const servicios = [
    { id: "corpoelec", nombre: "Corpoelec (Electricidad)" },
    { id: "hidrocapital", nombre: "Hidrocapital (Agua)" },
    { id: "cantv", nombre: "CANTV (Telefonía / Internet)" },
    { id: "aseo", nombre: "Aseo Urbano Municipal" },
    { id: "inmuebles", nombre: "Impuesto sobre Inmuebles Urbanos" },
];

const historialPagos = [
    { id: "PAGO-001", fecha: "2024-07-15", servicio: "Corpoelec", monto: 1250.50, referencia: "0012345" },
    { id: "PAGO-002", fecha: "2024-07-10", servicio: "Hidrocapital", monto: 850.00, referencia: "0012346" },
    { id: "PAGO-003", fecha: "2024-06-20", servicio: "Aseo Urbano", monto: 450.00, referencia: "0012347" },
];

export default function PagoServiciosPage() {
    const [servicioSeleccionado, setServicioSeleccionado] = useState("");
    const [numeroContrato, setNumeroContrato] = useState("");
    const [deudaConsultada, setDeudaConsultada] = useState<number | null>(null);
    const { toast } = useToast();

    const handleConsultarDeuda = () => {
        if (!servicioSeleccionado || !numeroContrato) {
            toast({
                variant: "destructive",
                title: "Faltan datos",
                description: "Por favor, selecciona un servicio e introduce el número de contrato.",
            });
            return;
        }
        // Mock API call
        const deudaSimulada = Math.random() * 2000;
        setDeudaConsultada(deudaSimulada);
        toast({
            title: "Consulta Exitosa",
            description: `La deuda para el contrato ${numeroContrato} es de ${formatCurrency(deudaSimulada, 'Bs.')}.`
        });
    };

    const handlePagar = () => {
         if (deudaConsultada === null) return;
         toast({
            title: "Pago Procesado",
            description: "El pago del servicio se ha procesado correctamente.",
            action: <CheckCircle className="text-green-500" />
         });
         setDeudaConsultada(null);
         setNumeroContrato("");
    }

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <CreditCard className="h-8 w-8" />
                    Pago de Servicios e Impuestos
                </h1>
                <p className="text-muted-foreground mt-2">
                    Consulta y paga tus servicios públicos e impuestos municipales desde un solo lugar.
                </p>
            </header>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Consulta de Deuda</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6 items-end">
                    <div className="space-y-2">
                        <Label htmlFor="servicio-select">Servicio o Impuesto</Label>
                        <Select onValueChange={setServicioSeleccionado}>
                            <SelectTrigger id="servicio-select">
                                <SelectValue placeholder="Seleccionar..." />
                            </SelectTrigger>
                            <SelectContent>
                                {servicios.map(s => <SelectItem key={s.id} value={s.id}>{s.nombre}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="contrato-input">N° de Contrato / NIC</Label>
                        <Input id="contrato-input" value={numeroContrato} onChange={(e) => setNumeroContrato(e.target.value)} placeholder="Ej: 1000123456" />
                    </div>
                    <Button onClick={handleConsultarDeuda} disabled={!servicioSeleccionado || !numeroContrato}>
                        <Search className="mr-2" /> Consultar Deuda
                    </Button>
                </CardContent>
                {deudaConsultada !== null && (
                    <CardFooter className="flex-col items-start gap-4 border-t pt-6 bg-secondary/50">
                        <div className="w-full flex justify-between items-center">
                            <div>
                                <p className="text-sm text-muted-foreground">Monto a Pagar:</p>
                                <p className="text-3xl font-bold text-primary">{formatCurrency(deudaConsultada, 'Bs.')}</p>
                            </div>
                            <Button size="lg" onClick={handlePagar}>
                                <CreditCard className="mr-2" /> Pagar Ahora
                            </Button>
                        </div>
                    </CardFooter>
                )}
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Historial de Pagos</CardTitle>
                    <CardDescription>Registro de los últimos pagos realizados a través de la plataforma.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Servicio</TableHead>
                                <TableHead>Referencia de Pago</TableHead>
                                <TableHead className="text-right">Monto</TableHead>
                                <TableHead className="text-right">Recibo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historialPagos.map((pago) => (
                                <TableRow key={pago.id}>
                                    <TableCell>{pago.fecha}</TableCell>
                                    <TableCell className="font-medium">{pago.servicio}</TableCell>
                                    <TableCell className="font-mono text-xs">{pago.referencia}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(pago.monto, 'Bs.')}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4"/> Descargar
                                        </Button>
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

