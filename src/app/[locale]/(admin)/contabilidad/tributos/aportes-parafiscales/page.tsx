"use client";

import { useState } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, ShieldCheck, Info, ChevronRight, Landmark, HeartPulse, UserX, Activity, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const parafiscales = [
    {
        id: "ivss",
        name: "IVSS (Seguro Social)",
        logo: Landmark,
        rates: { patronal: "9% – 11%", empleado: "4%" },
        base: "Tope: 5 Salarios Mínimos",
        legal: "Ley del Seguro Social (G.O. 5.976 Ext.)",
        periodicidad: "Mensual",
        portalWeb: "www.ivss.gob.ve",
        documents: ["Planilla 14-02 (Registro de Empresa)", "Copia del RIF actualizado", "Registro Mercantil original", "Cédula del representante legal", "Nómina de trabajadores"],
        notas: [
            "La cotización patronal varía entre 9% y 11% según el riesgo de la actividad económica.",
            "La base de cálculo tiene tope de 5 salarios mínimos por trabajador.",
            "Los aportes se declaran y pagan mensualmente a través del portal TIUNA del IVSS.",
        ],
        color: "text-blue-500",
        bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
        id: "faov",
        name: "FAOV (Vivienda)",
        logo: Activity,
        rates: { patronal: "2%", empleado: "1%" },
        base: "Salario Integral (Sin tope)",
        legal: "Ley del Régimen Prestacional de Vivienda",
        periodicidad: "Mensual",
        portalWeb: "www.banavih.gob.ve",
        documents: ["Inscripción en BANAVIH", "Nómina mensual detallada", "Comprobante de pago del periodo anterior"],
        notas: [
            "El aporte patronal es del 2% y el del trabajador es del 1% del salario integral.",
            "No tiene tope salarial — se calcula sobre el salario integral completo.",
            "Se declara y paga a través del portal del BANAVIH mensualmente.",
        ],
        color: "text-emerald-500",
        bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
        id: "inces",
        name: "INCES (Capacitación)",
        logo: ShieldCheck,
        rates: { patronal: "2%", empleado: "0.5%" },
        base: "Nómina (5 o más empleados)",
        legal: "Ley del INCES (G.O. 38.968)",
        periodicidad: "Trimestral",
        portalWeb: "www.inces.gob.ve",
        documents: ["Inscripción ante el INCES", "Listado de aprendices INCES (si aplica)", "Declaración trimestral de aportes"],
        notas: [
            "Aplica a empresas con 5 o más trabajadores.",
            "El patrono aporta el 2% de la nómina y el trabajador el 0.5% de utilidades.",
            "Debe cumplir con el programa de aprendices INCES (1 aprendiz por cada 20 trabajadores).",
        ],
        color: "text-amber-500",
        bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
        id: "paro_forzoso",
        name: "Paro Forzoso",
        logo: UserX,
        rates: { patronal: "2%", empleado: "0.5%" },
        base: "Tope: 10 Salarios Mínimos",
        legal: "Ley del Régimen Prestacional de Empleo",
        periodicidad: "Mensual",
        portalWeb: "www.ivss.gob.ve",
        documents: ["Registro de empresa ante el IVSS", "Nómina mensual", "Listado de cotizantes activos"],
        notas: [
            "La cotización es del 2% patronal y 0.5% del trabajador.",
            "Tiene un tope de 10 salarios mínimos como base de cálculo.",
            "Se administra a través del IVSS junto con las cotizaciones del Seguro Social.",
        ],
        color: "text-rose-500",
        bg: "bg-rose-500/10 border-rose-500/20",
    },
    {
        id: "lopcymat",
        name: "LOPCYMAT (Salud Laboral)",
        logo: HeartPulse,
        rates: { patronal: "0.75% – 10%", empleado: "0%" },
        base: "Nómina mensual según nivel de riesgo",
        legal: "LOPCYMAT (G.O. 38.236)",
        periodicidad: "Mensual",
        portalWeb: "www.inpsasel.gob.ve",
        documents: ["Registro ante INPSASEL", "Programa de Seguridad y Salud Laboral", "Acta de elección de Delegados de Prevención", "Comité de Seguridad y Salud Laboral"],
        notas: [
            "La cotización patronal varía del 0.75% al 10% según la clasificación de riesgo de la empresa.",
            "El trabajador no cotiza — es 100% a cargo del patrono.",
            "El INPSASEL clasifica la empresa según su actividad económica y nivel de siniestralidad.",
        ],
        color: "text-purple-500",
        bg: "bg-purple-500/10 border-purple-500/20",
    }
];

export default function AportesParafiscalesPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
                        <Building2 className="h-3.5 w-3.5" /> Seguridad Social
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Aportes <span className="text-primary">Parafiscales</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">IVSS · FAOV · INCES · Paro Forzoso · LOPCYMAT</p>
                </div>
            </header>

            <Tabs defaultValue="ivss" className="w-full">
                <TabsList className="flex h-12 bg-muted/50 border rounded-xl p-1 mb-8 overflow-x-auto">
                    {parafiscales.map(p => (
                        <TabsTrigger key={p.id} value={p.id} className="flex-1 rounded-lg font-bold text-xs data-[state=active]:bg-primary data-[state=active]:text-white min-w-[100px]">
                            {p.name.split(' (')[0]}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {parafiscales.map(p => (
                    <TabsContent key={p.id} value={p.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid gap-6 lg:grid-cols-12">
                            <div className="lg:col-span-7 space-y-6">
                                <Card className="rounded-2xl shadow-lg border">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center gap-4">
                                            <div className={cn("p-3 rounded-xl border", p.bg)}>
                                                <p.logo className={cn("h-6 w-6", p.color)} />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-bold">{p.name}</CardTitle>
                                                <p className="text-xs text-muted-foreground mt-0.5">{p.legal}</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-bold text-muted-foreground uppercase">Tasas Vigentes</h4>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                                                        <span className="text-xs font-semibold text-muted-foreground">Patronal</span>
                                                        <span className={cn("text-sm font-black", p.color)}>{p.rates.patronal}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30">
                                                        <span className="text-xs font-semibold text-muted-foreground">Empleado</span>
                                                        <span className={cn("text-sm font-black", p.color)}>{p.rates.empleado}</span>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-muted/30">
                                                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase mb-1">Base de Cálculo</p>
                                                        <p className="text-xs font-bold">{p.base}</p>
                                                    </div>
                                                    <div className="p-3 rounded-xl bg-muted/30">
                                                        <p className="text-[10px] font-bold text-muted-foreground/60 uppercase mb-1">Periodicidad</p>
                                                        <p className="text-xs font-bold">{p.periodicidad}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="text-xs font-bold text-muted-foreground uppercase">Requisitos de Inscripción</h4>
                                                <div className="space-y-2">
                                                    {p.documents.map((doc, i) => (
                                                        <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-muted/30">
                                                            <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 mt-0.5", p.color)} />
                                                            <p className="text-[11px] text-muted-foreground leading-relaxed">{doc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="lg:col-span-5 space-y-6">
                                <Card className="rounded-2xl shadow-lg border">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                            <Info className={cn("h-4 w-4", p.color)} />
                                            Notas Importantes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-2.5">
                                        {p.notas.map((nota, i) => (
                                            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                                <ChevronRight className={cn("h-3.5 w-3.5 shrink-0 mt-0.5", p.color)} />
                                                <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>

                                <div className={cn("p-4 rounded-xl border", p.bg)}>
                                    <div className="flex items-start gap-3">
                                        <Landmark className={cn("h-4 w-4 shrink-0 mt-0.5", p.color)} />
                                        <div>
                                            <p className={cn("text-xs font-bold", p.color)}>Portal Oficial</p>
                                            <p className="text-[11px] text-muted-foreground mt-1">
                                                Las declaraciones y pagos se realizan a través del portal: <span className="font-bold">{p.portalWeb}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>

            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Aviso Legal</p>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                            Las tasas y requisitos mostrados son informativos y están basados en la normativa vigente. Para los datos de pago (cuentas bancarias, planillas), consulte directamente en los portales oficiales de cada ente. Los montos exactos dependen de la nómina real de su empresa.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
