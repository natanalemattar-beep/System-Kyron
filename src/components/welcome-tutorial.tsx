
"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Layers, Bot, UserCheck, ArrowRight } from "lucide-react";
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
        description: "Explora los servicios en el menú superior y comienza a gestionar tu empresa de forma más inteligente.",
    }
];

export function WelcomeTutorial() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem("hasSeenKyronTutorial");
        if (!hasSeenTutorial) {
            setOpen(true);
            localStorage.setItem("hasSeenKyronTutorial", "true");
        }
    }, []);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                <div className="flex justify-center p-6 pt-0">
                     <Button onClick={() => setOpen(false)}>
                        Comenzar a Explorar <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
