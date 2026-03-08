
"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  FileText as FileWord,
  Printer,
  Download,
  Activity,
  Terminal,
  Loader2,
  CheckCircle,
  ChevronLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * @fileOverview Expediente ZEDU - Parte 1: Información del Equipo.
 * Diseño de alta fidelidad que replica el modelo de documento oficial.
 */

const zeduPart1 = {
    header: "MODELO DE EXPEDIENTE TÉCNICO ZEDU (ZONA ECONÓMICA DIGITAL UNIFICADA)",
    titulo: "1. INFORMACIÓN DEL EQUIPO",
    fields: [
        { label: "NOMBRE DEL PROYECTO", val: "System Kyron v2.6.5: Ecosistema de Inteligencia Corporativa y Convergencia Digital" },
        { label: "INTEGRANTES DEL EQUIPO", val: "Ing. Carlos Mattar, Lic. Beatriz Martínez, Abog. María Hernández" },
        { label: "INSTITUCIÓN EDUCATIVA", val: "Centro de Innovación Tecnológica Kyron / Sector Privado" },
        { label: "PAÍS / CIUDAD", val: "Venezuela, Caracas / Distrito Capital" },
    ]
};

export default function SectorPrivadoPage() {
    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleDownload = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            toast({
                title: "EXPEDIENTE PARCIAL GENERADO",
                description: "Se ha descargado la Parte 1 del Dossier ZEDU.",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
            // Lógica de descarga simplificada para esta parte
            window.print();
        }, 1000);
    };

    if (!isMounted) return null;

    return (
        <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-20 px-4 md:px-16 min-h-screen relative bg-[#020202]">
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] hud-grid" />

            {/* HEADER TÉCNICO */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-l-4 border-primary pl-6 md:pl-10 py-4 mt-10 relative z-10 no-print">
                <div className="space-y-3">
                    <Button variant="ghost" asChild className="mb-4 -ml-4 rounded-xl text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-all">
                        <Link href="/"><ChevronLeft className="mr-2 h-3.5 w-3.5" /> VOLVER AL NODO</Link>
                    </Button>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow">
                        <Terminal className="h-3 w-3" /> NODO ESTRATÉGICO
                    </div>
                    <h1 className="text-3xl md:text-6xl font-black tracking-tight text-white uppercase leading-none italic-shadow">Expediente <span className="text-primary italic">ZEDU</span></h1>
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 italic">CONSTRUCCIÓN POR PARTES • PARTE 1</p>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                    <Button variant="outline" className="flex-1 md:flex-none h-12 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white" onClick={() => window.print()}>
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button 
                        className="flex-1 md:flex-none btn-3d-primary h-12 px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl group" 
                        onClick={handleDownload}
                        disabled={isVerifying}
                    >
                        {isVerifying ? <Loader2 className="mr-3 h-4 w-4 animate-spin" /> : <FileWord className="mr-3 h-4 w-4" />}
                        {isVerifying ? "PROCESANDO..." : "DESCARGAR PARTE 1"}
                    </Button>
                </div>
            </header>

            {/* DOCUMENTO FÍSICO - ESTILO PAPEL */}
            <div className="max-w-5xl mx-auto relative z-10">
                <Card className="border-none rounded-[3rem] bg-white shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden relative p-8 md:p-20 text-black font-sans min-h-[800px]">
                    <div className="space-y-12 relative z-10">
                        {/* ENCABEZADO OFICIAL */}
                        <header className="text-center space-y-4 mb-16 border-b-4 border-black pb-8">
                            <Logo className="h-16 w-16 mx-auto mb-4 grayscale" />
                            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">{zeduPart1.header}</h2>
                        </header>

                        {/* SECCIÓN 1: INFORMACIÓN DEL EQUIPO */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-black uppercase tracking-widest bg-black text-white px-6 py-2 rounded-sm italic">
                                {zeduPart1.titulo}
                            </h3>
                            <div className="grid gap-0 border-2 border-black">
                                {zeduPart1.fields.map((f, i) => (
                                    <div key={i} className={cn(
                                        "grid grid-cols-1 md:grid-cols-3 border-b-2 border-black last:border-b-0",
                                        i % 2 === 0 ? "bg-slate-50" : "bg-white"
                                    )}>
                                        <div className="p-4 border-b-2 md:border-b-0 md:border-r-2 border-black flex items-center bg-slate-100/50">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-800 leading-tight">{f.label}</span>
                                        </div>
                                        <div className="p-6 md:col-span-2">
                                            <span className="text-sm font-bold text-slate-900 font-mono italic leading-relaxed">{f.val}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* ESPACIADOR PARA PARTES SIGUIENTES */}
                        <div className="mt-20 p-10 border-2 border-dashed border-black/20 rounded-2xl text-center bg-slate-50/50">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Esperando Inyección de la Parte 2...</p>
                        </div>

                        {/* FIRMAS Y SELLOS */}
                        <footer className="mt-32 pt-10 border-t-2 border-black/10 flex flex-col md:flex-row justify-between items-center gap-10 opacity-40">
                            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-black">
                                <Activity className="h-4 w-4" /> INTEGRIDAD DE NODO 100%
                            </div>
                            <div className="flex gap-20">
                                <div className="text-center space-y-2">
                                    <div className="w-40 h-[1px] bg-black mx-auto" />
                                    <p className="text-[8px] font-black uppercase tracking-widest">RESPONSABLE TÉCNICO</p>
                                </div>
                            </div>
                        </footer>
                    </div>
                </Card>
            </div>
        </div>
    );
}
