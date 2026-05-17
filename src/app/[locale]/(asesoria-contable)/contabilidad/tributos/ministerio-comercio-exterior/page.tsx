"use client";

import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Globe, Info, ChevronRight, FileText, TriangleAlert } from "lucide-react";

const REQUISITOS = [
    "Inscripción en el Registro Único de Exportadores (RUSAD)",
    "Certificado de origen del producto o servicio",
    "RIF de exportador actualizado",
    "Memoria descriptiva de los bienes o servicios a exportar",
    "Certificación de calidad (si aplica)",
    "Permiso sanitario o fitosanitario (si aplica)",
];

const INFORMACION = [
    "El registro ante el Ministerio de Comercio Exterior es obligatorio para todas las empresas que realicen operaciones de exportación.",
    "Las exportaciones de bienes y servicios están gravadas con IVA al 0% (Art. 25 LIVA).",
    "Los exportadores pueden solicitar la devolución de créditos fiscales de IVA ante el SENIAT.",
    "El Certificado de Origen es emitido por las Cámaras de Comercio autorizadas.",
];

export default function MinisterioComercioExteriorPage() {
    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <Globe className="h-3.5 w-3.5" /> Comercio Exterior
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Comercio <span className="text-primary">Exterior</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Registro de Exportadores y Promoción de Inversiones</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-primary" />
                                Requisitos para el Registro
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
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Las comunicaciones al Ministerio pueden generarse desde el Centro de Comunicaciones.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
