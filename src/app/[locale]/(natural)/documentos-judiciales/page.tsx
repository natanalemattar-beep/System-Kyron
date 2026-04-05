"use client";

import { useEffect, useState, useCallback } from 'react';
import { ArrowLeft, Scale, ShieldCheck, Clock, Gavel } from 'lucide-react';
import { DocumentRequestTable, type Solicitud } from "@/components/document-request-table";
import { Link } from '@/navigation';
import { motion } from 'framer-motion';

function mapToSolicitud(row: Record<string, unknown>): Solicitud {
  return {
    id: String(row.id),
    fecha: String(row.created_at ?? '').split('T')[0],
    nombres: (row.nombres as string) ?? 'Sin descripción',
    estado: row.estado === 'aprobado' ? 'Aprobado' :
            row.estado === 'en_proceso' ? 'En Proceso' :
            row.estado === 'rechazado' ? 'Rechazado' :
            row.estado === 'entregado' ? 'Archivado' : 'En Proceso',
    tipo: 'otro',
    detalles: {
      acta: (row.acta as string) || '—',
      folio: (row.folio as string) || '—',
      tomo: (row.tomo as string) || '—',
      registro: (row.registro_civil as string) || 'Tribunal',
      ano: (row.ano_evento as number) || new Date().getFullYear(),
      tribunal: (row.notas as string) || '—',
    },
  };
}

export default function DocumentosJudicialesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(() => {
    setLoading(true);
    fetch('/api/solicitudes-civiles?tipo=otro&limit=50')
      .then(r => r.ok ? r.json() : { solicitudes: [] })
      .then(d => setSolicitudes((d.solicitudes ?? []).map(mapToSolicitud)))
      .catch(() => setSolicitudes([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-amber-500/[0.04] via-card to-card p-6 sm:p-8"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Scale className="h-7 w-7 text-amber-500" />
          </div>
          <div className="space-y-2 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Expedientes Judiciales</h1>
            <p className="text-sm text-muted-foreground font-medium max-w-lg">
              Seguimiento de causas activas, sentencias y documentos judiciales con registro inmutable en blockchain.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[11px] font-bold uppercase tracking-widest text-emerald-500">
                <ShieldCheck className="h-3 w-3" /> Registro Inmutable
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/20 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <Gavel className="h-3 w-3" /> TSJ Venezuela
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/20 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                <Clock className="h-3 w-3" /> Seguimiento en tiempo real
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <DocumentRequestTable
        solicitudes={solicitudes}
        docTypeForDownload="Expediente_Judicial"
        getDocumentContent={(s) => `<h1>Expediente ${s.id}</h1><p>Descripción: ${s.nombres}</p>`}
      />
    </div>
  );
}
