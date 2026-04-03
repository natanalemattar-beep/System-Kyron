
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartBar as LucideBarChart, Users, DollarSign, ArrowRight, Lightbulb, Zap, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';
import { formatCurrency } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { motion } from "framer-motion";

const kpiData = [
    { title: "Tamaño del Mercado", value: formatCurrency(12000000, 'Bs.'), icon: DollarSign, description: "Valor total estimado del sector." },
    { title: "Crecimiento Anual", value: "8.5%", icon: Users, description: "Proyección próximos 12 meses." },
    { title: "Costo Adquisición", value: formatCurrency(85, 'Bs.'), icon: DollarSign, description: "CAC promedio por cliente." },
];

const supplyDemandData = [
  { month: 'Ene', demanda: 4000, oferta: 3800 },
  { month: 'Feb', demanda: 3500, oferta: 4200 },
  { month: 'Mar', demanda: 5200, oferta: 4500 },
  { month: 'Abr', demanda: 4800, oferta: 5000 },
  { month: 'May', demanda: 5500, oferta: 5300 },
  { month: 'Jun', demanda: 5100, oferta: 5500 },
];

const chartConfig = {
  demanda: { label: "Demanda", color: "hsl(var(--primary))" },
  oferta: { label: "Oferta", color: "hsl(var(--secondary))" },
};

export default function AnalisisMercadoPage() {
  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Activity className="h-3 w-3" /> CENTRO ESTRATÉGICO
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Análisis <span className="text-primary italic">de Mercado</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Business Intelligence • Telemetría Comercial 2026</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi, i) => (
            <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5"><kpi.icon className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">{kpi.title}</p>
                    <p className="text-3xl font-black italic text-foreground tracking-tight mb-2">{kpi.value}</p>
                    <p className="text-[9px] font-bold uppercase text-primary/60">{kpi.description}</p>
                </Card>
            </motion.div>
        ))}
      </div>

       <div className="grid gap-10 lg:grid-cols-12 mt-10">
            <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Tendencias de Oferta y Demanda</CardTitle>
                </CardHeader>
                <CardContent className="p-10 h-[400px]">
                   <ChartContainer config={chartConfig} className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={supplyDemandData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                                <YAxis stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                                <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                <Bar dataKey="demanda" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="oferta" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="lg:col-span-4 bg-primary text-primary-foreground rounded-[3rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow border-none group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Lightbulb className="h-32 w-32" /></div>
                <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6">Insight Maestro</h3>
                    <p className="text-sm font-bold opacity-80 leading-relaxed uppercase mb-8">La demanda supera a la oferta en los meses de marzo y julio. El motor IA recomienda inyectar un 20% más de stock preventivo para capturar el excedente de mercado.</p>
                </div>
                <Button variant="secondary" className="w-full h-12 bg-white text-primary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">DETALLES TÉCNICOS</Button>
            </Card>
       </div>
    </div>
  );
}
