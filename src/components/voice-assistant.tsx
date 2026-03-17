
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, X, Bot, Send, Loader as Loader2, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat";
import { Input } from "@/components/ui/input";

/**
 * @fileOverview Kyron Voice IA: Interfaz de Comunicación Neuronal.
 * Consola de chat interactiva con soporte para comandos de voz y texto.
 */

type Message = {
    role: 'user' | 'bot';
    text: string;
};

export function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isProcessing]);

    const handleSendMessage = async (textOverride?: string) => {
        const query = textOverride || input;
        if (!query.trim() || isProcessing) return;

        const userMessage: Message = { role: 'user', text: query };
        const newMessages: Message[] = [...messages, userMessage];
        setMessages(newMessages);
        setInput("");
        setIsProcessing(true);

        try {
            const response = await chat({ 
                message: query, 
                context: "Kyron Voice Assistant interactuando desde el ecosistema central. El usuario tiene acceso maestro a todos los nodos operativos. El tono de la respuesta debe ser técnico, preciso y profesional." 
            });
            setMessages([...newMessages, { role: 'bot', text: response }]);
        } catch (error) {
            setMessages([...newMessages, { role: 'bot', text: "Error de enlace con el núcleo de inteligencia. Intente de nuevo." }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleListening = () => {
        if (isListening) {
            setIsListening(false);
        } else {
            setIsListening(true);
            // Simulación de reconocimiento de voz para el remake
            setTimeout(() => {
                setIsListening(false);
                if (!isProcessing) {
                    handleSendMessage("Explicación del protocolo Zero Risk.");
                }
            }, 3000);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[200]">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[350px] h-[550px] glass-card flex flex-col rounded-[2.5rem] border-primary/20 shadow-glow overflow-hidden bg-black/95 backdrop-blur-3xl"
                    >
                        <header className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-glow-sm">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Kyron Voice IA</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10" onClick={() => setIsOpen(false)}>
                                <X className="h-4 w-4 text-white/40" />
                            </Button>
                        </header>

                        <div className="flex-1 overflow-hidden p-4">
                            <div className="h-full overflow-y-auto pr-2 custom-scrollbar" ref={scrollRef}>
                                <div className="space-y-4">
                                    {messages.length === 0 && (
                                        <div className="py-16 text-center space-y-6 opacity-40">
                                            <Sparkles className="h-10 w-10 mx-auto text-primary animate-pulse" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-center px-4 leading-relaxed">
                                                Enlace neuronal activo. <br/> Inicie comandos de voz o texto.
                                            </p>
                                        </div>
                                    )}
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={cn(
                                                "flex items-start gap-3",
                                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                                            )}
                                        >
                                            <div className={cn(
                                                "p-2 rounded-lg border shrink-0",
                                                msg.role === 'user' ? "bg-primary/10 border-primary/20" : "bg-white/5 border-white/10"
                                            )}>
                                                {msg.role === 'user' ? <User className="h-3 w-3 text-primary" /> : <Bot className="h-3 w-3 text-emerald-500" />}
                                            </div>
                                            <div className={cn(
                                                "max-w-[80%] p-3 rounded-2xl text-[11px] font-medium leading-relaxed shadow-sm",
                                                msg.role === 'user' ? "bg-primary text-white" : "bg-white/5 text-white/80"
                                            )}>
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isProcessing && (
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                                <Loader2 className="h-3 w-3 text-primary animate-spin" />
                                            </div>
                                            <p className="text-[9px] font-black text-primary uppercase tracking-widest animate-pulse italic">Procesando Inferencia...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <footer className="p-6 bg-white/[0.02] border-t border-white/5">
                            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                                <Input 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Comando de texto..." 
                                    className="h-10 rounded-xl bg-black border-white/10 text-[11px] font-bold focus-visible:ring-primary shadow-inner"
                                    disabled={isProcessing}
                                />
                                <Button 
                                    type="button" 
                                    size="icon" 
                                    className={cn(
                                        "h-10 w-10 rounded-xl transition-all shadow-glow-sm",
                                        isListening ? "bg-red-500 animate-pulse" : "btn-3d-primary"
                                    )}
                                    onClick={toggleListening}
                                    disabled={isProcessing}
                                >
                                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                </Button>
                                <Button 
                                    type="submit" 
                                    size="icon" 
                                    className="h-10 w-10 rounded-xl btn-3d-secondary"
                                    disabled={!input.trim() || isProcessing}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </footer>
                    </motion.div>
                ) : (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button 
                            size="icon" 
                            className="h-16 w-16 rounded-full shadow-glow btn-3d-primary relative group border-2 border-white/10"
                            onClick={() => setIsOpen(true)}
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Volume2 className="h-7 w-7 relative z-10" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
