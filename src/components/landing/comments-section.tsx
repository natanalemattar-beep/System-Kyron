'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    MessageSquare, Star, Send, Loader2, User, Building2, Clock,
    Quote, Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Comentario {
    id: number;
    texto: string;
    calificacion: number;
    modulo: string | null;
    created_at: string;
    autor: string;
    tipo: string;
    iniciales: string;
}

function StarRating({ value, onChange, readonly = false }: { value: number; onChange?: (v: number) => void; readonly?: boolean }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    onClick={() => onChange?.(star)}
                    className={cn(
                        "transition-all duration-200",
                        readonly ? "cursor-default" : "cursor-pointer hover:scale-125"
                    )}
                >
                    <Star className={cn(
                        "h-4 w-4 transition-colors",
                        star <= value
                            ? "fill-amber-400 text-amber-400"
                            : "text-border/40"
                    )} />
                </button>
            ))}
        </div>
    );
}

function timeAgo(dateStr: string) {
    const now = new Date();
    const date = new Date(dateStr);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Hace un momento';
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
    if (diff < 604800) return `Hace ${Math.floor(diff / 86400)}d`;
    return date.toLocaleDateString('es-VE', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function CommentsSection() {
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState(true);
    const [texto, setTexto] = useState('');
    const [calificacion, setCalificacion] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const { toast } = useToast();

    const fetchComentarios = useCallback(async () => {
        try {
            const res = await fetch('/api/comentarios');
            const data = await res.json();
            setComentarios(data.data || []);
        } catch {
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchComentarios(); }, [fetchComentarios]);

    const handleSubmit = async () => {
        if (texto.trim().length < 10) {
            toast({ title: 'Comentario muy corto', description: 'Escribe al menos 10 caracteres.', variant: 'destructive' });
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/comentarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto: texto.trim(), calificacion }),
            });
            const data = await res.json();
            if (!res.ok) {
                toast({ title: 'Error', description: data.error || 'No se pudo publicar', variant: 'destructive' });
                return;
            }
            toast({ title: 'Publicado', description: 'Tu comentario ya es visible.' });
            setTexto('');
            setCalificacion(5);
            setShowForm(false);
            fetchComentarios();
        } catch {
            toast({ title: 'Error', description: 'Error de conexión', variant: 'destructive' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-12 md:py-20 bg-transparent relative overflow-hidden w-full">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-8 md:mb-12">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 text-[9px] font-black uppercase tracking-[0.4em] border border-violet-500/20 mb-5">
                        <MessageSquare className="h-3 w-3" /> Comentarios Reales
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-[1.1] mb-4">
                        <span className="text-foreground">Lo que dicen </span>
                        <span className="text-primary">nuestros usuarios</span>
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto font-bold uppercase tracking-wide">
                        Opiniones verificadas de personas y empresas registradas
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
                        <span className="ml-3 text-sm text-muted-foreground font-bold uppercase tracking-widest">Cargando...</span>
                    </div>
                ) : comentarios.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted/50 border border-border/20 mb-4">
                            <Quote className="h-7 w-7 text-muted-foreground/60" />
                        </div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-foreground/80 mb-2">Sin comentarios aún</h3>
                        <p className="text-xs text-muted-foreground/70 font-bold uppercase tracking-wider max-w-sm mx-auto">
                            Sé el primero en compartir tu experiencia con System Kyron.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {comentarios.map((c) => (
                            <Card key={c.id} className="group relative rounded-3xl border border-border/30 dark:border-white/[0.06] bg-card/60 dark:bg-white/[0.015] hover:bg-card/80 dark:hover:bg-white/[0.03] transition-all duration-500 shadow-lg hover:shadow-xl overflow-hidden">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <StarRating value={c.calificacion} readonly />
                                        {c.modulo && (
                                            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-primary/50 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
                                                {c.modulo}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-sm font-medium text-foreground/80 leading-relaxed italic">
                                        &ldquo;{c.texto}&rdquo;
                                    </p>

                                    <div className="flex items-center gap-3 pt-3 border-t border-border/20 dark:border-white/5">
                                        <Avatar className="h-9 w-9 border border-primary/15">
                                            <AvatarFallback className={cn(
                                                "text-[10px] font-black",
                                                c.tipo === 'juridico'
                                                    ? "bg-emerald-500/10 text-emerald-600"
                                                    : "bg-blue-500/10 text-blue-600"
                                            )}>
                                                {c.iniciales}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-black uppercase tracking-wide text-foreground truncate">
                                                {c.autor}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                {c.tipo === 'juridico' ? (
                                                    <Building2 className="h-2.5 w-2.5 text-emerald-500/60" />
                                                ) : (
                                                    <User className="h-2.5 w-2.5 text-blue-500/60" />
                                                )}
                                                <span className="text-[8px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                                                    {c.tipo === 'juridico' ? 'Empresa' : 'Persona'}
                                                </span>
                                                <span className="text-muted-foreground/40">·</span>
                                                <Clock className="h-2.5 w-2.5 text-muted-foreground/60" />
                                                <span className="text-[8px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                                                    {timeAgo(c.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                <div className="max-w-xl mx-auto">
                    {!showForm ? (
                        <div className="text-center">
                            <Button
                                onClick={() => setShowForm(true)}
                                variant="outline"
                                className="rounded-2xl h-12 px-8 text-xs font-black uppercase tracking-[0.2em] border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300"
                            >
                                <Sparkles className="h-4 w-4 mr-2" />
                                Dejar un Comentario
                            </Button>
                        </div>
                    ) : (
                        <Card className="rounded-3xl border-2 border-primary/20 bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden">
                            <CardContent className="p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black uppercase tracking-tight">
                                        Tu opinión
                                    </h3>
                                    <StarRating value={calificacion} onChange={setCalificacion} />
                                </div>

                                <Textarea
                                    value={texto}
                                    onChange={e => setTexto(e.target.value)}
                                    placeholder="Comparte tu experiencia con System Kyron... (mínimo 10 caracteres)"
                                    className="min-h-[100px] rounded-xl border-border/40 resize-none text-sm"
                                    maxLength={500}
                                />

                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                                        {texto.length}/500
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => { setShowForm(false); setTexto(''); setCalificacion(5); }}
                                            className="rounded-xl text-[10px] font-black uppercase tracking-wider"
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={submitting || texto.trim().length < 10}
                                            size="sm"
                                            className="rounded-xl text-[10px] font-black uppercase tracking-wider"
                                        >
                                            {submitting ? (
                                                <><Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> Publicando...</>
                                            ) : (
                                                <><Send className="h-3 w-3 mr-1.5" /> Publicar</>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] text-center">
                                    Debes tener sesión iniciada para comentar
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}
