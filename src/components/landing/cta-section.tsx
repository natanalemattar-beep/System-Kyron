
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Ticket } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHoliday } from "@/hooks/use-holiday";
import { cn } from "@/lib/utils";

const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2024-12-31") - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                días: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="flex justify-center gap-4 my-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center p-2 bg-background/50 rounded-lg w-20">
                    <div className="text-3xl font-bold">{String(value).padStart(2, '0')}</div>
                    <div className="text-xs uppercase text-muted-foreground">{unit}</div>
                </div>
            ))}
        </div>
    );
};


export function CtaSection() {
    const { isHolidayActive } = useHoliday();
    return (
        <section id="contacto" className="py-20 md:py-28 bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div 
                    className={cn(
                        "max-w-3xl mx-auto text-center border rounded-2xl p-8 md:p-12 shadow-lg",
                        isHolidayActive ? "bg-card/50 backdrop-blur-sm" : "bg-card"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full mb-4 font-semibold">
                       <Ticket className="h-5 w-5"/> OFERTA DE LANZAMIENTO
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold">Da el Salto a la Gestión Inteligente</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Regístrate antes de fin de año y obtén 30 días de acceso completo a nuestro Plan Profesional, totalmente gratis.
                    </p>
                    
                    <CountdownTimer />

                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                         <Button size="lg" variant="default" asChild className="w-full sm:w-auto text-base btn-3d-primary">
                            <Link href="/register">Obtener mis 30 Días Gratis <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
