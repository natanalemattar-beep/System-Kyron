

"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart as LucidePieChart, Target } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const costosFijos = [
    { concepto: "Alquiler de Oficina", monto: 1200 },
    { concepto: "Salarios Administrativos", monto: 4500 },
    { concepto: "Servicios Básicos (Luz, Agua, Internet)", monto: 350 },
    { concepto: "Seguros", monto: 200 },
];

const costosVariables = [
    { concepto: "Materia Prima", monto: 3500 },
    { concepto: "Comisiones por Venta (5%)", monto: 2500 },
    { concepto: "Costos de Envío", monto: 800 },
    { concepto: "Publicidad Online (CPC)", monto: 400 },
];

const totalCostosFijos = costosFijos.reduce((acc, item) => acc + item.monto, 0);
const totalCostosVariables = costosVariables.reduce((acc, item) => acc + item.monto, 0);
const totalCostos = totalCostosFijos + totalCostosVariables;

const precioVentaUnitario = 50;
const costoVariableUnitario = 25;
const unidadesVendidas = 1000;
const ventasTotales = precioVentaUnitario * unidadesVendidas;
const margenContribucion = precioVentaUnitario - costoVariableUnitario;
const puntoEquilibrioUnidades = totalCostosFijos / margenContribucion;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const dataFijos = costosFijos.map(item => ({ name: item.concepto, value: item.monto }));
const dataVariables = costosVariables.map(item => ({ name: item.concepto, value: item.monto }));

const chartConfig = {
  value: {
    label: "Monto (Bs.)",
  },
};


export default function EstructuraCostosPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LucidePieChart className="h-8 w-8" />
            Análisis de Estructura de Costos
        </h1>
        <p className="text-muted-foreground mt-2">
          Desglosa y visualiza los costos fijos y variables de tu empresa.
        </p>
      </header>

      <Tabs defaultValue="resumen">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="fijos">Costos Fijos</TabsTrigger>
          <TabsTrigger value="variables">Costos Variables</TabsTrigger>
        </TabsList>
        
        <TabsContent value="resumen" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Costos Fijos Totales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{formatCurrency(totalCostosFijos, 'Bs.')}</p>
                        <p className="text-sm text-muted-foreground">Gastos que no cambian con el volumen de producción.</p>
                    </CardContent>
                </Card>
                <Card className="bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Costos Variables Totales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{formatCurrency(totalCostosVariables, 'Bs.')}</p>
                         <p className="text-sm text-muted-foreground">Gastos que varían directamente con la producción.</p>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2 lg:col-span-1 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>Costo Total de Operación</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-primary">{formatCurrency(totalCostos, 'Bs.')}</p>
                         <p className="text-sm text-muted-foreground">Suma de costos fijos y variables.</p>
                    </CardContent>
                </Card>
                <Card className="lg:col-span-3 bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target />
                            Punto de Equilibrio y Rentabilidad
                        </CardTitle>
                         <CardDescription>Análisis basado en precios y costos unitarios de ejemplo.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4 text-center">
                        <div className="bg-secondary/50 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Margen de Contribución por Unidad</p>
                            <p className="text-2xl font-semibold">{formatCurrency(margenContribucion, 'Bs.')}</p>
                        </div>
                         <div className="bg-secondary/50 p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">Punto de Equilibrio (Unidades)</p>
                            <p className="text-2xl font-semibold">{Math.ceil(puntoEquilibrioUnidades)} Uds.</p>
                        </div>
                         <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                            <p className="text-sm text-green-400">Utilidad Bruta (con {unidadesVendidas} Uds.)</p>
                            <p className="text-2xl font-bold text-green-500">{formatCurrency(ventasTotales - totalCostos, 'Bs.')}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>

        <TabsContent value="fijos" className="mt-6">
           <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Desglose de Costos Fijos</CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                     <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Concepto</TableHead>
                                    <TableHead className="text-right">Monto Mensual</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {costosFijos.map((costo) => (
                                    <TableRow key={costo.concepto}>
                                        <TableCell className="font-medium">{costo.concepto}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(costo.monto, 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="font-bold border-t">
                                    <TableCell>Total</TableCell>
                                    <TableCell className="text-right">{formatCurrency(totalCostosFijos, 'Bs.')}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                     <div className="h-80">
                        <ChartContainer config={chartConfig} className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="name" formatter={(value) => formatCurrency(value as number, 'Bs.')} />} />
                                    <Pie data={dataFijos} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                        {dataFijos.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="variables" className="mt-6">
           <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Desglose de Costos Variables</CardTitle>
                     <CardDescription>Basado en un volumen de ventas de ejemplo, actualizado en tiempo real desde el Punto de Venta.</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-8">
                     <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Concepto</TableHead>
                                    <TableHead className="text-right">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {costosVariables.map((costo) => (
                                    <TableRow key={costo.concepto}>
                                        <TableCell className="font-medium">{costo.concepto}</TableCell>
                                        <TableCell className="text-right">{formatCurrency(costo.monto, 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow className="font-bold border-t">
                                    <TableCell>Total</TableCell>
                                    <TableCell className="text-right">{formatCurrency(totalCostosVariables, 'Bs.')}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="h-80">
                         <ChartContainer config={chartConfig} className="w-full h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent nameKey="name" formatter={(value) => formatCurrency(value as number, 'Bs.')}/>}/>
                                    <Pie data={dataVariables} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                        {dataVariables.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
