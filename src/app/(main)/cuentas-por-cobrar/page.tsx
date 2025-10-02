
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Wallet, AlertTriangle, Clock, Lightbulb, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useToast } from "@/hooks/use-toast";

const facturasPendientes = [
    { id: "FAC-C-001", cliente: "Tech Solutions LLC", fechaEmision: "2024-07-05", fechaVencimiento: "2024-08-04", monto: 5500, estado: "Pendiente" },
    { id: "FAC-C-002", cliente: "Innovate Corp", fechaEmision: "2024-06-10", fechaVencimiento: "2024-07-10", monto: 3200, estado: "Vencida" },
    { id: "FAC-C-003", cliente: "Marketing Pro", fechaEmision: "2024-07-15", fechaVencimiento: "2024-08-15", monto: 1800, estado: "Pendiente" },
    { id: "FAC-C-004", cliente: "Tech Solutions LLC", fechaEmision: "2024-07-22", fechaVencimiento: "2024-08-22", monto: 4200, estado: "Pendiente" },
];

const topDeudoresData = [
    { name: "Tech Solutions", "Deuda Total": 9700 },
    { name: "Innovate Corp", "Deuda Total": 3200 },
    { name: "Marketing Pro", "Deuda Total": 1800 },
    { name: "Global Exports", "Deuda Total": 1100 },
    { name: "Servicios Creativos", "Deuda Total": 950 },
];

const soluciones = [
    "Ofrecer un 5% de descuento por pronto pago en facturas superiores a 5000 Bs.",
    "Implementar un sistema de recordatorios de pago automáticos vía correo electrónico 3 días antes del vencimiento.",
    "Contactar a 'Innovate Corp' para negociar un plan de pago para su factura vencida.",
];

const getStatusVariant = (status: string) => {
    switch (status) {
        case "Vencida": return "destructive";
        case "Pendiente": return "secondary";
        default: return "default";
    }
};

export default function CuentasPorCobrarPage() {
    const { toast } = useToast();

    const handleRegisterPayment = (facturaId: string) => {
        toast({
            title: "Cobro Registrado",
            description: `Se ha registrado el cobro para la factura ${facturaId}.`,
        });
    };

    const totalPorCobrar = facturasPendientes.filter(f => f.estado !== "Pagada").reduce((acc, f) => acc + f.monto, 0);
    const facturasVencidas = facturasPendientes.filter(f => f.estado === "Vencida").length;
    const diasPromedioCobro = 38;

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Wallet className="h-8 w-8" />
                    Cuentas por Cobrar
                </h1>
                <p className="text-muted-foreground mt-2">
                    Gestiona los cobros pendientes de tus clientes y optimiza tu flujo de caja.
                </p>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card className="bg-card/80 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total por Cobrar</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(totalPorCobrar, 'Bs.')}</div>
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
                        <CardTitle className="text-sm font-medium">Días Promedio de Cobro</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{diasPromedioCobro} días</div>
                        <p className="text-xs text-muted-foreground">Tiempo medio que tardan tus clientes en pagar.</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Facturas Pendientes de Cobro</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Vencimiento</TableHead>
                                        <TableHead className="text-right">Monto</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead className="text-right">Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {facturasPendientes.map((factura) => (
                                        <TableRow key={factura.id} className={factura.estado === 'Vencida' ? 'bg-destructive/10' : ''}>
                                            <TableCell className="font-medium">{factura.cliente}</TableCell>
                                            <TableCell>{formatDate(factura.fechaVencimiento)}</TableCell>
                                            <TableCell className="text-right">{formatCurrency(factura.monto, 'Bs.')}</TableCell>
                                            <TableCell><Badge variant={getStatusVariant(factura.estado)}>{factura.estado}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" variant="outline" onClick={() => handleRegisterPayment(factura.id)}>Registrar Cobro</Button>
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
                            <CardTitle className="flex items-center gap-2"><BarChart />Análisis de Clientes</CardTitle>
                            <CardDescription>Top 5 clientes por deuda total.</CardDescription>
                        </CardHeader>
                        <CardContent className="h-64">
                             <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={topDeudoresData} layout="vertical" margin={{ right: 30, left: 10 }}>
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" fontSize={12} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} formatter={(value) => formatCurrency(value as number, 'Bs.')}/>
                                    <Bar dataKey="Deuda Total" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-400" />Soluciones de Cobranza</CardTitle>
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

    

    
