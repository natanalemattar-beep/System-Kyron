"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Printer, Loader2, Inbox } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Factura {
    id: number;
    factura: string;
    fecha: string;
    cliente: string;
    tipo: string;
    subtotal: string;
    iva: string;
    total: string;
    estado: string;
}

export default function LibroCompraVentaPage() {
    const [rows, setRows] = useState<Factura[]>([]);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState("venta");

    useEffect(() => {
        fetch('/api/contabilidad/records?type=facturas')
            .then(r => r.ok ? r.json() : { rows: [] })
            .then(d => setRows(d.rows ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const filtered = rows.filter(r => r.tipo === tab);

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
                        <BookOpen className="h-8 w-8 text-[#00A86B]" />
                        Libro de Compra / Venta
                    </h1>
                    <p className="text-slate-500 font-medium">Registro de facturas conforme al SENIAT.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" />Imprimir</Button>
                    <Button className="bg-[#0A2472]"><Download className="mr-2 h-4 w-4" />Exportar PDF</Button>
                </div>
            </header>

            <Tabs value={tab} onValueChange={setTab}>
                <TabsList className="bg-white shadow-sm rounded-xl">
                    <TabsTrigger value="venta" className="font-bold uppercase text-xs tracking-widest">Ventas</TabsTrigger>
                    <TabsTrigger value="compra" className="font-bold uppercase text-xs tracking-widest">Compras</TabsTrigger>
                </TabsList>

                <TabsContent value={tab}>
                    <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm mt-4">
                        <CardContent className="p-0">
                            {loading ? (
                                <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    <span className="text-sm font-bold uppercase tracking-widest">Cargando facturas...</span>
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                                    <Inbox className="h-10 w-10" />
                                    <p className="text-sm font-bold uppercase tracking-widest">Sin facturas de {tab === 'venta' ? 'venta' : 'compra'}</p>
                                    <p className="text-xs text-slate-400/70">Las facturas aparecerán aquí al ser registradas.</p>
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50 hover:bg-slate-50">
                                            <TableHead className="font-black text-[10px] uppercase pl-8">N° Factura</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase">Fecha</TableHead>
                                            <TableHead className="font-black text-[10px] uppercase">{tab === 'venta' ? 'Cliente' : 'Proveedor'}</TableHead>
                                            <TableHead className="text-right font-black text-[10px] uppercase">Subtotal</TableHead>
                                            <TableHead className="text-right font-black text-[10px] uppercase">IVA</TableHead>
                                            <TableHead className="text-right font-black text-[10px] uppercase">Total</TableHead>
                                            <TableHead className="text-right pr-8 font-black text-[10px] uppercase">Estado</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filtered.map((f) => (
                                            <TableRow key={f.id} className="hover:bg-slate-50 transition-colors">
                                                <TableCell className="pl-8 font-mono text-xs font-bold text-[#0A2472]">{f.factura}</TableCell>
                                                <TableCell className="text-xs">{f.fecha}</TableCell>
                                                <TableCell className="text-xs font-medium">{f.cliente}</TableCell>
                                                <TableCell className="text-right font-mono text-xs">{formatCurrency(parseFloat(f.subtotal), 'Bs.')}</TableCell>
                                                <TableCell className="text-right font-mono text-xs">{formatCurrency(parseFloat(f.iva), 'Bs.')}</TableCell>
                                                <TableCell className="text-right font-mono text-xs font-bold">{formatCurrency(parseFloat(f.total), 'Bs.')}</TableCell>
                                                <TableCell className="text-right pr-8">
                                                    <Badge variant={f.estado === 'cobrada' ? 'default' : f.estado === 'vencida' ? 'destructive' : 'secondary'} className="text-[9px] uppercase">{f.estado}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
