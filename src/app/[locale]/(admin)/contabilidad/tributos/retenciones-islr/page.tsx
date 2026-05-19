"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Banknote, Info, ChevronRight, Inbox, Loader2, FileText } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

const islrConcepts = [
    { name: "Honorarios Profesionales (PN)", rate: "3%", base: "Monto Facturado", articulo: "Art. 9, Decreto 1.808" },
    { name: "Honorarios Profesionales (PJ)", rate: "2%", base: "Monto Facturado", articulo: "Art. 9, Decreto 1.808" },
    { name: "Arrendamiento de Inmuebles", rate: "3%", base: "Canon Mensual", articulo: "Art. 12, Decreto 1.808" },
    { name: "Comisiones Mercantiles", rate: "3%", base: "Comisión Bruta", articulo: "Art. 9, Decreto 1.808" },
    { name: "Intereses de Capital", rate: "5%", base: "Interés Pagado", articulo: "Art. 10, Decreto 1.808" },
    { name: "Publicidad y Propaganda", rate: "3%", base: "Monto Pauta", articulo: "Art. 12, Decreto 1.808" },
    { name: "Transporte de Carga", rate: "1%", base: "Monto Flete", articulo: "Art. 12, Decreto 1.808" },
    { name: "Enajenación de Acciones", rate: "1%", base: "Precio de Venta", articulo: "Art. 12, Decreto 1.808" },
    { name: "Premios de Lotería", rate: "16%", base: "Monto del Premio", articulo: "Art. 66 LISLR" },
];

const NOTAS = [
    "Las retenciones de ISLR se enterar según el calendario SENIAT para Sujetos Pasivos Especiales.",
    "El comprobante de retención (ARC) debe emitirse al proveedor dentro de los 3 días hábiles siguientes.",
    "La base de retención es el monto facturado antes de IVA.",
    "Los sueldos y salarios aplican la tarifa progresiva del Art. 50 LISLR, no un porcentaje fijo.",
];

interface Retencion {
    id: number;
    fecha: string;
    concepto: string;
    monto: string;
    tipo: string;
    referencia: string | null;
}

export default function RetencionesIslrPage() {
    const [rows, setRows] = useState<Retencion[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=retenciones_islr')
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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-semibold uppercase tracking-wide text-indigo-500 mb-3">
                        <Banknote className="h-3.5 w-3.5" /> Retenciones ISLR
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Retenciones de <span className="text-indigo-500">ISLR</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Decreto N° 1.808 · Reglamento Parcial de Retenciones</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-indigo-500" />
                                Conceptos y Tasas de Retención
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {islrConcepts.map((c, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div>
                                        <p className="text-xs font-bold">{c.name}</p>
                                        <p className="text-[10px] text-muted-foreground">Base: {c.base} · {c.articulo}</p>
                                    </div>
                                    <span className="text-lg font-bold text-indigo-500">{c.rate}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Banknote className="h-4 w-4 text-indigo-500" />
                                Retenciones Registradas
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
                                    <p className="text-sm font-bold">Sin retenciones registradas</p>
                                    <p className="text-xs text-muted-foreground/60">Las retenciones de ISLR aparecerán aquí al ser registradas.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-6 text-xs font-bold">Fecha</TableHead>
                                            <TableHead className="text-xs font-bold">Concepto</TableHead>
                                            <TableHead className="text-xs font-bold">Referencia</TableHead>
                                            <TableHead className="text-right pr-6 text-xs font-bold">Monto</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((r) => (
                                            <TableRow key={r.id}>
                                                <TableCell className="pl-6 text-xs">{r.fecha}</TableCell>
                                                <TableCell className="text-xs">{r.concepto}</TableCell>
                                                <TableCell className="text-xs font-mono text-muted-foreground">{r.referencia ?? '—'}</TableCell>
                                                <TableCell className="text-right pr-6 font-bold text-xs">{formatCurrency(parseFloat(r.monto), 'Bs.')}</TableCell>
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
                                Notas Importantes
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

                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="flex items-start gap-3">
                            <Info className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Decreto 1.808</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    Las tasas indicadas son las establecidas en el Reglamento Parcial de la Ley de ISLR en materia de Retenciones. Los porcentajes pueden variar según el tipo de contribuyente y la actividad económica.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
