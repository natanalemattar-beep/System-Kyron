
"use client";
import { BackButton } from "@/components/back-button";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, CirclePlus as PlusCircle, CircleCheck as CheckCircle, FileText, Activity, Terminal, Ship, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";

export default function MinisterioComercioExteriorPage() {
    const { toast } = useToast();

    const letterTemplate = `
Caracas, [Fecha Actual]

Ciudadanos
Ministerio del Poder Popular de Comercio Exterior e Inversión Internacional
Dirección General de Exportaciones
Presente.-

Asunto: Solicitud de Certificación de Exportador

Por la presente, yo, [Nombre del Representante], actuando en nombre de System Kyron, C.A. (RIF J-50328471-6), me dirijo a ustedes para solicitar formalmente la inscripción/actualización en el Registro Único de Exportadores.

Nuestra organización busca expandir el alcance de la ingeniería venezolana hacia mercados internacionales, cumpliendo con los estándares de calidad y legalidad exigidos por la República.

Sin más a que hacer referencia.

Atentamente,

_________________________
Representante Legal
System Kyron, C.A.
    `;

    return (
        <div className="space-y-12 pb-20 px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                        <Globe className="h-3 w-3" /> NODO EXPORTADOR
                    </div>
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Comercio <span className="text-primary italic">Exterior</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Registro de Exportadores y Promoción de Inversiones • 2026</p>
                </div>
            </header>

            <Tabs defaultValue="dossier" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-white/5 rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
                    <TabsTrigger value="dossier" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Dossier</TabsTrigger>
                    <TabsTrigger value="comunicaciones" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Generar Carta</TabsTrigger>
                </TabsList>

                <TabsContent value="dossier" className="animate-in fade-in duration-500">
                    <div className="grid gap-8 md:grid-cols-3">
                        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Ship className="h-16 w-16" /></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Registro RUSAD</p>
                            <p className="text-3xl font-black italic text-foreground tracking-tight uppercase">ACTIVO</p>
                        </Card>
                        <Card className="glass-card border-none bg-card/40 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform"><Globe className="h-16 w-16" /></div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-4">Destinos Autorizados</p>
                            <p className="text-3xl font-black italic text-foreground tracking-tight">12 PAÍSES</p>
                        </Card>
                        <Card className="glass-card border-none bg-emerald-500/5 p-8 rounded-[2.5rem] shadow-xl border-l-4 border-emerald-500">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-4">Incentivos Fiscales</p>
                            <p className="text-3xl font-black italic text-emerald-500 tracking-tight uppercase">APLICADOS</p>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="comunicaciones" className="animate-in fade-in duration-500">
                    <Card className="glass-card border-none rounded-[3.5rem] bg-white p-12 md:p-20 shadow-2xl relative overflow-hidden font-serif text-slate-900">
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
                            <Logo className="h-full w-full rotate-12 scale-150 grayscale" />
                        </div>
                        <header className="flex justify-between items-start mb-16 border-b-2 border-slate-900 pb-8 relative z-10">
                            <Logo className="h-14 w-14" />
                            <div className="text-right">
                                <h4 className="text-lg font-black italic uppercase tracking-tight">System Kyron, C.A.</h4>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">RIF: J-50328471-6</p>
                            </div>
                        </header>
                        <div className="whitespace-pre-wrap text-sm md:text-base text-justify leading-relaxed relative z-10 min-h-[400px]">
                            {letterTemplate}
                        </div>
                        <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-end gap-4 no-print relative z-10">
                            <Button variant="outline" className="h-12 px-8 rounded-xl border-slate-200 text-slate-600 font-black uppercase text-[10px]" onClick={() => window.print()}>
                                <Printer className="mr-3 h-4 w-4" /> IMPRIMIR
                            </Button>
                            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[10px]" onClick={() => toast({ title: "ARCHIVO WORD GENERADO" })}>
                                <Download className="mr-3 h-4 w-4" /> EXPORTAR .DOC
                            </Button>
                        </footer>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
