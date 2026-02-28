'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { loginOptions } from "@/lib/login-options";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function ServicesSection() {
    return (
        <section id="servicios" className="py-24 md:py-32 bg-background border-t border-primary/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/5 border border-primary/5 overflow-hidden rounded-[2rem]">
                    {loginOptions.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.05 * index }}
                        >
                            <Link href={item.href} className="group block h-full bg-background hover:bg-primary/[0.02] transition-colors p-10 relative">
                                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-2 group-hover:translate-x-0">
                                    <ArrowUpRight className="h-5 w-5 text-primary" />
                                </div>
                                
                                <div className="mb-8">
                                    <item.icon className="h-8 w-8 text-primary/40 group-hover:text-primary transition-colors" />
                                </div>
                                
                                <h3 className="text-xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">{item.label}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed font-medium line-clamp-3">
                                    {item.description}
                                </p>
                                
                                <div className="mt-8 pt-8 border-t border-primary/5 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 group-hover:text-primary transition-colors">Acceder</span>
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary/10 group-hover:bg-primary transition-colors" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
