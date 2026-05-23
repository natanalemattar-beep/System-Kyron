'use client';

import { useState } from 'react';
import { Link } from "@/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    MessageCircle,
    Search,
    Headphones
} from "lucide-react";
import { PageTransition } from "@/components/ui/motion";
import { faqCategories } from "@/data/faq-data";

export default function FaqPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredCategories = faqCategories.map(cat => ({
        ...cat,
        questions: cat.questions.filter(q =>
            searchQuery === '' ||
            (q.question || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            (q.answer || '').toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat =>
        cat.questions.length > 0 &&
        (activeCategory === null || cat.id === activeCategory)
    );

    const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

    return (
        <PageTransition>
            <div className="min-h-screen bg-background">
                <div className="bg-gradient-to-b from-background via-muted/50 to-transparent">
                    <div className="container mx-auto px-4 md:px-10 max-w-6xl pt-8 pb-16">
                        <Link href="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors mb-8 group">
                            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                            Volver al inicio
                        </Link>

                        <div className="text-center space-y-4 mb-10">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary mx-auto">
                                <MessageCircle className="h-3.5 w-3.5" />
                                Centro de Ayuda
                            </div>
                            <h1 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight text-foreground uppercase leading-[1.1]">
                                Preguntas{' '}
                                <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent italic">
                                    Frecuentes
                                </span>
                            </h1>
                            <p className="text-muted-foreground text-xs md:text-sm max-w-2xl mx-auto">
                                Encuentra respuestas detalladas sobre cada módulo de System Kyron. {totalQuestions} preguntas organizadas en {faqCategories.length} categorías.
                            </p>
                        </div>

                        <div className="max-w-xl mx-auto mb-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                                <input
                                    type="text"
                                    placeholder="Buscar en las preguntas frecuentes..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full h-12 pl-11 pr-4 rounded-2xl border border-border/30 bg-card/50 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setActiveCategory(null)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all border ${
                                    activeCategory === null
                                        ? 'bg-primary/10 border-primary/30 text-primary'
                                        : 'bg-card/30 border-border/20 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                                }`}
                            >
                                Todas ({totalQuestions})
                            </button>
                            {faqCategories.map(cat => {
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[10px] font-semibold uppercase tracking-wider transition-all border ${
                                            activeCategory === cat.id
                                                ? 'bg-primary/10 border-primary/30 text-primary'
                                                : 'bg-card/30 border-border/20 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                                        }`}
                                    >
                                        <Icon className="h-3 w-3" />
                                        {cat.title}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-10 max-w-4xl pb-20 -mt-2">
                    {filteredCategories.length === 0 ? (
                        <div className="text-center py-16">
                            <Search className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                            <p className="text-muted-foreground text-sm">No se encontraron resultados para &ldquo;{searchQuery}&rdquo;</p>
                            <button
                                onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
                                className="mt-3 text-primary text-xs font-semibold hover:underline"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {filteredCategories.map((category) => {
                                const Icon = category.icon;
                                return (
                                    <section key={category.id} id={category.id}>
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${category.color} border ${category.borderColor} flex items-center justify-center shrink-0`}>
                                                <Icon className={`h-[18px] w-[18px] ${category.textColor}`} />
                                            </div>
                                            <div>
                                                <h2 className="text-sm font-semibold uppercase tracking-tight text-foreground">
                                                    {category.title}
                                                </h2>
                                                <p className="text-[10px] text-muted-foreground/60 uppercase tracking-wider">
                                                    {category.questions.length} {category.questions.length === 1 ? 'pregunta' : 'preguntas'}
                                                </p>
                                            </div>
                                        </div>

                                        <Accordion type="single" collapsible className="w-full space-y-3">
                                            {category.questions.map((item, index) => (
                                                <AccordionItem
                                                    key={index}
                                                    value={`${category.id}-${index}`}
                                                    className="border border-border/30 rounded-2xl px-6 overflow-hidden bg-card/50 hover:bg-card/80 transition-all duration-350 ease-out hover:border-primary/20 hover:shadow-lg data-[state=open]:border-primary/30 data-[state=open]:shadow-xl data-[state=open]:bg-card/70"
                                                >
                                                    <AccordionTrigger className="text-left hover:no-underline py-4">
                                                        <span className="text-xs md:text-sm font-bold text-foreground/90 leading-snug">
                                                            {item.question}
                                                        </span>
                                                    </AccordionTrigger>
                                                    <AccordionContent className="pb-5 text-muted-foreground text-xs md:text-sm font-medium leading-relaxed border-t border-border/15 pt-4">
                                                        {item.answer}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </section>
                                );
                            })}
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <div className="inline-block p-8 rounded-3xl border border-border/20 bg-card/30">
                            <Headphones className="h-8 w-8 text-primary/60 mx-auto mb-3" />
                            <h3 className="text-sm font-semibold uppercase tracking-tight text-foreground mb-1">
                                ¿No encontraste tu respuesta?
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4 max-w-sm mx-auto">
                                Nuestro equipo de soporte y asistencia técnica de guardia para ayudarte.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/login">
                                    <Button className="h-10 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-wider">
                                        Contactar Soporte
                                    </Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="outline" className="h-10 px-6 rounded-xl text-[10px] font-semibold uppercase tracking-wider border-border/30">
                                        Volver al inicio
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
