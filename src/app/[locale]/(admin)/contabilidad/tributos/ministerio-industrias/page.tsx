"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, Info, ChevronRight, FileText, TriangleAlert } from "lucide-react";

const REQUISITOS = [
    "Copia del Registro Mercantil actualizado",
    "RIF industrial vigente",
    "Memoria descriptiva de los procesos productivos",
    "Planos de zonificación y conformidad de uso de suelo",
    "Permiso de bomberos y sanidad ambiental",
    "Constancia de cumplimiento laboral (IVSS, INCES, BANAVIH)",
];

const INFORMACION = [
    "El Registro Industrial es obligatorio para todas las empresas que realicen actividades de manufactura o transformación en Venezuela.",
    "La renovación se realiza anualmente ante el Ministerio del Poder Popular de Industrias y Producción Nacional.",
    "Las inspecciones industriales pueden realizarse sin previo aviso para verificar el cumplimiento de las normas técnicas.",
    "El certificado de conformidad es requisito para la obtención de otros permisos y licencias gubernamentales.",
];

export default function MinisterioIndustriasPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <Building2 className="h-3.5 w-3.5" /> Registro Industrial
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Ministerio de <span className="text-primary">Industrias</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Registro de Empresas y Permisos Industriales</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-primary" />
                                Recaudos para el Registro Industrial
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {REQUISITOS.map((req, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{req}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-amber-500" />
                                Información
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {INFORMACION.map((nota, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
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
                                    Las comunicaciones al Ministerio de Industrias pueden generarse desde el Centro de Comunicaciones del módulo Tributario.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
