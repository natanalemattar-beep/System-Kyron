
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
  Sparkles,
  Zap,
  Target,
  BrainCircuit,
  Wallet,
  FileText
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function AnalisisPage() {
  const quickAccess = [
    { 
      label: "PULSO DE INGRESOS", 
      href: "/analisis-ventas", 
      icon: BarChart3, 
      color: "text-primary",
      desc: "Auditoría de ingresos y tendencias por libros."
    },
    { 
      label: "ALERTA DE MOROSIDAD", 
      href: "/analisis-riesgo", 
      icon: ShieldCheck, 
      color: "text-rose-500",
      desc: "Monitor de cuentas incobrables y riesgo de cartera."
    },
    { 
      label: "RENTABILIDAD PRO", 
      href: "/analisis-rentabilidad", 
      icon: TrendingUp, 
      color: "text-emerald-500",
      desc: "Análisis de utilidad neta y eficiencia fiscal."
    },
    { 
      label: "FACTIBILIDAD", 
      href: "/estudio-factibilidad-economica", 
      icon: Calculator, 
      color: "text-primary",
      desc: "VAN, TIR y escenarios de inversión auditados."
    },
    { 
      label: "AUDITORÍA COSTOS", 
      href: "/estructura-costos", 
      icon: Activity, 
      color: "text-primary",
      desc: "Análisis de centros de costo y gastos fijos."
    }
  ];

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3 shadow-glow-sm">
            <PieChart className="h-3 w-3" /> NODO ANALÍTICO
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic italic-shadow leading-none">
            Inteligencia <span className="text-primary">Estratégica</span>
          </h1>
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60">Business Intelligence y Control Proyectivo 2026</p>
        </div>
        <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
          <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> VOLVER</Link>
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Wallet className="h-16 w-16 text-primary" /></div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/60 mb-2">Salud de Caja</p>
            <p className="text-3xl font-black italic text-white tracking-tighter mb-4">Bs. 45.6k <span className="text-xs opacity-40 tracking-normal italic">Auditado</span></p>
            <div className="flex items-center gap-2 text-emerald-500">
                <TrendingUp className="h-3 w-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">SOLVENCIA: ÓPTIMA</span>
            </div>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><Zap className="h-16 w-16 text-secondary" /></div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-secondary/60 mb-2">Eficiencia de Capital</p>
            <p className="text-3xl font-black italic text-white tracking-tighter mb-4">92.4% <span className="text-xs opacity-40 tracking-normal italic">ROI</span></p>
            <div className="flex items-center gap-2 text-primary">
                <Target className="h-3 w-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">OBJETIVO: 100% Q2</span>
            </div>
        </Card>
        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform"><ShieldCheck className="h-16 w-16 text-emerald-500" /></div>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-2">Seguridad Fiscal</p>
            <p className="text-3xl font-black italic text-white tracking-tighter mb-4">0.00% <span className="text-xs opacity-40 tracking-normal italic">Riesgo</span></p>
            <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="h-3 w-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">BLINDAJE: NIVEL 5</span>
            </div>
        </Card>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white/40 ml-2">Módulos Analíticos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {quickAccess.map((item, i) => (
            <Link key={i} href={item.href as any}>
                <Card className="glass-card border-none bg-card/40 p-8 flex flex-col justify-between group shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] min-h-[200px]">
                <div className="space-y-6">
                    <div className="p-3 bg-muted rounded-xl w-fit group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                    <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                    </div>
                    <div className="space-y-1">
                    <h3 className="text-sm font-black uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors">{item.label}</h3>
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
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
        <Card className="bg-[#050505] border-none rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl group cursor-pointer">
          <Link href="/contabilidad/analisis/factibilidad" className="absolute inset-0 z-20" />
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <FileText className="h-64 w-64 text-primary" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <Badge className="bg-primary text-white border-none text-[10px] font-black px-4 py-1.5 rounded-lg shadow-glow">Módulo de Ingeniería Financiera</Badge>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none italic-shadow text-white">ESTUDIO DE <br/> FACTIBILIDAD</h3>
              <p className="text-lg font-medium opacity-80 leading-relaxed uppercase italic text-white/70">Consulte el dictamen técnico de VAN, TIR y retorno de inversión auditado por el nodo central.</p>
              <Button size="lg" className="btn-3d-primary h-16 px-12 rounded-2xl shadow-2xl border-none font-black uppercase text-[11px] tracking-[0.2em]">
                VER ESTUDIO MAESTRO <ArrowRight className="ml-4 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
