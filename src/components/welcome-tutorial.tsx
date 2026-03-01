'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Sparkles, 
    LayoutGrid, 
    Magnet, 
    ShieldCheck, 
    Rocket,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    UserCircle,
    UserPlus
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Bienvenido a System Kyron",
    description: "Estás ante el ecosistema de gestión más avanzado de Venezuela. Una plataforma de misión crítica diseñada para la excelencia.",
    icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10"
  },
  {
    title: "¿Cómo Iniciar Sesión?",
    description: "Toca el botón 'ACCESO' en la barra superior. Se desplegará una cuadrícula con todos los portales disponibles (Personal, Contabilidad, Legal, etc.). Solo elige el tuyo e ingresa.",
    icon: UserCircle,
    color: "text-primary",
    bg: "bg-primary/10"
  },
  {
    title: "¿Cómo Registrarte?",
    description: "Si aún no tienes cuenta, pulsa el botón 'REGISTRO'. Podrás elegir entre un perfil Personal o de Empresa para comenzar tu afiliación segura al sistema.",
    icon: UserPlus,
    color: "text-secondary",
    bg: "bg-secondary/10"
  },
  {
    title: "Tecnología e Innovación",
    description: "Descubre nuestras Papeleras Inteligentes con magnetismo, Smartphones Pro X y la asignación inmediata de líneas telefónicas desde tu panel.",
    icon: Magnet,
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Blindaje Fiscal con IA",
    description: "Tus operaciones están protegidas por inteligencia artificial predictiva y sellado inmutable en Blockchain (0% Riesgo Fiscal garantizado).",
    icon: ShieldCheck,
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "¡Todo Listo!",
    description: "Explora la plataforma, solicita tu demo gratuita y transforma la operatividad de tu empresa hoy mismo.",
    icon: Rocket,
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  }
];

export function WelcomeTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('kyron-tutorial-seen');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    localStorage.setItem('kyron-tutorial-seen', 'true');
    setIsOpen(false);
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none bg-background/80 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl">
        <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-muted flex">
                {steps.map((_, i) => (
                    <div 
                        key={i} 
                        className={cn(
                            "h-full transition-all duration-500",
                            i <= currentStep ? "bg-primary" : "bg-transparent"
                        )}
                        style={{ width: `${100 / steps.length}%` }}
                    />
                ))}
            </div>

            <div className="p-10 pt-12 text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.1, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                    >
                        <div className={cn("mx-auto w-24 h-24 rounded-3xl flex items-center justify-center shadow-inner relative group", step.bg)}>
                            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl scale-0 group-hover:scale-150 transition-transform duration-700"></div>
                            <Icon className={cn("h-12 w-12 relative z-10", step.color)} />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-2xl font-black tracking-tighter uppercase italic">{step.title}</h2>
                            <p className="text-muted-foreground font-medium leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <DialogFooter className="p-8 pt-0 flex-row justify-between items-center sm:justify-between gap-4">
                <Button 
                    variant="ghost" 
                    onClick={handleBack} 
                    disabled={currentStep === 0}
                    className="rounded-xl font-bold text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100"
                >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>

                <div className="flex gap-2">
                    {currentStep === steps.length - 1 ? (
                        <Button 
                            onClick={handleNext} 
                            className="btn-3d-primary rounded-xl px-8 h-12 text-[10px] font-black uppercase tracking-widest"
                        >
                            Comenzar <CheckCircle2 className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button 
                            onClick={handleNext} 
                            className="btn-3d-primary rounded-xl px-8 h-12 text-[10px] font-black uppercase tracking-widest"
                        >
                            Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </DialogFooter>

            <div className="p-4 bg-muted/30 text-center border-t">
                <div className="flex items-center justify-center gap-2">
                    <Logo className="h-4 w-4 opacity-40" />
                    <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">System Kyron Guidance • v2.0</span>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
