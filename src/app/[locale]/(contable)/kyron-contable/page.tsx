"use client";

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import {
  Briefcase, Calculator, Users, Megaphone, ArrowRight, Building2, Target,
  Globe, UserPlus, FileText, BarChart3, Sparkles, DollarSign, Clock,
  CheckCircle2, TrendingUp, BookOpen, School, Handshake, Star
} from "lucide-react";

const SERVICE_LINES = [
  {
    id: "contabilidad",
    title: "Asesoría Contable",
    desc: "Contabilidad general, impuestos, nómina, declaraciones SENIAT, estados financieros y más.",
    icon: Calculator,
    href: "/contabilidad",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    features: [
      "Libros y asientos contables",
      "Plan de cuentas personalizado",
      "Declaraciones IVA, ISLR, IGTF",
      "Cierre contable y fiscal",
      "Estados financieros",
      "Certificaciones y dictámenes",
    ],
    stats: [
      { label: "Módulos", value: "35+" },
      { label: "Cobertura", value: "Full" },
    ],
  },
  {
    id: "marketing",
    title: "Marketing y Crecimiento",
    desc: "Campañas, CRM, redes sociales, email marketing, carnets digitales y automatización comercial.",
    icon: Megaphone,
    href: "/marketing",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    features: [
      "Campañas multicanal",
      "CRM de clientes",
      "Redes sociales",
      "Email marketing",
      "Embudos de venta",
      "Carnets digitales",
    ],
    stats: [
      { label: "Módulos", value: "7+" },
      { label: "Canales", value: "Multi" },
    ],
  },
  {
    id: "rrhh",
    title: "Talento y RRHH",
    desc: "Reclutamiento, nómina, IVSS, prestaciones sociales, salud laboral y desarrollo del talento.",
    icon: Users,
    href: "/dashboard-rrhh",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    features: [
      "Reclutamiento e inducción",
      "Nómina y liquidaciones",
      "IVSS Seguro Social",
      "Salud / LOPCYMAT",
      "Clima y liderazgo",
      "Bienestar laboral",
    ],
    stats: [
      { label: "Módulos", value: "14+" },
      { label: "Cobertura", value: "Full" },
    ],
  },
];

const QUICK_LINKS = [
  { label: "Dashboard Contable", href: "/contabilidad", icon: BarChart3 },
  { label: "Dashboard Marketing", href: "/marketing", icon: TrendingUp },
  { label: "Dashboard RRHH", href: "/dashboard-rrhh", icon: Users },
  { label: "Cierre Fiscal", href: "/contabilidad/tributos/cierre-fiscal", icon: FileText },
  { label: "Nómina", href: "/nominas", icon: DollarSign },
  { label: "IVSS Seguro Social", href: "/ivss-seguro-social", icon: Star },
];

export default function KyronContablePage() {
  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Briefcase className="h-7 w-7 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">Kyron Contable</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Suite <span className="text-blue-400">Empresarial</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Contabilidad · Marketing · RRHH — Unifica la gestión de tu empresa en un solo ecosistema.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_LINKS.map((link, i) => (
          <Link key={i} href={link.href}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card shadow-sm shadow-black/[0.02] hover:shadow-md hover:border-primary/20 transition-all">
            <div className="h-9 w-9 rounded-xl bg-muted/30 border border-border/50 flex items-center justify-center shrink-0">
              <link.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <span className="text-xs font-semibold text-foreground">{link.label}</span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SERVICE_LINES.map((svc) => (
          <div key={svc.id}
            className="rounded-2xl border border-border bg-card shadow-sm shadow-black/[0.02] overflow-hidden hover:shadow-md transition-all flex flex-col">
            <div className={`p-5 flex items-center gap-4 ${svc.bg} ${svc.border} border-b`}>
              <div className={`h-12 w-12 rounded-xl ${svc.bg} ${svc.border} flex items-center justify-center`}>
                <svc.icon className={`h-6 w-6 ${svc.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-foreground">{svc.title}</h3>
                <p className="text-[11px] text-muted-foreground">{svc.desc}</p>
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1">
              {svc.features.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span className="text-[12px] text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border/50 flex items-center justify-between">
              <div className="flex gap-3">
                {svc.stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-foreground">{s.value}</p>
                    <p className="text-[9px] text-muted-foreground/50 font-medium uppercase tracking-wider">{s.label}</p>
                  </div>
                ))}
              </div>
              <Link href={svc.href}
                className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                Abrir <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-blue-600/[0.03] to-indigo-600/[0.03] border border-blue-500/10 p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shrink-0 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Kyron Contable: El Ecosistema Completo</h3>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              Unifica tu contabilidad, marketing y gestión de talento en una sola plataforma.
              Datos en tiempo real, automatizaciones inteligentes y un equipo de expertos respaldando cada área.
            </p>
            <div className="flex items-center gap-4 mt-4">
              {[
                { icon: Calculator, label: "Contabilidad", desc: "Estados financieros y fiscalidad" },
                { icon: Megaphone, label: "Marketing", desc: "Captación y fidelización" },
                { icon: Users, label: "RRHH", desc: "Talento y bienestar laboral" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-foreground">{item.label}</p>
                    <p className="text-[9px] text-muted-foreground/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
