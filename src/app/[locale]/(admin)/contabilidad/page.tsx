
"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "@/navigation";
import { 
  Calculator, 
  BookOpen, 
  Landmark, 
  Wallet, 
  BarChart3, 
  History, 
  ShieldAlert, 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  FileText, 
  Coins, 
  Scale, 
  ArrowUpRight, 
  ArrowDownRight, 
  Building, 
  Activity, 
  Target, 
  PieChart, 
  Zap, 
  ClipboardCheck, 
  CreditCard,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";

/**
 * @fileOverview Dashboard de Contabilidad Maestra - System Kyron v2.6.5
 * Consola de Inteligencia Financiera de Alta Densidad Técnica.
 */

const categories = [
  {
    title: "Libros Contables",
    icon: BookOpen,
    items: [
      { label: "Libro Compras/Ventas", href: "/contabilidad/libros/compra-venta", kpi: "15 Facturas Mes", icon: Receipt },
      { label: "Libro de Nómina", href: "/contabilidad/libros/nomina", kpi: "23 Empleados", icon: UsersIcon },
      { label: "Libro de Inventario", href: "/contabilidad/libros/inventario", kpi: "4 SKUs Críticos", icon: ClipboardCheck },
      { label: "Libro Cesta Ticket", href: "/contabilidad/libros/cesta-ticket", kpi: "Q1 Procesada", icon: Wallet },
    ]
  },
  {
    title: "Gestión de Impuestos",
    icon: Landmark,
    items: [
      { label: "Declaración IVA", href: "/contabilidad/impuestos/iva", kpi: "Vence en 5d", icon: Calculator },
      { label: "ISLR y AR-C", href: "/contabilidad/impuestos/islr", kpi: "Listo 31/03", icon: FileText },
      { label: "IGTF (3%)", href: "/contabilidad/impuestos/igtf", kpi: "Tasa Activa", icon: Coins },
      { label: "Timbres Fiscales", href: "/contabilidad/impuestos/timbres", kpi: "UT: 0.40", icon: Scale },
    ]
  },
  {
    title: "Cuentas y Bancos",
    icon: Wallet,
    items: [
      { label: "Cuentas por Cobrar", href: "/contabilidad/cuentas/por-cobrar", kpi: "Bs. 45.678", icon: ArrowUpRight },
      { label: "Cuentas por Pagar", href: "/contabilidad/cuentas/por-pagar", kpi: "Bs. 23.456", icon: ArrowDownRight },
      { label: "Cuentas Bancarias", href: "/contabilidad/cuentas/bancarias", kpi: "3 Cuentas", icon: Building },
    ]
  },
  {
    title: "Inteligencia y Análisis",
    icon: BarChart3,
    items: [
      { label: "Análisis de Ventas", href: "/contabilidad/analisis/ventas", kpi: "+12.7% Mes", icon: TrendingUp },
      { label: "Análisis de Caja", href: "/contabilidad/analisis/caja", kpi: "Ratio: 2.4", icon: Activity },
      { label: "Análisis de Riesgo", href: "/contabilidad/analisis/riesgo", kpi: "Nivel: Bajo", icon: ShieldAlert },
      { label: "Rentabilidad Pro", href: "/contabilidad/analisis/rentabilidad", kpi: "ROI: 28%", icon: Target },
      { label: "Factibilidad Econ.", href: "/contabilidad/analisis/factibilidad", kpi: "Audit: 2026", icon: PieChart },
    ]
  },
  {
    title: "Ajustes y Tesorería",
    icon: Zap,
    items: [
      { label: "Ajuste por Inflación", href: "/contabilidad/ajustes/inflacion", kpi: "RIPF Activo", icon: Zap },
      { label: "Estructura de Costos", href: "/contabilidad/ajustes/costos", kpi: "Margen: 32%", icon: Calculator },
      { label: "Arqueo de Caja", href: "/contabilidad/tesoreria/arqueo", kpi: "Hoy 08:00", icon: ClipboardCheck },
      { label: "Billetera Digital", href: "/contabilidad/tesoreria/billetera", kpi: "VES/USD/EUR", icon: CreditCard },
      { label: "Transacciones", href: "/contabilidad/tesoreria/transacciones", kpi: "45 Hoy", icon: History },
    ]
  }
];

// Helper components for missing icons
function UsersIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}

export default function ContabilidadMaestraPage() {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Inyectar Chart.js desde CDN si no existe
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.async = true;
    script.onload = () => {
      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        if (ctx) {
          // @ts-ignore
          new window.Chart(ctx, {
            type: "line",
            data: {
              labels: ["Oct", "Nov", "Dic", "Ene", "Feb", "Mar"],
              datasets: [
                {
                  label: "Ingresos",
                  data: [45000, 52000, 48000, 61000, 55000, 72000],
                  borderColor: "#00A86B",
                  backgroundColor: "rgba(0, 168, 107, 0.1)",
                  fill: true,
                  tension: 0.4,
                  borderWidth: 4,
                  pointRadius: 0
                },
                {
                  label: "Gastos",
                  data: [32000, 35000, 38000, 41000, 39000, 45000],
                  borderColor: "#0A2472",
                  backgroundColor: "rgba(10, 36, 114, 0.1)",
                  fill: true,
                  tension: 0.4,
                  borderWidth: 4,
                  pointRadius: 0
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { beginAtZero: true, grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } },
                x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' } } }
              }
            }
          });
        }
      }
    };
    document.body.appendChild(script);
  }, []);

  const handleDevAlert = () => alert("Funcionalidad en desarrollo operativo.");

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-900 pb-20 font-sans">
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
          transition: all 0.3s ease;
        }
        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.12);
          border-color: rgba(10, 36, 114, 0.2);
        }
        .hud-grid {
          background-image: radial-gradient(#0A2472 0.5px, transparent 0.5px);
          background-size: 30px 30px;
          opacity: 0.03;
        }
        .italic-shadow {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.05);
        }
      `}</style>

      {/* 1. HEADER HUD */}
      <header className="p-8 md:p-12 mb-8 bg-white border-b flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] mb-4">
            <Calculator className="h-3 w-3" /> NODO CONTABLE v2.6.5
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic leading-none italic-shadow">Contabilidad <span className="text-[#0A2472]">Master</span></h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">Gestión Financiera Integral • 15/03/2026</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-slate-200 bg-white" onClick={handleDevAlert}>
            REPORTE GLOBAL
          </Button>
          <Button className="h-12 px-10 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl bg-[#0A2472] text-white hover:bg-blue-900">
            CERRAR PERIODO
          </Button>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* 2. KPIs PRINCIPALES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "SALDO DE CAJA", value: "Bs. 123.456,00", trend: "+5.2%", icon: Wallet, color: "text-emerald-500" },
            { label: "CUENTAS X COBRAR", value: "Bs. 45.678,50", sub: "12 Facturas", icon: ArrowUpRight, color: "text-blue-500" },
            { label: "CUENTAS X PAGAR", value: "Bs. 23.456,20", sub: "8 Facturas", icon: ArrowDownRight, color: "text-rose-500" },
            { label: "IVA POR DECLARAR", value: "Bs. 5.678,00", sub: "Vence en 5 días", icon: Landmark, color: "text-amber-500" },
          ].map((kpi, i) => (
            <Card key={i} className="glass-card border-none p-2 rounded-[2rem]">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
                <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{kpi.label}</CardTitle>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-xl md:text-2xl font-black italic tracking-tighter text-slate-900">{kpi.value}</div>
                <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend || kpi.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3. MATRIZ DE MÓDULOS */}
        <section className="space-y-12">
          {categories.map((group) => (
            <div key={group.title} className="space-y-8">
              <div className="flex items-center gap-6">
                  <div className="p-3 bg-[#0A2472]/10 rounded-2xl border border-[#0A2472]/20">
                      <group.icon className="h-6 w-6 text-[#0A2472]" />
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-800 italic-shadow">{group.title}</h3>
                  <div className="h-px flex-1 bg-slate-200"></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {group.items.map((item) => (
                  <Link key={item.label} href={item.href as any}>
                    <Card className="glass-card border-none p-8 h-full flex flex-col justify-between group overflow-hidden rounded-[2rem]">
                      <div className="space-y-6">
                          <div className="p-3 bg-[#0A2472]/5 rounded-xl w-fit group-hover:scale-110 group-hover:bg-[#0A2472]/10 transition-all shadow-inner border border-[#0A2472]/5">
                            <item.icon className="h-5 w-5 text-[#0A2472]" />
                          </div>
                          <div>
                              <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-700 group-hover:text-[#0A2472] transition-colors leading-none mb-2">{item.label}</h4>
                              <p className="text-[9px] font-bold text-slate-400 uppercase italic tracking-widest">{item.kpi}</p>
                          </div>
                      </div>
                      <div className="flex justify-end pt-6">
                          <ChevronRight className="h-4 w-4 text-slate-200 group-hover:text-[#0A2472] group-hover:translate-x-1 transition-all" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 4. GRÁFICO Y ALERTAS */}
        <div className="grid lg:grid-cols-12 gap-10">
          <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] overflow-hidden">
            <CardHeader className="p-10 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between">
                  <div className="space-y-1">
                      <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472] italic">Evolución Financiera</CardTitle>
                      <CardDescription className="text-[9px] font-bold uppercase opacity-30 tracking-widest">Comparativa Semestral Ingresos vs Gastos</CardDescription>
                  </div>
                  <Activity className="h-5 w-5 text-[#0A2472] animate-pulse" />
              </div>
            </CardHeader>
            <CardContent className="p-10 h-[400px]">
              <canvas ref={chartRef}></canvas>
            </CardContent>
          </Card>

          <div className="lg:col-span-4 space-y-8">
              <Card className="glass-card border-none p-10 rounded-[3rem] bg-[#0A2472] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                      <ShieldAlert className="h-32 w-32" />
                  </div>
                  <CardHeader className="p-0 mb-8">
                      <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-white/60">Monitor de Riesgo</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-6">
                      {[
                          { text: "IVA Julio 2024 vence en 5 días", color: "text-amber-400", icon: Clock },
                          { text: "ISLR por declarar (31/03)", color: "text-amber-400", icon: AlertTriangle },
                          { text: "3 Facturas vencidas (Bs. 12.500)", color: "text-rose-400", icon: ShieldAlert },
                          { text: "Conciliación Bancaria: Hoy 08:00", color: "text-emerald-400", icon: CheckCircle2 },
                      ].map((alert, i) => (
                          <div key={i} className="flex items-start gap-4 group/alert">
                              <alert.icon className={cn("h-5 w-5 mt-0.5", alert.color)} />
                              <p className={cn("text-xs font-bold uppercase tracking-widest leading-relaxed", alert.color)}>{alert.text}</p>
                          </div>
                      ))}
                  </CardContent>
                  <CardFooter className="p-0 pt-10">
                      <Button variant="outline" className="w-full h-12 rounded-xl border-white/20 bg-white/5 text-white font-black uppercase text-[9px] tracking-widest hover:bg-white/10" onClick={handleDevAlert}>VER TODOS LOS AVISOS</Button>
                  </CardFooter>
              </Card>
          </div>
        </div>

        {/* 5. MOVIMIENTOS RECIENTES */}
        <Card className="glass-card border-none rounded-[3rem] overflow-hidden">
          <CardHeader className="p-10 border-b border-slate-100 bg-slate-50/50 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472] italic">Libro de Movimientos Recientes</CardTitle>
            <Button variant="ghost" className="text-[#0A2472] text-[9px] font-black uppercase tracking-widest hover:bg-blue-50" onClick={handleDevAlert}>VER LIBRO DIARIO</Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 border-none">
                  <TableHead className="pl-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                  <TableHead className="py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Descripción Operativa</TableHead>
                  <TableHead className="py-6 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Estado</TableHead>
                  <TableHead className="text-right pr-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                    { date: "15/03/2026", desc: "Pago proveedor Suministros Globales XYZ", amount: -5000, status: "Pagado" },
                    { date: "14/03/2026", desc: "Venta de Licencia Anual - Factura INV-005", amount: 12000, status: "Pendiente" },
                    { date: "13/03/2026", desc: "Liquidación de Nómina Q1 - Marzo", amount: -23000, status: "Procesado" },
                ].map((inv, i) => (
                  <TableRow key={i} className="border-slate-100 hover:bg-slate-50 transition-all group">
                    <TableCell className="pl-10 py-6 text-[10px] font-black text-slate-400 uppercase">{inv.date}</TableCell>
                    <TableCell className="py-6 font-bold text-xs text-slate-700 group-hover:text-[#0A2472] uppercase transition-colors">{inv.desc}</TableCell>
                    <TableCell className="py-6 text-center">
                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{inv.status}</Badge>
                    </TableCell>
                    <TableCell className={cn(
                        "text-right pr-10 py-6 font-mono text-sm font-black italic",
                        inv.amount > 0 ? "text-emerald-600" : "text-rose-600"
                    )}>
                        {formatCurrency(inv.amount, 'Bs.')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
