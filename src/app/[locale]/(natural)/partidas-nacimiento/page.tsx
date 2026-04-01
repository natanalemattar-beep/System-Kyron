"use client";

import { ArrowLeft, Baby, ShieldCheck, Clock, FileText } from 'lucide-react';
import { DocumentRequestTable, type Solicitud } from "@/components/document-request-table";
import { Link } from '@/navigation';
import { motion } from 'framer-motion';

const solicitudes: Solicitud[] = [
    {
        id: "PN-2024-001",
        fecha: "10/07/2024",
        nombres: "Juan Alberto Pérez Rodriguez",
        estado: "Aprobado",
        tipo: "partida-nacimiento",
        detalles: {
            acta: "123",
            folio: "45",
            tomo: "I-2024",
            registro: "Registro Civil Parroquia El Valle, Caracas",
            ano: 1990
        }
    },
    {
        id: "PN-2024-002",
        fecha: "15/07/2024",
        nombres: "Maria Elena Pérez Rodriguez",
        estado: "En Proceso",
        tipo: "partida-nacimiento",
        detalles: {
            acta: "456",
            folio: "89",
            tomo: "II-2024",
            registro: "Registro Civil Parroquia El Valle, Caracas",
            ano: 1992
        }
    }
];

export default function PartidasNacimientoPage() {
    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-sky-500/[0.04] via-card to-card p-6 sm:p-8"
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-sky-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                        <Baby className="h-7 w-7 text-sky-500" />
                    </div>
                    <div className="space-y-2 min-w-0">
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">Partidas de Nacimiento</h1>
                        <p className="text-sm text-muted-foreground font-medium max-w-lg">
                            Solicita copias certificadas de tu partida de nacimiento ante el Registro Civil. Trámite 100% digital.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[9px] font-bold uppercase tracking-widest text-emerald-500">
                                <ShieldCheck className="h-3 w-3" /> Verificado SAIME
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/20 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                <Clock className="h-3 w-3" /> 3-5 días hábiles
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
                docTypeForDownload="Partida_de_Nacimiento"
                getDocumentContent={(s) => `<h1>Partida de Nacimiento - ${s.nombres}</h1><p>Acta: ${s.detalles.acta}</p><p>Registro: ${s.detalles.registro}</p>`}
            />
        </div>
    );
}
