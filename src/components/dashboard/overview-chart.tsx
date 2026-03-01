"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";
import { historicalFinancialData } from "@/lib/historical-financial-data";
import { Activity } from "lucide-react";

const chartConfig = {
  ingresos: {
    label: "Ingresos",
    color: "hsl(var(--primary))",
  },
  gastos: {
    label: "Gastos",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;


export function OverviewChart() {

  return (
    <Card className="glass-card border-none">
      <CardHeader className="p-10 border-b border-white/5">
        <div className="flex items-center justify-between">
            <div className="space-y-1">
                <CardTitle className="text-[11px] font-black uppercase tracking-[0.6em] text-primary">Pulso Financiero Anual</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest opacity-40">Análisis comparativo de ingresos y egresos</CardDescription>
            </div>
            <Activity className="h-5 w-5 text-primary/30" />
        </div>
      </CardHeader>
      <CardContent className="p-10">
        <div className="h-[350px] w-full">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historicalFinancialData.slice(-12)} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                          <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-ingresos)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="var(--color-ingresos)" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--color-gastos)" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="var(--color-gastos)" stopOpacity={0}/>
                          </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#475569" 
                        fontSize={10} 
                        fontWeight="900"
                        axisLine={false} 
                        tickLine={false} 
                        tickMargin={15}
                      />
                      <YAxis 
                        stroke="#475569" 
                        fontSize={10} 
                        fontWeight="900"
                        axisLine={false} 
                        tickLine={false} 
                        tickFormatter={(value) => `${(value as number) / 1000}k`} 
                      />
                      <ChartTooltip 
                          cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                          content={<ChartTooltipContent 
                              indicator="dot" 
                              formatter={(value) => formatCurrency(value as number, 'Bs.')} 
                          />} 
                      />
                      <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
                      <Area type="monotone" dataKey="ingresos" stroke="var(--color-ingresos)" strokeWidth={4} fillOpacity={1} fill="url(#colorIngresos)" />
                      <Area type="monotone" dataKey="gastos" stroke="var(--color-gastos)" strokeWidth={4} fillOpacity={1} fill="url(#colorGastos)" />
                  </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}