
"use client";

import { useEffect, useState, memo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import { format, subDays } from "date-fns";

const chartConfig = {
  completed: {
    label: "Completados",
    color: "hsl(var(--primary))",
  },
  pending: {
    label: "Pendientes",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig;

interface LogEntry {
  evento: string;
  creado_en: string;
}

interface ChartPoint {
  date: string;
  completed: number;
  pending: number;
}

export const DailyTasksChart = memo(function DailyTasksChart() {
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/activity-log?limit=200')
      .then(r => r.ok ? r.json() : { logs: [] })
      .then(data => {
        const logs: LogEntry[] = data.logs ?? [];

        // Build a map for the last 7 days
        const days: ChartPoint[] = Array.from({ length: 7 }, (_, i) => {
          const d = subDays(new Date(), 6 - i);
          return { date: format(d, 'dd/MM'), completed: 0, pending: 0 };
        });

        logs.forEach(log => {
          const logDate = format(new Date(log.creado_en), 'dd/MM');
          const day = days.find(d => d.date === logDate);
          if (!day) return;
          // Events that imply completion vs pending
          const isCompleted = log.evento.includes('OK') || log.evento.includes('COMPLETADO') ||
            log.evento.includes('REGISTRO') || log.evento.includes('PAGO') ||
            log.evento.includes('DECLARACION') || log.evento.includes('NOMINA');
          if (isCompleted) day.completed += 1;
          else day.pending += 1;
        });

        setChartData(days);
      })
      .catch(() => setChartData([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Resumen de Trámites Diarios</CardTitle>
        <CardDescription>Actividad registrada en los últimos 7 días</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-[250px] rounded-xl" />
        ) : (
          <ChartContainer config={chartConfig} className="w-full h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="completed" name="Completados" fill="var(--color-completed)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pendientes" fill="var(--color-pending)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
});
