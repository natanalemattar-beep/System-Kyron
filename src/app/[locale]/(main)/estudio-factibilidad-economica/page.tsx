
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3, Loader2, Sparkles, Download, TrendingUp, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

export default function GenericFactibilidadPage() {
    const [companyName, setCompanyName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [analysis, setAnalysis] = useState<any | null>(null);
    const { toast } = useToast();

    const handleGenerate = () => {
        if (!companyName.trim()) return;
        setIsGenerating(true);
        setTimeout(() => {
            setAnalysis({
                van: 125000 + Math.random() * 50000,
                tir: "22.4%",
                payback: "3.1 años",
                conclusion: `El proyecto para ${companyName} presenta una rentabilidad sólida con un riesgo controlado bajo las condiciones de mercado actuales.`
            });
            setIsGenerating(false);
            toast({ title: "Análisis Completado", description: "Cálculos de factibilidad listos." });
        }, 2000);
    };

    return (
        <div className="space-y-12 w-full px-4 md:px-10">
            <header className="border-l-4 border-primary pl-8 py-2">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white">Dictamen de <span className="text-primary">Factibilidad Económica</span></h1>
                <p className="text-muted-foreground font-medium text-xs uppercase tracking-widest opacity-60">Análisis financiero dinámico por IA</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-12">
                <Card className="lg:col-span-4 bg-white/[0.02] border-white/5 rounded-[2.5rem] p-10 h-fit shadow-2xl">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                            <Calculator className="text-primary" /> Parámetros
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-6">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Nombre de la Empresa</Label>
                            <Input 
                                placeholder="Ej: Tech Innovators Inc." 
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
                            EJECUTAR ANÁLISIS
                        </Button>
                    </CardContent>
                </Card>

                <div className="lg:col-span-8">
                    {analysis ? (
                        <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700">
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { label: "VAN", val: formatCurrency(analysis.van, 'USD') },
                                    { label: "TIR", val: analysis.tir },
                                    { label: "Payback", val: analysis.payback }
                                ].map((stat, i) => (
                                    <Card key={i} className="glass-card border-none p-8 rounded-[2rem] text-center">
                                        <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-2">{stat.label}</p>
                                        <p className="text-2xl font-black italic text-white leading-none">{stat.val}</p>
                                    </Card>
                                ))}
                            </div>
                            <Card className="glass-card border-none p-12 rounded-[3rem] bg-emerald-500/[0.03]">
                                <h3 className="text-xl font-black uppercase italic text-emerald-400 mb-4 flex items-center gap-3">
                                    <TrendingUp className="h-6 w-6"/> Conclusión Financiera
                                </h3>
                                <p className="text-lg font-medium italic text-white/80 leading-relaxed text-justify">{analysis.conclusion}</p>
                            </Card>
                            <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest">
                                <Download className="mr-2 h-4 w-4"/> Exportar Reporte de Factibilidad
                            </Button>
                        </div>
                    ) : (
                        <div className="h-[500px] rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]">
                            <BarChart3 className="h-20 w-20 text-white/10 mb-6" />
                            <p className="text-white/20 font-black uppercase tracking-[0.4em] text-sm italic">Esperando datos de simulación...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
