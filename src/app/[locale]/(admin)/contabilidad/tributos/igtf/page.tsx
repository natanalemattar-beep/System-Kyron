"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowLeft, Loader2, Inbox, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Link } from "@/navigation";
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
        <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
                        <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Centro Contable</Link>
                    </Button>
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tight flex items-center gap-3">
                        <DollarSign className="h-8 w-8 text-[#00A86B]" />
                        IGTF — Impuesto a Grandes Transacciones Financieras
                    </h1>
                    <p className="text-slate-500 font-medium">Alícuota del {(igtfRate * 100).toFixed(0)}% sobre transacciones en divisas y criptoactivos.</p>
                </div>
                <Button variant="outline" className="rounded-xl"><Download className="mr-2 h-4 w-4" />Exportar</Button>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Débitos del Período</p>
                    <p className="text-3xl font-black text-[#0A2472]">{loading ? '...' : formatCurrency(totalDebitos, 'Bs.')}</p>
                </Card>
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Alícuota IGTF</p>
                    <p className="text-3xl font-black text-amber-600">{(igtfRate * 100).toFixed(0)}%</p>
                </Card>
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">IGTF Estimado</p>
                    <p className="text-3xl font-black text-rose-600">{loading ? '...' : formatCurrency(totalDebitos * igtfRate, 'Bs.')}</p>
                </Card>
            </div>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardHeader className="p-8 border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Movimientos Financieros</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Cargando transacciones...</span>
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                            <Inbox className="h-10 w-10" />
                            <p className="text-sm font-bold uppercase tracking-widest">Sin transacciones registradas</p>
                            <p className="text-xs text-slate-400/70">Los movimientos bancarios aparecerán aquí al ser registrados.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="pl-8 font-bold text-[10px] uppercase">Fecha</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Concepto</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Referencia</TableHead>
                                    <TableHead className="text-right font-bold text-[10px] uppercase">Monto</TableHead>
                                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">IGTF ({(igtfRate * 100).toFixed(0)}%)</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((m) => (
                                    <TableRow key={m.id} className="hover:bg-slate-50 transition-colors">
                                        <TableCell className="pl-8 text-xs">{m.fecha}</TableCell>
                                        <TableCell className="text-xs font-medium">{m.concepto}</TableCell>
                                        <TableCell className="text-xs font-mono text-slate-400">{m.referencia ?? '—'}</TableCell>
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
