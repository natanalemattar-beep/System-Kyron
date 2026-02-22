
"use client";

import { DocumentRequestTable, type Solicitud } from "@/components/document-request-table";

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
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Partidas de Nacimiento</h1>
                <p className="text-muted-foreground mt-2">Gestiona y solicita copias certificadas de partidas de nacimiento.</p>
            </header>
            <DocumentRequestTable 
                solicitudes={solicitudes} 
                docTypeForDownload="Partida_de_Nacimiento"
                getDocumentContent={(s) => `<h1>Partida de Nacimiento - ${s.nombres}</h1><p>Acta: ${s.detalles.acta}</p><p>Registro: ${s.detalles.registro}</p>`}
            />
        </div>
    );
}
