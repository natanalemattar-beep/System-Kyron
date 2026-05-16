"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, Presentation, Sparkles, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TemplateStyle = "startup" | "corporate" | "investor" | "tech" | "minimal";
type PitchLength = "short" | "medium" | "long";

const TEMPLATES: { id: TemplateStyle; name: string; desc: string; color: string }[] = [
    { id: "startup", name: "Startup", desc: "Moderno y dinámico", color: "bg-blue-500" },
    { id: "corporate", name: "Corporate", desc: "Profesional y establecido", color: "bg-emerald-500" },
    { id: "investor", name: "Investor", desc: "Para rondas de inversión", color: "bg-amber-500" },
    { id: "tech", name: "Tech", desc: "High-tech e innovador", color: "bg-purple-500" },
    { id: "minimal", name: "Minimal", desc: "Limpio y minimalista", color: "bg-zinc-500" },
];

const LENGTHS: { id: PitchLength; name: string; slides: string; desc: string }[] = [
    { id: "short", name: "Corto", slides: "7 slides", desc: "Para pitches rápidos" },
    { id: "medium", name: "Medio", slides: "12 slides", desc: "Presentación estándar" },
    { id: "long", name: "Largo", slides: "19 slides", desc: "Pitch completo" },
];

export function PitchDeckGenerator() {
    const [template, setTemplate] = useState<TemplateStyle>("startup");
    const [length, setLength] = useState<PitchLength>("medium");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGenerated(false);
        
        try {
            const response = await fetch("/api/generate-pitch", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    template,
                    length,
                    data: {
                        title: "System Kyron",
                        subtitle: "Ecosistema de Inteligencia Corporativa",
                        presenter: "Carlos Mattar",
                        contact: "carlos@systemkyron.com"
                    }
                }),
            });

            if (!response.ok) throw new Error("Error generating PPTX");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `System_Kyron_Pitch_${template}_${length}.pptx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            
            setGenerated(true);
        } catch (error) {
            console.error("Error:", error);
            alert("Error al generar el PPTX");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-slate-900/50 border border-white/10 rounded-3xl p-8 space-y-8 backdrop-blur-xl">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                        <Presentation className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tight text-white">Generador de Pitch Deck</h3>
                        <p className="text-sm text-white/40 font-medium">Crea tu presentación en un click</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-white/50">Plantilla</label>
                    <div className="grid grid-cols-1 gap-2">
                        {TEMPLATES.map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setTemplate(t.id)}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                                    template === t.id
                                        ? "border-cyan-500/50 bg-cyan-500/10"
                                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                                )}
                            >
                                <div className={cn("w-3 h-3 rounded-full", t.color)} />
                                <div>
                                    <p className="text-sm font-bold text-white">{t.name}</p>
                                    <p className="text-xs text-white/40">{t.desc}</p>
                                </div>
                                {template === t.id && <Check className="h-4 w-4 text-cyan-400 ml-auto" />}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-black uppercase tracking-widest text-white/50">Duración</label>
                    <div className="grid grid-cols-1 gap-2">
                        {LENGTHS.map((l) => (
                            <button
                                key={l.id}
                                onClick={() => setLength(l.id)}
                                className={cn(
                                    "flex items-center gap-4 p-4 rounded-2xl border transition-all text-left",
                                    length === l.id
                                        ? "border-cyan-500/50 bg-cyan-500/10"
                                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                                )}
                            >
                                <div className="text-2xl font-black text-white/20 italic">{l.slides}</div>
                                <div>
                                    <p className="text-sm font-bold text-white">{l.name}</p>
                                    <p className="text-xs text-white/40">{l.desc}</p>
                                </div>
                                {length === l.id && <Check className="h-4 w-4 text-cyan-400 ml-auto" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-white/5">
                <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className={cn(
                        "w-full h-14 rounded-2xl font-black uppercase tracking-widest transition-all",
                        generated
                            ? "bg-emerald-600 hover:bg-emerald-500"
                            : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
                    )}
                >
                    {isGenerating ? (
                        <span className="flex items-center gap-3">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Generando PPTX...
                        </span>
                    ) : generated ? (
                        <span className="flex items-center gap-3">
                            <Check className="h-5 w-5" />
                            ¡Descargado!
                        </span>
                    ) : (
                        <span className="flex items-center gap-3">
                            <Download className="h-5 w-5" />
                            Generar y Descargar
                        </span>
                    )}
                </Button>
            </div>
        </div>
    );
}