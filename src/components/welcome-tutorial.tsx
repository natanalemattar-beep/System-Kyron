
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Layers, Bot, UserCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

const tutorialSteps = [
    {
        icon: Logo,
        title: "¡Bienvenido a Kyron!",
        description: "Tu nuevo centro de mando para la gestión empresarial. Simplifica la burocracia y enfócate en crecer.",
    },
    {
        icon: Layers,
        title: "Todo en un Solo Lugar",
        description: "Gestiona facturas, nóminas, impuestos y permisos. Todo integrado y automatizado para tu tranquilidad.",
    },
    {
        icon: Bot,
        title: "Asistente con IA",
        description: "Usa nuestro asistente de IA (el ícono en la esquina inferior derecha) para hacer preguntas y obtener ayuda al instante.",
    },
    {
        icon: UserCheck,
        title: "¡Estás Listo para Empezar!",
        description: "Explora los servicios, registra tu empresa o contáctanos si necesitas ayuda. Estamos aquí para ti.",
    }
];

export function WelcomeTutorial({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 border-0">
                 <Carousel className="w-full">
                    <CarouselContent>
                        {tutorialSteps.map((step, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <div className="flex flex-col h-[28rem] items-center justify-center p-10 text-center bg-card rounded-lg">
                                        <div className="p-4 bg-primary/10 rounded-full mb-6">
                                           <step.icon className="h-12 w-12 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4" />
                    <CarouselNext className="right-4" />
                </Carousel>
                <DialogFooter className="sm:justify-center p-6 pt-0">
                     <Button asChild onClick={() => onOpenChange(false)}>
                        <Link href="/register">
                            Comenzar <ArrowRight className="ml-2 h-4 w-4"/>
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

    