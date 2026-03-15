
"use client";

import { useState, useEffect } from "react";
import { 
    Calculator, 
    Wallet, 
    TrendingUp, 
    TrendingDown, 
    ShieldCheck, 
    Terminal, 
    Activity, 
    ArrowUpRight, 
    ArrowDownRight, 
    CheckCircle,
    Lock,
    Zap,
    ChevronRight,
    ArrowRight,
    BarChart3,
    FileText,
    Landmark,
    Banknote,
    History,
    Receipt,
    BookOpen,
    Scale,
    AlertTriangle,
    PieChart,
    Target,
    LayoutDashboard,
    Clock,
    Search,
    Database,
    Coins,
    Box
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Legend
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";

const financialData = [
  { month: "Ene", ingresos: 45000, gastos: 32000 },
  { month: "Feb", ingresos: 52000, gastos: 35000 },
  { month: "Mar", ingresos: 48000, gastos: 38000 },
  { month: "Abr", ingresos: 61000, gastos: 41000 },
  { month: "May", ingresos: 55000, gastos: 39000 },
  { month: "Jun", ingresos: 72000, gastos: 45000 },
];

const chartConfig = {
  ingresos: { label: "Ingresos", color: "#00A86B" },
  gastos: { label: "Gastos", color: "#0A2472" },
};

const moduleGroups = [
  {
    title: "Libros Fiscales",
    icon: BookOpen,
    items: [
      { label: "Libro de Compras", href: "/libro-compra-venta", kpi: "10 facturas mes", icon: Receipt },
      { label: "Libro de Ventas", href: "/libro-compra-venta", kpi: "15 facturas", icon: FileText },
      { label: "Libro de Nómina", href: "/nominas", kpi: "23 empleados", icon: Users },
      { label: "Inventario", href: "/inventario", kpi: "4 SKUs críticos", icon: Box },
    ]
  },
  {
    title: "Impuestos y Tasas",
    icon: Landmark,
    items: [
      { label: "Declaración IVA", href: "/declaracion-iva", kpi: "Vence: 15/04", icon: Calculator },
      { label: "ISLR AR-C", href: "/islr-arc", kpi: "Por declarar", icon: Banknote },
      { label: "IGTF (3%)", href: "/gaceta-6952", kpi: "Tasa Activa", icon: Coins },
      { label: "Timbres Fiscales", href: "/permisos", kpi: "UT Actualizada", icon: Scale },
    ]
  },
  {
    title: "Cuentas y Bancos",
    icon: Wallet,
    items: [
      { label: "Cuentas x Cobrar", href: "/cuentas-por-cobrar", kpi: "Bs. 45.678", icon: ArrowUpRight },
      { label: "Cuentas x Pagar", href: "/cuentas-por-pagar", kpi: "Bs. 23.456", icon: ArrowDownRight },
      { label: "Conciliación", href: "/analisis-caja", kpi: "Hoy 08:00", icon: CheckCircle },
      { label: "Billetera Cambio", href: "/billetera-cambio", kpi: "USD/EUR/VES", icon: Globe },
    ]
  },
  {
    title: "Análisis y BI",
    icon: BarChart3,
    items: [
      { label: "Análisis Ventas", href: "/analisis-ventas", kpi: "+20% vs mes ant.", icon: TrendingUp },
      { label: "Flujo de Caja", href: "/analisis-caja", kpi: "Solvencia: 2.4", icon: Activity },
      { label: "Riesgo Fiscal", href: "/analisis-riesgo", kpi: "Nivel: Bajo", icon: ShieldAlert },
      { label: "Estructura Costos", href: "/estructura-costos", kpi: "Margen: 32%", icon: PieChart },
    ]
  },
  {
    title: "Ajustes y Tesorería",
    icon: Settings2,
    items: [
      { label: "Ajuste Inflación", href: "/ajuste-por-inflacion", kpi: "Ult: 01/03", icon: Zap },
      { label: "Arqueo de Caja", href: "/arqueo-caja", kpi: "Último: Hoy", icon: ClipboardCheck },
      { label: "Transacciones", href: "/transactions", kpi: "45 hoy", icon: History },
      { label: "Reportes Pro", href: "/reports", kpi: "Dossier Listo", icon: FileText },
    ]
  }
];

// Helper Icon for Arqueo (Lucide sometimes misses it in specific contexts)
const ClipboardCheck = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg>
);

export default function ContabilidadPage() {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10">
      {/* 1. HEADER HUD */}
      <motion.header 
        className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-[#0A2472] pl-6 md:pl-8 py-2 mt-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] shadow-glow mb-4">
                <Calculator className="h-3 w-3" /> NODO CONTABLE v2.6
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">CONTABILIDAD <span className="text-[#0A2472] italic">SYSTEM KYRON</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Gestión Financiera Integral • Arquitectura VEN-NIF</p>
        </div>
        <div className="flex gap-3 no-print">
            <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-[#0A2472]/20 bg-[#0A2472]/5 text-[#0A2472]">
                AUDITORÍA IA
            </Button>
            <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl bg-[#0A2472]">
                CERRAR PERIODO
            </Button>
        </div>
      </motion.header>

      {/* 2. KPIs PRINCIPALES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "SALDO DE CAJA", value: "Bs. 123.456,00", trend: "+5.2%", icon: Wallet, color: "text-emerald-500" },
          { label: "CUENTAS X COBRAR", value: "Bs. 45.678,50", trend: "-2.1%", icon: ArrowUpRight, color: "text-blue-500" },
          { label: "CUENTAS X PAGAR", value: "Bs. 23.456,20", trend: "+1.8%", icon: ArrowDownRight, color: "text-rose-500" },
          { label: "IVA POR DECLARAR", value: "Bs. 5.678,00", sub: "Vence: 15/04", icon: Landmark, color: "text-amber-500" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-2xl shadow-xl hover:bg-card/60 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-muted/50 border border-border">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-xl font-black italic tracking-tighter text-foreground">{kpi.value}</div>
              <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend || kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. GRÁFICO Y ALERTAS */}
      <div className="grid lg:grid-cols-12 gap-8">
        <Card className="lg:col-span-8 glass-card border-none rounded-[2.5rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472] italic">Evolución de Ingresos y Gastos</CardTitle>
                    <CardDescription className="text-[9px] font-bold uppercase opacity-30 tracking-widest">Análisis semestral consolidado</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-[#0A2472] animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-10 h-[350px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialData}>
                  <defs>
                    <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A86B" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#00A86B" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A2472" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#0A2472" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#475569" fontSize={10} fontWeights="900" />
                  <YAxis axisLine={false} tickLine={false} stroke="#475569" fontSize={10} fontWeights="900" tickFormatter={(val) => `${val / 1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area type="monotone" dataKey="ingresos" stroke="#00A86B" strokeWidth={4} fillOpacity={1} fill="url(#colorIngresos)" />
                  <Area type="monotone" dataKey="gastos" stroke="#0A2472" strokeWidth={4} fillOpacity={1} fill="url(#colorGastos)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="lg:col-span-4 space-y-8">
            <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-card/40 shadow-xl">
                <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500 flex items-center gap-3">
                        <ShieldAlert className="h-4 w-4" /> Alertas Críticas
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-4">
                    {[
                        { text: "IVA Julio 2024 vence en 5 días", color: "text-amber-600", bg: "bg-amber-500/10" },
                        { text: "ISLR por declarar (31/03)", color: "text-amber-600", bg: "bg-amber-500/10" },
                        { text: "3 facturas vencidas (Bs. 12.500)", color: "text-rose-600", bg: "bg-rose-500/10" },
                        { text: "Última conciliación: Hoy 08:00", color: "text-emerald-600", bg: "bg-emerald-500/10" },
                    ].map((alert, i) => (
                        <div key={i} className={cn("p-4 rounded-xl border border-transparent flex items-center gap-4 group hover:scale-[1.02] transition-all", alert.bg)}>
                            <div className={cn("h-1.5 w-1.5 rounded-full shrink-0 animate-pulse", alert.color.replace('text-', 'bg-'))} />
                            <p className={cn("text-[10px] font-black uppercase tracking-widest", alert.color)}>{alert.text}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="bg-[#0A2472] text-white rounded-[2.5rem] p-8 relative overflow-hidden shadow-glow border-none group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Zap className="h-24 w-24" /></div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4">Zero-Risk Fiscal</h3>
                <p className="text-[10px] font-bold opacity-80 leading-relaxed uppercase mb-8">Auditoría preventiva 24/7 sincronizada con el portal del SENIAT.</p>
                <Button variant="secondary" asChild className="w-full h-12 bg-white text-[#0A2472] font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">
                    <Link href="/zero-risk">ESTADO DE BLINDAJE</Link>
                </Button>
            </Card>
        </div>
      </div>

      {/* 4. MATRIZ DE MÓDULOS (TARJETAS NATIVAS) */}
      <section className="space-y-16">
        {moduleGroups.map((group) => (
          <div key={group.title} className="space-y-8">
            <div className="flex items-center gap-6">
                <div className="p-3 bg-[#0A2472]/10 rounded-2xl border border-[#0A2472]/20">
                    <group.icon className="h-6 w-6 text-[#0A2472]" />
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground italic-shadow">{group.title}</h3>
                <div className="h-px flex-1 bg-border/50"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {group.items.map((item) => (
                <Link key={item.label} href={item.href as any}>
                  <Card className="glass-card border-none bg-card/40 p-8 hover:bg-card/80 transition-all group h-full flex flex-col justify-between border-transparent hover:border-[#0A2472]/30 shadow-xl rounded-[2rem]">
                    <div className="space-y-6">
                        <div className="p-3 bg-[#0A2472]/5 rounded-xl w-fit group-hover:scale-110 group-hover:bg-[#0A2472]/10 transition-all shadow-inner border border-[#0A2472]/5">
                        <item.icon className="h-5 w-5 text-[#0A2472]" />
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black uppercase tracking-tight text-foreground/80 group-hover:text-[#0A2472] transition-colors leading-none mb-2">{item.label}</h4>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-40 italic tracking-widest">{item.kpi}</p>
                        </div>
                    </div>
                    <div className="flex justify-end pt-6">
                        <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-[#0A2472] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 5. RESUMEN DE LIBROS Y MOVIMIENTOS */}
      <div className="grid gap-10 lg:grid-cols-12">
        <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472] italic">Movimientos Recientes</CardTitle>
            <Button variant="ghost" asChild className="text-[9px] font-black uppercase text-[#0A2472] tracking-widest hover:bg-[#0A2472]/10">
                <Link href="/transactions">VER LIBRO DIARIO <ArrowRight className="ml-3 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                  <TableHead className="py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Descripción</TableHead>
                  <TableHead className="py-6 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Estado</TableHead>
                  <TableHead className="text-right pr-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                    { date: "15 MAR", desc: "Pago proveedor OficinaTech", amount: -5000, status: "Pagado" },
                    { date: "14 MAR", desc: "Factura INV-005 Epsilon", amount: 12000, status: "Pendiente" },
                    { date: "13 MAR", desc: "Recibo Nómina Q1", amount: -23000, status: "Procesado" },
                    { date: "12 MAR", desc: "Pago Móvil Venta TPV", amount: 1500, status: "Liquidado" },
                ].map((inv, i) => (
                  <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                    <TableCell className="pl-10 py-6 text-[9px] font-black text-muted-foreground uppercase">{inv.date}</TableCell>
                    <TableCell className="py-6 font-bold text-xs text-foreground/80 uppercase group-hover:text-[#0A2472]">{inv.desc}</TableCell>
                    <TableCell className="py-6 text-center">
                        <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest">{inv.status}</Badge>
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

        <Card className="lg:col-span-5 glass-card border-none rounded-[3rem] bg-white/[0.02] p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Database className="h-32 w-32" /></div>
            <div className="relative z-10">
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#0A2472] mb-10 flex items-center gap-4">
                    <Terminal className="h-5 w-5" /> Resumen de Libros (Mes)
                </h3>
                <div className="space-y-8">
                    {[
                        { label: "Libro de Compras", stats: "10 facturas · Bs. 45.000", color: "bg-blue-500" },
                        { label: "Libro de Ventas", stats: "15 facturas · Bs. 78.000", color: "bg-emerald-500" },
                        { label: "Libro de Nómina", stats: "23 empleados · Bs. 56.000", color: "bg-purple-500" },
                    ].map((book, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-foreground/60">
                                <span>{book.label}</span>
                                <span className="text-foreground">{book.stats}</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                <div className={cn("h-full opacity-60", book.color)} style={{ width: `${40 + (i * 20)}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-10 border-t border-border/50 mt-10 text-center">
                <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.5em] italic">Kyron Ledger Node • March 2026</p>
            </div>
        </Card>
      </div>
    </div>
  );
}
