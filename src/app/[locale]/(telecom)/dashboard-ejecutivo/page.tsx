"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, TrendingUp, TrendingDown, DollarSign, Users,
  Signal, Shield, Wifi, Zap, AlertTriangle, CircleCheck,
  BarChart3, PieChart, Building, Download, BrainCircuit,
  ArrowUp, ArrowDown, Loader2
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";

interface TelecomDashboardData {
  lineas: {
    total: number;
    activas: number;
    gasto_mensual: number;
    consumo_gb: number;
    promedio_por_linea: number;
  };
  distribucion: Array<{
    depto: string;
    lineas: number;
    costo: number;
    consumo: number;
    pct: number;
    color: string;
  }>;
  tendencia: Array<{ mes: string; costo: number; lineas: number }>;
}

const ALERTAS_EJECUTIVAS = [
  { tipo: "warning", titulo: "3 permisos por vencer", desc: "Licencia Red Privada vence en 97 días. Iniciar renovación.", fecha: "03/04/2026" },
  { tipo: "info", titulo: "Reporte CONATEL Q1 pendiente", desc: "Generar y enviar reporte trimestral SIT antes del 10/04/2026.", fecha: "01/04/2026" },
  { tipo: "success", titulo: "FIDETEL Q4 pagado", desc: "Contribución de $124.50 procesada exitosamente.", fecha: "28/03/2026" },
  { tipo: "warning", titulo: "1 dispositivo no cumple MDM", desc: "Galaxy A55 — Luis M. sin cifrado, VPN ni antivirus.", fecha: "02/04/2026" },
];

const ALERTA_ICON_MAP = {
  warning: AlertTriangle,
  info: BarChart3,
  success: CircleCheck,
};

const ALERTA_COLOR_MAP = {
  warning: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  info: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  success: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
};

export default function DashboardEjecutivoPage() {
  const currentLocale = useLocale();
  const [data, setData] = useState<TelecomDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    fetch('/api/telecom-dashboard')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setLoadError(true); setLoading(false); });
  }, []);

  const totalLineas = data?.lineas.total ?? 0;
  const gastoMensual = data?.lineas.gasto_mensual ?? 0;
  const consumoTotal = data?.lineas.consumo_gb ?? 0;
  const promedio = data?.lineas.promedio_por_linea ?? 0;

  const KPI_DATA = [
    { label: "Líneas Totales", val: loading ? "—" : String(totalLineas), sub: `${data?.lineas.activas ?? 0} activas`, icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10", trend: totalLineas > 0 ? "Activo" : "—", up: true },
    { label: "Gasto Mensual", val: loading ? "—" : formatCurrency(gastoMensual, 'USD', currentLocale), sub: "Plan contratado", icon: DollarSign, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10", trend: "Mensual", up: gastoMensual < 2000 },
    { label: "Consumo Total", val: loading ? "—" : `${consumoTotal.toFixed(1)} GB`, sub: `Promedio ${promedio.toFixed(1)} GB/línea`, icon: Wifi, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10", trend: "+8%", up: true },
    { label: "Cumplimiento CONATEL", val: "98.5%", sub: "Todos los permisos vigentes", icon: Shield, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10", trend: "+1.2%", up: true },
  ];

  const tendencia = data?.tendencia && data.tendencia.length > 0 ? data.tendencia : [
    { mes: "Oct", costo: 0, lineas: 0 }, { mes: "Nov", costo: 0, lineas: 0 },
    { mes: "Dic", costo: 0, lineas: 0 }, { mes: "Ene", costo: 0, lineas: 0 },
    { mes: "Feb", costo: 0, lineas: 0 }, { mes: "Mar", costo: 0, lineas: 0 },
  ];
  const maxCosto = Math.max(...tendencia.map(m => m.costo), 1);

  const distribucion = data?.distribucion && data.distribucion.length > 0
    ? data.distribucion
    : [];

  if (!loading && loadError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <AlertTriangle className="h-8 w-8 text-rose-500 mx-auto" />
          <p className="text-sm font-semibold text-foreground">No se pudo cargar el dashboard</p>
          <p className="text-xs text-muted-foreground">Hubo un error al obtener los datos telecom. Intenta de nuevo.</p>
          <Button size="sm" onClick={() => { setLoadError(false); setLoading(true); fetch('/api/telecom-dashboard').then(r => r.ok ? r.json() : Promise.reject()).then(d => { setData(d); setLoading(false); }).catch(() => { setLoadError(true); setLoading(false); }); }} className="rounded-lg text-xs mt-2">Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Flota Empresarial</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Dashboard Ejecutivo</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Vista consolidada de KPIs para la Dirección.</p>
        </div>
        <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold">
          <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar Reporte
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPI_DATA.map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", kpi.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", kpi.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <div className={cn("p-1.5 rounded-lg", kpi.iconBg)}><kpi.icon className={cn("h-3 w-3", kpi.color)} /></div>
              </div>
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <p className={cn("text-xl font-black tracking-tight", kpi.color)}>{kpi.val}</p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-[9px] text-muted-foreground">{kpi.sub}</span>
                <Badge variant="outline" className={cn("text-[8px] px-1", kpi.up ? "text-emerald-500 border-emerald-500/20" : "text-rose-500 border-rose-500/20")}>
                  {kpi.up ? <ArrowUp className="h-2 w-2 mr-0.5" /> : <ArrowDown className="h-2 w-2 mr-0.5" />}
                  {kpi.trend}
                </Badge>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2 bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><BarChart3 className="h-4 w-4 text-primary" /></div>
              <div>
                <CardTitle className="text-sm font-semibold text-foreground">Tendencia de Costos</CardTitle>
                <CardDescription className="text-[10px] text-muted-foreground">Últimos 6 meses</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-end justify-between gap-3 h-40">
              {tendencia.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-bold text-foreground tabular-nums">{m.costo > 0 ? `$${m.costo}` : '—'}</span>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(m.costo / maxCosto) * 100}%` }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className={cn("w-full rounded-t-lg min-h-[4px]", i === tendencia.length - 1 ? "bg-primary" : "bg-primary/30")}
                  />
                  <span className="text-[9px] font-semibold text-muted-foreground">{m.mes}</span>
                  <span className="text-[8px] text-muted-foreground/60">{m.lineas > 0 ? `${m.lineas}L` : '—'}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><PieChart className="h-4 w-4 text-primary" /></div>
              <CardTitle className="text-sm font-semibold text-foreground">Distribución por Titular</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-2">
            {distribucion.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">{loading ? 'Cargando...' : 'Sin líneas registradas'}</p>
            ) : (
              distribucion.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={cn("h-2.5 w-2.5 rounded-full", d.color)} />
                  <span className="text-xs text-foreground flex-1 truncate">{d.depto}</span>
                  <span className="text-[10px] text-muted-foreground tabular-nums">{d.lineas}L</span>
                  <span className="text-xs font-bold text-foreground tabular-nums">{formatCurrency(d.costo, 'USD', currentLocale)}</span>
                  <div className="h-1.5 w-16 bg-muted/30 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", d.color)} style={{ width: `${d.pct}%` }} />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg"><AlertTriangle className="h-4 w-4 text-amber-500" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Alertas Ejecutivas</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">{ALERTAS_EJECUTIVAS.length} alertas activas</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5 space-y-3">
          {ALERTAS_EJECUTIVAS.map((a, i) => {
            const Icon = ALERTA_ICON_MAP[a.tipo as keyof typeof ALERTA_ICON_MAP];
            const colors = ALERTA_COLOR_MAP[a.tipo as keyof typeof ALERTA_COLOR_MAP];
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <div className={cn("p-4 rounded-xl border flex items-start gap-3", colors)}>
                  <Icon className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold">{a.titulo}</p>
                      <span className="text-[9px] text-muted-foreground">{a.fecha}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{a.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 rounded-xl overflow-hidden">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><BrainCircuit className="h-4 w-4 text-primary" /></div>
              <p className="text-sm font-bold text-foreground">Resumen Ejecutivo</p>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              La flota telecom opera con <strong>{totalLineas > 0 ? `${totalLineas} líneas` : 'líneas pendientes de registro'}</strong>.
              {gastoMensual > 0 && <> El gasto mensual es de <strong>{formatCurrency(gastoMensual, 'USD', currentLocale)}</strong> en planes activos.</>}
              {' '}El cumplimiento regulatorio CONATEL se mantiene en <strong>98.5%</strong> con todos los permisos vigentes.
              Se recomienda iniciar la renovación de la licencia de Red Privada (97 días restantes) y completar
              la actualización MDM del dispositivo no conforme.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardContent className="p-5 space-y-3">
            <p className="text-sm font-bold text-foreground">Acciones Prioritarias</p>
            <div className="space-y-2">
              {[
                { action: "Generar reporte SIT Q1 2026", prioridad: "Alta", icon: BarChart3 },
                { action: "Renovar licencia Red Privada Corp.", prioridad: "Media", icon: Shield },
                { action: "Resolver no-cumplimiento MDM (1 equipo)", prioridad: "Media", icon: Zap },
                { action: "Recertificar 2 titulares pendientes/vencidos", prioridad: "Alta", icon: Users },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/10 border border-border/30">
                  <a.icon className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="text-xs text-foreground flex-1">{a.action}</span>
                  <Badge variant="outline" className={cn("text-[8px] px-1.5", a.prioridad === "Alta" ? "text-rose-500 border-rose-500/20" : "text-amber-500 border-amber-500/20")}>
                    {a.prioridad}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
