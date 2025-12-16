
"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { dailyChartData } from "@/lib/data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

const chartConfig = {
  completed: {
    label: "Completados",
    color: "hsl(var(--primary))",
  },
  pending: {
    label: "Pendientes",
    color: "hsl(var(--accent))",
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
        <CardTitle>Resumen Mensual (Julio 2024)</CardTitle>
        <CardDescription>Actividad diaria de trámites completados vs. pendientes.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-[250px] w-full pl-2">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyChartData} accessibilityLayer margin={{ left: -20, top: 10 }}>
                   <defs>
                      <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-completed)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-completed)" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-pending)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-pending)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  <XAxis
                    dataKey="date"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                  />
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    cursorClassName="fill-muted"
                  />
                  <Legend />
                  <Area type="monotone" dataKey="completed" stroke="var(--color-completed)" fill="url(#colorCompleted)" />
                  <Area type="monotone" dataKey="pending" stroke="var(--color-pending)" fill="url(#colorPending)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
        </div>
        <div>
          <h4 className="font-semibold text-md mb-3">Alertas y Actividades Clave del Día</h4>
          <ul className="space-y-3">
             {dailyAlerts.map((alert, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                    <alert.icon className={`h-5 w-5 mt-0.5 shrink-0 ${alert.color}`} />
                    <p className="text-sm">{alert.text}</p>
                </li>
             ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
