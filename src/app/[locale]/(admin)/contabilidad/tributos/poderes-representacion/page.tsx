"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gavel, Info, ChevronRight, Inbox, Loader2, FileText, TriangleAlert } from "lucide-react";

const TIPOS_PODER = [
    { tipo: "Poder General de Administración", descripcion: "Faculta al apoderado para actos de administración ordinaria de la empresa.", registro: "Registro Mercantil / Notaría" },
    { tipo: "Poder Especial Judicial", descripcion: "Otorga facultades para representar a la empresa ante tribunales.", registro: "Tribunal competente" },
    { tipo: "Poder Especial Tributario", descripcion: "Permite al apoderado actuar ante el SENIAT y otros entes tributarios.", registro: "Notaría Pública" },
    { tipo: "Poder General Amplio", descripcion: "Confiere facultades amplias de disposición y administración.", registro: "Registro Mercantil" },
];

const NOTAS = [
    "Los poderes deben estar inscritos ante el Registro Mercantil o la Notaría correspondiente para ser válidos.",
    "El poder especial judicial requiere mención expresa de las facultades otorgadas (Art. 154 CPC).",
    "La revocatoria de un poder debe inscribirse en el mismo registro donde se otorgó.",
    "Los poderes para actos de disposición (venta de bienes) requieren mención expresa del bien.",
];

interface Poder {
    id: number;
    fecha: string;
    concepto: string;
    monto: string;
    tipo: string;
    referencia: string | null;
}

export default function PoderesRepresentacionPage() {
    const [rows, setRows] = useState<Poder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=poderes')
            .then(r => r.ok ? r.json() : { rows: [] })
            .then(d => setRows(d.rows ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
            <header className="pt-8 space-y-4">
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-semibold uppercase tracking-wide text-primary mb-3">
                        <Gavel className="h-3.5 w-3.5" /> SAREN
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Poderes y <span className="text-primary">Representación</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Control de poderes y representación legal · SAREN</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-primary" />
                                Tipos de Poder
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {TIPOS_PODER.map((p, i) => (
                                <div key={i} className="p-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <p className="text-xs font-bold">{p.tipo}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5">{p.descripcion}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 mt-1">Registro: {p.registro}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Gavel className="h-4 w-4 text-primary" />
                                Poderes Registrados
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {loading ? (
                                <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span className="text-sm font-bold">Cargando...</span>
                                </div>
                            ) : rows.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                                    <Inbox className="h-10 w-10 opacity-40" />
                                    <p className="text-sm font-bold">Sin poderes registrados</p>
                                    <p className="text-xs text-muted-foreground/60">Los poderes aparecerán aquí al ser registrados en el sistema.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-6 text-xs font-bold">Fecha</TableHead>
                                            <TableHead className="text-xs font-bold">Tipo</TableHead>
                                            <TableHead className="text-xs font-bold">Referencia</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((r) => (
                                            <TableRow key={r.id}>
                                                <TableCell className="pl-6 text-xs">{r.fecha}</TableCell>
                                                <TableCell className="text-xs font-bold">{r.concepto}</TableCell>
                                                <TableCell className="text-xs font-mono text-muted-foreground">{r.referencia ?? '—'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-amber-500" />
                                Notas Legales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {NOTAS.map((nota, i) => (
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
                                    Las cartas de solicitud al SAREN pueden generarse desde el Centro de Comunicaciones del módulo Tributario.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
