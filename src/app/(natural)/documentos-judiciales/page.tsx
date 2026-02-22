
"use client";

import { DocumentRequestTable, type Solicitud } from "@/components/document-request-table";

const solicitudes: Solicitud[] = [
    {
        id: "EXP-2024-00123",
        fecha: "05/06/2024",
        nombres: "Pérez vs. Inversiones Futuro",
        estado: "En Proceso",
        tipo: "judicial",
        detalles: {
            acta: "N/A",
            folio: "N/A",
            tomo: "N/A",
            registro: "N/A",
            ano: 2024,
            tribunal: "Tribunal Cuarto de Primera Instancia en lo Civil",
            juez: "Dra. Carmen Silva"
        }
    }
];

export default function DocumentosJudicialesPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Documentos Judiciales</h1>
                <p className="text-muted-foreground mt-2">Seguimiento de expedientes y sentencias asociadas a tu identidad.</p>
            </header>
            <DocumentRequestTable 
                solicitudes={solicitudes} 
                docTypeForDownload="Expediente_Judicial"
                getDocumentContent={(s) => `<h1>Expediente ${s.id}</h1><p>Tribunal: ${s.detalles.tribunal}</p>`}
            />
        </div>
    );
}
