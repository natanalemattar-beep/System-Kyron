'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Loader2, TriangleAlert, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyLinkPage() {
  const router = useRouter();
  const params = useParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Sincronizando con el Nexo de seguridad...');
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const verifiedRef = useRef(false);

  useEffect(() => {
    // Evitar doble ejecución en StrictMode
    if (verifiedRef.current) return;
    
    const verifyToken = async () => {
      const token = params.token;
      if (!token) {
        setStatus('error');
        setMessage('Token de acceso no encontrado.');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setStatus('success');
          setMessage(data.message || 'Identidad verificada exitosamente.');
          verifiedRef.current = true;
          
          // Redirigir según el modo (Registro vs Login)
          setTimeout(() => {
            if (data.registrationMode) {
              router.push(`/es/register?email=${encodeURIComponent(data.email)}&verified=true`);
            } else {
              router.push('/es/dashboard');
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage('No se pudo validar el enlace.');
          setErrorDetails(data.error || 'El enlace puede haber expirado o ya fue utilizado.');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Error de conexión con el servidor.');
        setErrorDetails('Verifica tu conexión a internet e intenta de nuevo.');
      }
    };

    verifyToken();
  }, [params.token, router]);

  return (
    <div className="min-h-screen bg-[#030711] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background HUD Grid */}
      <div className="absolute inset-0 hud-grid opacity-5 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-elite p-10 rounded-[2.5rem] border-white/10 shadow-2xl text-center relative z-10"
      >
        <div className="mb-8 relative mx-auto w-20 h-20 flex items-center justify-center">
          {status === 'loading' && (
            <>
              <div className="absolute inset-0 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
              <Loader2 className="h-8 w-8 text-cyan-500 animate-pulse" />
            </>
          )}
          {status === 'success' && (
            <>
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-16 w-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                <ShieldCheck className="h-8 w-8 text-emerald-500" />
              </div>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-16 w-16 rounded-2xl bg-rose-500/20 flex items-center justify-center border border-rose-500/30">
                <TriangleAlert className="h-8 w-8 text-rose-500" />
              </div>
            </>
          )}
        </div>

        <h1 className="text-2xl font-black text-white uppercase tracking-tighter italic mb-4">
          {status === 'loading' && 'Verificando Acceso'}
          {status === 'success' && 'Identidad Confirmada'}
          {status === 'error' && 'Acceso Denegado'}
        </h1>
        
        <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-8">
          {message}
          {errorDetails && (
            <span className="block mt-2 text-rose-500/60 text-xs italic">{errorDetails}</span>
          )}
        </p>

        {status === 'error' && (
          <div className="flex flex-col gap-3">
            <Button asChild className="h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase text-[10px] tracking-widest transition-all">
              <Link href="/es/login">Reintentar Acceso <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="ghost" className="h-10 text-white/40 hover:text-white transition-colors">
              <Link href="/es"><Home className="mr-2 h-4 w-4" /> Volver al Inicio</Link>
            </Button>
          </div>
        )}

        {status === 'success' && (
          <div className="flex items-center justify-center gap-2 text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] animate-pulse">
            <div className="h-1 w-1 rounded-full bg-emerald-500" />
            Redirigiendo al Dashboard...
          </div>
        )}
      </motion.div>

      {/* Decorative footer */}
      <div className="mt-8 flex items-center gap-3 opacity-20 pointer-events-none">
        <div className="h-px w-8 bg-white" />
        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Protocolo Kyron Alpha</span>
        <div className="h-px w-8 bg-white" />
      </div>
    </div>
  );
}
