"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartPie as LucidePieChart, Target, Activity, TrendingUp, DollarSign, Zap, Loader2, Inbox } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface CostosData {
  total_costos: string;
  margen_bruto: string;
  punto_equilibrio: string;
  desglose: { name: string; value: number; fill: string }[];
}

const chartConfig = {
  value: { label: "Monto", color: "hsl(var(--primary))" }
};

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--secondary))",
  "#0ea5e9",
  "#f97316",
  "#8b5cf6",
  "#10b981",
];

export default function EstructuraCostosPage() {
  const [data, setData] = useState<CostosData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/analisis/costos')
      .then(r => r.ok ? r.json() : null)
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const totalCostos = parseFloat(data?.total_costos ?? '0');
  const margenBruto = parseFloat(data?.margen_bruto ?? '0');
  const desglose = data?.desglose ?? [];

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-4">
          <Activity className="h-3 w-3" /> CENTRO DE RENTABILIDAD
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Estructura <span className="text-primary italic">de Costos</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Análisis de Eficiencia • Punto de Equilibrio 2026</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-lg">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/40 mb-4">Costos Registrados</p>
          <p className="text-4xl font-bold text-foreground tracking-tight">
            {loading ? "—" : formatCurrency(totalCostos, 'Bs.')}
          </p>
        </Card>
        <Card className="glass-card border-none bg-emerald-500/5 rounded-[2.5rem] p-8 shadow-lg border-l-4 border-emerald-500">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-500/60 mb-4">Margen Bruto</p>
          <p className="text-4xl font-bold text-emerald-500 tracking-tight">
            {loading ? "—" : `${margenBruto.toFixed(1)}%`}
          </p>
        </Card>
        <Card className="glass-card border-none bg-primary/5 rounded-[2.5rem] p-8 shadow-lg border-l-4 border-primary">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-primary/60 mb-4">Categorías de Gasto</p>
          <p className="text-4xl font-bold text-primary tracking-tight">
            {loading ? "—" : String(desglose.length)}
          </p>
        </Card>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <Card className="lg:col-span-7 glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-lg">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary italic">Desglose de Gastos Operativos</CardTitle>
          </CardHeader>
          <CardContent className="p-10 h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm">Cargando costos...</span>
              </div>
            ) : desglose.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                <Inbox className="h-10 w-10 opacity-30" />
                <p className="text-sm font-bold">Sin costos registrados</p>
                <p className="text-xs text-center max-w-xs">Registra cuentas por pagar y movimientos para analizar la estructura de costos.</p>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                    <Pie
                      data={desglose}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {desglose.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend verticalAlign="bottom" align="center" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-5 space-y-8">
          <Card className="glass-card border-none p-10 rounded-2xl bg-white/[0.02] shadow-lg">
            <h3 className="text-xl font-semibold uppercase italic tracking-tight text-foreground mb-4">Análisis de Sensibilidad</h3>
            <p className="text-xs text-muted-foreground/60 mb-6">Estimaciones basadas en modelos estándar. Registra tus costos reales para obtener proyecciones personalizadas.</p>
            <div className="space-y-6">
              {[
                { label: "+10% Precio de Venta", impact: "Aumenta utilidad bruta", color: "text-emerald-500" },
                { label: "-5% Costos Fijos", impact: "Reduce punto de equilibrio", color: "text-emerald-500" },
                { label: "+15% Volumen", impact: "Diluye costos fijos", color: "text-emerald-500" }
              ].map(item => (
                <div key={item.label} className="p-5 rounded-2xl bg-white/5 border border-border group hover:border-primary/30 transition-all">
                  <p className="text-[11px] font-semibold uppercase text-muted-foreground/40 mb-1">{item.label}</p>
                  <p className={cn("text-lg font-bold", item.color)}>{item.impact}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden border-none group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
            <h3 className="text-2xl font-semibold uppercase italic tracking-tight mb-4">Maximizar Rentabilidad</h3>
            <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">Registra tus costos reales para obtener recomendaciones precisas del motor de IA sobre optimización de gastos.</p>
            <Button variant="secondary" className="w-full h-12 bg-white text-primary font-semibold uppercase text-[10px] tracking-widest rounded-xl">SIMULAR ESCENARIOS</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
