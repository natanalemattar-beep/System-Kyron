
'use client';

import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  ShieldCheck, 
  Activity, 
  Lock, 
  ArrowRight, 
  Zap, 
  FileText, 
  Users, 
  Gavel, 
  Cpu, 
  Recycle, 
  Globe, 
  Landmark, 
  Calculator, 
  ChevronRight, 
  Clock, 
  PieChart,
  Target,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Wallet,
  Scale,
  Receipt,
  History,
  Heart,
  FileSignature,
  FileSearch,
  School,
  Fingerprint,
  Radio,
  Coins,
  Box,
  Truck,
  Building,
  CreditCard,
  ShieldAlert,
  Terminal,
  Settings2,
  Sparkles,
  Search,
  LayoutDashboard
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";

const financialData = [
  { month: "Ago '23", ingresos: 25000, gastos: 18000 },
  { month: "Sep '23", ingresos: 31000, gastos: 21000 },
  { month: "Oct '23", ingresos: 28000, gastos: 24000 },
  { month: "Nov '23", ingresos: 35000, gastos: 22000 },
  { month: "Dic '23", ingresos: 48000, gastos: 30000 },
  { month: "Ene '24", ingresos: 42000, gastos: 28000 },
  { month: "Feb '24", ingresos: 45000, gastos: 31000 },
  { month: "Mar '24", ingresos: 52000, gastos: 29000 },
  { month: "Abr '24", ingresos: 49000, gastos: 33000 },
  { month: "May '24", ingresos: 55000, gastos: 35000 },
  { month: "Jun '24", ingresos: 62000, gastos: 38000 },
  { month: "Jul '24", ingresos: 75000, gastos: 41000 },
];

const chartConfig = {
  ingresos: { label: "Ingresos", color: "#00A86B" },
  gastos: { label: "Gastos", color: "#0A2472" },
};

const moduleSections = [
  {
    title: "Finanzas y Contabilidad",
    icon: Calculator,
    modules: [
      { label: "Contabilidad", href: "/contabilidad", kpi: "Auditoría OK", icon: Calculator },
      { label: "Cuentas x Cobrar", href: "/cuentas-por-cobrar", kpi: "Bs. 12.4k", icon: Wallet },
      { label: "Cuentas x Pagar", href: "/cuentas-por-pagar", kpi: "3 Pendientes", icon: Truck },
      { label: "Ajuste RIPF", href: "/ajuste-por-inflacion", kpi: "INPC Mar'26", icon: Activity },
      { label: "Declaración IVA", href: "/declaracion-iva", kpi: "Vence en 5d", icon: FileText },
      { label: "ISLR AR-C", href: "/islr-arc", kpi: "Generado", icon: Landmark },
      { label: "Análisis Caja", href: "/analisis-caja", kpi: "Flujo +12%", icon: TrendingUp },
      { label: "Rentabilidad Pro", href: "/analisis-rentabilidad", kpi: "VAN: $450k", icon: BarChart3 },
      { label: "Factibilidad", href: "/estudio-factibilidad-economica", kpi: "TIR: 28%", icon: Target },
      { label: "Billetera Cambio", href: "/billetera-cambio", kpi: "Tasas BCV", icon: Globe },
    ]
  },
  {
    title: "Ventas y Facturación",
    icon: ShoppingCart,
    modules: [
      { label: "Facturación", href: "/facturacion", kpi: "Hub Activo", icon: FileText },
      { label: "Punto de Venta", href: "/punto-de-venta", kpi: "Terminal 01", icon: Smartphone },
      { label: "Ventas Crédito", href: "/facturacion-credito", kpi: "Cashea Sync", icon: CreditCard },
      { label: "Cotizaciones", href: "/proformas", kpi: "5 Enviadas", icon: Receipt },
      { label: "Invoices", href: "/invoices", kpi: "Ledger Ok", icon: History },
      { label: "Fidelización", href: "/fidelizacion-clientes", kpi: "98% Retención", icon: Heart },
      { label: "Estrategias IA", href: "/estrategias-ventas", kpi: "3 Sugeridas", icon: Zap },
      { label: "Análisis Ventas", href: "/analisis-ventas", kpi: "+12.7% Mes", icon: TrendingUp },
      { label: "Análisis Mercado", href: "/analisis-mercado", kpi: "8.5% Growth", icon: PieChart },
    ]
  },
  {
    title: "Legal y Corporativo",
    icon: Gavel,
    modules: [
      { label: "Escritorio Jurídico", href: "/escritorio-juridico", kpi: "Vault Pro", icon: Gavel },
      { label: "Actas Asamblea", href: "/acta-asamblea", kpi: "Última: 15/03", icon: FileSignature },
      { label: "Contratos", href: "/contratos", kpi: "24 Activos", icon: ShieldCheck },
      { label: "Autorizaciones", href: "/autorizaciones", kpi: "SAPI Valid", icon: CheckCircle2 },
      { label: "Permisos Vigentes", href: "/permisos", kpi: "CONATEL Ok", icon: FileSearch },
      { label: "Recursos Fiscales", href: "/recursos-fiscales", kpi: "Leyes 2026", icon: BookOpen },
      { label: "Gaceta 6.952", href: "/gaceta-6952", kpi: "Consultor IA", icon: Scale },
      { label: "Poderes Holding", href: "/poderes-representacion", kpi: "8 Vigentes", icon: Users },
      { label: "Crear Contratos", href: "/generador-documentos", kpi: "IA Wizard", icon: Zap },
      { label: "Tramites Corp", href: "/tramites-corporativos", kpi: "Internacional", icon: Globe },
    ]
  },
  {
    title: "Talento y Tecnología",
    icon: Cpu,
    modules: [
      { label: "Nómina Q1", href: "/nominas", kpi: "Procesada", icon: Users },
      { label: "Liquidaciones", href: "/prestaciones-sociales", kpi: "Cálculo IA", icon: Calculator },
      { label: "Reclutamiento", href: "/reclutamiento", kpi: "2 Vacantes", icon: Target },
      { label: "Horario Nocturno", href: "/libro-horario-nocturno", kpi: "Registro Ok", icon: Clock },
      { label: "Ingeniería IA", href: "/ingenieria-ia", kpi: "Planos 98%", icon: Cpu },
      { label: "Mi Línea 5G", href: "/mi-linea", kpi: "Activa", icon: Radio },
      { label: "Sostenibilidad", href: "/sostenibilidad", kpi: "1.2k Pts", icon: Recycle },
      { label: "Mercado Eco", href: "/mercado-ecocreditos", kpi: "Canje Activo", icon: Coins },
      { label: "Zero Risk", href: "/zero-risk", kpi: "Protegido", icon: ShieldAlert },
      { label: "Data Entry", href: "/data-entry", kpi: "OCR Activo", icon: Box },
    ]
  }
];

export default function ResumenNegocioPage() {
  const [mounted, setMounted] = useState(false);
  const [simulation, setSimulation] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const runSimulation = (type: string) => {
    setSimulation(null);
    setTimeout(() => {
      setSimulation(type);
      toast({
        title: "SIMULACIÓN COMPLETADA",
        description: "El gemelo digital ha proyectado los resultados del escenario estratégico.",
        action: <CheckCircle2 className="h-4 w-4 text-primary" />
      });
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* 1. KPIs GLOBALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "INGRESOS TOTALES", value: "Bs. 45.231,89", trend: "+20.1%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "GASTOS TOTALES", value: "Bs. 21.345,67", trend: "+12.5%", icon: TrendingDown, color: "text-rose-500" },
          { label: "UTILIDAD NETA", value: "Bs. 23.886,22", trend: "+30.2%", icon: Zap, color: "text-primary" },
          { label: "FACTURACIÓN HOY", value: "3", sub: "2 procesadas", icon: ShoppingCart, color: "text-blue-400" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] hover:bg-card/60 transition-all group shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/10 group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-foreground leading-none">{kpi.value}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn("text-[9px] font-black uppercase", kpi.color)}>{kpi.trend || kpi.sub}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* 2. GEMELO DIGITAL - SIMULADOR ESTRATÉGICO */}
        <Card className="lg:col-span-5 glass-card border-primary/20 overflow-hidden bg-white/[0.02] rounded-[3.5rem] shadow-2xl">
            <CardHeader className="p-10 border-b border-white/5 bg-primary/5">
                <CardTitle className="flex items-center gap-4 text-2xl font-black uppercase italic tracking-tighter">
                    <BarChart3 className="h-8 w-8 text-primary" />
                    Gemelo Digital
                </CardTitle>
                <CardDescription className="text-primary font-bold uppercase text-[9px] tracking-[0.3em]">Simulación de Escenarios en Tiempo Real</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 gap-3">
                    {[
                        { id: "sucursales", label: "Expansión +3 Sedes", icon: Building },
                        { id: "ventas", label: "Aumento Ventas 20%", icon: TrendingUp },
                        { id: "crisis", label: "Escenario Inflación", icon: ShieldAlert }
                    ].map(sc => (
                        <Button 
                            key={sc.id}
                            onClick={() => runSimulation(sc.id)}
                            variant="outline" 
                            className="justify-start h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-primary/10 group"
                        >
                            <sc.icon className="mr-4 h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{sc.label}</span>
                        </Button>
                    ))}
                </div>
                <AnimatePresence mode="wait">
                    {simulation && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            className="p-6 bg-primary/10 rounded-2xl border border-primary/20 shadow-inner"
                        >
                            <p className="text-[9px] font-black uppercase text-primary mb-2">Impacto Proyectado</p>
                            <p className="text-sm font-bold italic text-foreground leading-relaxed">
                                {simulation === 'ventas' ? "Incremento del 28% en rentabilidad neta para el Q3." : 
                                 simulation === 'sucursales' ? "Punto de equilibrio estimado en 14 meses por sede." : 
                                 "Requerimiento de liquidez adicional del 15% para cubrir costos op."}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>

        {/* 3. GRÁFICO FINANCIERO */}
        <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Pulso Financiero Anual</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Análisis Comparativo de Ingresos y Egresos</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-primary animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-10 h-[380px]">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                  <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#475569" fontSize={10} fontWeights="900" tickMargin={15} />
                  <YAxis axisLine={false} tickLine={false} stroke="#475569" fontSize={10} fontWeights="900" tickFormatter={(val) => `${val / 1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area type="monotone" dataKey="ingresos" stroke="#00A86B" strokeWidth={4} fillOpacity={1} fill="url(#colorIngresos)" />
                  <Area type="monotone" dataKey="gastos" stroke="#0A2472" strokeWidth={4} fillOpacity={1} fill="url(#colorGastos)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* 4. NODOS OPERATIVOS (CARPETAS DE MÓDULOS) */}
      <section className="space-y-16">
        {moduleSections.map((section) => (
          <div key={section.title} className="space-y-8">
            <div className="flex items-center gap-6">
                <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
                    <section.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground italic-shadow">{section.title}</h3>
                <div className="h-px flex-1 bg-border/50"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {section.modules.map((item) => (
                <Link key={item.label} href={item.href as any}>
                  <Card className="glass-card border-none bg-card/40 p-8 hover:bg-card/80 transition-all group h-full flex flex-col justify-between border-transparent hover:border-primary/30 shadow-xl rounded-[2rem]">
                    <div className="space-y-6">
                        <div className="p-3 bg-primary/5 rounded-xl w-fit group-hover:scale-110 group-hover:bg-primary/10 transition-all shadow-inner border border-primary/5">
                        <item.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="text-[11px] font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors leading-none mb-2">{item.label}</h4>
                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-40 italic tracking-widest">{item.kpi}</p>
                        </div>
                    </div>
                    <div className="flex justify-end pt-6">
                        <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* 5. ACTIVIDAD RECIENTE */}
        <Card className="lg:col-span-5 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Actividad de Nodo</CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-8">
            {[
                { text: "IVA Julio 2024 despachado.", time: "HACE 2H", icon: CheckCircle2, color: "text-emerald-500" },
                { text: "Gasto Bs. 1.200 registrado.", time: "HACE 5H", icon: DollarSign, color: "text-blue-500" },
                { text: "Factura INV-005 en mora.", time: "HACE 1D", icon: AlertTriangle, color: "text-amber-500" },
                { text: "Nómina Q1 procesada.", time: "HACE 2D", icon: Users, color: "text-purple-500" },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className={cn("p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-inner", act.color)}>
                  <act.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-black uppercase tracking-tight text-foreground/80">{act.text}</p>
                  <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest">{act.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 6. FACTURAS RECIENTES */}
        <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Últimos Ingresos</CardTitle>
            <Button variant="ghost" asChild className="text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/10">
                <Link href="/facturacion">VER TODAS <ArrowRight className="ml-3 h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Cliente VIP</TableHead>
                  <TableHead className="py-6 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Fecha</TableHead>
                  <TableHead className="text-right pr-10 py-6 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                    { client: "Tech Solutions LLC", date: "20/07/2024", amount: 5000 },
                    { client: "Innovate Corp", date: "18/07/2024", amount: 12000 },
                    { client: "Marketing Pro", date: "25/06/2024", amount: 2500 },
                    { client: "Constructora XYZ", date: "22/07/2024", amount: 7500 },
                    { client: "Epsilon Services", date: "15/07/2024", amount: 800 },
                ].map((inv, i) => (
                  <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                    <TableCell className="pl-10 py-6 font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary">{inv.client}</TableCell>
                    <TableCell className="py-6 text-[10px] font-bold text-muted-foreground/60 text-center uppercase">{inv.date}</TableCell>
                    <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic shadow-glow-text">{formatCurrency(inv.amount, 'Bs.')}</TableCell>
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
