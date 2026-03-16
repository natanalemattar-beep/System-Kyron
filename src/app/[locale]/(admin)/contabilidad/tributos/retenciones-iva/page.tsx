
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Percent, Download, ShieldCheck, Activity, Landmark, Users } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function RetencionesIvaPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Percent className="h-3 w-3" /> NODO IMPOSITIVO
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Retenciones <span className="text-primary italic">de IVA</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Providencia Administrativa SNAT/2015/0049</p>
            </header>

            <Tabs defaultValue="practicadas" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
                    <TabsTrigger value="agentes" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Agentes</TabsTrigger>
                    <TabsTrigger value="practicadas" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">Practicadas (75%)</TabsTrigger>
                </TabsList>

                <TabsContent value="agentes" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Directorio de Agentes de Retención</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Razón Social</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">RIF</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estatus</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Acción</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "Cervecería Polar, C.A.", rif: "J-00000123-4", status: "Especial" },
                                        { name: "Inversiones Epsilon", rif: "J-12345678-9", status: "Especial" },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="pl-10 py-6 font-black text-xs text-foreground/80 uppercase italic">{row.name}</TableCell>
                                            <TableCell className="py-6 font-mono text-primary font-bold text-xs">{row.rif}</TableCell>
                                            <TableCell className="text-center py-6">
                                                <Badge className="bg-primary/20 text-primary border-none text-[8px] font-black uppercase">{row.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-10 py-6">
                                                <Button variant="ghost" size="sm" className="h-9 px-4 text-[9px] font-black uppercase">Ver Detalles</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="practicadas" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10 flex flex-row justify-between items-center">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Relación de Retenciones - Marzo 2026</CardTitle>
                            <Button className="h-10 px-6 rounded-xl btn-3d-primary font-black uppercase text-[9px] tracking-widest shadow-xl">EXPORTAR TXT</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Factura</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base Imponible</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">IVA (16%)</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Retenido (75%)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { inv: "0000123", base: 5000, iva: 800, ret: 600 },
                                        { inv: "0000124", base: 1200, iva: 192, ret: 144 },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all">
                                            <TableCell className="pl-10 py-6 font-mono text-[10px] font-black text-primary italic">{row.inv}</TableCell>
                                            <TableCell className="py-6 font-mono text-xs font-bold text-foreground/70">{formatCurrency(row.base, 'Bs.')}</TableCell>
                                            <TableCell className="py-6 font-mono text-xs font-bold text-foreground/40">{formatCurrency(row.iva, 'Bs.')}</TableCell>
                                            <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-primary italic">{formatCurrency(row.ret, 'Bs.')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                <ShieldCheck className="h-4 w-4 text-primary" /> Validación Blockchain Activa
                            </div>
                            <p className="text-xs font-black text-primary">TOTAL RETENIDO: {formatCurrency(744, 'Bs.')}</p>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
