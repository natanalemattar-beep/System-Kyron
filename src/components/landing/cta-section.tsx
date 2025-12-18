
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function CtaSection() {
    return (
        <section id="contacto" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className="max-w-3xl mx-auto text-center bg-card/50 backdrop-blur-sm border rounded-2xl p-8 md:p-12 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold">Tu Ecosistema de Gestión y Cumplimiento</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Simplifica tu operación, garantiza tu tranquilidad fiscal y toma el control total de tu negocio. Comienza hoy.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button size="lg" asChild className="w-full sm:w-auto text-base">
                            <Link href="/planes-y-precios">Ver Planes y Precios</Link>
                        </Button>
                         <Button size="lg" variant="default" asChild className="w-full sm:w-auto text-base btn-3d-primary">
                            <Link href="/register">Crear Cuenta Gratis <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
