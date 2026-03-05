
"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { ChevronLeft, ShieldCheck, Download, Camera, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Página de Identidad de Marca.
 * Presenta el logo oficial en gran formato, estático para capturas de pantalla
 * y permite la descarga del activo en formato vectorial.
 */

export default function IdentidadMarcaPage() {
  const { toast } = useToast();
  const logoRef = useRef<HTMLDivElement>(null);

  const handleDownloadSVG = () => {
    if (!logoRef.current) return;
    const svgElement = logoRef.current.querySelector("svg");
    if (!svgElement) return;

    // Clonar para no afectar la vista y limpiar clases de Tailwind si fuera necesario
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "system_kyron_logo_official.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    toast({
      title: "PROTOCOLO DE DESCARGA ACTIVO",
      description: "El activo vectorial (SVG) ha sido exportado exitosamente.",
    });
  };

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden hud-grid">
      {/* Elementos de Ambientación HUD */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0,transparent_70%)]" />
        <div className="absolute top-10 left-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">
          Identity Master Node: 2.6.5
        </div>
        <div className="absolute bottom-10 right-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">
          System Kyron • Corporate Assets
        </div>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative group" ref={logoRef}>
          {/* Resplandor Maestro Estático */}
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-150" />
          
          {/* Logo en Gran Formato Estático para Capture */}
          <div className="relative drop-shadow-[0_0_60px_rgba(37,99,235,0.5)]">
            <Logo className="h-64 w-64 md:h-96 md:w-96" />
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
            <ShieldCheck className="h-3.5 w-3.5" /> Activo Oficial Verificado
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            SYSTEM <span className="text-primary">KYRON</span>
          </h1>
          
          <p className="text-xs md:text-sm text-white/40 max-w-lg mx-auto font-bold uppercase tracking-[0.4em] italic leading-relaxed">
            Identidad Visual de Grado Corporativo <br/> Nodo Central de Inteligencia
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-8 no-print">
          <Button variant="ghost" asChild className="rounded-xl h-12 px-8 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5">
            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER AL INICIO</Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-xl h-12 px-8 text-[10px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 shadow-glow"
            onClick={handleDownloadSVG}
          >
            <Download className="mr-2 h-4 w-4" /> DESCARGAR SVG (VECTOR)
          </Button>

          <Button 
            className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest"
            onClick={() => window.print()}
          >
            <Camera className="mr-2 h-4 w-4" /> CAPTURAR PÁGINA
          </Button>
        </div>
      </motion.div>

      {/* Grid HUD Inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent opacity-30 pointer-events-none" />
    </div>
  );
}
