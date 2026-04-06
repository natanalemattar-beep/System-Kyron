"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, Lightbulb, Activity, Loader2, Inbox, TrendingUp } from "lucide-react";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts';
import { formatCurrency } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import dynamic from "next/dynamic";
const motion = { div: dynamic(() => import('framer-motion').then(m => ({ default: m.motion.div })), { ssr: false }) as any };
import { Link } from "@/navigation";

interface MercadoData {
  total_clientes: number;
  ingreso_promedio_cliente: string;
  total_ingresos: string;
  ventas_mensuales: { mes: string; total: number }[];
}

const chartConfig = {
  total: { label: "Ingresos", color: "hsl(var(--primary))" },
};

export default function AnalisisMercadoPage() {
  const [data, setData] = useState<MercadoData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/analisis/mercado')
      .then(r => r.ok ? r.json() : null)
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const totalClientes = data?.total_clientes ?? 0;
  const ingresoPromedioCliente = parseFloat(data?.ingreso_promedio_cliente ?? '0');
  const totalIngresos = parseFloat(data?.total_ingresos ?? '0');
  const ventasMensuales = data?.ventas_mensuales ?? [];

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-4">
          <Activity className="h-3 w-3" /> CENTRO ESTRATÉGICO
        </div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Análisis <span className="text-primary italic">de Mercado</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Business Intelligence • Telemetría Comercial 2026</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Total Clientes Activos", value: loading ? "—" : String(totalClientes), icon: Users, description: "Clientes registrados en la plataforma." },
          { title: "Ingresos Totales", value: loading ? "—" : formatCurrency(totalIngresos, 'Bs.'), icon: DollarSign, description: "Suma histórica de facturas emitidas." },
          { title: "Ingreso Promedio / Cliente", value: loading ? "—" : formatCurrency(ingresoPromedioCliente, 'Bs.'), icon: TrendingUp, description: "Ticket promedio por cliente activo." },
        ].map((kpi, i) => (
          <motion.div key={kpi.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5"><kpi.icon className="h-16 w-16" /></div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/40 mb-4">{kpi.title}</p>
              <p className="text-3xl font-bold text-foreground tracking-tight mb-2">{kpi.value}</p>
              <p className="text-[11px] font-bold uppercase text-primary/60">{kpi.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-12 mt-10">
        <Card className="lg:col-span-8 glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-lg">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary italic">Ingresos Mensuales</CardTitle>
          </CardHeader>
          <CardContent className="p-10 h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-sm font-semibold">Cargando datos...</span>
              </div>
            ) : ventasMensuales.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
                <Inbox className="h-10 w-10 opacity-30" />
                <p className="text-sm font-bold">Sin datos de ventas</p>
                <p className="text-xs text-center max-w-xs">Registra facturas para ver tendencias de ingresos.</p>
              </div>
            ) : (
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ventasMensuales}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="mes" stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 bg-primary text-primary-foreground rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden border-none group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Lightbulb className="h-32 w-32" /></div>
          <div>
            <h3 className="text-2xl font-semibold uppercase italic tracking-tight mb-6">Insight Maestro</h3>
            <p className="text-sm font-bold opacity-80 leading-relaxed uppercase mb-8">
              Los datos de mercado reflejan el comportamiento real de tus clientes y facturas. 
              Registra más transacciones para obtener tendencias precisas y recomendaciones IA.
            </p>
          </div>
          <Button asChild variant="secondary" className="w-full h-12 bg-white text-primary font-semibold uppercase text-[10px] tracking-widest rounded-xl shadow-lg">
            <Link href="/estrategias-ventas">ESTRATEGIAS IA</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
