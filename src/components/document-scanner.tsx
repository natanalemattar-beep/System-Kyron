"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Scan, Loader2, Check, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DocumentScannerProps {
    onScanComplete: (documentNumber: string, prefix: string) => void;
    onClose?: () => void;
    type: "cedula" | "rif";
}

export function DocumentScanner({ onScanComplete, onClose, type }: DocumentScannerProps) {
    const [step, setStep] = useState<"select" | "capture" | "processing" | "result">("select");
    const [imageData, setImageData] = useState<string | null>(null);
    const [extractedText, setExtractedText] = useState("");
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handleFile = useCallback(async (file: File) => {
        if (!file) return;
        setError(null);
        const reader = new FileReader();
        reader.onload = async (e) => {
            const dataUrl = e.target?.result as string;
            setImageData(dataUrl);
            setStep("processing");
            await processImage(dataUrl);
        };
        reader.readAsDataURL(file);
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const startCamera = useCallback(async () => {
        setError(null);
        setStep("capture");
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
            });
            streamRef.current = stream;
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch {
            setError("No se pudo acceder a la cámara. Usa la carga de archivo.");
            setStep("select");
        }
    }, []);

    const capturePhoto = useCallback(() => {
        if (!videoRef.current || !canvasRef.current) return;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0);
        const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
        setImageData(dataUrl);
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
        setStep("processing");
        processImage(dataUrl);
    }, []);

    const processImage = async (dataUrl: string) => {
        setStep("processing");
        try {
            const res = await fetch("/api/core/extract-document", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: dataUrl, type }),
            });
            const json = await res.json();
            if (json.number) {
                const prefix = json.prefix || (type === "cedula" ? "V" : "J");
                setExtractedText(`${prefix}-${json.number}`);
                setStep("result");
                onScanComplete(json.number, prefix);
            } else {
                setError(json.error || "No se pudo leer el documento. Intenta de nuevo.");
                setStep("select");
            }
        } catch {
            setError("Error al procesar la imagen. Intenta de nuevo.");
            setStep("select");
        }
    };

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
    }, []);

    return (
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Scan className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-base font-black uppercase tracking-tight text-white">
                        Escanear {type === "cedula" ? "Cédula" : "RIF"}
                    </h3>
                </div>
                {onClose && (
                    <button onClick={() => { stopCamera(); onClose(); }} className="text-white/30 hover:text-white transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {step === "select" && (
                    <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid grid-cols-2 gap-4">
                        <button onClick={startCamera} className="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group">
                            <Camera className="h-8 w-8 text-white/30 group-hover:text-cyan-400 transition-colors" />
                            <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Cámara</span>
                        </button>
                        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                            <Upload className="h-8 w-8 text-white/30 group-hover:text-blue-400 transition-colors" />
                            <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Archivo</span>
                        </button>
                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
                    </motion.div>
                )}

                {step === "capture" && (
                    <motion.div key="capture" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div className="relative rounded-2xl overflow-hidden bg-black aspect-[4/3]">
                            <video ref={videoRef} className="w-full h-full object-cover" playsInline />
                            <canvas ref={canvasRef} className="hidden" />
                            <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl pointer-events-none" />
                            <div className="absolute inset-x-[10%] top-1/2 h-px bg-cyan-400/20" />
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={capturePhoto} className="flex-1 h-12 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-xs">
                                <Camera className="h-4 w-4 mr-2" /> Capturar
                            </Button>
                            <Button onClick={() => { stopCamera(); setStep("select"); }} variant="outline" className="h-12 rounded-xl border-white/10 text-xs">
                                Cancelar
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === "processing" && (
                    <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 py-12">
                        <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
                        <p className="text-sm font-bold text-white/60">Procesando imagen...</p>
                    </motion.div>
                )}

                {step === "result" && (
                    <motion.div key="result" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 py-6">
                        <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                            <Check className="h-7 w-7 text-emerald-400" />
                        </div>
                        <p className="text-lg font-black text-white">{extractedText}</p>
                        <p className="text-xs text-white/40">Documento detectado correctamente</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
                    <span className="text-xs font-bold text-rose-300">{error}</span>
                </div>
            )}
        </div>
    );
}