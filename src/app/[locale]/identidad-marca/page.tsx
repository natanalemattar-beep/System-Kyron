
"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { ChevronLeft, ShieldCheck, Download, Camera, FileImage, FileCode } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Página de Identidad de Marca.
 * Presenta el logo oficial en gran formato, estático para capturas de pantalla
 * y permite la descarga del activo en formatos SVG y PNG.
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
    downloadLink.download = "system_kyron_logo_official.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    toast({
      title: "PROTOCOLO DE DESCARGA ACTIVO",
      description: "El activo vectorial (SVG) ha sido exportado exitosamente.",
    });
  };

  const handleDownloadPNG = () => {
    if (!logoRef.current) return;
    const svgElement = logoRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = 2048; // Ultra High Res
      canvas.height = 2048;
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      ctx?.drawImage(img, 0, 0, 2048, 2048);
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "system_kyron_logo_hq.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast({
        title: "EXPORTACIÓN PNG COMPLETADA",
        description: "Activo en alta resolución generado (2048x2048).",
      });
    };
    
    // Ensure styles are inline or simple for the image conversion
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden hud-grid">
      {/* Elementos de Ambientación HUD */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0,transparent_70%)]" />
        <div className="absolute top-10 left-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">
          Identity Master Node: 2.6.5
        </div>
        <div className="absolute bottom-10 right-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">
          System Kyron • Official Assets
        </div>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center gap-16 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative group" ref={logoRef}>
          {/* Resplandor Maestro Estático */}
          <div className="absolute inset-0 bg-primary/20 blur-[150px] rounded-full scale-150" />
          
          {/* Logo en Gran Formato Estático para Capture */}
          <div className="relative drop-shadow-[0_0_80px_rgba(37,99,235,0.6)]">
            <Logo className="h-64 w-64 md:h-[500px] md:w-[500px]" />
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
            <ShieldCheck className="h-3.5 w-3.5" /> Activo Oficial Verificado
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic text-white italic-shadow leading-none">
            SYSTEM <span className="text-primary">KYRON</span>
          </h1>
          
          <p className="text-xs md:text-sm text-white/40 max-w-lg mx-auto font-bold uppercase tracking-[0.4em] italic leading-relaxed">
            Identidad Visual de Grado Corporativo <br/> Nodo Central de Inteligencia
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-8 no-print max-w-2xl">
          <Button variant="ghost" asChild className="rounded-xl h-12 px-8 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5">
            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> VOLVER</Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-xl h-12 px-8 text-[10px] font-black uppercase tracking-widest border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 shadow-glow"
            onClick={handleDownloadSVG}
          >
            <FileCode className="mr-2 h-4 w-4" /> DESCARGAR SVG
          </Button>

          <Button 
            variant="outline" 
            className="rounded-xl h-12 px-8 text-[10px] font-black uppercase tracking-widest border-secondary/20 bg-secondary/5 text-secondary hover:bg-secondary/10 shadow-glow-secondary"
            onClick={handleDownloadPNG}
          >
            <FileImage className="mr-2 h-4 w-4" /> DESCARGAR PNG (HQ)
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
