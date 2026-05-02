'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send, Sparkles, Lock, CircleCheck, ArrowRight,
  MessageSquare, Zap, Shield, Bot, ChevronRight, ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';

const MAX_TRIAL = 3;

const SUGGESTIONS = [
  '¿Cuánto IVA debo retener a un contribuyente especial?',
  '¿Cómo calculo las prestaciones sociales según la LOTTT?',
  '¿Qué es el IGTF y a qué tasa aplica en Venezuela?',
  '¿Cuáles son los aportes patronales al IVSS?',
];

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  responseTime?: number;
}

export default function PruebaGratuitaPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(MAX_TRIAL);
  const [limitReached, setLimitReached] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text?: string) {
    const content = (text ?? input).trim();
    if (!content || loading || limitReached) return;

    setInput('');
    setError(null);
    setLoading(true);
    setMessages(prev => [...prev, { role: 'user', content }]);

    try {
      const res = await fetch('/api/ai/kyron-chat-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      const data = await res.json();

      if (res.status === 429 || data.limitReached) {
        setLimitReached(true);
        setRemaining(0);
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: '🔒 Has alcanzado el límite de 3 consultas gratuitas. Regístrate para acceso ilimitado a Kyron IA y a todos los módulos del ecosistema.',
          },
        ]);
        return;
      }

      if (!res.ok) {
        setError(data.error || 'Error al procesar tu consulta. Intenta de nuevo.');
        setMessages(prev => prev.slice(0, -1));
        return;
      }

      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.text, responseTime: data.responseTime },
      ]);

      const newRemaining = data.remaining ?? 0;
      setRemaining(newRemaining);
      if (newRemaining <= 0) setLimitReached(true);
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.');
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  const used = MAX_TRIAL - remaining;
  const progressPct = (used / MAX_TRIAL) * 100;

  return (
    <div className="min-h-screen bg-[#060a14] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#060a14]/90 backdrop-blur-xl px-4 sm:px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-xl h-9 w-9 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] text-foreground/60 hover:text-foreground shrink-0"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Link href="/" className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground leading-none">System Kyron</p>
                <p className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.15em] leading-none mt-0.5">Prueba Gratuita</p>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.06]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              3 Consultas Gratis
            </span>
            <Button
              asChild
              size="sm"
              className="kyron-gradient-bg text-white text-[11px] font-bold tracking-wide h-8 px-4 rounded-xl border-0 shadow-md"
            >
              <Link href="/login">
                Acceso Completo <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6 sm:py-10 gap-6">
        {/* Hero */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/20 bg-violet-500/[0.06]">
            <Bot className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/60">Kyron Chat IA · Demo</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Consulta la IA empresarial{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              de Venezuela
            </span>
          </h1>
          <p className="text-sm text-muted-foreground/60 max-w-md mx-auto leading-relaxed">
            <strong className="text-foreground/80">{MAX_TRIAL} consultas gratuitas</strong> sobre contabilidad VEN-NIF, SENIAT, LOTTT, RRHH o legal venezolano. Sin registro.
          </p>
        </motion.div>

        {/* Usage progress */}
        <motion.div
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2.5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
              Consultas utilizadas
            </span>
            <span
              className={cn(
                'text-[11px] font-black uppercase tracking-[0.1em]',
                remaining > 1 ? 'text-emerald-400' : remaining === 1 ? 'text-yellow-400' : 'text-red-400'
              )}
            >
              {used} / {MAX_TRIAL}
            </span>
          </div>
          <div className="h-2 bg-white/[0.04] rounded-full overflow-hidden">
            <motion.div
              className={cn(
                'h-full rounded-full',
                remaining > 1
                  ? 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                  : remaining === 1
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-400'
                  : 'bg-gradient-to-r from-red-500 to-rose-400'
              )}
              initial={{ width: '0%' }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground/40 leading-relaxed">
            {remaining > 0
              ? `Te ${remaining === 1 ? 'queda' : 'quedan'} ${remaining} consulta${remaining !== 1 ? 's' : ''} gratuita${remaining !== 1 ? 's' : ''}.`
              : 'Límite alcanzado — regístrate para acceso ilimitado.'}
            {remaining <= 1 && remaining > 0 && (
              <span className="text-yellow-400 ml-1">¡Aprovéchala bien!</span>
            )}
          </p>
        </motion.div>

        {/* Suggested queries shown only before first message */}
        {messages.length === 0 && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/35 text-center">
              Prueba preguntando
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTIONS.map((q, i) => (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => send(q)}
                  disabled={loading}
                  className="text-left text-sm text-foreground/60 hover:text-foreground/90 bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06] hover:border-cyan-500/20 rounded-xl px-4 py-3 transition-all duration-300 group disabled:opacity-40 disabled:cursor-not-allowed"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <MessageSquare className="h-3.5 w-3.5 text-cyan-400/50 group-hover:text-cyan-400 inline mr-2 mb-0.5 transition-colors" />
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Chat messages */}
        {messages.length > 0 && (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={cn('flex items-start gap-2.5', msg.role === 'user' ? 'justify-end' : 'justify-start')}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.role === 'assistant' && (
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20 mt-0.5">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={cn(
                      'max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                      msg.role === 'user'
                        ? 'bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-tr-sm shadow-lg shadow-cyan-500/10'
                        : 'bg-white/[0.04] border border-white/[0.08] text-foreground/80 rounded-tl-sm'
                    )}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.responseTime !== undefined && (
                      <p className="text-[9px] mt-2 opacity-40 font-medium flex items-center gap-1">
                        <Zap className="h-2.5 w-2.5" />
                        {msg.responseTime}ms
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {loading && (
              <motion.div
                className="flex items-start gap-2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg">
                  <Sparkles className="h-4 w-4 text-white animate-pulse" />
                </div>
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1.5 items-center h-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '160ms' }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '320ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Error message */}
        {error && (
          <motion.p
            className="text-sm text-red-400 text-center font-medium bg-red-500/[0.06] border border-red-500/20 rounded-xl px-4 py-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}

        {/* Input area or Limit reached CTA */}
        {!limitReached ? (
          <motion.form
            onSubmit={e => { e.preventDefault(); send(); }}
            className="flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Pregunta sobre IVA, LOTTT, SENIAT, nómina..."
              disabled={loading}
              maxLength={500}
              className="flex-1 bg-white/[0.04] border border-white/[0.08] focus:border-cyan-500/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 outline-none transition-colors disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={loading || !input.trim()}
              className="kyron-gradient-bg text-white border-0 rounded-xl h-auto px-4 py-3 shrink-0 shadow-md disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </motion.form>
        ) : (
          <motion.div
            className="rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/[0.08] to-cyan-500/[0.04] p-6 sm:p-8 text-center space-y-5"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-600 flex items-center justify-center mx-auto shadow-xl shadow-violet-500/20">
              <Lock className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-1.5">
              <p className="text-xl font-black text-foreground tracking-tight">Prueba completada</p>
              <p className="text-sm text-muted-foreground/60 max-w-sm mx-auto leading-relaxed">
                Regístrate gratis para acceso ilimitado a Kyron IA, todos los módulos contables, fiscal, RRHH y legal.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40">
              {['Chat ilimitado', 'Kyron Fiscal', 'Kyron Legal', 'Kyron RRHH', 'Módulos VEN-NIF'].map(f => (
                <span key={f} className="flex items-center gap-1.5">
                  <CircleCheck className="h-3 w-3 text-emerald-400" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild className="kyron-gradient-bg text-white border-0 rounded-xl font-bold tracking-wide h-12 px-8 shadow-lg">
                <Link href="/login">
                  Registrarse Gratis <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-xl border-white/[0.1] bg-white/[0.02] text-foreground/70 hover:bg-white/[0.05] h-12 px-8">
                <Link href="/prueba-velocidad">
                  Probar Velocidad <Zap className="h-4 w-4 ml-2 text-yellow-400" />
                </Link>
              </Button>
            </div>
          </motion.div>
        )}

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/25 pb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-emerald-400/40" />
            Sin tarjeta de crédito
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-3 w-3 text-cyan-400/40" />
            Respuesta en segundos
          </span>
          <span className="flex items-center gap-1.5">
            <CircleCheck className="h-3 w-3 text-violet-400/40" />
            VEN-NIF · SENIAT · LOTTT
          </span>
        </motion.div>
      </main>
    </div>
  );
}
