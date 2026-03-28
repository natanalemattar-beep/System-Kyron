"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, Printer, Download, Search, Loader2, Inbox } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface Asiento {
    id: number;
    fecha: string;
    concepto: string;
    monto: string;
    tipo: string;
    referencia: string | null;
}

export default function LibroDiarioPage() {
    const [rows, setRows] = useState<Asiento[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch('/api/contabilidad/records?type=movimientos')
            .then(r => r.ok ? r.json() : { rows: [] })
            .then(d => setRows(d.rows ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const filtered = rows.filter(a =>
        !search || a.concepto?.toLowerCase().includes(search.toLowerCase()) || a.referencia?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
                        <FileText className="h-8 w-8 text-[#00A86B]" />
                        Libro Diario
                    </h1>
                    <p className="text-slate-500 font-medium">Registro cronológico de operaciones contables.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" />Imprimir</Button>
                    <Button className="bg-[#0A2472]"><Download className="mr-2 h-4 w-4" />Exportar PDF</Button>
                </div>
            </header>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Buscar asiento..." className="pl-10 h-12 rounded-xl bg-white border-none shadow-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Cargando registros...</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                            <Inbox className="h-10 w-10" />
                            <p className="text-sm font-bold uppercase tracking-widest">Sin registros contables</p>
                            <p className="text-xs text-slate-400/70">Los asientos aparecerán aquí cuando registre movimientos bancarios.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50">
                                    <TableHead className="font-black text-[10px] uppercase pl-8">Ref / Fecha</TableHead>
                                    <TableHead className="font-black text-[10px] uppercase">Concepto</TableHead>
                                    <TableHead className="text-right font-black text-[10px] uppercase">Debe</TableHead>
                                    <TableHead className="text-right font-black text-[10px] uppercase">Haber</TableHead>
                                    <TableHead className="text-right pr-8 font-black text-[10px] uppercase">Tipo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((a) => (
                                    <TableRow key={a.id} className="hover:bg-slate-50 transition-colors">
                                        <TableCell className="pl-8">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-xs text-[#0A2472]">{a.fecha}</span>
                                                <span className="text-[9px] text-slate-400 font-mono">{a.referencia ?? '—'}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-xs font-medium text-slate-600 uppercase italic">{a.concepto}</TableCell>
                                        <TableCell className="text-right font-mono text-xs font-bold text-emerald-600">
                                            {a.tipo === 'credito' ? formatCurrency(parseFloat(a.monto), 'Bs.') : '—'}
                                        </TableCell>
                                        <TableCell className="text-right font-mono text-xs font-bold text-rose-600">
                                            {a.tipo === 'debito' ? formatCurrency(parseFloat(a.monto), 'Bs.') : '—'}
                                        </TableCell>
                                        <TableCell className="text-right pr-8 text-xs font-bold uppercase text-slate-500">{a.tipo}</TableCell>
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
