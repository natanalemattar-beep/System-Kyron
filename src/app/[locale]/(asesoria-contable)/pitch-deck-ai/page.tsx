'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Upload, FileText, CheckCircle2, AlertCircle, 
    Loader2, Send, Sparkles, Wand2, ArrowRight,
    Presentation, Download, ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function PitchDeckAIPage() {
    const { toast } = useToast();
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<any>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const runAnalysis = async () => {
        if (!file) return;
        setIsAnalyzing(true);
        
        // Simulación de análisis profundo de Pitch Deck
        setTimeout(() => {
            setAnalysisResult({
                score: 85,
                missing: [
                    "Detalle de escalabilidad regional (más allá de Venezuela)",
                    "Proyección financiera a 24 meses",
                    "Matriz de competidores directos e indirectos"
                ],
                kimiPrompt: `Actúa como Kimi Slides. Optimiza mi presentación de System Kyron agregando una diapositiva de Proyecciones Financieras que muestre un crecimiento del 200% anual y una diapositiva de Expansión LATAM empezando por Colombia y Panamá. Asegúrate de mantener el diseño futurista y los colores azul (#3b82f6) y esmeralda (#10b981).`,
                feedback: "Tu presentación es sólida pero le falta profundidad en la parte financiera para convencer a inversores de Serie A."
            });
            setIsAnalyzing(false);
            toast({ title: "Análisis Completado", description: "System Kyron AI ha identificado áreas de mejora." });
        }, 3000);
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl">
            <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Wand2 className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="px-3 py-1 border-primary/30 text-primary uppercase tracking-tighter font-black">
                        Módulo AI Experimental
                    </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tighter mb-4">
                    Auditoría de <span className="text-primary italic">Pitch Deck</span>
                </h1>
                <p className="text-muted-foreground text-lg font-medium max-w-2xl">
                    Sube tu presentación (PDF/PPTX) y nuestra IA pericial analizará qué le falta para ser perfecta según los criterios del Reto Inspira 2026.
                </p>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Upload Section */}
                <Card className="md:col-span-1 p-8 rounded-[2rem] border-dashed border-2 border-primary/20 bg-primary/5 flex flex-col items-center justify-center text-center">
                    <input 
                        type="file" 
                        id="pitch-upload" 
                        className="hidden" 
                        onChange={handleFileChange}
                        accept=".pdf,.pptx"
                    />
                    <label htmlFor="pitch-upload" className="cursor-pointer group flex flex-col items-center">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-2xl shadow-primary/20">
                            <Upload className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="font-black text-foreground uppercase tracking-widest text-sm mb-2">
                            {file ? file.name : "Subir Archivo"}
                        </h3>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                            PDF o PPTX (Max 20MB)
                        </p>
                    </label>

                    {file && (
                        <Button 
                            onClick={runAnalysis} 
                            disabled={isAnalyzing}
                            className="mt-8 w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest py-6"
                        >
                            {isAnalyzing ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Sparkles className="h-5 w-5 mr-2" />}
                            {isAnalyzing ? "Analizando..." : "Auditar con AI"}
                        </Button>
                    )}
                </Card>

                {/* Results Section */}
                <Card className="md:col-span-2 p-8 rounded-[2rem] border-white/10 bg-card shadow-2xl overflow-hidden relative">
                    <AnimatePresence mode="wait">
                        {!analysisResult ? (
                            <motion.div 
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <Presentation className="h-16 w-16 text-muted-foreground/20 mb-6" />
                                <h3 className="text-xl font-bold text-muted-foreground/40 uppercase tracking-widest">
                                    Esperando Documento...
                                </h3>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="result"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Resultado de Auditoría</p>
                                        <h2 className="text-3xl font-black text-foreground uppercase tracking-tighter">Reporte Pericial</h2>
                                    </div>
                                    <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                                        <span className="text-2xl font-black text-primary">{analysisResult.score}</span>
                                        <span className="text-[8px] font-bold text-primary/60 uppercase">Puntaje</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                        <AlertCircle className="h-3 w-3 text-amber-500" /> ¿Qué le falta a tu Pitch?
                                    </h4>
                                    <div className="grid gap-3">
                                        {analysisResult.missing.map((item: string, i: number) => (
                                            <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-sm font-medium text-foreground/80 italic">
                                                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-border/50">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                        <Sparkles className="h-3 w-3" /> Prompt Optimizado para Kimi Slides
                                    </h4>
                                    <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative group">
                                        <p className="text-sm font-medium text-foreground/90 leading-relaxed italic">
                                            "{analysisResult.kimiPrompt}"
                                        </p>
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => {
                                                navigator.clipboard.writeText(analysisResult.kimiPrompt);
                                                toast({ title: "Copiado", description: "Prompt listo para Kimi." });
                                            }}
                                        >
                                            Copiar
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-6 pt-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-3 w-3" /> Verificado por Kyron Core
                                    </div>
                                    <div className="flex items-center gap-2 text-primary/50">
                                        <ArrowRight className="h-3 w-3" /> Listo para Reto Inspira 2026
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </div>
    );
}
