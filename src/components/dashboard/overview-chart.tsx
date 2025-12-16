
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { financialChartData } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export function OverviewChart() {
  const recentData = financialChartData.slice(-6); // Get last 6 months

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen Semestral</CardTitle>
        <CardDescription>Trámites completados y pendientes en los últimos 6 meses.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={recentData}>
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
            <Tooltip
              content={<ChartTooltipContent formatter={(value, name) => `${value} ${name.toLowerCase()}`}/>}
            />
            <Legend />
            <Bar dataKey="completed" name="Completados" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="pending" name="Pendientes" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
