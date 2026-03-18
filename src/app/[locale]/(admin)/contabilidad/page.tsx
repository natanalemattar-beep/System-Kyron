"use client";

import React, { useState } from "react";
import { Link } from "@/navigation";
import {
  Calculator, Wallet, TrendingUp, Activity, BookOpen, Receipt, Users, HandCoins, Zap,
  ArrowRight, Book, History, Box, Landmark, BrainCircuit, ShieldCheck, Bot, Loader as Loader2,
  ShieldAlert, ChartBar as BarChart3, CircleCheck as CheckCircle, Handshake,
  CreditCard, Smartphone, Building2, Phone, MessageSquare, Heart, Shield, Car,
  Banknote, RefreshCw, Store, Wifi, Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const kpiData = [
  { label: "LIQUIDEZ CERTIFICADA", val: "Bs. 123.456", trend: "+5.2%", color: "text-emerald-600", icon: Wallet },
  { label: "CUENTAS POR COBRAR", val: "Bs. 45.678", trend: "12 Activos", color: "text-primary", icon: TrendingUp },
  { label: "CUENTAS POR PAGAR", val: "Bs. 23.456", trend: "8 Compromisos", color: "text-rose-600", icon: HandCoins },
  { label: "EXPOSICIÓN FISCAL", val: "0.00%", trend: "BAJO RIESGO", color: "text-emerald-600", icon: ShieldCheck },
];

const frequentAccess = [
  { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, kpi: "Al día", color: "text-primary" },
  { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, kpi: "23 Empleados", color: "text-emerald-600" },
  { label: "ESFL y Condominios", href: "/contabilidad/entidades-sin-fines-lucro", icon: Handshake, kpi: "Transparencia", color: "text-emerald-600" },
  { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, kpi: "Ok", color: "text-primary" },
];

const serviciosBancarios = [
  {
    label: "Conciliación Bancaria",
    desc: "Gestión contable y conciliación automática de todos tus bancos",
    href: "/contabilidad/conciliacion-bancaria",
    icon: RefreshCw,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    badge: "AUTO",
  },
  {
    label: "Punto de Ventas",
    desc: "Gestión integral de terminales POS físicos y virtuales",
    href: "/contabilidad/punto-de-ventas",
    icon: Store,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    badge: "ACTIVO",
  },
  {
    label: "Tarjetas Crédito/Débito",
    desc: "Procesamiento de pagos con tarjetas de crédito y débito en tiempo real",
    href: "/contabilidad/pagos-digitales",
    icon: CreditCard,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    badge: "LIVE",
  },
  {
    label: "Billeteras Virtuales",
    desc: "Integración con billeteras digitales nacionales e internacionales",
    href: "/contabilidad/pagos-digitales",
    icon: Wallet,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "MULTI",
  },
  {
    label: "Pago Móvil Verificado",
    desc: "Verificación automática de pago móvil entre cliente y empresa, acreditación inmediata",
    href: "/contabilidad/pagos-digitales",
    icon: Smartphone,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
    badge: "INSTANT",
  },
];

const serviciosTelecom = [
  {
    label: "Facturación Ilimitada",
    desc: "Sistema de facturación integrado con línea telefónica. Internet ilimitado según mensualidad",
    href: "/contabilidad/facturacion-telecom",
    icon: Wifi,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    badge: "∞",
  },
  {
    label: "Telefonía Corporativa",
    desc: "Planes de telefonía corporativa integrados con módulos contables",
    href: "/contabilidad/telefonia-corporativa",
    icon: Phone,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    badge: "CORP",
  },
  {
    label: "WhatsApp Empresarial",
    desc: "Respuestas automáticas e inteligentes a consultas de clientes vía WhatsApp",
    href: "/contabilidad/whatsapp-empresarial",
    icon: MessageSquare,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    badge: "IA",
  },
];

const alianzas = [
  {
    label: "Chévere Salud",
    desc: "Servicio médico empresarial. Cobertura para empleados y directivos",
    href: "/contabilidad/alianzas/chevere-salud",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    tag: "SALUD",
  },
  {
    label: "Mercantil Seguros",
    desc: "Pólizas empresariales de responsabilidad civil, activos y bienes",
    href: "/contabilidad/alianzas/mercantil-seguros",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
    tag: "SEGUROS",
  },
  {
    label: "Mapfre",
    desc: "Seguros de vehículos, accidentes y cobertura patrimonial empresarial",
    href: "/contabilidad/alianzas/mapfre",
    icon: Car,
    color: "text-red-600",
    bg: "bg-red-600/10",
    border: "border-red-600/20",
    tag: "SEGUROS",
  },
];

export default function ContabilidadPage() {
  const { toast } = useToast();
  const [isAuditing, setIsAuditing] = useState(false);

  const runForensicAudit = () => {
    setIsAuditing(true);
    toast({ title: "INICIANDO AUDITORÍA FORENSE", description: "Escaneando inconsistencias en el Ledger central..." });
    setTimeout(() => {
      setIsAuditing(false);
      toast({
        title: "ANÁLISIS COMPLETADO",
        description: "Integridad de datos: 99.8%. 1 entrada requiere verificación manual.",
        action: <CheckCircle className="text-primary h-4 w-4" />,
      });
    }, 3000);
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-3">
            <BrainCircuit className="h-3 w-3" /> ÁREA CONTABLE INTEGRAL
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            CENTRO DE <span className="text-primary italic">CONTABILIDAD</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            Operating System v2.6.5 • Control Global
          </p>
        </div>
        <div className="flex gap-3 no-print">
          <button
            className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border border-border bg-card/50 text-foreground/60 hover:bg-primary/5 hover:text-primary transition-all flex items-center gap-3"
            onClick={runForensicAudit}
            disabled={isAuditing}
          >
            {isAuditing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldAlert className="h-4 w-4 text-primary" />}
            AUDITORÍA FORENSE
          </button>
          <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">
            <Receipt className="mr-3 h-4 w-4" /> CERRAR PERIODO
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, i) => (
          <Card key={i} className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl transition-all group overflow-visible">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
              <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
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

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-8">
          <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
              <Bot className="h-48 w-48 text-primary" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <Badge className="bg-primary text-primary-foreground border-none text-[8px] font-black px-4 py-1 uppercase tracking-[0.4em] shadow-glow">
                  Inteligencia Maestra
                </Badge>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Asistente Autónomo</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-primary/60">
                    <span>Capacidad de Aprendizaje</span>
                    <span>94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-1.5 bg-muted" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/50 rounded-2xl border border-border text-center">
                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Correcciones</p>
                    <p className="text-xl font-black text-foreground italic">145</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-2xl border border-border text-center">
                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Ahorro Tiempo</p>
                    <p className="text-xl font-black text-primary italic">12h</p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="w-full h-14 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl">
                GESTIONAR PROTOCOLOS
              </Button>
            </div>
          </Card>

          <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl overflow-visible">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 italic flex items-center gap-3">
              <Zap className="h-4 w-4" /> Optimización Inteligente
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group hover:bg-emerald-500/10 transition-all cursor-pointer">
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-600 uppercase">Ajuste RIPF Pendiente</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">
                    Se detectó una discrepancia del 2% en activos. Aplicar para blindaje fiscal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-all cursor-pointer">
                <Activity className="h-5 w-5 text-primary shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase">Crédito Fiscal</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">
                    Excedente de retenciones IVA disponible para compensación.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-10">
          <OverviewChart />

          <div className="space-y-6">
            <div className="flex items-center gap-4 ml-2">
              <div className="p-2 bg-primary/10 rounded-xl"><Activity className="h-5 w-5 text-primary" /></div>
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-muted-foreground/60 italic">Accesos Directos</h3>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {frequentAccess.map((item, i) => (
                <Link key={i} href={item.href as any}>
                  <Card className="glass-card border-none bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-xl min-h-[140px] overflow-visible">
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20 shadow-inner">
                        <item.icon className={cn("h-6 w-6 transition-all", item.color)} />
                      </div>
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors italic">{item.label}</p>
                        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.kpi}</p>
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/10 rounded-xl"><Banknote className="h-5 w-5 text-blue-500" /></div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-foreground italic">Servicios Bancarios y Pagos Digitales</h2>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Conciliación • POS • Tarjetas • Billeteras • Pago Móvil</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {serviciosBancarios.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Link href={s.href as any}>
                <Card className={cn("glass-card border bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-6 flex flex-col gap-4 group shadow-sm hover:shadow-xl min-h-[180px] overflow-visible", s.border)}>
                  <div className="flex items-start justify-between">
                    <div className={cn("p-3 rounded-xl", s.bg)}>
                      <s.icon className={cn("h-5 w-5", s.color)} />
                    </div>
                    <Badge className={cn("text-[7px] font-black px-2 py-0.5 uppercase tracking-widest border-none", s.bg, s.color)}>
                      {s.badge}
                    </Badge>
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className={cn("text-[11px] font-black uppercase tracking-tight group-hover:text-primary transition-colors italic", s.color)}>{s.label}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">{s.desc}</p>
                  </div>
                  <div className="flex justify-end">
                    <ArrowRight className="h-3 w-3 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-xl"><Globe className="h-5 w-5 text-cyan-500" /></div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-foreground italic">Telecomunicaciones Corporativas</h2>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Facturación • Internet Ilimitado • Telefonía • WhatsApp IA</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviciosTelecom.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={s.href as any}>
                <Card className={cn("glass-card border bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-8 flex flex-col gap-5 group shadow-sm hover:shadow-xl min-h-[200px] overflow-visible", s.border)}>
                  <div className="flex items-start justify-between">
                    <div className={cn("p-4 rounded-2xl", s.bg)}>
                      <s.icon className={cn("h-6 w-6", s.color)} />
                    </div>
                    <Badge className={cn("text-[8px] font-black px-3 py-1 uppercase tracking-widest border-none text-lg leading-none", s.bg, s.color)}>
                      {s.badge}
                    </Badge>
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className={cn("text-sm font-black uppercase tracking-tight group-hover:text-primary transition-colors italic", s.color)}>{s.label}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">{s.desc}</p>
                  </div>
                  <div className="flex justify-end">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-rose-500/10 rounded-xl"><Handshake className="h-5 w-5 text-rose-500" /></div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-foreground italic">Alianzas Estratégicas</h2>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Chévere Salud • Mercantil Seguros • Mapfre</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {alianzas.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={a.href as any}>
                <Card className={cn("glass-card border bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-8 flex flex-col gap-5 group shadow-sm hover:shadow-xl min-h-[200px] overflow-visible", a.border)}>
                  <div className="flex items-start justify-between">
                    <div className={cn("p-4 rounded-2xl", a.bg)}>
                      <a.icon className={cn("h-6 w-6", a.color)} />
                    </div>
                    <span className={cn("text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border", a.bg, a.color, a.border)}>
                      {a.tag}
                    </span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className={cn("text-sm font-black uppercase tracking-tight group-hover:text-primary transition-colors italic", a.color)}>{a.label}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">{a.desc}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest">Alianza Activa</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
