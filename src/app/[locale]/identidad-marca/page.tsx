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
  FileCode,
  Box,
  Monitor,
  Printer,
  Sparkles
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Página de Identidad de Marca Consolidada.
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
    downloadLink.download = "logo_system_kyron_master.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    toast({
      title: "EXPORTACIÓN VECTORIAL",
      description: "Logo SVG descargado correctamente.",
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
      downloadLink.download = `logo_kyron_${label}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      toast({
        title: `ASSET ${label.toUpperCase()} GENERADO`,
        description: `Resolución: ${size}x${size} px.`,
      });
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden hud-grid select-none">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.08)_0,transparent_70%)]" />
        <div className="absolute top-12 left-12 border-l border-primary/20 pl-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground/20 italic">Centro de Activos Principal</p>
          <p className="text-[10px] font-bold text-primary uppercase tracking-wide mt-1">Version 2.6.5 [Final]</p>
        </div>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center gap-16 p-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative" ref={logoRef}>
          <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full scale-150" />
          <div className="relative p-12 bg-card/40 border border-border rounded-2xl backdrop-blur-sm shadow-lg">
            <Logo className="h-64 w-64 md:h-[480px] md:w-[480px] drop-shadow-glow" />
          </div>
        </div>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-glow">
            <ShieldCheck className="h-4 w-4" /> IDENTIDAD CORPORATIVA PROTEGIDA
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase italic leading-none">
              SYSTEM <span className="text-primary">KYRON</span>
            </h1>
            <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-[1em] mt-4">Corporate Intelligence</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-10 no-print max-w-4xl">
          <Button variant="ghost" asChild className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest text-foreground/40 hover:text-foreground hover:bg-card border border-border transition-all">
            <Link href="/"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
          </Button>
          
          <Button 
            variant="outline" 
            className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 shadow-glow"
            onClick={handleDownloadSVG}
          >
            <FileCode className="mr-3 h-4 w-4" /> VECTOR MASTER (SVG)
          </Button>

          <Button 
            variant="outline" 
            className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-secondary/30 bg-secondary/5 text-secondary hover:bg-secondary/10 shadow-glow-secondary"
            onClick={() => handleDownloadPNG(591, '5x5cm_print')}
          >
            <Printer className="mr-3 h-4 w-4" /> 5x5 CM [PRINT]
          </Button>

          <Button 
            variant="outline" 
            className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-border bg-card/50 text-foreground hover:bg-card"
            onClick={() => handleDownloadPNG(512, 'icon_512px')}
          >
            <Box className="mr-3 h-4 w-4" /> ICONO [512px]
          </Button>

          <Button 
            variant="outline" 
            className="rounded-2xl h-14 px-10 text-[10px] font-semibold uppercase tracking-widest border-primary/20 bg-primary/10 text-foreground hover:bg-primary/20"
            onClick={() => handleDownloadPNG(4096, '4k_uhd')}
          >
            <Monitor className="mr-3 h-4 w-4" /> DIGITAL [4K]
          </Button>

          <Button 
            className="btn-3d-primary h-14 px-10 rounded-2xl text-[10px] font-semibold uppercase tracking-widest shadow-lg"
            onClick={() => window.print()}
          >
            <Camera className="mr-3 h-4 w-4" /> CAPTURAR PANTALLA
          </Button>
        </div>
      </motion.div>

      <div className="absolute bottom-10 flex items-center gap-8 text-[10px] font-semibold uppercase tracking-wider text-foreground/10 italic">
        <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> Precision Graphics</span>
        <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Auth: Verified</span>
      </div>
    </div>
  );
}