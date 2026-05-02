'use client';

import { useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home, ShieldAlert, Cpu, Zap, TriangleAlert, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [showFullError, setShowFullError] = useState(false);

  useEffect(() => {
    console.error('Kyron System Interference Detected:', error.message);
    setShowFullError(true);
  }, [error]);

  const handleReset = useCallback(() => {
    setIsRetrying(true);
    reset();
    setTimeout(() => setIsRetrying(false), 1000);
  }, [reset]);

  // Optionally show a quick toast before full error, but here we just go straight to full error
  // so the user isn't stuck on a black screen.
  if (!showFullError) {
     return null;
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6 bg-[#030711]/80 backdrop-blur-md rounded-[2.5rem] border border-white/5 m-4 relative overflow-hidden shadow-2xl">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 opacity-[0.03] hud-grid pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center space-y-8 relative z-10"
      >
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 relative">
             <ShieldAlert className="h-10 w-10 text-rose-500" />
             <div className="absolute -top-1 -right-1 h-4 w-4 bg-rose-500 rounded-full animate-ping" />
          </div>
          
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            Anomalía en <span className="text-rose-500">el Sistema</span>
          </h2>
          <p className="text-slate-400 text-sm mt-3 leading-relaxed">
            Se ha detectado una interferencia persistente en la interfaz. 
            Hemos intentado una autoreparación pero el sistema requiere intervención manual.
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 font-mono text-[10px] text-left">
           <div className="text-rose-500/60 mb-1 font-bold uppercase tracking-widest flex items-center gap-2">
             <Cpu className="h-3 w-3" /> Error Stack Trace
           </div>
           <p className="text-slate-500 line-clamp-2">{error.message}</p>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={handleReset}
            disabled={isRetrying}
            className="flex-1 h-12 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-[11px] uppercase tracking-widest transition-all"
          >
            {isRetrying ? <RefreshCcw className="h-4 w-4 animate-spin mr-2" /> : <Zap className="h-4 w-4 mr-2" />}
            Reiniciar Sistema
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.location.reload()}
            className="h-12 px-6 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-[11px] uppercase tracking-widest"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
        
        <button 
          onClick={() => setShowFullError(false)}
          className="text-[9px] font-bold text-slate-600 uppercase tracking-widest hover:text-white transition-colors"
        >
          Ocultar y Seguir Navegando
        </button>
      </motion.div>
    </div>
  );
}
