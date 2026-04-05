"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { Activity, Loader2, Inbox } from "lucide-react";

const chartConfig = {
  ingresos: { label: "Ingresos", color: "hsl(var(--primary))" },
  gastos: { label: "Gastos", color: "hsl(var(--destructive))" },
} satisfies ChartConfig;

interface ChartItem {
  mes: string;
  ingresos: number;
  gastos: number;
}

export function OverviewChart() {
  const [data, setData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analisis/cash-flow')
      .then(r => r.ok ? r.json() : { data: [] })
      .then(d => {
        const items: ChartItem[] = (d.data ?? []).map((item: Record<string, unknown>) => ({
          mes: item.mes as string,
          ingresos: item.ingresos as number,
          gastos: item.egresos as number,
        }));
        setData(items);
      })
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="glass-card border-none">
      <CardHeader className="p-10 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-[11px] font-semibold uppercase tracking-wider text-primary">Pulso Financiero Anual</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Análisis comparativo de ingresos y egresos</CardDescription>
          </div>
          <Activity className="h-5 w-5 text-primary/30" />
        </div>
      </CardHeader>
      <CardContent className="p-10">
        <div className="h-[350px] w-full">
          {loading ? (
            <div className="flex items-center justify-center h-full gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando datos financieros...</span>
            </div>
          ) : data.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
              <Inbox className="h-10 w-10 opacity-30" />
              <p className="text-sm font-semibold">Sin datos financieros aún</p>
              <p className="text-xs text-center max-w-xs opacity-60">Registra facturas y gastos para ver el pulso financiero de tu empresa.</p>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-ingresos)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-ingresos)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-gastos)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--color-gastos)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="mes" stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} tickMargin={15} />
                  <YAxis stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} tickFormatter={v => `${(v as number) / 1000}k`} />
                  <ChartTooltip cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} content={<ChartTooltipContent indicator="dot" formatter={v => formatCurrency(v as number, 'Bs.')} />} />
                  <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                  <Area type="monotone" dataKey="ingresos" stroke="var(--color-ingresos)" strokeWidth={4} fillOpacity={1} fill="url(#colorIngresos)" />
                  <Area type="monotone" dataKey="gastos" stroke="var(--color-gastos)" strokeWidth={4} fillOpacity={1} fill="url(#colorGastos)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
