'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import { getPitchAdvice } from '@/app/actions/ai-actions';

interface PitchCoachAIProps {
    currentSlide: {
        title: string;
        body: string;
        tag: string;
    };
}

export function PitchCoachAI({ currentSlide }: PitchCoachAIProps) {
    const [advice, setAdvice] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        async function fetchAdvice() {
            setIsLoading(true);
            const result = await getPitchAdvice(
                currentSlide.title,
                currentSlide.body,
                currentSlide.tag
            );
            setAdvice(result);
            setIsLoading(false);
        }

        fetchAdvice();
    }, [currentSlide.title]);

    return (
        <div className="fixed bottom-32 right-10 z-[100] w-80">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="glass-pill rounded-3xl p-6 border-cyan-500/30 bg-black/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(6,182,212,0.15)]"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                    <Brain className="h-4 w-4 text-cyan-400" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400">Kyron AI Coach</span>
                            </div>
                            <Sparkles className="h-3 w-3 text-cyan-400/50 animate-pulse" />
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center py-4 gap-3">
                                <Loader2 className="h-5 w-5 text-cyan-500 animate-spin" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Procesando Estrategia...</span>
                            </div>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-3"
                            >
                                {advice.split('\n').filter(l => l.trim()).map((line, i) => (
                                    <div key={i} className="flex gap-3 items-start group">
                                        <ChevronRight className="h-3 w-3 text-cyan-500 mt-0.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                                        <p className="text-[10px] font-bold text-white/70 leading-relaxed uppercase tracking-tight">
                                            {line.replace(/^[0-9*.-]\s*/, '')}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full bg-cyan-500 animate-ping" />
                                <span className="text-[7px] font-black text-white/20 uppercase tracking-widest">Live Engine: Gemini 1.5 Flash</span>
                            </div>
                            <button 
                                onClick={() => setIsVisible(false)}
                                className="text-[7px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                            >
                                Ignorar
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {!isVisible && (
                <button 
                    onClick={() => setIsVisible(true)}
                    className="absolute bottom-0 right-0 h-10 w-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 transition-all group"
                >
                    <Brain className="h-5 w-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                </button>
            )}
        </div>
    );
}
