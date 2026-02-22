
'use client';

import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { loginOptions } from "@/lib/login-options";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ServicesSection() {
    const { isHolidayActive } = useHoliday();
    
    return (
        <section id="servicios" className={cn("py-20 md:py-28", !isHolidayActive && "bg-muted/30", isHolidayActive && "bg-background/80 backdrop-blur-lg")}>
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">Un Ecosistema 360° Real y Funcional</h2>
                    <p className="mt-4 text-lg text-muted-foreground text-balance">Cada módulo es un portal independiente e integrado. Haz clic en cualquier tarjeta para explorar las herramientas de cada departamento.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loginOptions.map((item, index) => (
                        <motion.div
                            key={item.label} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: 0.05 * index }}
                        >
                            <Link href={item.href} className="block h-full group outline-none">
                                <Card className={cn(
                                    "h-full transition-all duration-500 border-2 hover:border-primary/40 hover:bg-primary/[0.02] hover:shadow-2xl flex flex-col relative overflow-hidden group-focus-visible:ring-2 group-focus-visible:ring-primary",
                                    isHolidayActive ? "bg-card/50 backdrop-blur-sm" : "bg-card"
                                )}>
                                    {/* Decoración sutil de fondo */}
                                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />
                                    
                                    <CardHeader className="flex-row items-center gap-5 relative z-10 p-8 pb-6">
                                        <div className="p-4 bg-primary/5 text-primary rounded-2xl w-fit group-hover:scale-110 group-hover:bg-primary/10 group-hover:shadow-lg group-hover:shadow-primary/5 transition-all duration-500 border border-primary/5">
                                            <item.icon className="h-7 w-7" />
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300 font-bold">{item.label}</CardTitle>
                                    </CardHeader>
                                    
                                    <CardContent className="flex-grow relative z-10 px-8 pb-8">
                                        <p className="text-muted-foreground text-base leading-relaxed">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                    
                                    <div className="px-8 pb-8 mt-auto relative z-10 pt-4 border-t border-primary/5">
                                        <div className="flex items-center text-xs font-black uppercase tracking-[0.25em] text-primary/40 group-hover:text-primary transition-all duration-500">
                                            Acceder al Sistema <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-3" />
                                        </div>
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
