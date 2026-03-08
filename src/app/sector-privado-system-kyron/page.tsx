
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
 * @fileOverview Modelo Zedu - Parte 1: Información del Equipo.
 * Réplica exacta del formato de documento oficial proporcionado por el usuario.
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
                description: "Se ha descargado la Parte 1 del Modelo Zedu.",
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

            {/* DOCUMENTO - ESTILO OFICIAL */}
            <div className="max-w-[800px] mx-auto bg-white p-8 md:p-20 shadow-xl border border-slate-200 print:shadow-none print:border-none print:p-0">
                
                {/* Título Principal */}
                <div className="text-center mb-16">
                    <h1 className="text-2xl font-bold uppercase tracking-[0.1em] border-b-2 border-black inline-block pb-1 px-4">
                        Modelo Zedu
                    </h1>
                </div>

                {/* SECCIÓN 1: INFORMACIÓN DEL EQUIPO */}
                <div className="space-y-6 mb-16">
                    <h2 className="text-lg font-bold uppercase tracking-widest">
                        INFORMACIÓN DEL EQUIPO
                    </h2>
                    
                    <div className="border-[1.5px] border-black overflow-hidden">
                        {/* NOMBRE DEL PROYECTO */}
                        <div className="border-b-[1.5px] border-black p-2 bg-white">
                            <p className="text-sm font-bold uppercase">NOMBRE DEL PROYECTO</p>
                        </div>
                        <div className="border-b-[1.5px] border-black p-3 bg-white min-h-[45px]">
                            <p className="text-sm font-medium italic">System Kyron</p>
                        </div>

                        {/* INTEGRANTES DEL EQUIPO */}
                        <div className="border-b-[1.5px] border-black p-2 bg-white">
                            <p className="text-sm font-bold uppercase">INTEGRANTES DEL EQUIPO</p>
                        </div>
                        <div className="border-b-[1.5px] border-black p-3 bg-white min-h-[45px]">
                            <p className="text-sm font-medium italic">Carlos Mattar, Sebastian Garrido, Marcos Sousa</p>
                        </div>

                        {/* INSTITUCIÓN EDUCATIVA */}
                        <div className="border-b-[1.5px] border-black p-2 bg-white">
                            <p className="text-sm font-bold uppercase">INSTITUCIÓN EDUCATIVA</p>
                        </div>
                        <div className="border-b-[1.5px] border-black p-3 bg-white min-h-[45px]">
                            <p className="text-sm font-medium italic">Gabriela Mistral</p>
                        </div>

                        {/* PAÍS/CIUDAD */}
                        <div className="p-2 bg-white border-b-[1.5px] border-black">
                            <p className="text-sm font-bold uppercase">PAÍS/CIUDAD</p>
                        </div>
                        <div className="p-3 bg-white min-h-[45px]">
                            <p className="text-sm font-medium italic">La Guaira, Catia La Mar, Venezuela</p>
                        </div>
                    </div>
                </div>

                {/* Mensaje de espera para la Parte 2 */}
                <div className="mt-20 p-12 border-2 border-dashed border-slate-100 rounded-3xl text-center bg-slate-50/30 no-print">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Esperando inyección de la Parte 2: Población a trabajar...</p>
                </div>

                {/* Footer del Documento */}
                <div className="mt-32 pt-8 border-t border-slate-100 flex justify-between items-center opacity-20 italic text-[8px] font-bold uppercase tracking-widest">
                    <span>Kyron Strategic Document • Master Version 2.6.5</span>
                    <span>Pag. 1 / X</span>
                </div>
            </div>
        </div>
    );
}
