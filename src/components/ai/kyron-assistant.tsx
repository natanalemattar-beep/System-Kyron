'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BrainCircuit, Send, X, Bot, User, Sparkles, 
    Maximize2, Minimize2, Paperclip, Mic, 
    Zap, Terminal, Cpu, Calculator, Wrench, RefreshCw, Fingerprint,
    Palette, Activity, ChevronRight, Share2, Info, Headphones
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { MarkdownRenderer } from '@/components/markdown-renderer';

export function KyronAssistant() {
    const pathname = usePathname();
    // Determinamos si es un usuario invitado (Guest) basándonos en la ruta
    const isGuest = pathname === '/' || pathname === '/es' || pathname === '/en' || pathname === '/es/' || pathname === '/en/';
    
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<'general' | 'finance' | 'tech' | 'growth' | 'forensic' | 'creative'>('general');
    const [thinkingMode, setThinkingMode] = useState<'fast' | 'deep'>('fast');
    const [input, setInput] = useState('');
    
    const [messages, setMessages] = useState([
        { 
            role: 'assistant', 
            content: isGuest 
                ? 'Hola, soy el asistente de **Atención al Cliente Kyron**. ¿En qué puedo ayudarte hoy con respecto a nuestros planes o servicios?' 
                : 'Bienvenido al **Centro de Inteligencia Kyron**. Estoy sincronizado con tu infraestructura. ¿Qué área del ecosistema deseas optimizar hoy?' 
        }
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const agentConfigs = {
        general: { name: isGuest ? 'Atención al Cliente' : 'Asistente Central', color: 'text-cyan-400', icon: isGuest ? Headphones : Cpu, bg: 'bg-cyan-500/10 border-cyan-500/20' },
        finance: { name: 'Estratega Financiero', color: 'text-blue-400', icon: Calculator, bg: 'bg-blue-500/10 border-blue-500/20' },
        tech: { name: 'Estratega Tecnológico', color: 'text-emerald-400', icon: Wrench, bg: 'bg-emerald-500/10 border-emerald-500/20' },
        growth: { name: 'Estratega de Crecimiento', color: 'text-violet-400', icon: Sparkles, bg: 'bg-violet-500/10 border-violet-500/20' },
        forensic: { name: 'Analista Forense', color: 'text-rose-400', icon: Fingerprint, bg: 'bg-rose-500/10 border-rose-500/20' },
        creative: { name: 'Estratega Creativo', color: 'text-yellow-400', icon: Palette, bg: 'bg-yellow-500/10 border-yellow-500/20' }
    };

    const ActiveIcon = agentConfigs[selectedAgent].icon;

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
                    agent: isGuest ? 'general' : selectedAgent,
                    mode: isGuest ? 'fast' : thinkingMode
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Fallo en la conexión neural');

            setIsLoading(false);
            setIsStreaming(true);
            
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let assistantText = '';
            
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

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
            console.error('AI Error:', error);
            const errorMsg = 'Interferencia en el flujo de datos. He activado el núcleo local para mantener la integridad del sistema. ¿Deseas un reporte técnico?';
            setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    // No ocultamos el asistente en la home, lo mostramos como Atención al Cliente
    // Pero sí lo ocultamos en páginas administrativas sensibles si no hay sesión (esto se maneja por ruta)

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[1000] font-tech">
            <style jsx global>{`
                .neural-bg {
                    background-image: 
                        radial-gradient(circle at 2px 2px, rgba(59, 130, 246, 0.05) 1px, transparent 0);
                    background-size: 24px 24px;
                }
                .hud-grid-ai {
                    background-image: linear-gradient(rgba(14, 165, 233, 0.03) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(14, 165, 233, 0.03) 1px, transparent 1px);
                    background-size: 40px 40px;
                }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            <AnimatePresence mode="wait">
                {!isOpen && (
                    <motion.button
                        key="launcher"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1.5px] shadow-[0_0_50px_rgba(14,165,233,0.4)] transition-all group"
                    >
                        <div className="h-full w-full rounded-2xl bg-[#030711] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent group-hover:opacity-100 opacity-0 transition-opacity" />
                            <div className="absolute inset-0 hud-grid-ai opacity-20" />
                            {isGuest ? (
                                <Headphones className="h-8 w-8 text-white group-hover:text-cyan-400 transition-colors relative z-10" />
                            ) : (
                                <BrainCircuit className="h-8 w-8 text-white group-hover:text-cyan-400 transition-colors relative z-10" />
                            )}
                            <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-emerald-500 rounded-full border-[3px] border-[#030711] animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        </div>
                    </motion.button>
                )}

                {isOpen && (
                    <motion.div
                        key="chat-window"
                        initial={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(20px)" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={cn(
                            "liquid-glass-apple flex flex-col border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden",
                            isMinimized ? "w-80 h-16" : "w-[480px] h-[720px] max-w-[95vw] max-h-[90vh]"
                        )}
                    >
                        {/* Immersive Neural Background */}
                        <div className="absolute inset-0 pointer-events-none z-0">
                            <div className="absolute inset-0 bg-[#02040a]" />
                            <div className="absolute inset-0 neural-bg" />
                            <div className="absolute inset-0 hud-grid-ai opacity-[0.05]" />
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />
                            <motion.div 
                                animate={{ x: [0, 100, 0], y: [0, 50, 0], opacity: [0.1, 0.2, 0.1] }}
                                transition={{ duration: 10, repeat: Infinity }}
                                className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" 
                            />
                        </div>

                        {/* Header Ejecutivo */}
                        <div className="p-6 border-b border-white/[0.08] flex flex-col gap-5 bg-black/60 backdrop-blur-3xl relative z-20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                    <div className={cn(
                                        "h-14 w-14 rounded-2xl flex items-center justify-center border transition-all duration-700 bg-white/[0.02] relative group shadow-2xl", 
                                        agentConfigs[selectedAgent].bg
                                    )}>
                                        <ActiveIcon className={cn("h-7 w-7 relative z-10", agentConfigs[selectedAgent].color)} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-[11px] font-black text-white uppercase tracking-[0.4em] italic leading-none">
                                                {agentConfigs[selectedAgent].name}
                                            </h3>
                                            <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                                <span className="text-[7px] font-black text-emerald-400 uppercase tracking-widest">
                                                    {isGuest ? 'Atención 24/7' : 'Live Sync'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-3 w-3 text-white/20 animate-pulse" />
                                            <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">
                                                {isGuest ? 'Portal de Consultas Públicas' : 'Kyron.Core v4.2.0-Alpha'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button 
                                        onClick={() => setIsMinimized(!isMinimized)}
                                        className="h-10 w-10 flex items-center justify-center hover:bg-white/5 rounded-xl text-zinc-600 hover:text-white transition-all active:scale-90"
                                    >
                                        {isMinimized ? <Maximize2 className="h-4.5 w-4.5" /> : <Minimize2 className="h-4.5 w-4.5" />}
                                    </button>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="h-10 w-10 flex items-center justify-center hover:bg-rose-500/10 rounded-xl text-zinc-600 hover:text-rose-500 transition-all active:scale-90"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Enhanced Agent Selector - SOLO SE MUESTRA SI NO ES GUEST */}
                            {!isMinimized && !isGuest && (
                                <div className="flex items-center gap-2 p-1.5 bg-white/[0.02] rounded-2xl border border-white/5 shadow-inner">
                                    <div className="flex flex-1 justify-around gap-1">
                                        {(Object.keys(agentConfigs) as Array<keyof typeof agentConfigs>).map((key) => {
                                            const config = agentConfigs[key];
                                            const Icon = config.icon;
                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        setSelectedAgent(key);
                                                        setMessages([
                                                            { role: 'assistant', content: `Sincronizando protocolos de **${config.name}**. Núcleo Kyron listo para optimización estratégica.` }
                                                        ]);
                                                    }}
                                                    className={cn(
                                                        "flex-1 p-2.5 rounded-xl transition-all flex flex-col items-center gap-1.5 group relative",
                                                        selectedAgent === key ? "bg-white/5 border border-white/10 shadow-lg" : "hover:bg-white/5"
                                                    )}
                                                >
                                                    {selectedAgent === key && (
                                                        <motion.div layoutId="agent-glow" className="absolute inset-0 bg-primary/5 blur-md rounded-xl" />
                                                    )}
                                                    <Icon className={cn("h-4.5 w-4.5 transition-all duration-500 relative z-10", selectedAgent === key ? config.color : "text-zinc-700 group-hover:text-zinc-500")} />
                                                    <span className={cn("text-[7px] font-black uppercase tracking-tighter relative z-10 transition-colors", selectedAgent === key ? "text-white" : "text-zinc-700")}>
                                                        {key}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    
                                    <div className="h-8 w-px bg-white/5 mx-1" />
                                    
                                    <button 
                                        onClick={() => setThinkingMode(thinkingMode === 'fast' ? 'deep' : 'fast')}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all border group relative overflow-hidden",
                                            thinkingMode === 'deep' 
                                                ? "bg-primary border-primary/50 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                                                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300"
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform" />
                                        {thinkingMode === 'fast' ? <Zap className="h-3.5 w-3.5" /> : <BrainCircuit className="h-3.5 w-3.5 animate-pulse" />}
                                        <span className="text-[9px] font-black uppercase tracking-widest relative z-10">{thinkingMode === 'fast' ? 'Turbo' : 'Deep'}</span>
                                    </button>
                                </div>
                            )}

                            {/* MODO GUEST: BANNER SIMPLE */}
                            {!isMinimized && isGuest && (
                                <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                        <Info className="h-4 w-4" />
                                    </div>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                                        Acceso de Invitado: <span className="text-white">Consultas generales sobre el ecosistema.</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages Container */}
                                <div 
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto p-8 space-y-10 relative z-10 scrollbar-hide"
                                >
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={cn(
                                                "flex gap-5",
                                                msg.role === 'user' ? "flex-row-reverse" : ""
                                            )}
                                        >
                                            <div className={cn(
                                                "h-12 w-12 rounded-2xl shrink-0 flex items-center justify-center border shadow-2xl relative group",
                                                msg.role === 'user' ? "bg-zinc-900 border-white/10" : "bg-primary/10 border-primary/20"
                                            )}>
                                                {msg.role === 'user' ? (
                                                    <User className="h-6 w-6 text-zinc-500" />
                                                ) : (
                                                    <div className="relative">
                                                        <Bot className="h-6 w-6 text-primary" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className={cn(
                                                "max-w-[85%] px-6 py-5 rounded-[2rem] text-[14px] leading-relaxed relative",
                                                msg.role === 'user' 
                                                    ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white font-black rounded-tr-none border border-white/10 shadow-xl" 
                                                    : "bg-white/[0.03] border border-white/5 text-zinc-300 rounded-tl-none font-medium backdrop-blur-xl"
                                            )}>
                                                <MarkdownRenderer content={msg.content} />
                                            </div>
                                        </motion.div>
                                    ))}
                                    
                                    {(isLoading || isStreaming) && (
                                        <div className="flex flex-col gap-4 ml-16">
                                            <div className="flex items-center gap-3">
                                                <RefreshCw className="h-4 w-4 text-primary animate-spin" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/60 italic">
                                                    Procesando Consulta...
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-8 border-t border-white/[0.08] bg-black/80 backdrop-blur-3xl relative z-20">
                                    <div className="relative group/input">
                                        <div className="relative bg-black/40 border border-white/10 rounded-[2rem] overflow-hidden group-focus-within/input:border-primary/40 group-focus-within/input:bg-black/60 transition-all shadow-inner">
                                            <textarea
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSend();
                                                    }
                                                }}
                                                placeholder={isGuest ? "Pregunta sobre planes o servicios..." : "Escriba instrucción ejecutiva..."}
                                                className="w-full bg-transparent p-6 text-[13px] text-white placeholder:text-zinc-800 focus:outline-none resize-none min-h-[80px] max-h-[160px] font-tech font-bold uppercase tracking-widest leading-relaxed"
                                                rows={1}
                                            />
                                            <div className="flex items-center justify-between p-4 bg-white/[0.01] border-t border-white/[0.04]">
                                                <div className="flex gap-5 px-2">
                                                    <button className="text-zinc-700 hover:text-primary transition-all active:scale-90"><Mic className="h-5 w-5" /></button>
                                                    <button className="text-zinc-700 hover:text-primary transition-all active:scale-90"><Paperclip className="h-5 w-5" /></button>
                                                </div>
                                                <button
                                                    onClick={handleSend}
                                                    disabled={!input.trim() || isLoading}
                                                    className="group relative bg-primary text-white px-8 py-3 rounded-[1.5rem] disabled:bg-zinc-900 disabled:text-zinc-800 transition-all active:scale-95 shadow-2xl overflow-hidden"
                                                >
                                                    <div className="flex items-center gap-3 relative z-10">
                                                        <span className="text-[11px] font-black uppercase tracking-[0.25em]">Enviar</span>
                                                        <ChevronRight className="h-4 w-4" />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-6 px-2">
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-white/10">
                                            <Fingerprint className="h-4 w-4" /> 
                                            {isGuest ? 'Canal Público Seguro' : 'Sesión Cifrada SK-AES256'}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
