"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, Info, ChevronRight, Inbox, Loader2, AlertTriangle } from "lucide-react";

const NOTAS = [
    "Toda máquina o equipo fiscal debe estar homologado por el SENIAT antes de su uso (Providencia SNAT/2011/0071).",
    "La autorización de impresoras fiscales es otorgada por la Gerencia de Fiscalización del SENIAT.",
    "Los equipos no homologados generan la sanción del Art. 101 del COT: clausura temporal del establecimiento.",
    "Las memorias fiscales deben ser resguardadas por un mínimo de 4 años después del cierre del ejercicio.",
    "Al sustituir un equipo fiscal, debe notificarse al SENIAT dentro de los 15 días hábiles siguientes.",
];

interface Equipo {
    id: number;
    fecha: string;
    concepto: string;
    monto: string;
    tipo: string;
    referencia: string | null;
}

export default function HomologacionPage() {
    const [rows, setRows] = useState<Equipo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=homologacion')
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
                        <Printer className="h-3.5 w-3.5" /> Homologación
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                        Homologación <span className="text-primary">SENIAT</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Providencia SNAT/2011/0071 · Control de Máquinas Fiscales</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <Card className="rounded-2xl shadow-lg border overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Printer className="h-4 w-4 text-primary" />
                                Equipos Fiscales Registrados
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
                                    <p className="text-sm font-bold">Sin equipos registrados</p>
                                    <p className="text-xs text-muted-foreground/60">Los equipos fiscales homologados aparecerán aquí al ser registrados.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="pl-6 text-xs font-bold">Fecha</TableHead>
                                            <TableHead className="text-xs font-bold">Equipo</TableHead>
                                            <TableHead className="text-xs font-bold">Referencia</TableHead>
                                            <TableHead className="text-right pr-6 text-xs font-bold">Serial</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {rows.map((r) => (
                                            <TableRow key={r.id}>
                                                <TableCell className="pl-6 text-xs">{r.fecha}</TableCell>
                                                <TableCell className="text-xs font-bold">{r.concepto}</TableCell>
                                                <TableCell className="text-xs font-mono text-muted-foreground">{r.referencia ?? '—'}</TableCell>
                                                <TableCell className="text-right pr-6 text-xs">{r.tipo}</TableCell>
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
                                Normativa
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

                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold text-rose-600 dark:text-rose-400">Sanción</p>
                                <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                                    El uso de equipos fiscales no homologados puede resultar en clausura temporal del establecimiento (Art. 101 COT) y multas de 150 a 200 UT.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
