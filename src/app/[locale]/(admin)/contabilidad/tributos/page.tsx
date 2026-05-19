"use client";

import { useState, useCallback } from "react";
import { Landmark, FileText, Banknote, CreditCard, ShieldCheck, Calendar, Gavel, History, ArrowRight, Activity, Scale, Globe, Users, Coins, Microscope, MailOpen, Settings2, Bell, ShieldAlert, Building2 } from "lucide-react";
import { Link } from "@/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ModuleAutomation } from "@/components/module-automation";

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
        id: "retenciones",
        title: "Retenciones",
        desc: "Gestión de retenciones IVA e ISLR.",
        icon: Gavel,
        color: "text-primary",
        items: [
            { label: "Retenciones IVA (Prov. 0049)", href: "/contabilidad/tributos/retenciones-iva", icon: FileText },
            { label: "Retenciones ISLR (Decreto 1.808)", href: "/contabilidad/tributos/retenciones-islr", icon: Banknote },
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
            { label: "IVSS • FAOV • INCES • Paro Forzoso • LOPCYMAT", href: "/contabilidad/tributos/aportes-parafiscales", icon: Building2 },
        ]
    }
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
                toast({ title: "Ajustes guardados", description: "Configuración de alertas tributarias actualizada." });
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
        <div className="space-y-10 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    <Landmark className="h-3.5 w-3.5" /> Centro Tributario
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                    Centro <span className="text-primary">Tributario</span>
                </h1>
                <p className="text-sm text-muted-foreground">Gestión fiscal y cumplimiento tributario venezolano.</p>
            </header>

            <ModuleAutomation module="impuestos_tributos" />

            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8 space-y-8">
                    <Card className="rounded-2xl shadow-lg border overflow-hidden">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h3 className="text-sm font-bold">Módulos Tributarios</h3>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            {tributoCategories.map((cat) => (
                                <AccordionItem value={cat.id} key={cat.id} className="border-b last:border-none px-6 py-1">
                                    <AccordionTrigger className="hover:no-underline group">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("p-3 rounded-xl bg-muted border group-hover:scale-105 transition-transform", cat.color)}>
                                                <cat.icon className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-sm font-bold">{cat.title}</h3>
                                                <p className="text-xs text-muted-foreground">{cat.desc}</p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-4 pb-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-14">
                                            {cat.items.map((item) => (
                                                <Button
                                                    key={item.label}
                                                    asChild
                                                    variant="ghost"
                                                    className="justify-between h-12 px-4 rounded-xl text-xs font-bold bg-muted/50 border border-transparent hover:border-primary/20 hover:bg-primary/5 group/item transition-all"
                                                >
                                                    <Link href={item.href as any}>
                                                        <span className="flex items-center gap-2">
                                                            {item.icon && <item.icon className="h-3.5 w-3.5 opacity-40 group-hover/item:opacity-100 transition-opacity" />}
                                                            {item.label}
                                                        </span>
                                                        <ArrowRight className="h-4 w-4 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all text-primary" />
                                                    </Link>
                                                </Button>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Link href="/contabilidad/tributos/calendario-fiscal">
                            <Card className="p-8 rounded-2xl border shadow-lg hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-all"><Calendar className="h-20 w-20" /></div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                        <Calendar className="h-6 w-6 text-amber-500" />
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="text-lg font-bold tracking-tight">Calendario Fiscal</h3>
                                <p className="text-xs text-muted-foreground mt-2">Vencimientos de obligaciones tributarias SENIAT.</p>
                            </Card>
                        </Link>
                        <Link href="/contabilidad/tributos/multas">
                            <Card className="p-8 rounded-2xl border shadow-lg hover:shadow-xl hover:border-rose-500/20 transition-all group relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-all"><ShieldAlert className="h-20 w-20" /></div>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20">
                                        <ShieldAlert className="h-6 w-6 text-rose-500" />
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <h3 className="text-lg font-bold tracking-tight">Multas y Sanciones</h3>
                                <p className="text-xs text-muted-foreground mt-2">Simulador de contingencia fiscal (COT 2020).</p>
                            </Card>
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="rounded-2xl shadow-lg border p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                                <Settings2 className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold">Alertas de Vencimiento</h3>
                                <p className="text-xs text-muted-foreground">Recibe notificaciones antes del vencimiento.</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { id: "iva", label: "IVA Mensual" },
                                { id: "islr", label: "ISLR / Retenciones" },
                                { id: "igtf", label: "IGTF (Transacciones)" },
                                { id: "dpp", label: "Pensiones (DPP)" }
                            ].map((tax) => (
                                <div key={tax.id} className="flex items-center justify-between group">
                                    <Label htmlFor={`alert-${tax.id}`} className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors cursor-pointer">{tax.label}</Label>
                                    <Checkbox id={`alert-${tax.id}`} defaultChecked className="rounded-md h-5 w-5" />
                                </div>
                            ))}
                        </div>

                        <Button className="w-full h-11 rounded-xl font-bold text-sm mt-6" disabled={saving} onClick={handleSaveAlerts}>
                            {saving ? 'Guardando...' : 'Guardar Ajustes'}
                        </Button>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border p-6">
                        <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                            <Scale className="h-4 w-4 text-primary" />
                            Marco Legal
                        </h3>
                        <ul className="space-y-2.5 text-xs text-muted-foreground">
                            <li className="flex gap-2"><span className="text-primary font-bold">•</span> Código Orgánico Tributario (COT, 2020)</li>
                            <li className="flex gap-2"><span className="text-primary font-bold">•</span> Ley de IVA (G.O. 6.507 Ext.)</li>
                            <li className="flex gap-2"><span className="text-primary font-bold">•</span> Ley de ISLR (Decreto 2.163)</li>
                            <li className="flex gap-2"><span className="text-primary font-bold">•</span> Ley IGTF (G.O. 6.687 Ext.)</li>
                            <li className="flex gap-2"><span className="text-primary font-bold">•</span> Ley de Protección de Pensiones</li>
                        </ul>
                    </Card>
                </div>
            </div>
        </div>
    );
}
