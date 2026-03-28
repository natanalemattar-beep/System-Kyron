
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FolderArchive, Download, FileSearch, Search, ShieldCheck, Activity, Terminal, Eye } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const declarations = [
    { date: "20/02/2026", tax: "IVA", period: "Enero 2026", amount: 45678, ref: "S-2026-X1" },
    { date: "15/02/2026", tax: "ISLR", period: "4to Trim 2025", amount: 12345, ref: "ISLR-9988" },
    { date: "28/02/2026", tax: "DPP (Pensiones)", period: "Enero 2026", amount: 4050, ref: "DPP-001" },
];

export default function DeclaracionesAnterioresPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <FolderArchive className="h-3 w-3" /> NODO DE ARCHIVO
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Archivo de <span className="text-primary italic">Declaraciones</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Dossier Histórico Inmutable • Auditoría Kyron 2026</p>
                </div>
            </header>

            <div className="mb-10">
                <div className="relative max-w-lg">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                    <Input placeholder="Buscar por periodo o impuesto..." className="pl-12 h-14 rounded-2xl bg-white/5 border-border text-xs font-bold uppercase tracking-widest shadow-inner" />
                </div>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Historial de Cumplimiento Certificado</CardTitle>
                    <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl text-[9px] font-black uppercase border-border" onClick={() => toast({ title: "SINCRONIZANDO ARCHIVO" })}>ACTUALIZAR</Button>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha Presentación</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Impuesto / Tributo</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Periodo</TableHead>
                                <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Declarado</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Comprobante</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {declarations.map((row, i) => (
                                <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                                    <TableCell className="pl-10 py-6 text-[10px] font-bold text-muted-foreground/60 uppercase">{row.date}</TableCell>
                                    <TableCell className="py-6 font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{row.tax}</TableCell>
                                    <TableCell className="py-6 text-center text-[10px] font-bold text-muted-foreground uppercase">{row.period}</TableCell>
                                    <TableCell className="text-right py-6 font-mono text-sm font-black text-foreground/70 italic">{formatCurrency(row.amount, 'Bs.')}</TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-primary/10 text-primary" onClick={() => toast({ title: "COMPROBANTE DIGITAL", description: "Visualizando comprobante de declaración." })}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                        <ShieldCheck className="h-4 w-4 text-primary" /> Sellado de Tiempo Inmutable RFC 3161
                    </div>
                    <Button variant="outline" className="h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest" onClick={() => toast({ title: "EXPORTACIÓN XML", description: "Lote de declaraciones anteriores exportado en formato XML." })}>DESCARGAR LOTE XML</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
