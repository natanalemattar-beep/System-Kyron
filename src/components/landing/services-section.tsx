
'use client';

import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
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
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">Un Ecosistema 360° Real y Funcional</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Cada módulo es un portal independiente e integrado. Haz clic para explorar las herramientas de cada departamento.</p>
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
                            <Card className={cn(
                                "h-full transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 flex flex-col border-2",
                                isHolidayActive ? "bg-card/50 backdrop-blur-sm" : "bg-card"
                            )}>
                               <CardHeader className="flex-row items-center gap-4">
                                  <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
                                      <item.icon className="h-6 w-6" />
                                  </div>
                                  <CardTitle className="text-lg">{item.label}</CardTitle>
                               </CardHeader>
                               <CardContent className="flex-grow">
                                   <p className="text-sm text-muted-foreground">{item.description}</p>
                               </CardContent>
                               <CardContent>
                                    <Button asChild variant="secondary" size="sm" className="w-full group">
                                        <Link href={item.href}>
                                            Acceder al Portal <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </Button>
                               </CardContent>
                           </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
