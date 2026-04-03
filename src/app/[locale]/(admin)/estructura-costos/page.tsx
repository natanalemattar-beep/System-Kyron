
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartPie as LucidePieChart, Target, Activity, TrendingUp, DollarSign, Zap } from "lucide-react";
import { formatCurrency, formatPercentage, cn } from "@/lib/utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const dataFijos = [
    { name: "Alquiler", value: 1200, fill: "hsl(var(--primary))" },
    { name: "Salarios", value: 4500, fill: "hsl(var(--secondary))" },
    { name: "Servicios", value: 350, fill: "#0ea5e9" },
    { name: "Seguros", value: 200, fill: "#f97316" },
];

const totalCostosFijos = dataFijos.reduce((acc, item) => acc + item.value, 0);
const chartConfig = {
  value: { label: "Monto", color: "hsl(var(--primary))" }
};

export default function EstructuraCostosPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Activity className="h-3 w-3" /> CENTRO DE RENTABILIDAD
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Estructura <span className="text-primary italic">de Costos</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Análisis de Eficiencia • Punto de Equilibrio 2026</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Costos Fijos Mensuales</p>
            <p className="text-4xl font-black italic text-foreground tracking-tight">{formatCurrency(totalCostosFijos, 'Bs.')}</p>
        </Card>
        <Card className="glass-card border-none bg-emerald-500/5 rounded-[2.5rem] p-8 shadow-2xl border-l-4 border-emerald-500">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-4">Punto de Equilibrio</p>
            <p className="text-4xl font-black italic text-emerald-500 tracking-tight">458 Uds.</p>
        </Card>
        <Card className="glass-card border-none bg-primary/5 rounded-[2.5rem] p-8 shadow-2xl border-l-4 border-primary">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 mb-4">Margen Promedio</p>
            <p className="text-4xl font-black italic text-primary tracking-tight">32.5%</p>
        </Card>
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
            <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Desglose de Gastos Operativos</CardTitle>
            </CardHeader>
            <CardContent className="p-10 h-[400px]">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                            <Pie
                                data={dataFijos}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {dataFijos.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Legend verticalAlign="bottom" align="center" iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>

        <div className="lg:col-span-5 space-y-8">
            <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-2xl">
                <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground mb-8">Análisis de Sensibilidad</h3>
                <div className="space-y-6">
                    {[
                        { label: "+10% Precio de Venta", impact: "+15.2% Utilidad", color: "text-emerald-500" },
                        { label: "-5% Costos Fijos", impact: "+8.4% Utilidad", color: "text-emerald-500" },
                        { label: "+15% Volumen", impact: "+22.1% Utilidad", color: "text-emerald-500" }
                    ].map(item => (
                        <div key={item.label} className="p-5 rounded-2xl bg-white/5 border border-border group hover:border-primary/30 transition-all">
                            <p className="text-[9px] font-black uppercase text-muted-foreground/40 mb-1">{item.label}</p>
                            <p className={cn("text-lg font-black italic", item.color)}>{item.impact}</p>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="bg-primary text-primary-foreground rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow border-none group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-4">Maximizar Rentabilidad</h3>
                <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8">El motor de IA sugiere optimizar la logística de última milla para reducir el costo variable en un 12%.</p>
                <Button variant="secondary" className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl">SIMULAR ESCENARIOS</Button>
            </Card>
        </div>
      </div>
    </div>
  );
}
