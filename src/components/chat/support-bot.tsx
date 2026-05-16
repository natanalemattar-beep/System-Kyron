"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Sparkles, Loader2, Brain, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { chatWithKyron } from "@/app/actions/ai-chat";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface Message {
    role: "user" | "model";
    content: string;
    timestamp: Date;
}

export function SupportBot() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    
    if (pathname.includes('presentacion-final')) return null;

    const [messages, setMessages] = useState<Message[]>([
        { 
            role: "model", 
            content: "Hola, soy Kyron Core. Puedo analizar tu dashboard y darte insights estratégicos. Pregúntame lo que necesites.", 
            timestamp: new Date() 
        }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pageContext, setPageContext] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Capturar contexto de la página actual
    useEffect(() => {
        if (!isOpen) return;
        
        const captureContext = () => {
            const url = window.location.pathname;
            const title = document.title;
            
            // Determinar rol basado en la ruta
            let rol = "Kyron Core AI (General)";
            if (url.includes('/contabilidad')) rol = "Contador Senior KYRON (Especialista VEN-NIF/SENIAT)";
            else if (url.includes('/legal')) rol = "Abogado KYRON (Especialista SAREN/SAPI)";
            else if (url.includes('/telecom')) rol = "Telecom KYRON (Especialista 5G/CONATEL)";
            
            // Extraer métricas y datos visibles
            const stats = Array.from(document.querySelectorAll('[data-stat], .stat-value, [class*="stat"]'))
                .map(el => el.textContent?.trim())
                .filter(Boolean)
                .slice(0, 10);
            
            // Extraer títulos de secciones
            const headings = Array.from(document.querySelectorAll('h1, h2, h3'))
                .map(el => el.textContent?.trim())
                .filter(Boolean)
                .slice(0, 5);
            
            // Extraer contenido principal
            const mainContent = document.querySelector('main')?.textContent?.slice(0, 2000) || "";
            
                setPageContext(JSON.stringify({
                    rol,
                    url,
                    title,
                    stats: stats.slice(0, 5),
                    headings: headings.slice(0, 3),
                    contentPreview: mainContent.slice(0, 500)
                }));
        };
        
        captureContext();
        const interval = setInterval(captureContext, 5000);
        return () => clearInterval(interval);
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = useCallback(async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        
        const newUserMsg: Message = { role: "user", content: userMessage, timestamp: new Date() };
        setMessages(prev => [...prev, newUserMsg]);
        setIsLoading(true);

        try {
            const history = messages.map(m => ({ role: m.role, content: m.content }));
            
            // Enviar contexto de la página para que la IA pueda analizar el dashboard
            const contextMessage = pageContext 
                ? `[CONTEXTO ACTUAL: ${pageContext}]\n\nPregunta del usuario: ${userMessage}`
                : userMessage;
            
            history.push({ role: "user", content: contextMessage });

            const response = await chatWithKyron(history);
            
            const aiMsg: Message = { 
                role: "model", 
                content: response.error || response.content || "No pude procesar tu consulta. Intenta de nuevo.", 
                timestamp: new Date() 
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch {
            const errorMsg: Message = { 
                role: "model", 
                content: "Error de conexión. Verifica tu conexión a internet.", 
                timestamp: new Date() 
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, messages, pageContext]);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] no-print">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="mb-4"
                    >
                        <Card className="w-[340px] sm:w-[380px] md:w-[420px] h-[520px] flex flex-col bg-[#0a0f1e] border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden">
                            {/* Header */}
                            <div className="px-5 py-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="relative p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                                        <Brain className="h-5 w-5 text-cyan-400" />
                                        <motion.div 
                                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-emerald-400 rounded-full border-2 border-[#0a0f1e]" 
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white">Kyron Core AI</h4>
                                        <p className="text-[10px] text-cyan-400/60 font-medium">Inteligencia activa</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white hover:bg-white/5 rounded-lg h-8 w-8">
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Chat Area */}
                            <div 
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide"
                            >
                                {messages.map((m, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={cn(
                                            "flex gap-2.5 max-w-[88%]",
                                            m.role === "user" ? "ml-auto flex-row-reverse" : ""
                                        )}
                                    >
                                        <div className={cn(
                                            "mt-1 p-1.5 rounded-lg shrink-0",
                                            m.role === "user" ? "bg-cyan-500/10" : "bg-white/5"
                                        )}>
                                            {m.role === "user" 
                                                ? <Sparkles className="h-3.5 w-3.5 text-cyan-400" /> 
                                                : <Brain className="h-3.5 w-3.5 text-white/40" />
                                            }
                                        </div>
                                        <div className="space-y-1">
                                            <div className={cn(
                                                "px-4 py-3 rounded-2xl text-[13px] leading-relaxed",
                                                m.role === "user" 
                                                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-md" 
                                                    : "bg-white/5 text-white/80 rounded-tl-md border border-white/5"
                                            )}>
                                                {m.content}
                                            </div>
                                            <p className={cn(
                                                "text-[9px] font-medium",
                                                m.role === "user" ? "text-right text-cyan-400/40" : "text-white/20"
                                            )}>
                                                {formatTime(m.timestamp)}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="flex items-center gap-2 px-4 py-3 bg-white/5 rounded-2xl rounded-tl-md border border-white/5 w-fit"
                                    >
                                        <div className="flex gap-1">
                                            <motion.div 
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                                                className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full"
                                            />
                                            <motion.div 
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                                                className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full"
                                            />
                                            <motion.div 
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                                                className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full"
                                            />
                                        </div>
                                        <span className="text-[10px] text-white/30 font-medium">Pensando...</span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-3 bg-white/[0.02] border-t border-white/5">
                                <div className="flex gap-2 mb-2">
                                    <Button 
                                        onClick={() => {
                                            setInput("Analiza el dashboard actual y dame insights estratégicos basados en los datos visibles.");
                                            setTimeout(handleSend, 100);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="h-9 px-3 rounded-lg border-white/10 bg-white/5 text-[10px] text-white/60 hover:text-white hover:bg-white/10 font-medium"
                                    >
                                        <Zap className="h-3 w-3 mr-1.5 text-cyan-400" /> Analizar Dashboard
                                    </Button>
                                </div>
                                <div className="flex gap-2">
                                    <Input 
                                        ref={inputRef}
                                        placeholder="Pregunta algo..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                                        className="h-11 rounded-xl bg-white/5 border-white/10 text-[13px] text-white placeholder:text-white/20 focus-visible:ring-cyan-500/30 focus-visible:border-cyan-500/30"
                                    />
                                    <Button 
                                        onClick={handleSend}
                                        disabled={isLoading || !input.trim()}
                                        className="h-11 w-11 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-600/20 p-0 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        ) : (
                                            <Send className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                                <p className="text-[9px] text-white/15 text-center mt-2">
                                    Kyron Core AI · Puede analizar tu dashboard en tiempo real
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "h-14 w-14 md:h-16 md:w-16 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.3)] border p-0 overflow-hidden transition-all duration-300",
                        isOpen 
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 border-none text-white" 
                            : "bg-[#0a0f1e] border-white/10 text-white hover:bg-white/5"
                    )}
                >
                    {isOpen ? (
                        <X className="h-5 w-5 md:h-6 md:w-6" />
                    ) : (
                        <div className="relative">
                            <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                            <motion.div 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-1 -right-1 h-2 w-2 bg-cyan-400 rounded-full"
                            />
                        </div>
                    )}
                </Button>
            </motion.div>
        </div>
    );
}
