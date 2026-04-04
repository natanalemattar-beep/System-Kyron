"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TreePalm as Palmtree, Info, ChevronRight, FileText, AlertTriangle } from "lucide-react";

const REQUISITOS = [
    "Inscripción en el Registro Turístico Nacional (RTN)",
    "RIF corporativo actualizado",
    "Licencia de actividad turística emitida por MINTUR",
    "Constancia de cumplimiento del 1% INATUR",
    "Certificación de calidad turística (si aplica)",
    "Póliza de responsabilidad civil para prestadores de servicios turísticos",
];

const INFORMACION = [
    "Los prestadores de servicios turísticos deben inscribirse en el Registro Turístico Nacional (RTN) ante el MINTUR.",
    "La contribución del 1% al INATUR es obligatoria para hoteles, agencias de viaje, restaurantes y empresas turísticas.",
    "La clasificación y categorización de establecimientos de alojamiento la realiza MINTUR.",
    "El RTN tiene vigencia de 3 años y debe renovarse antes de su vencimiento.",
];

export default function MinisterioTurismoPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400 mb-3">
                        <Palmtree className="h-3.5 w-3.5" /> Turismo
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Ministerio de <span className="text-amber-600 dark:text-amber-400">Turismo</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Registro Turístico Nacional (RTN) · Contribución INATUR</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-amber-500" />
                                Requisitos para el RTN
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {REQUISITOS.map((req, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
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
                            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Las comunicaciones al MINTUR pueden generarse desde el Centro de Comunicaciones.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
