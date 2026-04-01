"use client";

import React from "react";
import { BarChart3, TrendingUp, ShieldCheck, Activity, Wallet, Zap, Target, AlertTriangle, ArrowUpRight, ArrowDownRight, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const indicadores = [
  {
    categoria: "LIQUIDEZ",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    ratios: [
      { nombre: "Liquidez Corriente", formula: "Activo Corriente / Pasivo Corriente", valor: "2.27", optimo: "> 1.5", estado: "bueno", interpretacion: "La empresa puede cubrir sus obligaciones a corto plazo 2.27 veces." },
      { nombre: "Prueba Ácida", formula: "(AC - Inventarios) / PC", valor: "2.05", optimo: "> 1.0", estado: "bueno", interpretacion: "Sin depender del inventario, la cobertura es sólida." },
      { nombre: "Capital de Trabajo", formula: "Activo Corriente - Pasivo Corriente", valor: "Bs. 4.609.300", optimo: "> 0", estado: "bueno", interpretacion: "Excedente operativo saludable para la operación diaria." },
    ],
  },
  {
    categoria: "RENTABILIDAD",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    ratios: [
      { nombre: "Margen de Utilidad Neta", formula: "Utilidad Neta / Ingresos × 100", valor: "24.4%", optimo: "> 10%", estado: "excelente", interpretacion: "Por cada Bs. de ingreso, quedan 24.4 céntimos de utilidad neta." },
      { nombre: "ROE", formula: "Utilidad Neta / Patrimonio × 100", valor: "29.7%", optimo: "> 15%", estado: "excelente", interpretacion: "Retorno sobre el capital de los accionistas es muy superior al promedio." },
      { nombre: "ROA", formula: "Utilidad Neta / Total Activos × 100", valor: "17.5%", optimo: "> 5%", estado: "excelente", interpretacion: "Cada bolívar en activos genera 17.5 céntimos de utilidad." },
      { nombre: "Margen Bruto", formula: "(Ventas - Costo Ventas) / Ventas × 100", valor: "50.0%", optimo: "> 30%", estado: "bueno", interpretacion: "El margen bruto es saludable para el sector." },
    ],
  },
  {
    categoria: "ENDEUDAMIENTO",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    ratios: [
      { nombre: "Razón de Endeudamiento", formula: "Total Pasivos / Total Activos × 100", valor: "41.1%", optimo: "< 60%", estado: "bueno", interpretacion: "El nivel de endeudamiento es moderado y manejable." },
      { nombre: "Apalancamiento", formula: "Total Pasivos / Patrimonio", valor: "0.70", optimo: "< 1.5", estado: "bueno", interpretacion: "Por cada bolívar de patrimonio hay 70 céntimos de deuda." },
      { nombre: "Cobertura de Intereses", formula: "EBIT / Gastos Financieros", valor: "15.2x", optimo: "> 3x", estado: "excelente", interpretacion: "Capacidad excepcional para cubrir gastos financieros." },
    ],
  },
  {
    categoria: "EFICIENCIA OPERATIVA",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    ratios: [
      { nombre: "Rotación de Inventarios", formula: "Costo Ventas / Inventario Promedio", valor: "5.6x", optimo: "> 4x", estado: "bueno", interpretacion: "El inventario rota 5.6 veces al año — 65 días promedio." },
      { nombre: "Período de Cobro", formula: "CxC / Ventas Diarias", valor: "38 días", optimo: "< 45 días", estado: "bueno", interpretacion: "Los clientes pagan en promedio a los 38 días." },
      { nombre: "Período de Pago", formula: "CxP / Compras Diarias", valor: "33 días", optimo: "30-60 días", estado: "bueno", interpretacion: "Se paga a proveedores en promedio a los 33 días." },
    ],
  },
];

const estadoColors: Record<string, { badge: string; icon: React.ReactNode }> = {
  excelente: { badge: "bg-emerald-500/10 text-emerald-500", icon: <ArrowUpRight className="h-3 w-3 text-emerald-500" /> },
  bueno: { badge: "bg-primary/10 text-primary", icon: <ShieldCheck className="h-3 w-3 text-primary" /> },
  alerta: { badge: "bg-amber-500/10 text-amber-500", icon: <AlertTriangle className="h-3 w-3 text-amber-500" /> },
  critico: { badge: "bg-rose-500/10 text-rose-500", icon: <ArrowDownRight className="h-3 w-3 text-rose-500" /> },
};

export default function IndicadoresFinancierosPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <BarChart3 className="h-3 w-3" /> DASHBOARD FINANCIERO
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Indicadores <span className="text-primary italic">Financieros</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Ratios • Liquidez • Rentabilidad • Endeudamiento • Eficiencia • Semáforos
          </p>
        </div>
      </motion.header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Salud Financiera", val: "92/100", icon: ShieldCheck, color: "text-emerald-500" },
          { label: "Liquidez", val: "2.27x", icon: Wallet, color: "text-primary" },
          { label: "ROE", val: "29.7%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Endeudamiento", val: "41.1%", icon: Landmark, color: "text-amber-500" },
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

      {indicadores.map((grupo, gi) => (
        <motion.div key={gi} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + gi * 0.05 }}>
          <Card className={cn("rounded-2xl overflow-hidden border", grupo.border)}>
            <CardHeader className={cn("p-5 border-b", grupo.bg)}>
              <CardTitle className={cn("text-sm font-black uppercase tracking-[0.2em]", grupo.color)}>
                {grupo.categoria}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {grupo.ratios.map((ratio, ri) => {
                const est = estadoColors[ratio.estado];
                return (
                  <div key={ri} className="flex items-start gap-4 p-5 border-b border-border/30 last:border-none hover:bg-muted/10 transition-colors">
                    <div className="shrink-0 mt-1">{est.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold">{ratio.nombre}</p>
                        <Badge className={cn("text-[8px] font-bold uppercase", est.badge)}>{ratio.estado}</Badge>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono">{ratio.formula}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">{ratio.interpretacion}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={cn("text-lg font-black", grupo.color)}>{ratio.valor}</p>
                      <p className="text-[9px] text-muted-foreground">Óptimo: {ratio.optimo}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
