"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Microscope, Info, ChevronRight, TriangleAlert, FileText } from "lucide-react";

const INFORMACION = [
    "La LOCTI establece que empresas con ingresos brutos anuales superiores a 100.000 UT deben aportar entre 0.5% y 2% de sus ingresos a actividades de ciencia y tecnología.",
    "El aporte puede realizarse mediante: inversión directa en proyectos propios, aportes al FONACIT, o financiamiento de proyectos de terceros inscritos en el SIDCA.",
    "Las empresas deben inscribirse en el Sistema para la Declaración y Control del Aporte (SIDCA) del Ministerio de Ciencia y Tecnología.",
    "La declaración es anual y debe presentarse dentro de los 60 días siguientes al cierre del ejercicio fiscal.",
    "Los aportes en inversión directa deben estar vinculados a proyectos previamente aprobados por el organismo competente.",
];

const REQUISITOS = [
    "Registro en el SIDCA (sidca.fonacit.gob.ve)",
    "RIF corporativo actualizado",
    "Declaración estimada de ingresos brutos",
    "Proyecto de inversión tecnológica (si aplica inversión directa)",
    "Constancia de solvencia del ejercicio anterior",
];

const TASAS = [
    { tipo: "Gran Empresa (> 100.000 UT)", tasa: "2%", base: "Ingresos brutos anuales" },
    { tipo: "Mediana Empresa (50.000 – 100.000 UT)", tasa: "1%", base: "Ingresos brutos anuales" },
    { tipo: "Empresa Pública", tasa: "0.5%", base: "Ingresos brutos anuales" },
];

export default function FonacitPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[10px] font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400 mb-3">
                        <Microscope className="h-3.5 w-3.5" /> FONACIT
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Aporte <span className="text-purple-600 dark:text-purple-400">FONACIT (LOCTI)</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Ley Orgánica de Ciencia, Tecnología e Innovación · Aporte anual</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Microscope className="h-4 w-4 text-purple-500" />
                                Tasas de Aporte
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {TASAS.map((t, i) => (
                                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div>
                                        <p className="text-xs font-bold">{t.tipo}</p>
                                        <p className="text-[10px] text-muted-foreground">{t.base}</p>
                                    </div>
                                    <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{t.tasa}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-purple-500" />
                                Información Legal
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {INFORMACION.map((nota, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-purple-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-blue-500" />
                                Requisitos
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {REQUISITOS.map((req, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{req}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <div className="flex items-start gap-3">
                            <TriangleAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Nota</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    Las tasas y requisitos están basados en la LOCTI vigente. La inscripción en el SIDCA se realiza directamente en el portal del FONACIT (sidca.fonacit.gob.ve).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
