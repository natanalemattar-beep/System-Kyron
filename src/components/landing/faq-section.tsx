'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, ArrowRight, Search } from "lucide-react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';
import { useState } from 'react';

export function FaqSection() {
    const t = useTranslations('FaqSection');
    const faqItems = t.raw('items') as Array<{ question: string; answer: string; category: string }>;
    const categories = t.raw('categories') as Record<string, string>;
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categoryKeys = ['all', ...Object.keys(categories)];

    const filteredItems = faqItems
        .filter(item => activeCategory === 'all' || item.category === activeCategory)
        .filter(item =>
            !searchQuery ||
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <section id="faq" className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/40 to-indigo-50/30 dark:from-[#060a14] dark:via-[#080d18] dark:to-[#060a14]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent" />
                <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[120px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
            </div>
            <div className="container mx-auto px-4 md:px-10 max-w-4xl relative z-10">
                <motion.div
                    className="text-center mb-14 md:mb-18 space-y-5"
                    initial={animate ? { opacity: 0, y: 40 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-500 dark:text-cyan-400 mx-auto">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.5rem,4.5vw,3rem)] font-bold tracking-tight text-foreground uppercase leading-[1.1] break-words">
                        {t('title_highlight')}{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {t('title_rest')}
                        </span>
                    </h2>
                    <p className="text-muted-foreground/50 text-sm max-w-lg mx-auto font-medium">
                        {t('subtitle')}
                    </p>

                    <div className="flex flex-wrap justify-center gap-2">
                        {categoryKeys.map((key) => (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 border",
                                    activeCategory === key
                                        ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-transparent shadow-[0_4px_16px_-4px_rgba(14,165,233,0.4)]"
                                        : "border-white/[0.08] bg-white/[0.02] text-muted-foreground/50 hover:text-foreground hover:border-white/[0.15]"
                                )}
                            >
                                {key === 'all' ? t('all_categories') : categories[key]}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-md mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30" />
                        <input
                            type="text"
                            placeholder={t('search_placeholder')}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium bg-white/[0.03] border border-white/[0.08] text-foreground placeholder:text-muted-foreground/25 focus:outline-none focus:border-cyan-500/30 transition-colors"
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {filteredItems.map((item, index) => (
                            <div key={index}>
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="rounded-2xl border-2 border-white/[0.06] bg-white/[0.02] px-6 transition-all duration-500 hover:border-white/[0.1] data-[state=open]:border-cyan-500/20 data-[state=open]:bg-white/[0.04] data-[state=open]:shadow-xl"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/15 flex items-center justify-center shrink-0">
                                                <span className="text-[10px] font-black text-cyan-400">{String(index + 1).padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-bold text-foreground/70 leading-snug">
                                                {item.question}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5 text-muted-foreground/50 text-xs md:text-sm font-medium leading-relaxed pl-[3.25rem] border-t border-white/[0.06] pt-4">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        ))}
                    </Accordion>

                    <div className="flex justify-center mt-12">
                        <Link href="/faq">
                            <Button
                                variant="outline"
                                className="group h-12 px-8 rounded-2xl border-2 border-cyan-500/20 bg-cyan-500/[0.04] hover:bg-cyan-500/[0.08] text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5"
                            >
                                <span>{t('view_more')}</span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
