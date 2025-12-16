
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { financialChartData } from "@/lib/data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";

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


export function OverviewChart() {
  const recentData = financialChartData.slice(-6); // Get last 6 months

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Resumen Semestral</CardTitle>
        <CardDescription>Trámites completados y pendientes en los últimos 6 meses.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="w-full h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={recentData} accessibilityLayer>
              <XAxis
                dataKey="month"
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
                content={<ChartTooltipContent formatter={(value, name) => `${value} ${(name as string).toLowerCase()}`}/>}
                cursor={{fill: 'hsl(var(--secondary))'}}
              />
              <Legend />
              <Bar dataKey="completed" name="Completados" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="Pendientes" fill="var(--color-pending)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
