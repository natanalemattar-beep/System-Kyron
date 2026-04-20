'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ArrowRight, UserCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { useAuth } from '@/lib/auth/context';
import { cn } from '@/lib/utils';

export function ProfileCompletionNotice() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(true);
  
  // Check if critical fields are missing (those we removed from registration)
  const isProfileIncomplete = user?.tipo === 'natural' && (
    !user.genero || 
    !user.estado_civil || 
    !user.estado_residencia ||
    !user.direccion
  );

  if (!isProfileIncomplete || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative group h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/10 to-transparent blur-xl -z-10 group-hover:bg-amber-500/30 transition-all duration-700" />
        
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
              <AlertCircle className="h-6 w-6 text-amber-500 animate-pulse" />
            </div>
            
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-amber-200 uppercase tracking-widest">Perfil Incompleto</h3>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-amber-500/40 hover:text-amber-500 transition-colors p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-amber-200/60 font-medium leading-relaxed">
                Para acceder a todos los beneficios de <span className="text-amber-400 font-bold">System Kyron</span>, incluyendo el ID Digital 3.0 y trámites legales, necesitamos completar tus datos de residencia y perfil.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <Button asChild size="sm" className="h-9 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-amber-500/20">
                  <Link href="/seguridad-personal">
                    Completar Perfil <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/10">
                  <UserCheck className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-[10px] font-bold text-amber-500/80 uppercase">Solo toma 2 minutos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
