'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, User, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from '@/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

import { useAuth } from '@/lib/auth/context';

export function VoiceAssistant() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const pathname = usePathname();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Determinar si estamos en el sector público o privado
  const isPrivate = !!user;
  const assistantName = isPrivate ? 'Kyron Core AI' : 'Atención al Cliente';
  const assistantBadge = isPrivate ? (user?.tipo === 'juridico' ? 'Socio Premium' : 'Usuario Certificado') : 'Soporte Kyron';

  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting = isPrivate 
        ? `¡Hola ${user?.nombre || 'Socio'}! Bienvenido de nuevo a Kyron Core. Detecto que estás en la sección de ${pathname.split('/').pop() || 'Dashboard'}. ¿En qué puedo asistirte hoy?`
        : '¡Hola! Soy el asistente de Atención al Cliente de System Kyron. Para brindarte una asesoría detallada y personalizada, por favor indícame tu Cédula o RIF para analizar tu expediente.';
      setMessages([{ role: 'assistant', content: initialGreeting }]);
    }
  }, [isPrivate, user, pathname]);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    
    // Si detectamos un RIF o Cédula en modo público, mostramos feedback de análisis
    const isIdInput = !isPrivate && (input.toUpperCase().startsWith('V-') || input.toUpperCase().startsWith('J-') || input.length > 6);
    if (isIdInput) setIsAnalyzing(true);
    
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/core/engine-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          identity: isPrivate ? 'plan' : 'support',
          path: pathname,
          isDetailed: isIdInput
        })
      });

      if (!res.ok) throw new Error('Network Response Not OK');

      const data = await res.json();
      
      if (data && data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error('Malformed Response Data');
      }
    } catch (error) {
      console.warn('[Kyron-Chat-Error]', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Hubo un inconveniente al conectar con el núcleo de Kyron. Estamos optimizando la red, intenta de nuevo en unos segundos.' 
      }]);
    } finally {
      setIsTyping(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-20 left-0 w-[calc(100vw-3rem)] sm:w-[400px] max-w-[400px] h-[500px] max-h-[calc(100vh-120px)] bg-[#0c1120]/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#0c1120] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-white leading-none">{assistantName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-bold text-primary/70 uppercase tracking-widest">{assistantBadge}</span>
                    <div className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="text-[8px] font-medium text-white/30 uppercase tracking-[0.2em]">Online</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-xl hover:bg-white/5">
                <X className="h-4 w-4 text-white/40" />
              </Button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "h-8 w-8 rounded-lg shrink-0 flex items-center justify-center border",
                    msg.role === 'user' ? "bg-white/5 border-white/10" : "bg-primary/10 border-primary/20"
                  )}>
                    {msg.role === 'user' ? <User className="h-4 w-4 text-white/60" /> : <Bot className="h-4 w-4 text-primary" />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-xs leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-white/5 text-white/80 rounded-tr-none border border-white/5" 
                      : "bg-primary/5 text-white/90 rounded-tl-none border border-primary/10"
                  )}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isAnalyzing && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="bg-emerald-500/5 p-4 rounded-2xl rounded-tl-none border border-emerald-500/10">
                    <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest animate-pulse">
                      Verificando expediente corporativo...
                    </p>
                  </div>
                </div>
              )}
              {isTyping && !isAnalyzing && (
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-primary/5 p-4 rounded-2xl rounded-tl-none border border-primary/10 flex gap-1">
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-0">
              <div className="relative group">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu consulta..."
                  className="w-full h-12 pl-4 pr-12 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 text-xs text-white placeholder:text-white/20 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:grayscale"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-4">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3 text-emerald-400/50" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Auditado por Blockchain</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="h-3 w-3 text-amber-400/50" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Motor Determinista v2.0</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "h-14 w-14 rounded-full flex items-center justify-center shadow-2xl relative group",
          isOpen ? "bg-white text-black" : "bg-primary text-white shadow-primary/20"
        )}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <div className="absolute -top-1 -right-1 h-5 w-5 bg-white text-primary text-[10px] font-black flex items-center justify-center rounded-full border-2 border-primary animate-bounce">
            1
          </div>
        )}

        {/* Glow effect */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-primary/40 blur-xl -z-10 animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
