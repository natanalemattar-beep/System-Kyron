'use client';

import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { loginOptions } from "@/lib/login-options";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function ServicesSection() {
    const { isHolidayActive } = useHoliday();
    
    return (
        <section id="servicios" className="section-padding bg-background relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="max-w-3xl mb-16 md:mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-4">
                        <Sparkles className="h-3.5 w-3.5" /> Módulos Integrados
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-balance leading-none">
                        Un Ecosistema <br/> <span className="text-muted-foreground/40 italic">Sin Fronteras</span>
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground font-medium max-w-xl">
                        Cada departamento es una herramienta de precisión. Elige tu punto de entrada para tomar el control total.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loginOptions.map((item, index) => (
                        <motion.div
                            key={item.label} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.05 * index }}
                        >
                            <Link href={item.href} className="group block h-full">
                                <Card className={cn(
                                    "h-full border-2 border-transparent hover:border-primary/10 bg-secondary/30 transition-all duration-500 rounded-[2rem] overflow-hidden flex flex-col relative",
                                    isHolidayActive && "backdrop-blur-sm"
                                )}>
                                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <ArrowUpRight className="h-6 w-6 text-primary" />
                                    </div>
                                    
                                    <CardHeader className="p-8 pb-4">
                                        <div className="p-4 bg-background rounded-2xl w-fit shadow-xl border border-primary/5 group-hover:scale-110 transition-transform duration-500">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                    </CardHeader>
                                    
                                    <CardContent className="p-8 pt-4 flex-grow">
                                        <CardTitle className="text-2xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors">{item.label}</CardTitle>
                                        <p className="text-muted-foreground text-sm leading-relaxed font-medium">
                                            {item.description}
                                        </p>
                                    </CardContent>

                                    <div className="p-8 pt-0 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Explorar Módulo</span>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}