"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, CirclePlus as PlusCircle, Eye, CircleCheck as CheckCircle, TrendingUp, FileText, Clock, Send, ArrowUpRight, DollarSign, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/back-button";
import { motion } from "framer-motion";
import { useCurrency } from "@/lib/currency-context";
import { CurrencySelector } from "@/components/currency-selector";

const proformas = [
    { id: "PRO-2026-001", fecha: "19/03/2026", cliente: "Constructora XYZ C.A.", total: 15000, estado: "Enviada", items: 5, validez: "15 días" },
    { id: "PRO-2026-002", fecha: "20/03/2026", cliente: "Eventos Festivos S.R.L.", total: 8500, estado: "Aprobada", items: 3, validez: "30 días" },
    { id: "PRO-2026-003", fecha: "21/03/2026", cliente: "Inversiones ABC C.A.", total: 22000, estado: "Borrador", items: 8, validez: "7 días" },
    { id: "PRO-2026-004", fecha: "25/03/2026", cliente: "Logística Express VE", total: 4200, estado: "Enviada", items: 2, validez: "15 días" },
    { id: "PRO-2026-005", fecha: "28/03/2026", cliente: "Tech Solutions LLC", total: 31500, estado: "Aprobada", items: 12, validez: "30 días" },
];

const statusConfig: Record<string, { variant: "default" | "secondary" | "outline"; color: string; bgColor: string }> = {
  Enviada: { variant: "secondary", color: "text-blue-500", bgColor: "bg-blue-500/10 border-blue-500/20" },
  Aprobada: { variant: "default", color: "text-emerald-500", bgColor: "bg-emerald-500/10 border-emerald-500/20" },
  Borrador: { variant: "outline", color: "text-muted-foreground", bgColor: "bg-muted/20 border-border/30" },
};

export default function ProformasPage() {
    const { toast } = useToast();
    const { format: fmtCur } = useCurrency();

    const totalCotizado = proformas.reduce((a, b) => a + b.total, 0);
    const aprobadas = proformas.filter(p => p.estado === 'Aprobada');
    const totalAprobado = aprobadas.reduce((a, b) => a + b.total, 0);

    return (
        <div className="space-y-8 pb-20 relative">
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full bg-violet-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.03] blur-[120px]" />
            </div>

            <BackButton href="/facturacion" label="Centro de Facturación" />

            <motion.header
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-[9px] font-black uppercase tracking-[0.3em] text-violet-600 mb-4">
                        <Receipt className="h-3 w-3" /> NODO COMERCIAL
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-[1.05]">
                        Gestión de{' '}
                        <span className="bg-gradient-to-r from-violet-500 via-purple-400 to-violet-500 bg-clip-text text-transparent italic">Proformas</span>
                    </h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">Cotizaciones y Presupuestos • Ciclo de Venta 2026</p>
                </div>
                <div className="flex items-center gap-3">
                    <CurrencySelector />
                    <Button className="rounded-2xl h-12 px-8 font-black text-[10px] uppercase tracking-widest bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 shadow-[0_8px_30px_-5px_rgba(139,92,246,0.4)] transition-all hover:shadow-[0_12px_40px_-5px_rgba(139,92,246,0.5)] hover:-translate-y-0.5">
                        <PlusCircle className="mr-3 h-4 w-4" /> NUEVA PROFORMA
                    </Button>
                </div>
            </motion.header>

            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Total Cotizado", val: fmtCur(totalCotizado), icon: DollarSign, color: "text-violet-500", change: `${proformas.length} proformas` },
                    { label: "Aprobadas", val: fmtCur(totalAprobado), icon: CheckCircle, color: "text-emerald-500", change: `${aprobadas.length} contratos` },
                    { label: "Tasa Conversión", val: `${Math.round((aprobadas.length / proformas.length) * 100)}%`, icon: TrendingUp, color: "text-blue-500", change: "este mes" },
                    { label: "Pendientes", val: `${proformas.filter(p => p.estado === 'Enviada').length}`, icon: Send, color: "text-amber-500", change: "en espera" },
                ].map((kpi, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i + 0.2, duration: 0.4 }}
                    >
                        <Card className="glass-card border-none bg-card/50 p-5 rounded-2xl group hover:scale-[1.02] transition-all duration-300">
                            <div className="flex justify-between items-start mb-3">
                                <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted-foreground/50">{kpi.label}</p>
                                <div className={cn("p-2 rounded-xl border bg-current/10 transition-transform group-hover:scale-110",
                                    kpi.color === "text-violet-500" ? "bg-violet-500/10 border-violet-500/15" :
                                    kpi.color === "text-emerald-500" ? "bg-emerald-500/10 border-emerald-500/15" :
                                    kpi.color === "text-blue-500" ? "bg-blue-500/10 border-blue-500/15" :
                                    "bg-amber-500/10 border-amber-500/15"
                                )}>
                                    <kpi.icon className={cn("h-4 w-4", kpi.color)} />
                                </div>
                            </div>
                            <p className="text-2xl font-black text-foreground tracking-tight">{kpi.val}</p>
                            <p className="text-[10px] text-muted-foreground/50 font-bold mt-1">{kpi.change}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                    <CardHeader className="p-6 border-b border-border/20">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 rounded-xl bg-violet-500/10 border border-violet-500/15">
                                    <FileText className="h-4 w-4 text-violet-500" />
                                </div>
                                <div>
                                    <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Archivo de Cotizaciones</CardTitle>
                                    <p className="text-[10px] text-muted-foreground mt-0.5">Proformas recientes con estado de seguimiento</p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-9">
                                <BarChart3 className="mr-2 h-3.5 w-3.5" /> Exportar
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/10 border-none">
                                    <TableHead className="pl-6 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">N° Proforma</TableHead>
                                    <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Fecha</TableHead>
                                    <TableHead className="py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Cliente</TableHead>
                                    <TableHead className="text-center py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Items</TableHead>
                                    <TableHead className="text-right py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Total</TableHead>
                                    <TableHead className="text-center py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Estado</TableHead>
                                    <TableHead className="text-right pr-6 py-4 text-[9px] font-black uppercase tracking-widest text-muted-foreground/40">Acción</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {proformas.map((p, idx) => (
                                    <motion.tr
                                        key={p.id}
                                        className="border-border/10 hover:bg-muted/10 transition-all group cursor-pointer"
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 * idx + 0.6 }}
                                    >
                                        <TableCell className="pl-6 py-5">
                                            <span className="font-mono text-[11px] font-black text-violet-500">{p.id}</span>
                                        </TableCell>
                                        <TableCell className="py-5 text-[11px] font-bold text-muted-foreground">{p.fecha}</TableCell>
                                        <TableCell className="py-5">
                                            <p className="font-bold text-xs text-foreground">{p.cliente}</p>
                                            <p className="text-[9px] text-muted-foreground/50">Validez: {p.validez}</p>
                                        </TableCell>
                                        <TableCell className="text-center py-5">
                                            <span className="text-[10px] font-bold text-muted-foreground">{p.items}</span>
                                        </TableCell>
                                        <TableCell className="text-right py-5 font-mono text-sm font-black text-foreground">{fmtCur(p.total)}</TableCell>
                                        <TableCell className="text-center py-5">
                                            <span className={cn(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border",
                                                statusConfig[p.estado]?.bgColor,
                                                statusConfig[p.estado]?.color
                                            )}>
                                                {p.estado === 'Aprobada' && <CheckCircle className="h-3 w-3" />}
                                                {p.estado === 'Enviada' && <Send className="h-3 w-3" />}
                                                {p.estado === 'Borrador' && <Clock className="h-3 w-3" />}
                                                {p.estado}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right pr-6 py-5">
                                            <Button variant="ghost" size="sm" className="h-8 px-3 rounded-xl hover:bg-violet-500/10 hover:text-violet-500 transition-all">
                                                <Eye className="h-3.5 w-3.5 mr-1.5" />
                                                <span className="text-[9px] font-bold uppercase">Ver</span>
                                            </Button>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
