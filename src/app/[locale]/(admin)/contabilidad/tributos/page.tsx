
"use client";

import { useState, useCallback } from "react";
import { Landmark, FileText, Banknote, CreditCard, ShieldCheck, Calendar, Gavel, History, ArrowRight, Activity, Zap, Bot, Building2, Users, Printer, Scale, Globe, Truck, Leaf, TreePalm as Palmtree, Terminal, Coins, Microscope, Ship, Clock, TriangleAlert as AlertTriangle, MailOpen, Settings2, Bell, ShieldAlert } from "lucide-react";
import { Link } from "@/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const tributoCategories = [
    {
        id: "nacionales",
        title: "Impuestos Nacionales (SENIAT)",
        desc: "IVA, ISLR, IGTF, Pensiones y Grandes Patrimonios.",
        icon: Landmark,
        color: "text-primary",
        items: [
            { label: "IVA (Impuesto al Valor Agregado)", href: "/contabilidad/tributos/iva", icon: FileText },
            { label: "ISLR (Renta y Retenciones)", href: "/contabilidad/tributos/islr", icon: Banknote },
            { label: "IGTF (Transacciones Divisas 3%)", href: "/contabilidad/tributos/igtf", icon: CreditCard },
            { label: "DPP (Ley de Pensiones 9%)", href: "/contabilidad/tributos/proteccion-pensiones", icon: ShieldCheck },
            { label: "IGP (Grandes Patrimonios)", href: "/contabilidad/tributos/igp", icon: Coins },
        ]
    },
    {
        id: "comunicaciones",
        title: "Comunicaciones Institucionales",
        desc: "Cartas de inactividad, cierre y notificaciones.",
        icon: MailOpen,
        color: "text-primary",
        items: [
            { label: "Generar Comunicaciones", href: "/contabilidad/tributos/comunicaciones", icon: FileText },
            { label: "Archivo de Notificaciones", href: "/contabilidad/tributos/declaraciones-anteriores", icon: History },
        ]
    },
    {
        id: "aportes_especiales",
        title: "Contribuciones Especiales",
        desc: "Entes descentralizados, FONACIT y Ciencia.",
        icon: Scale,
        color: "text-primary",
        items: [
            { label: "Aporte 70% (Entes Autónomos)", href: "/contabilidad/tributos/aporte-70", icon: Landmark },
            { label: "FONACIT / LOCTI", href: "/contabilidad/tributos/fonacit", icon: Microscope },
        ]
    },
    {
        id: "parafiscales",
        title: "Seguridad Social y Parafiscales",
        desc: "IVSS, FAOV, INCES y LOPCYMAT.",
        icon: Users,
        color: "text-primary",
        items: [
            { label: "IVSS (Seguro Social)", href: "/contabilidad/tributos/aportes-parafiscales", icon: Landmark },
            { label: "FAOV (Vivienda)", href: "/contabilidad/tributos/aportes-parafiscales", icon: Landmark },
            { label: "INCES (Capacitación)", href: "/contabilidad/tributos/aportes-parafiscales", icon: Landmark },
        ]
    }
];

const registrationStatus = [
    { label: "SENIAT (RIF)", status: "Vigente", date: "15/01/2027", color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/contabilidad/tributos/iva" },
    { label: "SAREN (Poderes)", status: "Vigente", date: "Indefinido", color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/contabilidad/tributos/poderes-representacion" },
    { label: "SAPI (Marcas)", status: "Vigente", date: "10/02/2032", color: "text-emerald-500", bg: "bg-emerald-500/10", href: "/contabilidad/tributos/permisos" },
    { label: "MIN. INDUSTRIAS", status: "Alerta", date: "15/05/2026", color: "text-amber-500", bg: "bg-amber-500/10", href: "/contabilidad/tributos/ministerio-industrias" },
];

export default function TributosHubPage() {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);

  const handleSaveAlerts = useCallback(async () => {
    setSaving(true);
    try {
      const alerts: Record<string, boolean> = {};
      ['iva', 'islr', 'igtf', 'dpp'].forEach(id => {
        const el = document.getElementById(`alert-${id}`) as HTMLButtonElement | null;
        alerts[`alerta_${id}`] = el?.getAttribute('data-state') === 'checked';
      });
      const res = await fetch('/api/configuracion', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notif_vencimientos: alerts.alerta_iva || alerts.alerta_islr || alerts.alerta_igtf || alerts.alerta_dpp,
        }),
      });
      if (res.ok) {
        toast({ title: "AJUSTES GUARDADOS", description: "Configuración tributaria actualizada exitosamente." });
      } else {
        const d = await res.json();
        toast({ title: "Error", description: d.error ?? "No se pudo guardar", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error de conexión", variant: "destructive" });
    }
    setSaving(false);
  }, [toast]);

  return (
    <div className="space-y-12 pb-20 px-4 md:px-10 bg-background min-h-screen">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <Landmark className="h-3 w-3" /> NODO TRIBUTARIO CENTRAL
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">
            Centro <span className="text-primary italic">Tributario</span>
        </h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] mt-4 italic opacity-60">Dossier Fiscal Digital • Cumplimiento 2026</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-10">
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 p-2 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-border/50 bg-muted/10 flex justify-between items-center">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-foreground italic">Protocolos de Liquidación</h3>
                    <Badge variant="outline" className="text-[8px] font-black uppercase border-primary/20 text-primary shadow-glow-sm">Sincronizado</Badge>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {tributoCategories.map((cat) => (
                        <AccordionItem value={cat.id} key={cat.id} className="border-b border-white/5 last:border-none px-8 py-2">
                            <AccordionTrigger className="hover:no-underline group">
                                <div className="flex items-center gap-6">
                                    <div className={cn("p-4 rounded-2xl bg-muted border border-border group-hover:scale-110 transition-transform shadow-inner", cat.color)}>
                                        <cat.icon className="h-6 w-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-base font-black uppercase tracking-widest text-foreground/90">{cat.title}</h3>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{cat.desc}</p>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pt-6 pb-10">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-20">
                                    {cat.items.map((item) => (
                                        <Button 
                                            key={item.label}
                                            asChild
                                            variant="ghost" 
                                            className="justify-between h-14 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-white/5 border border-transparent hover:border-primary/20 hover:bg-primary/5 group/item transition-all"
                                        >
                                            <Link href={item.href as any}>
                                                <span className="flex items-center gap-3">
                                                    {item.icon && <item.icon className="h-3.5 w-3.5 opacity-30 group-hover/item:opacity-100 transition-opacity" />}
                                                    {item.label}
                                                </span>
                                                <div className="flex items-center gap-2 opacity-0 group-hover/item:opacity-100 transition-all">
                                                    <ArrowRight className="h-4 w-4 group-hover/item:translate-x-1 transition-all text-primary" />
                                                </div>
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </Card>

            <div className="grid md:grid-cols-2 gap-10">
                <Link href="/contabilidad/tributos/calendario-fiscal">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 hover:bg-white/[0.05] transition-all group shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-all"><Calendar className="h-24 w-24" /></div>
                        <div className="flex justify-between items-center mb-10">
                            <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                <Calendar className="h-8 w-8 text-primary" />
                            </div>
                            <ArrowRight className="h-5 w-5 text-white/10 group-hover:text-primary group-hover:translate-x-2 transition-all" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">Calendario Fiscal 2026</h3>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-4 leading-relaxed">Vencimientos síncronos con el portal del SENIAT.</p>
                    </Card>
                </Link>
                <Link href="/contabilidad/tributos/multas">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40 hover:bg-white/[0.05] transition-all group shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-all"><ShieldAlert className="h-24 w-24" /></div>
                        <div className="flex justify-between items-center mb-10">
                            <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20">
                                <ShieldAlert className="h-8 w-8 text-rose-500" />
                            </div>
                            <ArrowRight className="h-5 w-5 text-white/10 group-hover:text-rose-500 group-hover:translate-x-2 transition-all" />
                        </div>
                        <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">Multas y Sanciones</h3>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-4 leading-relaxed">Simulador de riesgos bajo el Código Orgánico Tributario.</p>
                    </Card>
                </Link>
            </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
            <Card className="glass-card border-none rounded-[3rem] bg-[#050505] p-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-all"><Terminal className="h-40 w-40 text-primary" /></div>
                <div className="relative z-10 space-y-8">
                    <div className="space-y-2">
                        <Badge className="bg-primary text-white border-none text-[8px] font-black px-4 uppercase mb-2 shadow-glow">LEGAL STATUS</Badge>
                        <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">Estatus Consolidado</h3>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Monitor de Vigencia Fiscal</p>
                    </div>

                    <div className="space-y-4">
                        {registrationStatus.map((reg, i) => (
                            <Link key={i} href={reg.href as any} className="block">
                                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between group/item hover:bg-white/10 transition-all">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-black text-white/80 uppercase">{reg.label}</p>
                                        <p className="text-[7px] font-bold text-white/20 uppercase tracking-widest">Vence: {reg.date}</p>
                                    </div>
                                    <Badge className={cn("text-[7px] font-black uppercase px-2 h-5 border-none shadow-glow-sm", reg.bg, reg.color)}>
                                        {reg.status}
                                    </Badge>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Button variant="secondary" asChild className="w-full h-14 bg-white text-primary hover:bg-slate-100 font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl">
                        <Link href="/contabilidad/tributos/homologacion" className="flex items-center gap-2">
                            AUDITAR DOSSIER <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>
            </Card>

            <Card className="glass-card border-none rounded-[3rem] bg-slate-100 shadow-2xl p-10 overflow-hidden relative border-l-4 border-primary">
                <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none"><Bell className="h-48 w-48" /></div>
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                        <div className="p-3 bg-primary/10 rounded-2xl shadow-inner border border-primary/20">
                            <Settings2 className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground">Alertas Globales</h3>
                            <p className="text-[9px] font-black text-primary uppercase tracking-widest">Protocolo de Pre-Aviso</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { id: "iva", label: "IVA Mensual" },
                            { id: "islr", label: "ISLR / Retenciones" },
                            { id: "igtf", label: "IGTF (Transacciones)" },
                            { id: "dpp", label: "Pensiones (DPP)" }
                        ].map((tax) => (
                            <div key={tax.id} className="flex items-center justify-between group">
                                <Label htmlFor={`alert-${tax.id}`} className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors cursor-pointer">{tax.label}</Label>
                                <Checkbox id={`alert-${tax.id}`} defaultChecked className="rounded-md h-5 w-5 border-border data-[state=checked]:bg-primary shadow-inner" />
                            </div>
                        ))}
                    </div>

                    <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-[10px] tracking-widest shadow-xl" disabled={saving} onClick={handleSaveAlerts}>{saving ? 'GUARDANDO...' : 'GUARDAR AJUSTES'}</Button>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
