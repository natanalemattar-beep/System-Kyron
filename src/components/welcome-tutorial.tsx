
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
  ShieldCheck,
  Rocket,
  ChevronRight,
  ChevronLeft,
  CircleCheck as CheckCircle2,
  CircleUser as UserCircle,
  UserPlus,
  Building2,
  Brain,
  LayoutDashboard,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Bienvenido a System Kyron",
    description: "La plataforma de gestión empresarial más completa de Venezuela. Contabilidad, nómina, facturación, legal, telecomunicaciones e IA — todo en un solo ecosistema. Estamos en versión demo y seguimos creciendo.",
    icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    title: "Accede a tu Portal",
    description: "Haz clic en el botón 'ACCESO' en la barra superior. Se desplegará un menú con todos los portales disponibles. Selecciona el tuyo (Personal o Empresarial) e ingresa con tu correo y contraseña.",
    icon: UserCircle,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Crea tu Cuenta",
    description: "¿Aún no tienes cuenta? Pulsa 'REGISTRO' y elige entre un perfil Ciudadano (persona natural) o un perfil Empresarial (persona jurídica). El proceso es rápido, seguro y 100% en línea.",
    icon: UserPlus,
    color: "text-secondary",
    bg: "bg-secondary/10",
  },
  {
    title: "Panel Empresarial",
    description: "Gestiona tu empresa desde el Centro de Mando: lleva tu contabilidad bajo normas VEN-NIF, controla nómina, inventario, cuentas por cobrar y pagar, facturación y mucho más desde una sola consola.",
    icon: Building2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    title: "Portal Ciudadano",
    description: "Si eres persona natural, accede a tu Terminal Ciudadana: centraliza tus trámites, documentos civiles, historial de gestiones y asistencia legal personalizada desde un solo lugar.",
    icon: LayoutDashboard,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    title: "Blindaje Fiscal con IA",
    description: "Nuestro motor de inteligencia artificial audita tus operaciones en tiempo real contra la Gaceta Oficial venezolana. Detecta errores fiscales antes de que ocurran y genera documentos legales automáticamente.",
    icon: ShieldCheck,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "¡Estás Listo!",
    description: "Explora libremente la plataforma. Recuerda que estás en versión demo — todos los datos comienzan en cero cuando te registras. Cualquier duda, usa el botón de WhatsApp en la página principal.",
    icon: Rocket,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
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
        <DialogHeader className="sr-only">
          <DialogTitle>Bienvenido al Ecosistema Kyron</DialogTitle>
          <DialogDescription>Tutorial de introducción a la plataforma System Kyron.</DialogDescription>
        </DialogHeader>

        <div className="relative">
          {/* Barra de progreso */}
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
                  <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl scale-0 group-hover:scale-150 transition-transform duration-700" />
                  <Icon className={cn("h-12 w-12 relative z-10", step.color)} />
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic">{step.title}</h2>
                  <p className="text-muted-foreground font-medium leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Indicador de paso */}
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/30">
                  {currentStep + 1} / {steps.length}
                </p>
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
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="btn-3d-primary rounded-xl px-8 h-12 text-[10px] font-black uppercase tracking-widest shadow-glow"
                >
                  Siguiente <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="btn-3d-primary rounded-xl px-8 h-12 text-[10px] font-black uppercase tracking-widest shadow-glow"
                >
                  Comenzar <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogFooter>

          <div className="p-4 bg-muted/30 text-center border-t border-white/5">
            <div className="flex items-center justify-center gap-2">
              <Logo className="h-4 w-4 opacity-40" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 italic">System Kyron • v2.7.0 Demo</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
