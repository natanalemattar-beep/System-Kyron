"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";
import { TrendingUp, ShoppingCart, DollarSign, ArrowRight, Download, RefreshCw, Star, Activity, Loader2, Inbox, Package } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Link } from "@/navigation";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import dynamic from "next/dynamic";
const motion = { div: dynamic(() => import('framer-motion').then(m => ({ default: m.motion.div })), { ssr: false }) as any };
import { useToast } from "@/hooks/use-toast";

interface ResumenVentas {
  total_facturas: number;
  ingresos_mes: string;
  ticket_promedio: string;
  top_productos: { nombre: string; ventas: number; ingresos: string }[];
  flujo_mensual: { mes: string; ingresos: number }[];
}

const chartConfig = {
  ingresos: { label: "Ventas", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

export default function AnalisisVentasPage() {
  const { toast } = useToast();
  const [data, setData] = useState<ResumenVentas | null>(null);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/analisis/ventas')
      .then(r => r.ok ? r.json() : null)
      .then(d => setData(d))
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const ingresosMes = parseFloat(data?.ingresos_mes ?? '0');
  const ticketPromedio = parseFloat(data?.ticket_promedio ?? '0');
  const totalFacturas = data?.total_facturas ?? 0;
  const topProductos = data?.top_productos ?? [];
  const flujoMensual = data?.flujo_mensual ?? [];

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-4">
            <Activity className="h-3 w-3" /> CENTRO COMERCIAL
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Análisis <span className="text-primary italic">Comercial</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Business Intelligence • Telemetría de Ventas 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-widest border-border bg-card/50" onClick={() => toast({ title: "REPORTE EXPORTADO" })}>
            <Download className="mr-2 h-4 w-4" /> DESCARGAR DATA
          </Button>
          <Button asChild className="h-12 px-8 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg">
            <Link href="/estrategias-ventas">ESTRATEGIA IA <ArrowRight className="ml-2 h-4 w-4"/></Link>
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Ingresos Mes", val: loading ? "—" : formatCurrency(ingresosMes, 'Bs.'), icon: DollarSign },
          { label: "Total Facturas", val: loading ? "—" : String(totalFacturas), icon: ShoppingCart },
          { label: "Ticket Promedio", val: loading ? "—" : formatCurrency(ticketPromedio, 'Bs.'), icon: TrendingUp },
          { label: "Top Productos", val: loading ? "—" : String(topProductos.length), icon: RefreshCw },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-6 rounded-xl shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">{kpi.label}</p>
              <kpi.icon className="h-4 w-4 text-primary/40" />
            </div>
            <p className="text-2xl font-bold text-foreground tracking-tight">{kpi.val}</p>
          </Card>
        ))}
      </div>

      <Card className="glass-card border-none rounded-2xl bg-card/40 overflow-hidden shadow-lg">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
          <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary italic">Flujo de Ingresos Mensual</CardTitle>
        </CardHeader>
        <CardContent className="p-10 h-[400px]">
          {loading ? (
            <div className="flex items-center justify-center h-full gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-semibold">Cargando datos...</span>
            </div>
          ) : flujoMensual.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-3">
              <Inbox className="h-10 w-10 opacity-30" />
              <p className="text-sm font-bold">Sin datos de ventas</p>
              <p className="text-xs text-center max-w-xs">Registra facturas para ver el flujo de ingresos histórico.</p>
            </div>
          ) : (
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={flujoMensual}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="mes" stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                  <YAxis stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                  <Area type="monotone" dataKey="ingresos" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-10 lg:grid-cols-12">
        <Card className="lg:col-span-8 glass-card border-none rounded-2xl bg-card/40 overflow-hidden">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-primary italic">Ranking de Productos del Inventario</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs">Cargando...</span>
              </div>
            ) : topProductos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
                <Package className="h-8 w-8 opacity-30" />
                <p className="text-sm font-bold">Sin productos en inventario</p>
                <p className="text-xs text-center max-w-xs">Agrega productos al inventario para ver el ranking de ventas.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 border-none">
                    <TableHead className="pl-10 py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Producto</TableHead>
                    <TableHead className="text-center py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Ventas</TableHead>
                    <TableHead className="text-right pr-10 py-5 text-[11px] font-semibold uppercase tracking-widest opacity-30">Ingresos</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProductos.map((p, i) => (
                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                      <TableCell className="pl-10 py-6 font-semibold text-xs text-foreground/80 uppercase italic">{p.nombre}</TableCell>
                      <TableCell className="text-center py-6 font-semibold text-sm text-foreground/60">{p.ventas}</TableCell>
                      <TableCell className="text-right pr-10 py-6 font-mono text-sm font-bold text-primary">{formatCurrency(parseFloat(p.ingresos), 'Bs.')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 bg-[#050505] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center group">
          <Star className="h-16 w-16 text-yellow-400 fill-yellow-400 mb-6 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-semibold uppercase italic tracking-tight text-white mb-2">Análisis IA</h3>
          <p className="text-[10px] font-bold text-white/30 uppercase tracking-wide mb-8">Motor de Recomendaciones</p>
          <Button asChild variant="outline" className="w-full h-12 rounded-xl font-bold text-[11px] uppercase tracking-widest border-white/10 text-white/60">
            <Link href="/estrategias-ventas">Ver Estrategias</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}
