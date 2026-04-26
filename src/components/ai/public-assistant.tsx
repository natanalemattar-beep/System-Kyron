'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MessageSquare, Send, X, Bot, Sparkles, 
    ArrowRight, Globe, HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function PublicAssistant() {
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
            const errorMsg = error.name === 'AbortError'
                ? 'He tenido un pequeño retraso por la alta demanda, pero ya estoy de vuelta. ¿En qué puedo ayudarte?'
                : 'Lo siento, estoy teniendo mucha demanda. ¿Puedes intentarlo en un momento?';
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
                        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                        <div className="relative liquid-glass-apple h-[500px] flex flex-col shadow-2xl overflow-hidden">
                            {/* Header */}
                            <div className="p-4 bg-amber-500 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black uppercase text-xs tracking-widest">Kyron Guide</h3>
                                    <span className="text-[10px] text-white/70 font-bold">Asistente Virtual</span>
                                </div>
                            </div>

                            {/* Chat Area */}
                            <div 
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-900/50"
                            >
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={cn(
                                            "flex flex-col gap-1",
                                            msg.role === 'user' ? "items-end" : "items-start"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-3 rounded-2xl text-[13px] max-w-[85%] leading-snug",
                                            msg.role === 'user' 
                                                ? "bg-amber-500 text-white font-bold rounded-tr-none" 
                                                : "bg-white/5 text-zinc-300 border border-white/10 rounded-tl-none shadow-lg"
                                        )}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isStreaming && (
                                    <div className="flex gap-1 items-center">
                                        <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce" />
                                        <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                                        <span className="h-1 w-1 bg-amber-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-zinc-900 border-t border-white/5">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                        placeholder="Escribe tu pregunta aquí..."
                                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                                    />
                                    <button
                                        onClick={handleSend}
                                        className="bg-amber-500 hover:bg-amber-400 text-white p-3 rounded-xl transition-all active:scale-95"
                                    >
                                        <Send className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
