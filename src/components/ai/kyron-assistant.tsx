'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BrainCircuit, Send, X, Bot, User, Sparkles, 
    Maximize2, Minimize2, Paperclip, Mic, 
    Zap, Terminal, Cpu, Calculator, Wrench, RefreshCw, Fingerprint,
    Banana, Palette
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { MarkdownRenderer } from '@/components/markdown-renderer';

export function KyronAssistant() {
    const pathname = usePathname();
    const isHomePage = pathname === '/' || pathname === '/es' || pathname === '/en';
    const isPrivateSector = pathname?.includes('sector-privado');
    
    const [isOpen, setIsOpen] = useState(false);
    
    // Don't show the pro assistant bubble on landing or private sector document page
    if (isHomePage || isPrivateSector) return null;
    const [isMinimized, setIsMinimized] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<'general' | 'finance' | 'tech' | 'growth' | 'forensic' | 'nanobanana'>('general');
    const [thinkingMode, setThinkingMode] = useState<'fast' | 'deep'>('fast');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Bienvenido al **Centro de Inteligencia Kyron**. Estoy sincronizado con tu infraestructura. ¿Qué área del ecosistema deseas optimizar hoy?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const agentConfigs = {
        general: { name: 'Asistente Central', color: 'text-cyan-400', icon: Cpu, bg: 'bg-cyan-500/10 border-cyan-500/20' },
        finance: { name: 'Estratega Financiero', color: 'text-blue-400', icon: Calculator, bg: 'bg-blue-500/10 border-blue-500/20' },
        tech: { name: 'Estratega Tecnológico', color: 'text-emerald-400', icon: Wrench, bg: 'bg-emerald-500/10 border-emerald-500/20' },
        growth: { name: 'Estratega de Crecimiento', color: 'text-violet-400', icon: Sparkles, bg: 'bg-violet-500/10 border-violet-500/20' },
        forensic: { name: 'Analista Forense', color: 'text-rose-400', icon: Fingerprint, bg: 'bg-rose-500/10 border-rose-500/20' },
        nanobanana: { name: 'NanoBanana Creative', color: 'text-yellow-400', icon: Banana, bg: 'bg-yellow-500/10 border-yellow-500/20' }
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
                    agent: selectedAgent,
                    mode: thinkingMode
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
            const errorMsg = 'Interferencia en el flujo de datos. He activado el núcleo local para mantener la soberanía del sistema. ¿Deseas un reporte técnico?';
            setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[1000] font-tech">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        layoutId="kyron-ai-vessel"
                        onClick={() => setIsOpen(true)}
                        className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:scale-110 active:scale-95 transition-all group"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                    >
                        <div className="h-full w-full rounded-2xl bg-[#030711] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent group-hover:opacity-100 opacity-0 transition-opacity" />
                            <div className="absolute inset-0 hud-grid opacity-10" />
                            <BrainCircuit className="h-7 w-7 text-white group-hover:text-cyan-400 transition-colors relative z-10" />
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#030711] animate-pulse" />
                        </div>
                    </motion.button>
                )}

                {isOpen && (
                    <motion.div
                        layoutId="kyron-ai-vessel"
                        className={cn(
                            "liquid-glass-apple flex flex-col border-white/10 shadow-2xl overflow-hidden",
                            isMinimized ? "w-80 h-16" : "w-[450px] h-[650px] max-w-[90vw] max-h-[85vh]"
                        )}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    >
                        {/* Scanline Effect */}
                        <div className="absolute inset-0 pointer-events-none z-20">
                            <div className="w-full h-1 bg-primary/10 absolute top-0 animate-scanline" />
                            <div className="absolute inset-0 hud-grid opacity-[0.03]" />
                        </div>

                        {/* Header Ejecutivo */}
                        <div className="p-5 border-b border-white/10 flex flex-col gap-4 bg-slate-950/80 relative z-10">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center border transition-all duration-500 bg-white/[0.03]", agentConfigs[selectedAgent].bg)}>
                                        <ActiveIcon className={cn("h-6 w-6", agentConfigs[selectedAgent].color)} />
                                    </div>
                                    <div>
                                        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] font-tech leading-none mb-1">
                                            {agentConfigs[selectedAgent].name}
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[9px] text-emerald-400 font-black uppercase tracking-widest font-tech">Estatus Alfa Conectado</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={() => setIsMinimized(!isMinimized)}
                                        className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors"
                                    >
                                        {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                                    </button>
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="p-2 hover:bg-rose-500/10 rounded-lg text-zinc-500 hover:text-rose-500 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Agent Selector Bar */}
                            {!isMinimized && (
                                <div className="flex items-center gap-2 p-1.5 bg-black/40 rounded-xl border border-white/5 backdrop-blur-md">
                                    <div className="flex flex-1 justify-around">
                                        {(Object.keys(agentConfigs) as Array<keyof typeof agentConfigs>).map((key) => {
                                            const config = agentConfigs[key];
                                            const Icon = config.icon;
                                            return (
                                                <button
                                                    key={key}
                                                    onClick={() => {
                                                        setSelectedAgent(key);
                                                        setMessages([
                                                            { role: 'assistant', content: `Sincronizando con el especialista **${config.name}**. Protocolos de optimización activos.` }
                                                        ]);
                                                    }}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-all flex flex-col items-center gap-1 group",
                                                        selectedAgent === key ? "bg-white/5 border border-white/10" : "hover:bg-white/5"
                                                    )}
                                                    title={config.name}
                                                >
                                                    <Icon className={cn("h-4 w-4 transition-colors", selectedAgent === key ? config.color : "text-zinc-600 group-hover:text-zinc-400")} />
                                                    <span className={cn("text-[7px] font-black uppercase tracking-tighter", selectedAgent === key ? "text-white" : "text-zinc-600")}>
                                                        {key}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* Mode Toggle */}
                                    <div className="h-8 w-px bg-white/10 mx-1" />
                                    <button 
                                        onClick={() => setThinkingMode(thinkingMode === 'fast' ? 'deep' : 'fast')}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-lg transition-all border",
                                            thinkingMode === 'deep' 
                                                ? "bg-primary/20 border-primary/40 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                                                : "bg-zinc-900 border-zinc-800 text-zinc-500"
                                        )}
                                    >
                                        {thinkingMode === 'fast' ? <Zap className="h-3 w-3" /> : <BrainCircuit className="h-3 w-3 animate-pulse" />}
                                        <span className="text-[8px] font-black uppercase tracking-widest">{thinkingMode === 'fast' ? 'Turbo' : 'Deep'}</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {!isMinimized && (
                            <>
                                {/* Messages Container */}
                                <div 
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-950/40 relative z-10 scrollbar-hide"
                                >
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 20 : -20 }}
                                            animate={{ opacity: 1, y: 0, x: 0 }}
                                            className={cn(
                                                "flex gap-4 max-w-[90%]",
                                                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                            )}
                                        >
                                            <div className={cn(
                                                "h-10 w-10 rounded-xl shrink-0 flex items-center justify-center border",
                                                msg.role === 'user' ? "bg-zinc-900 border-white/10" : "bg-primary/10 border-primary/20"
                                            )}>
                                                {msg.role === 'user' ? <User className="h-5 w-5 text-zinc-500" /> : <Bot className="h-5 w-5 text-primary" />}
                                            </div>
                                            <div className={cn(
                                                "px-5 py-4 rounded-2xl text-[13px] leading-relaxed backdrop-blur-sm",
                                                msg.role === 'user' 
                                                    ? "bg-primary text-white font-black rounded-tr-none shadow-lg border border-white/20" 
                                                    : "bg-white/[0.03] border border-white/5 text-zinc-300 rounded-tl-none font-inter"
                                            )}>
                                                <MarkdownRenderer content={msg.content} />
                                            </div>
                                        </motion.div>
                                    ))}
                                    
                                    {(isLoading || isStreaming) && (
                                        <div className="flex flex-col gap-3 ml-14">
                                            <div className="flex items-center gap-3">
                                                <RefreshCw className="h-3 w-3 text-primary animate-spin" />
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60">
                                                    Sincronizando Análisis {selectedAgent === 'forensic' ? 'Interno/Externo' : 'Operacional'}...
                                                </span>
                                            </div>
                                            <div className="flex gap-1">
                                                {[...Array(3)].map((_, i) => (
                                                    <motion.div 
                                                        key={i}
                                                        className="h-1 w-8 bg-primary/20 rounded-full overflow-hidden"
                                                    >
                                                        <motion.div 
                                                            className="h-full bg-primary"
                                                            animate={{ x: [-32, 32] }}
                                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                                        />
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Input Console Area */}
                                <div className="p-6 border-t border-white/10 bg-slate-950 relative z-10">
                                    <div className="relative group/input">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-violet-500/30 rounded-2xl blur opacity-0 group-focus-within/input:opacity-100 transition duration-500"></div>
                                        <div className="relative bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden group-focus-within/input:border-primary/50 transition-all">
                                            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                                                <Terminal className="h-3 w-3 text-white/20" />
                                                <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Consola de Comando</span>
                                            </div>
                                            <textarea
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSend();
                                                    }
                                                }}
                                                placeholder="Escriba instrucción ejecutiva..."
                                                className="w-full bg-transparent p-4 text-xs text-white placeholder:text-zinc-700 focus:outline-none resize-none min-h-[60px] max-h-[150px] font-tech font-bold uppercase tracking-wider"
                                                rows={1}
                                            />
                                            <div className="flex items-center justify-between p-3 bg-white/[0.01]">
                                                <div className="flex gap-4">
                                                    <button className="text-zinc-600 hover:text-primary transition-colors"><Mic className="h-4 w-4" /></button>
                                                    <button className="text-zinc-600 hover:text-primary transition-colors"><Paperclip className="h-4 w-4" /></button>
                                                </div>
                                                <button
                                                    onClick={handleSend}
                                                    disabled={!input.trim() || isLoading}
                                                    className="bg-primary text-white px-6 py-2 rounded-xl disabled:bg-zinc-900 disabled:text-zinc-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 flex items-center gap-2"
                                                >
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Ejecutar</span>
                                                    <Send className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 px-1">
                                        <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/10">
                                            <Fingerprint className="h-3.5 w-3.5" /> Sesión Cifrada SK-AES256
                                        </div>
                                        <div className="text-[9px] font-black uppercase tracking-widest text-white/10">
                                            Protocolo Kyron <span className="text-emerald-500 ml-1">v4.0.2</span>
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
