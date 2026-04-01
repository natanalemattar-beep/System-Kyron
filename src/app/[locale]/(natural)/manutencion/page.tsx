"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, Calculator, History, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, Download, ArrowLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Link } from '@/navigation';
import { motion } from "framer-motion";

const depositos = [
    { id: "DEP-001", fecha: "15/07/2024", monto: 1200, concepto: "Mensualidad Julio", estado: "Confirmado" },
    { id: "DEP-002", fecha: "15/06/2024", monto: 1200, concepto: "Mensualidad Junio", estado: "Confirmado" },
    { id: "DEP-003", fecha: "15/05/2024", monto: 1200, concepto: "Mensualidad Mayo", estado: "Confirmado" },
];

export default function ManutencionPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-amber-500/[0.04] via-card to-card p-6 sm:p-8"
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
                    <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                            <Gavel className="h-7 w-7 text-amber-500" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Obligación de Manutención</h1>
                            <p className="text-sm text-muted-foreground font-medium">Cumplimiento LOPNNA — Responsabilidad civil</p>
                        </div>
                    </div>
                    <Button className="h-11 px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 shrink-0"
                        onClick={() => toast({ title: "Calculadora activa", description: "Sincronizando con Unidad Tributaria vigente." })}>
                        <Calculator className="h-3.5 w-3.5" /> Calcular Aporte
                    </Button>
                </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-12">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-8">
                    <Card className="rounded-2xl border border-border/30 bg-card overflow-hidden">
                        <CardHeader className="border-b border-border/20 bg-muted/10">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                    <History className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-sm font-semibold text-foreground">Historial de Depósitos</CardTitle>
                                    <CardDescription className="text-[11px] text-muted-foreground">Registro inmutable de aportes</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/5 border-border/20">
                                        <TableHead className="pl-6 py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Fecha</TableHead>
                                        <TableHead className="py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Concepto</TableHead>
                                        <TableHead className="text-right py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Monto</TableHead>
                                        <TableHead className="text-center py-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Estatus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {depositos.map(dep => (
                                        <TableRow key={dep.id} className="border-border/15 hover:bg-muted/10 transition-colors">
                                            <TableCell className="pl-6 py-4 text-[11px] font-medium text-muted-foreground">{dep.fecha}</TableCell>
                                            <TableCell className="py-4 text-sm font-medium text-foreground/80">{dep.concepto}</TableCell>
                                            <TableCell className="text-right py-4 font-mono text-sm font-semibold text-primary">{formatCurrency(dep.monto, 'Bs.')}</TableCell>
                                            <TableCell className="text-center py-4">
                                                <Badge variant="outline" className="text-[9px] font-bold uppercase tracking-wider border-emerald-500/20 text-emerald-500 bg-emerald-500/5 h-6 px-3 rounded-lg">{dep.estado}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="border-t border-border/20 p-4 flex justify-center">
                            <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary gap-2">
                                <Download className="h-3.5 w-3.5" /> Descargar Estado de Cuenta
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>

                <div className="lg:col-span-4 space-y-4">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <Card className="rounded-2xl border border-emerald-500/20 bg-emerald-500 text-white overflow-hidden">
                            <CardContent className="p-6 relative">
                                <div className="absolute top-0 right-0 p-4 opacity-[0.08]">
                                    <CheckCircle className="h-24 w-24" />
                                </div>
                                <div className="relative z-10 space-y-3">
                                    <h3 className="text-lg font-bold">Estatus Legal</h3>
                                    <p className="text-2xl font-bold">En Cumplimiento</p>
                                    <p className="text-sm opacity-80 leading-relaxed">Sin deudas ni retrasos. Blindaje legal activo.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.02]">
                            <CardContent className="p-5 space-y-3">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-amber-500">Protocolo LOPNNA</span>
                                </div>
                                <div className="flex gap-3 text-[12px] text-muted-foreground leading-relaxed">
                                    <span className="font-bold text-primary shrink-0">[Art. 365]</span>
                                    <span>La manutención es un derecho de orden público e irrenunciable. El sistema monitorea la Unidad Tributaria para ajustes síncronos.</span>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
