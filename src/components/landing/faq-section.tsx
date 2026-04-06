'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useDevicePerformance } from '@/hooks/use-device-performance';

export function FaqSection() {
    const t = useTranslations('FaqSection');
    const faqItems = t.raw('items') as Array<{ question: string; answer: string }>;
    const { tier } = useDevicePerformance();
    const animate = tier !== 'low';

    return (
        <section id="faq" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-sky-50/50 via-blue-50/40 to-indigo-50/30 dark:from-[hsl(224,28%,9%)] dark:via-[hsl(224,24%,8%)] dark:to-[hsl(224,28%,10%)]">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sky-300/30 dark:via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/25 dark:via-transparent to-transparent" />
                <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] rounded-full bg-sky-400/[0.07] dark:bg-sky-500/[0.03] blur-[100px]" />
                <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-indigo-400/[0.05] dark:bg-indigo-500/[0.03] blur-[90px]" />
            </div>
            <div className="container mx-auto px-4 md:px-10 max-w-4xl relative z-10">
                <motion.div
                    className="text-center mb-12 md:mb-16 space-y-4"
                    initial={animate ? { opacity: 0, y: 30 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full liquid-glass-subtle text-[10px] font-semibold uppercase tracking-[0.35em] text-primary mx-auto">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {t('badge')}
                    </div>
                    <h2 className="text-[clamp(1.75rem,5vw,3rem)] font-bold tracking-tight text-foreground uppercase leading-[1.1]">
                        {t('title_highlight')}{' '}
                        <span className="liquid-glass-text italic">
                            {t('title_rest')}
                        </span>
                    </h2>
                    <p className="text-muted-foreground text-xs md:text-sm max-w-lg mx-auto">
                        {t('subtitle')}
                    </p>
                </motion.div>

                <motion.div
                    initial={animate ? { opacity: 0, y: 25 } : undefined}
                    whileInView={animate ? { opacity: 1, y: 0 } : undefined}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {faqItems.map((item, index) => (
                            <div key={index}>
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="liquid-glass rounded-3xl px-6 transition-all duration-500 hover:border-primary/20 data-[state=open]:border-primary/30 data-[state=open]:shadow-xl"
                                >
                                    <AccordionTrigger className="text-left hover:no-underline py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center shrink-0">
                                                <span className="text-[10px] font-bold text-primary">{String(index + 1).padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-xs md:text-sm font-semibold uppercase tracking-tight text-foreground/90 leading-snug">
                                                {item.question}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-5 text-muted-foreground text-xs md:text-sm font-medium leading-relaxed pl-[3.25rem] border-t border-border/15 pt-4">
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
                                className="group h-12 px-8 rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 text-primary text-[10px] font-semibold uppercase tracking-wide transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
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
