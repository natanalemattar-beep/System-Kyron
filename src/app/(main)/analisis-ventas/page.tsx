
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ShoppingCart, DollarSign, ArrowRight, Download, TrendingDown, RefreshCw, Star } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import Link from "next/link";
import { historicalFinancialData } from "@/lib/historical-financial-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";


const kpiData = [
    { title: "Ingresos Totales (Mes)", value: formatCurrency(62000, 'Bs.'), icon: DollarSign, trend: "+12.7% vs mes anterior", trendColor: "text-green-500" },
    { title: "Ventas Totales (Mes)", value: "335", icon: ShoppingCart, trend: "+18% vs mes anterior", trendColor: "text-green-500" },
    { title: "Ticket Promedio", value: formatCurrency(185.30, 'Bs.'), icon: DollarSign, trend: "-1.5% vs mes anterior", trendColor: "text-red-500" },
    { title: "Rotación de Inventario", value: "4.2", icon: RefreshCw, trend: "ciclos este mes", trendColor: "text-green-500" },
];

const topProducts = [
    { id: "PROD-002", name: "Impresora Fiscal", sales: 45, revenue: formatCurrency(15750, 'Bs.') },
    { id: "PROD-003", name: "Punto de Venta Inalámbrico", sales: 50, revenue: formatCurrency(14000, 'Bs.') },
    { id: "PROD-005", name: "Tóner para Impresora", sales: 110, revenue: formatCurrency(9350, 'Bs.') },
];

const bottomProducts = [
    { id: "PROD-008", name: "Calculadora de Escritorio", sales: 5, revenue: formatCurrency(90, 'Bs.') },
    { id: "PROD-007", name: "Rollo de Etiquetas para Precios", sales: 12, revenue: formatCurrency(144, 'Bs.') },
    { id: "PROD-006", name: "Caja de Bolígrafos Negros", sales: 15, revenue: formatCurrency(75, 'Bs.') },
];

const chartConfig = {
  ingresos: {
    label: "Ingresos",
    color: "hsl(var(--primary))",
  },
  gastos: {
    label: "Gastos",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;


export default function AnalisisVentasPage() {
  const { toast } = useToast();

  const handleExport = () => {
      toast({
          title: "Reporte Generado",
          description: "El reporte de ventas ha sido exportado exitosamente.",
      });
  };
  
  return (
    <div className="space-y-8">
      <header className="mb-8 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                <TrendingUp className="h-8 w-8" />
                Análisis de Ventas
            </h1>
            <p className="text-muted-foreground mt-2">
            Dashboard con métricas y KPIs clave para tu rendimiento comercial.
            </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}><Download className="mr-2"/>Exportar Reporte</Button>
          <Button asChild>
            <Link href="/estrategias-ventas">Generar Estrategias con IA <ArrowRight className="ml-2"/></Link>
          </Button>
        </div>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <Card className="bg-card/80 backdrop-blur-sm h-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center justify-between">
                        <span>{kpi.title}</span>
                        <kpi.icon className="h-4 w-4 text-muted-foreground" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{kpi.value}</div>
                        <p className={`text-xs ${kpi.trendColor}`}>{kpi.trend}</p>
                    </CardContent>
                </Card>
             </motion.div>
        ))}
      </div>
      
       <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Star className="text-yellow-400 fill-yellow-400"/>Producto Estrella del Día</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <p className="text-2xl font-bold">Impresora Fiscal Térmica</p>
                    <p className="text-muted-foreground">El producto más vendido hoy.</p>
                </div>
                <div className="text-center md:text-right">
                    <p className="text-lg font-semibold">12 Unidades Vendidas</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(4200, 'Bs.')} en ingresos hoy</p>
                </div>
            </CardContent>
        </Card>

       <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
              <CardTitle>Pulso Financiero (Últimos 12 meses)</CardTitle>
              <CardDescription>Evolución de ingresos vs. gastos para medir la rentabilidad.</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <AreaChart data={historicalFinancialData.slice(-12)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                          <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                          </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} axisLine={false} tickLine={false} tickFormatter={(value) => `${(value as number) / 1000}k`} />
                      <ChartTooltip 
                          cursor={false}
                          content={<ChartTooltipContent 
                              indicator="dot" 
                              formatter={(value) => formatCurrency(value as number, 'Bs.')} 
                          />} 
                      />
                      <Legend />
                      <Area type="monotone" dataKey="ingresos" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorIngresos)" />
                      <Area type="monotone" dataKey="gastos" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorGastos)" />
                  </AreaChart>
              </ChartContainer>
          </CardContent>
      </Card>


      <div className="grid gap-8 lg:grid-cols-5">
          <Card className="lg:col-span-3 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Productos Más Vendidos (Top 3)</CardTitle>
                <CardDescription>Productos que generan mayores ingresos este mes.</CardDescription>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-center">Ventas (Uds.)</TableHead>
                            <TableHead className="text-right">Ingresos</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topProducts.map((prod) => (
                            <TableRow key={prod.id}>
                                <TableCell className="font-medium">{prod.name}</TableCell>
                                <TableCell className="text-center">{prod.sales}</TableCell>
                                <TableCell className="text-right">{prod.revenue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2 bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingDown className="text-red-500"/>Productos con Menor Demanda</CardTitle>
                <CardDescription>Productos con menores ingresos. Considera nuevas estrategias.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Producto</TableHead>
                            <TableHead className="text-center">Ventas</TableHead>
                            <TableHead className="text-right">Ingresos</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bottomProducts.map((prod) => (
                            <TableRow key={prod.id}>
                                <TableCell className="font-medium">{prod.name}</TableCell>
                                <TableCell className="text-center">{prod.sales}</TableCell>
                                <TableCell className="text-right">{prod.revenue}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardContent>
                 <Button asChild variant="outline" className="w-full">
                    <Link href="/estrategias-ventas">Ver Estrategias para Mejorar Ventas <ArrowRight className="ml-2"/></Link>
                </Button>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}

    