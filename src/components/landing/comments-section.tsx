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
import { useTranslations } from 'next-intl';

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
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    type="button"
                    disabled={readonly}
                    onClick={() => onChange?.(star)}
                    className={cn(
                        "transition-all duration-200 p-0.5",
                        readonly ? "cursor-default" : "cursor-pointer hover:scale-125"
                    )}
                >
                    <Star className={cn(
                        "h-4 w-4 transition-colors",
                        star <= value
                            ? "fill-amber-400 text-amber-400"
                            : "text-muted-foreground/40"
                    )} />
                </button>
            ))}
        </div>
    );
}

function useTimeAgo(t: ReturnType<typeof useTranslations<'CommentsSection'>>) {
    return (dateStr: string) => {
        const now = new Date();
        const date = new Date(dateStr);
        const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diff < 60) return t('time_moment');
        if (diff < 3600) return t('time_min', { count: Math.floor(diff / 60) });
        if (diff < 86400) return t('time_hours', { count: Math.floor(diff / 3600) });
        if (diff < 604800) return t('time_days', { count: Math.floor(diff / 86400) });
        return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    };
}

export function CommentsSection() {
    const t = useTranslations('CommentsSection');
    const timeAgo = useTimeAgo(t);
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
            if (!res.ok) throw new Error('comentarios fetch failed');
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
            toast({ title: t('toast_short_title'), description: t('toast_short_desc'), variant: 'destructive' });
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
                toast({ title: t('toast_error_title'), description: data.error || t('toast_publish_error'), variant: 'destructive' });
                return;
            }
            toast({ title: t('toast_success_title'), description: t('toast_success_desc') });
            setTexto('');
            setCalificacion(5);
            setShowForm(false);
            fetchComentarios();
        } catch {
            toast({ title: t('toast_error_title'), description: t('toast_error_desc'), variant: 'destructive' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="py-16 md:py-24 bg-transparent relative overflow-hidden w-full">
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 left-0 w-[450px] h-[450px] rounded-full bg-violet-500/[0.12] blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.12] blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="text-center mb-10 md:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full liquid-glass-subtle text-violet-700 text-[9px] font-black uppercase tracking-[0.35em] mb-5">
                        <MessageSquare className="h-3 w-3" /> {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-black tracking-tight uppercase leading-[1.1] mb-4">
                        <span className="text-foreground">{t('title_prefix')} </span>
                        <span className="liquid-glass-text italic">{t('title_highlight')}</span>
                    </h2>
                    <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto font-bold uppercase tracking-wide">
                        {t('subtitle')}
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-6 w-6 animate-spin text-primary/60" />
                        <span className="ml-3 text-sm text-muted-foreground font-bold uppercase tracking-widest">{t('loading')}</span>
                    </div>
                ) : comentarios.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/15 to-violet-500/5 border border-violet-500/15 mb-4">
                            <Quote className="h-7 w-7 text-violet-500/60" />
                        </div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-foreground mb-2">{t('empty_title')}</h3>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider max-w-sm mx-auto">
                            {t('empty_subtitle')}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {comentarios.map((c) => (
                            <div key={c.id}>
                                <Card className="group relative rounded-3xl liquid-glass transition-all duration-500 h-full hover:-translate-y-1">
                                    <CardContent className="p-6 space-y-4 relative">
                                        <div className="flex items-start justify-between">
                                            <StarRating value={c.calificacion} readonly />
                                            {c.modulo && (
                                                <span className="text-[9px] sm:text-[7px] font-black uppercase tracking-[0.2em] text-primary/60 px-2 py-0.5 rounded-full bg-primary/5 border border-primary/10">
                                                    {c.modulo}
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-sm font-medium text-foreground/80 leading-relaxed italic">
                                            &ldquo;{c.texto}&rdquo;
                                        </p>

                                        <div className="flex items-center gap-3 pt-3 border-t border-border/20">
                                            <Avatar className="h-9 w-9 border border-primary/15 shadow-sm">
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
                                                    <span className="text-[10px] sm:text-[8px] font-bold text-muted-foreground uppercase tracking-wider">
                                                        {c.tipo === 'juridico' ? t('empresa') : t('persona')}
                                                    </span>
                                                    <span className="text-muted-foreground/40">·</span>
                                                    <Clock className="h-2.5 w-2.5 text-muted-foreground/50" />
                                                    <span className="text-[10px] sm:text-[8px] font-bold text-muted-foreground uppercase tracking-wider">
                                                        {timeAgo(c.created_at)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                )}

                <div className="max-w-xl mx-auto">
                    {!showForm ? (
                        <div className="text-center">
                            <Button
                                onClick={() => setShowForm(true)}
                                variant="outline"
                                className="rounded-2xl h-12 px-8 text-xs font-black uppercase tracking-[0.2em] border-violet-500/20 hover:bg-violet-500/5 hover:border-violet-500/40 transition-all duration-500"
                            >
                                <Sparkles className="h-4 w-4 mr-2 text-violet-500" />
                                {t('leave_comment')}
                            </Button>
                        </div>
                    ) : (
                        <Card className="rounded-3xl border-2 border-primary/20 bg-card/80 shadow-xl overflow-hidden">
                            <CardContent className="p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black uppercase tracking-tight">
                                        {t('your_opinion')}
                                    </h3>
                                    <StarRating value={calificacion} onChange={setCalificacion} />
                                </div>

                                <Textarea
                                    value={texto}
                                    onChange={e => setTexto(e.target.value)}
                                    placeholder={t('placeholder')}
                                    className="min-h-[100px] rounded-xl border-border/40 resize-none text-sm focus:border-primary/40"
                                    maxLength={500}
                                />

                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                                        {texto.length}/500
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => { setShowForm(false); setTexto(''); setCalificacion(5); }}
                                            className="rounded-xl text-[10px] font-black uppercase tracking-wider"
                                        >
                                            {t('cancel')}
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={submitting || texto.trim().length < 10}
                                            size="sm"
                                            className="rounded-xl text-[10px] font-black uppercase tracking-wider shadow-lg"
                                        >
                                            {submitting ? (
                                                <><Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> {t('publishing')}</>
                                            ) : (
                                                <><Send className="h-3 w-3 mr-1.5" /> {t('publish')}</>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-[10px] sm:text-[8px] font-bold text-muted-foreground/70 uppercase tracking-[0.2em] text-center">
                                    {t('login_required')}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    );
}
