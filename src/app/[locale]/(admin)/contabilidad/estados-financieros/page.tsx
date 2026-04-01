"use client";

import React, { useState } from "react";
import { FileText, Download, TrendingUp, TrendingDown, Wallet, Activity, ShieldCheck, Zap, ArrowRight, BarChart3, PieChart, Calculator, Landmark, BookOpen, ChevronRight, Printer, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const estadosFinancieros = [
  {
    titulo: "Balance General",
    subtitulo: "Estado de Situación Financiera",
    desc: "Activos, pasivos y patrimonio al cierre del período. Formato VEN-NIF / NIC 1.",
    icon: Landmark,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    badge: "VEN-NIF",
    datos: {
      totalActivos: "Bs. 12.458.320,00",
      totalPasivos: "Bs. 5.124.800,00",
      patrimonio: "Bs. 7.333.520,00",
    },
  },
  {
    titulo: "Estado de Resultados",
    subtitulo: "Ganancias y Pérdidas",
    desc: "Ingresos, costos, gastos y utilidad neta del período. Conforme NIC 1 / Sección 5 NIIF PYMES.",
    icon: TrendingUp,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    badge: "PERÍODO",
    datos: {
      ingresos: "Bs. 8.934.150,00",
      costoVentas: "Bs. 4.467.075,00",
      utilidadNeta: "Bs. 2.180.420,00",
    },
  },
  {
    titulo: "Flujo de Efectivo",
    subtitulo: "Estado de Flujos de Efectivo",
    desc: "Movimientos de caja por actividades operativas, inversión y financiamiento. NIC 7.",
    icon: Activity,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    badge: "NIC 7",
    datos: {
      operativo: "+Bs. 3.245.000,00",
      inversion: "-Bs. 890.000,00",
      financiamiento: "-Bs. 420.000,00",
    },
  },
  {
    titulo: "Movimiento del Patrimonio",
    subtitulo: "Cambios en el Patrimonio Neto",
    desc: "Variaciones del capital social, reservas, utilidades retenidas y superávit. NIC 1.",
    icon: Wallet,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    badge: "PATRIMONIO",
    datos: {
      capitalSocial: "Bs. 5.000.000,00",
      reservaLegal: "Bs. 500.000,00",
      utilidadesRetenidas: "Bs. 1.833.520,00",
    },
  },
  {
    titulo: "Notas a los Estados Financieros",
    subtitulo: "Revelaciones y Políticas Contables",
    desc: "Notas explicativas, políticas contables significativas y revelaciones requeridas. NIC 1 párr. 112-138.",
    icon: BookOpen,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "NOTAS",
    datos: {
      politicas: "12 políticas documentadas",
      revelaciones: "8 notas complementarias",
      contingencias: "2 contingencias reportadas",
    },
  },
];

const periodos = [
  { label: "Enero 2026", cerrado: true },
  { label: "Febrero 2026", cerrado: true },
  { label: "Marzo 2026", cerrado: true },
  { label: "Abril 2026", cerrado: false },
];

export default function EstadosFinancierosPage() {
  const { toast } = useToast();
  const [periodoActivo, setPeriodoActivo] = useState("Marzo 2026");

  const handleGenerar = (titulo: string) => {
    toast({
      title: "Generando Estado Financiero",
      description: `${titulo} — Período: ${periodoActivo}. Procesando datos contables...`,
    });
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2 mt-10"
      >
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <FileText className="h-3 w-3" /> ESTADOS FINANCIEROS
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">
            Estados <span className="text-primary italic">Financieros</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            VEN-NIF • NIIF PYMES • NIC 1 / NIC 7 • Providencia 0071
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
            <Printer className="h-4 w-4" /> IMPRIMIR
          </Button>
          <Button className="h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg gap-2">
            <Download className="h-4 w-4" /> EXPORTAR PDF
          </Button>
        </div>
      </motion.header>

      <div className="flex gap-2 flex-wrap">
        {periodos.map(p => (
          <Button
            key={p.label}
            variant={periodoActivo === p.label ? "default" : "outline"}
            size="sm"
            className="rounded-lg text-[10px] font-bold uppercase tracking-widest"
            onClick={() => setPeriodoActivo(p.label)}
          >
            {p.label}
            {p.cerrado && <ShieldCheck className="h-3 w-3 ml-1.5 text-emerald-400" />}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: "Total Activos", val: "Bs. 12.458.320", icon: Landmark, color: "text-primary" },
          { label: "Utilidad Neta", val: "Bs. 2.180.420", icon: TrendingUp, color: "text-emerald-500" },
          { label: "Flujo Operativo", val: "+Bs. 3.245.000", icon: Activity, color: "text-cyan-500" },
          { label: "Patrimonio", val: "Bs. 7.333.520", icon: Wallet, color: "text-violet-500" },
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

      <div className="space-y-6">
        {estadosFinancieros.map((ef, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
            <Card className={cn("border rounded-2xl overflow-hidden", ef.border)}>
              <CardHeader className="p-6 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={cn("p-3 rounded-xl", ef.bg)}>
                      <ef.icon className={cn("h-6 w-6", ef.color)} />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-black uppercase tracking-wider">{ef.titulo}</CardTitle>
                      <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{ef.subtitulo}</p>
                      <p className="text-[11px] text-muted-foreground mt-1">{ef.desc}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-[8px] font-black uppercase tracking-widest", ef.bg, ef.color)}>{ef.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {Object.entries(ef.datos).map(([key, val]) => (
                    <div key={key} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm font-bold text-foreground">{val}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="rounded-lg text-[10px] font-bold gap-1.5" onClick={() => handleGenerar(ef.titulo)}>
                    <Zap className="h-3 w-3" /> Generar
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-bold gap-1.5">
                    <Eye className="h-3 w-3" /> Vista Previa
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-lg text-[10px] font-bold gap-1.5">
                    <Download className="h-3 w-3" /> Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-emerald-500/20 bg-emerald-500/[0.03] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">Conformidad VEN-NIF</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Los estados financieros generados por System Kyron cumplen con las Normas Venezolanas de Información Financiera (VEN-NIF),
              las Normas Internacionales de Contabilidad (NIC 1, NIC 7) y las NIIF para PYMES. Incluyen todas las revelaciones
              obligatorias y están listos para presentación ante SENIAT, bancos, socios y auditores externos.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
