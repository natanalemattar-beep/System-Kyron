'use client';

import { useState, useEffect, useCallback } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const STORAGE_KEY = 'kyron-tutorial-seen';

const steps = [
  {
    title: "Bienvenido a System Kyron",
    description: "La plataforma de gestión empresarial más completa de Venezuela. Contabilidad, nómina, facturación, legal, Mi Línea e IA — todo en un solo ecosistema.",
    icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-400/15",
    border: "border-yellow-400/20",
    tag: "BIENVENIDA",
    screenshot: "/images/tutorial/step-1-ecosistema.jpg",
    screenshotAlt: "Ecosistema Kyron - Terminal de operaciones",
  },
  {
    title: "Accede a tu Portal",
    description: "Haz clic en el botón ACCEDER en la barra superior. Se desplegará un menú con todos los portales disponibles. Selecciona el tuyo e ingresa con tu correo y contraseña.",
    icon: UserCircle,
    color: "text-primary",
    bg: "bg-primary/15",
    border: "border-primary/20",
    tag: "ACCESO",
    screenshot: "/images/tutorial/step-2-login.jpg",
    screenshotAlt: "Selector de portales - Acceso seguro AES-256",
  },
  {
    title: "Crea tu Cuenta",
    description: "¿Nuevo en la plataforma? Pulsa REGISTRARSE y elige entre un perfil Ciudadano (persona natural) o un perfil Empresarial. El proceso toma menos de 2 minutos.",
    icon: UserPlus,
    color: "text-secondary",
    bg: "bg-secondary/15",
    border: "border-secondary/20",
    tag: "REGISTRO",
    screenshot: "/images/tutorial/step-3-register.jpg",
    screenshotAlt: "Formulario de registro - Crear cuenta",
  },
  {
    title: "Panel Empresarial",
    description: "Gestiona tu empresa desde el ecosistema que unifica conectividad, fiscalidad y sostenibilidad: contabilidad VEN-NIF, nómina con SSO, facturación SENIAT con tasa BCV, y mucho más.",
    icon: Building2,
    color: "text-blue-400",
    bg: "bg-blue-400/15",
    border: "border-blue-400/20",
    tag: "EMPRESA",
    screenshot: "/images/tutorial/step-4-portal-empresa.jpg",
    screenshotAlt: "Portales corporativos - Panel empresarial",
  },
  {
    title: "Portal Ciudadano",
    description: "Persona natural? Accede a tu Terminal Ciudadana: centraliza trámites, documentos civiles, historial y asistencia legal personalizada desde un único lugar.",
    icon: LayoutDashboard,
    color: "text-emerald-400",
    bg: "bg-emerald-400/15",
    border: "border-emerald-400/20",
    tag: "CIUDADANO",
    screenshot: "/images/tutorial/step-5-ciudadano.jpg",
    screenshotAlt: "Portal ciudadano - Servicios para personas naturales",
  },
  {
    title: "Blindaje Fiscal con IA",
    description: "Nuestro motor de inteligencia artificial audita tus operaciones en tiempo real contra la Gaceta Oficial. Detecta errores fiscales y genera documentos legales automáticamente.",
    icon: ShieldCheck,
    color: "text-violet-400",
    bg: "bg-violet-400/15",
    border: "border-violet-400/20",
    tag: "IA FISCAL",
    screenshot: "/images/tutorial/step-6-ia.jpg",
    screenshotAlt: "Motor IA Claude - Guía de operaciones",
  },
  {
    title: "¡Todo Listo!",
    description: "Tu cuenta está lista. Todos los módulos están disponibles para ti. Comienza a registrar tus datos reales y aprovecha al máximo System Kyron.",
    icon: Rocket,
    color: "text-rose-400",
    bg: "bg-rose-400/15",
    border: "border-rose-400/20",
    tag: "LISTO",
    screenshot: "/images/tutorial/step-1-ecosistema.jpg",
    screenshotAlt: "Dashboard completo de System Kyron",
  },
];

export function WelcomeTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      handleClose();
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  }, [currentStep]);

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
    setCurrentStep(0);
  }, []);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogPrimitive.Portal forceMount>
        <div
          className="fixed inset-0 z-[60] bg-black/80 animate-in fade-in-0"
          onClick={handleClose}
          style={{ touchAction: 'pan-y' }}
          aria-hidden="true"
        />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-[60] grid w-[calc(100vw-2rem)] max-w-[700px] translate-x-[-50%] translate-y-[-50%] p-0 overflow-hidden border border-border/50 bg-background/90 backdrop-blur-3xl rounded-2xl sm:rounded-[2rem] shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200 max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={() => {}}
          onInteractOutside={() => {}}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Bienvenido al Ecosistema Kyron</DialogTitle>
            <DialogDescription>Tutorial de introducción a la plataforma System Kyron.</DialogDescription>
          </DialogHeader>

          <div className="absolute top-0 left-0 right-0 h-1 bg-muted/50 z-10">
            <div
              className="h-full bg-primary shadow-glow-sm transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="pt-6 sm:pt-8 pb-4 sm:pb-5 px-5 sm:px-8">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
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

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-4 sm:space-y-5"
              >
                <div className="flex items-center gap-3 sm:gap-5">
                  <div className={cn(
                    "relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border",
                    step.bg, step.border
                  )}>
                    <Icon className={cn("h-5 w-5 sm:h-7 sm:w-7", step.color)} />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <h2 className="text-sm sm:text-xl font-black tracking-tight uppercase italic leading-tight">
                      {step.title}
                    </h2>
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
                      System Kyron
                    </p>
                  </div>
                </div>

                <p className="text-[11px] sm:text-sm text-muted-foreground font-medium leading-relaxed border-l-4 border-primary/20 pl-3 sm:pl-4">
                  {step.description}
                </p>

                <div className="relative w-full rounded-xl overflow-hidden border border-border/30 shadow-lg">
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={step.screenshot}
                      alt={step.screenshotAlt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 700px) 100vw, 700px"
                      quality={85}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                </div>

                <div className="flex items-center gap-1.5 pt-1">
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

          <div className="px-5 sm:px-8 pb-4 sm:pb-6 flex items-center justify-between gap-2 sm:gap-4">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-9 sm:h-11 px-3 sm:px-5 disabled:opacity-20"
            >
              <ChevronLeft className="mr-1 sm:mr-1.5 h-3.5 w-3.5" /> <span className="hidden sm:inline">Anterior</span>
            </Button>

            <div className="flex items-center gap-2 sm:gap-3">
              {currentStep < steps.length - 1 ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={handleClose}
                    className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-9 sm:h-11 px-3 sm:px-5 text-muted-foreground/50 hover:text-muted-foreground"
                  >
                    Omitir
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="btn-3d-primary rounded-xl px-4 sm:px-7 h-9 sm:h-11 text-[10px] font-black uppercase tracking-widest shadow-glow"
                  >
                    Siguiente <ChevronRight className="ml-1 sm:ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleClose}
                  className="btn-3d-primary rounded-xl px-5 sm:px-8 h-9 sm:h-11 text-[10px] font-black uppercase tracking-widest shadow-glow"
                >
                  Comenzar <CheckCircle2 className="ml-1 sm:ml-1.5 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          <div className="px-5 sm:px-8 pb-3 sm:pb-5 pt-0">
            <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-border/30">
              <Logo className="h-3.5 w-3.5 opacity-30" />
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/30 italic">
                System Kyron • Venezuela
              </span>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
