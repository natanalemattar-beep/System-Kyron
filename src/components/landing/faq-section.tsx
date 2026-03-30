'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

export function FaqSection() {
    const t = useTranslations('FaqSection');
    const faqItems = t.raw('items') as Array<{ question: string; answer: string }>;

    return (
        <section id="faq" className="py-16 md:py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-10 max-w-4xl relative z-10">
                <div className="text-center mb-12 md:mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black uppercase tracking-[0.35em] text-primary mx-auto">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-black tracking-tight text-foreground uppercase leading-[1.1]">
                        {t('title_highlight')}{' '}
                        <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent italic">
                            {t('title_rest')}
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-xs md:text-sm max-w-lg mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="animate-[fadeSlideUp_0.5s_0.15s_both]">
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {faqItems.map((item, index) => (
                            <div key={index}>
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="border border-border/30 dark:border-white/[0.06] rounded-3xl px-6 overflow-hidden bg-card/50 dark:bg-white/[0.02] hover:bg-card/80 dark:hover:bg-white/[0.035] transition-all duration-500 hover:border-primary/20 hover:shadow-lg data-[state=open]:border-primary/30 data-[state=open]:shadow-xl data-[state=open]:bg-card/70"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center shrink-0">
                                                <span className="text-[10px] font-black text-primary">{String(index + 1).padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-black uppercase tracking-tight text-foreground/90 leading-snug">
                                                {item.question}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5 text-muted-foreground text-xs md:text-sm font-medium leading-relaxed pl-[3.25rem] border-t border-border/15 dark:border-white/[0.04] pt-4">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        ))}
                    </Accordion>

                    <div className="flex justify-center mt-10">
                        <Link href="/faq">
                            <Button
                                variant="outline"
                                className="group h-12 px-8 rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <span>{t('view_more')}</span>
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
