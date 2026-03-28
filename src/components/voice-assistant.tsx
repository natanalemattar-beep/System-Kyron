"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, X, Bot, Send, Loader2, User, Sparkles, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type Message = {
    role: 'user' | 'bot';
    text: string;
};

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

function hasTTS(): boolean {
    if (typeof window === 'undefined') return false;
    return 'speechSynthesis' in window;
}

function speakText(text: string) {
    if (!hasTTS()) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-VE';
    utterance.rate = 1;
    utterance.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es'));
    if (esVoice) utterance.voice = esVoice;
    window.speechSynthesis.speak(utterance);
}

export function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [speechSupported, setSpeechSupported] = useState(false);
    const [ttsEnabled, setTtsEnabled] = useState(true);
    const [interimText, setInterimText] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        setSpeechSupported(getSpeechRecognition() !== null);
        if (hasTTS()) {
            window.speechSynthesis.getVoices();
        }
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isProcessing, interimText]);

    useEffect(() => {
        return () => {
            recognitionRef.current?.abort();
            if (hasTTS()) window.speechSynthesis.cancel();
        };
    }, []);

    const handleSendMessage = useCallback(async (textOverride?: string) => {
        const query = (textOverride || input).trim();
        if (!query || isProcessing) return;

        const userMsg: Message = { role: 'user', text: query };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setInterimText("");
        setIsProcessing(true);

        try {
            const response = await chat({
                message: query,
                context: "Kyron Voice Assistant activo. Ecosistema corporativo venezolano. Responde en español, tono técnico y profesional. Sé conciso.",
            });
            const botMsg: Message = { role: 'bot', text: response };
            setMessages(prev => [...prev, botMsg]);
            if (ttsEnabled && hasTTS()) {
                setIsSpeaking(true);
                speakText(response);
                const checkDone = setInterval(() => {
                    if (!window.speechSynthesis.speaking) {
                        setIsSpeaking(false);
                        clearInterval(checkDone);
                    }
                }, 300);
            }
        } catch {
            setMessages(prev => [...prev, { role: 'bot', text: "Error de enlace con el núcleo IA. Intente de nuevo." }]);
        } finally {
            setIsProcessing(false);
        }
    }, [input, isProcessing, ttsEnabled]);

    const toggleListening = useCallback(() => {
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
            setInterimText("");
            return;
        }

        if (hasTTS()) window.speechSynthesis.cancel();

        const recognition = new SpeechAPI();
        recognition.lang = 'es-VE';
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            setIsListening(true);
            setInterimText("");
        };

        recognition.onresult = (ev: Event) => {
            try {
                const results = (ev as any).results;
                const result = results[results.length - 1];
                const transcript = result[0].transcript;

                if (result.isFinal) {
                    setIsListening(false);
                    setInterimText("");
                    if (transcript.trim()) handleSendMessage(transcript);
                } else {
                    setInterimText(transcript);
                }
            } catch { /* ignore */ }
        };

        recognition.onerror = (ev: Event) => {
            setIsListening(false);
            setInterimText("");
            const errEv = ev as unknown as { error: string };
            if (errEv.error === 'not-allowed') {
                toast({
                    title: "Micrófono bloqueado",
                    description: "Permite el acceso al micrófono en tu navegador.",
                    variant: "destructive",
                });
            } else if (errEv.error === 'no-speech') {
                toast({
                    title: "No se detectó voz",
                    description: "Intenta hablar más cerca del micrófono.",
                });
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch {
            setIsListening(false);
        }
    }, [isListening, handleSendMessage, toast]);

    const handleClose = useCallback(() => {
        if (isListening) {
            recognitionRef.current?.abort();
            setIsListening(false);
        }
        if (hasTTS()) window.speechSynthesis.cancel();
        setIsOpen(false);
        setInterimText("");
    }, [isListening]);

    const stopSpeaking = useCallback(() => {
        if (hasTTS()) window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, []);

    return (
        <div className="fixed bottom-6 left-6 z-[200]">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="panel"
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-4 w-[360px] h-[520px] flex flex-col rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-zinc-950/95 backdrop-blur-2xl"
                    >
                        <header className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "p-2 rounded-xl border transition-colors duration-300",
                                    isListening ? "bg-red-500/15 border-red-500/30" : "bg-primary/10 border-primary/20"
                                )}>
                                    <Bot className={cn("h-4 w-4 transition-colors", isListening ? "text-red-400" : "text-primary")} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white">Kyron Voice IA</p>
                                    <p className={cn(
                                        "text-[8px] font-bold uppercase tracking-widest transition-colors",
                                        isListening ? "text-red-400" :
                                        isProcessing ? "text-amber-400" :
                                        isSpeaking ? "text-cyan-400" :
                                        "text-emerald-500/60"
                                    )}>
                                        {isListening ? "Escuchando..." :
                                         isProcessing ? "Procesando..." :
                                         isSpeaking ? "Hablando..." :
                                         speechSupported ? "Listo" : "Solo texto"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                {hasTTS() && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 rounded-full hover:bg-white/10 text-white/40"
                                        onClick={() => {
                                            if (isSpeaking) stopSpeaking();
                                            setTtsEnabled(!ttsEnabled);
                                        }}
                                        title={ttsEnabled ? "Desactivar voz" : "Activar voz"}
                                    >
                                        {ttsEnabled ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-white/10 text-white/40" onClick={handleClose}>
                                    <X className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </header>

                        <div className="flex-1 overflow-hidden px-4 py-3">
                            <div className="h-full overflow-y-auto pr-1 custom-scrollbar" ref={scrollRef}>
                                <div className="space-y-3">
                                    {messages.length === 0 && !interimText && (
                                        <div className="py-14 text-center space-y-3 opacity-30">
                                            <Sparkles className="h-8 w-8 mx-auto text-primary" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] px-6 leading-relaxed text-white/80">
                                                Asistente Kyron listo.{speechSupported ? ' Escribe o usa tu voz.' : ' Escribe un mensaje.'}
                                            </p>
                                        </div>
                                    )}
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                            className={cn("flex items-start gap-2.5", msg.role === 'user' ? "flex-row-reverse" : "flex-row")}
                                        >
                                            <div className={cn("p-1.5 rounded-lg border shrink-0 mt-0.5", msg.role === 'user' ? "bg-primary/10 border-primary/20" : "bg-white/5 border-white/10")}>
                                                {msg.role === 'user' ? <User className="h-3 w-3 text-primary" /> : <Bot className="h-3 w-3 text-emerald-500" />}
                                            </div>
                                            <div className={cn(
                                                "max-w-[80%] px-3.5 py-2.5 rounded-2xl text-[11px] font-medium leading-relaxed whitespace-pre-wrap",
                                                msg.role === 'user' ? "bg-primary text-white rounded-br-md" : "bg-white/5 text-white/80 rounded-bl-md"
                                            )}>
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {interimText && (
                                        <div className="flex items-start gap-2.5 flex-row-reverse">
                                            <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20 shrink-0 mt-0.5">
                                                <Mic className="h-3 w-3 text-red-400" />
                                            </div>
                                            <div className="max-w-[80%] px-3.5 py-2.5 rounded-2xl rounded-br-md bg-primary/20 text-white/60 text-[11px] font-medium italic">
                                                {interimText}...
                                            </div>
                                        </div>
                                    )}
                                    {isProcessing && (
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-1.5 rounded-lg bg-white/5 border border-white/10">
                                                <Loader2 className="h-3 w-3 text-primary animate-spin" />
                                            </div>
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <footer className="px-4 py-3 bg-white/[0.02] border-t border-white/5">
                            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="h-9 rounded-xl bg-white/5 border-white/10 text-[11px] font-medium text-white placeholder:text-white/30 focus-visible:ring-primary/30"
                                    disabled={isProcessing || isListening}
                                />
                                {speechSupported && (
                                    <Button
                                        type="button"
                                        size="icon"
                                        className={cn(
                                            "h-9 w-9 rounded-xl shrink-0 transition-all duration-200",
                                            isListening ? "bg-red-500 hover:bg-red-600" : "bg-white/10 hover:bg-white/15"
                                        )}
                                        onClick={toggleListening}
                                        disabled={isProcessing}
                                        title={isListening ? "Detener escucha" : "Hablar"}
                                    >
                                        {isListening ? <MicOff className="h-3.5 w-3.5 text-white" /> : <Mic className="h-3.5 w-3.5 text-white/70" />}
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="h-9 w-9 rounded-xl bg-primary hover:bg-primary/90 shrink-0 transition-colors duration-200"
                                    disabled={!input.trim() || isProcessing}
                                >
                                    <Send className="h-3.5 w-3.5 text-white" />
                                </Button>
                            </form>
                        </footer>
                    </motion.div>
                ) : (
                    <motion.div
                        key="button"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Button
                            size="icon"
                            className="h-13 w-13 rounded-full shadow-lg bg-primary hover:bg-primary/90 border border-white/10 transition-all duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
                            onClick={() => setIsOpen(true)}
                            title="Kyron IA — Asistente"
                        >
                            <Volume2 className="h-5 w-5" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
