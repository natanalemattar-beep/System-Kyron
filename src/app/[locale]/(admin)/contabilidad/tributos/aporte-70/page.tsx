"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Landmark, Info, ChevronRight, AlertTriangle, FileText } from "lucide-react";

const INFORMACION = [
    "Los servicios desconcentrados y entes autónomos deben aportar el 70% de sus ingresos propios al Tesoro Nacional.",
    "El aporte se calcula sobre los ingresos propios percibidos, excluyendo las transferencias del gobierno central.",
    "La declaración y pago es mensual, según el calendario SENIAT por terminal de RIF.",
    "El incumplimiento genera responsabilidad administrativa para la máxima autoridad del ente.",
];

const REQUISITOS = [
    "Decreto o resolución de creación del ente",
    "RIF institucional actualizado",
    "Designación vigente de la máxima autoridad",
    "Certificación de ingresos propios del periodo",
    "Estado de cuenta de la Tesorería Nacional",
];

export default function Aporte70Page() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <Landmark className="h-3.5 w-3.5" /> Aporte 70%
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Aporte del <span className="text-primary">70%</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Servicios Desconcentrados y Entes Autónomos · Tesoro Nacional</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-primary" />
                                Información del Aporte
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {INFORMACION.map((nota, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="p-5 rounded-xl bg-primary/5 border border-primary/15">
                        <p className="text-sm font-bold mb-2">Fórmula de Cálculo</p>
                        <div className="p-4 rounded-lg bg-muted/50 font-mono text-sm text-center">
                            Aporte = Ingresos Propios del Periodo × 70%
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-2">
                            Se excluyen las transferencias recibidas del gobierno central y los ingresos por operaciones financieras propias del ente.
                        </p>
                    </div>
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
                            <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Nota</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    Este módulo aplica exclusivamente a entes descentralizados y servicios desconcentrados del sector público. Las empresas privadas no están sujetas a este aporte.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
