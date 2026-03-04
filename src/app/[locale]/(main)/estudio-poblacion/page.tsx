"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Loader2, Sparkles, Download, ArrowRight, Globe, Zap, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GenericZEDUPage() {
    const [companyName, setCompanyName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [zeduModel, setZeduModel] = useState<any | null>(null);
    const { toast } = useToast();

    const handleGenerate = () => {
        if (!companyName.trim()) return;
        setIsGenerating(true);
        setTimeout(() => {
            setZeduModel({
                problem: `La empresa ${companyName} opera en un mercado fragmentado donde la falta de integración tecnológica eleva los costos operativos en un 25%.`,
                solution: `Implementación de un ecosistema digital unificado que centraliza la gestión y reduce el riesgo operativo mediante IA.`,
                impact: "Optimización del 100% de los procesos críticos."
            });
            setIsGenerating(false);
            toast({ title: "Modelo ZEDU Generado", description: `Plan técnico listo para ${companyName}.` });
        }, 2000);
    };

    return (
        <div className="space-y-12 w-full px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">Generador de Modelo <span className="text-primary">ZEDU</span></h1>
                <p className="text-muted-foreground font-medium text-xs uppercase tracking-widest opacity-60">Inteligencia Artificial aplicada al planeamiento estratégico</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-12">
                <Card className="lg:col-span-4 bg-white/[0.02] border-white/5 rounded-[2.5rem] p-10 shadow-2xl h-fit">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                            <BrainCircuit className="text-primary" /> Configurar Empresa
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Nombre de la Organización</Label>
                            <Input 
                                placeholder="Ej: Corporación Global S.A." 
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="h-14 rounded-2xl bg-white/5 border-none text-lg font-bold"
                            />
                        </div>
                        <Button 
                            className="w-full h-16 rounded-2xl btn-3d-primary font-black text-sm" 
                            disabled={isGenerating || !companyName}
                            onClick={handleGenerate}
                        >
                            {isGenerating ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2 h-5 w-5"/>}
                            GENERAR MODELO IA
                        </Button>
                    </CardContent>
                </Card>

                <div className="lg:col-span-8">
                    {zeduModel ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <Card className="glass-card border-none p-12 rounded-[3rem]">
                                <h3 className="text-2xl font-black italic uppercase text-primary mb-6">Diagnóstico del Problema</h3>
                                <p className="text-xl font-medium italic text-white/80 leading-relaxed text-justify">{zeduModel.problem}</p>
                            </Card>
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card className="glass-card border-none p-10 rounded-[2.5rem]">
                                    <Zap className="h-8 w-8 text-primary mb-6" />
                                    <h4 className="font-black uppercase text-xs mb-2">Solución Propuesta</h4>
                                    <p className="text-sm font-medium text-white/50">{zeduModel.solution}</p>
                                </Card>
                                <Card className="glass-card border-none p-10 rounded-[2.5rem]">
                                    <Globe className="h-8 w-8 text-primary mb-6" />
                                    <h4 className="font-black uppercase text-xs mb-2">Impacto Estimado</h4>
                                    <p className="text-sm font-medium text-white/50">{zeduModel.impact}</p>
                                </Card>
                            </div>
                            <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest">
                                <Download className="mr-2 h-4 w-4"/> Descargar Informe Técnico
                            </Button>
                        </div>
                    ) : (
                        <div className="h-[500px] rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]">
                            <Cpu className="h-20 w-20 text-white/10 mb-6" />
                            <p className="text-white/20 font-black uppercase tracking-[0.4em] text-sm italic">Esperando parámetros de empresa...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}