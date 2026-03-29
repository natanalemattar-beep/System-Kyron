
"use client";


import { ArrowLeft } from 'lucide-react';
import { DocumentRequestTable, type Solicitud } from "@/components/document-request-table";

import { Link } from '@/navigation';
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
        <div className="space-y-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-4"><ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard</Link>
                <header>
                <h1 className="text-3xl font-bold tracking-tight uppercase italic text-foreground ">Actas de Matrimonio</h1>
                <p className="text-muted-foreground mt-2 font-bold text-xs uppercase tracking-widest opacity-60">Consulta de registros conyugales digitalizados.</p>
            </header>
            <div className="glass-card p-1 rounded-[2rem] overflow-hidden shadow-2xl">
                <DocumentRequestTable 
                    solicitudes={solicitudes} 
                    docTypeForDownload="Acta_de_Matrimonio"
                    getDocumentContent={(s) => `<h1>Acta de Matrimonio - ${s.nombres}</h1><p>Acta: ${s.detalles.acta}</p>`}
                />
            </div>
        </div>
    );
}
