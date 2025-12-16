
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Globe, Building, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { CartesianGrid } from "recharts";

const globalStats = [
    { title: "Población Mundial", value: "8.1 Billones", icon: Globe },
    { title: "Tasa de Crecimiento Anual", value: "0.88%", icon: TrendingUp },
    { title: "Población Urbana", value: "57%", icon: Building },
    { title: "Edad Media Global", value: "30.5 años", icon: Users },
];

const pymesData = [
    { name: "Comercio", value: 45, fill: "hsl(var(--primary))" },
    { name: "Servicios", value: 35, fill: "hsl(var(--accent-foreground))" },
    { name: "Manufactura", value: 15, fill: "#64748b" },
    { name: "Otros", value: 5, fill: "#94a3b8" },
];

const comercioData = [
    { year: 2022, ecommerceGrowth: 15 },
    { year: 2023, ecommerceGrowth: 22 },
    { year: 2024, ecommerceGrowth: 28 },
    { year: 2025, ecommerceGrowth: 35 },
];

const chartConfig = {
  ecommerceGrowth: {
    label: "Crecimiento E-commerce (%)",
    color: "hsl(var(--primary))",
  },
  demanda: {
    label: "Demanda",
    color: "hsl(var(--primary))",
  },
  oferta: {
    label: "Oferta",
    color: "hsl(var(--secondary))",
  },
    competitors: {
    label: "Cuota de Mercado",
  },
} satisfies ChartConfig;

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

export default function DemografiaPage() {
  return (
    <div className="space-y-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8" />
            Análisis Demográfico y de Mercado
        </h1>
        <p className="text-muted-foreground mt-2">
          Visión global del panorama demográfico y análisis de los sectores donde opera System C.M.S.
        </p>
      </header>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>Demografía Mundial: Indicadores Clave</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalStats.map(stat => (
                <div key={stat.title} className="p-6 bg-secondary/50 rounded-lg text-center">
                    <stat.icon className="h-10 w-10 text-primary mx-auto mb-4"/>
                    <p className="text-3xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
                </div>
            ))}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Distribución de PYMES en Venezuela</CardTitle>
                <CardDescription>Porcentaje de pequeñas y medianas empresas por sector económico.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                            <Pie
                                data={pymesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                dataKey="value"
                                nameKey="name"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {pymesData.map((entry) => (
                                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Crecimiento del E-commerce</CardTitle>
                <CardDescription>Proyección de crecimiento anual del comercio electrónico.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comercioData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} />
                            <YAxis tickFormatter={(value) => `${value}%`} />
                            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                            <Legend />
                            <Bar dataKey="ecommerceGrowth" fill="var(--color-ecommerceGrowth)" radius={4} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
