"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BarChart3, TrendingUp, BrainCircuit, DollarSign, Users,
  Wifi, Zap, Target, AlertTriangle, Download, Building,
  ArrowUp, ArrowDown, PieChart, LineChart
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const CONSUMO_POR_DEPTO = [
  { depto: "Ventas", lineas: 8, consumoGB: 125.4, costo: 480, tendencia: "+12%", up: true },
  { depto: "Marketing", lineas: 4, consumoGB: 68.2, costo: 240, tendencia: "+5%", up: true },
  { depto: "IT", lineas: 6, consumoGB: 92.1, costo: 360, tendencia: "-8%", up: false },
  { depto: "RR.HH.", lineas: 3, consumoGB: 28.5, costo: 180, tendencia: "+2%", up: true },
  { depto: "Logística", lineas: 5, consumoGB: 45.3, costo: 300, tendencia: "+15%", up: true },
  { depto: "Dirección", lineas: 4, consumoGB: 52.8, costo: 420, tendencia: "-3%", up: false },
];

const PREDICCIONES_IA = [
  { tipo: "Costo Q2 2026", valor: "$2,180", confianza: 92, detalle: "Incremento estimado de 8% por nuevas líneas en Logística" },
  { tipo: "Consumo Datos Q2", valor: "485 GB", confianza: 88, detalle: "Aumento por campaña marketing digital planificada" },
  { tipo: "Líneas Necesarias Q3", valor: "34", confianza: 85, detalle: "Contratación proyectada de 4 nuevos empleados" },
  { tipo: "Ahorro Potencial Anual", valor: "$3,600", confianza: 78, detalle: "Migración a plan corporativo bulk para Ventas e IT" },
];

const GASTOS_MENSUALES = [
  { mes: "Oct", val: 1850 }, { mes: "Nov", val: 1920 }, { mes: "Dic", val: 2100 },
  { mes: "Ene", val: 1980 }, { mes: "Feb", val: 2050 }, { mes: "Mar", val: 1980 },
];

export default function AnaliticaEmpresarialPage() {
  const { toast } = useToast();
  const [periodo, setPeriodo] = useState("Q1-2026");
  const maxGasto = Math.max(...GASTOS_MENSUALES.map(m => m.val));

  const totalLineas = CONSUMO_POR_DEPTO.reduce((s, d) => s + d.lineas, 0);
  const totalConsumo = CONSUMO_POR_DEPTO.reduce((s, d) => s + d.consumoGB, 0);
  const totalCosto = CONSUMO_POR_DEPTO.reduce((s, d) => s + d.costo, 0);

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Flota Empresarial</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Analítica Empresarial</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Inteligencia de consumo y costos con predicciones IA por departamento.</p>
        </div>
        <div className="flex gap-2">
          <Select value={periodo} onValueChange={setPeriodo}>
            <SelectTrigger className="h-9 w-[140px] rounded-lg text-xs"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Q1-2026">Q1 2026</SelectItem>
              <SelectItem value="Q4-2025">Q4 2025</SelectItem>
              <SelectItem value="Q3-2025">Q3 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Líneas", val: `${totalLineas}`, icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Consumo Total", val: `${totalConsumo.toFixed(0)} GB`, icon: Wifi, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Gasto Mensual", val: formatCurrency(totalCosto, 'USD'), icon: DollarSign, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Costo por Línea", val: formatCurrency(totalCosto / totalLineas, 'USD'), icon: Target, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}><stat.icon className={cn("h-3 w-3", stat.color)} /></div>
              </div>
              <p className={cn("text-xl font-black tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <Card className="lg:col-span-3 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><LineChart className="h-4 w-4 text-primary" /></div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Evolución de Costos</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Últimos 6 meses</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-end justify-between gap-3 h-44">
              {GASTOS_MENSUALES.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-bold text-foreground tabular-nums">${m.val}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.val / maxGasto) * 100}%` }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className={cn("w-full rounded-t-lg min-h-[4px]", i === GASTOS_MENSUALES.length - 1 ? "bg-primary" : "bg-primary/30")}
                  />
                  <span className="text-[9px] font-semibold text-muted-foreground">{m.mes}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-500/10 rounded-lg"><BrainCircuit className="h-4 w-4 text-cyan-500" /></div>
              <CardTitle className="text-sm font-semibold text-foreground">Predicciones IA</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-3">
            {PREDICCIONES_IA.map((p, i) => (
              <div key={i} className="p-3 rounded-xl bg-muted/10 border border-border/30">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-muted-foreground">{p.tipo}</span>
                  <Badge variant="outline" className="text-[8px] px-1.5 text-cyan-500 border-cyan-500/20 bg-cyan-500/10">
                    {p.confianza}% conf.
                  </Badge>
                </div>
                <p className="text-sm font-black text-foreground">{p.valor}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5">{p.detalle}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><Building className="h-4 w-4 text-primary" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Consumo por Departamento</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">{CONSUMO_POR_DEPTO.length} departamentos</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {CONSUMO_POR_DEPTO.map((d, i) => (
            <div key={i} className="flex items-center justify-between px-5 py-4 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors">
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">{d.depto}</p>
                  <p className="text-[10px] text-muted-foreground">{d.lineas} líneas</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 text-right">
                <div>
                  <p className="text-xs font-bold text-foreground tabular-nums">{d.consumoGB.toFixed(1)} GB</p>
                  <p className="text-[9px] text-muted-foreground">Consumo</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground tabular-nums">{formatCurrency(d.costo, 'USD')}</p>
                  <p className="text-[9px] text-muted-foreground">Costo</p>
                </div>
                <div>
                  <Badge variant="outline" className={cn("text-[9px] px-1.5", d.up ? "text-rose-500 border-rose-500/20" : "text-emerald-500 border-emerald-500/20")}>
                    {d.up ? <ArrowUp className="h-2 w-2 mr-0.5" /> : <ArrowDown className="h-2 w-2 mr-0.5" />}
                    {d.tendencia}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
