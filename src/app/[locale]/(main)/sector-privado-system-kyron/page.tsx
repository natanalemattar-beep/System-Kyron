
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, Zap, ShieldCheck, 
  Lock, Printer, BrainCircuit, Network, Cpu, Database, 
  Sparkles, Activity, Users, MapPin, AlertTriangle, FileText, ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const zeduModel2025 = {
    identificacion: {
        nombre: "System Kyron",
        lideres: "Carlos Mattar, Sebastián Garrido, Marcos Sousa",
        apoyo: "Wilmer López, Mireya Corro, María Hernández",
        institucion: "U.E.P. Gabriela Mistral",
        ubicacion: "La Guaira, Venezuela"
    },
    estudioPoblacion: {
        localizacion: "La Atlántida, entre calle 7 a calle 3, Catia La Mar. Referencias: Pinta Catia, Supermercado Bensica.",
        comunidad: "Comunidad Comercial y Residencial La Atlántida",
        estimada: "500 empresas activas / 5.000 empleados administrativos y civiles."
    },
    analisisProblema: {
        definicion: "Las empresas en Venezuela operan con un 'Frankenstein' de sistemas aislados (contables, tributarios, inventarios) que no se comunican entre sí, generando ineficiencias críticas y riesgos de sanciones por falta de sincronización absoluta."
    }
};

const zeduModules = [
    { id: "M1", title: "IA FISCAL", desc: "Inferencia predictiva para cumplimiento 100%.", icon: BrainCircuit, color: "text-primary", border: "border-primary/40", status: "Óptimo" },
    { id: "M2", title: "BLOCKCHAIN", desc: "Sellado inmutable de registros transaccionales.", icon: Lock, color: "text-secondary", border: "border-secondary/40", status: "Sincronizado" },
    { id: "M3", title: "CONECTIVIDAD 5G", desc: "Nodo redundante de baja latencia Kyron.", icon: Network, color: "text-primary", border: "border-primary/40", status: "Activo" },
    { id: "M4", title: "MAG-SENSOR", desc: "Reciclaje con inducción magnética síncrona.", icon: Zap, color: "text-secondary", border: "border-secondary/40", status: "Operacional" }
];

export default function SectorPrivadoPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownloadExpediente = () => {
        const text = `
==================================================
      SYSTEM KYRON • MODELO ZEDU 2025
==================================================
EXPEDIENTE TÉCNICO MAESTRO: NODO LA GUAIRA
--------------------------------------------------

1. IDENTIFICACIÓN DEL PROYECTO
- Nombre: ${zeduModel2025.identificacion.nombre}
- Líderes: ${zeduModel2025.identificacion.lideres}
- Institución: ${zeduModel2025.identificacion.institucion}
- Ubicación: ${zeduModel2025.identificacion.ubicacion}

2. ESTUDIO DE POBLACIÓN (ZEDU)
- Localización: ${zeduModel2025.estudioPoblacion.localizacion}
- Comunidad: ${zeduModel2025.estudioPoblacion.comunidad}
- Estimada: ${zeduModel2025.estudioPoblacion.estimada}

3. ANÁLISIS DEL PROBLEMA
- Definición: ${zeduModel2025.analisisProblema.definicion}

FIRMA DIGITAL: [KYRON-MASTER-AUTH-2025]
==================================================
        `;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "EXPEDIENTE_ZEDU_KYRON_2025.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast({ title: "EXPEDIENTE ZEDU 2025", description: "Protocolo de exportación finalizado." });
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-6 md:px-16 min-h-screen bg-black relative">
            <header className="flex flex-col md:flex-row justify-between items-end gap-10 border-l-4 border-primary pl-10 py-4 mt-10 relative z-10">
                <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Lock className="h-3 w-3" /> SECTOR PRIVADO
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Modelo <span className="text-primary italic">ZEDU 2025</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">System Kyron • Nodo de Inteligencia Maestra</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-2xl" onClick={handleDownloadExpediente}>
                        <Download className="mr-2 h-4 w-4" /> EXPORTAR EXPEDIENTE
                    </Button>
                </div>
            </header>

            <Tabs defaultValue="identificacion" className="w-full relative z-10">
                <TabsList className="flex h-14 bg-white/[0.02] border border-white/5 rounded-2xl p-1.5 mb-16 shadow-inner">
                    <TabsTrigger value="identificacion" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary transition-all">1. Identificación</TabsTrigger>
                    <TabsTrigger value="poblacion" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary transition-all">2. Población ZEDU</TabsTrigger>
                    <TabsTrigger value="problema" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary transition-all">3. Análisis del Problema</TabsTrigger>
                    <TabsTrigger value="ingenieria" className="flex-1 rounded-xl font-black uppercase text-[9px] tracking-[0.3em] data-[state=active]:bg-primary transition-all">4. Ingeniería Kyron</TabsTrigger>
                </TabsList>

                <TabsContent value="identificacion" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="glass-card p-10 rounded-[3rem] border-primary/20 bg-black/40">
                        <CardHeader className="p-0 mb-8"><CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Datos del Proyecto</CardTitle></CardHeader>
                        <CardContent className="p-0 space-y-6">
                            {[
                                { label: "Nombre", val: zeduModel2025.identificacion.nombre },
                                { label: "Líderes", val: zeduModel2025.identificacion.lideres },
                                { label: "Apoyo", val: zeduModel2025.identificacion.apoyo },
                                { label: "Institución", val: zeduModel2025.identificacion.institucion },
                                { label: "Ubicación", val: zeduModel2025.identificacion.ubicacion },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col border-b border-white/5 pb-4 last:border-none">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1">{item.label}</span>
                                    <span className="text-sm font-bold text-white/90">{item.val}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="poblacion" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="glass-card p-10 rounded-[3rem] border-secondary/20 bg-black/40">
                        <CardHeader className="p-0 mb-8"><CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-secondary italic">Estudio Demográfico</CardTitle></CardHeader>
                        <CardContent className="p-0 space-y-8">
                            <div className="space-y-2">
                                <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Localización Técnica</span>
                                <p className="text-xs font-bold text-white/70 leading-relaxed uppercase">{zeduModel2025.estudioPoblacion.localizacion}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Comunidad</span>
                                    <p className="text-xs font-bold text-white/70 uppercase">{zeduModel2025.estudioPoblacion.comunidad}</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30">Población Estimada</span>
                                    <p className="text-xs font-black text-secondary uppercase italic">{zeduModel2025.estudioPoblacion.estimada}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="problema" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Card className="glass-card p-10 rounded-[3rem] border-red-500/20 bg-black/40">
                        <CardHeader className="p-0 mb-6"><CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-red-500 italic">Definición de Ineficiencia</CardTitle></CardHeader>
                        <CardContent className="p-0">
                            <p className="text-xs font-medium text-white/50 leading-relaxed text-justify border-l-2 border-red-500/30 pl-6 italic">
                                "{zeduModel2025.analisisProblema.definicion}"
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="ingenieria" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {zeduModules.map((m, i) => (
                            <Card key={i} className={cn("glass-card p-8 rounded-[2rem] flex flex-col items-center text-center border-2 bg-black/40", m.border)}>
                                <div className={cn("p-4 rounded-2xl mb-6 shadow-inner", m.color)}>
                                    <m.icon className="h-10 w-10" />
                                </div>
                                <h4 className="font-black uppercase text-xs tracking-widest mb-2 text-white italic">{m.title}</h4>
                                <p className="text-[10px] font-bold text-white/30 uppercase leading-relaxed">{m.desc}</p>
                                <div className="mt-auto pt-6 w-full border-t border-white/5">
                                    <div className={cn("text-[8px] font-black uppercase tracking-widest px-3 h-6 flex items-center bg-white/5 rounded-full justify-center", m.color)}>
                                        {m.status}
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            <div className="mt-20 flex justify-center pb-10">
                <div className="flex items-center gap-10 text-[9px] font-black uppercase tracking-[0.5em] text-white/10">
                    <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Encrypt: AES-512</span>
                    <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> AI Engine: Active</span>
                    <span className="flex items-center gap-2"><Database className="h-3 w-3" /> Ledger: Verified</span>
                </div>
            </div>
        </div>
    );
}
