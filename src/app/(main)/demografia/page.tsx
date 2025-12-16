
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
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
} satisfies ChartConfig;

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
 