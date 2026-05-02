
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Search, MapPin, TrendingUp, ChartBar as ChartColumn, Loader as Loader2, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EstudioPoblacionPage() {
    const [location, setLocalidad] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [data, setData] = useState<any | null>(null);
    const { toast } = useToast();

    const handleAnalyze = async () => {
        if (!location.trim()) return;
        setIsAnalyzing(true);
        try {
            const res = await fetch("/api/solicitudes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ categoria: "marketing", subcategoria: "estudio_poblacion", descripcion: `Análisis demográfico: ${location}`, metadata: { localidad: location } }),
            });
            if (res.ok) {
                setData({
                    poblacion: "Consultando fuentes oficiales...",
                    densidad: "—",
                    crecimiento: "—",
                    perfil: "Pendiente de análisis",
                    potencial: "En proceso"
                });
                toast({ title: "Análisis Solicitado", description: "La solicitud ha sido registrada. Los datos se actualizarán cuando estén disponibles." });
            } else {
                toast({ variant: "destructive", title: "Error", description: "No se pudo procesar el análisis." });
            }
        } catch {
            toast({ variant: "destructive", title: "Error de conexión" });
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-12 w-full px-6 md:px-16">
            <header className="border-l-4 border-secondary pl-8 py-2">
                <h1 className="text-4xl font-bold tracking-tight uppercase italic text-foreground">Análisis de <span className="text-secondary">Población y Demografía</span></h1>
                <p className="text-muted-foreground font-bold text-xs uppercase tracking-widest opacity-60">Herramienta de Inteligencia de Mercado</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-12">
                <Card className="lg:col-span-4 glass-card p-10 rounded-[2.5rem] border-white/5">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-sm font-semibold uppercase tracking-widest text-secondary flex items-center gap-3">
                            <MapPin className="h-4 w-4" /> Parámetros Geográficos
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-semibold uppercase tracking-widest opacity-40">Localidad / Región</Label>
                            <Input 
                                placeholder="Ej: La Guaira, Venezuela" 
                                value={location}
                                onChange={(e) => setLocalidad(e.target.value)}
                                className="h-14 rounded-2xl bg-white/5 border-white/10 text-white font-bold"
                            />
                        </div>
                        <Button 
                            className="w-full h-16 rounded-2xl btn-3d-secondary font-semibold text-xs uppercase tracking-widest" 
                            disabled={isAnalyzing || !location}
                            onClick={handleAnalyze}
                        >
                            {isAnalyzing ? <Loader2 className="animate-spin mr-2"/> : <Search className="mr-2 h-5 w-5"/>}
                            EJECUTAR ANÁLISIS IA
                        </Button>
                    </CardContent>
                </Card>

                <div className="lg:col-span-8">
                    {data ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-700">
                            {[
                                { label: "Población Est.", val: data.poblacion, icon: Users },
                                { label: "Densidad", val: data.densidad, icon: ChartColumn },
                                { label: "Crecimiento", val: data.crecimiento, icon: TrendingUp },
                                { label: "Potencial", val: data.potencial, icon: Zap }
                            ].map((item, i) => (
                                <Card key={i} className="glass-card p-10 rounded-[2.5rem] flex items-center gap-6 border-white/5">
                                    <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                                        <item.icon className="h-6 w-6 text-secondary" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/20 mb-1">{item.label}</p>
                                        <p className="text-2xl font-bold text-white">{item.val}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="h-[400px] rounded-2xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]">
                            <Users className="h-20 w-20 text-white/5 mb-6" />
                            <p className="text-white/20 font-semibold uppercase tracking-wider text-sm italic">Esperando coordenadas demográficas...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
