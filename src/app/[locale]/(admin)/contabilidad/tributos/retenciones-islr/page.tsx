
"use client";
import { BackButton } from "@/components/back-button";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Banknote, Download, Calculator, ShieldCheck, Activity, Terminal, Percent, Zap } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const islrConcepts = [
    { id: "sueldos", name: "Sueldos y Salarios", rate: "6% - 34% (Tabla)", base: "Sueldo Bruto", color: "text-blue-500" },
    { id: "honorarios", name: "Honorarios Prof.", rate: "3%", base: "Monto Facturado", color: "text-emerald-500" },
    { id: "arriendos", name: "Arrendamientos", rate: "3%", base: "Canon Mensual", color: "text-amber-500" },
    { id: "comisiones", name: "Comisiones", rate: "3%", base: "Comisión Bruta", color: "text-indigo-500" },
    { id: "intereses", name: "Intereses", rate: "5%", base: "Interés Pagado", color: "text-rose-500" },
    { id: "publicidad", name: "Publicidad", rate: "3%", base: "Monto Pauta", color: "text-orange-500" },
    { id: "acciones", name: "Enajenación Acc.", rate: "1%", base: "Precio Venta", color: "text-purple-500" },
    { id: "loteria", name: "Premios Lotería", rate: "15%", base: "Monto Premio", color: "text-pink-500" },
];

export default function RetencionesIslrPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Banknote className="h-3 w-3" /> CENTRO ISLR
                    </div>
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Retenciones <span className="text-primary italic">de ISLR</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Decreto N° 1.808 • Reglamento de Retenciones</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl" onClick={() => toast({ title: "REPORTE GENERADO" })}>
                    <Download className="mr-3 h-4 w-4" /> EXPORTAR XML
                </Button>
            </header>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {islrConcepts.map(c => (
                    <Card key={c.id} className="glass-card border-none bg-card/40 p-6 rounded-[2rem] shadow-xl flex flex-col justify-between group hover:border-primary/30 transition-all">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Badge variant="outline" className="text-[7px] font-black uppercase tracking-widest border-primary/20 text-primary">Concepto Validado</Badge>
                                <Zap className={cn("h-4 w-4 opacity-20", c.color)} />
                            </div>
                            <div>
                                <CardTitle className="text-sm font-black uppercase italic tracking-tight text-foreground mb-1">{c.name}</CardTitle>
                                <p className={cn("text-xl font-black italic tracking-tight", c.color)}>{c.rate}</p>
                            </div>
                            <div className="pt-2">
                                <p className="text-[8px] font-bold text-muted-foreground uppercase">Base: {c.base}</p>
                            </div>
                        </div>
                        <Button variant="ghost" className="w-full mt-6 h-9 rounded-lg text-[8px] font-black uppercase tracking-widest border border-border group-hover:bg-primary group-hover:text-white" onClick={() => toast({ title: "SIMULADOR ISLR", description: "Cálculo de retención basado en tarifas vigentes del SENIAT." })}>
                            VER EJEMPLO
                        </Button>
                    </Card>
                ))}
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl mt-10">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Auditoría de Comprobantes ARC</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Concepto</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Base Imponible</TableHead>
                                <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Tarifa</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Monto Retenido</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="border-border/50 hover:bg-muted/20 transition-all">
                                <TableCell className="pl-10 py-6 font-black text-xs uppercase italic">Honorarios Profesionales</TableCell>
                                <TableCell className="py-6 font-mono text-xs font-bold text-foreground/70">Bs. 50.000,00</TableCell>
                                <TableCell className="text-center py-6 font-black text-sm text-primary">3%</TableCell>
                                <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-rose-500 italic">({formatCurrency(1500, 'Bs.')})</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
