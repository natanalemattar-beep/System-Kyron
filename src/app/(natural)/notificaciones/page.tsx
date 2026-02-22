
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notificaciones = [
    { id: 1, titulo: "Trámite Aprobado", mensaje: "Tu Partida de Nacimiento (PN-2024-001) ha sido aprobada y está lista para descargar.", tipo: "success", fecha: "Hace 2 horas" },
    { id: 2, titulo: "Vencimiento Próximo", mensaje: "Tu RIF personal vencerá en 15 días. Te recomendamos iniciar la renovación.", tipo: "warning", fecha: "Hace 1 día" },
    { id: 3, titulo: "Nuevo Documento Judicial", mensaje: "Se ha recibido una notificación en tu buzón judicial electrónico.", tipo: "info", fecha: "Hace 3 días" },
];

const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
};

export default function NotificacionesPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Bell className="h-8 w-8" />
                    Buzón de Notificaciones
                </h1>
                <p className="text-muted-foreground mt-2">Mantente al día con el estado de tus trámites y alertas de seguridad.</p>
            </header>

            <div className="space-y-4">
                {notificaciones.map(noti => (
                    <Card key={noti.id} className="bg-card/50 backdrop-blur-sm">
                        <CardHeader className="flex-row items-start gap-4 space-y-0">
                            <div className="mt-1">{iconMap[noti.tipo as keyof typeof iconMap]}</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <CardTitle className="text-base">{noti.titulo}</CardTitle>
                                    <span className="text-xs text-muted-foreground">{noti.fecha}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{noti.mensaje}</p>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
