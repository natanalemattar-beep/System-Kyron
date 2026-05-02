'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Rocket,
  ChevronRight,
  ChevronLeft,
  CircleCheck,
  CircleUser as UserCircle,
  UserPlus,
  LayoutDashboard,
  PartyPopper,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";

const STORAGE_KEY = 'kyron-tutorial-seen';

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return '¡Buenos días!';
  if (hour >= 12 && hour < 18) return '¡Buenas tardes!';
  return '¡Buenas noches!';
}

function TypingText({ text, speed = 25, className }: { text: string; speed?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed('');
    indexRef.current = 0;
    const interval = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-primary/60 animate-pulse ml-0.5 align-middle" />
      )}
    </span>
  );
}

function Confetti() {
  const [particles] = useState(() => {
    const colors = ['#0ea5e9', '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 6,
      duration: 1.5 + Math.random() * 1.5,
      rotation: Math.random() > 0.5 ? 360 : -360,
      drift: (Math.random() - 0.5) * 100,
    }));
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: '-5%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{
            y: ['0%', '120vh'],
            opacity: [1, 1, 0],
            rotate: [0, p.rotation],
            x: [0, p.drift],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}

interface TutorialStep {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  tag: string;
  screenshot: string;
  screenshotAlt: string;
  useGreeting?: boolean;
  useTyping?: boolean;
  showConfetti?: boolean;
}

const steps: TutorialStep[] = [
  {
    title: "Bienvenido a System Kyron",
    description: "La plataforma de gestión empresarial más completa de Venezuela. Asesoría contable, facturación, asesoría legal, socios y directivos, Mi Línea e IA — todo en un solo ecosistema.",
    icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-400/15",
    border: "border-yellow-400/20",
    tag: "BIENVENIDA",
    screenshot: "/images/tutorial/step-1-ecosistema.jpg",
    screenshotAlt: "Ecosistema Kyron - Plataforma integral de gestión empresarial venezolana",
    useGreeting: true,
    useTyping: true,
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
    screenshotAlt: "Selector de portales - Portal Ciudadano y Portales Corporativos",
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
    screenshotAlt: "Formulario de registro - Datos personales y tipo de cuenta",
  },
  {
    title: "Explora los Módulos",
    description: "Cada módulo tiene su propia guía paso a paso. Al entrar por primera vez a Contabilidad, Facturación, RRHH, Marketing o cualquier otro módulo, verás un tutorial específico que te explicará todo lo que necesitas.",
    icon: LayoutDashboard,
    color: "text-cyan-400",
    bg: "bg-cyan-400/15",
    border: "border-cyan-400/20",
    tag: "MÓDULOS",
    screenshot: "/images/tutorial/step-4-portal-empresa.jpg",
    screenshotAlt: "Módulos del ecosistema - Cada módulo con su propia guía de introducción",
  },
  {
    title: "¡Todo Listo!",
    description: "Tu cuenta está lista. Todos los módulos están disponibles para ti. Comienza explorando y cada sección te guiará con su tutorial específico.",
    icon: Rocket,
    color: "text-rose-400",
    bg: "bg-rose-400/15",
    border: "border-rose-400/20",
    tag: "LISTO",
    screenshot: "/images/tutorial/step-1-ecosistema.jpg",
    screenshotAlt: "Ecosistema Kyron - Todos los módulos listos para usar",
    showConfetti: true,
  },
];

export function WelcomeTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [imgLoaded, setImgLoaded] = useState<Record<number, boolean>>({ 0: false });
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const timer = setTimeout(() => setIsOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const next1 = currentStep + 1;
    const next2 = currentStep + 2;
    [next1, next2].forEach(idx => {
      if (idx < steps.length && !imgLoaded[idx]) {
        const img = new window.Image();
        img.onload = () => setImgLoaded(prev => ({ ...prev, [idx]: true }));
        img.src = steps[idx].screenshot;
      }
    });
  }, [currentStep, isOpen, imgLoaded]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(s => s + 1);
    } else {
      handleClose();
    }
  }, [currentStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(s => s - 1);
    }
  }, [currentStep]);

  const handleClose = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
    setCurrentStep(0);
    window.dispatchEvent(new CustomEvent('kyron-tutorial-closed'));
  }, []);

  const handleStepClick = useCallback((idx: number) => {
    setDirection(idx > currentStep ? 1 : -1);
    setCurrentStep(idx);
  }, [currentStep]);

  if (!isOpen) return null;

  const step = steps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;
  const isFirstStep = step.useGreeting;
  const isLastStep = step.showConfetti;
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

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
          className="fixed left-[50%] top-[50%] z-[60] grid w-[calc(100vw-2rem)] max-w-[700px] translate-x-[-50%] translate-y-[-50%] p-0 overflow-hidden border border-border/50 bg-background/90 backdrop-blur-3xl rounded-2xl sm:rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200 max-h-[90vh] overflow-y-auto"
          onPointerDownOutside={() => {}}
          onInteractOutside={() => {}}
        >
          {isLastStep && <Confetti />}

          <DialogHeader className="sr-only">
            <DialogTitle>Bienvenido al Ecosistema Kyron</DialogTitle>
            <DialogDescription>Tutorial de introducción a la plataforma System Kyron.</DialogDescription>
          </DialogHeader>

          <div className="absolute top-0 left-0 right-0 h-1 bg-muted/50 z-10">
            <motion.div
              className="h-full bg-primary shadow-glow-sm"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="pt-6 sm:pt-8 pb-4 sm:pb-5 px-5 sm:px-8">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider border",
                  step.bg, step.color, step.border
                )}>
                  {step.tag}
              </span>
              <div className="flex items-center gap-2">
                {isLastStep && <PartyPopper className="h-4 w-4 text-amber-400 animate-bounce" />}
                <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/40">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4 sm:space-y-5"
              >
                {isFirstStep && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="text-center mb-2"
                  >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 border border-amber-500/20 text-amber-500 text-[11px] font-bold">
                      {getTimeGreeting()} 👋
                    </span>
                  </motion.div>
                )}

                <div className="flex items-center gap-3 sm:gap-5">
                  <div className={cn(
                    "relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border",
                    step.bg, step.border
                  )}>
                    <Icon className={cn("h-5 w-5 sm:h-7 sm:w-7", step.color)} />
                  </div>
                  <div className="space-y-0.5 sm:space-y-1 min-w-0">
                    <h2 className="text-sm sm:text-xl font-bold tracking-tight uppercase italic leading-tight">
                      {step.title}
                    </h2>
                    <p className="text-[11px] sm:text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/40">
                      System Kyron
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-primary/20 pl-3 sm:pl-4">
                  {step.useTyping ? (
                    <TypingText
                      text={step.description}
                      speed={18}
                      className="text-[11px] sm:text-sm text-muted-foreground font-medium leading-relaxed"
                    />
                  ) : (
                    <p className="text-[11px] sm:text-sm text-muted-foreground font-medium leading-relaxed">
                      {step.description}
                    </p>
                  )}
                </div>

                {!isLastStep ? (
                  <div className="relative w-full rounded-xl overflow-hidden border border-border/30 shadow-lg">
                    <div className="relative w-full aspect-[16/9]">
                      {!imgLoaded[currentStep] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                      )}
                      <Image
                        src={step.screenshot}
                        alt={step.screenshotAlt}
                        fill
                        className={cn(
                          "object-cover object-top transition-opacity duration-300",
                          imgLoaded[currentStep] ? "opacity-100" : "opacity-0"
                        )}
                        sizes="(max-width: 700px) 100vw, 700px"
                        quality={85}
                        priority={currentStep === 0}
                        onLoad={() => setImgLoaded(prev => ({ ...prev, [currentStep]: true }))}
                      />
                    </div>
                    <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10 pointer-events-none" />
                  </div>
                ) : (
                  <div className="relative w-full rounded-2xl border border-border/20 bg-gradient-to-br from-primary/5 via-emerald-500/5 to-violet-500/5 overflow-hidden">
                    <div className="flex flex-col items-center justify-center py-10 sm:py-14 gap-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                      >
                        <PartyPopper className="h-14 w-14 sm:h-20 sm:w-20 text-amber-400 drop-shadow-lg" />
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg sm:text-2xl font-semibold uppercase tracking-widest text-foreground/80"
                      >
                        ¡A explorar!
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-[11px] sm:text-xs text-muted-foreground/60 font-medium text-center max-w-[280px]"
                      >
                        Cada módulo tiene su propia guía. Disfruta el ecosistema.
                      </motion.p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1.5 pt-1">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleStepClick(i)}
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
                    className="btn-3d-primary rounded-xl px-4 sm:px-7 h-9 sm:h-11 text-[10px] font-semibold uppercase tracking-widest shadow-glow"
                  >
                    Siguiente <ChevronRight className="ml-1 sm:ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleClose}
                  className="btn-3d-primary rounded-xl px-5 sm:px-8 h-9 sm:h-11 text-[10px] font-semibold uppercase tracking-widest shadow-glow"
                >
                  Comenzar <CircleCheck className="ml-1 sm:ml-1.5 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          <div className="px-5 sm:px-8 pb-3 sm:pb-5 pt-0">
            <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-border/30">
              <Logo className="h-3.5 w-3.5 opacity-30" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/30 italic">
                System Kyron • Venezuela
              </span>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
