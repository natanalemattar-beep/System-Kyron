
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Landmark, MapPin, Download, PlusCircle, Activity, Target, ShieldCheck, Scale } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function ImpuestosMunicipalesPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-emerald-500 pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500 shadow-glow mb-4">
                        <Landmark className="h-3 w-3" /> NODO DE JURISDICCIÓN LOCAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Impuestos <span className="text-emerald-500 italic">Municipales</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Patente de Actividad Económica • Inmuebles • Vehículos</p>
                </div>
                <Button className="btn-3d-secondary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> PAGAR TASA
                </Button>
            </header>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Ingresos Brutos Declarados</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter">{formatCurrency(458000, 'Bs.')}</p>
                </Card>
                <Card className="glass-card border-none bg-emerald-500/5 rounded-[2.5rem] p-8 shadow-2xl border-l-4 border-emerald-500">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-4">Mínimo Tributario</p>
                    <p className="text-4xl font-black italic text-emerald-500 tracking-tighter">240 UT</p>
                </Card>
                <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-2xl">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Municipios Activos</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tighter">03 NODOS</p>
                </Card>
            </div>

            <Tabs defaultValue="actividad" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-border rounded-2xl p-1.5 mb-10 shadow-inner max-w-lg">
                    <TabsTrigger value="actividad" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">Act. Económica</TabsTrigger>
                    <TabsTrigger value="licencias" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">Licencias</TabsTrigger>
                    <TabsTrigger value="minimo" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-emerald-500 data-[state=active]:text-white transition-all">Mínimo UT</TabsTrigger>
                </TabsList>

                <TabsContent value="actividad" className="animate-in fade-in slide-in-from-bottom-2">
                    <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                        <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                            <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-emerald-500 italic">Alícuotas según Rubro Comercial</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 border-none">
                                        <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Rubro / Código</TableHead>
                                        <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Jurisdicción</TableHead>
                                        <TableHead className="text-center py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Alícuota (%)</TableHead>
                                        <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Estimado Mensual</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {[
                                        { rubro: "Servicios de Telecomunicaciones", code: "6110-01", municipio: "Vargas", ali: "2.5%", est: 4500 },
                                        { rubro: "Comercio de Equipos de Oficina", code: "4659-02", municipio: "Libertador", ali: "1.8%", est: 2100 },
                                        { rubro: "Consultoría de Software", code: "6201-01", municipio: "Chacao", ali: "1.2%", est: 3200 },
                                    ].map((row, i) => (
                                        <TableRow key={i} className="border-border/50 hover:bg-muted/20 transition-all group">
                                            <TableCell className="pl-10 py-6">
                                                <p className="font-black text-xs text-foreground/80 uppercase italic group-hover:text-emerald-500 transition-colors">{row.rubro}</p>
                                                <p className="text-[8px] font-mono text-emerald-600 font-bold">{row.code}</p>
                                            </TableCell>
                                            <TableCell className="py-6">
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase">
                                                    <MapPin className="h-3 w-3" /> {row.municipio}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center py-6 font-black text-sm text-emerald-500 italic">{row.ali}</TableCell>
                                            <TableCell className="text-right pr-10 py-6 font-mono text-sm font-black text-foreground/70">{formatCurrency(row.est, 'Bs.')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter className="p-10 border-t border-border bg-emerald-500/5 flex justify-between items-center">
                            <div className="flex items-center gap-3 text-[9px] font-black uppercase text-muted-foreground/40 italic">
                                <ShieldCheck className="h-4 w-4 text-emerald-500" /> Solvencia Municipal Vigente
                            </div>
                            <Button variant="outline" className="h-10 px-6 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest text-emerald-600">Simular Declaración</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
