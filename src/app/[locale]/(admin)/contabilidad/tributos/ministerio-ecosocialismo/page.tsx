
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, CirclePlus as PlusCircle, CircleCheck as CheckCircle, FileText, Activity, Terminal, Recycle, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";

export default function MinisterioEcosocialismoPage() {
    const { toast } = useToast();

    const letterTemplate = `
Caracas, [Fecha Actual]

Ciudadanos
Ministerio del Poder Popular para el Ecosocialismo (MINEC)
Dirección de Gestión de Residuos
Presente.-

Asunto: Presentación de Manifiesto de Desechos / Inscripción RACDA

Yo, [Nombre del Representante], actuando en mi carácter de Representante Legal de la empresa System Kyron, C.A., portadora del RIF J-50328471-6, acudo ante su autoridad para formalizar la presentación de nuestra declaración de gestión ambiental.

Nuestra empresa implementa tecnologías de reciclaje magnético y sistemas de control de residuos, alineados con el Plan de la Patria y las leyes ambientales de la República.

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
                        <Leaf className="h-3 w-3" /> NODO AMBIENTAL
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Ministerio de <span className="text-primary italic">Ecosocialismo</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Permisología Ambiental y Gestión de Residuos • 2026</p>
                </div>
            </header>

            <Tabs defaultValue="dossier" className="w-full">
                <TabsList className="flex h-14 bg-card/50 border border-white/5 rounded-2xl p-1.5 mb-10 shadow-inner max-w-md">
                    <TabsTrigger value="dossier" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Dossier</TabsTrigger>
                    <TabsTrigger value="comunicaciones" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.2em] data-[state=active]:bg-primary data-[state=active]:text-white">Generar Carta</TabsTrigger>
                </TabsList>

                <TabsContent value="dossier" className="animate-in fade-in duration-500">
                    <div className="grid gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Registro de Actividades (RACDA)</CardTitle>
                                </CardHeader>
                                <CardContent className="p-10 space-y-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="p-6 bg-white/[0.03] border border-border rounded-[2rem] shadow-inner text-center">
                                            <p className="text-[9px] font-black uppercase text-primary/60 mb-2">Estatus RACDA</p>
                                            <p className="text-2xl font-black italic text-foreground tracking-tight">VIGENTE</p>
                                        </div>
                                        <div className="p-6 bg-white/[0.03] border border-border rounded-[2rem] shadow-inner text-center">
                                            <p className="text-[9px] font-black uppercase text-primary/60 mb-2">Huella de Carbono</p>
                                            <p className="text-2xl font-black italic text-foreground tracking-tight">BAJA</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="lg:col-span-5">
                            <Card className="bg-secondary text-secondary-foreground rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden shadow-glow-secondary border-none group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Recycle className="h-32 w-32" /></div>
                                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6">Economía Circular</h3>
                                <p className="text-xs font-bold opacity-80 leading-relaxed uppercase mb-8 text-justify">
                                    System Kyron integra la telemetría de sus Smart Bins directamente con el Manifiesto de Desechos del MINEC.
                                </p>
                                <Button variant="secondary" className="w-full h-12 bg-white text-secondary font-black uppercase text-[10px] tracking-widest rounded-xl shadow-2xl">VER TABLERO VERDE</Button>
                            </Card>
                        </div>
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
                            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[10px]" onClick={() => toast({ title: "WORD EXPORTADO" })}>
                                <Download className="mr-3 h-4 w-4" /> DESCARGAR .DOC
                            </Button>
                        </footer>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
