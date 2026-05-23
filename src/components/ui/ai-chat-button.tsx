'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from '@/navigation';
import { MarkdownRenderer } from './markdown-renderer';

const DASHBOARD_CONTEXTS: Record<string, { name: string; icon: any; systemPrompt: string; color: string }> = {
  'kyron-chat': {
    name: 'Kyron Core',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core, la IA central del ecosistema System Kyron. Tienes conocimiento AMPLIO sobre TODOS los módulos. Eres el orquestador principal que conecta cada especialidad.',
    color: 'from-violet-600 to-purple-600',
  },
  'dashboard-asesoria-contable': {
    name: 'Kyron Core Empresarial',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core Empresarial, el núcleo inteligente del portal de Asesoría Contable. Cubres TODAS las áreas del portal empresarial:\n\n1. CONTABILIDAD Y FISCAL: SENIAT, VEN-NIF, IVA, ISLR, IGTF, libros contables, estados financieros, plan de cuentas, declaraciones, facturación fiscal, retenciones, tributos municipales, cálculo de UT.\n2. RRHH Y NÓMINA: LOTTT, LOPCYMAT, prestaciones sociales, nómina, contratos laborales, certificados, bienestar laboral, reclutamiento, viáticos, IVSS, FAOV, INCES.\n3. MARKETING Y VENTAS: CRM, estrategias comerciales, embudos de venta, campañas, redes sociales, email marketing, fidelización, análisis de rentabilidad.\n4. LEGAL: contratos, SAREN, SAPI, permisos, poderes, actas, cumplimiento normativo.\n\nRespondes de forma CONCISA y PROFESIONAL en español. Usa formato markdown (**negrita**, *cursiva*, `código`, listas).',
    color: 'from-emerald-600 to-teal-600',
  },
  'dashboard': {
    name: 'Kyron Core Personal',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core Personal, el núcleo inteligente para ciudadanos venezolanos. Respondes sobre: trámites civiles (SAIME, SAREN), documentos personales, salud, gestión personal, finanzas personales, presupuesto, y cualquier consulta sobre los servicios de System Kyron para personas naturales. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-sky-600 to-blue-600',
  },
  'legal': {
    name: 'Kyron Core Jurídico',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core Jurídico, el núcleo inteligente del Escritorio Jurídico. Respondes sobre: contratos, SAREN, SAPI, litigios, permisos, poderes, cumplimiento normativo, actas, documentos legales, y cualquier consulta jurídica empresarial venezolana. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-purple-600 to-indigo-600',
  },
  'telecom': {
    name: 'Kyron Core Telecom',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core Telecom, el núcleo inteligente de telecomunicaciones. Respondes sobre: venta de líneas, internet empresarial, eSIM, roaming, portabilidad, MDM corporativo, infraestructura de red, planes, diagnóstico de red, y cualquier consulta técnica de telecomunicaciones. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-teal-600 to-cyan-600',
  },
  'sostenibilidad': {
    name: 'Kyron Core ECO',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core ECO, el núcleo inteligente de sostenibilidad. Respondes sobre: sostenibilidad empresarial, eco-créditos, huella de carbono, impacto ambiental, certificaciones verdes, mercado de eco-créditos, sector energético, y cualquier consulta ambiental. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-green-600 to-emerald-600',
  },
  'socios': {
    name: 'Kyron Core Socios',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core Socios, el núcleo inteligente de gestión de socios. Respondes sobre: directorio corporativo, socios comerciales, alianzas, convenios, network empresarial, y cualquier consulta sobre relaciones corporativas. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-blue-600 to-indigo-600',
  },
  'informatica': {
    name: 'Kyron Core IT',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Core IT, el núcleo inteligente de informática. Respondes sobre: infraestructura TI, servidores, redes, cloud, helpdesk, licencias de software, ciberseguridad, respaldos, monitoreo, dispositivos, y cualquier consulta técnica de IT. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-slate-600 to-zinc-600',
  },
  'soporte': {
    name: 'Kyron Soporte',
    icon: BrainCircuit,
    systemPrompt: 'Eres Kyron Soporte, el asistente de soporte técnico de System Kyron. Respondes sobre: problemas técnicos, errores del sistema, consultas de uso, guías de solución, actualizaciones, mantenimiento y asistencia al usuario. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-indigo-600 to-blue-600',
  },
};

function getDashboardContext(pathname: string) {
  for (const [path, ctx] of Object.entries(DASHBOARD_CONTEXTS)) {
    if (pathname.includes(path)) return { key: path, ...ctx };
  }
  return { key: 'default', ...DASHBOARD_CONTEXTS['kyron-chat'] };
}

export function AIChatButton({ contextKey }: { contextKey?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const context = contextKey 
    ? { key: contextKey, ...DASHBOARD_CONTEXTS[contextKey] ?? DASHBOARD_CONTEXTS['kyron-chat'] } 
    : getDashboardContext(pathname);
  const ContextIcon = context.icon;

  useEffect(() => {
    setMessages([{
      role: 'ai',
      content: `¡Hola! Soy **${context.name}**. ¿En qué puedo ayudarte?`
    }]);
  }, [context.key]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.slice(1).map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content }));

    try {
      const res = await fetch('/api/ai/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: trimmed,
          context: context.key,
          systemPrompt: context.systemPrompt,
          history,
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
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full p-0.5 shadow-2xl group",
          `bg-gradient-to-br ${context.color}`
        )}
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
          </span>
        )}
        <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950/80 backdrop-blur-xl border border-white/20 transition-all group-hover:bg-zinc-950/60 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
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
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className={cn(
              "fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] max-h-[600px] rounded-3xl overflow-hidden flex flex-col",
              "shadow-[0_0_80px_rgba(0,0,0,0.6)] shadow-black/50",
              "border border-white/10",
              "bg-zinc-950/95 backdrop-blur-3xl"
            )}
          >
            {/* Ambient glow behind header */}
            <div className={cn("absolute top-0 left-0 right-0 h-24 opacity-20 blur-3xl pointer-events-none", context.color)} />

            {/* Header */}
            <div className={cn("relative p-4 bg-gradient-to-r border-b border-white/5 flex items-center justify-between", context.color, "bg-opacity-10")}>
              <div className="flex items-center gap-3">
                <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-lg", context.color)}>
                  <ContextIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{context.name}</h3>
                  <p className="text-[8px] text-white/40 font-black uppercase tracking-[0.2em]">Asistente Especializado</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-white/10 text-white/40 hover:text-white transition-all group">
                <X className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[420px] scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 15 : -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  key={i}
                  className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}
                >
                  {msg.role === 'ai' && (
                    <div className={cn("h-6 w-6 rounded-lg flex items-center justify-center bg-gradient-to-br mr-2 mt-1 shrink-0", context.color, "shadow-lg")}>
                      <ContextIcon className="h-3 w-3 text-white" />
                    </div>
                  )}
                  <div className={cn(
                    "max-w-[88%] p-3.5 rounded-2xl text-[13px] leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-primary text-white rounded-tr-sm shadow-lg shadow-primary/20" 
                      : "bg-white/[0.06] text-white/90 backdrop-blur-md border border-white/[0.06] rounded-tl-sm shadow-lg"
                  )}>
                    {msg.role === 'ai' ? <MarkdownRenderer content={msg.content} /> : msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className={cn("h-6 w-6 rounded-lg flex items-center justify-center bg-gradient-to-br mr-2 mt-1 shrink-0", context.color, "shadow-lg")}>
                    <ContextIcon className="h-3 w-3 text-white" />
                  </div>
                  <div className="bg-white/[0.06] p-3.5 rounded-2xl rounded-tl-sm backdrop-blur-md border border-white/[0.06] shadow-lg">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-white/30 animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 rounded-full bg-white/30 animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 rounded-full bg-white/30 animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3.5 bg-white/[0.03] border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu consulta..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  className={cn(
                    "h-11 w-11 rounded-xl p-0 shrink-0 transition-all",
                    "bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500",
                    "shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40",
                    "disabled:opacity-30 disabled:shadow-none"
                  )}
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
