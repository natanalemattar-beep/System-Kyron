"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard, DollarSign, Users,
  Signal, Wifi, TriangleAlert,
  ChartColumn, PieChart, Download, BrainCircuit,
  Loader2, Inbox
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { ProfileCompletionNotice } from "@/components/dashboard/profile-completion-notice";
import { ModuleLogo } from "@/components/module-logo";

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

export default function DashboardEjecutivoPage() {
  const currentLocale = useLocale();
  const [data, setData] = useState<TelecomDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setLoadError(false);
    fetch('/api/telecom-dashboard')
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setLoadError(true); setLoading(false); });
  }, []);

  useEffect(() => { load(); }, [load]);

  const totalLineas = data?.lineas.total ?? 0;
  const gastoMensual = data?.lineas.gasto_mensual ?? 0;
  const consumoTotal = data?.lineas.consumo_gb ?? 0;
  const promedio = data?.lineas.promedio_por_linea ?? 0;

  const KPI_DATA = useMemo(() => [
    { label: "Líneas Totales", val: loading ? "—" : String(totalLineas), sub: `${data?.lineas.activas ?? 0} activas`, icon: Users, color: "text-primary", borderColor: "border-t-primary/30", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10", trend: totalLineas > 0 ? "Activo" : "—", up: true },
    { label: "Gasto Mensual", val: loading ? "—" : (gastoMensual > 0 ? formatCurrency(gastoMensual, 'USD', currentLocale) : "Sin datos"), sub: "Plan contratado", icon: DollarSign, color: "text-emerald-500", borderColor: "border-t-emerald-500/30", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10", trend: "Mensual", up: true },
    { label: "Consumo Total", val: loading ? "—" : (consumoTotal > 0 ? `${consumoTotal.toFixed(1)} GB` : "Sin datos"), sub: consumoTotal > 0 ? `Promedio ${promedio.toFixed(1)} GB/línea` : "Sin consumo registrado", icon: Wifi, color: "text-cyan-500", borderColor: "border-t-cyan-500/30", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10", trend: "Acumulado", up: true },
    { label: "Líneas Activas", val: loading ? "—" : String(data?.lineas.activas ?? 0), sub: "De la flota total", icon: Signal, color: "text-amber-500", borderColor: "border-t-amber-500/30", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10", trend: totalLineas > 0 ? `${Math.round(((data?.lineas.activas ?? 0) / totalLineas) * 100)}%` : "—", up: true },
  ], [loading, totalLineas, data, gastoMensual, currentLocale, consumoTotal, promedio]);

  const tendencia = useMemo(() => (data?.tendencia && data.tendencia.length > 0 ? data.tendencia : [
    { mes: "Oct", costo: 0, lineas: 0 }, { mes: "Nov", costo: 0, lineas: 0 },
    { mes: "Dic", costo: 0, lineas: 0 }, { mes: "Ene", costo: 0, lineas: 0 },
    { mes: "Feb", costo: 0, lineas: 0 }, { mes: "Mar", costo: 0, lineas: 0 },
  ]), [data]);

  const maxCosto = useMemo(() => Math.max(...tendencia.map(m => m.costo), 1), [tendencia]);

  const distribucion = useMemo(() => (data?.distribucion && data.distribucion.length > 0 ? data.distribucion : []), [data]);

  if (!loading && loadError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-3">
          <TriangleAlert className="h-8 w-8 text-rose-500 mx-auto" />
          <p className="text-sm font-semibold text-foreground">No se pudo cargar el dashboard</p>
          <p className="text-xs text-muted-foreground">Hubo un error al obtener los datos telecom. Intenta de nuevo.</p>
          <Button size="sm" onClick={load} className="rounded-lg text-xs mt-2">Reintentar</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-container animate-in fade-in duration-700">
        <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div className="flex items-center gap-4">
          <ModuleLogo src="/images/module-logos/Linea empresa.jpg" alt="Telecom" size="md" />
          <div>
            <div className="flex items-center gap-2 mb-1 font-tech">
              <LayoutDashboard className="h-4 w-4 text-primary" />
              <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">Flota Empresarial SK-5G</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-foreground uppercase leading-none font-impact">Dashboard <span className="text-primary italic">Ejecutivo</span></h1>
            <p className="text-xs font-bold text-muted-foreground mt-2 uppercase tracking-[0.2em] opacity-50 font-tech">Vista consolidada de KPIs de Infraestructura 2026.</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="h-9 px-4 rounded-lg text-xs font-semibold">
          <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar Reporte
        </Button>
      </motion.header>

      <ProfileCompletionNotice />

      <div className="ds-section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {KPI_DATA.map((kpi, i) => (
          <div key={i} className={cn("ds-card p-4", kpi.borderColor)}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
              <div className="p-2 rounded-lg bg-current/10 ds-kpi-icon"><kpi.icon className={cn("h-3 w-3", kpi.color)} /></div>
            </div>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : (
              <p className={cn("text-xl font-bold tracking-tight", kpi.color)}>{kpi.val}</p>
            )}
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">{kpi.sub}</span>
              <span className={cn("text-xs font-semibold", kpi.up ? "text-emerald-500" : "text-rose-500")}>
                {kpi.trend}
              </span>
            </div>
          </div>
        ))}
        </div>
      </div>

      <div className="ds-section">
      <div className="grid lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-8 ds-card overflow-hidden">
          <CardHeader className="p-6 border-b border-border">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                  <CardTitle className="text-lg font-black uppercase tracking-tighter text-foreground">Radar de Red <span className="text-primary">SK-5G</span></CardTitle>
                </div>
                <CardDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground/40">Monitoreo de latencia y potencia en tiempo real</CardDescription>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-black uppercase text-emerald-400">Red Óptima</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
             <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative flex items-center justify-center">
                   <div className="h-48 w-48 rounded-full border border-border/20 relative">
                      <div className="absolute inset-[25%] rounded-full border border-border/10" />
                      <div className="absolute inset-[50%] rounded-full border border-border/5" />
                   </div>
                   <div className="absolute flex flex-col items-center">
                      <span className="text-2xl font-black text-foreground">12ms</span>
                      <span className="text-xs font-black uppercase text-muted-foreground">Latencia</span>
                   </div>
                </div>
                <div className="space-y-6">
                   {[
                     { label: "Potencia de Señal", val: "-84 dBm", pct: 85, color: "bg-primary" },
                     { label: "Ancho de Banda", val: "1.2 Gbps", pct: 92, color: "bg-primary" },
                     { label: "Estabilidad de Paquetes", val: "99.98%", pct: 99, color: "bg-primary" }
                   ].map(item => (
                     <div key={item.label} className="space-y-2">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                           <span>{item.label}</span>
                           <span className="text-foreground">{item.val}</span>
                        </div>
                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                           <div className={cn("h-full", item.color)} style={{ width: `${item.pct}%` }} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 ds-card p-6">
           <CardHeader className="p-0 mb-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                <CardTitle className="text-xs font-black uppercase tracking-[0.25em] text-muted-foreground">Salud MDM Dispositivos</CardTitle>
              </div>
           </CardHeader>
           <CardContent className="p-0 space-y-4">
              {[
                { name: "iPhone 15 Pro - HQ", status: "Seguro", battery: "88%", color: "text-emerald-500" },
                { name: "S24 Ultra - Ventas", status: "Actualizando", battery: "42%", color: "text-amber-500" },
                { name: "iPad Air - Almacén", status: "Desconectado", battery: "05%", color: "text-rose-500" }
              ].map((dev, i) => (
                <div key={i} className="ds-card p-4 flex items-center justify-between">
                   <div className="space-y-1">
                      <p className="text-xs font-black text-foreground uppercase tracking-widest">{dev.name}</p>
                      <p className={cn("text-xs font-bold uppercase", dev.color)}>{dev.status}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-black text-foreground">{dev.battery}</p>
                      <div className="h-1 w-8 bg-muted rounded-full mt-1 overflow-hidden">
                         <div className="h-full bg-foreground opacity-40" style={{ width: dev.battery }} />
                      </div>
                   </div>
                </div>
              ))}
              <Button variant="outline" className="w-full h-12 rounded-xl border-border text-xs font-black uppercase tracking-widest mt-4">
                 Gestionar Seguridad MDM
              </Button>
           </CardContent>
        </Card>
      </div>
      </div>

      <div className="ds-section">
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 rounded-xl border border-border bg-card shadow-sm shadow-black/[0.02] overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><ChartColumn className="h-4 w-4 text-primary" /></div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">Tendencia de Costos Corporativos</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">Proyección financiera Q2-2026</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-end justify-between gap-3 h-40">
              {tendencia.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-xs font-bold text-foreground tabular-nums">{m.costo > 0 ? `$${m.costo}` : '—'}</span>
                  <div
                    className={cn("w-full rounded-t-lg min-h-[4px]", i === tendencia.length - 1 ? "bg-primary" : "bg-primary/30")}
                    style={{ height: `${(m.costo / maxCosto) * 100}%` }}
                  />
                  <span className="text-xs font-semibold text-muted-foreground">{m.mes}</span>
                  <span className="text-xs text-muted-foreground/60">{m.lineas > 0 ? `${m.lineas}L` : '—'}</span>
                </div>
              ))}
            </div>
            {data?.tendencia?.every(m => m.costo === 0) && (
              <p className="text-xs text-muted-foreground/50 text-center mt-3">Sin datos de costos registrados</p>
            )}
          </CardContent>
        </Card>

        <Card className="ds-card overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg"><PieChart className="h-4 w-4 text-primary" /></div>
              <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
              <CardTitle className="text-sm font-semibold text-foreground">Distribución Global</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-5 space-y-2">
            {loading ? (
              <div className="flex items-center justify-center py-6"><Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /></div>
            ) : distribucion.length === 0 ? (
              <div className="ds-empty-state">
                <Inbox className="h-8 w-8 opacity-20" />
                <p className="text-xs text-muted-foreground text-center">Sin líneas registradas</p>
              </div>
            ) : distribucion.map((d, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={cn("h-2.5 w-2.5 rounded-full", d.color)} />
                <span className="text-xs text-foreground flex-1 truncate">{d.depto}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{d.lineas}L</span>
                <span className="text-xs font-bold text-foreground tabular-nums">{formatCurrency(d.costo, 'USD', currentLocale)}</span>
                <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full", d.color)} style={{ width: `${d.pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="ds-card overflow-hidden">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><BrainCircuit className="h-4 w-4 text-primary" /></div>
            <div className="h-6 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20" />
            <p className="text-sm font-black uppercase tracking-widest text-foreground">Resumen de Inteligencia Telecom</p>
          </div>
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-xs">Generando resumen...</span>
            </div>
          ) : totalLineas === 0 ? (
            <p className="ds-empty-state">
              No hay líneas telecom registradas en el sistema. Registre las líneas corporativas para obtener métricas ejecutivas.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              La flota telecom opera bajo el protocolo <strong>SK-5G</strong> con <strong>{totalLineas} líneas</strong> ({data?.lineas.activas ?? 0} activas). 
              Se detecta una latencia estable de 12ms y una integridad de red del 99.98%.
              {gastoMensual > 0 && <> El gasto mensual consolidado es de <strong>{formatCurrency(gastoMensual, 'USD', currentLocale)}</strong>.</>}
            </p>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
