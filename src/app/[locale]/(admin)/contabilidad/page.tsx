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
  CheckCircle,
  Clock,
  PieChart,
  ChevronRight,
  Box,
  Banknote,
  Stamp,
  HandCoins,
  ShieldAlert,
  Terminal,
  Zap,
  Loader2,
  Users,
  Calendar,
  ShieldAlert as ShieldIcon,
  Search
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
    title: "Libros Contables",
    icon: BookOpen,
    items: [
      { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", kpi: "10 facturas este mes", icon: FileText },
      { label: "Libro de Nómina", href: "/contabilidad/libros/nomina", kpi: "23 empleados", icon: Users },
      { label: "Libro Inventario", href: "/contabilidad/libros/inventario", kpi: "Existencias: Ok", icon: Box },
      { label: "Control Licores", href: "/contabilidad/libros/control-licores", kpi: "Alícuotas al día", icon: Landmark },
      { label: "Cesta-Ticket", href: "/contabilidad/libros/cesta-ticket", kpi: "Vigente Mar'26", icon: Banknote },
      { label: "Horas Extras", href: "/contabilidad/libros/horas-extras", kpi: "Control Activo", icon: Clock },
    ]
  },
  {
    title: "Tributos e Impuestos",
    icon: Landmark,
    items: [
      { label: "Declaración IVA", href: "/declaracion-iva", kpi: "Vence en 5 días", icon: FileText },
      { label: "ISLR y AR-C", href: "/islr-arc", kpi: "3 comprobantes", icon: Banknote },
      { label: "Retenciones", href: "/contabilidad/impuestos/retenciones", kpi: "IVA/ISLR", icon: ShieldCheck },
      { label: "Calendario Fiscal", href: "/contabilidad/impuestos/calendario", kpi: "Próximos pagos", icon: Calendar },
      { label: "Munipales", href: "/contabilidad/impuestos/municipales", kpi: "Tasas locales", icon: Landmark },
      { label: "Multas", href: "/contabilidad/impuestos/multas", kpi: "Control legal", icon: ShieldIcon },
      { label: "Homologación", href: "/contabilidad/impuestos/homologacion", kpi: "Equipos SENIAT", icon: CheckCircle },
      { label: "Reportes", href: "/contabilidad/impuestos/reportes", kpi: "Dossier fiscal", icon: FileText },
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
    title: "Análisis Financiero",
    icon: BarChart3,
    items: [
      { label: "Análisis de Ventas", href: "/analisis-ventas", kpi: "+20.1% este mes", icon: BarChart3 },
      { label: "Riesgo Financiero", href: "/analisis-riesgo", kpi: "Nivel: Bajo", icon: ShieldCheck },
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
    <div className="space-y-12 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
      {/* --- HEADER CONTABLE --- */}
      <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-[#0A2472] pl-8 py-2 mt-10">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] shadow-sm mb-4">
                <Calculator className="h-3 w-3" /> CONTABILIDAD · SYSTEM KYRON
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#0A2472] uppercase leading-none">Gestión <span className="text-[#00A86B] italic">Financiera Integral</span></h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">Ejercicio Fiscal 2026 • Auditoría síncrona activa</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-slate-200 bg-white text-[#0A2472]">
                <History className="mr-3 h-4 w-4" /> AUDITORÍA
            </Button>
            <Button className="bg-[#0A2472] hover:bg-blue-900 text-white h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
                <Receipt className="mr-3 h-4 w-4" /> GENERAR BALANCE
            </Button>
        </div>
      </header>

      {/* --- KPIs FINANCIEROS --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "SALDO DE CAJA", val: "Bs. 123.456", trend: "+5.2%", color: "text-emerald-600", icon: Wallet },
          { label: "CUENTAS POR COBRAR", val: "Bs. 45.678", trend: "12 Facturas", color: "text-blue-600", icon: TrendingUp },
          { label: "CUENTAS POR PAGAR", val: "Bs. 23.456", trend: "8 Facturas", color: "text-rose-600", icon: HandCoins },
          { label: "IVA POR DECLARAR", val: "Bs. 5.678", trend: "Vence en 5d", color: "text-amber-600", icon: Landmark },
        ].map((kpi, i) => (
          <Card key={i} className="border-none bg-white p-2 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{kpi.label}</CardTitle>
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

      <div className="grid lg:grid-cols-12 gap-10">
        {/* --- NAVEGACIÓN DE MÓDULOS --- */}
        <div className="lg:col-span-8 space-y-12">
            {accountingModules.map((cat, idx) => (
                <div key={idx} className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472] flex items-center gap-4 italic ml-2">
                        <cat.icon className="h-5 w-5" /> {cat.title}
                        <div className="h-px flex-1 bg-gradient-to-r from-[#0A2472]/20 to-transparent" />
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cat.items.map((item, i) => (
                            <Link key={i} href={item.href as any}>
                                <Card className="border-none bg-white hover:bg-slate-50 transition-all rounded-2xl p-6 flex justify-between items-center group shadow-sm hover:shadow-md">
                                    <div className="flex items-center gap-5">
                                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#0A2472]/10 transition-colors">
                                            <item.icon className="h-5 w-5 text-slate-400 group-hover:text-[#0A2472] transition-all" />
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-black uppercase tracking-tight text-slate-700 group-hover:text-[#0A2472] transition-colors">{item.label}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.kpi}</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-[#0A2472] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* --- ALERTAS Y TABLAS --- */}
        <div className="lg:col-span-4 space-y-10">
            <Card className="border-none bg-amber-50 rounded-[2.5rem] p-8 shadow-sm border-l-4 border-amber-500">
                <CardHeader className="p-0 mb-8">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 flex items-center gap-3">
                        <ShieldAlert className="h-4 w-4" /> Alertas y Vencimientos
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                    {[
                        { text: "IVA Marzo vence en 5 días", color: "text-amber-600" },
                        { text: "ISLR por declarar (31/03)", color: "text-rose-600" },
                        { text: "3 facturas vencidas (Bs. 12.500)", color: "text-rose-600" },
                        { text: "Última conciliación: hoy 08:00", color: "text-emerald-600" }
                    ].map((alert, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-100 group hover:shadow-md transition-all">
                            <div className={cn("h-2 w-2 rounded-full mt-1 shrink-0", alert.color.replace('text-', 'bg-'))} />
                            <p className={cn("text-[10px] font-bold uppercase tracking-tight leading-tight", alert.color)}>{alert.text}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="border-none bg-white rounded-[2.5rem] overflow-hidden shadow-sm">
                <CardHeader className="p-8 border-b bg-slate-50 flex flex-row justify-between items-center">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0A2472] italic">Movimientos Recientes</CardTitle>
                    <Activity className="h-4 w-4 text-[#0A2472]/20" />
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableBody>
                            {[
                                { date: "15/03", desc: "Pago proveedor XYZ", amount: -5000, status: "Pagado", color: "text-rose-600" },
                                { date: "14/03", desc: "Factura INV-005", amount: 12000, status: "Pendiente", color: "text-emerald-600" },
                                { date: "13/03", desc: "Recibo de nómina", amount: -23000, status: "Procesado", color: "text-rose-600" },
                            ].map((mv, i) => (
                                <TableRow key={i} className="hover:bg-slate-50 border-slate-100">
                                    <TableCell className="pl-8 py-5">
                                        <p className="font-black text-[10px] text-slate-700 uppercase italic">{mv.desc}</p>
                                        <p className="text-[8px] text-slate-400 uppercase">{mv.date} • {mv.status}</p>
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
                <CardFooter className="p-6 bg-slate-50 flex justify-center border-t">
                    <Button variant="link" asChild className="text-[9px] font-black uppercase tracking-widest text-[#0A2472]">
                        <Link href="/transactions">VER TODAS LAS OPERACIONES</Link>
                    </Button>
                </CardFooter>
            </Card>

            <Card className="bg-[#0A2472] text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-xl group border-none">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-32 w-32" /></div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 relative z-10 text-[#00A86B]">Blindaje Fiscal</h3>
                <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8 relative z-10">El sistema de auditoría preventiva está validando el 100% de los libros fiscales contra la normativa vigente.</p>
                <Button className="w-full h-12 bg-[#00A86B] hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-lg relative z-10 border-none">ACTIVAR REVISIÓN COMPLETA</Button>
            </Card>
        </div>
      </div>

      <div className="mt-10">
        <OverviewChart />
      </div>
    </div>
  );
}