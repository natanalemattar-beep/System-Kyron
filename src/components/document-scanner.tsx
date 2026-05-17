"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Scan, Loader2, Check, X, AlertCircle, ShieldAlert, ShieldCheck, Building2, User, Fingerprint } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DocumentScannerProps {
    onScanComplete: (documentNumber: string, prefix: string, data?: any) => void;
    onClose?: () => void;
    type: "cedula" | "rif";
}

export function DocumentScanner({ onScanComplete, onClose, type }: DocumentScannerProps) {
    const [step, setStep] = useState<"select" | "capture" | "processing" | "result">("select");
    const [imageData, setImageData] = useState<string | null>(null);
    const [result, setResult] = useState<any>(null);
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

            const aiData = json.ai || json;
            if (aiData.number) {
                const fullDoc = `${aiData.prefix}-${aiData.number}`;
                setResult({ ...aiData, db: json.db, fullDocument: fullDoc });
                setStep("result");
                onScanComplete(aiData.number, aiData.prefix, aiData);
            } else {
                setError(json.error || "No se pudo leer el documento.");
                setStep("select");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al procesar la imagen.");
            setStep("select");
        }
    };

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
    }, []);

    const statusColor = result?.autenticidad === "ORIGINAL" ? "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
        : result?.autenticidad === "SOSPECHOSO" ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
        : "text-rose-400 border-rose-500/30 bg-rose-500/10";

    const statusIcon = result?.autenticidad === "ORIGINAL" ? ShieldCheck
        : result?.autenticidad === "SOSPECHOSO" ? AlertCircle
        : ShieldAlert;

    const StatusIcon = statusIcon;

    return (
        <div className="bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-500/30">
                        <Scan className="h-5 w-5 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-base font-black uppercase tracking-tight text-white">
                            {type === "cedula" ? "Escanear Cédula" : "Escanear RIF"}
                        </h3>
                        <p className="text-[10px] text-white/40 font-medium">Verificación con IA + SAIME/SENIAT</p>
                    </div>
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
                        <button onClick={startCamera}
                            className="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group">
                            <Camera className="h-8 w-8 text-white/30 group-hover:text-cyan-400 transition-colors" />
                            <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white">Cámara</span>
                        </button>
                        <button onClick={() => fileInputRef.current?.click()}
                            className="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all group">
                            <Upload className="h-8 w-8 text-white/30 group-hover:text-blue-400 transition-colors" />
                            <span className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-white">Archivo</span>
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
                        </div>
                        <div className="flex gap-3">
                            <Button onClick={capturePhoto} className="flex-1 h-14 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-widest text-xs">
                                <Camera className="h-4 w-4 mr-2" /> Capturar
                            </Button>
                            <Button onClick={() => { stopCamera(); setStep("select"); }} variant="outline" className="h-14 rounded-xl border-white/10 text-xs font-black uppercase tracking-widest text-white/50">
                                Cancelar
                            </Button>
                        </div>
                    </motion.div>
                )}

                {step === "processing" && (
                    <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-4 py-16">
                        <div className="relative">
                            <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
                            <div className="absolute inset-0 animate-ping rounded-full border-2 border-cyan-400/20" />
                        </div>
                        <p className="text-sm font-bold text-white/60">Analizando documento con IA...</p>
                        <p className="text-[10px] text-white/30">Verificando autenticidad + consultando SAIME/SENIAT</p>
                    </motion.div>
                )}

                {step === "result" && result && (
                    <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                        {/* STATUS BADGE */}
                        <div className={cn("flex items-center gap-3 p-4 rounded-2xl border", statusColor)}>
                            <StatusIcon className="h-6 w-6 shrink-0" />
                            <div>
                                <p className="text-sm font-black uppercase tracking-wider">
                                    {result.autenticidad === "ORIGINAL" ? "Documento Original" :
                                     result.autenticidad === "SOSPECHOSO" ? "Documento Sospechoso" :
                                     "Documento Falso / No Verificado"}
                                </p>
                                <p className="text-xs text-white/40">Confianza: {result.confianza}%</p>
                            </div>
                        </div>

                        {/* DOCUMENT NUMBER */}
                        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                            <Fingerprint className="h-5 w-5 text-cyan-400 shrink-0" />
                            <div>
                                <p className="text-xs text-white/40 uppercase tracking-widest">{type === "cedula" ? "Cédula" : "RIF"}</p>
                                <p className="text-lg font-black text-white">{result.fullDocument}</p>
                            </div>
                        </div>

                        {/* DB DATA - SAIME / SENIAT */}
                        {result.db && (
                            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                                <div className="flex items-center gap-2 text-emerald-400">
                                    {type === "cedula" ? <User className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                                    <span className="text-[10px] font-black uppercase tracking-widest">
                                        {type === "cedula" ? "Datos SAIME" : "Datos SENIAT"}
                                    </span>
                                </div>
                                {type === "cedula" && result.db.nombre && (
                                    <p className="text-sm font-bold text-white">{result.db.nombre} {result.db.apellido || ''}</p>
                                )}
                                {type === "rif" && result.db.data?.razonSocial && (
                                    <p className="text-sm font-bold text-white">{result.db.data.razonSocial}</p>
                                )}
                                {result.db.fechaNacimiento && (
                                    <p className="text-xs text-white/50">F. Nac: {new Date(result.db.fechaNacimiento).toLocaleDateString('es-VE')}</p>
                                )}
                                {result.db.estado && (
                                    <p className="text-xs text-white/50">Ubicación: {result.db.estado}{result.db.municipio ? ` / ${result.db.municipio}` : ''}</p>
                                )}
                            </div>
                        )}

                        {/* HALLazgos si es sospechoso/falso */}
                        {result.hallazgos?.length > 0 && (
                            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2">Anomalías detectadas:</p>
                                <ul className="space-y-1">
                                    {result.hallazgos.map((h: string, i: number) => (
                                        <li key={i} className="text-xs text-rose-300/80 flex items-start gap-2">
                                            <span className="text-rose-500 mt-0.5">•</span> {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <Check className="h-4 w-4 text-emerald-400 shrink-0" />
                            <p className="text-xs font-bold text-emerald-300">Datos verificados — Continuando con el registro...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20">
                    <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-bold text-rose-300">{error}</p>
                </div>
            )}
        </div>
    );
}