"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSign, Loader2, Inbox, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { BackButton } from "@/components/back-button";
import { useToast } from "@/hooks/use-toast";

interface Movimiento {
    id: number;
    fecha: string;
    concepto: string;
    monto: string;
    tipo: string;
    referencia: string | null;
}

export default function IGTFPage() {
    const { toast } = useToast();
    const [rows, setRows] = useState<Movimiento[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=movimientos')
            .then(r => r.ok ? r.json() : { rows: [] })
            .then(d => setRows(d.rows ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const totalDebitos = rows.filter(m => m.tipo === 'debito').reduce((s, m) => s + parseFloat(m.monto || '0'), 0);
    const igtfRate = 0.03;

    return (
        <div className="p-6 md:p-10 min-h-screen bg-background space-y-8">
            <BackButton href="/contabilidad/tributos" label="Volver a Tributos" />

            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                        <DollarSign className="h-8 w-8 text-emerald-500" />
                        IGTF — Impuesto a Grandes Transacciones Financieras
                    </h1>
                    <p className="text-muted-foreground text-sm font-medium">Alícuota del {(igtfRate * 100).toFixed(0)}% sobre transacciones en divisas y criptoactivos.</p>
                </div>
                <Button variant="outline" className="rounded-xl"><Download className="mr-2 h-4 w-4" />Exportar</Button>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border rounded-2xl shadow-sm p-8">
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Total Débitos del Período</p>
                    <p className="text-3xl font-black text-primary">{loading ? '...' : formatCurrency(totalDebitos, 'Bs.')}</p>
                </Card>
                <Card className="border rounded-2xl shadow-sm p-8">
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Alícuota IGTF</p>
                    <p className="text-3xl font-black text-amber-600">{(igtfRate * 100).toFixed(0)}%</p>
                </Card>
                <Card className="border rounded-2xl shadow-sm p-8">
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">IGTF Estimado</p>
                    <p className="text-3xl font-black text-rose-600">{loading ? '...' : formatCurrency(totalDebitos * igtfRate, 'Bs.')}</p>
                </Card>
            </div>

            <Card className="border rounded-2xl shadow-sm overflow-hidden">
                <CardHeader className="p-6 border-b bg-muted/30">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground">Movimientos Financieros</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Cargando transacciones...</span>
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
                            <Inbox className="h-10 w-10" />
                            <p className="text-sm font-bold uppercase tracking-widest">Sin transacciones registradas</p>
                            <p className="text-xs text-muted-foreground/70">Los movimientos bancarios aparecerán aquí al ser registrados.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="pl-8 font-bold text-[10px] uppercase">Fecha</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Concepto</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Referencia</TableHead>
                                    <TableHead className="text-right font-bold text-[10px] uppercase">Monto</TableHead>
                                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">IGTF ({(igtfRate * 100).toFixed(0)}%)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((m) => (
                                    <TableRow key={m.id} className="hover:bg-muted/30 transition-colors">
                                        <TableCell className="pl-8 text-xs">{m.fecha}</TableCell>
                                        <TableCell className="text-xs font-medium">{m.concepto}</TableCell>
                                        <TableCell className="text-xs font-mono text-muted-foreground">{m.referencia ?? '—'}</TableCell>
                                        <TableCell className="text-right font-mono text-xs font-bold">{formatCurrency(parseFloat(m.monto), 'Bs.')}</TableCell>
                                        <TableCell className="text-right pr-8 font-mono text-xs font-bold text-rose-600">
                                            {m.tipo === 'debito' ? formatCurrency(parseFloat(m.monto) * igtfRate, 'Bs.') : '—'}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
