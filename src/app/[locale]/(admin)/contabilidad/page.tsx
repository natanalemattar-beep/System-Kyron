"use client";

import React, { useEffect, useRef } from "react";
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
  ArrowUpRight,
  TrendingDown,
  CheckCircle,
  Clock,
  PieChart,
  DollarSign,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";

// Simulación de datos para las categorías contables
const accountingCategories = [
  {
    title: "Libros Fiscales",
    icon: BookOpen,
    items: [
      { label: "Compras y Ventas", href: "/libro-compra-venta", kpi: "10 facturas este mes" },
      { label: "Libro de Nómina", href: "/nominas", kpi: "23 empleados registrados" },
      { label: "Libro de Inventario", href: "/inventario", kpi: "Existencias: Ok" },
      { label: "Cesta Ticket", href: "/contabilidad", kpi: "Vigente Mar'26" },
    ]
  },
  {
    title: "Impuestos y Tasas",
    icon: Landmark,
    items: [
      { label: "Declaración de IVA", href: "/declaracion-iva", kpi: "Vence en 5 días" },
      { label: "ISLR y AR-C", href: "/islr-arc", kpi: "Por generar" },
      { label: "IGTF (3%)", href: "/gaceta-6952", kpi: "Tasa: 3.0%" },
      { label: "Timbres Fiscales", href: "/permisos", kpi: "Al día" },
    ]
  },
  {
    title: "Cuentas y Bancos",
    icon: Wallet,
    items: [
      { label: "Cuentas por Cobrar", href: "/cuentas-por-cobrar", kpi: "Bs. 45.678" },
      { label: "Cuentas por Pagar", href: "/cuentas-por-pagar", kpi: "Bs. 23.456" },
      { label: "Conciliación Bancaria", href: "/analisis-caja", kpi: "Sincronizado" },
    ]
  },
  {
    title: "Análisis y Estrategia",
    icon: BarChart3,
    items: [
      { label: "Análisis de Ventas", href: "/analisis-ventas", kpi: "+20% vs anterior" },
      { label: "Análisis de Riesgo", href: "/analisis-riesgo", kpi: "Nivel: Bajo" },
      { label: "Factibilidad Económica", href: "/estudio-factibilidad-economica", kpi: "TIR: 28%" },
      { label: "Estructura de Costos", href: "/estructura-costos", kpi: "Optimizado" },
    ]
  },
  {
    title: "Tesorería y Caja",
    icon: Activity,
    items: [
      { label: "Arqueo de Caja", href: "/arqueo-caja", kpi: "Último: Hoy 08:00" },
      { label: "Billetera de Cambio", href: "/billetera-cambio", kpi: "Tasas BCV" },
      { label: "Historial de Transacciones", href: "/transactions", kpi: "45 operaciones hoy" },
    ]
  }
];

const recentMovements = [
  { fecha: "15/03/2026", desc: "Pago proveedor Suministros C.A.", monto: -5000, estado: "Pagado" },
  { fecha: "14/03/2026", desc: "Factura Venta #00123 - Tech Solutions", monto: 12000, estado: "Pendiente" },
  { fecha: "13/03/2026", desc: "Recibo de nómina Q1", monto: -23000, estado: "Procesado" },
];

export default function ContabilidadPage() {
  const handleSimulatedAction = () => {
    alert("Funcionalidad en desarrollo del Sistema de Inteligencia");
  };

  return (
    <div className="space-y-10 pb-20">
      <style jsx global>{`
        .chart-container {
          position: relative;
          height: 300px;
          width: 100%;
        }
      `}</style>

      {/* --- HEADER SECCIÓN --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-l-4 border-primary pl-8 py-2">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow-sm">
                <Calculator className="h-3 w-3" /> SISTEMA FINANCIERO v2.6
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase italic leading-none italic-shadow">
                Contabilidad <span className="text-primary not-italic">· Central</span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Gestión Financiera Integral • Ejercicio 2026</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline" className="h-12 px-6 rounded-xl border-border bg-card/50 text-foreground text-[9px] font-black uppercase tracking-widest" onClick={handleSimulatedAction}>
                <History className="mr-2 h-4 w-4" /> AUDITORÍA
            </Button>
            <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black uppercase text-[9px] tracking-widest shadow-2xl" onClick={handleSimulatedAction}>
                <Receipt className="mr-2 h-4 w-4" /> REPORTES
            </Button>
        </div>
      </header>

      {/* --- KPIs PRINCIPALES --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Saldo de Caja", val: "Bs. 123.456", sub: "+5.2%", color: "text-emerald-500", icon: Wallet },
          { label: "Cuentas por Cobrar", val: "Bs. 45.678", sub: "12 facturas", color: "text-blue-500", icon: TrendingUp },
          { label: "Cuentas por Pagar", val: "Bs. 23.456", sub: "8 facturas", color: "text-rose-500", icon: TrendingDown },
          { label: "IVA por Declarar", val: "Bs. 5.678", sub: "Vence en 5d", color: "text-amber-500", icon: Landmark },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-xl group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted/50 border border-border group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-foreground">{kpi.val}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* --- ACCESOS POR CATEGORÍAS --- */}
        <div className="lg:col-span-8 space-y-10">
            {accountingCategories.map((cat, idx) => (
                <div key={idx} className="space-y-6">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary flex items-center gap-4 italic">
                        <cat.icon className="h-5 w-5" /> {cat.title}
                        <div className="h-px flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cat.items.map((item, i) => (
                            <Link key={i} href={item.href as any}>
                                <Card className="glass-card border-none bg-white/5 hover:bg-white/10 transition-all rounded-2xl p-6 flex justify-between items-center group border border-white/5">
                                    <div className="space-y-1">
                                        <p className="text-xs font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors">{item.label}</p>
                                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{item.kpi}</p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* --- ALERTAS Y TABLA --- */}
        <div className="lg:col-span-4 space-y-10">
            {/* Panel de Alertas */}
            <Card className="glass-card border-none bg-amber-500/5 rounded-[2.5rem] p-8 shadow-2xl border-l-4 border-amber-500">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600 flex items-center gap-3">
                        <ShieldAlert className="h-4 w-4" /> Alertas del Sistema
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                    {[
                        { text: "IVA Julio 2024 vence en 5 días", color: "text-amber-600" },
                        { text: "ISLR por declarar (31/03)", color: "text-amber-600" },
                        { text: "3 facturas vencidas (Bs. 12.500)", color: "text-rose-500" },
                        { text: "Última conciliación: Hoy 08:00", color: "text-emerald-600" }
                    ].map((alert, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <CheckCircle className={cn("h-3.5 w-3.5 mt-0.5", alert.color)} />
                            <p className={cn("text-[10px] font-bold uppercase tracking-tight", alert.color)}>{alert.text}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Movimientos Recientes */}
            <Card className="glass-card border-none bg-card/40 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <CardHeader className="p-8 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-primary italic">Movimientos Recientes</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableBody>
                            {recentMovements.map((mv, i) => (
                                <TableRow key={i} className="border-border/50 hover:bg-muted/20">
                                    <TableCell className="pl-8 py-5">
                                        <p className="font-black text-[10px] text-foreground/80 uppercase">{mv.desc}</p>
                                        <p className="text-[8px] text-muted-foreground uppercase">{mv.fecha}</p>
                                    </TableCell>
                                    <TableCell className="text-right pr-8">
                                        <p className={cn("font-black text-xs italic", mv.monto < 0 ? "text-rose-500" : "text-emerald-500")}>
                                            {formatCurrency(mv.monto, 'Bs.')}
                                        </p>
                                        <Badge variant="outline" className="text-[7px] font-black uppercase h-4 px-1.5">{mv.estado}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-6 bg-primary/5 flex justify-center border-t border-border">
                    <Button variant="link" className="text-[9px] font-black uppercase text-primary" onClick={handleSimulatedAction}>
                        Ver Todos los Asientos
                    </Button>
                </CardFooter>
            </Card>

            {/* Resumen de Libros */}
            <Card className="glass-card border-none bg-primary text-white rounded-[2.5rem] p-10 relative overflow-hidden shadow-glow group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Activity className="h-32 w-32" /></div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-6 relative z-10">Estado de Libros</h3>
                <div className="space-y-4 relative z-10">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-2">
                        <span>Compra:</span> <span>10 Facturas</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest border-b border-white/10 pb-2">
                        <span>Venta:</span> <span>15 Facturas</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span>Nómina:</span> <span>Bs. 56.000</span>
                    </div>
                </div>
            </Card>
        </div>
      </div>

      {/* --- GRÁFICO --- */}
      <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl mt-10">
        <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
            <div className="space-y-1">
                <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Evolución de Ingresos y Gastos</CardTitle>
                <CardDescription className="text-[9px] font-bold uppercase opacity-30 tracking-widest">Pulso financiero - Últimos 6 meses</CardDescription>
            </div>
            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#00A86B]" />
                    <span className="text-[8px] font-black uppercase opacity-40">Ingresos</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#0A2472]" />
                    <span className="text-[8px] font-black uppercase opacity-40">Gastos</span>
                </div>
            </div>
        </CardHeader>
        <CardContent className="p-10">
            {/* Aquí iría el componente Chart.js inyectado vía script o librería */}
            <div className="chart-container flex items-end justify-between gap-4 pt-10">
                {[40, 60, 45, 80, 55, 75].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full bg-primary/10 rounded-t-xl relative group">
                            <div className="absolute bottom-0 left-0 right-0 bg-[#00A86B] rounded-t-xl transition-all duration-1000" style={{ height: `${h}%` }}></div>
                            <div className="absolute bottom-0 left-1/4 right-1/4 bg-[#0A2472] rounded-t-xl opacity-80" style={{ height: `${h * 0.6}%` }}></div>
                        </div>
                        <span className="text-[9px] font-black text-muted-foreground/40 uppercase">Mes 0{i+1}</span>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
