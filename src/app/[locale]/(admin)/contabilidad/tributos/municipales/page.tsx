
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Landmark, MapPin, Download, CirclePlus as PlusCircle, Activity, Target, ShieldCheck, Scale, Terminal, Zap, Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export default function ImpuestosMunicipalesPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10 bg-[#f5f7fa] min-h-screen">
            <header className="border-l-4 border-[#0A2472] pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0A2472]/10 border border-[#0A2472]/20 text-[9px] font-black uppercase tracking-[0.4em] text-[#0A2472] shadow-sm mb-4">
                        <Landmark className="h-3 w-3" /> NODO MUNICIPAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none">Impuestos <span className="text-[#00A86B] italic">Municipales</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">LOCAPTEM (Agosto 2023) • Patentes y Tasas Locales</p>
                </div>
                <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                    <PlusCircle className="mr-3 h-4 w-4" /> PAGAR TASA
                </Button>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <Card className="glass-card border-none bg-white p-8 rounded-[2.5rem] shadow-xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Alícuota General</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tight">Hasta 3%</p>
                    <p className="text-[8px] font-bold uppercase text-[#00A86B] mt-4 italic">Sobre Ingresos Brutos</p>
                </Card>
                <Card className="glass-card border-none bg-white p-8 rounded-[2.5rem] shadow-xl border-l-4 border-[#0A2472] group overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Zap className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0A2472]/60 mb-4">Mínimo Tributario</p>
                    <p className="text-4xl font-black italic text-[#0A2472] tracking-tight shadow-sm">240 TC</p>
                    <p className="text-[8px] font-bold uppercase text-slate-400 mt-4 italic">Moneda Mayor Valor BCV</p>
                </Card>
                <Card className="glass-card border-none bg-white p-8 rounded-[2.5rem] shadow-xl relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><ShieldCheck className="h-16 w-16" /></div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Vigencia Licencia</p>
                    <p className="text-4xl font-black italic text-foreground tracking-tight">3 AÑOS</p>
                    <p className="text-[8px] font-bold uppercase text-emerald-500 mt-4 italic">Renovación Automática</p>
                </Card>
            </div>

            <Card className="glass-card border-none rounded-[3rem] bg-white overflow-hidden shadow-2xl mt-10">
                <CardHeader className="p-10 border-b border-slate-100 bg-slate-50/50">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-[#0A2472] italic">Alícuotas por Actividades Especiales</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50 border-none">
                                <TableHead className="pl-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Rubro Económico</TableHead>
                                <TableHead className="py-5 text-[9px] font-black uppercase tracking-widest opacity-30 text-center">Tipo Actividad</TableHead>
                                <TableHead className="text-right pr-10 py-5 text-[9px] font-black uppercase tracking-widest opacity-30">Alícuota Máxima</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[
                                { rubro: "Minería y Canteras", tipo: "Especial", ali: "6.50%" },
                                { rubro: "Hidrocarburos y Derivados", tipo: "Especial", ali: "6.50%" },
                                { rubro: "Publicidad y Propaganda", tipo: "Servicios", ali: "5.00%" },
                                { rubro: "Bebidas Alcohólicas y Tabaco", tipo: "Especial", ali: "6.00%" },
                                { rubro: "Telecomunicaciones e Informática", tipo: "Tecnología", ali: "3.50%" },
                            ].map((row, i) => (
                                <TableRow key={i} className="border-slate-100 hover:bg-slate-50 transition-all">
                                    <TableCell className="pl-10 py-6 font-black text-xs uppercase italic text-slate-700">{row.rubro}</TableCell>
                                    <TableCell className="py-6 text-center text-[10px] font-bold text-slate-400 uppercase">{row.tipo}</TableCell>
                                    <TableCell className="text-right pr-10 py-6 font-black text-sm text-[#00A86B] italic">{row.ali}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="p-10 bg-[#0A2472]/5 border-t border-slate-100 flex justify-between items-center">
                    <div className="flex items-center gap-3 text-[9px] font-black uppercase text-slate-400 italic">
                        <Terminal className="h-4 w-4 text-[#0A2472]" /> Sincronizado con LOCAPTEM 2023
                    </div>
                    <Button variant="outline" className="h-10 px-6 rounded-xl border-slate-200 bg-white text-[9px] font-black uppercase tracking-widest">Descargar Solvencia Municipal</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
