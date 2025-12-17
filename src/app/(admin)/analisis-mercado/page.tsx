
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart as LucideBarChart, Users, DollarSign, ArrowRight, Lightbulb, Zap } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const kpiData = [
    { title: "Tamaño del Mercado", value: formatCurrency(12000000, 'Bs.'), icon: DollarSign, description: "Valor total estimado del mercado de papelería." },
    { title: "Tasa de Crecimiento Anual", value: "8.5%", icon: Users, description: "Crecimiento proyectado para los próximos 12 meses." },
    { title: "Costo de Adquisición de Cliente (CAC)", value: formatCurrency(85, 'Bs.'), icon: DollarSign, description: "Costo promedio para adquirir un nuevo cliente." },
];

const supplyDemandData = [
  { month: 'Ene', demanda: 4000, oferta: 3800 },
  { month: 'Feb', demanda: 3500, oferta: 4200 },
  { month: 'Mar', demanda: 5200, oferta: 4500 },
  { month: 'Abr', demanda: 4800, oferta: 5000 },
  { month: 'May', demanda: 5500, oferta: 5300 },
  { month: 'Jun', demanda: 5100, oferta: 5500 },
  { month: 'Jul', demanda: 6000, oferta: 5800 },
];

const competitorsData = [
    { name: 'OfiExpress', value: 40, color: 'hsl(var(--primary))' },
    { name: 'Papelemax', value: 25, color: 'hsl(var(--secondary-foreground))' },
    { name: 'Tu Empresa', value: 20, color: 'hsl(var(--accent-foreground))' },
    { name: 'Otros', value: 15, color: '#64748b' },
];

const chartConfig = {
  demanda: { label: "Demanda", color: "hsl(var(--primary))" },
  oferta: { label: "Oferta", color: "hsl(var(--secondary))" },
  competitors: { label: "Cuota de Mercado" },
};

const estrategias = [
    "La demanda supera a la oferta en los meses de marzo y julio (inicio de períodos escolares/fiscales). Considerar aumentar el stock preventivamente.",
    "El competidor 'OfiExpress' tiene una cuota de mercado dominante. Analizar su estrategia de precios y promociones para identificar oportunidades.",
    "El CAC es moderado. Implementar campañas de referidos podría reducirlo y aumentar la base de clientes leales."
];

export default function AnalisisMercadoPage() {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <LucideBarChart className="h-8 w-8" />
            Análisis de Mercado
        </h1>
        <p className="text-muted-foreground mt-2">
          Comportamiento del mercado, oferta, demanda y análisis competitivo.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {kpiData.map(kpi => (
            <Card key={kpi.title} className="bg-card/80 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <kpi.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                    <p className="text-xs text-muted-foreground">{kpi.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>

       <div className="grid gap-8 lg:grid-cols-2 mb-8">
            <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Tendencias de Oferta y Demanda</CardTitle>
                    <CardDescription>Evolución mensual de la oferta del mercado vs. la demanda de los consumidores.</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                   <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={supplyDemandData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                />
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent indicator="dot" />}
                                />
                                <Legend />
                                <Bar dataKey="demanda" fill="var(--color-demanda)" radius={4} />
                                <Bar dataKey="oferta" fill="var(--color-oferta)" radius={4} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle>Cuota de Mercado de Competidores</CardTitle>
                    <CardDescription>Distribución del mercado entre los principales actores.</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                    <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                                <Pie
                                    data={competitorsData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {competitorsData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                 <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
       </div>

       <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="text-yellow-400"/>Estrategias y Conclusiones Sugeridas por IA</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {estrategias.map((sol, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm p-3 bg-secondary rounded-lg">
                            <Zap className="h-4 w-4 text-yellow-400 mt-0.5 shrink-0"/>
                            <span>{sol}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
             <CardContent>
                 <Button variant="outline">
                    Ver más recomendaciones <ArrowRight className="ml-2"/>
                </Button>
            </CardContent>
        </Card>

    </div>
  );
}
