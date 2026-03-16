
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Banknote, Download, Calculator, ShieldCheck, Activity, Terminal, Percent } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function RetencionesIslrPage() {
    const { toast } = useToast();

    const islrCategories = [
        { id: "sueldos", label: "Sueldos", icon: Banknote },
        { id: "honorarios", label: "Honorarios", icon: Calculator },
        { id: "arrendamientos", label: "Arriendos", icon: Percent },
        { id: "comisiones", label: "Comisiones", icon: Banknote },
        { id: "intereses", label: "Intereses", icon: Activity },
        { id: "publicidad", label: "Publicidad", icon: Terminal },
        { id: "acciones", label: "Acciones", icon: ShieldCheck },
    ];

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Banknote className="h-3 w-3" /> CONTROL DE IMPUESTO SOBRE LA RENTA
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Retenciones <span className="text-primary italic">de ISLR</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Decreto N° 1.808 • Reglamento de Retenciones</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <Download className="mr-3 h-4 w-4" /> EXPORTAR XML (SENIAT)
                </Button>
            </header>

            <Tabs defaultValue="honorarios" className="w-full">
                <TabsList className="flex flex-wrap h-auto bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner overflow-x-auto gap-1">
                    {islrCategories.map(cat => (
                        <TabsTrigger key={cat.id} value={cat.id} className="flex-1 min-w-[120px] rounded-xl font-black uppercase text-[8px] tracking-[0.1em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all py-3">
                            {cat.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="honorarios" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Honorarios Profesionales (Servicios No Mercantiles)</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Beneficiario</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base de Cálculo</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Tarifa (%)</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Retenido</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { name: "Abog. Maria Hernandez", base: 15000, pct: "3%", ret: 450 },
                                        { name: "Ing. Juan Castillo", base: 8500, pct: "3%", ret: 255 },
                                        { name: "Dr. Roberto Silva", base: 22000, pct: "3%", ret: 660 },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-primary transition-colors">{row.name}</p>
                                                <p className="text-[8px] font-bold text-muted-foreground uppercase">Residente PN</p>
                                            </TableCell>
                                            <TableCell className="py-6 font-mono text-xs font-bold text-foreground/70">{formatCurrency(row.base, 'Bs.')}</TableCell>
                                            <TableCell className="text-center py-6 font-black text-sm text-primary italic">{row.pct}</TableCell>
                                            <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-rose-500 italic">({formatCurrency(row.ret, 'Bs.')})</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="p-10 border-t border-border bg-primary/5 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                <Terminal className="h-4 w-4" /> Cálculo según Art. 9, Num. 1 - Decreto 1.808
                            </div>
                            <Button variant="outline" className="h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Generar Comprobantes ARC</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
