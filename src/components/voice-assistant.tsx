
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, X, Bot, Send, Loader2, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

/**
 * @fileOverview Kyron Voice IA: Consola de chat con soporte de voz real.
 * Usa la Web Speech API del navegador (Chrome/Edge/Safari). No hay timeouts simulados.
 */

type Message = {
    role: 'user' | 'bot';
    text: string;
};

// Extendemos Window de forma segura para acceder a la Speech API
interface SpeechRecognitionLike extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    start(): void;
    stop(): void;
    abort(): void;
    onstart: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
    onresult: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
    onerror: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
    onend: ((this: SpeechRecognitionLike, ev: Event) => void) | null;
}

function getSpeechRecognition(): (new () => SpeechRecognitionLike) | null {
    if (typeof window === 'undefined') return null;
    const w = window as unknown as Record<string, unknown>;
    return (w['SpeechRecognition'] as (new () => SpeechRecognitionLike)) 
        || (w['webkitSpeechRecognition'] as (new () => SpeechRecognitionLike)) 
        || null;
}

export function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [speechSupported, setSpeechSupported] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        setSpeechSupported(getSpeechRecognition() !== null);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isProcessing]);

    useEffect(() => {
        return () => {
            recognitionRef.current?.abort();
        };
    }, []);

    const handleSendMessage = async (textOverride?: string) => {
        const query = textOverride || input;
        if (!query.trim() || isProcessing) return;

        const userMsg: Message = { role: 'user', text: query };
        const next: Message[] = [...messages, userMsg];
        setMessages(next);
        setInput("");
        setIsProcessing(true);

        try {
            const response = await chat({
                message: query,
                context: "Kyron Voice Assistant activo. Ecosistema corporativo venezolano. Responde en español, tono técnico y profesional.",
            });
            setMessages([...next, { role: 'bot', text: response }]);
        } catch {
            setMessages([...next, { role: 'bot', text: "Error de enlace con el núcleo IA. Intente de nuevo." }]);
        } finally {
            setIsProcessing(false);
        }
    };

    const toggleListening = () => {
        const SpeechAPI = getSpeechRecognition();
        if (!SpeechAPI) {
            toast({
                title: "Voz no disponible",
                description: "Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.",
                variant: "destructive",
            });
            return;
        }

        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const recognition = new SpeechAPI();
        recognition.lang = 'es-VE';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (ev: Event) => {
            setIsListening(false);
            try {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const results = (ev as any).results as ArrayLike<ArrayLike<{ transcript: string }>>;
                const transcript = results[0][0].transcript;
                if (transcript.trim()) handleSendMessage(transcript);
            } catch { /* silently ignore */ }
        };

        recognition.onerror = (ev: Event) => {
            setIsListening(false);
            const errEv = ev as unknown as { error: string };
            if (errEv.error === 'not-allowed') {
                toast({
                    title: "Micrófono bloqueado",
                    description: "Permite el acceso al micrófono en tu navegador.",
                    variant: "destructive",
                });
            }
        };

        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch {
            setIsListening(false);
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
                        className="mb-4 w-[350px] h-[550px] flex flex-col rounded-[2.5rem] border border-primary/20 shadow-2xl overflow-hidden bg-black/95 backdrop-blur-3xl"
                    >
                        {/* Header */}
                        <header className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl border border-primary/20">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Kyron Voice IA</p>
                                    {isListening && (
                                        <p className="text-[8px] text-red-400 font-bold uppercase tracking-widest animate-pulse">● Escuchando...</p>
                                    )}
                                    {!isListening && speechSupported && (
                                        <p className="text-[8px] text-emerald-500/60 font-bold uppercase tracking-widest">Voz activa</p>
                                    )}
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-white/10 text-white/40" onClick={() => setIsOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </header>

                        {/* Messages */}
                        <div className="flex-1 overflow-hidden p-4">
                            <div className="h-full overflow-y-auto pr-1" ref={scrollRef}>
                                <div className="space-y-4">
                                    {messages.length === 0 && (
                                        <div className="py-16 text-center space-y-4 opacity-40">
                                            <Sparkles className="h-10 w-10 mx-auto text-primary animate-pulse" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] px-4 leading-relaxed">
                                                Enlace neuronal activo.<br />Inicie un comando de texto{speechSupported ? ' o voz' : ''}.
                                            </p>
                                        </div>
                                    )}
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={cn("flex items-start gap-3", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}
                                        >
                                            <div className={cn("p-2 rounded-lg border shrink-0", msg.role === 'user' ? "bg-primary/10 border-primary/20" : "bg-white/5 border-white/10")}>
                                                {msg.role === 'user' ? <User className="h-3 w-3 text-primary" /> : <Bot className="h-3 w-3 text-emerald-500" />}
                                            </div>
                                            <div className={cn("max-w-[80%] p-3 rounded-2xl text-[11px] font-medium leading-relaxed", msg.role === 'user' ? "bg-primary text-white" : "bg-white/5 text-white/80")}>
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isProcessing && (
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                                                <Loader2 className="h-3 w-3 text-primary animate-spin" />
                                            </div>
                                            <p className="text-[9px] font-black text-primary uppercase tracking-widest animate-pulse italic">Procesando...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="p-5 bg-white/[0.02] border-t border-white/5">
                            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe un comando..."
                                    className="h-10 rounded-xl bg-black border-white/10 text-[11px] font-bold"
                                    disabled={isProcessing}
                                />
                                {speechSupported && (
                                    <Button
                                        type="button"
                                        size="icon"
                                        className={cn("h-10 w-10 rounded-xl shrink-0 transition-all", isListening ? "bg-red-500 animate-pulse" : "bg-primary hover:bg-primary/90")}
                                        onClick={toggleListening}
                                        disabled={isProcessing}
                                        title={isListening ? "Detener escucha" : "Hablar"}
                                    >
                                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="h-10 w-10 rounded-xl bg-white/10 hover:bg-white/20 shrink-0"
                                    disabled={!input.trim() || isProcessing}
                                >
                                    <Send className="h-4 w-4 text-white" />
                                </Button>
                            </form>
                        </footer>
                    </motion.div>
                ) : (
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                            size="icon"
                            className="h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 border-2 border-white/10 relative"
                            onClick={() => setIsOpen(true)}
                            title="Kyron IA — Asistente"
                        >
                            <Volume2 className="h-6 w-6" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
