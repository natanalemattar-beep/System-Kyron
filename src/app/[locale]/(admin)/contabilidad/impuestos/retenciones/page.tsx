"use client";

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldCheck, CirclePlus as PlusCircle, ArrowLeft, Download, Filter, Loader2, Inbox } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Retencion {
    id: number;
    fecha: string;
    proveedor: string;
    rif: string;
    tipo: string;
    base: string;
    pct: string;
    monto: string;
    comprobante: string;
}

export default function RetencionesPage() {
    const [rows, setRows] = useState<Retencion[]>([]);
    const [summary, setSummary] = useState<{ total_iva: string; total_islr: string } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=retenciones')
            .then(r => r.ok ? r.json() : { rows: [], summary: null })
            .then(d => { setRows(d.rows ?? []); setSummary(d.summary ?? null); })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
                        <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Centro Contable</Link>
                    </Button>
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
                        <ShieldCheck className="h-8 w-8 text-[#00A86B]" />
                        Retenciones (IVA e ISLR)
                    </h1>
                    <p className="text-slate-500 font-medium text-sm">Registro y emisión de comprobantes de retención a proveedores.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl border-[#0A2472] text-[#0A2472]">
                        <Filter className="mr-2 h-4 w-4" /> Filtrar
                    </Button>
                    <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl">
                        <PlusCircle className="mr-2 h-4 w-4" /> Registrar Retención
                    </Button>
                </div>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Retenido IVA (Mes)</p>
                    <p className="text-3xl font-black text-[#0A2472]">
                        {loading ? '...' : formatCurrency(parseFloat(summary?.total_iva ?? '0'), 'Bs.')}
                    </p>
                </Card>
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Retenido ISLR (Mes)</p>
                    <p className="text-3xl font-black text-[#00A86B]">
                        {loading ? '...' : formatCurrency(parseFloat(summary?.total_islr ?? '0'), 'Bs.')}
                    </p>
                </Card>
            </div>

            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden">
                <CardHeader className="p-8 border-b bg-slate-50/50">
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-[#0A2472]">Relación de Retenciones Practicadas</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Cargando retenciones...</span>
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                            <Inbox className="h-10 w-10" />
                            <p className="text-sm font-bold uppercase tracking-widest">Sin retenciones registradas</p>
                            <p className="text-xs text-slate-400/70">Las retenciones aparecerán aquí al registrar comprobantes.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="pl-8 font-bold">Fecha</TableHead>
                                    <TableHead className="font-bold">Proveedor</TableHead>
                                    <TableHead className="text-center font-bold">Tipo</TableHead>
                                    <TableHead className="text-right font-bold">Base</TableHead>
                                    <TableHead className="text-center font-bold">%</TableHead>
                                    <TableHead className="text-right font-bold">Retenido</TableHead>
                                    <TableHead className="text-right pr-8 font-bold">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((r) => (
                                    <TableRow key={r.id} className="hover:bg-slate-50 transition-colors">
                                        <TableCell className="pl-8 text-xs">{r.fecha}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-xs text-[#0A2472]">{r.proveedor}</span>
                                                <span className="text-[9px] text-slate-400">{r.rif}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant={r.tipo === 'IVA' ? 'default' : 'secondary'} className="text-[9px] uppercase">{r.tipo}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right font-mono text-xs">{formatCurrency(parseFloat(r.base), 'Bs.')}</TableCell>
                                        <TableCell className="text-center font-black text-xs">{String(r.pct).replace('%', '')}%</TableCell>
                                        <TableCell className="text-right font-mono text-xs font-bold text-[#00A86B]">{formatCurrency(parseFloat(r.monto), 'Bs.')}</TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 text-slate-400 hover:text-[#0A2472]">
                                                <Download className="h-4 w-4" />
                                            </Button>
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
