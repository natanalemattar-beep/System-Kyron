'use client';

import { motion } from "framer-motion";
import { loginOptions } from "@/lib/login-options";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ServicesSection() {
    return (
        <section id="servicios" className="py-24 md:py-32 bg-background border-t border-border/40">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20 space-y-4">
                    <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Ecosistema de Soluciones</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto font-medium">Arquitectura modular diseñada para cubrir cada necesidad de su infraestructura operativa.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loginOptions.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.05 * index }}
                        >
                            <Link href={item.href} className="group block h-full bg-card hover:bg-muted/30 transition-all p-10 rounded-[1.5rem] border border-border/40 hover:border-primary/20 shadow-sm hover:shadow-xl relative overflow-hidden">
                                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                    <ArrowUpRight className="h-5 w-5 text-primary" />
                                </div>
                                
                                <div className="mb-8">
                                    <div className="p-4 bg-primary/5 rounded-2xl w-fit group-hover:bg-primary/10 transition-colors border border-primary/5">
                                        <item.icon className="h-6 w-6 text-primary" />
                                    </div>
                                </div>
                                
                                <h3 className="text-lg font-bold tracking-tight mb-3">{item.label}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-medium line-clamp-3">
                                    {item.description}
                                </p>
                                
                                <div className="mt-8 pt-8 border-t border-border/40 flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">Ver Detalles</span>
                                    <div className="h-1 w-8 rounded-full bg-primary/10 group-hover:bg-primary transition-all duration-500 group-hover:w-12" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}