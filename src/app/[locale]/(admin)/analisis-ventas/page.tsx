"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ShoppingCart, DollarSign, ArrowRight, Download, RefreshCw, Star, Activity } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { Link } from "@/navigation";
import { historicalFinancialData } from "@/lib/historical-financial-data";
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

const topProducts = [
    { id: "PROD-002", name: "Impresora Fiscal", sales: 45, revenue: 15750 },
    { id: "PROD-003", name: "Punto de Venta", sales: 50, revenue: 14000 },
    { id: "PROD-005", name: "Tóner Kyron", sales: 110, revenue: 9350 },
];

const chartConfig = {
  ingresos: { label: "Ventas", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

export default function AnalisisVentasPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Activity className="h-3 w-3" /> NODO COMERCIAL
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Análisis <span className="text-primary italic">Comercial</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Business Intelligence • Telemetría de Ventas 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50" onClick={() => toast({ title: "REPORTE EXPORTADO" })}>
            <Download className="mr-2 h-4 w-4" /> DESCARGAR DATA
          </Button>
          <Button asChild className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
            <Link href="/estrategias-ventas">ESTRATEGIA IA <ArrowRight className="ml-2 h-4 w-4"/></Link>
          </Button>
        </div>
      </header>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
            { label: "Ingresos Mes", val: formatCurrency(62000, 'Bs.'), trend: "+12.7%", icon: DollarSign },
            { label: "Volumen Ventas", val: "335 Uds.", trend: "+18%", icon: ShoppingCart },
            { label: "Ticket Promedio", val: formatCurrency(185.30, 'Bs.'), trend: "-1.5%", icon: TrendingUp },
            { label: "Rotación", val: "4.2 Ciclos", trend: "Normal", icon: RefreshCw },
        ].map((kpi, i) => (
            <Card key={i} className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl">
                <div className="flex justify-between items-center mb-4">
                    <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</p>
                    <kpi.icon className="h-4 w-4 text-primary/40" />
                </div>
                <p className="text-2xl font-black italic text-foreground tracking-tighter">{kpi.val}</p>
                <p className={cn("text-[8px] font-black uppercase mt-2", kpi.trend.startsWith('+') ? "text-emerald-500" : "text-rose-500")}>{kpi.trend}</p>
            </Card>
        ))}
      </div>

       <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
              <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Flujo de Ingresos Anual</CardTitle>
          </CardHeader>
          <CardContent className="p-10 h-[400px]">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={historicalFinancialData.slice(-12)}>
                          <defs>
                              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                              </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                          <XAxis dataKey="month" stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                          <YAxis stroke="#475569" fontSize={10} fontWeight="900" axisLine={false} tickLine={false} />
                          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                          <Area type="monotone" dataKey="ingresos" stroke="hsl(var(--primary))" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                  </ResponsiveContainer>
              </ChartContainer>
          </CardContent>
      </Card>

      <div className="grid gap-10 lg:grid-cols-12">
          <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden">
            <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Ranking de Productos (Top 3)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                 <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 border-none">
                            <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Producto</TableHead>
                            <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Ventas</TableHead>
                            <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Ingresos</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topProducts.map((p) => (
                            <TableRow key={p.id} className="border-border/50 hover:bg-muted/20 transition-all">
                                <TableCell className="pl-10 py-6 font-black text-xs text-foreground/80 uppercase italic">{p.name}</TableCell>
                                <TableCell className="text-center py-6 font-black text-sm text-foreground/60">{p.sales}</TableCell>
                                <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary">{formatCurrency(p.revenue, 'Bs.')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        
        <Card className="lg:col-span-4 bg-[#050505] border border-white/10 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center group">
            <Star className="h-16 w-16 text-yellow-400 fill-yellow-400 mb-6 group-hover:scale-110 transition-transform shadow-glow" />
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">Producto Estrella</h3>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mb-8">IMPRESORA FISCAL TÉRMICA</p>
            <Button variant="outline" className="w-full h-12 rounded-xl font-black text-[9px] uppercase tracking-widest border-white/10 text-white/60">Ver Detalle</Button>
        </Card>
      </div>
    </div>
  );
}
