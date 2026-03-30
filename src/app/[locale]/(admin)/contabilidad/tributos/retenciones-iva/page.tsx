
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Percent, Download, ShieldCheck, Activity, Landmark, FileText, ShieldAlert, Terminal, Zap, Filter, CirclePlus as PlusCircle, ArrowRight, Ban, Coins, CreditCard, History, CircleCheck as CheckCircle, Banknote } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const retencionesPracticadas = [
    { id: "RET-2026-001", fecha: "15/03/2026", proveedor: "Kyron Logistics, C.A.", rif: "J-50328472-4", base: 5000, iva: 800, ret: 600, pct: "75%", status: "Sincronizado" },
    { id: "RET-2026-002", fecha: "14/03/2026", proveedor: "Suministros Costa, C.A.", rif: "J-40159263-7", base: 1200, iva: 192, ret: 192, pct: "100%", status: "Riesgo Mitigado" },
];

export default function RetencionesIvaPage() {
    const { toast } = useToast();
    const [selectedTab, setSelectedTab] = useState("practicadas");

    const handleExportTxt = () => {
        toast({
            title: "ARCHIVO .TXT GENERADO",
            description: "Documento para carga masiva SENIAT listo para despacho.",
            action: <CheckCircle className="text-primary h-4 w-4" />
        });
    };

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Percent className="h-3 w-3" /> AGENTE DE RETENCIÓN
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">Retenciones <span className="text-primary italic">de IVA</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Prov. 049 (2015) & Decreto 054 (Agosto 2025) • Blindaje Fiscal</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[9px] font-black uppercase tracking-widest border-border bg-card/50 text-foreground" onClick={() => handleExportTxt()}>
                        <Download className="mr-3 h-4 w-4" /> EXPORTAR .TXT
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                        <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR RETENCIÓN
                    </Button>
                </div>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Total Retenido Mes", val: formatCurrency(12450, 'Bs.'), icon: Landmark, color: "text-primary" },
                    { label: "Tasa Promedio", val: "78.5%", icon: Percent, color: "text-emerald-500" },
                    { label: "Riesgo de Impago", val: "0.00%", icon: ShieldCheck, color: "text-emerald-500" },
                    { label: "Excedentes", val: formatCurrency(3200, 'Bs.'), icon: Coins, color: "text-amber-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">{stat.label}</p>
                            <stat.icon className={cn("h-4 w-4", stat.color)} />
                        </div>
                        <p className="text-2xl font-black italic text-foreground tracking-tight">{stat.val}</p>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="practicadas" onValueChange={setSelectedTab} className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner max-w-2xl">
                    <TabsTrigger value="practicadas" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Retenciones (75%/100%)</TabsTrigger>
                    <TabsTrigger value="excepciones" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Excepciones</TabsTrigger>
                    <TabsTrigger value="pagos" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Certificación Pagos</TabsTrigger>
                    <TabsTrigger value="excedente" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-rose-600 data-[state=active]:text-white">Excedentes</TabsTrigger>
                </TabsList>

                <TabsContent value="practicadas" className="animate-in fade-in duration-500">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Ledger de Retenciones síncronas</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Fecha / Referencia</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Proveedor / RIF</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Alicuota</TableHead>
                                        <TableHead className="text-right py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Retenido</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {retencionesPracticadas.map(row => (
                                        <TableRow key={row.id} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic">{row.fecha}</p>
                                                <p className="text-[8px] font-mono text-muted-foreground font-bold">{row.id}</p>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic">{row.proveedor}</p>
                                                <p className="text-[8px] font-mono text-primary font-bold">{row.rif}</p>
                                            </TableCell>
                                            <TableCell className="text-center py-6">
                                                <Badge className={cn("text-[8px] font-black px-3 h-6", row.pct === '100%' ? "bg-rose-500/20 text-rose-500" : "bg-primary/20 text-primary")}>{row.pct}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(row.ret, 'Bs.')}</TableCell>
                                            <TableCell className="text-center py-6">
                                                <Badge variant="outline" className="text-[8px] font-black uppercase border-emerald-500/20 text-emerald-400 bg-emerald-500/5">{row.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                <Terminal className="h-4 w-4" /> Momento de Retención: Pago o Abono en Cuenta
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="h-10 rounded-xl border-border bg-card/50 text-[9px] font-black uppercase">LIBRO DE VENTAS</Button>
                                <Button variant="outline" className="h-10 rounded-xl border-border bg-card/50 text-[9px] font-black uppercase">COMPROBANTES</Button>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="excepciones" className="animate-in fade-in duration-500">
                    <div className="grid md:grid-cols-2 gap-8">
                        <Card className="glass-card border-none p-10 rounded-[3rem] bg-card/40">
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-primary mb-8 flex items-center gap-4">
                                <Ban className="h-6 w-6 text-rose-500" /> Excepciones de Retención
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { label: "Caja Chica", desc: "Pagos menores a 20 Unidades Tributarias.", status: "Auto-Excluido" },
                                    { label: "Viáticos", desc: "Gastos de viaje y alimentación debidamente soportados.", status: "Activo" },
                                    { label: "Gastos Reembolsables", desc: "Pagos realizados por cuenta de terceros.", status: "Activo" },
                                    { label: "Domiciliación", desc: "Pagos de servicios básicos por débito automático.", status: "Activo" }
                                ].map(exc => (
                                    <div key={exc.label} className="p-5 rounded-2xl bg-white/5 border border-border group hover:border-primary/20 transition-all flex justify-between items-center">
                                        <div className="space-y-1">
                                            <p className="text-xs font-black uppercase text-foreground/80">{exc.label}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase">{exc.desc}</p>
                                        </div>
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black">{exc.status}</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-xl">
                            <div className="space-y-8">
                                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 w-fit">
                                    <ShieldAlert className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">Certificación de Gasto</h3>
                                <p className="text-sm font-medium italic text-muted-foreground/60 leading-relaxed text-justify">
                                    El sistema bloquea automáticamente la retención en conceptos marcados como "Excepción", solicitando únicamente la validación del comprobante de pago para el cierre contable.
                                </p>
                                <Button className="w-full h-14 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-xl">CONFIGURAR LÍMITES</Button>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="pagos" className="animate-in fade-in duration-500">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden">
                        <CardHeader className="p-10 border-b border-border/50">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Terminal de Verificación de Pagos</CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: "Efectivo", icon: Banknote, color: "text-emerald-500" },
                                { label: "Cheque", icon: FileText, color: "text-primary" },
                                { label: "Transferencia", icon: Landmark, color: "text-blue-500" },
                                { label: "T. Débito Corp.", icon: CreditCard, color: "text-amber-500" }
                            ].map(method => (
                                <div key={method.label} className="p-8 rounded-[2.5rem] bg-white/5 border border-border text-center group hover:bg-white/10 hover:border-primary/30 transition-all cursor-pointer">
                                    <method.icon className={cn("h-10 w-10 mx-auto mb-6 opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all", method.color)} />
                                    <p className="text-xs font-black uppercase italic text-foreground/80">{method.label}</p>
                                    <p className="text-[8px] font-bold text-muted-foreground uppercase mt-2">Certificado Kyron</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="excedente" className="animate-in fade-in duration-500">
                    <Card className="bg-rose-600/10 border-2 border-rose-600/20 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Coins className="h-48 w-48 text-rose-500" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <ShieldAlert className="h-10 w-10 text-rose-500 animate-pulse" />
                                    <h3 className="text-3xl font-black uppercase italic tracking-tight text-foreground leading-none">Recuperación de <br/> Excedentes</h3>
                                </div>
                                <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify">
                                    Si el monto de retenciones de IVA acumulado supera su débito fiscal del periodo, el sistema inicia automáticamente el protocolo de **Recuperación de Excedentes**. Este proceso genera el expediente digital para la compensación o devolución ante el SENIAT.
                                </p>
                                <div className="flex gap-4">
                                    <Button className="h-14 px-10 rounded-2xl bg-white text-rose-600 font-black uppercase text-xs tracking-widest shadow-xl hover:bg-white/90">INICIAR RECLAMO</Button>
                                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-white/20 text-white font-black uppercase text-[10px]">VER HISTÓRICO</Button>
                                </div>
                            </div>
                            <div className="p-10 rounded-[3rem] bg-black/40 border border-white/5 shadow-inner">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-rose-400 mb-10 flex items-center gap-3 italic">
                                    <Activity className="h-4 w-4" /> Telemetría de Excedentes
                                </h4>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">
                                        <span>Monto Acumulado</span>
                                        <span className="text-white text-base">{formatCurrency(3200, 'Bs.')}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4">
                                        <span>Meses sin Compensar</span>
                                        <span className="text-amber-400 text-base">3 MESES</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/40">
                                        <span>Estatus Expediente</span>
                                        <span className="text-rose-400 font-black">AUDITORÍA</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card className="glass-card border-none bg-[#050505] p-12 rounded-[4rem] mt-10 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-10 opacity-10"><Zap className="h-48 w-48 text-primary" /></div>
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 relative z-10">
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="h-8 w-8 text-primary animate-pulse" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tight text-foreground">Inteligencia Preventiva</h3>
                        </div>
                        <p className="text-lg font-medium italic text-white/60 leading-relaxed text-justify border-l-4 border-primary/20 pl-10">
                            El sistema audita cada factura en el momento del pago o abono en cuenta. Si se detecta un proveedor no registrado como contribuyente ordinario, el motor IA fuerza la retención al 100% para blindar a la empresa contra multas solidarias.
                        </p>
                    </div>
                    <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/10 shadow-inner relative z-10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-primary mb-10 flex items-center gap-3 italic">
                            <Terminal className="h-4 w-4" /> Protocolo de Despacho SENIAT
                        </h4>
                        <ul className="text-xs font-bold italic text-white/70 space-y-6">
                            <li className="flex gap-6"><span className="text-primary font-black">[1]</span> Generación de archivo .txt para carga masiva.</li>
                            <li className="flex gap-6"><span className="text-primary font-black">[2]</span> Sincronización de notas de crédito/débito.</li>
                            <li className="flex gap-6"><span className="text-primary font-black">[3]</span> Sellado inmutable de comprobantes en PDF.</li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
}
