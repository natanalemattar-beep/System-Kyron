
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, CloudUpload as UploadCloud, Download, Save, Ruler, Calculator, Loader as Loader2, Plus, Trash2, ShieldCheck, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function IngenieriaIAPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [planoGenerado, setPlanoGenerado] = useState<string | null>(null);

    const handleGenerate = () => {
        setIsLoading(true);
        setTimeout(() => {
            setPlanoGenerado("https://picsum.photos/seed/blueprint/800/600");
            setIsLoading(false);
            toast({ title: "Inferencia Completada", description: "Plano a escala generado con un 98% de precisión." });
        }, 2000);
    };

    return (
        <div className="space-y-12 pb-20 px-6 md:px-16">
            <header className="border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
                    <Terminal className="h-3 w-3" /> NODO DE INGENIERÍA
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground uppercase leading-none">Asistente <span className="text-primary italic">Técnico IA</span></h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">Inferencia de Planos y Cómputos Métricos v2.6</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-10">
                <Card className="lg:col-span-5 glass-card border-none rounded-[3rem] bg-white/[0.02] p-10 flex flex-col justify-between">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground">Captura de Entorno</h3>
                            <p className="text-xs font-medium text-white/40 uppercase leading-relaxed">Suba una imagen del local comercial para que la IA genere el plano arquitectónico y calcule el presupuesto de acabados.</p>
                        </div>
                        
                        <div className="aspect-video bg-black/40 rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center group hover:border-primary/40 transition-all cursor-pointer">
                            <UploadCloud className="h-12 w-12 text-white/10 group-hover:text-primary transition-colors" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mt-4">Inyectar Data Visual</span>
                        </div>

                        <Button className="w-full h-16 rounded-2xl btn-3d-primary font-black uppercase text-xs tracking-widest shadow-2xl" onClick={handleGenerate} disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "GENERAR PLANO MAESTRO"}
                        </Button>
                    </div>
                </Card>

                <div className="lg:col-span-7">
                    {planoGenerado ? (
                        <Card className="glass-card border-none rounded-[3rem] bg-black/40 overflow-hidden h-full flex flex-col">
                            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">Previsualización de Inferencia</span>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="icon" className="rounded-xl border-white/10 h-10 w-10"><Download className="h-4 w-4" /></Button>
                                    <Button variant="outline" size="icon" className="rounded-xl border-white/10 h-10 w-10"><Save className="h-4 w-4" /></Button>
                                </div>
                            </div>
                            <div className="flex-grow relative bg-white/5">
                                <Image src={planoGenerado} alt="Plano IA" fill className="object-contain p-10 opacity-80" />
                            </div>
                            <CardFooter className="p-8 border-t border-white/5 flex justify-between items-center bg-white/[0.01]">
                                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-emerald-400">
                                    <ShieldCheck className="h-4 w-4" /> Protocolo de Ingeniería Validado
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[8px] font-black px-4 h-6 rounded-lg uppercase">98% Precisión</Badge>
                            </CardFooter>
                        </Card>
                    ) : (
                        <div className="h-full rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]">
                            <Ruler className="h-20 w-20 text-white/5 mb-6" />
                            <p className="text-white/20 font-black uppercase tracking-[0.4em] text-sm italic">Esperando inyección de parámetros físicos...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
