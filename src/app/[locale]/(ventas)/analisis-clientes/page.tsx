"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BackButton } from "@/components/back-button";
import { Users, TrendingUp, DollarSign, BarChart3, ArrowLeft, Activity, Star, Target, Clock, AlertTriangle, Plus, Trash2, Crown, Award, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface ClientRow {
  id: string;
  name: string;
  revenue: number;
  cost: number;
  paymentDays: string;
}

function createEmptyClient(): ClientRow {
  return {
    id: crypto.randomUUID(),
    name: "",
    revenue: 0,
    cost: 0,
    paymentDays: "30",
  };
}

export default function AnalisisClientesPage() {
  const { toast } = useToast();
  const [clients, setClients] = useState<ClientRow[]>([
    createEmptyClient(),
    createEmptyClient(),
    createEmptyClient(),
  ]);

  const updateClient = (id: string, field: keyof ClientRow, value: string | number) => {
    setClients((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addClient = () => {
    setClients((prev) => [...prev, createEmptyClient()]);
    toast({ title: "Cliente agregado", description: "Nueva fila añadida al análisis." });
  };

  const removeClient = (id: string) => {
    if (clients.length <= 1) {
      toast({ title: "Mínimo 1 cliente", description: "Debe haber al menos un cliente.", variant: "destructive" });
      return;
    }
    setClients((prev) => prev.filter((c) => c.id !== id));
  };

  const validClients = useMemo(() => clients.filter((c) => c.name.trim() && c.revenue > 0), [clients]);

  const analysis = useMemo(() => {
    if (validClients.length === 0) return null;

    const totalRevenue = validClients.reduce((s, c) => s + c.revenue, 0);
    const totalCost = validClients.reduce((s, c) => s + c.cost, 0);
    const avgProfitability = totalRevenue > 0 ? ((totalRevenue - totalCost) / totalRevenue) * 100 : 0;

    const withMargin = validClients
      .map((c) => ({
        ...c,
        margin: c.revenue > 0 ? ((c.revenue - c.cost) / c.revenue) * 100 : 0,
        revenueShare: (c.revenue / totalRevenue) * 100,
      }))
      .sort((a, b) => b.revenue - a.revenue);

    let cumRevenue = 0;
    const classified = withMargin.map((c, i) => {
      cumRevenue += c.revenue;
      const cumPct = (cumRevenue / totalRevenue) * 100;
      let abcClass: "A" | "B" | "C";
      if (cumPct <= 80 && i < Math.ceil(validClients.length * 0.2)) {
        abcClass = "A";
      } else if (cumPct <= 95) {
        abcClass = "B";
      } else {
        abcClass = "C";
      }
      return { ...c, abcClass };
    });

    const topClient = classified.reduce((best, c) => (c.margin > best.margin ? c : best), classified[0]);

    const classACount = classified.filter((c) => c.abcClass === "A").length;
    const classBCount = classified.filter((c) => c.abcClass === "B").length;
    const classCCount = classified.filter((c) => c.abcClass === "C").length;
    const classARevenue = classified.filter((c) => c.abcClass === "A").reduce((s, c) => s + c.revenue, 0);

    let pareto80Revenue = 0;
    let pareto80Count = 0;
    for (const c of classified) {
      pareto80Revenue += c.revenue;
      pareto80Count++;
      if (pareto80Revenue / totalRevenue >= 0.8) break;
    }
    const pareto80Pct = ((pareto80Count / validClients.length) * 100).toFixed(0);
    const paretoRevenuePct = ((pareto80Revenue / totalRevenue) * 100).toFixed(0);

    const recommendations: string[] = [];
    if (classified.length > 0 && classified[0].revenueShare > 35) {
      recommendations.push(`El cliente "${classified[0].name}" genera el ${classified[0].revenueShare.toFixed(0)}% de tus ingresos — diversifica tu cartera`);
    }
    const unprofitableC = classified.filter((c) => c.abcClass === "C" && c.margin < 15);
    if (unprofitableC.length > 0) {
      recommendations.push(`${unprofitableC.length} cliente(s) Clase C no son rentables — considera renegociar condiciones`);
    }
    const slowPayers = classified.filter((c) => parseInt(c.paymentDays) >= 45);
    if (slowPayers.length > 0) {
      recommendations.push(`${slowPayers.length} cliente(s) con plazos de pago ≥45 días — evalúa incentivos por pronto pago`);
    }
    if (avgProfitability < 20) {
      recommendations.push("Tu rentabilidad promedio es menor al 20% — revisa tu estructura de costos");
    }
    if (classACount === 1) {
      recommendations.push("Solo tienes 1 cliente Clase A — alto riesgo de concentración de ingresos");
    }
    if (recommendations.length === 0) {
      recommendations.push("Tu cartera de clientes está bien diversificada — ¡sigue así!");
    }

    return {
      totalRevenue,
      totalCost,
      avgProfitability,
      topClient,
      classified,
      classACount,
      classBCount,
      classCCount,
      classARevenue,
      pareto80Pct,
      paretoRevenuePct,
      recommendations,
    };
  }, [validClients]);

  const fmt = (n: number) => n.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
      </div>

      <div>
        <BackButton href="/facturacion" label="Facturación" />
        <motion.header
          className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[9px] font-black uppercase tracking-[0.3em] text-violet-400 mb-4">
              <Users className="h-3 w-3" /> ANÁLISIS DE CLIENTES
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
              Análisis de{" "}
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent italic">
                Clientes
              </span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">
              Rentabilidad, Clasificación ABC y Distribución de Ingresos
            </p>
          </div>
        </motion.header>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
          <CardHeader className="p-6 border-b border-border/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/15">
                  <Plus className="h-4 w-4 text-violet-400" />
                </div>
                <div>
                  <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Datos de Clientes</CardTitle>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Ingresa los datos de tus clientes para analizar</p>
                </div>
              </div>
              <Button onClick={addClient} size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-9 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-[0_8px_30px_-5px_rgba(139,92,246,0.3)]">
                <Plus className="mr-1.5 h-3.5 w-3.5" /> Agregar Cliente
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              {clients.map((client, index) => (
                <motion.div
                  key={client.id}
                  className="grid grid-cols-1 md:grid-cols-[1fr_150px_150px_120px_40px] gap-3 items-end p-4 rounded-xl border border-border/30 bg-card/30 hover:border-violet-500/20 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Nombre del Cliente</Label>
                    <Input
                      placeholder="Ej: Corporación ABC"
                      value={client.name}
                      onChange={(e) => updateClient(client.id, "name", e.target.value)}
                      className="h-9 rounded-lg bg-background/50 border-border/30 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ingreso (Bs/mes)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={client.revenue || ""}
                      onChange={(e) => updateClient(client.id, "revenue", parseFloat(e.target.value) || 0)}
                      className="h-9 rounded-lg bg-background/50 border-border/30 text-sm font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Costo (Bs/mes)</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={client.cost || ""}
                      onChange={(e) => updateClient(client.id, "cost", parseFloat(e.target.value) || 0)}
                      className="h-9 rounded-lg bg-background/50 border-border/30 text-sm font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Plazo (días)</Label>
                    <Select value={client.paymentDays} onValueChange={(v) => updateClient(client.id, "paymentDays", v)}>
                      <SelectTrigger className="h-9 rounded-lg bg-background/50 border-border/30 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 días</SelectItem>
                        <SelectItem value="30">30 días</SelectItem>
                        <SelectItem value="45">45 días</SelectItem>
                        <SelectItem value="60">60 días</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10"
                    onClick={() => removeClient(client.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {analysis && (
        <>
          <motion.div
            className="grid gap-4 md:grid-cols-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { label: "Ingresos Totales", value: `Bs ${fmt(analysis.totalRevenue)}`, icon: DollarSign, color: "emerald" },
              { label: "Costos Totales", value: `Bs ${fmt(analysis.totalCost)}`, icon: BarChart3, color: "rose" },
              { label: "Rentabilidad Promedio", value: `${analysis.avgProfitability.toFixed(1)}%`, icon: TrendingUp, color: "violet" },
              { label: "Top Cliente", value: analysis.topClient.name, icon: Crown, color: "amber" },
            ].map((stat, i) => (
              <Card key={i} className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden hover:border-violet-500/20 transition-all group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                      <p className={cn(
                        "text-xl font-black mt-2 truncate",
                        stat.color === "emerald" && "text-emerald-400",
                        stat.color === "rose" && "text-rose-400",
                        stat.color === "violet" && "text-violet-400",
                        stat.color === "amber" && "text-amber-400"
                      )}>
                        {stat.value}
                      </p>
                    </div>
                    <div className={cn(
                      "p-2.5 rounded-xl border transition-transform group-hover:scale-110",
                      stat.color === "emerald" && "bg-emerald-500/10 border-emerald-500/15",
                      stat.color === "rose" && "bg-rose-500/10 border-rose-500/15",
                      stat.color === "violet" && "bg-violet-500/10 border-violet-500/15",
                      stat.color === "amber" && "bg-amber-500/10 border-amber-500/15"
                    )}>
                      <stat.icon className={cn(
                        "h-4 w-4",
                        stat.color === "emerald" && "text-emerald-400",
                        stat.color === "rose" && "text-rose-400",
                        stat.color === "violet" && "text-violet-400",
                        stat.color === "amber" && "text-amber-400"
                      )} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <motion.div
            className="grid gap-4 md:grid-cols-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {[
              { label: "Clase A", count: analysis.classACount, desc: "Top 20% ingresos", color: "emerald" },
              { label: "Clase B", count: analysis.classBCount, desc: "Siguiente 30%", color: "amber" },
              { label: "Clase C", count: analysis.classCCount, desc: "Último 50%", color: "rose" },
            ].map((cls, i) => (
              <div key={i} className={cn(
                "flex items-center gap-4 p-4 rounded-xl border transition-all",
                cls.color === "emerald" && "border-emerald-500/15 bg-emerald-500/[0.03] hover:bg-emerald-500/[0.06]",
                cls.color === "amber" && "border-amber-500/15 bg-amber-500/[0.03] hover:bg-amber-500/[0.06]",
                cls.color === "rose" && "border-rose-500/15 bg-rose-500/[0.03] hover:bg-rose-500/[0.06]"
              )}>
                <div className={cn(
                  "p-2.5 rounded-xl border",
                  cls.color === "emerald" && "bg-emerald-500/10 border-emerald-500/15",
                  cls.color === "amber" && "bg-amber-500/10 border-amber-500/15",
                  cls.color === "rose" && "bg-rose-500/10 border-rose-500/15"
                )}>
                  <Target className={cn(
                    "h-4 w-4",
                    cls.color === "emerald" && "text-emerald-400",
                    cls.color === "amber" && "text-amber-400",
                    cls.color === "rose" && "text-rose-400"
                  )} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">{cls.label}</p>
                  <p className="text-2xl font-black">{cls.count}</p>
                </div>
                <p className="text-[10px] text-muted-foreground">{cls.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
              <CardHeader className="p-6 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/15">
                    <Award className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Ranking de Clientes</CardTitle>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Ordenados por ingreso de mayor a menor</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border/20">
                        <th className="text-left p-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">#</th>
                        <th className="text-left p-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Cliente</th>
                        <th className="text-right p-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Ingreso</th>
                        <th className="text-right p-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Costo</th>
                        <th className="text-right p-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Margen</th>
                        <th className="text-center p-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Clase</th>
                        <th className="text-center p-4 text-[10px] font-black uppercase tracking-wider text-muted-foreground">Plazo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysis.classified.map((c, i) => (
                        <tr key={c.id} className="border-b border-border/10 hover:bg-violet-500/[0.03] transition-colors">
                          <td className="p-4 font-mono text-muted-foreground">
                            {i === 0 ? <Crown className="h-4 w-4 text-amber-400" /> : i < 3 ? <Star className="h-4 w-4 text-violet-400" /> : <span>{i + 1}</span>}
                          </td>
                          <td className="p-4 font-bold">{c.name}</td>
                          <td className="p-4 text-right font-mono">{fmt(c.revenue)}</td>
                          <td className="p-4 text-right font-mono text-muted-foreground">{fmt(c.cost)}</td>
                          <td className={cn(
                            "p-4 text-right font-mono font-bold",
                            c.margin > 30 && "text-emerald-400",
                            c.margin >= 15 && c.margin <= 30 && "text-amber-400",
                            c.margin < 15 && "text-rose-400"
                          )}>
                            {c.margin.toFixed(1)}%
                          </td>
                          <td className="p-4 text-center">
                            <Badge className={cn(
                              "text-[9px] font-black uppercase tracking-wider",
                              c.abcClass === "A" && "bg-emerald-500/15 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
                              c.abcClass === "B" && "bg-amber-500/15 text-amber-400 border-amber-500/20 hover:bg-amber-500/20",
                              c.abcClass === "C" && "bg-rose-500/15 text-rose-400 border-rose-500/20 hover:bg-rose-500/20"
                            )}>
                              {c.abcClass}
                            </Badge>
                          </td>
                          <td className="p-4 text-center">
                            <div className="inline-flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span className="text-xs font-mono">{c.paymentDays}d</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
              <CardHeader className="p-6 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/15">
                    <PieChart className="h-4 w-4 text-violet-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Distribución de Ingresos</CardTitle>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Participación de cada cliente en el ingreso total</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {analysis.classified.map((c) => (
                  <div key={c.id} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold truncate max-w-[200px]">{c.name}</span>
                      <span className="text-sm font-mono text-muted-foreground">{c.revenueShare.toFixed(1)}%</span>
                    </div>
                    <div className="relative h-6 rounded-lg bg-card/80 border border-border/20 overflow-hidden">
                      <motion.div
                        className={cn(
                          "absolute inset-y-0 left-0 rounded-lg",
                          c.abcClass === "A" && "bg-gradient-to-r from-emerald-600 to-emerald-500",
                          c.abcClass === "B" && "bg-gradient-to-r from-amber-600 to-amber-500",
                          c.abcClass === "C" && "bg-gradient-to-r from-rose-600 to-rose-500"
                        )}
                        initial={{ width: 0 }}
                        animate={{ width: `${c.revenueShare}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                      <div className="absolute inset-0 flex items-center px-3">
                        <span className="text-[10px] font-bold text-white drop-shadow-sm">Bs {fmt(c.revenue)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-4 p-5 rounded-xl border border-violet-500/20 bg-violet-500/[0.04]">
              <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/15">
                <Activity className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">Indicador Pareto (80/20)</p>
                <p className="text-lg font-black mt-1">
                  El <span className="text-violet-400">{analysis.paretoRevenuePct}%</span> de tus ingresos proviene del <span className="text-violet-400">{analysis.pareto80Pct}%</span> de tus clientes
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
            <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
              <CardHeader className="p-6 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/15">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Recomendaciones</CardTitle>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Insights basados en tu cartera de clientes</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {analysis.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] hover:bg-amber-500/[0.05] transition-all group">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/15 shrink-0 mt-0.5 transition-transform group-hover:scale-110">
                      <Star className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                    <p className="text-sm text-foreground/80">{rec}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}

      {!analysis && (
        <motion.div
          className="flex flex-col items-center justify-center py-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/15 mb-4">
            <Users className="h-8 w-8 text-violet-400" />
          </div>
          <p className="text-lg font-bold">Ingresa datos de clientes para ver el análisis</p>
          <p className="text-sm text-muted-foreground mt-1">Agrega al menos un cliente con nombre e ingresos</p>
        </motion.div>
      )}
    </div>
  );
}
