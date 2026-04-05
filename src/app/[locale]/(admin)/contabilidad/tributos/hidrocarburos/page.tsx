"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Zap, Info, ChevronRight, FileText, AlertTriangle } from "lucide-react";

const REQUISITOS = [
    "Certificación de NO percepción de regalías",
    "RIF sectorial petrolero o minero",
    "Permiso de operación del Ministerio de Petróleo o Minas",
    "Balance de reservas y producción",
    "Declaración de ISLR bajo régimen especial",
    "Constancia de solvencia tributaria SENIAT",
];

const INFORMACION = [
    "Las empresas de hidrocarburos sin regalías declaran bajo el régimen especial de la LISLR (Art. 11).",
    "El IVA se declara mensualmente según el calendario de Sujetos Pasivos Especiales del SENIAT.",
    "La tarifa de ISLR para el sector petrolero puede alcanzar hasta el 50% sobre la renta neta.",
    "Las empresas de refinación y transporte que no perciben regalías aplican una tarifa diferenciada.",
];

export default function HidrocarburosPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <Zap className="h-3.5 w-3.5" /> Hidrocarburos
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Hidrocarburos y <span className="text-primary">Minería</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Régimen Especial Sin Regalías · Sector Petrolero y Minero</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-primary" />
                                Dossier Sectorial
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
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Este módulo aplica a empresas del sector petrolero y minero que no perciben regalías.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
