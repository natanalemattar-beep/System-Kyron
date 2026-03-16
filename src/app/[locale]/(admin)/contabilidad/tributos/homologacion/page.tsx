
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Printer, PlusCircle, Activity, Terminal, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function HomologacionPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-emerald-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600 shadow-glow mb-4">
                        <ShieldCheck className="h-3 w-3" /> NODO DE HARDWARE FISCAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Homologación <span className="text-emerald-500 italic">SENIAT</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Providencia SNAT/2011/0071 • Control de Máquinas Fiscales</p>
                </div>
                <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR EQUIPO
                </Button>
            </header>

            <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600 italic">Inventario de Equipos Homologados</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Equipo / Modelo</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Serial Fiscal</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Último Mantenimiento</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "Bixolon SRP-812", serial: "Z3A123456", last: "15/01/2024", status: "Operativo" },
                                        { name: "ACLAS CR-BX", serial: "ACL-998877", last: "20/05/2023", status: "Mantenimiento Req." },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-emerald-500 transition-colors">{row.name}</p>
                                                <p className="text-[8px] font-bold text-muted-foreground uppercase">Impresora Fiscal</p>
                                            </TableCell>
                                            <TableCell className="py-6 font-mono text-xs font-bold text-foreground/40">{row.serial}</TableCell>
                                            <TableCell className="text-center py-6 text-[10px] font-bold text-muted-foreground uppercase">{row.last}</TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Badge variant={row.status === 'Operativo' ? 'default' : 'destructive'} className="text-[8px] font-black uppercase tracking-widest h-6 px-3">{row.status}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <Card className="glass-card border-none p-10 rounded-[3rem] bg-emerald-500/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000"><Printer className="h-32 w-32" /></div>
                        <h3 className="text-xl font-black uppercase italic tracking-tighter text-emerald-600 mb-6">Memoria Fiscal</h3>
                        <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
                            System Kyron se sincroniza con la memoria fiscal de sus equipos para garantizar que el Reporte Z diario coincida al 100% con los Libros de Venta digitales.
                        </p>
                        <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                            <Terminal className="h-4 w-4" /> Enlace Serial RS-232 / USB Activo
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
