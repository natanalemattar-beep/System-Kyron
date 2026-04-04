"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, DollarSign, Users, Wifi, Target, Download, Loader2, Inbox } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface Linea {
  id: number;
  numero: string;
  plan: string;
  departamento: string | null;
  limite_gb: string | null;
  consumo_actual_gb: string | null;
  costo_mensual: string | null;
  estado: string;
}

export default function AnaliticaEmpresarialPage() {
  const { toast } = useToast();
  const [lineas, setLineas] = useState<Linea[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/telecom')
      .then(r => r.ok ? r.json() : { lineas: [] })
      .then(d => setLineas(d.lineas ?? []))
      .catch(() => setLineas([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const totalLineas = lineas.length;
  const totalConsumo = lineas.reduce((s, l) => s + (parseFloat(l.consumo_actual_gb ?? '0') || 0), 0);
  const totalCosto = lineas.reduce((s, l) => s + (parseFloat(l.costo_mensual ?? '0') || 0), 0);
  const costoPorLinea = totalLineas > 0 ? totalCosto / totalLineas : 0;

  const deptoMap: Record<string, { depto: string; lineas: number; consumoGB: number; costo: number }> = {};
  for (const l of lineas) {
    const d = l.departamento ?? 'Sin Departamento';
    if (!deptoMap[d]) deptoMap[d] = { depto: d, lineas: 0, consumoGB: 0, costo: 0 };
    deptoMap[d].lineas++;
    deptoMap[d].consumoGB += parseFloat(l.consumo_actual_gb ?? '0') || 0;
    deptoMap[d].costo += parseFloat(l.costo_mensual ?? '0') || 0;
  }
  const deptoData = Object.values(deptoMap).sort((a, b) => b.costo - a.costo);

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Flota Empresarial</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Analítica Empresarial</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Inteligencia de consumo y costos por departamento.</p>
        </div>
        <Button variant="outline" size="sm" className="h-9 rounded-lg text-xs font-semibold" onClick={() => toast({ title: "Exportando...", description: "Generando reporte de flota empresarial." })}>
          <Download className="mr-1.5 h-3.5 w-3.5" /> Exportar
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Total Líneas", val: loading ? "—" : String(totalLineas), icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Consumo Total", val: loading ? "—" : `${totalConsumo.toFixed(0)} GB`, icon: Wifi, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Gasto Mensual", val: loading ? "—" : formatCurrency(totalCosto, 'USD'), icon: DollarSign, color: "text-amber-500", accent: "from-amber-500/20 to-amber-500/0", ring: "ring-amber-500/20", iconBg: "bg-amber-500/10" },
          { label: "Costo por Línea", val: loading ? "—" : formatCurrency(costoPorLinea, 'USD'), icon: Target, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
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

      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <CardHeader className="px-5 py-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg"><BarChart3 className="h-4 w-4 text-primary" /></div>
            <div>
              <CardTitle className="text-sm font-semibold text-foreground">Consumo por Departamento</CardTitle>
              <CardDescription className="text-[10px] text-muted-foreground">Distribución de líneas y costos</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {loading ? (
            <div className="flex items-center justify-center py-8 gap-3 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-sm">Cargando datos de flota...</span>
            </div>
          ) : deptoData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10 opacity-30" />
              <p className="text-sm font-bold">Sin líneas registradas</p>
              <p className="text-xs text-center max-w-xs">Registra líneas corporativas en Gestión de Flota para ver el análisis por departamento.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {deptoData.map(d => (
                <div key={d.depto} className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border hover:border-border/70 transition-all">
                  <div>
                    <p className="font-semibold text-sm">{d.depto}</p>
                    <p className="text-xs text-muted-foreground">{d.lineas} {d.lineas === 1 ? 'línea' : 'líneas'} · {d.consumoGB.toFixed(1)} GB</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-500">{formatCurrency(d.costo, 'USD')}</p>
                    <p className="text-xs text-muted-foreground">mensual</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {!loading && lineas.length > 0 && (
        <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
          <CardHeader className="px-5 py-4 border-b border-border/50">
            <CardTitle className="text-sm font-semibold text-foreground">Detalle de Líneas Activas</CardTitle>
          </CardHeader>
          <CardContent className="p-5">
            <div className="space-y-2">
              {lineas.slice(0, 10).map(l => (
                <div key={l.id} className="flex items-center justify-between py-2 border-b border-border/20 last:border-0">
                  <div>
                    <p className="text-sm font-mono font-bold">{l.numero}</p>
                    <p className="text-xs text-muted-foreground">{l.plan} {l.departamento ? `· ${l.departamento}` : ''}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold">{parseFloat(l.consumo_actual_gb ?? '0').toFixed(1)} GB</p>
                    <p className="text-xs text-muted-foreground">{l.costo_mensual ? `$${parseFloat(l.costo_mensual).toFixed(2)}/mes` : '—'}</p>
                  </div>
                </div>
              ))}
              {lineas.length > 10 && <p className="text-xs text-muted-foreground text-center pt-2">+{lineas.length - 10} líneas más</p>}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
