
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Info, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notificaciones = [
    { id: 1, titulo: "Trámite Aprobado", mensaje: "Tu Partida de Nacimiento (PN-2024-001) ha sido aprobada y está lista para descargar.", tipo: "success", fecha: "Hace 2 horas" },
    { id: 2, titulo: "Vencimiento Próximo", mensaje: "Tu RIF personal vencerá en 15 días. Te recomendamos iniciar la renovación.", tipo: "warning", fecha: "Hace 1 día" },
    { id: 3, titulo: "Nuevo Documento Judicial", mensaje: "Se ha recibido una notificación en tu buzón judicial electrónico.", tipo: "info", fecha: "Hace 3 días" },
];

const iconMap = {
    success: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
};

export default function NotificacionesPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-12">
            <header className="text-center space-y-4 border-b border-white/5 pb-10">
                <div className="inline-block p-4 bg-primary/10 rounded-2xl border border-primary/20 shadow-glow-sm">
                    <Bell className="h-10 w-10 text-primary" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic text-white italic-shadow">Buzón de Nodo</h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">Telemetría de Alertas y Estatus en Tiempo Real</p>
            </header>

            <div className="space-y-6">
                {notificaciones.map(noti => (
                    <Card key={noti.id} className="glass-card border-none bg-white/[0.02] rounded-[2rem] hover:bg-white/[0.04] transition-all group overflow-hidden">
                        <CardHeader className="flex-row items-start gap-6 p-8 space-y-0 relative">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Activity className="h-12 w-12" /></div>
                            <div className="mt-1 p-3 bg-white/5 rounded-xl border border-white/10 shadow-inner group-hover:rotate-6 transition-transform">
                                {iconMap[noti.tipo as keyof typeof iconMap]}
                            </div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-sm font-black uppercase italic tracking-widest text-white/90">{noti.titulo}</CardTitle>
                                    <span className="text-[9px] font-black uppercase text-white/20 tracking-widest">{noti.fecha}</span>
                                </div>
                                <p className="text-xs font-medium text-white/50 leading-relaxed uppercase">{noti.mensaje}</p>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}
