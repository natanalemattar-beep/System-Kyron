"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Loader2, Sparkles, Download, ArrowRight, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function GenericPropuestaPage() {
    const [companyName, setCompanyName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [proposal, setPropuesta] = useState<string | null>(null);
    const { toast } = useToast();

    const handleGenerate = () => {
        if (!companyName.trim()) return;
        setIsGenerating(true);
        setTimeout(() => {
            setPropuesta(`Propuesta Maestra para ${companyName}. Este documento detalla la integración de servicios de gestión y cumplimiento adaptados a las necesidades operativas de su organización...`);
            setIsGenerating(false);
            toast({ title: "Propuesta Generada", description: "Documento comercial listo para revisión." });
        }, 2000);
    };

    return (
        <div className="space-y-12 w-full px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">Generador de <span className="text-primary">Propuestas Maestras</span></h1>
                <p className="text-muted-foreground font-medium text-xs uppercase tracking-widest opacity-60">Diseño comercial persuasivo impulsado por IA</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-12">
                <Card className="lg:col-span-4 bg-white/[0.02] border-white/5 rounded-[2.5rem] p-10 h-fit shadow-2xl">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                            <Send className="text-primary" /> Configurar Destinatario
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Nombre de la Empresa Cliente</Label>
                            <Input 
                                placeholder="Ej: Global Enterprises S.A." 
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
                            REDACTAR PROPUESTA
                        </Button>
                    </CardContent>
                </Card>

                <div className="lg:col-span-8">
                    {proposal ? (
                        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
                            <Card className="glass-card border-none p-16 rounded-[4rem] text-justify">
                                <h3 className="text-3xl font-black italic uppercase text-primary mb-10 text-center underline decoration-primary/20 underline-offset-8">Propuesta de Alianza Estratégica</h3>
                                <div className="space-y-8 text-lg font-medium text-white/80 leading-relaxed italic">
                                    <p>Estimados directivos de <b>{companyName}</b>,</p>
                                    <p>{proposal}</p>
                                    <p>Nuestra visión es transformar su operatividad actual mediante la inyección de tecnología de vanguardia, eliminando el riesgo y maximizando la utilidad neta.</p>
                                </div>
                                <div className="pt-20 text-center">
                                    <div className="w-48 h-px bg-white/20 mx-auto mb-4"></div>
                                    <p className="font-black text-xs uppercase tracking-[0.4em]">Departamento de Estrategia</p>
                                </div>
                            </Card>
                            <div className="flex gap-4">
                                <Button className="flex-1 h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest">
                                    <Download className="mr-2 h-4 w-4"/> Descargar .DOC
                                </Button>
                                <Button variant="outline" className="flex-1 h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest">
                                    <Send className="mr-2 h-4 w-4"/> Enviar por Correo
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-[500px] rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]">
                            <FileText className="h-20 w-20 text-white/10 mb-6" />
                            <p className="text-white/20 font-black uppercase tracking-[0.4em] text-sm italic">Esperando redacción de IA...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}