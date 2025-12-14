
'use client';

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Layers, Bot, UserCheck, ArrowRight, AlertTriangle } from "lucide-react";
import { Logo } from "./logo";

const tutorialSteps = [
    {
        icon: AlertTriangle,
        title: "¡Bienvenido a la Versión de Prueba de Kyron!",
        description: "Esta es una versión de desarrollo. Encontrarás funcionalidades incompletas y posibles errores. Agradecemos tu comprensión.",
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

export default function WelcomeTutorial() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // This effect runs only on the client
        const hasSeenTutorial = localStorage.getItem("hasSeenKyronTutorial");
        if (!hasSeenTutorial) {
            const timer = setTimeout(() => {
                setOpen(true);
                localStorage.setItem("hasSeenKyronTutorial", "true");
            }, 2500); // Wait a bit after splash screen
            return () => clearTimeout(timer);
        }
    }, []);
    
    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-md p-0 border-0 bg-transparent shadow-none">
                 <Carousel className="w-full">
                    <CarouselContent>
                        {tutorialSteps.map((step, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <div className="flex flex-col h-[28rem] items-center justify-center p-10 text-center bg-card rounded-lg">
                                        <div className={`p-4 rounded-full mb-6 ${index === 0 ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                                           <step.icon className={`h-12 w-12 ${index === 0 ? 'text-destructive' : 'text-primary'}`} />
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                                        <p className="text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[-1.5rem] sm:left-[-3rem]" />
                    <CarouselNext className="right-[-1.5rem] sm:right-[-3rem]" />
                </Carousel>
                <div className="flex justify-center p-6 pt-2">
                     <Button onClick={() => setOpen(false)}>
                        Comenzar a Explorar <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
