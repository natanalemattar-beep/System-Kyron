'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BrainCircuit, Send, X, Bot, User, Sparkles, 
    Maximize2, Minimize2, Paperclip, Mic, 
    Zap, Terminal, Cpu, Calculator, Wrench
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function KyronAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<'general' | 'finance' | 'tech' | 'growth'>('general');
    const [thinkingMode, setThinkingMode] = useState<'fast' | 'deep'>('fast');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { role: 'assistant', content: '¡Hola! Soy **Kyron AI**, la inteligencia central de tu ecosistema. Estoy lista para ayudarte a gestionar tu negocio con máxima precisión. ¿En qué puedo asistirte hoy?' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const agentConfigs = {
        general: { name: 'Kyron AI', color: 'text-cyan-400', icon: Cpu, bg: 'bg-cyan-500' },
        finance: { name: 'Kyron Finance', color: 'text-blue-400', icon: Calculator, bg: 'bg-blue-500' },
        tech: { name: 'Kyron Tech', color: 'text-emerald-400', icon: Wrench, bg: 'bg-emerald-500' },
        growth: { name: 'Kyron Growth', color: 'text-violet-400', icon: Sparkles, bg: 'bg-violet-500' }
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
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages: [...messages, userMessage],
                    agent: selectedAgent,
                    mode: thinkingMode
                }),
            });

            if (!response.ok) throw new Error('Fallo en la conexión neural');

            setIsLoading(false);
            setIsStreaming(true);
            
            const reader = response.body?.getReader();
            const decoder = new TextEncoder();
            let assistantText = '';
            
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = new TextDecoder().decode(value);
                assistantText += chunk;
                
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = assistantText;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error('AI Error:', error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, he tenido una interferencia en mi núcleo de procesamiento. ¿Podrías repetir eso?' }]);
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[1000] font-[family-name:var(--font-outfit)]">
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        layoutId="kyron-ai-vessel"
                        onClick={() => setIsOpen(true)}
                        className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-[0_0_30px_rgba(14,165,233,0.4)] hover:scale-110 active:scale-95 transition-all group"
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                    >
                        <div className="h-full w-full rounded-2xl bg-[#060a14] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent group-hover:opacity-100 opacity-0 transition-opacity" />
                            <BrainCircuit className="h-7 w-7 text-white group-hover:text-cyan-400 transition-colors relative z-10" />
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#060a14] animate-pulse" />
                        </div>
                    </motion.button>
                )}

                {isOpen && (
                    <motion.div
                        layoutId="kyron-ai-vessel"
                        className={cn(
                            "bg-[#060a14]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden flex flex-col",
                            isMinimized ? "w-80 h-16" : "w-[420px] h-[600px] max-w-[90vw] max-h-[80vh]"
                        )}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex flex-col gap-4 bg-gradient-to-b from-white/5 to-transparent">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500", agentConfigs[selectedAgent].bg)}>
                                        <ActiveIcon className="h-5 w-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                            {agentConfigs[selectedAgent].name} <Sparkles className="h-3 w-3 text-cyan-400" />
                                        </h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Online</span>
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
                                <div className="flex items-center gap-2 p-1 bg-black/20 rounded-xl border border-white/5">
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
                                                            { role: 'assistant', content: `Has cambiado al especialista **${config.name}**. ¿En qué puedo ayudarte en esta área?` }
                                                        ]);
                                                    }}
                                                    className={cn(
                                                        "p-2 rounded-lg transition-all flex flex-col items-center gap-1 group",
                                                        selectedAgent === key ? "bg-white/10" : "hover:bg-white/5"
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
                                                ? "bg-violet-600/20 border-violet-500/40 text-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.3)]" 
                                                : "bg-zinc-800 border-zinc-700 text-zinc-500"
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
                                    className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
                                >
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10, x: msg.role === 'user' ? 20 : -20 }}
                                            animate={{ opacity: 1, y: 0, x: 0 }}
                                            className={cn(
                                                "flex gap-3 max-w-[85%]",
                                                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                            )}
                                        >
                                            <div className={cn(
                                                "h-8 w-8 rounded-lg shrink-0 flex items-center justify-center",
                                                msg.role === 'user' ? "bg-zinc-800" : "bg-cyan-500/20"
                                            )}>
                                                {msg.role === 'user' ? <User className="h-4 w-4 text-zinc-400" /> : <Bot className="h-4 w-4 text-cyan-400" />}
                                            </div>
                                            <div className={cn(
                                                "p-3.5 rounded-2xl text-[13px] leading-relaxed",
                                                msg.role === 'user' 
                                                    ? "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg" 
                                                    : "bg-white/5 border border-white/5 text-zinc-300"
                                            )}>
                                                <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-black">$1</strong>') }} />
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex gap-3 items-center text-cyan-500/60 text-[10px] font-black uppercase tracking-widest animate-pulse">
                                            <Terminal className="h-3 w-3" /> Kyron está pensando...
                                        </div>
                                    )}
                                </div>

                                {/* Input Area */}
                                <div className="p-4 border-t border-white/5 bg-[#060a14]">
                                    <div className="relative group">
                                        <textarea
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSend();
                                                }
                                            }}
                                            placeholder="Escribe un comando o pregunta..."
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-cyan-500/30 focus:bg-white/[0.08] transition-all resize-none min-h-[50px] max-h-[150px]"
                                            rows={1}
                                        />
                                        <button
                                            onClick={handleSend}
                                            disabled={!input.trim() || isLoading}
                                            className="absolute right-2 bottom-2 p-2 bg-cyan-500 text-white rounded-xl disabled:bg-zinc-800 disabled:text-zinc-600 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20"
                                        >
                                            <Send className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between mt-3 px-1">
                                        <div className="flex gap-3">
                                            <button className="text-zinc-500 hover:text-cyan-400 transition-colors"><Mic className="h-4 w-4" /></button>
                                            <button className="text-zinc-500 hover:text-cyan-400 transition-colors"><Paperclip className="h-4 w-4" /></button>
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-30">
                                            <Zap className="h-3 w-3 text-cyan-500" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Powered by Kyron OS</span>
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
