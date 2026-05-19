"use client";

import { useState, useEffect } from "react";
import { BackButton } from "@/components/back-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FolderArchive, Inbox, Loader2, Info } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface Declaracion {
    id: number;
    fecha: string;
    concepto: string;
    monto: string;
    tipo: string;
    referencia: string | null;
}

export default function DeclaracionesAnterioresPage() {
    const [rows, setRows] = useState<Declaracion[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=declaraciones')
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
                        <FolderArchive className="h-3.5 w-3.5" /> Archivo
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Archivo de <span className="text-primary">Declaraciones</span>
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">Historial de declaraciones tributarias presentadas.</p>
                </div>
            </header>

            <Card className="rounded-2xl shadow-lg border overflow-hidden">
                <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-bold">
                        <FolderArchive className="h-4 w-4 text-primary" />
                        Declaraciones Registradas
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold">Cargando...</span>
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                            <Inbox className="h-10 w-10 opacity-40" />
                            <p className="text-sm font-bold">Sin declaraciones registradas</p>
                            <p className="text-xs text-muted-foreground/60">Las declaraciones tributarias aparecerán aquí al ser registradas en el sistema.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="pl-6 text-xs font-bold">Fecha</TableHead>
                                    <TableHead className="text-xs font-bold">Tributo</TableHead>
                                    <TableHead className="text-xs font-bold">Referencia</TableHead>
                                    <TableHead className="text-right pr-6 text-xs font-bold">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="pl-6 text-xs">{r.fecha}</TableCell>
                                        <TableCell className="text-xs font-bold">{r.concepto}</TableCell>
                                        <TableCell className="text-xs font-mono text-muted-foreground">{r.referencia ?? '—'}</TableCell>
                                        <TableCell className="text-right pr-6 font-bold text-xs">{formatCurrency(parseFloat(r.monto), 'Bs.')}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-3">
                    <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-blue-600 dark:text-blue-400">Nota</p>
                        <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
                            Este archivo muestra las declaraciones registradas en el sistema. Para consultar declaraciones presentadas directamente en el portal SENIAT, acceda a su cuenta en seniat.gob.ve.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
