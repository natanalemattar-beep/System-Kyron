
"use client";
import { BackButton } from "@/components/back-button";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Printer, CirclePlus as PlusCircle, Activity, Terminal, ShieldAlert, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const equipos = [
    { type: "Impresora Fiscal", model: "HP / 2000", serial: "FIS-12345", date: "15/01/2025", status: "Vigente" },
    { type: "Caja Registradora", model: "Sam4s / 500", serial: "CAJ-67890", date: "10/02/2025", status: "Vigente" },
    { type: "Sistema TPV", model: "Kyron POS", serial: "LIC-001", date: "01/03/2026", status: "Por Vencer" },
];

export default function HomologacionPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Printer className="h-3 w-3" /> NODO DE HARDWARE FISCAL
                    </div>
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Homologación <span className="text-primary italic">SENIAT</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Providencia SNAT/2011/0071 • Control de Máquinas Fiscales</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> REGISTRAR EQUIPO
                </Button>
            </header>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registro de Dispositivos de Facturación</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Equipo / Modelo</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Serial Fiscal</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Fecha Homologación</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {equipos.map((e, i) => (
                                <TableRow key={i} className={cn(
                                    "border-border/50 hover:bg-muted/20 transition-all group",
                                    e.status === "Por Vencer" && "bg-amber-500/5"
                                )}>
                                    <TableCell className="pl-10 py-6">
                                        <div className="flex items-center gap-4">
                                            {e.status === "Por Vencer" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                                            <div>
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{e.type}</p>
                                                <p className="text-[8px] font-bold text-muted-foreground uppercase">{e.model}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-6 text-center font-mono text-xs font-bold text-foreground/40">{e.serial}</TableCell>
                                    <TableCell className="py-6 text-center text-[10px] font-bold text-muted-foreground uppercase">{e.date}</TableCell>
                                    <TableCell className="text-right pr-10 py-6">
                                        <Badge variant={e.status === 'Vigente' ? 'default' : 'secondary'} className={cn(
                                            "text-[8px] font-black uppercase tracking-widest h-6 px-3 rounded-lg",
                                            e.status === "Por Vencer" && "bg-amber-500/20 text-amber-600 border-none"
                                        )}>{e.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-8 border-t border-border bg-primary/5 flex justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground/40 italic flex items-center gap-3">
                        <Terminal className="h-4 w-4" /> Sincronización con Memoria Fiscal: 100%
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
