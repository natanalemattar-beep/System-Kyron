
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
  LayoutDashboard,
  X,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Bienvenido a System Kyron",
    description: "La plataforma de gestión empresarial más completa de Venezuela. Contabilidad, nómina, facturación, legal, Mi Línea e IA — todo en un solo ecosistema.",
    icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-400/15",
    border: "border-yellow-400/20",
    glow: "shadow-[0_0_40px_theme(colors.yellow.400/15)]",
    tag: "BIENVENIDA",
  },
  {
    title: "Accede a tu Portal",
    description: "Haz clic en el botón ACCESO en la barra superior. Se desplegará un menú con todos los portales disponibles. Selecciona el tuyo e ingresa con tu correo y contraseña.",
    icon: UserCircle,
    color: "text-primary",
    bg: "bg-primary/15",
    border: "border-primary/20",
    glow: "shadow-[0_0_40px_theme(colors.teal.500/15)]",
    tag: "ACCESO",
  },
  {
    title: "Crea tu Cuenta",
    description: "¿Nuevo en la plataforma? Pulsa REGISTRARSE y elige entre un perfil Ciudadano (persona natural) o un perfil Empresarial. El proceso toma menos de 2 minutos.",
    icon: UserPlus,
    color: "text-secondary",
    bg: "bg-secondary/15",
    border: "border-secondary/20",
    glow: "shadow-[0_0_40px_theme(colors.cyan.400/15)]",
    tag: "REGISTRO",
  },
  {
    title: "Panel Empresarial",
    description: "Gestiona tu empresa desde el ecosistema que unifica conectividad, fiscalidad y sostenibilidad: contabilidad VEN-NIF, nómina con SSO, facturación SENIAT con tasa BCV, cuentas por pagar y cobrar, y mucho más.",
    icon: Building2,
    color: "text-blue-400",
    bg: "bg-blue-400/15",
    border: "border-blue-400/20",
    glow: "shadow-[0_0_40px_theme(colors.blue.400/15)]",
    tag: "EMPRESA",
  },
  {
    title: "Portal Ciudadano",
    description: "Persona natural? Accede a tu Terminal Ciudadana: centraliza trámites, documentos civiles, historial y asistencia legal personalizada desde un único lugar.",
    icon: LayoutDashboard,
    color: "text-emerald-400",
    bg: "bg-emerald-400/15",
    border: "border-emerald-400/20",
    glow: "shadow-[0_0_40px_theme(colors.emerald.400/15)]",
    tag: "CIUDADANO",
  },
  {
    title: "Blindaje Fiscal con IA",
    description: "Nuestro motor de inteligencia artificial (Gemini 1.5 Pro) audita tus operaciones en tiempo real contra la Gaceta Oficial. Detecta errores fiscales y genera documentos legales automáticamente.",
    icon: ShieldCheck,
    color: "text-violet-400",
    bg: "bg-violet-400/15",
    border: "border-violet-400/20",
    glow: "shadow-[0_0_40px_theme(colors.violet.400/15)]",
    tag: "IA FISCAL",
  },
  {
    title: "¡Todo Listo!",
    description: "Navega libremente por la plataforma. Estás en versión demo — todos los datos comienzan en cero al registrarte. Descubre todo lo que System Kyron tiene para ti.",
    icon: Rocket,
    color: "text-rose-400",
    bg: "bg-rose-400/15",
    border: "border-rose-400/20",
    glow: "shadow-[0_0_40px_theme(colors.rose.400/15)]",
    tag: "LISTO",
  },
];

export function WelcomeTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const justRegistered = localStorage.getItem('kyron-just-registered');
    if (justRegistered) {
      localStorage.removeItem('kyron-just-registered');
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
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentStep(0);
  };

  const step = steps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[90vw] sm:max-w-[640px] p-0 overflow-hidden border border-border/50 bg-background/90 backdrop-blur-3xl rounded-[2rem] shadow-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Bienvenido al Ecosistema Kyron</DialogTitle>
          <DialogDescription>Tutorial de introducción a la plataforma System Kyron.</DialogDescription>
        </DialogHeader>

        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted/50 z-10">
          <motion.div
            className="h-full bg-primary shadow-glow-sm"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 z-20 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Main content */}
        <div className="pt-8 pb-6 px-8 sm:px-10">

          {/* Step tag */}
          <div className="flex items-center justify-between mb-8">
            <span className={cn(
              "inline-flex items-center px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-[0.4em] border",
              step.bg, step.color, step.border
            )}>
              {step.tag}
            </span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
              {currentStep + 1} / {steps.length}
            </span>
          </div>

          {/* Animated step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-8"
            >
              {/* Icon */}
              <div className="flex items-center gap-6">
                <div className={cn(
                  "relative w-20 h-20 rounded-[1.5rem] flex items-center justify-center shrink-0 border",
                  step.bg, step.border, step.glow
                )}>
                  {/* HUD corner marks */}
                  <div className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t-2 border-l-2 border-current opacity-30" style={{ color: 'inherit' }} />
                  <div className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b-2 border-r-2 border-current opacity-30" style={{ color: 'inherit' }} />
                  <Icon className={cn("h-9 w-9", step.color)} />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-black tracking-tighter uppercase italic leading-tight">
                    {step.title}
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
                    System Kyron v2.8.0
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground font-medium leading-relaxed border-l-4 border-primary/20 pl-5">
                {step.description}
              </p>

              {/* Step dots */}
              <div className="flex items-center gap-1.5">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentStep(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === currentStep
                        ? "bg-primary w-6"
                        : i < currentStep
                        ? "bg-primary/40 w-1.5"
                        : "bg-muted w-1.5"
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-8 sm:px-10 pb-8 flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-11 px-5 disabled:opacity-20"
          >
            <ChevronLeft className="mr-1.5 h-3.5 w-3.5" /> Anterior
          </Button>

          <div className="flex items-center gap-3">
            {currentStep < steps.length - 1 ? (
              <>
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-11 px-5 text-muted-foreground/50 hover:text-muted-foreground"
                >
                  Omitir
                </Button>
                <Button
                  onClick={handleNext}
                  className="btn-3d-primary rounded-xl px-7 h-11 text-[10px] font-black uppercase tracking-widest shadow-glow"
                >
                  Siguiente <ChevronRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </>
            ) : (
              <Button
                onClick={handleClose}
                className="btn-3d-primary rounded-xl px-8 h-11 text-[10px] font-black uppercase tracking-widest shadow-glow"
              >
                Comenzar <CheckCircle2 className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Brand footer */}
        <div className="px-8 sm:px-10 pb-6 pt-0">
          <div className="flex items-center gap-2 pt-5 border-t border-border/30">
            <Logo className="h-3.5 w-3.5 opacity-30" />
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 italic">
              System Kyron • Plataforma Corporativa Venezuela
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
