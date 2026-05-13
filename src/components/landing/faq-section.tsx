'use client';

import { useTranslations } from 'next-intl';
import { 
    Accordion, 
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger 
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, Sparkles } from "lucide-react";
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export function FaqSection() {
    const t = useTranslations('FaqSection');
    const [search, setSearch] = useState('');
    
    const categories = t.raw('categories') as Record<string, string>;
    const items = t.raw('items') as Array<{ question: string, answer: string, category: string }>;

    const filteredItems = items.filter(item => 
        item.question.toLowerCase().includes(search.toLowerCase()) || 
        item.answer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="py-24 relative overflow-hidden bg-[#03050a]">
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <Badge variant="outline" className="mb-4 px-4 py-1 border-cyan-500/30 bg-cyan-500/5 text-cyan-400 uppercase tracking-widest text-[10px] font-black">
                        {t('badge')}
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter">
                        {t('title_highlight')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{t('title_rest')}</span>
                    </h2>
                    <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {/* Search Bar */}
                    <div className="relative mb-12 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                        <Input 
                            type="text"
                            placeholder={t('search_placeholder')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-14 pl-12 bg-white/5 border-white/10 rounded-2xl focus:border-cyan-500/50 focus:ring-cyan-500/20 text-white placeholder:text-slate-600 transition-all"
                        />
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                        {filteredItems.map((item, index) => (
                            <AccordionItem 
                                key={index} 
                                value={`item-${index}`}
                                className="border border-white/5 bg-white/[0.02] rounded-2xl px-6 overflow-hidden hover:bg-white/[0.04] transition-all"
                            >
                                <AccordionTrigger className="hover:no-underline py-6">
                                    <div className="flex items-center gap-4 text-left">
                                        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                                            <HelpCircle className="h-5 w-5 text-cyan-400" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500/60">
                                                {categories[item.category] || item.category}
                                            </span>
                                            <span className="text-white font-bold text-lg leading-tight">
                                                {item.question}
                                            </span>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pb-6 pt-2 text-slate-400 text-base leading-relaxed border-t border-white/5">
                                    <div className="pl-14">
                                        {item.answer}
                                        <div className="mt-4 flex items-center gap-2 text-cyan-400/40 text-[10px] font-black uppercase tracking-widest">
                                            <Sparkles className="h-3 w-3" /> System Kyron Assistant Verified
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                            <HelpCircle className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
                                No se encontraron resultados para "{search}"
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
