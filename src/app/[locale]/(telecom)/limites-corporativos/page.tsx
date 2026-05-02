"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  SlidersHorizontal, Users, Shield, Save, CircleCheck,
  TriangleAlert, TrendingUp, Wifi, Bell, Loader2, Inbox
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface LineaTelecom {
  id: number;
  numero: string;
  operadora: string;
  titular: string | null;
  plan_contratado: string | null;
  activa: boolean;
  uso_datos_gb: string;
  limite_datos_gb: string | null;
}

interface Limites {
  [key: number]: { datos: number; };
}

export default function LimitesCorporativosPage() {
  const { toast } = useToast();
  const [lineas, setLineas] = useState<LineaTelecom[]>([]);
  const [loading, setLoading] = useState(true);
  const [limites, setLimites] = useState<Limites>({});

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/telecom')
      .then(r => r.ok ? r.json() : { lineas: [] })
      .then(d => {
        const ls: LineaTelecom[] = d.lineas ?? [];
        setLineas(ls);
        const init: Limites = {};
        ls.forEach(l => {
          init[l.id] = { datos: parseFloat(l.limite_datos_gb ?? '0') || 0 };
        });
        setLimites(init);
      })
      .catch(() => setLineas([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const [guardando, setGuardando] = useState(false);

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await Promise.all(
        Object.entries(limites).map(([idStr, v]) =>
          fetch('/api/telecom', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: parseInt(idStr), limite_datos_gb: v.datos }),
          })
        )
      );
      toast({
        title: "Límites actualizados",
        description: "Los nuevos límites se aplicarán en el próximo ciclo de facturación.",
        action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
      });
      loadData();
    } catch {
      toast({ title: "Error", description: "No se pudieron guardar los cambios.", variant: "destructive" });
    } finally {
      setGuardando(false);
    }
  };

  const alertas = lineas.filter(l => {
    const uso = parseFloat(l.uso_datos_gb) || 0;
    const limite = parseFloat(l.limite_datos_gb ?? '0') || 0;
    return limite > 0 && uso / limite > 0.9;
  }).length;

  const totalDatos = lineas.reduce((s, l) => s + (parseFloat(l.limite_datos_gb ?? '0') || 0), 0);
  const usoPromedio = lineas.length > 0
    ? lineas.reduce((s, l) => {
        const uso = parseFloat(l.uso_datos_gb) || 0;
        const limite = parseFloat(l.limite_datos_gb ?? '0') || 0;
        return s + (limite > 0 ? (uso / limite) * 100 : 0);
      }, 0) / lineas.length
    : 0;

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 pb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <SlidersHorizontal className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Empresa</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Límites por Línea</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Configura límites de datos por cada línea corporativa.</p>
        </div>
        <Button onClick={handleGuardar} size="sm" disabled={guardando} className="h-9 px-4 rounded-lg text-xs font-semibold shadow-sm">
          {guardando ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Save className="mr-1.5 h-3.5 w-3.5" />}
          {guardando ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Líneas Activas", val: loading ? "—" : `${lineas.filter(l => l.activa).length}`, icon: Users, color: "text-primary", accent: "from-primary/20 to-primary/0", ring: "ring-primary/20", iconBg: "bg-primary/10" },
          { label: "Datos Asignados", val: loading ? "—" : `${totalDatos.toFixed(0)} GB`, icon: Wifi, color: "text-cyan-500", accent: "from-cyan-500/20 to-cyan-500/0", ring: "ring-cyan-500/20", iconBg: "bg-cyan-500/10" },
          { label: "Uso Promedio", val: loading ? "—" : `${usoPromedio.toFixed(0)}%`, icon: TrendingUp, color: "text-emerald-500", accent: "from-emerald-500/20 to-emerald-500/0", ring: "ring-emerald-500/20", iconBg: "bg-emerald-500/10" },
          { label: "Alertas Exceso", val: loading ? "—" : `${alertas}`, icon: TriangleAlert, color: alertas > 0 ? "text-rose-500" : "text-emerald-500", accent: alertas > 0 ? "from-rose-500/20 to-rose-500/0" : "from-emerald-500/20 to-emerald-500/0", ring: alertas > 0 ? "ring-rose-500/20" : "ring-emerald-500/20", iconBg: alertas > 0 ? "bg-rose-500/10" : "bg-emerald-500/10" },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className={cn("kyron-surface p-4 rounded-xl ring-1 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden relative", stat.ring)}>
              <div className={cn("absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r", stat.accent)} />
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</span>
                <div className={cn("p-1.5 rounded-lg", stat.iconBg)}>
                  <stat.icon className={cn("h-3 w-3", stat.color)} />
                </div>
              </div>
              <p className={cn("text-xl font-bold tracking-tight", stat.color)}>{stat.val}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Card className="kyron-surface border-none rounded-2xl overflow-hidden">
        <CardHeader className="p-5 border-b border-border/30">
          <CardTitle className="text-xs font-bold uppercase tracking-widest">Control de Límites por Línea</CardTitle>
          <CardDescription className="text-[10px] mt-0.5">Ajusta el límite de datos para cada número activo</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Cargando líneas...</span>
            </div>
          ) : lineas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
              <Inbox className="h-10 w-10 opacity-30" />
              <p className="text-sm font-bold">Sin líneas registradas</p>
              <p className="text-xs text-center max-w-xs">Registra líneas corporativas para configurar sus límites de consumo.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/10 border-none">
                  <TableHead className="pl-5 py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Titular / Número</TableHead>
                  <TableHead className="py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Operadora</TableHead>
                  <TableHead className="text-center py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Uso Actual</TableHead>
                  <TableHead className="text-center py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Límite (GB)</TableHead>
                  <TableHead className="text-center pr-5 py-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lineas.map(l => {
                  const uso = parseFloat(l.uso_datos_gb) || 0;
                  const limiteActual = limites[l.id]?.datos ?? (parseFloat(l.limite_datos_gb ?? '0') || 0);
                  const excedido = limiteActual > 0 && uso / limiteActual > 0.9;
                  return (
                    <TableRow key={l.id} className="border-border/20 hover:bg-muted/10 transition-all">
                      <TableCell className="pl-5 py-4">
                        <p className="font-bold text-xs text-foreground">{l.titular ?? 'Sin asignar'}</p>
                        <p className="text-[11px] text-muted-foreground font-mono">{l.numero}</p>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{l.operadora}</TableCell>
                      <TableCell className="text-center text-xs font-bold">
                        <span className={excedido ? "text-rose-500" : "text-foreground"}>{uso.toFixed(1)} GB</span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          type="number"
                          min="0"
                          value={limiteActual}
                          onChange={e => setLimites(prev => ({ ...prev, [l.id]: { datos: parseFloat(e.target.value) || 0 } }))}
                          className="w-20 h-8 text-center text-xs rounded-lg mx-auto"
                        />
                      </TableCell>
                      <TableCell className="text-center pr-5">
                        {excedido ? (
                          <Badge className="text-[10px] font-bold bg-rose-500/10 text-rose-500 border-rose-500/20">
                            <TriangleAlert className="h-2.5 w-2.5 mr-1" /> EXCEDIDO
                          </Badge>
                        ) : l.activa ? (
                          <Badge className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                            <CircleCheck className="h-2.5 w-2.5 mr-1" /> NORMAL
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] font-bold">INACTIVA</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="kyron-surface border-none rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Bell className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-foreground mb-1">Alertas de Consumo</p>
            <p className="text-[11px] text-muted-foreground">Las líneas que superen el 90% de su límite asignado serán marcadas automáticamente y recibirás una notificación.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
