"use client";

import React, { useState } from "react";
import { Calculator, TrendingUp, TrendingDown, Target, AlertTriangle, Download, Plus, BarChart3, Zap, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const categorias = [
  {
    nombre: "Ingresos por Ventas",
    presupuestado: 8000000,
    ejecutado: 7500000,
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    nombre: "Ingresos por Servicios",
    presupuestado: 1500000,
    ejecutado: 1200000,
    icon: TrendingUp,
    color: "text-emerald-500",
  },
  {
    nombre: "Costo de Ventas",
    presupuestado: 4200000,
    ejecutado: 4467075,
    icon: TrendingDown,
    color: "text-amber-500",
  },
  {
    nombre: "Gastos de Administración",
    presupuestado: 1300000,
    ejecutado: 1200000,
    icon: Calculator,
    color: "text-primary",
  },
  {
    nombre: "Gastos de Ventas",
    presupuestado: 700000,
    ejecutado: 600000,
    icon: Calculator,
    color: "text-primary",
  },
  {
    nombre: "Gastos Financieros",
    presupuestado: 200000,
    ejecutado: 180000,
    icon: Calculator,
    color: "text-rose-500",
  },
  {
    nombre: "Depreciación",
    presupuestado: 310000,
    ejecutado: 306655,
    icon: Calculator,
    color: "text-violet-500",
  },
  {
    nombre: "Inversiones CAPEX",
    presupuestado: 500000,
    ejecutado: 320000,
    icon: Target,
    color: "text-cyan-500",
  },
];

const fmt = (n: number) => `Bs. ${n.toLocaleString('es-VE', { minimumFractionDigits: 0 })}`;

export default function PresupuestoPage() {
  const { toast } = useToast();
  const [year] = useState(2026);

  const totalPresupuestado = categorias.reduce((s, c) => s + c.presupuestado, 0);
  const totalEjecutado = categorias.reduce((s, c) => s + c.ejecutado, 0);
  const desviacionTotal = ((totalEjecutado - totalPresupuestado) / totalPresupuestado * 100).toFixed(1);

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Target className="h-3 w-3" /> PLANIFICACIÓN FINANCIERA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Presupuesto <span className="text-primary italic">Empresarial</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Planificación • Ejecución vs. Real • Desviaciones • Proyecciones {year}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Plus className="h-4 w-4" /> NUEVA PARTIDA
          </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Presupuestado", val: fmt(totalPresupuestado), icon: Target, color: "text-primary" },
          { label: "Ejecutado", val: fmt(totalEjecutado), icon: BarChart3, color: "text-emerald-500" },
          { label: "Desviación", val: `${desviacionTotal}%`, icon: parseFloat(desviacionTotal) > 0 ? ArrowUpRight : ArrowDownRight, color: parseFloat(desviacionTotal) > 5 ? "text-rose-500" : "text-emerald-500" },
          { label: "Ejecución", val: `${(totalEjecutado / totalPresupuestado * 100).toFixed(0)}%`, icon: Zap, color: "text-cyan-500" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="bg-card/60 border-border/50 p-5 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
              <p className={cn("text-xl font-black tracking-tight", kpi.color)}>{kpi.val}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        {categorias.map((cat, i) => {
          const pct = (cat.ejecutado / cat.presupuestado) * 100;
          const desviacion = ((cat.ejecutado - cat.presupuestado) / cat.presupuestado * 100).toFixed(1);
          const esExceso = cat.ejecutado > cat.presupuestado;

          return (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <cat.icon className={cn("h-5 w-5", cat.color)} />
                    <div>
                      <p className="text-sm font-bold">{cat.nombre}</p>
                      <p className="text-[10px] text-muted-foreground">
                        Presupuesto: {fmt(cat.presupuestado)} | Ejecutado: {fmt(cat.ejecutado)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={cn("text-[9px] font-bold", esExceso ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500")}>
                      {esExceso ? "+" : ""}{desviacion}%
                    </Badge>
                  </div>
                </div>
                <Progress value={Math.min(pct, 100)} className="h-2" />
                <div className="flex justify-between mt-1.5">
                  <span className="text-[9px] text-muted-foreground">{pct.toFixed(0)}% ejecutado</span>
                  <span className="text-[9px] text-muted-foreground font-mono">
                    {esExceso ? `Exceso: ${fmt(cat.ejecutado - cat.presupuestado)}` : `Disponible: ${fmt(cat.presupuestado - cat.ejecutado)}`}
                  </span>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {categorias.some(c => c.ejecutado > c.presupuestado) && (
        <Card className="border-amber-500/20 bg-amber-500/[0.03] rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-black text-amber-600 uppercase tracking-wider">Alerta de Desviación</p>
              <p className="text-[11px] text-muted-foreground mt-1">
                {categorias.filter(c => c.ejecutado > c.presupuestado).length} partida(s) presupuestaria(s) exceden el monto planificado.
                Se recomienda revisar la estructura de costos y ajustar las proyecciones para el próximo trimestre.
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
