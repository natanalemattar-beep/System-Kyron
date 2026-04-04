"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Loader2, Inbox } from "lucide-react";

const chartConfig = {
  ingresos: { label: "Ingresos", color: "hsl(var(--primary))" },
  egresos: { label: "Egresos", color: "hsl(var(--destructive))" },
} satisfies ChartConfig;

interface CashFlowItem {
  mes: string;
  ingresos: number;
  egresos: number;
}

export const CashFlowAnalysis = () => {
  const [data, setData] = useState<CashFlowItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analisis/cash-flow')
      .then(r => r.ok ? r.json() : { data: [] })
      .then(d => setData(d.data ?? []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Análisis de Flujo de Caja</CardTitle>
        <CardDescription>Comparativa de ingresos vs. egresos de los últimos meses.</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        {loading ? (
          <div className="flex items-center justify-center h-full gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Cargando datos...</span>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
            <Inbox className="h-8 w-8 opacity-30" />
            <p className="text-sm font-semibold">Sin datos de flujo de caja</p>
            <p className="text-xs text-center">Registra facturas y cuentas por pagar para ver el análisis.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="mes" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                <Legend />
                <Bar dataKey="ingresos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="egresos" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
