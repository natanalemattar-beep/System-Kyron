'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileText, Shield, Zap, Cpu, Calculator, 
    Wrench, Sparkles, Send, Download, Printer, 
    Clock, BadgeCheck, Scale, Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Agent = 'general' | 'finance' | 'tech' | 'growth' | 'legal';

export function KyronDocumentAi() {
    const [selectedAgent, setSelectedAgent] = useState<Agent>('general');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { 
            role: 'assistant', 
            content: 'INFORME PRELIMINAR DE INTELIGENCIA CORPORATIVA\n\nBienvenido al Sector Privado de System Kyron. Estoy listo para generar análisis profundos, redacción de contratos o auditorías técnicas sobre su infraestructura. ¿Qué sección del ecosistema desea analizar hoy?',
            timestamp: new Date().toLocaleTimeString() 
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const agents = {
        general: { name: 'Coordinador Central', icon: Cpu, color: 'text-cyan-400', border: 'border-cyan-500/20' },
        finance: { name: 'Analista Financiero', icon: Calculator, color: 'text-amber-400', border: 'border-amber-500/20' },
        legal: { name: 'Consultor Legal IA', icon: Scale, color: 'text-rose-400', border: 'border-rose-500/20' },
        tech: { name: 'Arquitecto de Infraestructura', icon: Wrench, color: 'text-emerald-400', border: 'border-emerald-500/20' },
        growth: { name: 'Estratega de Mercado', icon: TrendingUp, color: 'text-violet-400', border: 'border-violet-500/20' }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading || isStreaming) return;

        const userMsg = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    messages: [...messages, userMsg],
                    agent: selectedAgent,
                    mode: 'deep' // Document mode always uses deep thinking
                }),
            });

            if (!response.ok) throw new Error();

            setIsLoading(false);
            setIsStreaming(true);
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let text = '';
            
            setMessages(prev => [...prev, { role: 'assistant', content: '', timestamp: new Date().toLocaleTimeString() }]);

            while (reader) {
                const { done, value } = await reader.read();
                if (done) break;
                text += decoder.decode(value);
                setMessages(prev => {
                    const next = [...prev];
                    next[next.length - 1].content = text;
                    return next;
                });
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'ERROR DE PROCESAMIENTO: Interferencia detectada en el enlace de datos.', timestamp: new Date().toLocaleTimeString() }]);
        } finally {
            setIsLoading(false);
            setIsStreaming(false);
        }
    };

    return (
        <div className="w-[11in] min-h-[8.5in] bg-[#fdfdfd] dark:bg-[#0a0a0c] border-[12px] border-zinc-200 dark:border-zinc-900 shadow-2xl rounded-sm p-12 font-serif relative overflow-hidden print:border-0 print:shadow-none">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <FileText className="w-[500px] h-[500px] -rotate-12" />
            </div>

            {/* Header / Seal */}
            <div className="border-b-2 border-zinc-900 dark:border-white/20 pb-8 mb-10 flex justify-between items-start relative z-10">
                <div className="space-y-1">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">System Kyron</h2>
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-500">Unidad de Inteligencia Corporativa</p>
                    <div className="flex items-center gap-2 pt-4">
                        <BadgeCheck className="h-4 w-4 text-emerald-500" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600">Documento Autenticado por IA</span>
                    </div>
                </div>
                <div className="text-right space-y-1">
                    <div className="flex items-center justify-end gap-2 text-zinc-400">
                        <Clock className="h-3 w-3" />
                        <span className="text-[10px] font-mono">{new Date().toLocaleDateString()}</span>
                    </div>
                    <p className="text-[10px] font-mono text-zinc-500">REF: SK-INTEL-2026-XQ</p>
                    <div className="pt-2 flex gap-2 justify-end no-print">
                        <button className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg transition-colors"><Printer className="h-4 w-4" /></button>
                        <button className="p-2 hover:bg-zinc-100 dark:hover:bg-white/5 rounded-lg transition-colors"><Download className="h-4 w-4" /></button>
                    </div>
                </div>
            </div>

            {/* Agent Selector (Tabs) */}
            <div className="flex flex-wrap gap-2 mb-10 no-print relative z-10">
                {(Object.entries(agents) as [Agent, any][]).map(([key, config]) => (
                    <button
                        key={key}
                        onClick={() => setSelectedAgent(key)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md border text-[10px] font-black uppercase tracking-widest transition-all",
                            selectedAgent === key 
                                ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950" 
                                : "bg-transparent border-zinc-200 dark:border-white/10 text-zinc-500 hover:border-zinc-400"
                        )}
                    >
                        <config.icon className="h-3 w-3" />
                        {config.name}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="min-h-[500px] relative z-10 font-sans">
                <div className="space-y-8">
                    {messages.map((msg, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn(
                                "relative pl-6 border-l-2",
                                msg.role === 'user' ? "border-zinc-300 dark:border-white/10" : "border-zinc-900 dark:border-white/40"
                            )}
                        >
                            <span className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-zinc-900 dark:bg-white" />
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    {msg.role === 'user' ? 'Solicitante: Carlos' : `Responsable: ${agents[selectedAgent as Agent].name}`}
                                </span>
                                <span className="text-[8px] font-mono text-zinc-300">{msg.timestamp}</span>
                            </div>
                            <div className={cn(
                                "text-[15px] leading-relaxed text-justify",
                                msg.role === 'user' ? "text-zinc-500 italic" : "text-zinc-900 dark:text-zinc-200 font-medium whitespace-pre-wrap"
                            )}>
                                {msg.content}
                            </div>
                        </motion.div>
                    ))}

                    {isLoading && (
                        <div className="flex gap-2 items-center text-zinc-400 font-mono text-[10px] animate-pulse">
                            <Sparkles className="h-3 w-3" /> REDACTANDO INFORME...
                        </div>
                    )}
                </div>
            </div>

            {/* Input Area (Integrated) */}
            <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-white/5 no-print relative z-10">
                <div className="bg-zinc-50 dark:bg-white/5 p-4 rounded-xl border border-zinc-200 dark:border-white/10">
                    <div className="flex gap-4">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder="Ingrese su comando o solicitud de análisis..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 resize-none h-20"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isLoading}
                            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            Ejecutar <Send className="ml-2 h-3.5 w-3.5 inline" />
                        </button>
                    </div>
                </div>
                <p className="text-[8px] text-zinc-500 mt-4 uppercase tracking-[0.2em] text-center">
                    Confidencialidad Nivel 4K - Cifrado de Punto a Punto por Kyron OS
                </p>
            </div>
        </div>
    );
}
