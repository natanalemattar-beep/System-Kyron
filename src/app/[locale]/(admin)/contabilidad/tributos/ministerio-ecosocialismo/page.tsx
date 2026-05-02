"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Leaf, Info, ChevronRight, FileText, TriangleAlert } from "lucide-react";

const REQUISITOS = [
    "Registro de Actividades Capaces de Degradar el Ambiente (RACDA)",
    "Estudio de Impacto Ambiental (si aplica)",
    "Plan de Manejo de Residuos y Desechos",
    "Certificación de Gestión Ambiental",
    "Conformidad con normas de emisiones y efluentes",
    "Manifiesto de Transporte de Desechos Peligrosos (si aplica)",
];

const INFORMACION = [
    "El RACDA es obligatorio para empresas cuyas actividades puedan causar degradación ambiental (Decreto 1.257).",
    "Las empresas deben presentar el Manifiesto de Desechos periódicamente ante el MINEC.",
    "La Ley Penal del Ambiente establece sanciones penales por contaminación o daño ambiental.",
    "El Certificado de Conformidad Ambiental es requisito para la obtención de otros permisos gubernamentales.",
];

export default function MinisterioEcosocialismoPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-3">
                        <Leaf className="h-3.5 w-3.5" /> Ecosocialismo
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Ministerio de <span className="text-emerald-600 dark:text-emerald-400">Ecosocialismo</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Permisología Ambiental y Gestión de Residuos · MINEC</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-emerald-500" />
                                Requisitos Ambientales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {REQUISITOS.map((req, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
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
                                Información Legal
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
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Las comunicaciones al MINEC pueden generarse desde el Centro de Comunicaciones.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
