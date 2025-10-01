
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, Users, Package, ShoppingCart, DollarSign, ArrowRight, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const kpiData = [
    { title: "Ingresos Totales", value: formatCurrency(125340.50, 'Bs.'), icon: DollarSign, trend: "+15.2% vs mes anterior" },
    { title: "Ventas Totales", value: "852", icon: ShoppingCart, trend: "+20% vs mes anterior" },
    { title: "Ticket Promedio", value: formatCurrency(147.11, 'Bs.'), icon: DollarSign, trend: "-2.5% vs mes anterior" },
    { title: "Nuevos Clientes", value: "48", icon: Users, trend: "+8 nuevos esta semana" },
];

const topProducts = [
    { id: "PROD-003", name: "Laptop 14 pulgadas", sales: 150, revenue: formatCurrency(90000, 'Bs.') },
    { id: "PROD-002", name: "Tóner para Impresora", sales: 350, revenue: formatCurrency(29750, 'Bs.') },
    { id: "PROD-004", name: "Silla de Oficina Ergonómica", sales: 80, revenue: formatCurrency(12000, 'Bs.') },
];

const salesByChannel = [
    { channel: "Tienda Física", value: 75200 },
    { channel: "Ventas Online", value: 35140.50 },
    { channel: "Ventas Telefónicas", value: 15000 },
];


export default function AnalisisVentasPage() {
  return (
    <div className="p-4 md:p-8">
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <TrendingUp className="h-8 w-8" />
                Análisis de Ventas
            </h1>
            <p className="text-muted-foreground mt-2">
            Dashboard con métricas y KPIs clave para tu rendimiento comercial.
            </p>
        </div>
        <Button><Download className="mr-2"/>Exportar Reporte</Button>
      </header>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {kpiData.map(kpi => (
            <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground">{kpi.trend}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Ventas por Canal</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesByChannel} layout="vertical" margin={{ left: 20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="channel" type="category" tickLine={false} axisLine={false} />
                        <Tooltip cursor={{ fill: 'hsl(var(--secondary))' }} formatter={(value) => formatCurrency(value as number, 'Bs.')}/>
                        <Legend />
                        <Bar dataKey="value" name="Ingresos" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Productos Más Vendidos</CardTitle>
                <CardDescription>Top 3 productos por ingresos generados.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-right">Ingresos</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topProducts.map((prod) => (
                            <TableRow key={prod.id}>
                                <TableCell className="font-medium">{prod.name}</TableCell>
                                <TableCell className="text-right">{prod.revenue}</TableCell>
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

    