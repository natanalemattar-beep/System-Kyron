"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Package, Download, CirclePlus as PlusCircle, Search, Loader2, Inbox, ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Link } from "@/navigation";

interface Item {
    id: number;
    codigo: string;
    nombre: string;
    categoria: string;
    cantidad: string;
    precio: string;
    unidad: string;
}

export default function LibroInventarioPage() {
    const [rows, setRows] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch('/api/contabilidad/records?type=inventario')
            .then(r => r.ok ? r.json() : { rows: [] })
            .then(d => setRows(d.rows ?? []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const filtered = rows.filter(i =>
        !search || i.nombre?.toLowerCase().includes(search.toLowerCase()) || i.codigo?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 md:p-12 bg-[#f5f7fa] min-h-screen space-y-8">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                    <Button variant="ghost" asChild className="p-0 h-auto text-[#0A2472] hover:bg-transparent mb-2">
                        <Link href="/contabilidad"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al Centro Contable</Link>
                    </Button>
                    <h1 className="text-3xl font-black text-[#0A2472] uppercase tracking-tighter flex items-center gap-3">
                        <Package className="h-8 w-8 text-[#00A86B]" />
                        Libro de Inventario
                    </h1>
                    <p className="text-slate-500 font-medium">Control de existencias y valoración de activos.</p>
                </div>
                <div className="flex gap-2">
                    <Button className="bg-[#0A2472] hover:bg-blue-900 rounded-xl"><PlusCircle className="mr-2 h-4 w-4" />Agregar Producto</Button>
                    <Button variant="outline" className="rounded-xl"><Download className="mr-2 h-4 w-4" />Exportar</Button>
                </div>
            </header>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input placeholder="Buscar producto..." className="pl-10 h-12 rounded-xl bg-white border-none shadow-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span className="text-sm font-bold uppercase tracking-widest">Cargando inventario...</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
                            <Inbox className="h-10 w-10" />
                            <p className="text-sm font-bold uppercase tracking-widest">Sin productos en inventario</p>
                            <p className="text-xs text-slate-400/70">Los productos aparecerán aquí al ser registrados.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="pl-8 font-bold text-[10px] uppercase">Código</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Producto</TableHead>
                                    <TableHead className="font-bold text-[10px] uppercase">Categoría</TableHead>
                                    <TableHead className="text-right font-bold text-[10px] uppercase">Cantidad</TableHead>
                                    <TableHead className="text-right font-bold text-[10px] uppercase">Unidad</TableHead>
                                    <TableHead className="text-right pr-8 font-bold text-[10px] uppercase">Precio Unit.</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtered.map((i) => (
                                    <TableRow key={i.id} className="hover:bg-slate-50 transition-colors">
                                        <TableCell className="pl-8 font-mono text-xs font-bold text-[#0A2472]">{i.codigo}</TableCell>
                                        <TableCell className="text-xs font-medium">{i.nombre}</TableCell>
                                        <TableCell className="text-xs text-slate-500">{i.categoria}</TableCell>
                                        <TableCell className="text-right font-mono text-xs font-bold">{i.cantidad}</TableCell>
                                        <TableCell className="text-right text-xs text-slate-500">{i.unidad}</TableCell>
                                        <TableCell className="text-right pr-8 font-mono text-xs font-bold text-[#00A86B]">{formatCurrency(parseFloat(i.precio), 'Bs.')}</TableCell>
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
