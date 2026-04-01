"use client";

import { ArrowLeft, Heart, ShieldCheck, Clock, FileText } from 'lucide-react';
import { DocumentRequestTable, type Solicitud } from "@/components/document-request-table";
import { Link } from '@/navigation';
import { motion } from 'framer-motion';

const solicitudes: Solicitud[] = [
    {
        id: "AM-2024-001",
        fecha: "18/07/2024",
        nombres: "Juan Pérez & Ana García",
        estado: "En Proceso",
        tipo: "acta-matrimonio",
        detalles: {
            acta: "789",
            folio: "12",
            tomo: "M-2024",
            registro: "Registro Civil Parroquia Chacao, Miranda",
            ano: 2024
        }
    }
];

export default function ActasMatrimonioPage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-rose-500/[0.04] via-card to-card p-6 sm:p-8"
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                        <Heart className="h-7 w-7 text-rose-500" />
                    </div>
                    <div className="space-y-2 min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">Actas de Matrimonio</h1>
                        <p className="text-sm text-muted-foreground font-medium max-w-lg">
                            Consulta y solicita copias certificadas de registros conyugales ante el Registro Civil correspondiente.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[9px] font-bold uppercase tracking-widest text-emerald-500">
                                <ShieldCheck className="h-3 w-3" /> Documento Legal
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/20 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                <Clock className="h-3 w-3" /> 5-7 días hábiles
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/20 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                <FileText className="h-3 w-3" /> Copia certificada
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <DocumentRequestTable
                solicitudes={solicitudes}
                docTypeForDownload="Acta_de_Matrimonio"
                getDocumentContent={(s) => `<h1>Acta de Matrimonio - ${s.nombres}</h1><p>Acta: ${s.detalles.acta}</p>`}
            />
        </div>
    );
}
