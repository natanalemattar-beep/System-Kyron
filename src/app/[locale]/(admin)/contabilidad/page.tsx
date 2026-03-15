
"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/navigation";
import { 
  Calculator, 
  Wallet, 
  FileText, 
  Landmark, 
  TrendingUp, 
  Activity, 
  BookOpen, 
  ShieldCheck, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Box,
  Receipt,
  Users,
  HandCoins,
  Zap,
  ArrowRight,
  Book,
  History
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OverviewChart } from "@/components/dashboard/overview-chart";

/**
 * @fileOverview Centro de Contabilidad Simplificado.
 * Dashboard ejecutivo que centraliza los KPIs y redirige a la Biblioteca Completa de Libros.
 */

export default function ContabilidadPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
      {/* --- CABECERA --- */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-[#0A2472] pl-8 py-2 mt-10">
        <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] mb-3">
                <Calculator className="h-3 w-3" /> SISTEMA CONTABLE MAESTRO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#0A2472] uppercase leading-none">CENTRO DE <span className="text-[#00A86B] italic">CONTABILIDAD</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">Control de Gestión Financiera • Ejercicio 2026</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 bg-white text-[#0A2472]">
                <History className="mr-3 h-4 w-4" /> AUDITORÍA
            </Button>
            <Button className="bg-[#0A2472] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                <Receipt className="mr-3 h-4 w-4" /> CERRAR PERIODO
            </Button>
        </div>
      </header>

      {/* --- KPI SUMMARY --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "SALDO DISPONIBLE", val: "Bs. 123.456", trend: "+5.2%", color: "text-emerald-600", icon: Wallet },
          { label: "CUENTAS POR COBRAR", val: "Bs. 45.678", trend: "12 Activos", color: "text-blue-600", icon: TrendingUp },
          { label: "CUENTAS POR PAGAR", val: "Bs. 23.456", trend: "8 Compromisos", color: "text-rose-600", icon: HandCoins },
          { label: "IVA POR DECLARAR", val: "Bs. 5.678", trend: "Vence en 5d", color: "text-amber-600", icon: Landmark },
        ].map((kpi, i) => (
          <Card key={i} className="border-none bg-white p-2 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-slate-400">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-[#0A2472]">{kpi.val}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* --- BANNER BIBLIOTECA MAESTRA --- */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
        <Card className="bg-[#0A2472] border-none rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                <Book className="h-64 w-64" />
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h3 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter leading-none">Biblioteca de <br/> Libros Contables</h3>
                    <p className="text-lg font-medium opacity-80 leading-relaxed uppercase">Accede a todos los libros fiscales, laborales y contables del sistema desde un repositorio centralizado.</p>
                    <Button asChild size="lg" className="bg-[#00A86B] hover:bg-emerald-600 text-white font-black uppercase text-[11px] tracking-[0.2em] h-16 px-12 rounded-2xl shadow-2xl border-none">
                        <Link href="/contabilidad/libros" className="flex items-center gap-4">
                            VER TODOS LOS LIBROS <ArrowRight className="h-5 w-5" />
                        </Link>
                    </Button>
                </div>
                <div className="hidden md:flex justify-end">
                    <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-inner text-center space-y-4">
                        <BookOpen className="h-16 w-16 mx-auto text-[#00A86B] mb-2" />
                        <p className="text-4xl font-black italic tracking-tighter">30</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Registros Maestros</p>
                    </div>
                </div>
            </div>
        </Card>
      </motion.div>

      {/* --- ACCESOS RÁPIDOS --- */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 ml-2">
            <div className="p-2 bg-[#0A2472]/5 rounded-xl"><Activity className="h-5 w-5 text-[#0A2472]" /></div>
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472]">Accesos Frecuentes</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, kpi: "Marzo: Al día", color: "text-blue-600" },
                { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, kpi: "23 Empleados", color: "text-emerald-600" },
                { label: "Inventario Activo", href: "/contabilidad/libros/inventario", icon: Box, kpi: "45 SKUs", color: "text-amber-600" },
                { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, kpi: "Alícuotas: Ok", color: "text-rose-600" },
            ].map((item, i) => (
                <Link key={i} href={item.href as any}>
                    <Card className="border-none bg-white hover:bg-slate-50 transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-md min-h-[140px]">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-slate-50 rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                                <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                            </div>
                            <div>
                                <p className="text-sm font-black uppercase tracking-tight text-slate-700 group-hover:text-[#0A2472] transition-colors">{item.label}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.kpi}</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <ArrowRight className="h-4 w-4 text-slate-200 group-hover:text-primary transition-all group-hover:translate-x-1" />
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
        <Card className="border-none shadow-sm rounded-[3rem] bg-white p-10 border-l-4 border-amber-500">
          <CardHeader className="p-0 mb-8">
              <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-amber-600 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5" /> Cumplimiento SENIAT
              </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-6">
            {[
              { text: "Declaración IVA Marzo vence en 5 días", color: "text-amber-600", icon: Clock },
              { text: "Cierre Fiscal ISLR 31 de Marzo", color: "text-rose-600", icon: AlertTriangle }
            ].map((alert, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-amber-200 transition-all">
                <alert.icon className={cn("h-5 w-5", alert.color)} />
                <p className={cn("text-xs font-bold uppercase tracking-tight", alert.color)}>{alert.text}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 text-slate-400 hover:text-[#0A2472] font-black uppercase text-[10px] tracking-widest">VER CALENDARIO COMPLETO</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
