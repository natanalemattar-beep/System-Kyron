'use client';

import { Button } from '@/components/ui/button';
import { Compass, Home, Search, Ghost } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from '@/navigation';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#030711] overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 hud-grid opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-10 relative z-10"
      >
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <motion.div
            animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
          />
          <div className="relative h-24 w-24 rounded-[2.5rem] bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl">
            <Compass className="h-12 w-12 text-primary animate-bounce" />
          </div>
          <motion.div 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 p-2 bg-slate-800 rounded-lg border border-white/10"
          >
            <Ghost className="h-4 w-4 text-zinc-500" />
          </motion.div>
        </div>

        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.3em] text-primary font-tech">
            Error 404 · Fuera de Rango
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase font-impact italic leading-none">
            Coordenadas <span className="text-primary italic">No Encontradas</span>
          </h1>
          <p className="text-sm text-zinc-400 font-medium leading-relaxed px-4">
            Has navegado hasta un sector no mapeado del ecosistema Kyron. Es posible que el recurso haya sido reubicado o que tu firma digital no tenga acceso a este nodo.
          </p>
        </div>

        <div className="flex flex-col gap-4 max-w-xs mx-auto">
          <Button asChild className="h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest bg-white text-slate-950 hover:bg-zinc-200 shadow-xl shadow-white/5 group">
            <Link href="/">
              <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" /> Regresar al Centro de Mando
            </Link>
          </Button>
          <Button variant="ghost" className="h-12 rounded-2xl font-bold text-[11px] uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5">
            <Search className="mr-2 h-4 w-4" /> Consultar al Nexo de IA
          </Button>
        </div>

        <div className="pt-12 text-[9px] font-black uppercase tracking-[0.4em] text-white/20 font-tech">
          System Kyron Identity Service · 2026
        </div>
      </motion.div>
    </div>
  );
}
