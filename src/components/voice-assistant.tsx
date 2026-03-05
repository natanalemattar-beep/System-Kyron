
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX, X, Bot, Sparkles, Loader2, Waveform } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { chat } from "@/ai/flows/chat";

/**
 * @fileOverview Asistente de Voz Inteligente "Kyron Voice".
 * Interfaz interactiva para consultas legales y contables mediante voz.
 */

export function VoiceAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [lastResponse, setLastResponse] = useState("");
    const [transcript, setTranscript] = useState("");

    const handleToggleListen = () => {
        if (isListening) {
            stopListening();
        } else {
            startListening();
        }
    };

    const startListening = () => {
        setIsListening(true);
        setTranscript("Escuchando nodo maestro...");
        // Simulación de reconocimiento de voz
        setTimeout(() => {
            setIsListening(false);
            processQuery("¿Cuáles son los plazos para el IVA de este mes?");
        }, 3000);
    };

    const stopListening = () => {
        setIsListening(false);
    };

    const processQuery = async (query: string) => {
        setIsProcessing(true);
        setTranscript(query);
        try {
            const response = await chat({ message: query, context: "Asistente de voz para consultas rápidas" });
            setLastResponse(response);
            setIsSpeaking(true);
            // Simulación de lectura de respuesta
            setTimeout(() => setIsSpeaking(false), 5000);
        } catch (error) {
            setLastResponse("Falla en la transmisión del nodo IA.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-[200]">
            <AnimatePresence>
                {isOpen ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="mb-4 w-80 glass-card p-6 rounded-[2.5rem] border-primary/20 shadow-glow overflow-hidden relative"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary/20">
                            {(isListening || isSpeaking) && (
                                <motion.div 
                                    className="h-full bg-primary shadow-glow"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            )}
                        </div>

                        <header className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <Bot className="h-4 w-4 text-primary" />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white italic">Kyron Voice</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </header>

                        <div className="space-y-6">
                            <div className="min-h-[60px] flex flex-col justify-center text-center">
                                {isProcessing ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="h-6 w-6 text-primary animate-spin" />
                                        <p className="text-[8px] font-bold uppercase tracking-widest text-white/40 italic">Inferencia IA activa...</p>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-[10px] font-medium italic text-white/60 line-clamp-3 leading-relaxed">
                                            {lastResponse || "Pulsa el micrófono para consultar leyes o procesos."}
                                        </p>
                                        {transcript && <p className="text-[8px] font-black text-primary uppercase tracking-widest mt-3 opacity-40">Tú: {transcript}</p>}
                                    </>
                                )}
                            </div>

                            <div className="flex justify-center">
                                <Button 
                                    size="lg" 
                                    className={cn(
                                        "h-20 w-20 rounded-full transition-all duration-500 shadow-2xl relative group overflow-hidden",
                                        isListening ? "bg-red-500 hover:bg-red-600 scale-110" : "btn-3d-primary"
                                    )}
                                    onClick={handleToggleListen}
                                >
                                    {isListening ? <div className="absolute inset-0 bg-white/10 animate-ping rounded-full" /> : null}
                                    {isListening ? <MicOff className="h-8 w-8 relative z-10" /> : <Mic className="h-8 w-8 relative z-10" />}
                                </Button>
                            </div>

                            <div className="flex justify-center gap-4 text-[8px] font-black uppercase tracking-[0.2em] text-white/20">
                                <span className={cn(isSpeaking && "text-primary")}>{isSpeaking ? "Transmitiendo Audio" : "Voz: Standby"}</span>
                                <span>•</span>
                                <span>Español (VE)</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                    >
                        <Button 
                            size="icon" 
                            className="h-16 w-16 rounded-full shadow-glow btn-3d-primary relative group"
                            onClick={() => setIsOpen(true)}
                        >
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Volume2 className="h-7 w-7 relative z-10 group-hover:scale-110 transition-transform" />
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
