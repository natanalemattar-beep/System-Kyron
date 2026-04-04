"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Percent, Info, ChevronRight, Inbox, Loader2, FileText, AlertTriangle } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const PORCENTAJES_RETENCION = [
    { concepto: "Contribuyente Ordinario con RIF", porcentaje: "75%", descripcion: "Retención estándar del IVA facturado.", base: "Prov. SNAT/2015/0049, Art. 5" },
    { concepto: "Contribuyente No Domiciliado", porcentaje: "100%", descripcion: "Retención total del IVA.", base: "Prov. SNAT/2015/0049, Art. 5" },
    { concepto: "Proveedor sin RIF (no inscrito)", porcentaje: "100%", descripcion: "Retención total obligatoria.", base: "Prov. SNAT/2015/0049, Art. 5" },
    { concepto: "Pagos en divisas (IGTF aplicable)", porcentaje: "75%", descripcion: "Retención estándar más IGTF del 3%.", base: "Prov. SNAT/2015/0049 + Ley IGTF" },
];

const EXCEPCIONES = [
    { concepto: "Caja Chica", descripcion: "Pagos menores a 20 Unidades Tributarias.", base: "Prov. 0049, Art. 3" },
    { concepto: "Viáticos", descripcion: "Gastos de viaje y alimentación debidamente soportados.", base: "Prov. 0049, Art. 3" },
    { concepto: "Gastos Reembolsables", descripcion: "Pagos realizados por cuenta de terceros.", base: "Prov. 0049, Art. 3" },
    { concepto: "Servicios Básicos", descripcion: "Pagos de servicios públicos (electricidad, agua, telefonía).", base: "Prov. 0049, Art. 3" },
];

const NOTAS = [
    "El agente de retención debe enterar las retenciones practicadas según el calendario SENIAT para SPE.",
    "El momento de retención es al pago o abono en cuenta, lo que ocurra primero (Art. 13 LIVA).",
    "Los comprobantes de retención deben emitirse dentro de los 3 días hábiles siguientes al pago.",
    "El archivo .txt para carga masiva se genera según el formato establecido por el SENIAT.",
];

interface Retencion {
    id: number;
    fecha: string;
    concepto: string;
    monto: string;
    tipo: string;
    referencia: string | null;
}

export default function RetencionesIvaPage() {
    const { toast } = useToast();
    const [rows, setRows] = useState<Retencion[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=retenciones_iva')
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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
                        <Percent className="h-3.5 w-3.5" /> Retenciones IVA
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Retenciones de <span className="text-primary">IVA</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Providencia SNAT/2015/0049 · Agentes de Retención</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-6">
                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Percent className="h-4 w-4 text-primary" />
                                Porcentajes de Retención
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {PORCENTAJES_RETENCION.map((p, i) => (
                                <div key={i} className="p-3.5 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold">{p.concepto}</span>
                                        <span className="text-lg font-black text-primary">{p.porcentaje}</span>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground">{p.descripcion}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 mt-1">{p.base}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <FileText className="h-4 w-4 text-primary" />
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
                                    <p className="text-xs text-muted-foreground/60">Las retenciones de IVA aparecerán aquí al ser registradas.</p>
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
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                                Excepciones de Retención
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {EXCEPCIONES.map((e, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-bold">{e.concepto}</p>
                                        <p className="text-[11px] text-muted-foreground">{e.descripcion}</p>
                                        <p className="text-[10px] text-muted-foreground/60 mt-0.5">{e.base}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl shadow-lg border">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Info className="h-4 w-4 text-blue-500" />
                                Notas Importantes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2.5">
                            {NOTAS.map((nota, i) => (
                                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                                    <ChevronRight className="h-3.5 w-3.5 text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">{nota}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
