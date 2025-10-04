
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardCheck, TrendingUp, AlertTriangle, CheckCircle, Printer } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const denominaciones = [
    { tipo: 'billete', valor: 100 },
    { tipo: 'billete', valor: 50 },
    { tipo: 'billete', valor: 20 },
    { tipo: 'billete', valor: 10 },
    { tipo: 'billete', valor: 5 },
    { tipo: 'billete', valor: 1 },
    { tipo: 'moneda', valor: 0.5 },
    { tipo: 'moneda', valor: 0.25 },
];

const resumenSistema = {
    ventasTotales: 1850.75,
    pagosTarjetaDebito: 550.25,
    pagosTarjetaCredito: 400.00,
    pagosPorTransferencia: 300.50,
    efectivoEsperado: 600.00,
};

const historialCierres = [
    { id: 1, fecha: "20/07/2024", usuario: "Ana Pérez", diferencia: 0, estado: "Cuadrado" },
    { id: 2, fecha: "19/07/2024", usuario: "Ana Pérez", diferencia: -5.50, estado: "Faltante" },
    { id: 3, fecha: "18/07/2024", usuario: "Luis Gómez", diferencia: 10.00, estado: "Sobrante" },
];

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Cuadrado: "default",
  Sobrante: "secondary",
  Faltante: "destructive",
};

export default function ArqueoCajaPage() {
    const [conteo, setConteo] = useState<Record<string, number>>({});
    const { toast } = useToast();

    const totalContado = useMemo(() => {
        return Object.entries(conteo).reduce((acc, [valor, cantidad]) => {
            return acc + (Number(valor) * (cantidad || 0));
        }, 0);
    }, [conteo]);

    const diferencia = totalContado - resumenSistema.efectivoEsperado;

    const handleConteoChange = (valor: number, cantidad: string) => {
        setConteo(prev => ({
            ...prev,
            [valor]: Number(cantidad)
        }));
    };
    
    const handleCerrarCaja = () => {
        toast({
            title: "Caja Cerrada Exitosamente",
            description: `Se ha registrado el arqueo con una diferencia de ${formatCurrency(diferencia, 'Bs.')}.`,
            action: <CheckCircle className="text-green-500" />
        });
    }

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <ClipboardCheck className="h-8 w-8" />
                    Arqueo de Caja
                </h1>
                <p className="text-muted-foreground mt-2">
                    Realiza el cierre, conteo y cuadre del efectivo y otros métodos de pago.
                </p>
            </header>

            <div className="grid gap-8 lg:grid-cols-5">
                <div className="lg:col-span-3 space-y-8">
                    {/* Resumen del Sistema */}
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Resumen del Sistema (Turno Actual)</CardTitle>
                            <CardDescription>Valores calculados automáticamente por las ventas registradas.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center text-lg p-3 bg-secondary/50 rounded-lg">
                                <span className="text-muted-foreground">Ventas Totales del Turno:</span>
                                <span className="font-bold text-primary">{formatCurrency(resumenSistema.ventasTotales, 'Bs.')}</span>
                            </div>
                            <Separator/>
                            <div className="grid grid-cols-3 gap-4">
                                <div><p className="text-sm text-muted-foreground">Tarjeta de Débito:</p><p className="font-semibold">{formatCurrency(resumenSistema.pagosTarjetaDebito, 'Bs.')}</p></div>
                                <div><p className="text-sm text-muted-foreground">Tarjeta de Crédito:</p><p className="font-semibold">{formatCurrency(resumenSistema.pagosTarjetaCredito, 'Bs.')}</p></div>
                                <div><p className="text-sm text-muted-foreground">Pagos por Transferencia:</p><p className="font-semibold">{formatCurrency(resumenSistema.pagosPorTransferencia, 'Bs.')}</p></div>
                            </div>
                            <div className="flex justify-between items-center text-xl p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                                <span className="font-bold">Efectivo Esperado en Caja:</span>
                                <span className="font-bold">{formatCurrency(resumenSistema.efectivoEsperado, 'Bs.')}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Conteo Manual */}
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Conteo Manual de Efectivo</CardTitle>
                            <CardDescription>Introduce la cantidad de cada billete y moneda.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {denominaciones.map(({ valor, tipo }) => (
                                    <div key={valor} className="space-y-1">
                                        <Label htmlFor={`conteo-${valor}`}>{tipo === 'billete' ? 'Billetes' : 'Monedas'} de {formatCurrency(valor, 'Bs.')}</Label>
                                        <Input id={`conteo-${valor}`} type="number" placeholder="0" min="0" 
                                        onChange={e => handleConteoChange(valor, e.target.value)}
                                        className="text-right font-mono" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-8">
                     {/* Resultados del Arqueo */}
                    <Card className="sticky top-20 bg-card/80 backdrop-blur-sm">
                         <CardHeader>
                            <CardTitle>Resultados del Arqueo</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-lg"><span className="text-muted-foreground">Efectivo Esperado:</span><span className="font-semibold">{formatCurrency(resumenSistema.efectivoEsperado, 'Bs.')}</span></div>
                                <div className="flex justify-between text-lg"><span className="text-muted-foreground">Efectivo Contado:</span><span className="font-semibold">{formatCurrency(totalContado, 'Bs.')}</span></div>
                            </div>
                            <Separator/>
                            <div className={`p-4 rounded-lg text-center ${diferencia === 0 ? 'bg-green-600/10 border-green-600/30' : 'bg-red-600/10 border-red-600/30'}`}>
                                <h4 className="text-sm font-semibold mb-1">{diferencia === 0 ? 'CAJA CUADRADA' : diferencia > 0 ? 'SOBRANTE' : 'FALTANTE'}</h4>
                                <p className={`text-3xl font-bold ${diferencia === 0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(diferencia, 'Bs.')}</p>
                            </div>
                            <Button className="w-full text-lg py-6" onClick={handleCerrarCaja}>Cerrar Caja y Registrar</Button>
                            <Button className="w-full" variant="outline"><Printer className="mr-2"/> Imprimir Reporte</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

             {/* Historial de Cierres */}
            <Card className="mt-8 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Historial de Cierres de Caja</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Realizado por</TableHead>
                                <TableHead className="text-right">Diferencia</TableHead>
                                <TableHead className="text-center">Estado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {historialCierres.map((cierre) => (
                                <TableRow key={cierre.id}>
                                    <TableCell>{cierre.fecha}</TableCell>
                                    <TableCell className="font-medium">{cierre.usuario}</TableCell>
                                    <TableCell className={`text-right font-semibold ${cierre.diferencia < 0 ? 'text-red-500' : ''}`}>{formatCurrency(cierre.diferencia, 'Bs.')}</TableCell>
                                    <TableCell className="text-center">
                                        <Badge variant={statusVariant[cierre.estado]}>{cierre.estado}</Badge>
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

    

    