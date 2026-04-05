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
  ChevronRight,
  ChevronLeft,
  CircleCheck as CheckCircle2,
  PartyPopper,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { ModuleTutorialConfig } from "@/lib/module-tutorials";

function getStorageKey(moduleId: string) {
  return `kyron-module-tutorial-${moduleId}`;
}

export function ModuleTutorial({ config }: { config: ModuleTutorialConfig | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (!config || !config.steps || config.steps.length === 0) return;
    const key = getStorageKey(config.moduleId);
    const seen = localStorage.getItem(key);
    if (!seen) {
      const timer = setTimeout(() => setIsOpen(true), 500);
      return () => clearTimeout(timer);
    }
  }, [config?.moduleId]);

  const handleNext = useCallback(() => {
    if (currentStep < config.steps.length - 1) {
      setDirection(1);
      setCurrentStep(s => s + 1);
    } else {
      handleClose();
    }
  }, [currentStep, config.steps.length]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(s => s - 1);
    }
  }, [currentStep]);

  const handleClose = useCallback(() => {
    localStorage.setItem(getStorageKey(config.moduleId), 'true');
    setIsOpen(false);
    setCurrentStep(0);
  }, [config.moduleId]);

  const handleStepClick = useCallback((idx: number) => {
    setDirection(idx > currentStep ? 1 : -1);
    setCurrentStep(idx);
  }, [currentStep]);

  if (!isOpen || !config || !config.steps || config.steps.length === 0) return null;

  const step = config.steps[currentStep];
  const Icon = step.icon;
  const progress = ((currentStep + 1) / config.steps.length) * 100;
  const isLastStep = currentStep === config.steps.length - 1;

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogPrimitive.Portal forceMount>
        <div
          className="fixed inset-0 z-[60] bg-black/70 animate-in fade-in-0"
          onClick={handleClose}
          style={{ touchAction: 'pan-y' }}
          aria-hidden="true"
        />
        <DialogPrimitive.Content
          className="fixed left-[50%] top-[50%] z-[60] grid w-[calc(100vw-2rem)] max-w-[560px] translate-x-[-50%] translate-y-[-50%] p-0 overflow-hidden border border-border/50 bg-background/95 backdrop-blur-3xl rounded-2xl sm:rounded-[1.5rem] shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200 max-h-[85vh] overflow-y-auto"
          onPointerDownOutside={() => {}}
          onInteractOutside={() => {}}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{config.moduleName} — Tutorial</DialogTitle>
            <DialogDescription>Guía de introducción al módulo {config.moduleName}.</DialogDescription>
          </DialogHeader>

          <div className="absolute top-0 left-0 right-0 h-1 bg-muted/50 z-10">
            <motion.div
              className="h-full bg-primary shadow-glow-sm"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <div className="pt-6 sm:pt-7 pb-4 sm:pb-5 px-5 sm:px-7">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider border",
                  step.bg, step.color, step.border
                )}>
                  {config.moduleTag}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isLastStep && <PartyPopper className="h-3.5 w-3.5 text-amber-400 animate-bounce" />}
                <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/40">
                  {currentStep + 1} / {config.steps.length}
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
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={cn(
                    "relative w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 border",
                    step.bg, step.border
                  )}>
                    <Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", step.color)} />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h2 className="text-sm sm:text-lg font-bold tracking-tight uppercase italic leading-tight">
                      {step.title}
                    </h2>
                    <p className="text-[11px] sm:text-[10px] font-semibold uppercase tracking-wide text-muted-foreground/40">
                      {config.moduleName}
                    </p>
                  </div>
                </div>

                <div className="border-l-4 border-primary/20 pl-3 sm:pl-4">
                  <p className="text-[11px] sm:text-sm text-muted-foreground font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {step.bullets && step.bullets.length > 0 && (
                  <div className="grid gap-1.5 pl-1">
                    {step.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={cn("h-3 w-3 mt-0.5 shrink-0", step.color)} />
                        <span className="text-[10px] sm:text-xs text-muted-foreground/70 font-medium leading-snug">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {config.steps.length > 1 && (
                  <div className="flex items-center gap-1.5 pt-1">
                    {config.steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => handleStepClick(i)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          i === currentStep
                            ? "bg-primary w-5"
                            : i < currentStep
                            ? "bg-primary/40 w-1.5"
                            : "bg-muted w-1.5"
                        )}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="px-5 sm:px-7 pb-4 sm:pb-5 flex items-center justify-between gap-2 sm:gap-4">
            {config.steps.length > 1 ? (
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-9 sm:h-10 px-3 sm:px-4 disabled:opacity-20"
              >
                <ChevronLeft className="mr-1 h-3.5 w-3.5" /> <span className="hidden sm:inline">Anterior</span>
              </Button>
            ) : <div />}

            <div className="flex items-center gap-2 sm:gap-3">
              {!isLastStep ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={handleClose}
                    className="rounded-xl font-bold text-[10px] uppercase tracking-widest h-9 sm:h-10 px-3 sm:px-4 text-muted-foreground/50 hover:text-muted-foreground"
                  >
                    Omitir
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="btn-3d-primary rounded-xl px-4 sm:px-6 h-9 sm:h-10 text-[10px] font-semibold uppercase tracking-widest shadow-glow"
                  >
                    Siguiente <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </>
              ) : (
                <Button
                  onClick={handleClose}
                  className="btn-3d-primary rounded-xl px-4 sm:px-6 h-9 sm:h-10 text-[10px] font-semibold uppercase tracking-widest shadow-glow"
                >
                  Entendido <CheckCircle2 className="ml-1 h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          </div>

          <div className="px-5 sm:px-7 pb-3 sm:pb-4 pt-0">
            <div className="flex items-center gap-2 pt-2.5 border-t border-border/30">
              <Logo className="h-3 w-3 opacity-30" />
              <span className="text-[7px] font-semibold uppercase tracking-wider text-muted-foreground/30 italic">
                System Kyron • {config.moduleName}
              </span>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
