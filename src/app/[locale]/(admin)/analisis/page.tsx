
"use client";

import React from "react";
import { Link } from "@/navigation";
import { 
  PieChart, 
  ArrowLeft, 
  TrendingUp, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Calculator,
  BarChart3,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

/**
 * @fileOverview Centro de Análisis Estratégico - Vista de Acceso Rápido.
 */

export default function AnalisisPage() {
  const quickAccess = [
    { 
      label: "VENTAS E INGRESOS", 
      href: "/analisis-ventas", 
      icon: BarChart3, 
      color: "text-blue-600",
      desc: "Análisis de volumen y tendencias comerciales."
    },
    { 
      label: "RIESGO FINANCIERO", 
      href: "/analisis-riesgo", 
      icon: ShieldCheck, 
      color: "text-rose-600",
      desc: "Monitor de morosidad y alertas preventivas."
    },
    { 
      label: "RENTABILIDAD PRO", 
      href: "/analisis-rentabilidad", 
      icon: TrendingUp, 
      color: "text-emerald-600",
      desc: "Márgenes netos y optimización de ROI."
    },
    { 
      label: "FACTIBILIDAD", 
      href: "/estudio-factibilidad-economica", 
      icon: Calculator, 
      color: "text-amber-600",
      desc: "VAN, TIR y escenarios de inversión."
    },
    { 
      label: "COSTOS", 
      href: "/estructura-costos", 
      icon: Activity, 
      color: "text-slate-600",
      desc: "Desglose de gastos fijos y variables."
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <PieChart className="h-3 w-3" /> NODO ESTRATÉGICO
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter italic">
            Centro de <span className="text-primary">Análisis</span>
          </h1>
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60">Inteligencia de Negocios y Business Intelligence 2026</p>
        </div>
        <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
          <Link href="/dashboard-empresa"><ArrowLeft className="mr-2 h-4 w-4"/> Volver a Mando</Link>
        </Button>
      </header>

      {/* --- ACCESOS RÁPIDOS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {quickAccess.map((item, i) => (
          <Link key={i} href={item.href as any}>
            <Card className="glass-card border-none bg-card p-8 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2rem] min-h-[200px]">
              <div className="space-y-6">
                <div className="p-3 bg-muted rounded-xl w-fit group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                  <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">{item.desc}</p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* --- BANNER MAESTRO --- */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <Card className="bg-[#0A2472] border-none rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl group cursor-pointer">
          <Link href="/analisis/todos" className="absolute inset-0 z-20" />
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <PieChart className="h-64 w-64" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <Badge className="bg-[#00A86B] text-white border-none text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-lg shadow-glow-secondary">Módulo Avanzado</Badge>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none italic-shadow">VER TODOS LOS <br/> ANÁLISIS</h3>
              <p className="text-lg font-medium opacity-80 leading-relaxed uppercase">Acceda a la biblioteca completa de métricas, proyecciones de mercado y KPIs analíticos del ecosistema.</p>
              <Button size="lg" className="bg-[#00A86B] hover:bg-emerald-600 text-white font-black uppercase text-[11px] tracking-[0.2em] h-16 px-12 rounded-2xl shadow-2xl border-none">
                EXPLORAR BIBLIOTECA <ArrowRight className="ml-4 h-5 w-5" />
              </Button>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-center space-y-4">
                <Sparkles className="h-20 w-20 mx-auto text-[#00A86B] mb-2 drop-shadow-glow" />
                <p className="text-5xl font-black italic tracking-tighter">BI</p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Inteligencia Activa</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
