"use client";

import { ArrowLeft, Shield, ShieldCheck, Clock, FileText, Download, CircleCheck, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const certificados = [
    { id: "AP-2024-005", fecha: "22/07/2024", motivo: "Trámites Migratorios", estado: "Aprobado", vence: "22/10/2024" },
];

export default function AntecedentesPenalesPage() {
    const { toast } = useToast();

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-violet-500/[0.04] via-card to-card p-6 sm:p-8"
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex flex-col sm:flex-row items-start justify-between gap-5">
                    <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                            <Shield className="h-7 w-7 text-violet-500" />
                        </div>
                        <div className="space-y-2 min-w-0">
                            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">Antecedentes Penales</h1>
                            <p className="text-sm text-muted-foreground font-medium max-w-lg">
                                Certificaciones emitidas por el MPPRIJP para trámites migratorios, laborales e internacionales.
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[9px] font-bold uppercase tracking-widest text-emerald-500">
                                    <ShieldCheck className="h-3 w-3" /> MPPRIJP
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/20 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                    <Globe className="h-3 w-3" /> Validez Internacional
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/20 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                    <Clock className="h-3 w-3" /> Vigencia 90 días
                                </span>
                            </div>
                        </div>
                    </div>
                    <Button className="h-11 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 bg-violet-600 hover:bg-violet-500 text-white shadow-lg shrink-0" onClick={() => toast({ title: "Protocolo Iniciado", description: "Iniciando trámite ante el Ministerio." })}>
                        <FileText className="h-3.5 w-3.5" /> Nueva Solicitud
                    </Button>
                </div>
            </motion.div>

            <div className="grid gap-4">
                {certificados.map((cert, i) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="relative rounded-2xl border border-border/30 bg-card overflow-hidden hover:border-border/50 transition-all hover:shadow-lg"
                    >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/60 via-emerald-500/30 to-transparent" />
                        <div className="p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 tabular-nums">{cert.id}</span>
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                            "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                        )}>
                                            <CircleCheck className="h-3 w-3" /> {cert.estado}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-foreground/90">Certificado de Antecedentes Penales</h3>
                                    <p className="text-[12px] text-muted-foreground">Motivo: {cert.motivo}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-muted/30 border border-border/20">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Emitido</p>
                                    <p className="text-sm font-semibold text-foreground/80 mt-1">{cert.fecha}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-muted/30 border border-border/20">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Vencimiento</p>
                                    <p className="text-sm font-semibold text-amber-500 mt-1">{cert.vence}</p>
                                </div>
                                <div className="p-3 rounded-xl bg-muted/30 border border-border/20">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Organismo</p>
                                    <p className="text-sm font-semibold text-foreground/80 mt-1">MPPRIJP</p>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2 border-border/30 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all"
                                onClick={() => toast({ title: "Descargando", description: "Preparando certificado PDF..." })}>
                                <Download className="h-3.5 w-3.5" /> Descargar Certificado PDF
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
