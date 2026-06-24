'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, BrainCircuit, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModuleLogo } from '@/components/module-logo';
import { cn } from '@/lib/utils';
import { usePathname } from '@/navigation';
import { MarkdownRenderer } from './markdown-renderer';

const DASHBOARD_CONTEXTS: Record<string, { name: string; icon: any; logo: string; systemPrompt: string; color: string }> = {
  'kyron-chat': {
    name: 'Kyron Core',
    icon: BrainCircuit,
    logo: '/images/module-logos/Kyron Shield.jpg',
    systemPrompt: 'Eres Kyron Core, la IA del ecosistema System Kyron. Responde SOLO sobre el módulo en el que te encuentras. No menciones otros módulos. Si te preguntan sobre otro módulo, responde: "Esa consulta pertenece a otro módulo. Por favor accede a ese módulo para recibir asistencia especializada."',
    color: 'from-violet-600 to-purple-600',
  },
  'kyron-empresas': {
    name: 'Kyron Empresas',
    icon: BrainCircuit,
    logo: '/images/module-logos/contabilidad.jpg',
    systemPrompt: 'Eres Kyron Empresas, la IA unificada del ecosistema System Kyron para empresas. Tienes conocimiento EXPERTO en los siguientes módulos empresariales:\n\n1. CONTABILIDAD VEN-NIF Y FISCAL: plan de cuentas, libros contables, estados financieros, partida doble, cierre contable, conciliación bancaria, cuentas por cobrar/pagar. SENIAT: IVA (declaraciones, retenciones, crédito fiscal, débito fiscal), ISLR (declaración definitiva, anticipos, retenciones), IGTF (cálculo, exenciones), facturación fiscal (documentos electrónicos, NFC), retenciones de IVA/ISLR. Tributos municipales. Certificación Gaceta 6952.\n\n2. RRHH Y NÓMINA LOTTT: cálculo de nómina, prestaciones sociales (antigüedad, intereses), utilidades, vacaciones, bono vacacional, horas extras, días feriados. Seguridad Social (IVSS, FAOV, INCES). LOPCYMAT. Contratos laborales. Reclutamiento y selección. Control de asistencia. Viáticos.\n\n3. VENTAS, MARKETING Y CRM: gestión de clientes, leads, oportunidades, pipeline de ventas, embudos de conversión. Campañas de marketing, email marketing, redes sociales, automatización comercial, segmentación. Análisis de rentabilidad, fidelización, KPIs comerciales.\n\nREGLAS:\n- Responde sobre CUALQUIERA de los 3 módulos (Contabilidad, RRHH, Ventas) con total libertad. El usuario puede hacer preguntas de diferentes módulos en la misma conversación.\n- Si preguntan sobre módulos fuera de estos 3 (Legal, IT, Telecom, Sostenibilidad, etc.), responde: "Esa consulta pertenece a otro módulo. Por favor accede al módulo correspondiente para recibir asistencia especializada."\n- Sé conciso, profesional, en español. Usa formato markdown.',
    color: 'from-emerald-600 to-teal-600',
  },
  'dashboard': {
    name: 'Kyron Core Personal',
    icon: BrainCircuit,
    logo: '/images/module-logos/Personal.jpg',
    systemPrompt: 'Eres Kyron Core Personal, el núcleo inteligente para ciudadanos venezolanos. Respondes sobre: trámites civiles (SAIME, SAREN), documentos personales, salud, gestión personal, finanzas personales, presupuesto, y cualquier consulta sobre los servicios de System Kyron para personas naturales. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-sky-600 to-blue-600',
  },
  'legal': {
    name: 'Kyron Jurídico',
    icon: BrainCircuit,
    logo: '/images/module-logos/legal.jpg',
    systemPrompt: 'Eres Kyron Jurídico, la IA experta SOLO en derecho corporativo venezolano. Conoces ÚNICAMENTE sobre:\n\nSAREN: registro mercantil, actas constitutivas, asambleas, nombramientos.\nSAPI: propiedad intelectual, marcas, patentes.\nCONTRATOS: elaboración y revisión de contratos comerciales, civiles y laborales.\nPODERES: poderes especiales y generales.\nCUMPLIMIENTO: compliance corporativo, actas, documentos legales.\n\nREGLAS:\n- Responde SOLO sobre temas legales. Si preguntan sobre otros módulos, responde: "Esa consulta pertenece a otro módulo. Por favor accede al módulo correspondiente."\n- Sé conciso, profesional, en español. Usa formato markdown.',
    color: 'from-purple-600 to-indigo-600',
  },
  'telecom': {
    name: 'Kyron Core Telecom',
    icon: BrainCircuit,
    logo: '/images/module-logos/Linea empresa.jpg',
    systemPrompt: 'Eres Kyron Core Telecom, el núcleo inteligente de telecomunicaciones. Respondes sobre: venta de líneas, internet empresarial, eSIM, roaming, portabilidad, MDM corporativo, infraestructura de red, planes, diagnóstico de red, y cualquier consulta técnica de telecomunicaciones. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-teal-600 to-cyan-600',
  },
  'sostenibilidad': {
    name: 'Kyron Core ECO',
    icon: BrainCircuit,
    logo: '/images/module-logos/sostenibilidad.jpg',
    systemPrompt: 'Eres Kyron Core ECO, el núcleo inteligente de sostenibilidad. Respondes sobre: sostenibilidad empresarial, eco-créditos, huella de carbono, impacto ambiental, certificaciones verdes, mercado de eco-créditos, sector energético, y cualquier consulta ambiental. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-green-600 to-emerald-600',
  },
  'socios': {
    name: 'Kyron Core Socios',
    icon: BrainCircuit,
    logo: '/images/module-logos/Socios.jpg',
    systemPrompt: 'Eres Kyron Core Socios, el núcleo inteligente de gestión de socios. Respondes sobre: directorio corporativo, socios comerciales, alianzas, convenios, network empresarial, y cualquier consulta sobre relaciones corporativas. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-blue-600 to-indigo-600',
  },
  'informatica': {
    name: 'Kyron Core IT',
    icon: BrainCircuit,
    logo: '/images/module-logos/IT SEGURIDAD.jpg',
    systemPrompt: 'Eres Kyron Core IT, el núcleo inteligente de informática. Respondes sobre: infraestructura TI, servidores, redes, cloud, helpdesk, licencias de software, ciberseguridad, respaldos, monitoreo, dispositivos, y cualquier consulta técnica de IT. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-slate-600 to-zinc-600',
  },
  'soporte': {
    name: 'Kyron Soporte',
    icon: BrainCircuit,
    logo: '/images/module-logos/Kyron Shield.jpg',
    systemPrompt: 'Eres Kyron Soporte, el asistente de soporte técnico de System Kyron. Respondes sobre: problemas técnicos, errores del sistema, consultas de uso, guías de solución, actualizaciones, mantenimiento y asistencia al usuario. Usa formato markdown (**negrita**, *cursiva*, listas).',
    color: 'from-indigo-600 to-blue-600',
  },
  'system-kyron-soporte': {
    name: 'Kyron Asistente',
    icon: BrainCircuit,
    logo: '/images/module-logos/Kyron Shield.jpg',
    systemPrompt: 'Eres el asistente de soporte de System Kyron. Respondes sobre todo el contenido de la plataforma:\n\n1. ¿QUÉ ES SYSTEM KYRON?: Plataforma empresarial venezolana que unifica ERP, POS, RRHH, Legal, Telecomunicaciones, Marketing, Sostenibilidad en un sistema cloud inteligente.\n2. PLANES Y PRECIOS: Plan Solo (1 usuario, 4 módulos), Pro (3 usuarios), Comerciante (5 usuarios, POS), Negocio (10 usuarios, POS), Total (20+ usuarios, todo incluido). Precios en USD con conversión BCV. Prueba gratuita disponible.\n3. MÓDULOS: Contabilidad VEN-NIF (IVA, ISLR, IGTF, SENIAT), RRHH y Nómina (LOTTT, prestaciones, IVSS, FAOV), Marketing y Ventas (CRM, email, redes), Legal (SAREN, SAPI, contratos), IT (infraestructura, ciberseguridad), E-commerce (tienda online, pagos), Sostenibilidad (ESG, huella de carbono), Telecomunicaciones (NetUno, eSIM, internet empresarial).\n4. CARACTERÍSTICAS: IA integrada, nube, cifrado AES-256, multimoneda (USD/BS), backup automático, notificaciones en tiempo real, API REST, certificación Gaceta 6952.\n5. PRUEBA GRATUITA: Demo de 7 días sin tarjeta de crédito.\n6. ATENCIÓN AL CLIENTE: Disponible vía WhatsApp, email (systemkyronofficial@gmail.com), Instagram (@systemkyron).\n7. SOSTENIBILIDAD: Cero Papel, huella de carbono, Eco-Créditos, Smart Bins con IA.\n\nREGLAS:\n- Sé conciso, profesional, en español.\n- Usa formato markdown (**negrita**, listas).\n- Si no sabes algo, indícalo y sugiere contacto por email o WhatsApp.',
    color: 'from-violet-600 to-indigo-600',
  },
};

const QUICK_SUGGESTIONS: Record<string, string[]> = {
  'kyron-chat': ['¿Qué módulos tiene mi plan?', '¿Cómo resetear mi contraseña?', '¿Dónde veo mis facturas?'],
  'kyron-empresas': ['¿Cómo calcular IVA?', '¿Cómo calcular prestaciones?', '¿Cómo crear un lead?', 'Reporte de ventas del mes'],
  'dashboard': ['¿Cómo actualizar mis datos?', '¿Solicitar certificado?', '¿Estado de trámite?'],
  'legal': ['¿Cómo crear un contrato?', '¿Registro SAREN?', '¿Estado de poder?'],
  'telecom': ['¿Activar eSIM?', '¿Estado de mi línea?', '¿Portabilidad?', '¿Solicitar internet?'],
  'sostenibilidad': ['¿Mi huella de carbono?', '¿Cómo reciclar?', '¿Eco-créditos?', '¿Reporte ESG?'],
  'socios': ['¿Registrar socio?', '¿Acuerdo comercial?', '¿Directorio corporativo?'],
  'informatica': ['¿Ticket de soporte?', '¿Estado del servidor?', '¿Licencias activas?'],
  'soporte': ['¿Problema técnico?', '¿Error en el sistema?', '¿Actualización pendiente?'],
};

function getDashboardContext(pathname: string) {
  for (const [path, ctx] of Object.entries(DASHBOARD_CONTEXTS)) {
    if (pathname.includes(path)) return { key: path, ...ctx };
  }
  return { key: 'default', ...DASHBOARD_CONTEXTS['kyron-chat'] };
}

export function AIChatButton({ contextKey, className, chatClassName }: { contextKey?: string; className?: string; chatClassName?: string }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const context = contextKey 
    ? { key: contextKey, ...DASHBOARD_CONTEXTS[contextKey] ?? DASHBOARD_CONTEXTS['kyron-chat'] } 
    : getDashboardContext(pathname);
  const ContextIcon = context.icon;
  const suggestions = QUICK_SUGGESTIONS[contextKey || context.key] || [];

  useEffect(() => {
    setMessages([{
      role: 'ai',
      content: `¡Hola! Soy **${context.name}**. ¿En qué puedo ayudarte?`
    }]);
    setShowSuggestions(true);
  }, [context.key]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(async (customMessage?: string) => {
    const trimmed = (customMessage || input).trim();
    if (!trimmed) return;

    setShowSuggestions(false);
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
      } else if (res.status === 429) {
        setMessages(prev => [...prev, { role: 'ai', content: 'Estoy procesando muchas solicitudes. Espera un momento y vuelve a intentar.' }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', content: 'No pude procesar tu consulta. Intenta de nuevo con otras palabras.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'ai', content: 'Hubo un problema de conexión. Revisa tu señal e intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [input, messages, context]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
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
        aria-label={isOpen ? "Cerrar asistente Kyron" : "Abrir asistente Kyron"}
           className={cn(
             "fixed z-50 h-12 w-12 rounded-full p-0.5 shadow-2xl group",
             className || "bottom-6 right-6",
             `bg-gradient-to-br ${context.color}`
           )}
      >
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-4 w-4 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
          </span>
        )}
        <div className="flex h-full w-full items-center justify-center rounded-full bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border border-gray-200 dark:border-white/20 transition-all group-hover:bg-gray-100 dark:group-hover:bg-zinc-950/60 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]">
          {isOpen ? <X className="h-6 w-6 text-gray-700 dark:text-white" /> : <img src={context.logo} alt={context.name} className="h-6 w-6 object-contain rounded-full" />}
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
               "fixed bottom-20 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] max-h-[calc(100vh-120px)] rounded-3xl overflow-hidden flex flex-col",
              "shadow-[0_0_80px_rgba(0,0,0,0.6)] shadow-black/50",
              "border border-gray-200 dark:border-white/10",
              "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-3xl",
              chatClassName
            )}
          >
            {/* Ambient glow behind header */}
            <div className={cn("absolute top-0 left-0 right-0 h-24 opacity-20 blur-3xl pointer-events-none", context.color)} />

            {/* Header */}
            <div className={cn("relative p-4 bg-gradient-to-r border-b border-gray-200/50 dark:border-white/5 flex items-center justify-between", context.color, "bg-opacity-10")}>
              <div className="flex items-center gap-3">
                <ModuleLogo src={context.logo} alt={context.name} size="sm" />
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{context.name}</h3>
                  <p className="text-[8px] text-gray-500 dark:text-white/40 font-black uppercase tracking-[0.2em]">Asistente Especializado</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar chat" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-all group">
                <X className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[420px] scrollbar-thin scrollbar-thumb-gray-200/50 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  key={i}
                  className={cn("flex w-full flex-col", msg.role === 'user' ? "items-end" : "items-start")}
                >
                  <div className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
                    {msg.role === 'ai' && (
                      <img src={context.logo} alt={context.name} className="h-6 w-6 rounded-lg object-contain mr-2 mt-1 shrink-0" />
                    )}
                    <div className={cn(
                      "max-w-[88%] p-3.5 rounded-2xl text-[13px] leading-relaxed",
                      msg.role === 'user' 
                        ? "bg-primary text-white rounded-tr-sm shadow-lg shadow-primary/20" 
                        : "bg-gray-100 dark:bg-white/[0.06] text-gray-800 dark:text-white/90 backdrop-blur-md border border-gray-200 dark:border-white/[0.06] rounded-tl-sm shadow-lg"
                    )}>
                      {msg.role === 'ai' ? <MarkdownRenderer content={msg.content} /> : msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Quick Suggestions (only after greeting, before first user message) */}
              {showSuggestions && messages.length === 1 && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="flex flex-wrap gap-1.5 px-1"
                >
                  {suggestions.map((q, i) => (
                    <motion.button
                      key={q}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.25 }}
                      onClick={() => handleSend(q)}
                      className="text-[11px] px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/[0.06] border border-gray-200 dark:border-white/[0.08] text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all active:scale-95 whitespace-nowrap"
                    >
                      <Sparkles className="h-3 w-3 inline mr-1 -mt-0.5 opacity-60" />
                      {q}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <img src={context.logo} alt={context.name} className="h-6 w-6 rounded-lg object-contain mr-2 mt-1 shrink-0" />
                  <div className="bg-gray-100 dark:bg-white/[0.06] p-3.5 rounded-2xl rounded-tl-sm backdrop-blur-md border border-gray-200 dark:border-white/[0.06] shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/30 animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/30 animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-white/30 animate-bounce"></span>
                      </div>
                      <span className="text-[10px] text-gray-400 dark:text-white/20 font-medium animate-pulse">Pensando...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3.5 bg-gray-50 dark:bg-white/[0.03] border-t border-gray-200 dark:border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center gap-2"
              >
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu consulta..."
                    className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 transition-all"
                    autoFocus
                  />
                  <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-[9px] text-gray-400 dark:text-white/20 font-mono">
                    ↵
                  </kbd>
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  aria-label="Enviar mensaje"
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
              <p className="text-[8px] text-gray-400 dark:text-white/10 text-center mt-1.5 font-medium tracking-wide">
                Enter para enviar · Shift+Enter para nueva línea
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
