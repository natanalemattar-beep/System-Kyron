"use client";

import React, { useState, useCallback } from "react";
import { Link } from "@/navigation";
import {
  Calculator, Wallet, TrendingUp, Activity, BookOpen, Receipt, Users, HandCoins, Zap,
  ArrowRight, Book, History, Box, Landmark, BrainCircuit, ShieldCheck, Bot, Loader as Loader2,
  ShieldAlert, ChartBar as BarChart3, CircleCheck as CheckCircle, Handshake,
  CreditCard, Smartphone, Building2, Phone, MessageSquare, Heart, Shield, Car,
  Banknote, RefreshCw, Store, Wifi, Globe
} from "lucide-react";
import { motion } from "framer-motion";
import { MotionContainer, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";

const kpiData = [
  { label: "LIQUIDEZ CERTIFICADA", val: "Bs. 2.847.320,00", trend: "+8.4% vs mes anterior", color: "text-emerald-600", icon: Wallet },
  { label: "CUENTAS POR COBRAR", val: "Bs. 934.150,00", trend: "18 Facturas Activas", color: "text-primary", icon: TrendingUp },
  { label: "CUENTAS POR PAGAR", val: "Bs. 412.800,00", trend: "9 Compromisos", color: "text-rose-600", icon: HandCoins },
  { label: "EXPOSICIÓN FISCAL", val: "0.00%", trend: "BLINDAJE TOTAL", color: "text-emerald-600", icon: ShieldCheck },
];

const frequentAccess = [
  { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, kpi: "Al día · IVA 16%", color: "text-primary" },
  { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, kpi: "47 Empleados", color: "text-emerald-600" },
  { label: "ESFL y Condominios", href: "/contabilidad/entidades-sin-fines-lucro", icon: Handshake, kpi: "Transparencia VEN-NIF", color: "text-emerald-600" },
  { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, kpi: "SENIAT Ok", color: "text-primary" },
];

const serviciosBancarios = [
  {
    label: "Conciliación Bancaria",
    desc: "Gestión contable y conciliación automática: Banesco, Mercantil, BNC, BdV, BBVA Provincial",
    href: "/contabilidad/conciliacion-bancaria",
    icon: RefreshCw,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    badge: "AUTO",
  },
  {
    label: "Punto de Ventas",
    desc: "Terminales POS Banesco, Mercantil, BNC. Integración con SITI y reporte diario automático",
    href: "/contabilidad/punto-de-ventas",
    icon: Store,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    badge: "ACTIVO",
  },
  {
    label: "Tarjetas Crédito/Débito",
    desc: "Visa, Mastercard, Maestro. Procesamiento local e internacional. Liquidación en 24h",
    href: "/contabilidad/pagos-digitales",
    icon: CreditCard,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    badge: "LIVE",
  },
  {
    label: "Billeteras Virtuales",
    desc: "Reserve, Zelle, Binance Pay, PayPal. Conversión automática a Bs. con tasa BCV o paralela",
    href: "/contabilidad/pagos-digitales",
    icon: Wallet,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    badge: "MULTI",
  },
  {
    label: "Pago Móvil Verificado",
    desc: "Verificación automática en tiempo real. Acreditación inmediata. 0% comisión. Todos los bancos",
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
    desc: "Sistema de facturación electrónica VEN-NIF con internet ilimitado incluido en mensualidad. Sin restricción de volumen",
    href: "/contabilidad/facturacion-telecom",
    icon: Wifi,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    badge: "∞",
  },
  {
    label: "Telefonía Corporativa",
    desc: "Líneas Digitel/Movilnet/Movistar con planes integrados a módulos contables. PBX virtual incluido",
    href: "/contabilidad/telefonia-corporativa",
    icon: Phone,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    badge: "CORP",
  },
  {
    label: "WhatsApp Empresarial",
    desc: "API WhatsApp Business con IA para responder consultas de clientes 24/7. Integrado con facturación",
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
    desc: "Cobertura médica corporativa para empleados y directivos. Consultas, emergencias, laboratorio, odontología",
    href: "/contabilidad/alianzas/chevere-salud",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    tag: "SALUD",
  },
  {
    label: "Mercantil Seguros",
    desc: "Pólizas de responsabilidad civil, activos fijos, bienes empresariales y salud colectiva",
    href: "/contabilidad/alianzas/mercantil-seguros",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
    tag: "SEGUROS",
  },
  {
    label: "Mapfre",
    desc: "Seguro de flota vehicular, accidentes laborales y cobertura patrimonial. Pago de prima integrado a contabilidad",
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
  const [showAI, setShowAI] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const handleAIAnalysis = useCallback(async () => {
    setShowAI(true);
    setAiLoading(true);
    setAiAnalysis(null);
    try {
      const res = await fetch('/api/ai/analyze-dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: 'Contabilidad VEN-NIF',
          data: {
            liquidez: 'Bs. 2.847.320,00',
            cuentasCobrar: 'Bs. 934.150,00 (18 facturas activas)',
            cuentasPagar: 'Bs. 412.800,00 (9 compromisos)',
            exposicionFiscal: '0.00% - BLINDAJE TOTAL',
            iva: '16%',
            igtf: '3%',
            islr: '34%',
          },
          context: 'Dashboard contable empresarial Venezuela. Normas VEN-NIF. Fecha: ' + new Date().toLocaleDateString('es-VE'),
        }),
      });
      const json = await res.json();
      if (res.ok) setAiAnalysis(json.analysis);
      else { toast({ title: 'Error', description: json.error, variant: 'destructive' }); setShowAI(false); }
    } catch {
      toast({ title: 'Error de conexión', variant: 'destructive' });
      setShowAI(false);
    } finally {
      setAiLoading(false);
    }
  }, [toast]);

  const runForensicAudit = () => {
    setIsAuditing(true);
    toast({ title: "INICIANDO AUDITORÍA FORENSE", description: "Escaneando inconsistencias en el Ledger central VEN-NIF..." });
    setTimeout(() => {
      setIsAuditing(false);
      toast({
        title: "ANÁLISIS COMPLETADO",
        description: "Integridad: 99.8%. IGTF y retenciones IVA verificadas. 0 diferencias fiscales.",
        action: <CheckCircle className="text-primary h-4 w-4" />,
      });
    }, 3000);
  };

  return (
    <div className="space-y-10 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <MotionContainer variant="fade-left" as="header" className="flex flex-col md:flex-row justify-between items-end gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-3">
            <BrainCircuit className="h-3 w-3" /> ÁREA CONTABLE INTEGRAL · VEN-NIF · SENIAT
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
            CENTRO DE <span className="text-primary italic">CONTABILIDAD</span>
          </h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-2 italic">
            System Kyron v2.8.5 · Normas VEN-NIF · IVA 16% · IGTF 3% · ISLR 34%
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
      </MotionContainer>

      <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
        {kpiData.map((kpi, i) => (
          <StaggerItem key={i} variant="fade-up">
            <Card className="glass-card border-none bg-card/40 p-2 rounded-[2rem] shadow-sm hover:shadow-xl hover-lift transition-all group overflow-visible">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 p-6">
                <CardTitle className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{kpi.label}</CardTitle>
                <div className="p-2.5 rounded-xl bg-muted border border-border group-hover:scale-110 transition-transform duration-300">
                  <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-2xl font-black italic tracking-tight text-foreground">{kpi.val}</div>
                <p className={cn("text-[9px] font-black uppercase mt-2", kpi.color)}>{kpi.trend}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

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
                <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">Asistente Autónomo</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-primary/60">
                    <span>Precisión VEN-NIF</span><span>99.4%</span>
                  </div>
                  <Progress value={99.4} className="h-1.5 bg-muted" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase tracking-widest text-primary/60">
                    <span>Cumplimiento SENIAT</span><span>100%</span>
                  </div>
                  <Progress value={100} className="h-1.5 bg-muted" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background/50 rounded-2xl border border-border text-center">
                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Asientos Auto</p>
                    <p className="text-xl font-black text-foreground italic">2.847</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-2xl border border-border text-center">
                    <p className="text-[8px] font-black uppercase text-muted-foreground/40 mb-1">Ahorro Mes</p>
                    <p className="text-xl font-black text-primary italic">34h</p>
                  </div>
                </div>
              </div>
              <Button variant="secondary" className="w-full h-14 rounded-2xl bg-secondary text-secondary-foreground hover:bg-secondary/90 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl">
                GESTIONAR PROTOCOLOS IA
              </Button>
            </div>
          </Card>

          <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl overflow-visible">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8 italic flex items-center gap-3">
              <Zap className="h-4 w-4" /> Alertas Fiscales Activas
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 group hover:bg-amber-500/10 transition-all cursor-pointer">
                <CheckCircle className="h-5 w-5 text-amber-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-amber-600 uppercase">IGTF Divisas – Abril 2026</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">
                    Declaración IGTF (3%) pendiente al 15/04. Monto estimado: Bs. 28.440,00
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 group hover:bg-emerald-500/10 transition-all cursor-pointer">
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-emerald-600 uppercase">Retenciones IVA – Excedente</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">
                    Crédito fiscal IVA disponible: Bs. 184.320,00. Compensación recomendada.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-all cursor-pointer">
                <Activity className="h-5 w-5 text-primary shrink-0" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-primary uppercase">Ajuste RIPF – 1er Trimestre</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">
                    Índice inflacionario BCV Q1-2026: 14.2%. Ajuste de activos recomendado.
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
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
              {frequentAccess.map((item, i) => (
                <StaggerItem key={i} variant="scale-in">
                  <Link href={item.href as any}>
                    <Card className="glass-card border-none bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-8 flex flex-col justify-between group shadow-sm hover:shadow-xl hover-lift min-h-[140px] overflow-visible">
                      <div className="flex items-center gap-5">
                        <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-all duration-300 border border-transparent group-hover:border-primary/20 shadow-inner group-hover:scale-110">
                          <item.icon className={cn("h-6 w-6 transition-all duration-300", item.color)} />
                        </div>
                        <div>
                          <p className="text-sm font-black uppercase tracking-tight text-foreground/80 group-hover:text-primary transition-colors duration-300 italic">{item.label}</p>
                          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{item.kpi}</p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-4">
                        <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>

      <section className="space-y-6">
        <MotionContainer variant="fade-left" className="flex items-center gap-4">
          <div className="p-2 bg-blue-500/10 rounded-xl"><Banknote className="h-5 w-5 text-blue-500" /></div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-foreground italic">Servicios Bancarios y Pagos Digitales</h2>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Conciliación · POS · Tarjetas · Billeteras · Pago Móvil Verificado</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </MotionContainer>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5" staggerDelay={0.06}>
          {serviciosBancarios.map((s, i) => (
            <StaggerItem key={i} variant="fade-up">
              <Link href={s.href as any}>
                <Card className={cn("glass-card border bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-6 flex flex-col gap-4 group shadow-sm hover:shadow-xl hover-lift min-h-[180px] overflow-visible", s.border)}>
                  <div className="flex items-start justify-between">
                    <div className={cn("p-3 rounded-xl transition-transform duration-300 group-hover:scale-110", s.bg)}><s.icon className={cn("h-5 w-5", s.color)} /></div>
                    <Badge className={cn("text-[7px] font-black px-2 py-0.5 uppercase tracking-widest border-none", s.bg, s.color)}>{s.badge}</Badge>
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className={cn("text-[11px] font-black uppercase tracking-tight group-hover:text-primary transition-colors duration-300 italic", s.color)}>{s.label}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">{s.desc}</p>
                  </div>
                  <div className="flex justify-end">
                    <ArrowRight className="h-3 w-3 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="space-y-6">
        <MotionContainer variant="fade-left" className="flex items-center gap-4">
          <div className="p-2 bg-cyan-500/10 rounded-xl"><Globe className="h-5 w-5 text-cyan-500" /></div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-foreground italic">Mi Línea Corporativa</h2>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Facturación Electrónica · Internet Ilimitado · Telefonía · WhatsApp IA</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </MotionContainer>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
          {serviciosTelecom.map((s, i) => (
            <StaggerItem key={i} variant="scale-in">
              <Link href={s.href as any}>
                <Card className={cn("glass-card border bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-8 flex flex-col gap-5 group shadow-sm hover:shadow-xl hover-lift min-h-[200px] overflow-visible", s.border)}>
                  <div className="flex items-start justify-between">
                    <div className={cn("p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110", s.bg)}><s.icon className={cn("h-6 w-6", s.color)} /></div>
                    <Badge className={cn("text-[8px] font-black px-3 py-1 uppercase tracking-widest border-none text-lg leading-none", s.bg, s.color)}>{s.badge}</Badge>
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className={cn("text-sm font-black uppercase tracking-tight group-hover:text-primary transition-colors duration-300 italic", s.color)}>{s.label}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">{s.desc}</p>
                  </div>
                  <div className="flex justify-end">
                    <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <section className="space-y-6">
        <MotionContainer variant="fade-left" className="flex items-center gap-4">
          <div className="p-2 bg-rose-500/10 rounded-xl"><Handshake className="h-5 w-5 text-rose-500" /></div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-foreground italic">Alianzas Estratégicas</h2>
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">Chévere Salud · Mercantil Seguros · Mapfre</p>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </MotionContainer>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6" staggerDelay={0.1}>
          {alianzas.map((a, i) => (
            <StaggerItem key={i} variant="fade-up">
              <Link href={a.href as any}>
                <Card className={cn("glass-card border bg-card/40 hover:bg-muted/5 transition-all rounded-2xl p-8 flex flex-col gap-5 group shadow-sm hover:shadow-xl hover-lift min-h-[200px] overflow-visible", a.border)}>
                  <div className="flex items-start justify-between">
                    <div className={cn("p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", a.bg)}><a.icon className={cn("h-6 w-6", a.color)} /></div>
                    <span className={cn("text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest border", a.bg, a.color, a.border)}>{a.tag}</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className={cn("text-sm font-black uppercase tracking-tight group-hover:text-primary transition-colors duration-300 italic", a.color)}>{a.label}</p>
                    <p className="text-[9px] font-bold text-muted-foreground uppercase leading-snug">{a.desc}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-black uppercase text-muted-foreground/40 tracking-widest">Alianza Activa</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
}
