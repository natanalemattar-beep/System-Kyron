

"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { HandCoins, AlertTriangle, Clock, Lightbulb, BarChart, Mail, Bell, ShieldCheck, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const facturasPendientes = [
    { id: "FAC-001", proveedor: "OficinaTech C.A.", email: "cobranza@oficinatech.com", fechaEmision: "2024-07-01", fechaVencimiento: "2024-07-31", monto: 1392, estado: "Pendiente" },
    { id: "FAC-002", proveedor: "Suministros Globales", email: "pagos@suministrosglobales.com", fechaEmision: "2024-06-15", fechaVencimiento: "2024-07-15", monto: 986, estado: "Vencida" },
    { id: "FAC-003", proveedor: "Papelería Mundial", email: "admin@papeleriamundial.net", fechaEmision: "2024-07-10", fechaVencimiento: "2024-08-10", monto: 550, estado: "Pendiente" },
    { id: "FAC-004", proveedor: "OficinaTech C.A.", email: "cobranza@oficinatech.com", fechaEmision: "2024-07-20", fechaVencimiento: "2024-08-20", monto: 2100, estado: "Pendiente" },
];

const cuentasBancarias = [
    { id: 1, banco: "Banco de Venezuela", numero: "**** 1234", saldo: 150000 },
    { id: 2, banco: "Banesco", numero: "**** 5678", saldo: 25000 },
    { id: 3, banco: "Mercantil", numero: "**** 9012", saldo: 75000 },
];

const topProveedoresData = [
    { name: "OficinaTech", "Volumen Compra": 3492 },
    { name: "Suministros Globales", "Volumen Compra": 1800 },
    { name: "Papelería Mundial", "Volumen Compra": 1200 },
    { name: "Importadora XYZ", "Volumen Compra": 950 },
    { name: "TecnoSoluciones", "Volumen Compra": 700 },
];

const soluciones = [
    "Renegociar plazos de pago con 'OficinaTech C.A.' para extenderlos a 45 días, mejorando el flujo de caja.",
    "Establecer pagos automáticos para facturas recurrentes y de bajo monto para evitar vencimientos.",
    "Consultar con 'Suministros Globales' la posibilidad de obtener un descuento por pronto pago.",
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case "Vencida": return "destructive";
        case "Pendiente": return "secondary";
        default: return "default";
    }
};

export default function CuentasPorPagarPage() {
    const { toast } = useToast();

    const handleRegisterPayment = (facturaId: string) => {
        toast({
            title: "Pago Procesado y Debitado",
            description: `Se ha debitado el pago para la factura ${facturaId} de la cuenta seleccionada.`,
        });
    };

    const handleNotify = (facturaId: string, email: string) => {
        toast({
            title: "Notificación Enviada",
            description: `Se ha enviado un recordatorio de vencimiento para la factura ${facturaId} a ${email}.`,
        });
    }

    const totalPorPagar = facturasPendientes.filter(f => f.estado !== "Pagada").reduce((acc, f) => acc + f.monto, 0);
    const facturasVencidas = facturasPendientes.filter(f => f.estado === "Vencida").length;
    const diasPromedioPago = 32;

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <HandCoins className="h-8 w-8" />
                    Cuentas por Pagar
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gestiona tus deudas con proveedores y optimiza tus pagos.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total por Pagar</CardTitle>
                        <HandCoins className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalPorPagar, 'Bs.')}</div>
                        <p className="text-xs text-muted-foreground">Suma de todas las facturas pendientes y vencidas.</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Facturas Vencidas</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{facturasVencidas}</div>
                        <p className="text-xs text-muted-foreground">Facturas que han superado su fecha de pago.</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Días Promedio de Pago</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{diasPromedioPago} días</div>
                        <p className="text-xs text-muted-foreground">Tiempo medio que tardas en pagar a proveedores.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Facturas Pendientes de Pago</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Proveedor</TableHead>
                                        <TableHead>Vencimiento</TableHead>
                                        <TableHead className="text-right">Monto</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {facturasPendientes.map((factura) => (
                                        <TableRow key={factura.id} className={factura.estado === 'Vencida' ? 'bg-destructive/10' : ''}>
                                            <TableCell className="font-medium">{factura.proveedor}</TableCell>
                                            <TableCell>{formatDate(factura.fechaVencimiento)}</TableCell>
                                            <TableCell className="text-right">{formatCurrency(factura.monto, 'Bs.')}</TableCell>
                                            <TableCell><Badge variant={getStatusVariant(factura.estado)}>{factura.estado}</Badge></TableCell>
                                            <TableCell className="text-right space-x-1">
                                                 <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=factura-pagar-${factura.id}`} alt={`QR for ${factura.id}`} width={24} height={24} className="inline-block mr-2" />
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button size="sm" variant="outline">Registrar Pago</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-3xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Confirmar y Realizar Pago</DialogTitle>
                                                            <DialogDescription>
                                                                Verifica los datos de la factura, selecciona la cuenta a debitar y autoriza el pago.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid md:grid-cols-2 gap-6 py-4">
                                                            <div className="space-y-4">
                                                                <Card>
                                                                    <CardHeader><CardTitle className="text-base">Factura a Pagar</CardTitle></CardHeader>
                                                                    <CardContent>
                                                                        <Image src="https://picsum.photos/seed/invoice1/400/500" alt="Factura" width={400} height={500} className="rounded-md object-cover" />
                                                                    </CardContent>
                                                                </Card>
                                                            </div>
                                                            <div className="space-y-6">
                                                                <dl className="grid gap-2">
                                                                    <div className="flex justify-between"><dt className="text-muted-foreground">Proveedor:</dt><dd className="font-semibold">{factura.proveedor}</dd></div>
                                                                    <div className="flex justify-between"><dt className="text-muted-foreground">Nro. Factura:</dt><dd className="font-semibold">{factura.id}</dd></div>
                                                                    <div className="flex justify-between text-lg"><dt className="text-muted-foreground">Monto Total:</dt><dd className="font-bold text-primary">{formatCurrency(factura.monto, 'Bs.')}</dd></div>
                                                                </dl>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="cuenta-origen">Seleccionar Cuenta a Debitar</Label>
                                                                    <Select>
                                                                        <SelectTrigger id="cuenta-origen">
                                                                            <SelectValue placeholder="Seleccione una cuenta..." />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            {cuentasBancarias.map(c => (
                                                                                <SelectItem key={c.id} value={String(c.id)}>{c.banco} ({c.numero}) - Saldo: {formatCurrency(c.saldo, 'Bs.')}</SelectItem>
                                                                            ))}
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label>Monto a Pagar</Label>
                                                                    <Input type="number" defaultValue={factura.monto} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button variant="outline">Cancelar</Button>
                                                            <Button onClick={() => handleRegisterPayment(factura.id)}>
                                                                <ShieldCheck className="mr-2 h-4 w-4"/> Pagar y Debitar de Cuenta
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2 space-y-8">
                     <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart />Análisis de Proveedores</CardTitle>
                            <CardDescription>Top 5 proveedores por volumen de compra.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-64">
                             <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={topProveedoresData} layout="vertical" margin={{ right: 30, left: 10 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} formatter={(value) => formatCurrency(value as number, 'Bs.')}/>
                                    <Bar dataKey="Volumen Compra" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-400" />Soluciones de Optimización de Pagos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {soluciones.map((sol, index) => (
                                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                                        <Lightbulb className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0"/>
                                        <span>{sol}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
