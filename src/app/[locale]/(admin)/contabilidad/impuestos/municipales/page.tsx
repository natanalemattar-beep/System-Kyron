"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Landmark, ArrowLeft, Loader2, Inbox, Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";

interface Factura {
    id: number;
    factura: string;
    fecha: string;
    cliente: string;
    total: string;
    estado: string;
}

export default function MunicipalesPage() {
    const [rows, setRows] = useState<Factura[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/contabilidad/records?type=facturas')
            .then(r => r.ok ? r.json() : { rows: [] })
            .then(d => setRows(d.rows ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const totalIngresos = rows.reduce((sum, f) => sum + parseFloat(f.total || '0'), 0);
    const alicuota = 0.01;

    return (
        <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
                        <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Centro Contable</Link>
                    </Button>
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tight flex items-center gap-3">
                        <Landmark className="h-8 w-8 text-[#00A86B]" />
                        Impuestos Municipales
                    </h1>
                    <p className="text-slate-500 font-medium">Cálculo de patente de industria y comercio sobre ingresos brutos.</p>
                </div>
                <Button variant="outline" className="rounded-xl"><Download className="mr-2 h-4 w-4" />Exportar</Button>
            </header>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Ingresos Brutos</p>
                    <p className="text-3xl font-black text-[#0A2472]">{loading ? '...' : formatCurrency(totalIngresos, 'Bs.')}</p>
                </Card>
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Alícuota Municipal</p>
                    <p className="text-3xl font-black text-amber-600">{(alicuota * 100).toFixed(1)}%</p>
                </Card>
                <Card className="border-none shadow-sm rounded-2xl bg-white p-8">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Impuesto Estimado</p>
                    <p className="text-3xl font-black text-[#00A86B]">{loading ? '...' : formatCurrency(totalIngresos * alicuota, 'Bs.')}</p>
                </Card>
            </div>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Cargando base imponible...</span>
                        </div>
                    ) : rows.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                            <Inbox className="h-10 w-10" />
                            <p className="text-sm font-bold uppercase tracking-widest">Sin facturas para base de cálculo</p>
                            <p className="text-xs text-slate-400/70">Registre facturas de venta para calcular el impuesto municipal.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="pl-8 font-bold text-[10px] uppercase">Factura</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Fecha</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Cliente</TableHead>
                                    <TableHead className="text-right font-bold text-[10px] uppercase">Total</TableHead>
                                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.map((f) => (
                                    <TableRow key={f.id} className="hover:bg-slate-50 transition-colors">
                                        <TableCell className="pl-8 font-mono text-xs font-bold text-[#0A2472]">{f.factura}</TableCell>
                                        <TableCell className="text-xs">{f.fecha}</TableCell>
                                        <TableCell className="text-xs font-medium">{f.cliente}</TableCell>
                                        <TableCell className="text-right font-mono text-xs font-bold">{formatCurrency(parseFloat(f.total), 'Bs.')}</TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Badge variant={f.estado === 'cobrada' ? 'default' : 'secondary'} className="text-[9px] uppercase">{f.estado}</Badge>
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
