
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const cashFlowData = [
  { month: 'Ene', ingresos: 4000, egresos: 2400 },
  { month: 'Feb', ingresos: 3000, egresos: 1398 },
  { month: 'Mar', ingresos: 2000, egresos: 9800 },
  { month: 'Abr', ingresos: 2780, egresos: 3908 },
  { month: 'May', ingresos: 1890, egresos: 4800 },
  { month: 'Jun', ingresos: 2390, egresos: 3800 },
];

export const CashFlowAnalysis = () => {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>Análisis de Flujo de Caja</CardTitle>
                <CardDescription>Comparativa de ingresos vs. egresos de los últimos meses.</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
                <ChartContainer config={{}} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cashFlowData}>
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                            <Tooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(value as number, 'Bs.')}/>} cursor={{ fill: 'hsl(var(--accent))', opacity: 0.5 }}/>
                            <Legend />
                            <Bar dataKey="ingresos" name="Ingresos" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="egresos" name="Egresos" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
