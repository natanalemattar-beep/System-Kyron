
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Handshake, Heart, Church, Building, Coins, FileText, ShieldCheck, Activity, Terminal, Download, Printer, Users, ClipboardList, TrendingUp, Zap, CircleCheck as CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency, cn } from "@/lib/utils";

/**
 * @fileOverview Centro de Gestión para Entidades Sin Fines de Lucro (ESFL).
 * Diseño de alta densidad para Fundaciones, Asociaciones, Iglesias y Condominios.
 */

export default function EntidadesSinFinesLucroPage() {
    const { toast } = useToast();
    const [activeType, setActiveType] = useState("fundaciones");

    const handleAction = (action: string) => {
        toast({
            title: `PROTOCOLO ${action.toUpperCase()} ACTIVADO`,
            description: "Documento procesado bajo estándares de transparencia.",
            action: <CheckCircle className="text-emerald-500 h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-emerald-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600 shadow-glow-secondary mb-4">
                        <Handshake className="h-3 w-3" /> NODO DE TRANSPARENCIA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow text-white">Gestión <span className="text-emerald-500 italic">ESFL y Condominios</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Contabilidad Social • Rendición de Cuentas 2026</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={() => window.print()}>
                        <Printer className="mr-3 h-4 w-4" /> IMPRIMIR BALANCE
                    </Button>
                    <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        <Download className="mr-3 h-4 w-4" /> EXPORTAR LIBROS
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "FONDOS EJECUTADOS", val: formatCurrency(15400, 'Bs.'), color: "text-emerald-500", icon: Zap },
                    { label: "DONACIONES / CUOTAS", val: formatCurrency(22800, 'Bs.'), color: "text-primary", icon: Coins },
                    { label: "MIEMBROS / PROPIETARIOS", val: "145", color: "text-blue-400", icon: Users },
                    { label: "ESTATUS LEGAL", val: "AL DÍA", color: "text-emerald-500", icon: ShieldCheck },
                ].map((stat, i) => (
                    <Card key={i} className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </div>
                        <p className={cn("text-2xl font-black italic tracking-tighter leading-none", stat.color)}>{stat.val}</p>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="fundaciones" onValueChange={setActiveType} className="w-full">
                <TabsList className="flex h-16 bg-card/40 border border-border rounded-[2rem] p-2 mb-10 shadow-inner max-w-4xl overflow-x-auto no-scrollbar">
                    <TabsTrigger value="fundaciones" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Fundaciones</TabsTrigger>
                    <TabsTrigger value="asociaciones" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Asociaciones</TabsTrigger>
                    <TabsTrigger value="iglesias" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Iglesias</TabsTrigger>
                    <TabsTrigger value="condominios" className="flex-1 rounded-2xl font-black uppercase text-[9px] tracking-widest data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Condominios</TabsTrigger>
                </TabsList>

                <div className="grid gap-10 lg:grid-cols-12">
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeType}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                                    <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                                        <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600 italic">Libro de Ingresos y Egresos - {activeType.toUpperCase()}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-muted/30 border-none">
                                                    <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha / Ref</TableHead>
                                                    <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Concepto de Fondo</TableHead>
                                                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Ingreso</TableHead>
                                                    <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Gasto</TableHead>
                                                    <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Saldo</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {[
                                                    { date: "15/03/2026", ref: "REC-045", concept: "Donación Individual", in: 1200, out: 0, balance: 15400 },
                                                    { date: "14/03/2026", ref: "GTO-012", concept: "Mantenimiento Instalaciones", in: 0, out: 450, balance: 14200 },
                                                    { date: "12/03/2026", ref: "REC-044", concept: "Aporte Socios", in: 5000, out: 0, balance: 14650 },
                                                ].map((row, i) => (
                                                    <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                                                        <TableCell className="pl-10 py-6">
                                                            <p className="font-black text-xs text-foreground/80 uppercase italic">{row.date}</p>
                                                            <p className="text-[8px] font-mono text-emerald-600 font-bold uppercase">{row.ref}</p>
                                                        </TableCell>
                                                        <TableCell className="py-6 font-bold text-muted-foreground uppercase text-[10px]">{row.concept}</TableCell>
                                                        <TableCell className="text-right py-6 font-mono text-sm font-bold text-emerald-500">{row.in > 0 ? formatCurrency(row.in, 'Bs.') : "-"}</TableCell>
                                                        <TableCell className="text-right py-6 font-mono text-sm font-bold text-rose-500">{row.out > 0 ? `(${formatCurrency(row.out, 'Bs.')})` : "-"}</TableCell>
                                                        <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-foreground/70 italic">{formatCurrency(row.balance, 'Bs.')}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                    <CardFooter className="p-10 bg-emerald-500/5 border-t border-border flex justify-between items-center">
                                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                            <Terminal className="h-4 w-4 text-emerald-600" /> Transparencia Certificada v2.6
                                        </div>
                                        <Button variant="ghost" className="text-emerald-600 text-[9px] font-black uppercase tracking-widest" onClick={() => handleAction('conciliación')}>Conciliar Fondos</Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="lg:col-span-4 space-y-8">
                        <Card className="glass-card border-none p-10 rounded-[3rem] bg-emerald-600 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><ShieldCheck className="h-32 w-32" /></div>
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Blindaje Social</h3>
                            <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8 text-justify">
                                Las entidades sin fines de lucro deben cumplir con el reporte de actividades y el origen de fondos lícitos. El sistema bloquea transacciones no documentadas para proteger la personalidad jurídica de la institución.
                            </p>
                            <Button variant="secondary" className="w-full h-12 bg-white text-emerald-600 font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl" onClick={() => toast({ title: "AUDITORÍA SOLICITADA", description: "Solicitud de auditoría para entidad sin fines de lucro registrada." })}>SOLICITAR AUDITORÍA</Button>
                        </Card>

                        <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-card/40 shadow-xl">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-6 flex items-center gap-3 italic">
                                <ClipboardList className="h-4 w-4" /> Deberes Formales
                            </h4>
                            <div className="space-y-4">
                                {[
                                    { label: "Registro Civil/Mercantil", status: "Al día" },
                                    { label: "Declaración Informativa", status: "Marzo 2026" },
                                    { label: "Libro de Actas", status: "Auditado" },
                                    { label: "Exención ISLR", status: "Vigente" }
                                ].map(item => (
                                    <div key={item.label} className="flex justify-between items-center border-b border-border/50 pb-2">
                                        <span className="text-[9px] font-bold text-muted-foreground uppercase">{item.label}</span>
                                        <span className="text-[9px] font-black text-foreground uppercase italic">{item.status}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card className="glass-card border-none p-8 rounded-[2.5rem] bg-white/[0.02] shadow-xl border-l-4 border-emerald-500">
                            <div className="flex items-center gap-4 mb-4">
                                <Activity className="h-5 w-5 text-emerald-500" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest">IA Transparencia</h4>
                            </div>
                            <p className="text-[10px] font-medium italic text-muted-foreground/60 leading-relaxed uppercase">
                                "El motor predictivo sugiere reservar un 10% adicional en el **Fondo de Reserva** para cubrir el incremento proyectado en servicios del Q3."
                            </p>
                        </Card>
                    </div>
                </div>
            </Tabs>
        </div>
    );
}
