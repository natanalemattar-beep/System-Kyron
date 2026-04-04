"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Info, ChevronRight, AlertTriangle } from "lucide-react";

const REQUISITOS = [
    "Constancia de actividad exenta o exonerada",
    "RIF corporativo actualizado",
    "Copia de la Gaceta Oficial que establece la exoneración (si aplica)",
    "Libro de compras del periodo (sin IVA)",
    "Registro detallado de ventas exentas del trimestre",
];

const INFORMACION = [
    "La declaración informativa trimestral es obligatoria para contribuyentes con actividades exclusivamente exentas o exoneradas del IVA.",
    "Se declara ante el SENIAT a través del portal fiscal, dentro de los 15 días siguientes al cierre de cada trimestre.",
    "Los contribuyentes exentos no pueden recuperar créditos fiscales de IVA pagados a sus proveedores.",
    "Las exoneraciones tienen vigencia definida y deben renovarse periódicamente según la Gaceta que las establece.",
];

export default function IvaTrimestralPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
                        <FileText className="h-3.5 w-3.5" /> IVA Trimestral
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        IVA <span className="text-primary">Trimestral</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Declaración Informativa para Exentos y Exonerados</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-primary" />
                                Requisitos para la Declaración
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
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Este módulo aplica exclusivamente a contribuyentes con actividades 100% exentas o exoneradas del IVA.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
