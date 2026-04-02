
"use client";
import { BackButton } from "@/components/back-button";

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, CirclePlus as PlusCircle, CircleCheck as CheckCircle, FileText, Activity, Terminal, ShieldCheck, Download, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Logo } from "@/components/logo";

export default function MinisterioIndustriasPage() {
    const { toast } = useToast();

    const letterTemplate = `
Caracas, [Fecha Actual]

Ciudadanos
Ministerio del Poder Popular de Industrias y Producción Nacional
Dirección de Registro y Control Industrial
Presente.-

Asunto: Solicitud de Registro / Renovación Industrial

Yo, [Nombre del Representante], en mi carácter de Representante Legal de la empresa System Kyron, C.A., portadora del RIF J-50328471-6, acudo ante su autoridad para formalizar el registro de nuestra unidad productiva de acuerdo a las normativas de desarrollo industrial vigentes.

Anexamos a la presente el dossier técnico descriptivo de nuestros procesos y capacidades instaladas.

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
                        <Building2 className="h-3 w-3" /> NODO INDUSTRIAL
                    </div>
                <BackButton href="/contabilidad/tributos" label="Tributos" />
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Ministerio de <span className="text-primary italic">Industrias</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Registro de Empresas y Permisos Industriales • 2026</p>
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
                                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Dossier de Inscripción y Renovación</CardTitle>
                                </CardHeader>
                                <CardContent className="p-10 space-y-8">
                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">Recaudos Obligatorios</h4>
                                            <ul className="space-y-3">
                                                {["Copia del Registro Mercantil", "RIF Industrial", "Memoria Descriptiva de Procesos", "Planos de Zonificación"].map((doc, i) => (
                                                    <li key={i} className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-foreground/60">
                                                        <CheckCircle className="h-4 w-4 text-primary" /> {doc}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="space-y-6">
                                            <div className="p-6 bg-white/[0.03] border border-border rounded-2xl">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[9px] font-black uppercase text-muted-foreground/40">Estatus Industrial</span>
                                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[8px] font-black uppercase h-6 px-3">VIGENTE</Badge>
                                                </div>
                                                <div className="mt-4 space-y-1">
                                                    <p className="text-[8px] font-black uppercase text-muted-foreground/40">Última Renovación</p>
                                                    <p className="text-xs font-bold text-foreground">15 de Mayo, 2025</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="w-full h-12 rounded-xl border-border bg-white/5 text-[9px] font-black uppercase tracking-widest">INICIAR TRÁMITE</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-5">
                            <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] shadow-2xl flex flex-col justify-center border-l-4 border-primary h-full">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                        <Activity className="h-8 w-8 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black uppercase italic text-foreground">Estatus Operativo</h3>
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-none mt-2 uppercase text-[8px] font-black px-3 h-6">Certificado</Badge>
                                    </div>
                                </div>
                                <p className="text-xs font-bold text-muted-foreground/40 uppercase leading-relaxed text-justify italic">
                                    "El sistema monitorea síncronamente los parámetros de producción para asegurar que el registro industrial se mantenga vigente ante inspecciones del ministerio."
                                </p>
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
                            <Button className="h-12 px-8 rounded-xl btn-3d-primary font-black uppercase text-[10px]" onClick={async () => { try { const res = await fetch('/api/solicitudes', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ categoria: 'tributos', subcategoria: 'descarga_word_ministerio', descripcion: 'Descarga documento Word ministerio de industrias' }) }); if (res.ok) toast({ title: "DESCARGA INICIADA", description: "Documento generado correctamente." }); else toast({ title: "Error", variant: "destructive" }); } catch { toast({ title: "Error de conexión", variant: "destructive" }); } }}>
                                <Download className="mr-3 h-4 w-4" /> GUARDAR WORD
                            </Button>
                        </footer>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
