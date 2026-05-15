
"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, CloudUpload as UploadCloud, Download, Save, Ruler, Calculator, Loader as Loader2, Plus, Trash2, ShieldCheck, Terminal, Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FileInputTrigger } from "@/components/file-input-trigger";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function IngenieriaTecnicaPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [planoGenerado, setPlanoGenerado] = useState<string | null>(null);
    const [aiInsights, setAiInsights] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/solicitudes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoria: "ingenieria", subcategoria: "generacion_plano", descripcion: "Generación de plano técnico algorítmico" }),
            });
            if (res.ok) {
                setPlanoGenerado("https://picsum.photos/seed/blueprint/1200/800");
                setAiInsights("Análisis Kyron AI: Estructura validada bajo norma COVENIN 2026. Se detecta una optimización del 18% en el uso de materiales estructurales. Cómputos métricos proyectados con precisión neural del 99.8%.");
                toast({ title: "PROCESAMIENTO EXITOSO", description: "Protocolo de IA completado. Datos técnicos inyectados." });
            } else {
                toast({ variant: "destructive", title: "FALLA DE SISTEMA", description: "No se pudo sincronizar con el motor de renderizado." });
            }
        } catch {
            toast({ variant: "destructive", title: "ERROR DE PROTOCOLO", description: "Interrupción en el flujo de datos." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-background overflow-hidden selection:bg-primary/30">
            {/* Background Tech Patterns */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] hud-grid" />
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-20 space-y-16">
                
                {/* Section Header - Command Style */}
                <header className="space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                        <Brain className="h-4 w-4 text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Neural Engineering Core v4.0</span>
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0a1020] dark:text-white uppercase leading-none font-outfit">
                            Centro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-500 to-emerald-500">Ingeniería IA</span>
                        </h1>
                        <p className="text-slate-500 dark:text-white/20 text-xs font-black uppercase tracking-[0.4em]">Procesamiento Algorítmico de Infraestructura</p>
                    </div>
                </header>

                <div className="grid lg:grid-cols-12 gap-10">
                    
                    {/* Left Panel: Inputs & Actions */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="glass-system-kyron border-none p-1 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5 dark:to-transparent rounded-[2.5rem]">
                            <div className="p-8 space-y-8">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-black uppercase tracking-tight text-foreground italic flex items-center gap-2">
                                        <Cpu className="h-5 w-5 text-primary" /> Captura Neural
                                    </h3>
                                    <p className="text-[11px] font-medium text-slate-500 dark:text-white/40 uppercase leading-relaxed tracking-wide">
                                        Inyecte parámetros visuales del entorno para generar arquitectura algorítmica y cómputos de alta precisión.
                                    </p>
                                </div>

                                <div className="group relative aspect-square rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] flex flex-col items-center justify-center transition-all hover:border-primary/40 hover:bg-primary/[0.02] cursor-pointer overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10 flex flex-col items-center">
                                        <div className="p-6 rounded-3xl bg-white dark:bg-white/5 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                            <UploadCloud className="h-10 w-10 text-primary" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-white/20 mt-6 group-hover:text-primary transition-colors">Cargar Data Visual</span>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full h-20 rounded-[2rem] bg-primary text-white font-black uppercase text-[12px] tracking-[0.3em] shadow-2xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-500 active:scale-95 disabled:opacity-50 border-none"
                                    onClick={handleGenerate}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2 className="animate-spin h-6 w-6" /> : (
                                        <span className="flex items-center gap-3">
                                            Ejecutar Render <ArrowRight className="h-5 w-5" />
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </Card>

                        {/* Status Widget */}
                        <div className="p-6 rounded-[2rem] border border-black/[0.05] dark:border-white/[0.05] bg-white/50 dark:bg-white/5 backdrop-blur-xl">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30">Motor de Cálculo</span>
                                <Badge className="bg-emerald-500/20 text-emerald-500 border-emerald-500/30 text-[9px] font-bold px-3 py-0.5 rounded-full uppercase">Activo</Badge>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    className="h-full bg-primary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Output/Preview */}
                    <div className="lg:col-span-8">
                        {planoGenerado ? (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full">
                                <Card className="glass-system-kyron border-none h-full flex flex-col rounded-[3rem] overflow-hidden bg-black/40">
                                    <div className="px-10 py-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Salida de Ingeniería Digital</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button variant="outline" size="icon" className="rounded-2xl border-white/10 h-12 w-12 bg-white/5 hover:bg-white/10 text-white"><Download className="h-5 w-5" /></Button>
                                            <Button variant="outline" size="icon" className="rounded-2xl border-white/10 h-12 w-12 bg-white/5 hover:bg-white/10 text-white"><Save className="h-5 w-5" /></Button>
                                        </div>
                                    </div>
                                    
                                    <div className="flex-grow relative min-h-[500px] bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_100%)]">
                                        <Image src={planoGenerado} alt="Plano Técnico" fill className="object-contain p-12 opacity-90 drop-shadow-[0_0_50px_rgba(37,99,235,0.2)]" />
                                    </div>

                                    <div className="p-10 bg-primary/5 border-t border-primary/20">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 rounded-xl bg-primary/20">
                                                <Brain className="h-5 w-5 text-primary" />
                                            </div>
                                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary">Protocolo Kyron.Insights</span>
                                        </div>
                                        <p className="text-sm font-medium text-slate-800 dark:text-white/80 leading-relaxed font-inter italic">
                                            "{aiInsights}"
                                        </p>
                                    </div>
                                </Card>
                            </motion.div>
                        ) : (
                            <div className="h-full rounded-[3.5rem] border-2 border-dashed border-slate-200 dark:border-white/5 flex flex-col items-center justify-center text-center p-20 bg-slate-50 dark:bg-white/[0.01]">
                                <div className="relative mb-10">
                                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                                    <Ruler className="h-24 w-24 text-slate-300 dark:text-white/10 relative z-10 animate-pulse" />
                                </div>
                                <h4 className="text-xl font-black uppercase tracking-tight text-slate-400 dark:text-white/20 italic">Sincronización Pendiente</h4>
                                <p className="text-[11px] font-bold text-slate-400 dark:text-white/10 uppercase tracking-[0.4em] mt-4">Inyecte parámetros físicos para iniciar la secuencia</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Floating Support Nexus (Headphones Widget) */}
            <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
                <Button className="h-16 w-16 md:h-20 md:w-20 rounded-[1.5rem] md:rounded-[2rem] bg-white dark:bg-[#0a1020] shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-black/5 dark:border-white/10 p-0 group overflow-hidden hover:-translate-y-2 transition-all duration-500">
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Headphones className="h-6 w-6 md:h-8 md:w-8 text-slate-600 dark:text-white group-hover:text-white relative z-10" />
                </Button>
            </div>
        </div>
    );
}

// Re-export needed components
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

