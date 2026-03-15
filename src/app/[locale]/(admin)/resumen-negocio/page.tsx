
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
  Bell, 
  PieChart,
  Target,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Calendar,
  Wallet,
  Scale
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
import { Link } from "@/navigation";
import { motion } from "framer-motion";
import { cn, formatCurrency } from "@/lib/utils";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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

const modules = {
  finanzas: [
    { label: "Contabilidad", href: "/contabilidad", kpi: "Auditoría OK", icon: Calculator },
    { label: "Cuentas por Cobrar", href: "/cuentas-por-cobrar", kpi: "Bs. 12.4k", icon: Wallet },
    { label: "Cuentas por Pagar", href: "/cuentas-por-pagar", kpi: "3 Pendientes", icon: Landmark },
    { label: "Ajuste RIPF", href: "/ajuste-por-inflacion", kpi: "Actualizado", icon: Activity },
    { label: "Declaración IVA", href: "/declaracion-iva", kpi: "Vence en 5d", icon: FileText },
    { label: "ISLR AR-C", href: "/islr-arc", kpi: "Generado", icon: Banknote },
    { label: "Análisis Caja", href: "/analisis-caja", kpi: "Flujo +12%", icon: TrendingUp },
    { label: "Rentabilidad Pro", href: "/analisis-rentabilidad", kpi: "VAN: $450k", icon: BarChart3 },
    { label: "Factibilidad", href: "/estudio-factibilidad-economica", kpi: "TIR: 28%", icon: Target },
    { label: "Fintech & Banca", href: "/pasarelas-pago", kpi: "Active", icon: Globe },
  ],
  ventas: [
    { label: "Facturación", href: "/facturacion", kpi: "Hub Activo", icon: FileText },
    { label: "Punto de Venta", href: "/punto-de-venta", kpi: "Terminal 01", icon: Smartphone },
    { label: "Ventas Crédito", href: "/facturacion-credito", kpi: "Cashea Sync", icon: CreditCard },
    { label: "Cotizaciones", href: "/proformas", kpi: "5 Enviadas", icon: Receipt },
    { label: "Invoices", href: "/invoices", kpi: "Ledger Ok", icon: History },
    { label: "Fidelización", href: "/fidelizacion-clientes", kpi: "98% Retención", icon: Heart },
    { label: "Estrategias IA", href: "/estrategias-ventas", kpi: "3 Sugeridas", icon: Zap },
  ],
  legal: [
    { label: "Escritorio Jurídico", href: "/escritorio-juridico", kpi: "Vault Pro", icon: Gavel },
    { label: "Actas Asamblea", href: "/acta-asamblea", kpi: "Última: 15/03", icon: FileSignature },
    { label: "Contratos", href: "/contratos", kpi: "24 Activos", icon: ShieldCheck },
    { label: "Autorizaciones", href: "/autorizaciones", kpi: "SAPI Valid", icon: CheckCircle2 },
    { label: "Judicial", href: "/documentos-judiciales", kpi: "En Proceso", icon: Scale },
  ],
  rrhh: [
    { label: "Nómina", href: "/nominas", kpi: "Q1 Procesada", icon: Users },
    { label: "Liquidaciones", href: "/prestaciones-sociales", kpi: "Cálculo IA", icon: Calculator },
    { label: "Horario Nocturno", href: "/libro-horario-nocturno", kpi: "Ok", icon: Clock },
    { label: "Reclutamiento", href: "/reclutamiento", kpi: "2 Vacantes", icon: Target },
    { label: "Carnet Digital", href: "/carnet-personal", kpi: "Biométrico", icon: Fingerprint },
  ],
  tecnologia: [
    { label: "Ingeniería IA", href: "/ingenieria-ia", kpi: "Planos 98%", icon: Cpu },
    { label: "Mi Línea 5G", href: "/mi-linea", kpi: "Activa", icon: Radio },
    { label: "Sostenibilidad", href: "/sostenibilidad", kpi: "1.2k Pts", icon: Recycle },
    { label: "Zero Risk", href: "/zero-risk", kpi: "Protegido", icon: ShieldAlert },
    { label: "Data Entry", href: "/data-entry", kpi: "OCR Activo", icon: Zap },
  ],
};

const recentActivities = [
  { text: "IVA Julio 2024 despachado.", time: "HACE 2H", icon: CheckCircle2, color: "text-emerald-500" },
  { text: "Gasto Bs. 1.200 registrado.", time: "HACE 5H", icon: DollarSign, color: "text-blue-500" },
  { text: "Factura INV-005 en mora.", time: "HACE 1D", icon: AlertTriangle, color: "text-amber-500" },
  { text: "Nómina Q1 procesada.", time: "HACE 2D", icon: Users, color: "text-purple-500" },
];

const recentInvoices = [
  { client: "Tech Solutions LLC", date: "20/07/2024", amount: 5000 },
  { client: "Innovate Corp", date: "18/07/2024", amount: 12000 },
  { client: "Marketing Pro", date: "25/06/2024", amount: 2500 },
  { client: "Constructora XYZ", date: "22/07/2024", amount: 7500 },
  { client: "Epsilon Services", date: "15/07/2024", amount: 800 },
];

export default function ResumenNegocioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* 1. HEADER INTEGRADO EN APP-HEADER (NO DUPLICAR) */}
      
      {/* 2. KPIs GLOBALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "INGRESOS TOTALES", value: "Bs. 45.231,89", trend: "+20.1%", icon: TrendingUp, color: "text-emerald-500" },
          { label: "GASTOS TOTALES", value: "Bs. 21.345,67", trend: "+12.5%", icon: TrendingDown, color: "text-rose-500" },
          { label: "UTILIDAD NETA", value: "Bs. 23.886,22", trend: "+30.2%", icon: Zap, color: "text-primary" },
          { label: "FACTURACIÓN EMITIDA", value: "3", sub: "2 hoy", icon: ShoppingCart, color: "text-blue-400" },
        ].map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-white/[0.02] p-2 rounded-[2rem] hover:bg-white/[0.04] transition-all group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">{kpi.label}</CardTitle>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                <kpi.icon className={cn("h-4 w-4", kpi.color)} />
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="text-2xl font-black italic tracking-tighter text-foreground">{kpi.value}</div>
              <div className="flex items-center gap-2 mt-1">
                {kpi.trend && <span className={cn("text-[9px] font-black uppercase", kpi.color)}>{kpi.trend}</span>}
                {kpi.sub && <span className="text-[9px] font-bold text-muted-foreground uppercase opacity-40">{kpi.sub}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* 3. ARCHIVO SEGURO */}
        <Card className="lg:col-span-4 bg-primary text-primary-foreground rounded-[2.5rem] overflow-hidden relative group p-1 shadow-2xl border-none">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-all duration-1000">
                <Lock className="h-32 w-32" />
            </div>
            <div className="p-8 space-y-6 relative z-10 bg-primary rounded-[2.4rem] h-full flex flex-col justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-2xl font-black uppercase italic tracking-tighter leading-tight text-white">Archivo Seguro</CardTitle>
                    <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-40 text-white">PROTECCIÓN DE DATOS 2026</p>
                </div>
                <div className="space-y-6">
                    <p className="text-xs font-bold opacity-80 leading-relaxed italic text-white uppercase tracking-widest">
                        Acceso seguro a expedientes corporativos y guías de cumplimiento bajo protocolo de cifrado AES-512.
                    </p>
                    <Button variant="secondary" asChild className="w-full h-12 text-[10px] font-black bg-white text-primary hover:bg-white/90 rounded-xl uppercase tracking-widest transition-all">
                        <Link href="/manual-usuario" className="flex justify-between w-full px-4">
                            <span>GUÍAS TÉCNICAS</span> 
                            <ArrowRight className="h-4 w-4"/>
                        </Link>
                    </Button>
                </div>
            </div>
        </Card>

        {/* 4. GRÁFICO FINANCIERO */}
        <Card className="lg:col-span-8 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Pulso Financiero Anual</CardTitle>
                    <CardDescription className="text-[10px] font-bold uppercase opacity-30 tracking-widest">Análisis Comparativo de Ingresos y Egresos</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-primary animate-pulse" />
            </div>
          </CardHeader>
          <CardContent className="p-10 h-[350px]">
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
                  <XAxis dataKey="month" axisLine={false} tickLine={false} stroke="#475569" fontSize={10} fontWeight="900" tickMargin={15} />
                  <YAxis axisLine={false} tickLine={false} stroke="#475569" fontSize={10} fontWeight="900" tickFormatter={(val) => `${val / 1000}k`} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <Area type="monotone" dataKey="ingresos" stroke="#00A86B" strokeWidth={4} fillOpacity={1} fill="url(#colorIngresos)" />
                  <Area type="monotone" dataKey="gastos" stroke="#0A2472" strokeWidth={4} fillOpacity={1} fill="url(#colorGastos)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* 5. MÓDULOS DE GESTIÓN */}
      <section className="space-y-12">
        {Object.entries(modules).map(([category, items]) => (
          <div key={category} className="space-y-6">
            <div className="flex items-center gap-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic border-l-4 border-primary pl-4">{category.replace('-', ' ')}</h3>
                <div className="h-px flex-1 bg-border/50"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {items.map((item) => (
                <Link key={item.label} href={item.href as any}>
                  <Card className="glass-card border-none bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all group h-full flex flex-col justify-between border border-transparent hover:border-primary/20">
                    <div className="p-3 bg-primary/5 rounded-xl w-fit group-hover:scale-110 transition-transform mb-4">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors">{item.label}</h4>
                        <p className="text-[8px] font-bold text-muted-foreground uppercase opacity-40 mt-1">{item.kpi}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* 6. ACTIVIDAD RECIENTE */}
        <Card className="lg:col-span-5 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Actividad de Nodo</CardTitle>
          </CardHeader>
          <CardContent className="p-10 space-y-6">
            {recentActivities.map((act, i) => (
              <div key={i} className="flex items-start gap-6 group">
                <div className={cn("p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform shadow-inner", act.color)}>
                  <act.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-tight text-foreground/80">{act.text}</p>
                  <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">{act.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 7. FACTURAS RECIENTES */}
        <Card className="lg:col-span-7 glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
          <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center">
            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Últimos Ingresos</CardTitle>
            <Button variant="ghost" asChild className="text-[9px] font-black uppercase tracking-widest text-primary hover:bg-primary/5">
                <Link href="/facturacion">VER TODAS <ArrowRight className="ml-2 h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 border-none">
                  <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Cliente</TableHead>
                  <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha</TableHead>
                  <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.map((inv, i) => (
                  <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                    <TableCell className="pl-10 py-5 font-black text-xs text-foreground/80 uppercase italic">{inv.client}</TableCell>
                    <TableCell className="py-5 text-[10px] font-bold text-muted-foreground/60">{inv.date}</TableCell>
                    <TableCell className="text-right pr-10 py-5 font-mono text-sm font-black text-primary italic">{formatCurrency(inv.amount, 'Bs.')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* 8. GUÍAS TÉCNICAS */}
      <section className="pb-20">
        <div className="flex items-center gap-6 mb-10">
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary italic">Biblioteca Técnica de Nodo</h3>
            <div className="h-px flex-1 bg-border/50"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { title: "Protocolo de Cierre Q1", desc: "Guía para la dispersión de fondos.", icon: BookOpen },
                { title: "Manual de Arqueo", desc: "Control de mermas y sobrantes.", icon: History },
                { title: "Seguridad Nivel 5", desc: "Configuración de claves maestras.", icon: ShieldCheck },
                { title: "Inferencia IA", desc: "Optimización de lectura OCR.", icon: BrainCircuit }
            ].map((guide, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-primary/20 transition-all cursor-pointer group flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform"><guide.icon className="h-4 w-4 text-primary" /></div>
                    <div className="space-y-1">
                        <h4 className="text-[9px] font-black uppercase italic text-foreground/90">{guide.title}</h4>
                        <p className="text-[8px] font-bold text-muted-foreground uppercase opacity-40">{guide.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      <style jsx global>{`
        .glass-card {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .italic-shadow {
          text-shadow: 2px 2px 10px rgba(0,0,0,0.05);
        }
        .shadow-glow {
          box-shadow: 0 0 35px hsla(var(--primary), 0.25);
        }
        .shadow-glow-text {
          text-shadow: 0 0 15px hsla(var(--primary), 0.5);
        }
      `}</style>
    </div>
  );
}

function Banknote(props: any) {
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
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function Receipt(props: any) {
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
      <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z" />
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
      <path d="M12 17.5V6.5" />
    </svg>
  );
}

function FileSignature(props: any) {
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
      <path d="M20 19.5V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16.5" />
      <path d="M8 18h8" />
      <path d="M18.42 15.61a2.1 2 0 0 1 2.97 2.97L16.95 23 13 23l.42-3.95 4.58-3.95Z" />
      <path d="M8 14h4" />
      <path d="M8 10h10" />
    </svg>
  );
}

function BrainCircuit(props: any) {
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
      <path d="M12 4.5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-2.5" />
      <path d="M18 12V9" />
      <circle cx="18" cy="11" r="1" />
      <path d="M15 13v2" />
      <circle cx="15" cy="12" r="1" />
      <path d="M12 15v2" />
      <circle cx="12" cy="14" r="1" />
      <path d="M9 17v2" />
      <circle cx="9" cy="16" r="1" />
      <path d="M14 8h1" />
      <path d="M12 6h1" />
      <path d="M10 4h1" />
      <path d="M12 21v-1" />
      <path d="M12 3v1" />
    </svg>
  );
}

function Heart(props: any) {
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
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}
