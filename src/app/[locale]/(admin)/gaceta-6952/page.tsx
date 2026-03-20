"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Bot, Search, BookOpen, FileText, MessageSquare, Loader, Send, ChevronRight, Landmark, Scale } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const articulos = [
    {
        numero: "Art. 1",
        titulo: "Objeto y Alcance de la Ley",
        resumen: "Establece el objeto de la Ley del Código Orgánico Tributario, aplicable a los tributos nacionales y las relaciones jurídicas derivadas de esos tributos.",
        impacto: "General",
        color: "text-primary",
        bg: "from-primary/10 to-primary/5",
        border: "border-primary/20",
    },
    {
        numero: "Art. 9",
        titulo: "Territorialidad Fiscal",
        resumen: "Los tributos se aplican en el territorio nacional, salvo disposición en contrario. Se incluyen las zonas económicas exclusivas y el espacio aéreo.",
        impacto: "Territorialidad",
        color: "text-blue-400",
        bg: "from-blue-500/10 to-blue-500/5",
        border: "border-blue-500/20",
    },
    {
        numero: "Art. 27",
        titulo: "Responsabilidad Solidaria",
        resumen: "Los agentes de retención y percepción son responsables solidariamente con el contribuyente cuando no cumplen con las obligaciones de retención.",
        impacto: "Crítico",
        color: "text-rose-400",
        bg: "from-rose-500/10 to-rose-500/5",
        border: "border-rose-500/20",
    },
    {
        numero: "Art. 55",
        titulo: "Períodos de Prescripción",
        resumen: "Prescripción de la obligación tributaria: 6 años para contribuyentes no registrados y 4 años para los registrados ante la Administración Tributaria.",
        impacto: "Plazos",
        color: "text-amber-400",
        bg: "from-amber-500/10 to-amber-500/5",
        border: "border-amber-500/20",
    },
    {
        numero: "Art. 92",
        titulo: "Sanciones y Multas SENIAT",
        resumen: "Multas por incumplimiento de deberes formales: entre 10 y 200 Unidades Tributarias. Reincidencia: duplicación de la sanción.",
        impacto: "Sanciones",
        color: "text-orange-400",
        bg: "from-orange-500/10 to-orange-500/5",
        border: "border-orange-500/20",
    },
    {
        numero: "Art. 110",
        titulo: "Intereses Moratorios",
        resumen: "Los intereses moratorios se calculan desde la fecha de vencimiento hasta la extinción total de la deuda, a la tasa activa del BCV más 1.2.",
        impacto: "Financiero",
        color: "text-violet-400",
        bg: "from-violet-500/10 to-violet-500/5",
        border: "border-violet-500/20",
    },
];

type Message = { role: "user" | "assistant"; content: string };

export default function Gaceta6952Page() {
    const { toast } = useToast();
    const [search, setSearch] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Bienvenido al Asistente Fiscal IA. Puedo ayudarte a interpretar la Gaceta Oficial Extraordinaria N° 6.952, el Código Orgánico Tributario y demás normativas SENIAT. ¿Cuál es tu consulta?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const filtered = articulos.filter(a =>
        !search || a.titulo.toLowerCase().includes(search.toLowerCase()) || a.resumen.toLowerCase().includes(search.toLowerCase())
    );

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = input.trim();
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setLoading(true);
        try {
            const res = await fetch('/api/ai/fiscal-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMsg }),
            });
            const json = await res.json();
            setMessages(prev => [...prev, { role: "assistant", content: json.content ?? json.text ?? "No pude procesar la consulta en este momento. Intenta de nuevo." }]);
        } catch {
            setMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Verifica tu red e intenta nuevamente." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10 pb-20 px-4 md:px-10">
            <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-4 border-primary pl-8 py-2 mt-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-3">
                    <Bot className="h-3 w-3" /> ASISTENTE FISCAL IA
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">
                    Gaceta <span className="text-primary italic">N° 6.952</span>
                </h1>
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">
                    Código Orgánico Tributario • SENIAT • Normativa Fiscal 2025
                </p>
            </motion.header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Articles panel */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl"><BookOpen className="h-5 w-5 text-primary" /></div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/60">Artículos Clave</h3>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                        <Input
                            placeholder="Buscar artículo o tema..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-11 h-11 rounded-xl bg-card/50 border-border/40"
                        />
                    </div>
                    <div className="space-y-4">
                        {filtered.map((art, i) => (
                            <motion.div
                                key={art.numero}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i }}
                            >
                                <Card className={`glass-card border-none rounded-2xl overflow-hidden bg-gradient-to-br ${art.bg} border ${art.border} group hover:scale-[1.01] transition-all`}>
                                    <CardContent className="p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <Badge className={`text-[8px] font-black uppercase tracking-widest border ${art.border} bg-black/20 ${art.color} h-5`}>{art.numero}</Badge>
                                                    <Badge variant="outline" className="text-[8px] font-black uppercase tracking-widest h-5 border-border/40">{art.impacto}</Badge>
                                                </div>
                                                <p className="text-[11px] font-black uppercase tracking-tight text-foreground/90 mb-1">{art.titulo}</p>
                                                <p className="text-[10px] text-muted-foreground/60 font-medium leading-relaxed">{art.resumen}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="shrink-0 h-8 w-8 rounded-xl"
                                                onClick={() => {
                                                    setInput(`Explícame el ${art.numero}: ${art.titulo}`);
                                                }}
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* AI Chat Panel */}
                <div className="lg:col-span-5">
                    <Card className="glass-card border-none bg-[#050505] rounded-2xl overflow-hidden sticky top-24">
                        <CardHeader className="p-6 border-b border-white/5">
                            <CardTitle className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em]">
                                <div className="p-2 bg-primary/10 rounded-xl"><Bot className="h-4 w-4 text-primary" /></div>
                                Consulta Fiscal IA
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex flex-col" style={{ height: 420 }}>
                            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[11px] font-medium leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-white/5 text-foreground/80 rounded-bl-sm border border-white/5"}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white/5 border border-white/5 px-4 py-3 rounded-2xl rounded-bl-sm">
                                            <Loader className="h-4 w-4 animate-spin text-primary" />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 border-t border-white/5 flex gap-2">
                                <Input
                                    placeholder="Escribe tu consulta fiscal..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()}
                                    className="flex-1 h-10 rounded-xl bg-white/5 border-white/10 text-xs"
                                />
                                <Button
                                    size="icon"
                                    className="h-10 w-10 rounded-xl btn-3d-primary shrink-0"
                                    onClick={sendMessage}
                                    disabled={loading || !input.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
