"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrainCircuit, Loader2, Sparkles, Download, Zap, Cpu, ShieldCheck, Network, Activity, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const zeduModulesTemplate = [
    { title: "Arquitectura IA", icon: BrainCircuit, desc: "Motor de inferencia para automatización de procesos críticos.", color: "text-blue-400" },
    { title: "Nodo Fiscal", icon: ShieldCheck, desc: "Cumplimiento SENIAT 100% inmutable via Blockchain.", color: "text-green-400" },
    { title: "Eco-Sistema", icon: Zap, desc: "Reciclaje magnético integrado con billetera digital.", color: "text-yellow-400" },
    { title: "Red 5G/eSIM", icon: Network, desc: "Conectividad redundante de grado militar.", color: "text-purple-400" },
    { title: "Ledger Ledger", icon: Database, desc: "Trazabilidad total de activos y suministros.", color: "text-cyan-400" },
    { title: "Comando Central", icon: Activity, desc: "Dashboard ejecutivo de toma de decisiones.", color: "text-rose-400" }
];

export default function ZEDUModelPage() {
    const [companyName, setCompanyName] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [zeduData, setZeduData] = useState<any | null>(null);
    const { toast } = useToast();

    const handleGenerate = () => {
        if (!companyName.trim()) return;
        setIsGenerating(true);
        setZeduData(null);
        
        setTimeout(() => {
            setZeduData({
                company: companyName,
                modulos: zeduModulesTemplate,
                resumen: `El modelo ZEDU para ${companyName} ha sido calibrado para optimizar la eficiencia operativa y eliminar el riesgo fiscal en un 100% mediante la inyección de tecnología de tercera generación.`
            });
            setIsGenerating(false);
            toast({ title: "MODELO ZEDU GENERADO", description: "Expediente de ingeniería listo." });
        }, 1500);
    };

    const handleDownload = () => {
        const text = `
==================================================
      EXPEDIENTE TÉCNICO: MODELO ZEDU MAESTRO
==================================================
EMPRESA: ${companyName.toUpperCase()}
SISTEMA: SYSTEM KYRON V2.6.5
FECHA: ${new Date().toLocaleDateString('es-VE')}
ID: KYR-${Math.random().toString(36).substr(2, 9).toUpperCase()}
--------------------------------------------------

1. DIAGNÓSTICO ESTRATÉGICO
--------------------------------------------------
${zeduData.resumen}

2. ARQUITECTURA DE MÓDULOS (CUADROS)
--------------------------------------------------
${zeduData.modulos.map((m: any, i: number) => `[CUADRO ${i + 1}] ${m.title.toUpperCase()}
   - Función: ${m.desc}
   - Estado: OPTIMIZADO
`).join('\n')}

3. DICTAMEN DE IMPACTO OPERATIVO
--------------------------------------------------
- Riesgo Fiscal Residual: 0.00%
- Eficiencia Operativa: +45% Proyectado
- Trazabilidad: 100% (Blockchain Verified)
- Conectividad: Nodo 5G Redundante

==================================================
      VALIDADO POR SYSTEM KYRON INTELLIGENCE
      NO REQUIERE FIRMA FÍSICA - SELLADO IA
==================================================
        `;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ZEDU_${companyName.replace(/ /g, '_')}_EXPEDIENTE.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <div className="space-y-12 w-full px-6 md:px-16 pb-20 hud-grid min-h-screen">
            <div className="gradient-blur top-0 right-0 w-[600px] h-[600px] bg-primary/10" />
            <div className="gradient-blur bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10" />

            <header className="flex flex-col gap-4 border-l-4 border-primary pl-8 py-2 mt-10">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg neon-border-blue">
                        <Cpu className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary/60">Protocolo ZEDU</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">
                    Modelo de <span className="text-primary">Ingeniería</span>
                </h1>
                <p className="text-muted-foreground font-bold text-xs uppercase tracking-[0.3em] opacity-40">System Kyron • Estructura de Misión Crítica</p>
            </header>

            <div className="grid lg:grid-cols-12 gap-12">
                <Card className="lg:col-span-4 glass-card p-10 rounded-[2.5rem] h-fit border-white/5">
                    <CardHeader className="p-0 mb-8">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-3">
                            <Zap className="h-4 w-4" /> Configuración de Nodo
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 space-y-8">
                        <div className="space-y-3">
                            <Label className="text-[10px] font-black uppercase tracking-widest opacity-40">Entidad Organizativa</Label>
                            <Input 
                                placeholder="NOMBRE DE LA EMPRESA" 
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="h-14 rounded-2xl bg-white/5 border-white/10 text-lg font-black uppercase tracking-tighter focus:border-primary transition-all text-white"
                            />
                        </div>
                        <Button 
                            className="w-full h-16 rounded-2xl btn-3d-primary font-black text-xs uppercase tracking-widest" 
                            disabled={isGenerating || !companyName}
                            onClick={handleGenerate}
                        >
                            {isGenerating ? <Loader2 className="animate-spin mr-2"/> : <Sparkles className="mr-2 h-5 w-5"/>}
                            GENERAR MATRIZ ZEDU
                        </Button>
                    </CardContent>
                </Card>

                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {zeduData ? (
                            <motion.div 
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-10"
                            >
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {zeduData.modulos.map((m: any, i: number) => (
                                        <motion.div
                                            key={m.title}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                        >
                                            <Card className="glass-card p-8 rounded-[2rem] h-full flex flex-col items-center text-center group hover:scale-[1.02] transition-all border-white/5 hover:border-primary/40">
                                                <div className={cn("p-4 bg-white/5 rounded-2xl mb-6 shadow-inner border border-white/5 group-hover:neon-border-blue transition-all", m.color)}>
                                                    <m.icon className="h-8 w-8" />
                                                </div>
                                                <h4 className="font-black uppercase text-xs tracking-widest mb-3 text-white">{m.title}</h4>
                                                <p className="text-[10px] font-medium text-white/40 leading-relaxed uppercase">{m.desc}</p>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>

                                <Card className="glass-card p-10 rounded-[3rem] border-primary/20 bg-primary/5">
                                    <h3 className="text-xl font-black uppercase italic text-primary mb-4">Resumen del Despliegue</h3>
                                    <p className="text-lg font-bold text-white/80 leading-relaxed italic">{zeduData.resumen}</p>
                                </Card>

                                <Button variant="outline" className="w-full h-14 rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] border-white/10 hover:bg-primary/10 hover:text-primary transition-all" onClick={handleDownload}>
                                    <Download className="mr-3 h-4 w-4"/> Descargar Expediente Maestro (.TXT)
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-[600px] rounded-[3rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 bg-white/[0.01]"
                            >
                                <div className="relative mb-8">
                                    <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse rounded-full" />
                                    <Database className="h-24 w-24 text-white/10 relative z-10" />
                                </div>
                                <p className="text-white/20 font-black uppercase tracking-[0.5em] text-sm italic">Esperando inicialización de datos...</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}