'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
    MessageSquare, Star, Send, Loader2, User, Building2, Clock,
    Quote, Sparkles, LogIn,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/auth/context';
import { Link } from '@/navigation';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';

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
                        "transition-all duration-200 p-0.5",
                        readonly ? "cursor-default" : "cursor-pointer hover:scale-125"
                    )}
                >
                    <Star className={cn(
                        "h-3.5 w-3.5 transition-colors",
                        star <= value
                            ? "fill-amber-400 text-amber-400"
                            : "text-foreground/15"
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

const avatarGradients = [
    'from-cyan-500 to-blue-600',
    'from-violet-500 to-purple-600',
    'from-emerald-500 to-green-600',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-pink-600',
    'from-indigo-500 to-blue-700',
];

export function CommentsSection() {
    const t = useTranslations('CommentsSection');
    const timeAgo = useTimeAgo(t);
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const [loading, setLoading] = useState(true);
    const [texto, setTexto] = useState('');
    const [calificacion, setCalificacion] = useState(5);
    const [submitting, setSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const { toast } = useToast();
    const { user, isLoading: authLoading } = useAuth();

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
        <section className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-bl from-purple-50/60 via-violet-50/40 to-indigo-50/50 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />
                <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/[0.03] blur-[150px]" />
                <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] rounded-full bg-indigo-500/[0.02] blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 md:px-10 max-w-6xl relative z-10">
                <motion.div
                    className="text-center mb-14 md:mb-18"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-violet-500/20 bg-violet-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-violet-500 dark:text-violet-400 mx-auto mb-6">
                        <MessageSquare className="h-3.5 w-3.5" /> {t('badge')}
                    </div>
                    <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black tracking-[-0.02em] text-foreground leading-[0.95] mb-5">
                        <span className="text-foreground">{t('title_prefix')} </span>
                        <span className="bg-gradient-to-r from-violet-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('title_highlight')}</span>
                    </h2>
                    <p className="text-sm text-muted-foreground/50 max-w-lg mx-auto font-medium">
                        {t('subtitle')}
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex items-center justify-center py-16">
                        <Loader2 className="h-6 w-6 animate-spin text-violet-400/60" />
                        <span className="ml-3 text-xs text-muted-foreground/40 font-bold uppercase tracking-[0.2em]">{t('loading')}</span>
                    </div>
                ) : comentarios.length === 0 ? (
                    <motion.div
                        className="text-center py-16"
                        initial={animate ? { opacity: 0, y: 20 } : undefined}
                        whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/15 to-violet-500/5 border border-violet-500/15 mb-5">
                            <Quote className="h-8 w-8 text-violet-400/50" />
                        </div>
                        <h3 className="text-lg font-black uppercase tracking-tight text-foreground mb-2">{t('empty_title')}</h3>
                        <p className="text-xs text-muted-foreground/40 font-medium max-w-sm mx-auto">
                            {t('empty_subtitle')}
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
                        {comentarios.map((c, i) => (
                            <motion.div
                                key={c.id}
                                initial={animate ? { opacity: 0, y: 30, scale: 0.95 } : undefined}
                                whileInView={animate ? { opacity: 1, y: 0, scale: 1 } : undefined}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="group relative rounded-2xl border-2 border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 space-y-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-white/[0.1] h-full">
                                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex items-start justify-between">
                                        <StarRating value={c.calificacion} readonly />
                                        {c.modulo && (
                                            <span className="text-[8px] font-bold uppercase tracking-[0.15em] text-violet-400/60 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/15">
                                                {c.modulo}
                                            </span>
                                        )}
                                    </div>

                                    <div className="relative">
                                        <Quote className="absolute -top-1 -left-1 h-5 w-5 text-violet-500/[0.08]" />
                                        <p className="text-sm font-medium text-foreground/60 leading-relaxed pl-5">
                                            {c.texto}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.04]">
                                        <Avatar className="h-9 w-9 border-2 border-white/[0.08] shadow-lg">
                                            <AvatarFallback className={cn(
                                                "text-[10px] font-black text-white bg-gradient-to-br",
                                                avatarGradients[i % avatarGradients.length]
                                            )}>
                                                {c.iniciales}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold text-foreground/70 truncate">
                                                {c.autor}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                {c.tipo === 'juridico' ? (
                                                    <Building2 className="h-2.5 w-2.5 text-emerald-400/60" />
                                                ) : (
                                                    <User className="h-2.5 w-2.5 text-cyan-400/60" />
                                                )}
                                                <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.15em]">
                                                    {c.tipo === 'juridico' ? t('empresa') : t('persona')}
                                                </span>
                                                <span className="text-white/10">·</span>
                                                <Clock className="h-2.5 w-2.5 text-muted-foreground/20" />
                                                <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.15em]">
                                                    {timeAgo(c.created_at)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                <motion.div
                    className="max-w-xl mx-auto"
                    initial={animate ? { opacity: 0, y: 20 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {!authLoading && !user ? (
                        <div className="text-center space-y-4">
                            <p className="text-xs font-bold text-muted-foreground/40 uppercase tracking-[0.2em]">
                                {t('login_required')}
                            </p>
                            <Link href="/login">
                                <Button
                                    variant="outline"
                                    className="rounded-2xl h-12 px-8 text-[10px] font-bold uppercase tracking-[0.15em] border-2 border-violet-500/20 bg-violet-500/[0.04] hover:bg-violet-500/[0.08] hover:border-violet-500/30 text-violet-400 transition-all duration-500 hover:shadow-lg hover:shadow-violet-500/5"
                                >
                                    <LogIn className="h-4 w-4 mr-2" />
                                    {t('login_to_comment')}
                                </Button>
                            </Link>
                        </div>
                    ) : !showForm ? (
                        <div className="text-center">
                            <Button
                                onClick={() => setShowForm(true)}
                                className="rounded-2xl h-12 px-8 text-[10px] font-bold uppercase tracking-[0.15em] bg-gradient-to-r from-violet-500 via-purple-600 to-pink-600 text-white border-0 shadow-[0_8px_32px_-4px_rgba(139,92,246,0.3)] hover:shadow-[0_16px_48px_-8px_rgba(139,92,246,0.4)] hover:scale-[1.03] transition-all duration-500"
                            >
                                <Sparkles className="h-4 w-4 mr-2" />
                                {t('leave_comment')}
                            </Button>
                        </div>
                    ) : (
                        <div className="rounded-2xl border-2 border-violet-500/20 bg-white/[0.03] backdrop-blur-sm shadow-2xl overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
                            <div className="p-6 space-y-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold uppercase tracking-tight text-foreground">
                                        {t('your_opinion')}
                                    </h3>
                                    <StarRating value={calificacion} onChange={setCalificacion} />
                                </div>

                                <Textarea
                                    value={texto}
                                    onChange={e => setTexto(e.target.value)}
                                    placeholder={t('placeholder')}
                                    className="min-h-[100px] rounded-xl border-white/[0.08] bg-white/[0.02] resize-none text-sm focus:border-violet-500/30 placeholder:text-muted-foreground/20"
                                    maxLength={500}
                                />

                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.15em] tabular-nums">
                                        {texto.length}/500
                                    </span>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => { setShowForm(false); setTexto(''); setCalificacion(5); }}
                                            className="rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/40 hover:text-foreground"
                                        >
                                            {t('cancel')}
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={submitting || texto.trim().length < 10}
                                            size="sm"
                                            className="rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
                                        >
                                            {submitting ? (
                                                <><Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> {t('publishing')}</>
                                            ) : (
                                                <><Send className="h-3 w-3 mr-1.5" /> {t('publish')}</>
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <p className="text-[10px] font-bold text-muted-foreground/25 uppercase tracking-[0.15em] text-center">
                                    {t('commenting_as', { name: user?.nombre || '' })}
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
