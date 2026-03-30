
"use client";
import { BackButton } from "@/components/back-button";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, CirclePlus as PlusCircle, CircleCheck as CheckCircle, FileText, Activity, Terminal, ShieldCheck, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";

export default function MinisterioTransportePage() {
    const { toast } = useToast();

    const letterTemplate = `
Caracas, [Fecha Actual]

Ciudadanos
Ministerio del Poder Popular para el Transporte
Instituto Nacional de Transporte Terrestre (INTT)
Presente.-

Asunto: Solicitud de Permisología de Carga

Yo, [Nombre del Representante], en mi carácter de Representante Legal de la empresa System Kyron, C.A., portadora del RIF J-50328471-6, me dirijo a ustedes para solicitar la emisión de los permisos de transporte de carga para nuestras unidades operativas.

Nuestra flota está destinada al traslado de equipos tecnológicos y suministros industriales, cumpliendo con todas las normas de seguridad vial y revisión técnica exigidas.

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
                        <Truck className="h-3 w-3" /> NODO LOGÍSTICO
                    </div>
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Ministerio de <span className="text-primary italic">Transporte</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Permisología de Flota y Concesiones Viales • 2026</p>
                </div>
            </header>

            <Tabs defaultValue="flota" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-white/5 rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
                    <TabsTrigger value="flota" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Mi Flota</TabsTrigger>
                    <TabsTrigger value="comunicaciones" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Generar Carta</TabsTrigger>
                </TabsList>

                <TabsContent value="flota" className="animate-in fade-in duration-500">
                    <div className="grid gap-8 md:grid-cols-2">
                        <Card className="glass-card border-none bg-card/40 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform"><Truck className="h-32 w-32" /></div>
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground mb-8">Gestión de Guías de Movilización</h3>
                            <p className="text-xs font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
                                Emisión automatizada de guías SICA/SADA y permisos de transporte terrestre para carga pesada y materiales estratégicos.
                            </p>
                            <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">Generar Guía</Button>
                        </Card>

                        <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-black uppercase italic tracking-tight text-foreground mb-6">Cumplimiento de Flota</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center border-b border-border/50 pb-3">
                                        <span className="text-[9px] font-bold text-slate-500 uppercase">Certificado de Revisión</span>
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase px-3 h-6 rounded-lg">VIGENTE</Badge>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-border/50 pb-3">
                                        <span className="text-[9px] font-bold text-slate-500 uppercase">Seguro de Carga</span>
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase px-3 h-6 rounded-lg">ACTIVO</Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-8 flex items-center gap-3 text-[9px] font-black uppercase text-primary/40 italic">
                                <ShieldCheck className="h-4 w-4" /> Auditoría de Unidades s/norma INTT
                            </div>
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
                            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[10px]" onClick={() => toast({ title: "DOCUMENTO WORD LISTO" })}>
                                <Download className="mr-3 h-4 w-4" /> EXPORTAR .DOC
                            </Button>
                        </footer>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
