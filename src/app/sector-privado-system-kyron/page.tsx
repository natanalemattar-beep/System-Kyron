
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Printer,
  Download,
  Loader2,
  CheckCircle,
  ChevronLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import Link from "next/link";

/**
 * @fileOverview Modelo Zedu - Expediente de Ingeniería de Alta Fidelidad.
 * Réplica exacta del formato de documento oficial.
 */

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
                title: "DOCUMENTO GENERADO",
                description: "Se ha descargado el Expediente Maestro (Partes 1 y 2).",
                action: <CheckCircle className="text-primary h-4 w-4" />
            });
            window.print();
        }, 1000);
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 text-black p-4 md:p-12 font-sans selection:bg-primary/10">
            {/* Control HUD (No se imprime) */}
            <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6 no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" asChild className="rounded-xl h-10 px-4 text-xs font-bold text-slate-500 hover:text-black">
                        <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL NODO</Link>
                    </Button>
                    <div className="h-8 w-px bg-slate-200" />
                    <Logo className="h-8 w-8 grayscale" />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => window.print()} className="h-10 px-6 rounded-xl border-slate-300 font-bold text-xs uppercase tracking-widest">
                        <Printer className="mr-2 h-4 w-4" /> IMPRIMIR
                    </Button>
                    <Button onClick={handleDownload} disabled={isVerifying} className="h-10 px-8 rounded-xl bg-black text-white hover:bg-slate-800 font-bold text-xs uppercase tracking-widest shadow-lg">
                        {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
                        DESCARGAR (.DOC)
                    </Button>
                </div>
            </div>

            {/* DOCUMENTO - ESTILO OFICIAL ZEDU */}
            <div className="max-w-[850px] mx-auto bg-white p-8 md:p-16 shadow-2xl border border-slate-200 print:shadow-none print:border-none print:p-0">
                
                {/* Título Principal */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-black uppercase tracking-[0.2em] border-b-4 border-black inline-block pb-2 px-6">
                        Modelo Zedu
                    </h1>
                </div>

                {/* SECCIÓN 1: INFORMACIÓN DEL EQUIPO */}
                <div className="space-y-4 mb-12">
                    <h2 className="text-lg font-black uppercase tracking-widest">
                        INFORMACIÓN DEL EQUIPO
                    </h2>
                    
                    <div className="border-[2px] border-black overflow-hidden font-mono">
                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">NOMBRE DEL PROYECTO</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-bold italic uppercase tracking-tight">System Kyron</p>
                        </div>

                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">INTEGRANTES DEL EQUIPO</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-bold uppercase">Carlos Mattar, Sebastian Garrido, Marcos Sousa</p>
                        </div>

                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">INSTITUCIÓN EDUCATIVA</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-bold uppercase">U.E.P. Gabriela Mistral</p>
                        </div>

                        <div className="p-2 bg-slate-50 border-b-[2px] border-black">
                            <p className="text-[11px] font-black uppercase">PAÍS/CIUDAD</p>
                        </div>
                        <div className="p-3 bg-white">
                            <p className="text-sm font-bold uppercase">Venezuela, La Guaira, Catia La Mar</p>
                        </div>
                    </div>
                </div>

                {/* SECCIÓN 2: POBLACIÓN A TRABAJAR */}
                <div className="space-y-4 mb-12">
                    <h2 className="text-lg font-black uppercase tracking-widest">
                        POBLACIÓN A TRABAJAR
                    </h2>
                    
                    <div className="border-[2px] border-black overflow-hidden font-mono">
                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">PAÍS/ CIUDAD/ MUNICIPIO/ LOCALIDAD ESPECÍFICA</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-bold uppercase">Venezuela, Caracas, Baruta, Santa Rosa de Lima</p>
                        </div>

                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">NOMBRE DE LA COMUNIDAD</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-bold uppercase">Santa Rosa de Lima</p>
                        </div>

                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">CANTIDAD TOTAL DE HABITANTES</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-bold uppercase">12.450 Habitantes (Aprox.)</p>
                        </div>

                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">CANTIDAD DE HABITANTES POR GÉNERO</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-bold uppercase">Femenino: 6.474 (52%) | Masculino: 5.976 (48%)</p>
                        </div>

                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">CANTIDAD DE HABITANTES POR EDAD</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-bold uppercase">0-14: 15% | 15-29: 25% | 30-59: 45% | 60+: 15%</p>
                        </div>

                        <div className="border-b-[2px] border-black p-2 bg-slate-50">
                            <p className="text-[11px] font-black uppercase">CARACTERÍSTICAS DE LA POBLACIÓN</p>
                        </div>
                        <div className="border-b-[2px] border-black p-3 bg-white">
                            <p className="text-sm font-medium italic leading-relaxed text-justify">
                                Población de clase media-alta con alta densidad de profesionales y emprendedores. Comunidad con acceso a servicios privados, alta demanda de digitalización y conectividad, y un fuerte enfoque en la seguridad transaccional y el cumplimiento normativo.
                            </p>
                        </div>

                        <div className="p-2 bg-slate-50 border-b-[2px] border-black">
                            <p className="text-[11px] font-black uppercase">CLIMA</p>
                        </div>
                        <div className="p-3 bg-white">
                            <p className="text-sm font-bold uppercase tracking-wide">Tropical de montaña (Temperaturas entre 18°C y 26°C)</p>
                        </div>
                    </div>
                </div>

                {/* Mensaje de espera para la Parte 3 */}
                <div className="mt-20 p-12 border-2 border-dashed border-slate-100 rounded-3xl text-center bg-slate-50/30 no-print">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Esperando inyección de la Parte 3: Diagnóstico Participativo...</p>
                </div>

                {/* Footer del Documento */}
                <div className="mt-32 pt-8 border-t-2 border-black flex justify-between items-center opacity-40 italic text-[9px] font-black uppercase tracking-widest">
                    <span>Kyron Strategic Document • Internal Protocol 2.6.5</span>
                    <span>Página 2 / X</span>
                </div>
            </div>
        </div>
    );
}
