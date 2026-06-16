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

  const handleDownloadPDFCM = async (cm: number, withName: boolean) => {
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

    const jsPDF = (await import("jspdf")).default;
    const pdf = new jsPDF("p", "mm", "a4");
    const pw = pdf.internal.pageSize.getWidth();
    const ph = pdf.internal.pageSize.getHeight();

    const sizeMM = cm * 10;
    const x = (pw - sizeMM) / 2;
    const y = (ph - sizeMM) / 2;

    pdf.addImage(canvas.toDataURL("image/png"), "PNG", x, y, sizeMM, sizeMM);
    const suffix = `${cm}x${cm}`;
    pdf.save(withName ? `System_Kyron_Logo_${suffix}_PDF.pdf` : `System_Kyron_Logo_Solo_${suffix}_PDF.pdf`);

    toast({
      title: "DESCARGA EXITOSA",
      description: `PDF ${suffix} listo para imprimir — calidad 300 DPI`,
    });
  };

  const handleDownloadModPDF = async (modId: string, modName: string, cm: number) => {
    const px = Math.round((cm / 2.54) * 300);
    const canvas = await svgToCanvas(modId, px);
    const jsPDF = (await import("jspdf")).default;
    const pdf = new jsPDF("p", "mm", "a4");
    const sizeMM = cm * 10;
    const x = (pdf.internal.pageSize.getWidth() - sizeMM) / 2;
    const y = (pdf.internal.pageSize.getHeight() - sizeMM) / 2;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", x, y, sizeMM, sizeMM);
    const safeName = modName.replace(/[^a-zA-Z0-9]/g, "_");
    pdf.save(`System_Kyron_${safeName}_${cm}x${cm}.pdf`);
    toast({ title: "DESCARGA EXITOSA", description: `Logo "${modName}" en PDF ${cm}x${cm} — listo para imprimir` });
  };

  const svgToCanvas = async (modId: string, size: number): Promise<HTMLCanvasElement> => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = `/images/module-logos/mod-${modId}.svg`;
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
    });
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, size, size);
    const pad = size * 0.06;
    const logoSize = size - pad * 2;
    ctx.drawImage(img, pad, pad, logoSize, logoSize);
    return canvas;
  };

  const handleDownloadModPNG = async (modId: string, modName: string, px: number, label: string) => {
    const canvas = await svgToCanvas(modId, px);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `System_Kyron_${modName.replace(/[^a-zA-Z0-9]/g, '_')}_${label}.png`;
    link.click();
    toast({ title: "DESCARGA EXITOSA", description: `Logo "${modName}" descargado en PNG ${label}` });
  };

  const handleDownloadAllModPNG = async (px: number, label: string) => {
    const mods = [
      { id: "contabilidad", name: "Contabilidad" },
      { id: "facturacion", name: "Facturación" },
      { id: "nomina", name: "Nómina & RRHH" },
      { id: "legal", name: "Legal" },
      { id: "marketing", name: "Marketing" },
      { id: "telecom", name: "Telecomunicaciones" },
      { id: "it", name: "IT & Seguridad" },
      { id: "socios", name: "Socios" },
      { id: "sostenibilidad", name: "Sostenibilidad" },
      { id: "planificacion", name: "Planificación" },
      { id: "ia", name: "IA & Automatización" },
      { id: "ciudadano", name: "Portal Ciudadano" },
    ];
    for (const mod of mods) {
      await handleDownloadModPNG(mod.id, mod.name, px, label);
    }
    toast({ title: "DESCARGA MASIVA", description: `12 logos descargados en PNG ${label}` });
  };

  const handleDownloadAllModPDF = async (cm: number) => {
    const mods = [
      { id: "contabilidad", name: "Contabilidad" },
      { id: "facturacion", name: "Facturación" },
      { id: "nomina", name: "Nómina & RRHH" },
      { id: "legal", name: "Legal" },
      { id: "marketing", name: "Marketing" },
      { id: "telecom", name: "Telecomunicaciones" },
      { id: "it", name: "IT & Seguridad" },
      { id: "socios", name: "Socios" },
      { id: "sostenibilidad", name: "Sostenibilidad" },
      { id: "planificacion", name: "Planificación" },
      { id: "ia", name: "IA & Automatización" },
      { id: "ciudadano", name: "Portal Ciudadano" },
    ];

    const jsPDF = (await import("jspdf")).default;
    const pdf = new jsPDF("p", "mm", "a4");
    const sizeMM = cm * 10;
    const x = (pdf.internal.pageSize.getWidth() - sizeMM) / 2;
    const y = (pdf.internal.pageSize.getHeight() - sizeMM) / 2;

    for (let i = 0; i < mods.length; i++) {
      const px = Math.round((cm / 2.54) * 300);
      const canvas = await svgToCanvas(mods[i].id, px);
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", x, y, sizeMM, sizeMM);
      if (i < mods.length - 1) pdf.addPage();
    }

    pdf.save(`System_Kyron_Todos_Los_Modulos_${cm}x${cm}.pdf`);
    toast({
      title: "DESCARGA EXITOSA",
      description: `PDF con ${mods.length} módulos, cada logo en su propia hoja A4 — ${cm}x${cm}`,
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
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center relative overflow-hidden hud-grid select-none">
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
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-rose-600/30 bg-rose-600/5 text-rose-500 hover:bg-rose-600/10 shadow-glow"
              onClick={() => handleDownloadPDFCM(5, false)}
            >
              <FileText className="mr-3 h-4 w-4" /> 5×5 SOLO PDF
            </Button>

            <Button 
              variant="outline" 
              className="rounded-2xl h-14 px-8 text-[10px] font-semibold uppercase tracking-widest border-rose-500/30 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10 shadow-glow"
              onClick={() => handleDownloadPDFCM(5, true)}
            >
              <FileText className="mr-3 h-4 w-4" /> 5×5 + NOMBRE PDF
            </Button>

            <Button 
              className="btn-3d-primary h-14 px-10 rounded-2xl text-[10px] font-semibold uppercase tracking-widest shadow-lg"
              onClick={() => window.print()}
            >
              <Camera className="mr-3 h-4 w-4" /> CAPTURAR
            </Button>
          </div>

          {/* Module Logos Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-5xl pt-16"
          >
            <div className="text-center mb-10 space-y-3">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-[10px] font-black text-violet-400 uppercase tracking-[0.15em]">LOGOS POR MÓDULO</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-foreground">
                Identidad Visual —{" "}
                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Cada Módulo, Su Marca</span>
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                Logos SVG vectoriales + PDF 5×5 listo para imprimir. Haz clic en el SVG para descargar vector, o en PDF para impresión milimétrica.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => handleDownloadAllModPDF(5)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600/90 to-rose-600/90 hover:from-violet-600 hover:to-rose-600 text-white font-bold uppercase text-[10px] tracking-widest transition-all shadow-lg"
                >
                  <FileText className="h-4 w-4" />                   DESCARGAR TODOS LOS MÓDULOS EN PDF
                </button>
                <button
                  onClick={() => handleDownloadAllModPNG(512, "512px")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600/90 to-orange-600/90 hover:from-amber-600 hover:to-orange-600 text-white font-bold uppercase text-[10px] tracking-widest transition-all shadow-lg ml-3"
                >
                  <FileImage className="h-4 w-4" /> DESCARGAR TODOS EN PNG 512px
                </button>
                <button
                  onClick={() => handleDownloadAllModPNG(2048, "2048px")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600/90 to-indigo-600/90 hover:from-sky-600 hover:to-indigo-600 text-white font-bold uppercase text-[10px] tracking-widest transition-all shadow-lg ml-3"
                >
                  <FileImage className="h-4 w-4" /> DESCARGAR TODOS EN PNG 2048px
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {[
                { id: "contabilidad", name: "Contabilidad", color: "border-cyan-500/30 bg-cyan-500/5" },
                { id: "facturacion", name: "Facturación", color: "border-amber-500/30 bg-amber-500/5" },
                { id: "nomina", name: "Nómina & RRHH", color: "border-emerald-500/30 bg-emerald-500/5" },
                { id: "legal", name: "Legal", color: "border-rose-500/30 bg-rose-500/5" },
                { id: "marketing", name: "Marketing", color: "border-fuchsia-500/30 bg-fuchsia-500/5" },
                { id: "telecom", name: "Telecomunicaciones", color: "border-teal-500/30 bg-teal-500/5" },
                { id: "it", name: "IT & Seguridad", color: "border-slate-500/30 bg-slate-500/5" },
                { id: "socios", name: "Socios", color: "border-blue-500/30 bg-blue-500/5" },
                { id: "sostenibilidad", name: "Sostenibilidad", color: "border-green-500/30 bg-green-500/5" },
                { id: "planificacion", name: "Planificación", color: "border-orange-500/30 bg-orange-500/5" },
                { id: "ia", name: "IA & Automatización", color: "border-purple-500/30 bg-purple-500/5" },
                { id: "ciudadano", name: "Portal Ciudadano", color: "border-sky-500/30 bg-sky-500/5" },
              ].map(mod => (
                <div key={mod.id} className={`group relative p-5 rounded-2xl border ${mod.color} bg-card/30 hover:bg-card/60 transition-all`}>
                  <div className="h-16 w-16 mx-auto mb-3 text-foreground pointer-events-none">
                    <object data={`/images/module-logos/mod-${mod.id}.svg`} type="image/svg+xml" className="w-full h-full" style={{ colorScheme: "auto" }}>?</object>
                  </div>
                  <p className="text-[10px] font-bold text-center text-foreground uppercase tracking-wider mb-2">{mod.name}</p>
                  <div className="flex flex-wrap justify-center gap-1">
                    <button
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = `/images/module-logos/mod-${mod.id}.svg`;
                        link.download = `System_Kyron_${mod.name.replace(/[^a-zA-Z0-9]/g, '_')}.svg`;
                        link.click();
                        toast({ title: "DESCARGA EXITOSA", description: `Logo "${mod.name}" descargado en SVG` });
                      }}
                      className="px-2 py-1 rounded-lg text-[7px] font-bold uppercase tracking-widest bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-all"
                    >SVG</button>
                    <button
                      onClick={() => handleDownloadModPDF(mod.id, mod.name, 5)}
                      className="px-2 py-1 rounded-lg text-[7px] font-bold uppercase tracking-widest bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
                    >PDF</button>
                    <button
                      onClick={() => handleDownloadModPNG(mod.id, mod.name, 512, "512px")}
                      className="px-2 py-1 rounded-lg text-[7px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all"
                    >PNG</button>
                    <button
                      onClick={() => handleDownloadModPNG(mod.id, mod.name, 2048, "2048px")}
                      className="px-2 py-1 rounded-lg text-[7px] font-bold uppercase tracking-widest bg-sky-500/10 text-sky-400 border border-sky-500/20 hover:bg-sky-500/20 transition-all"
                    >HD</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <div className="relative mt-20 mb-10 flex items-center gap-8 text-[10px] font-semibold uppercase tracking-wider text-foreground/10 italic">
          <span className="flex items-center gap-2"><Sparkles className="h-3 w-3" /> Precision Graphics</span>
          <span className="flex items-center gap-2"><ShieldCheck className="h-3 w-3" /> Auth: Verified</span>
        </div>
      </div>
    </PasswordGate>
  );
}

