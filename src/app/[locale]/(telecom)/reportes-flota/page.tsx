"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartLine, Users, Wifi, DollarSign, Download, TrendingUp,
  TrendingDown, Building2, Calendar, FileText, ChartColumn
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const DEPTOS = [
  { nombre: "Ventas", lineas: 8, consumoGB: 180, gastoUSD: 520, tendencia: "+12%" },
  { nombre: "Marketing", lineas: 4, consumoGB: 95, gastoUSD: 280, tendencia: "+5%" },
  { nombre: "IT", lineas: 6, consumoGB: 45, gastoUSD: 190, tendencia: "-3%" },
  { nombre: "RR.HH.", lineas: 3, consumoGB: 28, gastoUSD: 120, tendencia: "+1%" },
  { nombre: "Contabilidad", lineas: 2, consumoGB: 15, gastoUSD: 80, tendencia: "-8%" },
  { nombre: "Dirección", lineas: 3, consumoGB: 65, gastoUSD: 250, tendencia: "+2%" },
];

const MESES = [
  { mes: "Oct", gasto: 1150, consumo: 280 },
  { mes: "Nov", gasto: 1220, consumo: 310 },
  { mes: "Dic", gasto: 1380, consumo: 345 },
  { mes: "Ene", gasto: 1290, consumo: 320 },
  { mes: "Feb", gasto: 1350, consumo: 335 },
  { mes: "Mar", gasto: 1440, consumo: 428 },
];

export default function ReportesFlotaPage() {
  const { toast } = useToast();

  const totalLineas = DEPTOS.reduce((s, d) => s + d.lineas, 0);
  const totalConsumo = DEPTOS.reduce((s, d) => s + d.consumoGB, 0);
  const totalGasto = DEPTOS.reduce((s, d) => s + d.gastoUSD, 0);
  const maxGasto = Math.max(...MESES.map(m => m.gasto));

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ChartLine className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Empresa</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Reportes de Flota</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Análisis detallado de consumo y gastos por departamento.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold"
            onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'exportando', descripcion: "Exportando" }) }); if (res.ok) toast({ title: "Exportando", description: "Generando reporte Excel..." }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
            <Download className="mr-1.5 h-3.5 w-3.5" /> Excel
          </Button>
          <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold"
            onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'telecom', subcategoria: 'exportando', descripcion: "Exportando" }) }); if (res.ok) toast({ title: "Exportando", description: "Generando reporte PDF..." }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
            <FileText className="mr-1.5 h-3.5 w-3.5" /> PDF
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Líneas", val: `${totalLineas}`, icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Consumo Total", val: `${totalConsumo} GB`, icon: Wifi, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Gasto Mensual", val: formatCurrency(totalGasto, 'USD'), icon: DollarSign, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Costo/Línea", val: formatCurrency(totalGasto / totalLineas, 'USD'), icon: TrendingUp, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-bold tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><ChartColumn className="h-4 w-4 text-primary" /></div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Gasto Mensual</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Últimos 6 meses (USD)</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-end justify-between gap-3 h-44">
              {MESES.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-bold text-foreground tabular-nums">${m.gasto}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.gasto / maxGasto) * 100}%` }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className={cn("w-full rounded-t-lg min-h-[4px]", i === MESES.length - 1 ? "bg-primary" : "bg-primary/30")}
                  />
                  <span className="text-[11px] font-semibold text-muted-foreground">{m.mes}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><Building2 className="h-4 w-4 text-primary" /></div>
              <CardTitle className="text-sm font-semibold text-foreground">Top Departamentos</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {DEPTOS.sort((a, b) => b.gastoUSD - a.gastoUSD).map((d, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-md bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{i + 1}</div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{d.nombre}</p>
                    <p className="text-[10px] text-muted-foreground">{d.lineas} líneas · {d.consumoGB} GB</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-foreground tabular-nums">{formatCurrency(d.gastoUSD, 'USD')}</p>
                  <p className={cn("text-[10px] font-semibold flex items-center gap-0.5 justify-end", d.tendencia.startsWith('+') ? "text-rose-500" : "text-emerald-500")}>
                    {d.tendencia.startsWith('+') ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                    {d.tendencia}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg"><Calendar className="h-4 w-4 text-amber-500" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Desglose por Departamento</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">Consumo y gasto del mes actual</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DEPTOS.map((d, i) => {
              const pctGasto = (d.gastoUSD / totalGasto) * 100;
              return (
                <div key={i} className="p-4 rounded-xl bg-muted/10 border border-border/40 space-y-3 hover:border-primary/20 transition-colors">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-foreground">{d.nombre}</p>
                    <Badge variant="outline" className="text-[11px] px-1.5">{d.lineas} líneas</Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">Datos</span>
                      <span className="font-semibold text-foreground">{d.consumoGB} GB</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">Gasto</span>
                      <span className="font-semibold text-foreground">{formatCurrency(d.gastoUSD, 'USD')}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-muted-foreground">% del Total</span>
                      <span className="font-semibold text-primary">{pctGasto.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${pctGasto}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
