"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { 
  ChevronLeft, 
  ShieldCheck, 
  Camera, 
  Sparkles,
  FileImage,
  FileText,
  Scale,
  Monitor,
  Tv,
  Code
} from "lucide-react";

import { useRef, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Página de Identidad de Marca Consolidada.
 */

import { PasswordGate } from "@/components/auth/password-gate";

export default function IdentidadMarcaPage() {
  const { toast } = useToast();
  const logoRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleDownloadImage = async (format: 'png' | 'jpeg') => {
    if (!logoRef.current) return;
    
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(logoRef.current, {
      scale: 3, 
      backgroundColor: '#020617', 
      useCORS: true,
      logging: false,
    });
    
    const image = canvas.toDataURL(`image/${format}`, 1.0);
    const link = document.createElement('a');
    link.href = image;
    link.download = `System_Kyron_Logo.${format}`;
    link.click();
    
    toast({
      title: "DESCARGA EXITOSA",
      description: `Logo descargado en formato ${format.toUpperCase()}`,
    });
  };

  const handleDownloadPDF = async () => {
    if (!logoRef.current) return;
    
    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(logoRef.current, {
      scale: 3,
      backgroundColor: '#020617',
      useCORS: true,
      logging: false,
    });
    
    const image = canvas.toDataURL('image/png');
    const jsPDF = (await import("jspdf")).default;
    const pdf = new jsPDF('l', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    const imgProps = pdf.getImageProperties(image);
    const ratio = imgProps.width / imgProps.height;
    
    let renderWidth = pdfWidth;
    let renderHeight = renderWidth / ratio;
    
    if (renderHeight > pdfHeight) {
      renderHeight = pdfHeight;
      renderWidth = renderHeight * ratio;
    }
    
    const x = (pdfWidth - renderWidth) / 2;
    const y = (pdfHeight - renderHeight) / 2;
    
    pdf.setFillColor(2, 6, 23);
    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
    pdf.addImage(image, 'PNG', x, y, renderWidth, renderHeight);
    pdf.save('System_Kyron_Logo.pdf');
    
    toast({
      title: "DESCARGA EXITOSA",
      description: "Logo descargado en formato PDF",
    });
  };

  const handleDownloadCM = async (cm: number, withName: boolean) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/logo-kyron-hq.png";

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });

    const px = Math.round((cm / 2.54) * 300);
    const canvas = document.createElement("canvas");
    canvas.width = px;
    canvas.height = px;

    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, px, px);

    if (withName) {
      const logoSize = px * 0.56;
      const padX = (px - logoSize) / 2;
      const logoY = px * 0.07;
      ctx.drawImage(img, padX, logoY, logoSize, logoSize);

      const textY = logoY + logoSize + px * 0.04;
      const fontSize = px * 0.075;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = "#1a1a2e";
      ctx.font = `bold ${fontSize}px 'Inter', 'Segoe UI', Arial, sans-serif`;
      ctx.fillText("SYSTEM KYRON", px / 2, textY);
    } else {
      const pad = px * 0.03;
      const logoSize = px - pad * 2;
      ctx.drawImage(img, pad, pad, logoSize, logoSize);
    }

    const suffix = `${cm}x${cm}`;
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = withName ? `System_Kyron_Logo_${suffix}.png` : `System_Kyron_Logo_Solo_${suffix}.png`;
    link.click();

    toast({
      title: "DESCARGA EXITOSA",
      description: withName ? `Logo ${suffix} + nombre descargado` : `Logo ${suffix} solo descargado`,
    });
  };

  const handleDownloadRes = async (width: number, height: number, label: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/logo-kyron-hq.png";

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, width, height);

    const logoSize = Math.min(width, height) * 0.35;
    const lx = (width - logoSize) / 2;
    const ly = height * 0.2;
    ctx.drawImage(img, lx, ly, logoSize, logoSize);

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillStyle = "#ffffff";
    const fontSize = Math.min(width, height) * 0.055;
    ctx.font = `bold ${fontSize}px 'Inter', 'Segoe UI', Arial, sans-serif`;
    ctx.fillText("SYSTEM KYRON", width / 2, ly + logoSize + fontSize * 0.5);

    const subSize = fontSize * 0.4;
    ctx.font = `${subSize}px 'Inter', 'Segoe UI', Arial, sans-serif`;
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText("Tu ecosistema operativo", width / 2, ly + logoSize + fontSize * 0.5 + fontSize * 1.1);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `System_Kyron_${label}.png`;
    link.click();

    toast({
      title: "DESCARGA EXITOSA",
      description: `Logo descargado en ${label} (${width}×${height})`,
    });
  };

  if (!isMounted) return null;

  return (
    <PasswordGate 
        title="Activos de Marca" 
        description="Centro de descarga de logos y manual de identidad. Acceso restringido con clave Carlos123."
    >
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
          <div ref={logoRef} className="flex flex-col items-center gap-12 p-16 bg-[#020617] rounded-[3rem] border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0,transparent_60%)] pointer-events-none" />
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 blur-[150px] rounded-full scale-150" />
              <div className="relative p-12 bg-card/40 border border-border rounded-2xl backdrop-blur-sm shadow-lg">
                <Logo className="h-64 w-64 md:h-[480px] md:w-[480px] drop-shadow-glow" />
              </div>
            </div>

            <div className="text-center space-y-6 relative z-10">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-glow">
                <ShieldCheck className="h-4 w-4" /> IDENTIDAD CORPORATIVA PROTEGIDA
              </div>
              
              <div className="space-y-4 max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase italic leading-none">
                  SYSTEM <span className="text-primary">KYRON</span>
                </h1>
                <p className="text-sm md:text-lg font-medium text-zinc-400 tracking-wider">
                  Tu ecosistema operativo: tus líneas, tu contabilidad y cero complicaciones.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-10 no-print max-w-4xl">
            <Button variant="ghost" asChild className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest text-foreground/40 hover:text-foreground hover:bg-card border border-border transition-all">
              <Link href="/"><ChevronLeft className="mr-3 h-4 w-4" /> VOLVER</Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 shadow-glow"
              onClick={() => handleDownloadImage('png')}
            >
              <FileImage className="mr-3 h-4 w-4" /> PNG
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-secondary/30 bg-secondary/5 text-secondary hover:bg-secondary/10 shadow-glow-secondary"
              onClick={() => handleDownloadImage('jpeg')}
            >
              <FileImage className="mr-3 h-4 w-4" /> JPG
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-border bg-card/50 text-foreground hover:bg-card"
              onClick={handleDownloadPDF}
            >
              <FileText className="mr-3 h-4 w-4" /> PDF
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-cyan-500/30 bg-cyan-500/5 text-cyan-400 hover:bg-cyan-500/10 shadow-glow"
              onClick={() => handleDownloadRes(1920, 1080, "HD")}
            >
              <Monitor className="mr-3 h-4 w-4" /> HD
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-purple-500/30 bg-purple-500/5 text-purple-400 hover:bg-purple-500/10 shadow-glow"
              onClick={() => handleDownloadRes(3840, 2160, "4K")}
            >
              <Tv className="mr-3 h-4 w-4" /> 4K
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-orange-500/30 bg-orange-500/5 text-orange-400 hover:bg-orange-500/10 shadow-glow"
              onClick={() => {
                const link = document.createElement("a");
                link.href = "/images/logo-kyron.svg";
                link.download = "System_Kyron_Logo.svg";
                link.click();
                toast({ title: "DESCARGA EXITOSA", description: "Logo descargado en formato SVG (vector)" });
              }}
            >
              <Code className="mr-3 h-4 w-4" /> SVG
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-green-500/30 bg-green-500/5 text-green-500 hover:bg-green-500/10 shadow-glow"
              onClick={() => handleDownloadCM(4, true)}
            >
              <Scale className="mr-3 h-4 w-4" /> 4×4 + NOMBRE
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-sky-500/30 bg-sky-500/5 text-sky-400 hover:bg-sky-500/10 shadow-glow"
              onClick={() => handleDownloadCM(4, false)}
            >
              <FileImage className="mr-3 h-4 w-4" /> 4×4 SOLO
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-green-600/30 bg-green-600/5 text-green-600 hover:bg-green-600/10 shadow-glow"
              onClick={() => handleDownloadCM(5, true)}
            >
              <Scale className="mr-3 h-4 w-4" /> 5×5 + NOMBRE
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-cyan-600/30 bg-cyan-600/5 text-cyan-600 hover:bg-cyan-600/10 shadow-glow"
              onClick={() => handleDownloadCM(5, false)}
            >
              <FileImage className="mr-3 h-4 w-4" /> 5×5 SOLO
            </Button>

            <Button 
              className="btn-3d-primary h-14 px-10 rounded-2xl text-[10px] font-semibold uppercase tracking-widest shadow-lg"
              onClick={() => window.print()}
            >
              <Camera className="mr-3 h-4 w-4" /> CAPTURAR
            </Button>
          </div>
        </motion.div>

        <div className="absolute bottom-10 flex items-center gap-8 text-[10px] font-semibold uppercase tracking-wider text-foreground/10 italic">
          <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> Precision Graphics</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Auth: Verified</span>
        </div>
      </div>
    </PasswordGate>
  );
}

