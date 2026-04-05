"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Truck, Info, ChevronRight, FileText, AlertTriangle } from "lucide-react";

const REQUISITOS = [
    "Certificado de Revisión Técnica vehicular vigente",
    "Póliza de seguro de responsabilidad civil",
    "Permiso de carga expedido por el INTT",
    "Licencia de conducir profesional del operador",
    "Guía de Movilización (para carga pesada o materiales especiales)",
    "Constancia de inscripción en el Registro Nacional de Transporte",
];

const INFORMACION = [
    "El permiso de transporte de carga es expedido por el Instituto Nacional de Transporte Terrestre (INTT).",
    "Las empresas de transporte deben renovar anualmente la revisión técnica de sus unidades.",
    "El transporte de materiales peligrosos requiere permisos especiales del Ministerio del Ambiente.",
    "Las guías de movilización SICA/SADA son obligatorias para el transporte de productos agrícolas y pecuarios.",
];

export default function MinisterioTransportePage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <Truck className="h-3.5 w-3.5" /> Transporte
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Ministerio de <span className="text-primary">Transporte</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Permisología de Flota y Transporte Terrestre · INTT</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-primary" />
                                Requisitos para Permiso de Carga
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
                            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Las comunicaciones al INTT pueden generarse desde el Centro de Comunicaciones.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
