"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ExternalLink } from "lucide-react";

interface VideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    // Replace this URL with your actual YouTube video ID or video URL
    videoId?: string;
}

export function VideoModal({ isOpen, onClose, videoId = "dQw4w9WgXcQ" }: VideoModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[9000] bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.92, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 20 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 z-[9001] flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-3xl">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="h-6 w-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                                            <Play className="h-3 w-3 text-cyan-400 fill-cyan-400" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Tutorial de Registro</span>
                                    </div>
                                    <h3 className="text-xl font-black text-white tracking-tight">Cómo registrarte en System Kyron</h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Video container */}
                            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-[0_0_60px_rgba(14,165,233,0.15)]">
                                <div className="aspect-video">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                        title="Tutorial: Cómo registrarse en System Kyron"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-4">
                                <p className="text-[11px] text-white/30 font-medium">
                                    ¿Tienes dudas? Contáctanos en <span className="text-cyan-400/60">system-kyron.com</span>
                                </p>
                                <a
                                    href="/register"
                                    className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors"
                                >
                                    Registrarse ahora <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
