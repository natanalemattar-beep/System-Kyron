
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { BarChart, DollarSign, Hash } from "lucide-react";
import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const kpiData = [
    { title: "Ventas Totales en Efectivo (Hoy)", value: formatCurrency(4850.50, 'Bs.'), icon: DollarSign },
    { title: "Número de Transacciones (Hoy)", value: "52", icon: Hash },
    { title: "Ticket Promedio en Efectivo", value: formatCurrency(93.28, 'Bs.'), icon: DollarSign },
];

const dailySalesData = [
  { day: 'Lunes', ventas: 3200 },
  { day: 'Martes', ventas: 4100 },
  { day: 'Miércoles', ventas: 3800 },
  { day: 'Jueves', ventas: 4500 },
  { day: 'Viernes', ventas: 5600 },
  { day: 'Sábado', ventas: 7200 },
  { day: 'Domingo', ventas: 4850.50 },
];

const recentTransactions = [
    { id: "T-001", hora: "03:15 PM", cajero: "Cajero 1", monto: 150.00 },
    { id: "T-002", hora: "03:12 PM", cajero: "Cajero 2", monto: 85.50 },
    { id: "T-003", hora: "03:10 PM", cajero: "Cajero 1", monto: 320.00 },
    { id: "T-004", hora: "03:05 PM", cajero: "Cajero 3", monto: 55.75 },
    { id: "T-005", hora: "03:01 PM", cajero: "Cajero 2", monto: 120.00 },
];

export default function AnalisisCajaPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BarChart className="h-8 w-8" />
            Análisis de Facturación de Caja
        </h1>
        <p className="text-muted-foreground mt-2">
          Dashboard con métricas sobre las ventas realizadas en efectivo.
        </p>
      </header>

      {/* KPIs */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map(kpi => (
            <Card key={kpi.title} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gráfico de Ventas Diarias */}
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Ventas en Efectivo de la Semana</CardTitle>
                <CardDescription>Evolución de las ventas en efectivo durante los últimos 7 días.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={dailySalesData}>
                         <defs>
                            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                        <XAxis
                            dataKey="day"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => formatCurrency(value as number, 'Bs.')}
                        />
                        <Tooltip
                            content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number, 'Bs.')}/>}
                            cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }}
                        />
                        <Legend />
                        <Bar dataKey="ventas" name="Ventas en Efectivo" fill="url(#colorVentas)" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>

        {/* Transacciones Recientes */}
        <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Últimas Transacciones en Efectivo</CardTitle>
                <CardDescription>Listado de las operaciones más recientes.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Hora</TableHead>
                            <TableHead>Cajero</TableHead>
                            <TableHead className="text-right">Monto</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentTransactions.map(tx => (
                            <TableRow key={tx.id}>
                                <TableCell>{tx.hora}</TableCell>
                                <TableCell className="font-medium">{tx.cajero}</TableCell>
                                <TableCell className="text-right">{formatCurrency(tx.monto, 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
