"use client";

import React, { useEffect, useState } from 'react';
import { 
    MessageSquare, 
    Calendar, 
    Globe, 
    Star, 
    RefreshCcw,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface FeedbackResponse {
    id: number;
    answers: Record<string, string | number>;
    ip_address: string;
    created_at: string;
}

export default function FeedbackResponsesPage() {
    const [responses, setResponses] = useState<FeedbackResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [pass, setPass] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(false);

    const checkPass = () => {
        if (pass === "Carlos123") {
            setIsAuthorized(true);
        } else {
            alert("Acceso denegado");
        }
    };

    const fetchResponses = async () => {
        if (!isAuthorized) return;
        setLoading(true);
        try {
            const res = await fetch('/api/admin/feedback-responses');
            if (res.ok) {
                const data = await res.json();
                setResponses(data);
            }
        } catch (error) {
            console.error("Error fetching feedback:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResponses();
    }, []);

    const getQuestionLabel = (id: string) => {
        const labels: Record<string, string> = {
            industry: "Sector",
            team_size: "Equipo",
            tech_spend: "Presupuesto",
            regulator_pressure: "Presión Fiscal",
            missing_link: "Falta Digital",
            contact_info: "Contacto"
        };
        return labels[id] || id;
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {!isAuthorized ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                    <div className="h-20 w-20 bg-zinc-800/50 rounded-3xl flex items-center justify-center mb-6 border border-zinc-700">
                        <Lock className="h-10 w-10 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Acceso Restringido</h2>
                    <p className="text-zinc-500 text-sm mb-8 max-w-xs">Este enlace es privado. Ingresa la clave secreta para continuar.</p>
                    <div className="flex flex-col w-full max-w-xs gap-3">
                        <input 
                            type="password" 
                            placeholder="Clave secreta..."
                            className="h-12 bg-zinc-900 border border-zinc-800 rounded-xl px-4 text-white text-center focus:border-amber-500/50 outline-none transition-colors"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && checkPass()}
                        />
                        <Button onClick={checkPass} className="h-12 bg-amber-600 hover:bg-amber-500 text-white font-black uppercase tracking-widest text-[11px] rounded-xl">
                            Desbloquear Acceso
                        </Button>
                    </div>
                </div>
            ) : (
                <>
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link href="/dashboard-empresa" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                            <ArrowLeft className="h-4 w-4 text-zinc-500" />
                        </Link>
                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
                            Marketing & Feedback
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                        Respuestas de <span className="text-amber-500">Encuestas QR</span>
                    </h1>
                    <p className="text-zinc-500 text-sm mt-2 font-medium">
                        Visualización en tiempo real de los leads y feedback recolectado desde el folleto.
                    </p>
                </div>
                <Button 
                    onClick={fetchResponses} 
                    variant="outline" 
                    className="border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 h-12 px-6 rounded-xl gap-2"
                    disabled={loading}
                >
                    <RefreshCcw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Actualizar
                </Button>
            </div>

            {/* Content */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 rounded-3xl bg-white/[0.02] border border-white/[0.05] animate-pulse" />
                    ))}
                </div>
            ) : responses.length === 0 ? (
                <Card className="p-20 text-center bg-zinc-900/20 border-zinc-800/50 rounded-[2.5rem]">
                    <div className="h-20 w-20 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="h-10 w-10 text-zinc-600" />
                    </div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Sin respuestas aún</h3>
                    <p className="text-zinc-500 max-w-sm mx-auto text-sm leading-relaxed">
                        Las respuestas comenzarán a aparecer aquí a medida que los clientes escaneen el QR del folleto.
                        <br/>
                        <span className="text-zinc-600 italic">(Nota: Las respuestas antiguas solo están en el correo electrónico).</span>
                    </p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {responses.map((resp) => (
                        <Card key={resp.id} className="group relative bg-[#0c0c0e] border-zinc-800/50 rounded-[2rem] overflow-hidden hover:border-amber-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_-20px_rgba(245,158,11,0.15)]">
                            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                <MessageSquare className="h-24 w-24 text-white" />
                            </div>
                            
                            <div className="p-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-amber-500" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Recibido</p>
                                            <p className="text-xs font-bold text-white leading-none">
                                                {format(new Date(resp.created_at), "dd MMM, yyyy", { locale: es })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">ID</p>
                                        <p className="text-xs font-bold text-white leading-none">#{resp.id}</p>
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {Object.entries(resp.answers).map(([key, value]) => (
                                        <div key={key} className="relative pl-4 border-l border-white/5">
                                            <p className="text-[9px] font-black text-amber-500/60 uppercase tracking-[0.15em] mb-1">
                                                {getQuestionLabel(key)}
                                            </p>
                                            <div className="text-sm font-medium text-zinc-300 leading-relaxed">
                                                {key === 'recommend' ? (
                                                    <div className="flex gap-1 text-amber-400">
                                                        {[...Array(Number(value))].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                                                    </div>
                                                ) : (
                                                    value
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Globe className="h-3.5 w-3.5 text-zinc-600" />
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{resp.ip_address}</span>
                                    </div>
                                    <button className="h-8 w-8 rounded-lg bg-zinc-800/50 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-500 transition-colors">
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            </>
            )}
        </div>
    );
}
