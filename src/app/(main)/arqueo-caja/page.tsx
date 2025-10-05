
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardCheck, CheckCircle, Printer, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const denominacionesBs = [
    { tipo: 'billete', valor: 100 },
    { tipo: 'billete', valor: 50 },
    { tipo: 'billete', valor: 20 },
    { tipo: 'billete', valor: 10 },
    { tipo: 'billete', valor: 5 },
    { tipo: 'billete', valor: 1 },
    { tipo: 'moneda', valor: 0.5 },
];

const denominacionesUsd = [
    { tipo: 'billete', valor: 100 },
    { tipo: 'billete', valor: 50 },
    { tipo: 'billete', valor: 20 },
    { tipo: 'billete', valor: 10 },
    { tipo: 'billete', valor: 5 },
    { tipo: 'billete', valor: 1 },
];

const denominacionesEur = [
    { tipo: 'billete', valor: 100 },
    { tipo: 'billete', valor: 50 },
    { tipo: 'billete', valor: 20 },
    { tipo: 'billete', valor: 10 },
    { tipo: 'billete', valor: 5 },
];

const resumenSistema = {
    ventasTotales: 1850.75,
    pagosTarjetaDebito: 450.25,
    pagosTarjetaCredito: 300.00,
    pagosPorTransferencia: 200.50,
    pagosPagoMovil: 300.00,
    fondoDeCaja: 5000.00,
};

const efectivoEsperadoPorVentas = resumenSistema.ventasTotales - (resumenSistema.pagosTarjetaDebito + resumenSistema.pagosTarjetaCredito + resumenSistema.pagosPorTransferencia + resumenSistema.pagosPagoMovil);
const totalEsperadoEnCaja = efectivoEsperadoPorVentas + resumenSistema.fondoDeCaja;


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
    const [conteoBs, setConteoBs] = useState<Record<string, number>>({});
    const [conteoUsd, setConteoUsd] = useState<Record<string, number>>({});
    const [conteoEur, setConteoEur] = useState<Record<string, number>>({});
    const { toast } = useToast();

    const totalContadoBs = useMemo(() => {
        return Object.entries(conteoBs).reduce((acc, [valor, cantidad]) => acc + (Number(valor) * (cantidad || 0)), 0);
    }, [conteoBs]);
    
    const totalContadoUsd = useMemo(() => {
        return Object.entries(conteoUsd).reduce((acc, [valor, cantidad]) => acc + (Number(valor) * (cantidad || 0)), 0);
    }, [conteoUsd]);

    const totalContadoEur = useMemo(() => {
        return Object.entries(conteoEur).reduce((acc, [valor, cantidad]) => acc + (Number(valor) * (cantidad || 0)), 0);
    }, [conteoEur]);

    const diferenciaBs = totalContadoBs - totalEsperadoEnCaja;

    const handleConteoChange = (moneda: 'bs' | 'usd' | 'eur', valor: number, cantidad: string) => {
        const setter = { bs: setConteoBs, usd: setConteoUsd, eur: setConteoEur }[moneda];
        setter(prev => ({ ...prev, [valor]: Number(cantidad) }));
    };
    
    const handleCerrarCaja = () => {
        toast({
            title: "Caja Cerrada Exitosamente",
            description: `Se ha registrado el arqueo con una diferencia de ${formatCurrency(diferenciaBs, 'Bs.')}.`,
            action: <CheckCircle className="text-green-500" />
        });
    }

    const ConteoInputs = ({ denominaciones, moneda, onChange }: { denominaciones: {valor:number, tipo:string}[], moneda: 'bs' | 'usd' | 'eur', onChange: (valor: number, cantidad: string) => void}) => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {denominaciones.map(({ valor, tipo }) => (
                <div key={`${moneda}-${valor}`} className="space-y-1">
                    <Label htmlFor={`conteo-${moneda}-${valor}`}>{tipo === 'billete' ? 'Billetes' : 'Monedas'} de {moneda === 'bs' ? formatCurrency(valor, 'Bs.') : `${valor} ${moneda.toUpperCase()}`}</Label>
                    <Input id={`conteo-${moneda}-${valor}`} type="number" placeholder="0" min="0" 
                    onChange={e => onChange(valor, e.target.value)}
                    className="text-right font-mono" />
                </div>
            ))}
        </div>
    );

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
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div><p className="text-sm text-muted-foreground">Tarjeta de Débito:</p><p className="font-semibold">{formatCurrency(resumenSistema.pagosTarjetaDebito, 'Bs.')}</p></div>
                                <div><p className="text-sm text-muted-foreground">Tarjeta de Crédito:</p><p className="font-semibold">{formatCurrency(resumenSistema.pagosTarjetaCredito, 'Bs.')}</p></div>
                                <div><p className="text-sm text-muted-foreground">Transferencias:</p><p className="font-semibold">{formatCurrency(resumenSistema.pagosPorTransferencia, 'Bs.')}</p></div>
                                <div><p className="text-sm text-muted-foreground">Pago Móvil:</p><p className="font-semibold">{formatCurrency(resumenSistema.pagosPagoMovil, 'Bs.')}</p></div>
                            </div>
                             <div className="flex justify-between items-center text-md p-3 bg-secondary/50 rounded-lg">
                                <span className="text-muted-foreground">Fondo de Caja Inicial:</span>
                                <span className="font-semibold">{formatCurrency(resumenSistema.fondoDeCaja, 'Bs.')}</span>
                            </div>
                            <div className="flex justify-between items-center text-xl p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
                                <span className="font-bold">Total Esperado en Caja (Bs.):</span>
                                <span className="font-bold">{formatCurrency(totalEsperadoEnCaja, 'Bs.')}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Conteo Manual */}
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Conteo Manual de Efectivo</CardTitle>
                            <CardDescription>Introduce la cantidad de cada billete y moneda por divisa.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="bs">
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="bs">Bolívares (Bs.)</TabsTrigger>
                                    <TabsTrigger value="usd">Dólares (USD)</TabsTrigger>
                                    <TabsTrigger value="eur">Euros (EUR)</TabsTrigger>
                                </TabsList>
                                <TabsContent value="bs" className="mt-6">
                                    <ConteoInputs denominaciones={denominacionesBs} moneda="bs" onChange={(v, c) => handleConteoChange('bs', v, c)} />
                                </TabsContent>
                                <TabsContent value="usd" className="mt-6">
                                    <ConteoInputs denominaciones={denominacionesUsd} moneda="usd" onChange={(v, c) => handleConteoChange('usd', v, c)} />
                                </TabsContent>
                                <TabsContent value="eur" className="mt-6">
                                    <ConteoInputs denominaciones={denominacionesEur} moneda="eur" onChange={(v, c) => handleConteoChange('eur', v, c)} />
                                </TabsContent>
                            </Tabs>
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
                                <h4 className="font-medium text-muted-foreground">Totales en Efectivo Contado</h4>
                                <div className="flex justify-between text-lg"><span className="text-muted-foreground">Bolívares (Bs.):</span><span className="font-semibold">{formatCurrency(totalContadoBs, 'Bs.')}</span></div>
                                <div className="flex justify-between text-lg"><span className="text-muted-foreground">Dólares (USD):</span><span className="font-semibold">{formatCurrency(totalContadoUsd, 'USD')}</span></div>
                                <div className="flex justify-between text-lg"><span className="text-muted-foreground">Euros (EUR):</span><span className="font-semibold">{formatCurrency(totalContadoEur, 'EUR')}</span></div>
                            </div>
                            <Separator/>
                            <div className={`p-4 rounded-lg text-center ${diferenciaBs === 0 ? 'bg-green-600/10 border-green-600/30' : 'bg-red-600/10 border-red-600/30'}`}>
                                <h4 className="text-sm font-semibold mb-1">{diferenciaBs === 0 ? 'CAJA CUADRADA' : diferenciaBs > 0 ? 'SOBRANTE' : 'FALTANTE'} (en Bs.)</h4>
                                <p className={`text-3xl font-bold ${diferenciaBs === 0 ? 'text-green-500' : 'text-red-500'}`}>{formatCurrency(diferenciaBs, 'Bs.')}</p>
                            </div>
                            <Button className="w-full text-lg py-6" onClick={handleCerrarCaja}>Cerrar Caja y Registrar</Button>
                            <Button className="w-full" variant="outline"><Printer className="mr-2"/> Imprimir Reporte</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card className="mt-8 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldCheck className="text-primary"/>
                        Recomendaciones Clave para la Prevención de Fraudes
                    </CardTitle>
                    <CardDescription>
                        Nunca confíes únicamente en la confirmación del cliente. Verifica siempre cada transacción.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Pago Móvil</h4>
                        <p className="text-sm text-muted-foreground">
                            Verifica la transacción directamente en tu cuenta bancaria. No aceptes capturas de pantalla como comprobante válido.
                        </p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Transferencias</h4>
                        <p className="text-sm text-muted-foreground">
                            Confirma que la transferencia se haya hecho efectiva en tu cuenta. Las transferencias de otros bancos pueden tardar.
                        </p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Punto de Venta</h4>
                        <p className="text-sm text-muted-foreground">
                            Asegúrate siempre de que el punto de venta imprima un voucher con la palabra "Aprobada" y guárdalo.
                        </p>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Conciliación Diaria</h4>
                        <p className="text-sm text-muted-foreground">
                            El arqueo diario es tu mejor herramienta para detectar cualquier inconsistencia o fraude a tiempo.
                        </p>
                    </div>
                </CardContent>
            </Card>

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
                                <TableHead className="text-right">Diferencia (Bs.)</TableHead>
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
