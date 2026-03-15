
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Archive, PlusCircle, Download, MoreHorizontal, Activity, Zap, Terminal } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const initialInventory = [
    { sku: "KYRON-BIN-01", nombre: "Papelera Magnética", categoria: "Tecnología", stock: 15, costo: 95, valor: 1425 },
    { sku: "SIM-CARD-01", nombre: "SIM Card 5G", categoria: "Telecom", stock: 100, costo: 2, valor: 200 },
    { sku: "ESIM-DIG-01", nombre: "eSIM Digital", categoria: "Telecom", stock: 1000, costo: 0, valor: 0 },
    { sku: "PROD-002", nombre: "Impresora Fiscal", categoria: "Fiscal", stock: 30, costo: 80, valor: 2400 },
];

export default function InventarioPage() {
    const [inventory] = useState(initialInventory);
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Archive className="h-3 w-3" /> NODO DE EXISTENCIAS
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Kardex <span className="text-primary italic">de Inventario</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Control de Activos • Sincronización TPV 2026</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-border bg-card/50">
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR CSV
                    </Button>
                    <Button className="btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        <PlusCircle className="mr-2 h-4 w-4" /> NUEVO PRODUCTO
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2">
                 <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Zap className="h-24 w-24" /></div>
                    <CardHeader className="p-0 mb-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">Valor Total Activos</p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-4xl font-black italic text-primary tracking-tighter shadow-glow-text">{formatCurrency(inventory.reduce((acc, i) => acc + i.valor, 0), 'Bs.')}</p>
                    </CardContent>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-24 w-24" /></div>
                    <CardHeader className="p-0 mb-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">SKUs Monitoreados</p>
                    </CardHeader>
                    <CardContent className="p-0">
                        <p className="text-4xl font-black italic text-foreground tracking-tighter">{inventory.length}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 flex flex-row justify-between items-center bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registros de Almacén</CardTitle>
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40">
                        <Terminal className="h-4 w-4" /> Sincronizado: 100%
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">SKU / Ref</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Producto</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Stock</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Costo Unit.</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inventory.map((item) => (
                                <TableRow key={item.sku} className="border-border/50 hover:bg-muted/20 transition-all group">
                                    <TableCell className="pl-10 py-6 font-mono text-[10px] font-black text-primary italic">{item.sku}</TableCell>
                                    <TableCell className="py-6">
                                        <p className="font-black text-xs text-foreground/80 uppercase italic">{item.nombre}</p>
                                        <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{item.categoria}</p>
                                    </TableCell>
                                    <TableCell className="text-center py-6 font-black text-sm text-foreground/70">{item.stock}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-bold text-foreground/60">{formatCurrency(item.costo, 'Bs.')}</TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-white/5">
                                            <MoreHorizontal className="h-4 w-4 text-white/20" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
