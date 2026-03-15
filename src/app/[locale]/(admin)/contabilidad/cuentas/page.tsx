
"use client";

import React from "react";
import { Link } from "@/navigation";
import { 
  Wallet, 
  ArrowLeft, 
  TrendingUp, 
  HandCoins, 
  Activity, 
  ArrowRight,
  BookOpen,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * @fileOverview Centro de Gestión de Cuentas - Vista de Acceso Rápido.
 */

export default function CuentasPage() {
  const quickAccess = [
    { 
      label: "CUENTAS POR COBRAR", 
      href: "/cuentas-por-cobrar", 
      icon: TrendingUp, 
      color: "text-blue-600",
      desc: "Gestión de clientes y cobros."
    },
    { 
      label: "CUENTAS POR PAGAR", 
      href: "/cuentas-por-pagar", 
      icon: HandCoins, 
      color: "text-rose-600",
      desc: "Control de compromisos con proveedores."
    },
    { 
      label: "ANÁLISIS DE CAJA", 
      href: "/analisis-caja", 
      icon: Activity, 
      color: "text-emerald-600",
      desc: "Flujo de efectivo y conciliación."
    },
  ];

  return (
    <div className="p-6 md:p-12 bg-background min-h-screen space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
            <Wallet className="h-3 w-3" /> NODO DE TESORERÍA
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter italic">
            Gestión de <span className="text-primary">Cuentas</span>
          </h1>
          <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60">Control Financiero y Bancario 2026</p>
        </div>
        <Button variant="ghost" asChild className="text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary">
          <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4"/> Volver al Centro Contable</Link>
        </Button>
      </header>

      {/* --- ACCESOS RÁPIDOS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {quickAccess.map((item, i) => (
          <Link key={i} href={item.href as any}>
            <Card className="glass-card border-none bg-card p-10 flex flex-col justify-between group shadow-sm hover:shadow-xl transition-all duration-500 rounded-[2.5rem] min-h-[220px]">
              <div className="space-y-6">
                <div className="p-4 bg-muted rounded-2xl w-fit group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                  <item.icon className={cn("h-8 w-8 transition-all", item.color)} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground group-hover:text-primary transition-colors">{item.label}</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <ChevronRight className="h-5 w-5" />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* --- BANNER MAESTRO --- */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="bg-primary border-none rounded-[3rem] p-12 text-primary-foreground relative overflow-hidden shadow-2xl group cursor-pointer">
          <Link href="/cuentas/todas" className="absolute inset-0 z-20" />
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
            <BookOpen className="h-64 w-64" />
          </div>
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center md:text-left">
              <Badge className="bg-white/20 text-white border-none text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1.5 rounded-lg">Biblioteca Maestra</Badge>
              <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none italic-shadow">VER TODAS LAS <br/> CUENTAS</h3>
              <p className="text-lg font-medium opacity-80 leading-relaxed uppercase">Acceda al repositorio completo de módulos bancarios, anticipos y reportes financieros analíticos.</p>
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black uppercase text-[11px] tracking-[0.2em] h-16 px-12 rounded-2xl shadow-2xl border-none">
                EXPLORAR REPOSITORIO <ArrowRight className="ml-4 h-5 w-5" />
              </Button>
            </div>
            <div className="hidden md:flex justify-end">
              <div className="p-12 rounded-[3.5rem] bg-black/20 border border-white/10 backdrop-blur-md shadow-inner text-center space-y-4">
                <ShieldCheck className="h-20 w-20 mx-auto text-secondary mb-2 drop-shadow-glow" />
                <p className="text-5xl font-black italic tracking-tighter">100%</p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Sincronización Bancaria</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
