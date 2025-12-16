
"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { dailyChartData } from "@/lib/data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { historicalFinancialData } from "@/lib/historical-financial-data";


const chartConfig = {
  completed: {
    label: "Completados",
    color: "hsl(var(--primary))",
  },
  pending: {
    label: "Pendientes",
    color: "hsl(var(--accent))",
  },
   ingresos: {
    label: "Ingresos",
    color: "hsl(var(--primary))",
  },
  gastos: {
    label: "Gastos",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

const dailyAlerts = [
    { text: "La solicitud de Antecedentes Penales (AP-2024-005) fue aprobada.", icon: CheckCircle, color: "text-green-500" },
    { text: "El trámite de Partida de Nacimiento (PN-2024-003) ha entrado en fase de revisión.", icon: Clock, color: "text-yellow-500" },
    { text: "Faltan recaudos para la solicitud del RIF del menor (RF-2024-010).", icon: AlertTriangle, color: "text-red-500" },
];

export function OverviewChart() {

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Pulso Financiero (Últimos 12 meses)</CardTitle>
        <CardDescription>Evolución de ingresos vs. gastos para medir la rentabilidad.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[250px] w-full pl-2">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalFinancialData.slice(-12)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                          <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-ingresos)" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="var(--color-ingresos)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-gastos)" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="var(--color-gastos)" stopOpacity={0}/>
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
                      <Area type="monotone" dataKey="ingresos" stroke="var(--color-ingresos)" fillOpacity={1} fill="url(#colorIngresos)" />
                      <Area type="monotone" dataKey="gastos" stroke="var(--color-gastos)" fillOpacity={1} fill="url(#colorGastos)" />
                  </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
