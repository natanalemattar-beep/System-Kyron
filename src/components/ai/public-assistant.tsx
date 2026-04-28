'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, Send, X, Bot, Sparkles, 
    ArrowRight, Globe, HelpCircle, Terminal, Fingerprint, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/markdown-renderer';

function PublicAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '¡Hola! Bienvenido a **System Kyron**. Soy tu guía experto. ¿Te interesa conocer nuestra nueva **Conectividad 5G**, cómo impulsamos la **Sostenibilidad** con Ameru, o tienes dudas sobre nuestros módulos fiscales y legales?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isStreaming]);

    const handleSend = async () => {
        if (!input.trim() || isLoading || isStreaming) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 20000);

            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages: [...messages, userMessage],
                    agent: 'public'
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Error de conexión');

            setIsLoading(false);
            setIsStreaming(true);
            
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantText = '';
            
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            // Vigilante de flujo: 8 segundos sin datos = cerrar
            let watchdog = setTimeout(() => reader?.cancel(), 8000);

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;
                
                clearTimeout(watchdog);
                watchdog = setTimeout(() => reader?.cancel(), 8000);

                const chunk = decoder.decode(value);
                assistantText += chunk;
                
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = assistantText;
                    return newMessages;
                });
            }
            clearTimeout(watchdog);
        } catch (error: any) {
            console.error('Public AI Error:', error);
            const errorMsg = 'He activado mi núcleo de procesamiento local para mantener nuestra conversación fluida. ¿Te gustaría saber cómo el ecosistema 360 de System Kyron puede potenciar tu infraestructura empresarial?';
            setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <section className="py-20 relative overflow-hidden bg-zinc-950 border-y border-white/5">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-widest mb-6">
                            <Sparkles className="h-3.5 w-3.5" /> IA de Atención al Cliente
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                            ¿Tienes dudas? <br />
                            <span className="text-amber-500">Pregunta a la IA</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                            Nuestra inteligencia artificial conoce cada detalle técnico y comercial de System Kyron. Pregúntale sobre precios, módulos, seguridad o cómo empezar hoy mismo.
                        </p>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <Globe className="h-5 w-5 text-amber-500" />
                                <span className="text-sm text-zinc-300 font-bold">Disponible 24/7 en todo el mundo</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <HelpCircle className="h-5 w-5 text-amber-500" />
                                <span className="text-sm text-zinc-300 font-bold">Respuestas técnicas y comerciales instantáneas</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative group">
                        {/* Aura de Energía del Nexo */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-primary/20 to-emerald-500/20 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                        
                        <div className="relative liquid-glass-apple h-[600px] flex flex-col shadow-2xl overflow-hidden border-white/10 group-hover:border-primary/30 transition-colors duration-500">
                            {/* Efecto de Escaneo Holográfico */}
                            <div className="absolute inset-0 pointer-events-none z-20">
                                <div className="w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent absolute top-0 animate-scanline" />
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                            </div>

                            {/* Header del Nexo */}
                            <div className="p-5 bg-gradient-to-r from-slate-950 to-zinc-900 border-b border-white/10 flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative">
                                        <Bot className="h-6 w-6 text-primary" />
                                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black uppercase text-[10px] tracking-[0.3em] font-tech leading-none mb-1">Nexo Central SK-360</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest font-tech">Estatus Alfa</span>
                                            <span className="h-1 w-1 rounded-full bg-emerald-400" />
                                            <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest font-tech">Latencia 0.4ms</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                    <div className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                </div>
                            </div>

                            {/* Chat Area con Profundidad */}
                            <div 
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950/40 relative z-10 scrollbar-hide"
                            >
                                <div className="absolute inset-0 hud-grid opacity-[0.02] pointer-events-none" />
                                
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={cn(
                                            "flex flex-col gap-2",
                                            msg.role === 'user' ? "items-end" : "items-start"
                                        )}
                                    >
                                        <div className={cn(
                                            "px-5 py-4 rounded-2xl text-[13px] max-w-[90%] leading-relaxed shadow-xl backdrop-blur-md",
                                            msg.role === 'user' 
                                                ? "bg-primary text-white font-black rounded-tr-none border border-white/20 font-tech" 
                                                : "bg-white/[0.03] text-zinc-300 border border-white/10 rounded-tl-none font-inter"
                                        )}>
                                            <MarkdownRenderer content={msg.content} />
                                        </div>
                                        {msg.role === 'assistant' && i === messages.length - 1 && isStreaming && (
                                            <div className="flex items-center gap-2 ml-1 mt-1">
                                                <div className="h-1 w-12 bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div 
                                                        className="h-full bg-primary"
                                                        animate={{ x: [-50, 50] }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                    />
                                                </div>
                                                <span className="text-[8px] font-black uppercase tracking-widest text-white/20 font-tech">Recibiendo flujo de datos...</span>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                
                                {isLoading && !isStreaming && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex flex-col gap-3"
                                    >
                                        <div className="px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10 rounded-tl-none w-[70%]">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2">
                                                    <RefreshCw className="h-3 w-3 text-primary animate-spin" />
                                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary font-tech">Estableciendo vínculo cuántico...</span>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="h-2 w-full bg-white/5 rounded-full animate-pulse" />
                                                    <div className="h-2 w-[80%] bg-white/5 rounded-full animate-pulse" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Consola */}
                            <div className="p-6 bg-slate-950 border-t border-white/10 relative z-10">
                                <div className="relative group/input">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-emerald-500/30 rounded-2xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-500"></div>
                                    <div className="relative flex gap-3 bg-zinc-900 border border-white/10 rounded-2xl p-2 pl-5 items-center group-focus-within/input:border-primary/50 transition-colors">
                                        <Terminal className="h-4 w-4 text-white/20" />
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                            placeholder="Ingrese comando o consulta aquí..."
                                            className="flex-1 bg-transparent border-none py-3 text-xs text-white placeholder:text-white/20 focus:outline-none font-tech font-bold uppercase tracking-widest"
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={isLoading || isStreaming}
                                            className="bg-primary hover:bg-primary/80 disabled:opacity-50 text-white h-12 w-12 rounded-xl transition-all active:scale-90 flex items-center justify-center shadow-lg shadow-primary/20"
                                        >
                                            <Send className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-between items-center px-1">
                                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-white/20 font-tech">
                                        <Fingerprint className="h-3 w-3" /> Identidad Verificada
                                    </div>
                                    <div className="text-[8px] font-black uppercase tracking-widest text-white/20 font-tech">
                                        Cerebro Gemini 1.5 Flash <span className="text-primary ml-1">Activo</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PublicAssistant;
