
"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { ChevronLeft, ShieldCheck, Zap } from "lucide-react";

export default function IdentidadMarcaPage() {
  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center relative overflow-hidden hud-grid">
      {/* Elementos de Ambientación HUD */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0,transparent_70%)]" />
        <div className="absolute top-10 left-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">
          Identity Node: 2.6.5
        </div>
        <div className="absolute bottom-10 right-10 text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">
          System Kyron • 2026
        </div>
      </div>

      <motion.div 
        className="relative z-10 flex flex-col items-center gap-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative group">
          {/* Resplandor Maestro */}
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full scale-150 animate-pulse" />
          
          {/* Logo en Gran Formato */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative drop-shadow-[0_0_50px_rgba(37,99,235,0.4)]"
          >
            <Logo className="h-64 w-64 md:h-96 md:w-96" />
          </motion.div>
        </div>

        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.5em] text-primary shadow-glow">
            <ShieldCheck className="h-3.5 w-3.5" /> Sello Institucional
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic text-white italic-shadow">
            SYSTEM <span className="text-primary">KYRON</span>
          </h1>
          
          <p className="text-sm md:text-base text-white/40 max-w-lg mx-auto font-bold uppercase tracking-[0.3em] italic">
            El Motor de la Inteligencia Corporativa
          </p>
        </div>

        <motion.div 
          className="flex gap-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button variant="ghost" asChild className="rounded-xl h-12 px-8 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5">
            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4" /> Volver</Link>
          </Button>
          <Button className="btn-3d-primary h-12 px-10 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-glow">
            <Zap className="mr-2 h-4 w-4" /> Activar Protocolo
          </Button>
        </motion.div>
      </motion.div>

      {/* Grid HUD Inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary/10 to-transparent opacity-30 pointer-events-none" />
    </div>
  );
}
