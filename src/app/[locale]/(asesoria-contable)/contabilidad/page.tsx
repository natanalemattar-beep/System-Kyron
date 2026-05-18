"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ModuleTutorial } from "@/components/module-tutorial";
import { moduleTutorials } from "@/lib/module-tutorials";
import { Link } from "@/navigation";
import {
  Calculator, Wallet, TrendingUp, Activity, BookOpen, Receipt, Users, HandCoins, Zap,
  ArrowRight, Book, History, Box, Landmark, BrainCircuit, ShieldCheck, Loader2,
  ShieldAlert, ChartColumn, CircleCheck as CircleCheck, Handshake,
  CreditCard, Smartphone, Building2, MessageSquare, Heart, Shield, Car,
  Banknote, RefreshCw, Store, Wifi, Globe
} from "lucide-react";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn, formatCurrency } from "@/lib/utils";

const frequentAccess = [
  { label: "Compra y Venta", href: "/contabilidad/libros/compra-venta", icon: Receipt, color: "text-primary" },
  { label: "Nómina Mensual", href: "/contabilidad/libros/nomina", icon: Users, color: "text-emerald-600" },
  { label: "ESFL y Condominios", href: "/contabilidad/entidades-sin-fines-lucro", icon: Handshake, color: "text-emerald-600" },
  { label: "Control Licores", href: "/contabilidad/libros/control-licores", icon: Landmark, color: "text-primary" },
];

const serviciosBancarios = [
  {
    label: "Conciliación Bancaria",
    desc: "Gestión contable y conciliación automática",
    href: "/contabilidad/conciliacion-bancaria",
    icon: RefreshCw,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    label: "Punto de Ventas",
    desc: "Terminales POS y reporte diario automático",
    href: "/contabilidad/punto-de-ventas",
    icon: Store,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    label: "Pagos Digitales",
    desc: "Tarjetas, billeteras virtuales, Pago Móvil",
    href: "/contabilidad/pagos-digitales",
    icon: CreditCard,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
];

const serviciosTelecom = [
  {
    label: "Facturación Electrónica",
    desc: "Sistema VEN-NIF con internet ilimitado incluido",
    href: "/contabilidad/facturacion-telecom",
    icon: Wifi,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    label: "Telefonía Corporativa",
    desc: "Líneas telefónicas con planes integrados",
    href: "/contabilidad/telefonia-corporativa",
    icon: Smartphone,
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    label: "WhatsApp Empresarial",
    desc: "API WhatsApp Business integrado con facturación",
    href: "/contabilidad/whatsapp-empresarial",
    icon: MessageSquare,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
];

const alianzas = [
  {
    label: "Chévere Salud",
    desc: "Cobertura médica corporativa para empleados y directivos",
    href: "/contabilidad/alianzas/chevere-salud",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    tag: "SALUD",
  },
  {
    label: "Mercantil Seguros",
    desc: "Pólizas de responsabilidad civil, activos y salud colectiva",
    href: "/contabilidad/alianzas/mercantil-seguros",
    icon: Shield,
    color: "text-blue-600",
    bg: "bg-blue-600/10",
    border: "border-blue-600/20",
    tag: "SEGUROS",
  },
  {
    label: "Mapfre",
    desc: "Seguro de flota vehicular, accidentes y cobertura patrimonial",
    href: "/contabilidad/alianzas/mapfre",
    icon: Car,
    color: "text-red-600",
    bg: "bg-red-600/10",
    border: "border-red-600/20",
    tag: "SEGUROS",
  },
];

interface DashboardKPI {
  liquidez: number;
  cuentasCobrar: number;
  cuentasPagar: number;
  facturasActivas: number;
  compromisos: number;
}

export default function ContabilidadPage() {
  const { toast } = useToast();
  const [isAuditing, setIsAuditing] = useState(false);
  const [kpi, setKpi] = useState<DashboardKPI | null>(null);
  const [kpiLoading, setKpiLoading] = useState(true);

  const runForensicAudit = async () => {
    setIsAuditing(true);
    try {
      const res = await fetch('/api/contabilidad/forensic-audit');
      if (!res.ok) throw new Error('Error en auditoría');
      const data = await res.json();
      toast({ title: 'Auditoría Forense', description: `Completada: ${data.alertas ?? 0} alertas encontradas.` });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Error', description: e.message });
    } finally {
      setIsAuditing(false);
    }
  };

  const kpiCards = [
    { label: 'Liquidez', val: kpi ? formatCurrency(kpi.liquidez) : '$0', color: 'text-emerald-600', icon: Wallet },
    { label: 'Por Cobrar', val: kpi ? formatCurrency(kpi.cuentasCobrar) : '$0', color: 'text-blue-600', icon: TrendingUp },
    { label: 'Por Pagar', val: kpi ? formatCurrency(kpi.cuentasPagar) : '$0', color: 'text-rose-600', icon: Activity },
    { label: 'Facturas Activas', val: kpi ? String(kpi.facturasActivas) : '0', color: 'text-amber-600', icon: Receipt },
  ];

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d) {
          setKpi({
            liquidez: d.liquidezTotal ?? 0,
            cuentasCobrar: d.cuentasCobrar?.total ?? d.ingresos ?? 0,
            cuentasPagar: d.cuentasPagar?.total ?? d.gastos ?? 0,
            facturasActivas: d.facturas?.emitidas ?? 0,
            compromisos: d.facturas?.vencidas ?? 0,
          });
        }
      })
      .catch((err) => { console.warn('[contabilidad-kpi]', err.message); })
      .finally(() => setKpiLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-10 min-h-screen bg-background">
      <ModuleTutorial config={moduleTutorials["contabilidad"]} />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-extrabold tracking-normal text-foreground">
              Contabilidad
            </h1>
          </div>
          <p className="text-xs font-medium text-muted-foreground tracking-wide">
            ESTÁNDAR VEN-NIF · IVA 16% · IGTF 3% · ISLR 34%
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={runForensicAudit}
            disabled={isAuditing}
          >
            {isAuditing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldAlert className="mr-2 h-4 w-4" />}
            Auditoría Forense
          </Button>
          <Button className="rounded-xl" asChild>
            <Link href="/contabilidad/cierre-contable">
              <Receipt className="mr-2 h-4 w-4" /> Cerrar Periodo
            </Link>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((k, i) => (
          <Card key={i} className="border rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground/60">{k.label}</p>
            <k.icon className={cn("h-4 w-4", k.color)} />
          </div>
          <p className={cn("text-2xl font-bold tracking-normal", k.color)}>
            {kpiLoading ? "..." : k.val}
          </p>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
        </div>

        <div className="lg:col-span-8 space-y-8">
          <OverviewChart />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Accesos Directos</h3>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {frequentAccess.map((item, i) => (
                <Link key={i} href={item.href as any}>
                  <Card className="border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group min-h-[120px] flex flex-col justify-between">
                    <div className="flex items-center gap-4">
                      <p className="text-xs font-bold uppercase tracking-normal group-hover:text-primary transition-colors">{item.label}</p>
                    </div>
                    <div className="flex justify-end mt-3">
                      <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Banknote className="h-5 w-5 text-blue-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Servicios Bancarios y Pagos</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {serviciosBancarios.map((s, i) => (
            <Link key={i} href={s.href as any}>
              <Card className={cn("border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group min-h-[160px] flex flex-col gap-4", s.border)}>
                <div className={cn("p-3 rounded-xl w-fit", s.bg)}>
                  <s.icon className={cn("h-5 w-5", s.color)} />
                </div>
                <div className="space-y-1 flex-1">
                  <p className={cn("text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors", s.color)}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <div className="flex justify-end">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Globe className="h-5 w-5 text-cyan-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Línea Corporativa</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {serviciosTelecom.map((s, i) => (
            <Link key={i} href={s.href as any}>
              <Card className={cn("border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group min-h-[160px] flex flex-col gap-4", s.border)}>
                <div className={cn("p-3 rounded-xl w-fit", s.bg)}>
                  <s.icon className={cn("h-5 w-5", s.color)} />
                </div>
                <div className="space-y-1 flex-1">
                  <p className={cn("text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors", s.color)}>{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <div className="flex justify-end">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <Handshake className="h-5 w-5 text-rose-500" />
          <h2 className="text-sm font-semibold uppercase tracking-widest text-foreground">Alianzas Estratégicas</h2>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {alianzas.map((a, i) => (
            <Link key={i} href={a.href as any}>
              <Card className={cn("border rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group min-h-[160px] flex flex-col gap-4", a.border)}>
                <div className="flex items-start justify-between">
                  <div className={cn("p-3 rounded-xl", a.bg)}>
                    <a.icon className={cn("h-5 w-5", a.color)} />
                  </div>
                  <span className={cn("text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide border", a.bg, a.color, a.border)}>{a.tag}</span>
                </div>
                <div className="space-y-1 flex-1">
                  <p className={cn("text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors", a.color)}>{a.label}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
                <div className="flex justify-end">
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>


    </div>
  );
}
