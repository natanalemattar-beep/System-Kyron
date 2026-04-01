"use client";

import React from "react";
import { Layers, Building2, Truck, Headphones, Megaphone, Server, Users, Download, Plus, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const centros = [
  {
    codigo: "CC-ADM",
    nombre: "Administración y Finanzas",
    responsable: "Lcda. María Rodríguez",
    icon: Building2,
    color: "text-primary",
    bg: "bg-primary/10",
    presupuesto: 1300000,
    ejecutado: 1200000,
    ingresos: 0,
    gastosDetalle: [
      { concepto: "Nómina Administrativa", monto: "Bs. 680.000" },
      { concepto: "Servicios Públicos", monto: "Bs. 45.000" },
      { concepto: "Suministros de Oficina", monto: "Bs. 32.000" },
      { concepto: "Honorarios Profesionales", monto: "Bs. 180.000" },
      { concepto: "Depreciación Equipos", monto: "Bs. 15.000" },
      { concepto: "Otros Gastos", monto: "Bs. 248.000" },
    ],
  },
  {
    codigo: "CC-VEN",
    nombre: "Ventas y Comercialización",
    responsable: "Ing. Carlos Mendoza",
    icon: Megaphone,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    presupuesto: 700000,
    ejecutado: 600000,
    ingresos: 7500000,
    gastosDetalle: [
      { concepto: "Nómina Comercial", monto: "Bs. 320.000" },
      { concepto: "Comisiones por Ventas", monto: "Bs. 150.000" },
      { concepto: "Publicidad y Marketing", monto: "Bs. 80.000" },
      { concepto: "Gastos de Representación", monto: "Bs. 50.000" },
    ],
  },
  {
    codigo: "CC-OPE",
    nombre: "Operaciones y Logística",
    responsable: "Ing. José Hernández",
    icon: Truck,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    presupuesto: 900000,
    ejecutado: 850000,
    ingresos: 0,
    gastosDetalle: [
      { concepto: "Nómina Operativa", monto: "Bs. 420.000" },
      { concepto: "Transporte y Fletes", monto: "Bs. 180.000" },
      { concepto: "Mantenimiento Equipos", monto: "Bs. 120.000" },
      { concepto: "Almacenamiento", monto: "Bs. 130.000" },
    ],
  },
  {
    codigo: "CC-TEC",
    nombre: "Tecnología e Informática",
    responsable: "Ing. Ana López",
    icon: Server,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    presupuesto: 500000,
    ejecutado: 420000,
    ingresos: 1200000,
    gastosDetalle: [
      { concepto: "Nómina IT", monto: "Bs. 200.000" },
      { concepto: "Licencias y Software", monto: "Bs. 95.000" },
      { concepto: "Infraestructura Cloud", monto: "Bs. 85.000" },
      { concepto: "Soporte y Mantenimiento", monto: "Bs. 40.000" },
    ],
  },
  {
    codigo: "CC-ATN",
    nombre: "Atención al Cliente",
    responsable: "Lcda. Patricia Díaz",
    icon: Headphones,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    presupuesto: 300000,
    ejecutado: 280000,
    ingresos: 0,
    gastosDetalle: [
      { concepto: "Nómina Soporte", monto: "Bs. 160.000" },
      { concepto: "Plataforma CRM", monto: "Bs. 45.000" },
      { concepto: "Telefonía / Call Center", monto: "Bs. 75.000" },
    ],
  },
  {
    codigo: "CC-RRH",
    nombre: "Recursos Humanos",
    responsable: "Lcda. Laura Martínez",
    icon: Users,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    presupuesto: 400000,
    ejecutado: 350000,
    ingresos: 0,
    gastosDetalle: [
      { concepto: "Nómina RRHH", monto: "Bs. 150.000" },
      { concepto: "Capacitación y Formación", monto: "Bs. 80.000" },
      { concepto: "Bienestar Laboral", monto: "Bs. 70.000" },
      { concepto: "Reclutamiento", monto: "Bs. 50.000" },
    ],
  },
];

const fmt = (n: number) => `Bs. ${n.toLocaleString('es-VE', { minimumFractionDigits: 0 })}`;

export default function CentroCostosPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Layers className="h-3 w-3" /> CONTABILIDAD ANALÍTICA
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Centro de <span className="text-primary italic">Costos</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Análisis por Departamento • Presupuesto vs Real • Eficiencia Operativa
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Download className="h-4 w-4" /> EXPORTAR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Plus className="h-4 w-4" /> NUEVO CENTRO
          </Button>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Centros Activos", val: "6", icon: Layers, color: "text-primary" },
          { label: "Presupuesto Total", val: fmt(centros.reduce((s, c) => s + c.presupuesto, 0)), icon: Target, color: "text-emerald-500" },
          { label: "Ejecutado Total", val: fmt(centros.reduce((s, c) => s + c.ejecutado, 0)), icon: BarChart3, color: "text-amber-500" },
          { label: "Ejecución Global", val: `${(centros.reduce((s, c) => s + c.ejecutado, 0) / centros.reduce((s, c) => s + c.presupuesto, 0) * 100).toFixed(0)}%`, icon: TrendingUp, color: "text-cyan-500" },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {centros.map((centro, i) => {
          const pct = (centro.ejecutado / centro.presupuesto) * 100;
          return (
            <motion.div key={centro.codigo} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className={cn("rounded-2xl overflow-hidden border", `${centro.bg.replace('/10', '/20')}`)}>
                <CardHeader className="p-5 pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2.5 rounded-xl", centro.bg)}>
                        <centro.icon className={cn("h-5 w-5", centro.color)} />
                      </div>
                      <div>
                        <p className="text-[10px] font-mono font-bold text-muted-foreground">{centro.codigo}</p>
                        <CardTitle className="text-sm font-bold">{centro.nombre}</CardTitle>
                        <p className="text-[10px] text-muted-foreground">{centro.responsable}</p>
                      </div>
                    </div>
                    <Badge className={cn("text-[9px] font-bold", centro.bg, centro.color)}>{pct.toFixed(0)}%</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-5 pt-2">
                  <div className="flex justify-between text-[10px] text-muted-foreground mb-1.5">
                    <span>Presupuestado: {fmt(centro.presupuesto)}</span>
                    <span>Ejecutado: {fmt(centro.ejecutado)}</span>
                  </div>
                  <Progress value={Math.min(pct, 100)} className="h-2 mb-4" />

                  {centro.ingresos > 0 && (
                    <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                      <TrendingUp className="h-3 w-3 text-emerald-500" />
                      <span className="text-[10px] font-bold text-emerald-500">Ingresos generados: {fmt(centro.ingresos)}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    {centro.gastosDetalle.map((g, j) => (
                      <div key={j} className="flex justify-between text-[11px]">
                        <span className="text-muted-foreground">{g.concepto}</span>
                        <span className="font-mono font-medium">{g.monto}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
