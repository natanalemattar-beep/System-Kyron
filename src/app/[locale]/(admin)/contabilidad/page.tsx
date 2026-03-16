
"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import { 
  Calculator, 
  Wallet, 
  TrendingUp, 
  Activity, 
  BookOpen, 
  Receipt,
  Users,
  HandCoins,
  Zap,
  ArrowRight,
  Book,
  History,
  Box,
  Landmark,
  Banknote
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OverviewChart } from "@/components/dashboard/overview-chart";

const kpiData = [
  { label: "SALDO DISPONIBLE", val: "Bs. 123.456", trend: "+5.2%", color: "text-emerald-600", icon: Wallet },
  { label: "CUENTAS POR COBRAR", val: "Bs. 45.678", trend: "12 Activos", color: "text-blue-600", icon: TrendingUp },
  { label: "CUENTAS POR PAGAR", val: "Bs. 23.456", trend: "8 Compromisos", color: "text-rose-600", icon: HandCoins },
  { label: "IVA POR DECLARAR", val: "Bs. 5.678", trend: "Vence en 5d", color: "text-amber-600", icon: Landmark },
];

const frequentAccess = [
    { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, kpi: "Marzo: Al día", color: "text-blue-600" },
    { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, kpi: "23 Empleados", color: "text-emerald-600" },
    { label: "Inventario Activo", href: "/contabilidad/libros/inventario", icon: Box, kpi: "45 SKUs", color: "text-amber-600" },
    { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, kpi: "Ok", color: "text-rose-600" },
];

export default function ContabilidadPage() {
  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
                <Calculator className="h-3 w-3" /> NÚCLEO CONTABLE INTEGRAL
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none">CENTRO DE <span className="text-primary italic">CONTABILIDAD</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">Control de Gestión Financiera • 2026</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                <History className="mr-3 h-4 w-4" /> AUDITORÍA
            </Button>
            <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                <Receipt className="mr-3 h-4 w-4" /> CERRAR PERIODO
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card p-2 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-foreground">{kpi.val}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="bg-primary border-none rounded-[3rem] p-12 text-primary-foreground relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                <Book className="h-64 w-64" />
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter leading-none">Biblioteca de <br/> Libros Certificados</h3>
                    <p className="text-lg font-medium opacity-80 leading-relaxed uppercase">Acceda a todos los registros fiscales, laborales y operativos desde un repositorio centralizado.</p>
                    <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-black uppercase text-[11px] tracking-[0.2em] h-16 px-12 rounded-2xl shadow-2xl border-none">
                        <Link href="/contabilidad/libros" className="flex items-center gap-4">
                            VER TODOS LOS REGISTROS <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
                <div className="hidden md:flex justify-end">
                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-center space-y-4">
                        <BookOpen className="h-16 w-16 mx-auto text-white/40 mb-2" />
                        <p className="text-4xl font-black italic tracking-tighter text-white">30</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 text-white">Módulos de Control</p>
                    </div>
                </div>
            </div>
        </Card>
      </motion.div>

      <div className="space-y-6">
        <div className="flex items-center gap-4 ml-2">
            <div className="p-2 bg-primary/10 rounded-xl"><Activity className="h-5 w-5 text-primary" /></div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-foreground/60">Accesos Frecuentes</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {frequentAccess.map((item, i) => (
                <Link key={i} href={item.href as any}>
                    <Card className="glass-card border-none bg-card hover:bg-muted/50 transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md min-h-[140px]">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20">
                                <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors">{item.label}</p>
                                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.kpi}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary transition-all" />
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 mt-10">
        <div className="lg:col-span-2">
            <OverviewChart />
        </div>
        <Card className="glass-card border-none bg-card p-10 border-l-4 border-amber-500 shadow-2xl">
          <CardHeader className="p-0 mb-8">
              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-amber-600 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5" /> Cumplimiento SENIAT
              </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            <div className="flex items-center gap-4 p-5 bg-muted/20 rounded-2xl border border-transparent hover:border-amber-200 transition-all">
                <Calendar className="h-5 w-5 text-amber-600" />
                <p className="text-xs font-bold uppercase tracking-tight text-amber-600">Declaración IVA Marzo vence en 5 días</p>
            </div>
            <div className="flex items-center gap-4 p-5 bg-muted/20 rounded-2xl border border-transparent hover:border-amber-200 transition-all">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <p className="text-xs font-bold uppercase tracking-tight text-emerald-600">Cierre Fiscal ISLR 31 de Marzo</p>
            </div>
            <Button variant="outline" asChild className="w-full h-12 rounded-xl border-border bg-background text-muted-foreground hover:text-primary font-black uppercase text-[10px] tracking-widest">
                <Link href="/contabilidad/impuestos/calendario">VER CRONOGRAMA</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
