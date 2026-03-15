"use client";

import React, { useEffect, useState } from "react";
import { Link } from "@/navigation";
import { 
  Calculator, 
  Wallet, 
  FileText, 
  Landmark, 
  TrendingUp, 
  BarChart3, 
  Activity, 
  BookOpen, 
  History, 
  ShieldCheck, 
  AlertTriangle,
  Receipt,
  TrendingDown,
  CheckCircle,
  Clock,
  PieChart,
  DollarSign,
  ChevronRight,
  Box,
  Banknote,
  Stamp,
  HandCoins,
  ShieldAlert,
  Terminal,
  Zap,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";
import { OverviewChart } from "@/components/dashboard/overview-chart";

const accountingModules = [
  {
    title: "Libros Fiscales",
    icon: BookOpen,
    items: [
      { label: "Compra y Venta", href: "/libro-compra-venta", kpi: "10 facturas este mes", icon: FileText },
      { label: "Libro de Nómina", href: "/nominas", kpi: "23 empleados", icon: Users },
      { label: "Libro Inventario", href: "/inventario", kpi: "Existencias: Ok", icon: Box },
      { label: "Control Licores", href: "/libro-licores", kpi: "Alícuotas al día", icon: Landmark },
      { label: "Cesta-Ticket", href: "/contabilidad", kpi: "Vigente Mar'26", icon: Banknote },
    ]
  },
  {
    title: "Impuestos y Tasas",
    icon: Landmark,
    items: [
      { label: "Declaración IVA", href: "/declaracion-iva", kpi: "Vence en 5 días", icon: FileText },
      { label: "ISLR y AR-C", href: "/islr-arc", kpi: "3 comprobantes listos", icon: Banknote },
      { label: "IGTF y Gacetas", href: "/gaceta-6952", kpi: "Tasa: 3.0%", icon: ShieldCheck },
      { label: "Timbres Fiscales", href: "/permisos", kpi: "Control activo", icon: Stamp },
    ]
  },
  {
    title: "Gestión de Cuentas",
    icon: Wallet,
    items: [
      { label: "Cuentas por Cobrar", href: "/cuentas-por-cobrar", kpi: "Bs. 45.678", icon: TrendingUp },
      { label: "Cuentas por Pagar", href: "/cuentas-por-pagar", kpi: "Bs. 23.456", icon: HandCoins },
      { label: "Flujo de Caja", href: "/analisis-caja", kpi: "Sincronizado", icon: Activity },
    ]
  },
  {
    title: "Análisis Estratégico",
    icon: BarChart3,
    items: [
      { label: "Análisis de Ventas", href: "/analisis-ventas", kpi: "+20.1% este mes", icon: BarChart3 },
      { label: "Riesgo Fiscal", href: "/analisis-riesgo", kpi: "Nivel: Bajo", icon: ShieldCheck },
      { label: "Rentabilidad Pro", href: "/analisis-rentabilidad", kpi: "Margen: 32%", icon: TrendingUp },
      { label: "Factibilidad", href: "/estudio-factibilidad-economica", kpi: "TIR: 28.5%", icon: Calculator },
      { label: "Costos Operativos", href: "/estructura-costos", kpi: "Optimizado", icon: Activity },
    ]
  },
  {
    title: "Tesorería",
    icon: Activity,
    items: [
      { label: "Arqueo de Caja", href: "/arqueo-caja", kpi: "Hoy 08:00 AM", icon: Calculator },
      { label: "Billetera Cambio", href: "/billetera-cambio", kpi: "VES/USD/EUR", icon: Wallet },
      { label: "Transacciones", href: "/transactions", kpi: "45 operaciones", icon: History },
    ]
  }
];

export default function ContabilidadPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      {/* --- HEADER CONTABLE --- */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                <Calculator className="h-3 w-3" /> SISTEMA CONTABLE MAESTRO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Centro <span className="text-primary italic">Financiero</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Ejercicio Fiscal 2026 • Auditoría síncrona activa</p>
        </div>
        <div className="flex gap-3">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white">
                <History className="mr-3 h-4 w-4" /> AUDITORÍA
            </Button>
            <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                <Receipt className="mr-3 h-4 w-4" /> GENERAR BALANCE
            </Button>
        </div>
      </header>

      {/* --- KPIs FINANCIEROS --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Saldo de Caja", val: "Bs. 123.456", trend: "+5.2%", color: "text-emerald-500", icon: Wallet },
          { label: "CxC (Cuentas por Cobrar)", val: "Bs. 45.678", trend: "12 Facturas", color: "text-blue-400", icon: TrendingUp },
          { label: "CxP (Cuentas por Pagar)", val: "Bs. 23.456", trend: "8 Facturas", color: "text-rose-500", icon: HandCoins },
          { label: "IVA por Declarar", val: "Bs. 5.678", trend: "Vence en 5d", color: "text-amber-500", icon: Landmark },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-xl group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted/50 border border-border group-hover:scale-110 transition-transform shadow-inner">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-white">{kpi.val}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* --- NAVEGACIÓN DE MÓDULOS --- */}
        <div className="lg:col-span-8 space-y-12">
            {accountingModules.map((cat, idx) => (
                <div key={idx} className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary flex items-center gap-4 italic ml-2">
                        <cat.icon className="h-5 w-5" /> {cat.title}
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cat.items.map((item, i) => (
                            <Link key={i} href={item.href as any}>
                                <Card className="glass-card border-none bg-white/[0.02] hover:bg-white/[0.05] transition-all rounded-[1.5rem] p-6 flex justify-between items-center group border border-white/5">
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 bg-white/5 rounded-xl group-hover:bg-primary/10 transition-colors">
                                            <item.icon className="h-5 w-5 text-white/30 group-hover:text-primary transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-black uppercase tracking-tight text-white group-hover:text-primary transition-colors">{item.label}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{item.kpi}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* --- ALERTAS Y TABLAS --- */}
        <div className="lg:col-span-4 space-y-10">
            <Card className="glass-card border-none bg-amber-500/5 rounded-[2.5rem] p-8 shadow-2xl border-l-4 border-amber-500">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 flex items-center gap-3">
                        <ShieldAlert className="h-4 w-4" /> Alertas de Cumplimiento
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                    {[
                        { text: "IVA Marzo vence en 5 días", color: "text-amber-600" },
                        { text: "ISLR Retenciones por procesar", color: "text-amber-600" },
                        { text: "3 facturas por pagar en mora", color: "text-rose-500" },
                        { text: "Conciliación Bancaria al día", color: "text-emerald-600" }
                    ].map((alert, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                            <div className={cn("h-2 w-2 rounded-full mt-1 shrink-0", alert.color.replace('text-', 'bg-'))} />
                            <p className={cn("text-[10px] font-bold uppercase tracking-tight leading-tight", alert.color)}>{alert.text}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="glass-card border-none bg-card/40 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardHeader className="p-8 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Movimientos Recientes</CardTitle>
                    <Activity className="h-4 w-4 text-primary/20" />
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableBody>
                            {[
                                { date: "15/03", desc: "Pago Suministros C.A.", amount: -5000, color: "text-rose-500" },
                                { date: "14/03", desc: "Factura Venta #00123", amount: 12000, color: "text-emerald-500" },
                                { date: "13/03", desc: "Nómina Q1 Marzo", amount: -23000, color: "text-rose-500" },
                            ].map((mv, i) => (
                                <TableRow key={i} className="border-border/50 hover:bg-muted/20">
                                    <TableCell className="pl-8 py-5">
                                        <p className="font-black text-[10px] text-white/80 uppercase italic">{mv.desc}</p>
                                        <p className="text-[8px] text-muted-foreground uppercase">{mv.date}</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <p className={cn("font-black text-xs italic", mv.color)}>
                                            {formatCurrency(mv.amount, 'Bs.')}
                                        </p>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-6 bg-primary/5 flex justify-center border-t border-border/50">
                    <Button variant="link" className="text-[9px] font-black uppercase tracking-widest text-primary hover:text-white">VER TODAS LAS TRANSACCIONES</Button>
                </CardFooter>
            </Card>

            <Card className="bg-primary text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow group border-none">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 relative z-10">Blindaje Fiscal</h3>
                <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8 relative z-10">El sistema de auditoría preventiva está validando el 100% de los libros fiscales contra la normativa SENIAT.</p>
                <Button className="w-full h-12 bg-white text-primary hover:bg-white/90 font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl relative z-10">VER ESTADO DE RIESGO</Button>
            </Card>
        </div>
      </div>

      <div className="mt-10">
        <OverviewChart />
      </div>
    </div>
  );
}