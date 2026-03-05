"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { 
  ChevronLeft, 
  ShieldCheck, 
  Download, 
  Camera, 
  FileImage, 
  FileCode,
  Box,
  Monitor,
  Printer
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Página de Identidad de Marca Pro.
 * Presenta el logo oficial hexagonal en gran formato estático.
 * Incluye protocolos de exportación para resoluciones 5x5 cm (impresión), 512px y 4K.
 */

export default function IdentidadMarcaPage() {
  const { toast } = useToast();
  const logoRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDownloadSVG = () => {
    if (!logoRef.current) return;
    const svgElement = logoRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "system_kyron_logo_vector.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    toast({
      title: "PROTOCOLO VECTORIAL ACTIVO",
      description: "Logo SVG exportado con éxito.",
    });
  };

  const handleDownloadPNG = (size: number, label: string) => {
    if (!logoRef.current) return;
    const svgElement = logoRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, size, size);
      }
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `system_kyron_logo_${label}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast({
        title: `EXPORTACIÓN ${label.toUpperCase()} COMPLETADA`,
        description: `Resolución optimizada para ${label}.`,
      });
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden hud-grid">
      {/* Elementos HUD */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0,transparent_70%)]" />
        <div className="absolute top-10 left-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">
          Master Brand Node: 2.6.5
        </div>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center gap-12 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative" ref={logoRef}>
          <div className="absolute inset-0 bg-primary/10 blur-[180px] rounded-full scale-150" />
          <div className="relative drop-shadow-[0_0_100px_rgba(37,99,235,0.4)]">
            <Logo className="h-64 w-64 md:h-[512px] md:w-[512px]" />
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
            <ShieldCheck className="h-3.5 w-3.5" /> Activo Institucional Verificado
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            SYSTEM <span className="text-primary">KYRON</span>
          </h1>
        </div>

        {/* Panel de Descargas */}
        <div className="flex flex-wrap justify-center gap-4 pt-8 no-print max-w-5xl">
          <Button variant="ghost" asChild className="rounded-xl h-14 px-8 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 border border-white/5">
            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER</Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-xl h-14 px-8 text-[10px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 shadow-glow"
            onClick={handleDownloadSVG}
          >
            <FileCode className="mr-2 h-4 w-4" /> VECTOR SVG
          </Button>

          <Button 
            variant="outline" 
            className="rounded-xl h-14 px-8 text-[10px] font-black uppercase tracking-widest border-secondary/20 bg-secondary/5 text-secondary hover:bg-secondary/10 shadow-glow-secondary"
            onClick={() => handleDownloadPNG(591, '5x5cm_print')}
          >
            <Printer className="mr-2 h-4 w-4" /> 5x5 CM (PRINT)
          </Button>

          <Button 
            variant="outline" 
            className="rounded-xl h-14 px-8 text-[10px] font-black uppercase tracking-widest border-white/10 bg-white/5 text-white hover:bg-white/10"
            onClick={() => handleDownloadPNG(512, 'icon_512px')}
          >
            <Box className="mr-2 h-4 w-4" /> ICONO 512px
          </Button>

          <Button 
            variant="outline" 
            className="rounded-xl h-14 px-10 text-[10px] font-black uppercase tracking-widest border-primary/30 bg-primary/10 text-white hover:bg-primary/20"
            onClick={() => handleDownloadPNG(4096, '4k_uhd')}
          >
            <Monitor className="mr-2 h-4 w-4" /> MASTER 4K
          </Button>

          <Button 
            className="btn-3d-primary h-14 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest"
            onClick={() => window.print()}
          >
            <Camera className="mr-2 h-4 w-4" /> CAPTURAR PANTALLA
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
