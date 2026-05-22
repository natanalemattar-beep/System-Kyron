'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, Bot, BrainCircuit, Shield, Calculator, Users, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from '@/navigation';

const DASHBOARD_CONTEXTS: Record<string, { name: string; icon: any; systemPrompt: string; color: string }> = {
  'dashboard-empresa': {
    name: 'Kyron Contable',
    icon: Calculator,
    systemPrompt: 'Eres Kyron Contable, asistente especializado en contabilidad venezolana, SENIAT, VEN-NIF, nómina LOTTT, y gestión empresarial. Responde con precisión técnica y referencias legales.',
    color: 'from-emerald-600 to-teal-600',
  },
  'dashboard': {
    name: 'Kyron Personal',
    icon: Bot,
    systemPrompt: 'Eres Kyron Personal, asistente para ciudadanos venezolanos. Ayudas con trámites civiles, documentos, salud, y gestión personal.',
    color: 'from-sky-600 to-blue-600',
  },
  'kyron-chat': {
    name: 'Kyron Core',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core, la IA central del ecosistema System Kyron. Tienes conocimiento amplio sobre todos los módulos: contabilidad, legal, RRHH, telecom, ventas, sostenibilidad.',
    color: 'from-violet-600 to-purple-600',
  },
  'rrhh': {
    name: 'Kyron RRHH',
    icon: Users,
    systemPrompt: 'Eres Kyron RRHH, especializado en gestión de talento humano, nómina LOTTT, LOPCYMAT, prestaciones sociales, y desarrollo organizacional.',
    color: 'from-orange-600 to-amber-600',
  },
  'legal': {
    name: 'Kyron Legal',
    icon: Shield,
    systemPrompt: 'Eres Kyron Legal, consultor jurídico especializado en legislación venezolana, contratos, SAREN, SAPI, y cumplimiento normativo.',
    color: 'from-purple-600 to-indigo-600',
  },
  'ventas': {
    name: 'Kyron Ventas',
    icon: Megaphone,
    systemPrompt: 'Eres Kyron Ventas, experto en estrategias comerciales, CRM, marketing digital, embudos de venta, y fidelización de clientes.',
    color: 'from-rose-600 to-pink-600',
  },
};

function getDashboardContext(pathname: string) {
  for (const [path, ctx] of Object.entries(DASHBOARD_CONTEXTS)) {
    if (pathname.includes(path)) return { key: path, ...ctx };
  }
  return { key: 'default', ...DASHBOARD_CONTEXTS['kyron-chat'] };
}

export function AIChatButton() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const context = getDashboardContext(pathname);
  const ContextIcon = context.icon;

  useEffect(() => {
    setMessages([{
      role: 'ai',
      content: `¡Hola! Soy ${context.name}. ${context.systemPrompt.split('.')[0]}. ¿En qué puedo ayudarte?`
    }]);
  }, [context.key]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input, 
          context: context.key,
          systemPrompt: context.systemPrompt,
          history: messages.map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content }))
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { role: 'ai', content: data.response }]);
      } else {
        const errorData = await res.json().catch(() => ({}));
        setMessages(prev => [...prev, { role: 'ai', content: errorData.error || 'Lo siento, tuve un problema técnico. Por favor, intenta de nuevo.' }]);
      }
    } catch (error: any) {
      setMessages(prev => [...prev, { role: 'ai', content: error?.message || 'Error de conexión. Revisa tu internet.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full p-0.5 shadow-lg group",
          `bg-gradient-to-br ${context.color}`
        )}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/20 transition-all group-hover:bg-zinc-950/60">
          {isOpen ? <X className="h-6 w-6 text-white" /> : <ContextIcon className="h-6 w-6 text-white" />}
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] max-h-[600px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col bg-zinc-950/90 backdrop-blur-3xl"
          >
            {/* Header */}
            <div className={cn("p-4 bg-gradient-to-r border-b border-white/10 flex items-center justify-between", context.color, "bg-opacity-20")}>
              <div className="flex items-center gap-3">
                <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center bg-gradient-to-br", context.color)}>
                  <ContextIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{context.name}</h3>
                  <p className="text-[9px] text-white/50 font-medium uppercase tracking-wider">Asistente especializado</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[420px]">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}
                >
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-sm" 
                      : "bg-white/10 text-white/90 backdrop-blur-md border border-white/5 rounded-tl-sm"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm backdrop-blur-md border border-white/5">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-1.5 w-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-1.5 w-1.5 bg-white/40 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white/5 border-t border-white/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pregúntame algo..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className="h-10 w-10 rounded-xl bg-primary hover:bg-primary/90 p-0 disabled:opacity-50"
                >
                  <Send className="h-4 w-4 text-white" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
