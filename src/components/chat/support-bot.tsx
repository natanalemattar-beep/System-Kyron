"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, Send, X, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { chatWithKyron } from "@/app/actions/ai-chat";
import { cn } from "@/lib/utils";

export function SupportBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
        { role: "ai", content: "Bienvenido al Centro de Mando Kyron. Soy Kyron Core, tu asistente de inteligencia estratégica. ¿En qué puedo optimizar tu operación hoy?" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [pageContext, setPageContext] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Dynamic Page Analysis
    useEffect(() => {
        const analyzePage = () => {
            const title = document.title;
            const mainContent = document.querySelector('main')?.innerText?.slice(0, 1000) || "";
            setPageContext(`[ESTÁS EN LA PÁGINA: ${title}]\n[CONTENIDO DETECTADO: ${mainContent}]`);
        };
        analyzePage();
    }, [isOpen]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const history = messages.map(m => ({ 
                role: m.role === "user" ? "user" : "assistant", 
                content: m.content 
            }));
            
            // Inyectar contexto de la página en el último mensaje para que la IA sepa qué hay en pantalla
            const messageWithContext = `[CONTEXTO VISUAL ACTUAL: ${pageContext}]\n\nUsuario: ${userMessage}`;
            history.push({ role: "user", content: messageWithContext });

            const response = await chatWithKyron(history);
            
            if (response.error) {
                setMessages(prev => [...prev, { role: "ai", content: response.error! }]);
            } else {
                setMessages(prev => [...prev, { role: "ai", content: response.content || "Entendido. Procesando solicitud..." }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "ai", content: "Error de conexión con el núcleo Kyron." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100] no-print">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="mb-4"
                    >
                        <Card className="w-[350px] md:w-[400px] h-[500px] flex flex-col bg-white dark:bg-[#0a1020] border-black/5 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2rem] overflow-hidden">
                            {/* Header */}
                            <div className="p-6 bg-primary text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-xl relative">
                                        <Bot className="h-5 w-5" />
                                        <motion.div 
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 2 }}
                                            className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-400 rounded-full border border-primary" 
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest">Kyron Core</h4>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[10px] font-bold opacity-70">ANALIZANDO PANTALLA...</span>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-full">
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            {/* Chat Area */}
                            <div 
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide"
                            >
                                {messages.map((m, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: m.role === "user" ? 20 : -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className={cn(
                                            "flex items-start gap-3 max-w-[85%]",
                                            m.role === "user" ? "ml-auto flex-row-reverse" : ""
                                        )}
                                    >
                                        <div className={cn(
                                            "p-2 rounded-xl shrink-0",
                                            m.role === "user" ? "bg-primary/10" : "bg-slate-100 dark:bg-white/5"
                                        )}>
                                            {m.role === "user" ? <User className="h-4 w-4 text-primary" /> : <Sparkles className="h-4 w-4 text-primary" />}
                                        </div>
                                        <div className={cn(
                                            "p-4 rounded-2xl text-xs leading-relaxed font-medium",
                                            m.role === "user" 
                                                ? "bg-primary text-white rounded-tr-none" 
                                                : "bg-slate-100 dark:bg-white/5 dark:text-white/90 rounded-tl-none border border-black/5 dark:border-white/5"
                                        )}>
                                            {m.content}
                                        </div>
                                    </motion.div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-primary/50 uppercase tracking-widest ml-12">
                                        <Loader2 className="h-3 w-3 animate-spin" /> Procesando...
                                    </div>
                                )}
                            </div>

                            {/* Input Area */}
                            <div className="p-4 bg-slate-50 dark:bg-white/[0.02] border-t border-black/5 dark:border-white/5">
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="Escribe tu consulta estratégica..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                        className="h-12 rounded-xl bg-white dark:bg-black/20 border-black/5 dark:border-white/10 text-xs focus-visible:ring-primary"
                                    />
                                    <Button 
                                        onClick={() => {
                                            setInput("Haz un análisis estratégico de lo que ves en esta página ahora mismo.");
                                            setTimeout(handleSend, 100);
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="h-12 px-4 rounded-xl border-dashed border-primary/30 text-primary font-bold text-[10px] uppercase tracking-widest hover:bg-primary/5"
                                    >
                                        <Sparkles className="h-3 w-3 mr-2" /> Analizar Página
                                    </Button>
                                    <Button 
                                        onClick={handleSend}
                                        disabled={isLoading || !input.trim()}
                                        className="h-12 w-12 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 p-0"
                                    >
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button 
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "h-16 w-16 md:h-20 md:w-20 rounded-[1.5rem] md:rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.2)] border p-0 overflow-hidden transition-all duration-500",
                        isOpen 
                            ? "bg-primary border-none text-white" 
                            : "bg-white dark:bg-[#0a1020] border-black/5 dark:border-white/10 text-slate-600 dark:text-white"
                    )}
                >
                    {isOpen ? <X className="h-6 w-6 md:h-8 md:w-8" /> : <Headphones className="h-6 w-6 md:h-8 md:w-8" />}
                </Button>
            </motion.div>
        </div>
    );
}
