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
  X,
  ArrowRight,
  MousePointerClick,
  User,
  Mail,
  Lock,
  Eye,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = 'kyron-tutorial-seen';

function MockupBienvenida() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0d2847] border border-white/10 p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
        <span className="ml-2 text-[8px] text-white/30 font-mono">systemkyron.com</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/20 flex items-center justify-center">
          <Logo className="h-6 w-6" />
        </div>
        <div className="text-center space-y-1">
          <p className="text-xs font-black text-white uppercase tracking-wider">System Kyron</p>
          <p className="text-[9px] text-white/30 uppercase tracking-widest">Inteligencia Corporativa</p>
        </div>
        <div className="flex gap-4 mt-1">
          {["Contabilidad", "Nómina", "Legal", "Telecom", "IA"].map((mod, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <div className="w-2 h-2 rounded-sm bg-cyan-400/40" />
              </div>
              <span className="text-[7px] text-white/30">{mod}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupAcceso() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0d2847] border border-white/10 p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
      </div>
      <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/5 border border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <Logo className="h-4 w-4" />
          <span className="text-[8px] text-white/50 font-bold">SYSTEM KYRON</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[8px] text-white/30">Inicio</span>
          <span className="text-[8px] text-white/30">Servicios</span>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="relative"
          >
            <div className="px-2.5 py-1 rounded-lg bg-cyan-500 text-[8px] font-black text-white">
              ACCEDER
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2"
            >
              <MousePointerClick className="h-4 w-4 text-yellow-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <div className="text-center py-3">
        <p className="text-[9px] text-white/40 mb-1">Haz clic en</p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30">
          <ArrowRight className="h-3 w-3 text-cyan-400" />
          <span className="text-[10px] font-black text-cyan-300 uppercase tracking-wider">Acceder</span>
        </div>
        <p className="text-[9px] text-white/30 mt-1.5">en la barra superior</p>
      </div>
    </div>
  );
}

function MockupRegistro() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0d2847] border border-white/10 p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
      </div>
      <div className="max-w-[240px] mx-auto space-y-3">
        <div className="text-center mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-2">
            <UserPlus className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-[10px] font-black text-white uppercase tracking-wider">Crear Cuenta</p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <User className="h-3 w-3 text-white/30" />
            <span className="text-[9px] text-white/25">Nombre completo</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <Mail className="h-3 w-3 text-white/30" />
            <span className="text-[9px] text-white/25">correo@ejemplo.com</span>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <Lock className="h-3 w-3 text-white/30" />
            <span className="text-[9px] text-white/25">Contraseña segura</span>
          </div>
        </div>
        <div className="flex gap-2">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex-1"
          >
            <div className="w-full py-1.5 rounded-lg bg-blue-500/20 border border-blue-500/30 text-center relative">
              <span className="text-[8px] font-bold text-blue-300">Ciudadano</span>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute -top-2 -right-1"
              >
                <MousePointerClick className="h-3 w-3 text-yellow-400" />
              </motion.div>
            </div>
          </motion.div>
          <div className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-center">
            <span className="text-[8px] font-bold text-emerald-300">Empresarial</span>
          </div>
        </div>
        <div className="w-full py-1.5 rounded-lg bg-cyan-500 text-center">
          <span className="text-[9px] font-black text-white uppercase tracking-wider">Registrarse</span>
        </div>
      </div>
    </div>
  );
}

function MockupPortales() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0d2847] border border-white/10 p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
      </div>
      <p className="text-[9px] font-bold text-white/50 uppercase tracking-wider mb-2 text-center">Selecciona tu Portal</p>
      <div className="grid grid-cols-3 gap-2">
        {[
          { name: "Contabilidad", color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" },
          { name: "Legal", color: "bg-violet-500/20 border-violet-500/30 text-violet-300" },
          { name: "Nómina", color: "bg-blue-500/20 border-blue-500/30 text-blue-300" },
          { name: "Ventas", color: "bg-amber-500/20 border-amber-500/30 text-amber-300" },
          { name: "Mi Línea", color: "bg-cyan-500/20 border-cyan-500/30 text-cyan-300" },
          { name: "ESG", color: "bg-green-500/20 border-green-500/30 text-green-300" },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={i === 0 ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            className={cn("py-2 px-1.5 rounded-lg border text-center relative", p.color)}
          >
            <span className="text-[7px] font-bold">{p.name}</span>
            {i === 0 && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute -top-1.5 -right-1"
              >
                <MousePointerClick className="h-3 w-3 text-yellow-400" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-1.5">
        <ArrowRight className="h-3 w-3 text-cyan-400" />
        <span className="text-[8px] text-white/40">Elige el portal de tu empresa</span>
      </div>
    </div>
  );
}

function MockupCiudadano() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0d2847] border border-white/10 p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
      </div>
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10 mb-3">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center">
          <User className="h-3.5 w-3.5 text-emerald-400" />
        </div>
        <div>
          <p className="text-[9px] font-bold text-white">Portal Ciudadano</p>
          <p className="text-[7px] text-white/30">Persona Natural</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[
          { name: "Cuenta Personal", icon: "👤" },
          { name: "Mi Línea", icon: "📱" },
          { name: "Documentos", icon: "📄" },
          { name: "Trámites", icon: "📋" },
        ].map((item, i) => (
          <div key={i} className="py-2 px-2 rounded-lg bg-white/5 border border-white/10 flex items-center gap-2">
            <span className="text-xs">{item.icon}</span>
            <span className="text-[8px] text-white/50 font-semibold">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupIA() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0d2847] border border-white/10 p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
      </div>
      <div className="space-y-2.5">
        <div className="flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="h-3 w-3 text-violet-400" />
          </div>
          <div className="flex-1 py-1.5 px-3 rounded-xl rounded-tl-none bg-violet-500/10 border border-violet-500/20">
            <p className="text-[8px] text-violet-300 font-semibold leading-relaxed">Detecté que la factura #0042 tiene IVA al 12% en vez del 16% vigente según Gaceta Oficial.</p>
          </div>
        </div>
        <div className="flex items-start gap-2.5 justify-end">
          <div className="flex-1 py-1.5 px-3 rounded-xl rounded-tr-none bg-cyan-500/10 border border-cyan-500/20">
            <p className="text-[8px] text-cyan-300 font-semibold leading-relaxed">Corregir automáticamente y recalcular totales.</p>
          </div>
          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <User className="h-3 w-3 text-cyan-400" />
          </div>
        </div>
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center gap-2 justify-center py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
        >
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          <span className="text-[8px] font-bold text-emerald-300">IVA corregido · Totales recalculados</span>
        </motion.div>
      </div>
    </div>
  );
}

function MockupListo() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#0a1628] to-[#0d2847] border border-white/10 p-4 sm:p-5">
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400/60" />
        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
        <div className="w-2 h-2 rounded-full bg-green-400/60" />
      </div>
      <div className="text-center space-y-3">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 border border-rose-500/20 flex items-center justify-center mx-auto"
        >
          <Rocket className="h-6 w-6 text-rose-400" />
        </motion.div>
        <div className="space-y-1">
          <p className="text-xs font-black text-white uppercase">Todo Listo</p>
          <p className="text-[9px] text-white/40">Comienza a usar System Kyron</p>
        </div>
        <div className="flex items-center justify-center gap-3">
          {[
            { check: true, label: "Cuenta activa" },
            { check: true, label: "Módulos listos" },
            { check: true, label: "IA habilitada" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
              <span className="text-[7px] text-emerald-300/70">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const MOCKUP_COMPONENTS = [
  MockupBienvenida,
  MockupAcceso,
  MockupRegistro,
  MockupPortales,
  MockupCiudadano,
  MockupIA,
  MockupListo,
];

const steps = [
  {
    title: "Bienvenido a System Kyron",
    description: "La plataforma de gestión empresarial más completa de Venezuela. Contabilidad, nómina, facturación, legal, Mi Línea e IA — todo en un solo ecosistema.",
    icon: Sparkles,
    color: "text-yellow-400",
    bg: "bg-yellow-400/15",
    border: "border-yellow-400/20",
    tag: "BIENVENIDA",
  },
  {
    title: "Accede a tu Portal",
    description: "Haz clic en el botón ACCEDER en la barra superior. Se desplegará un menú con todos los portales disponibles. Selecciona el tuyo e ingresa con tu correo y contraseña.",
    icon: UserCircle,
    color: "text-primary",
    bg: "bg-primary/15",
    border: "border-primary/20",
    tag: "ACCESO",
  },
  {
    title: "Crea tu Cuenta",
    description: "¿Nuevo en la plataforma? Pulsa REGISTRARSE y elige entre un perfil Ciudadano (persona natural) o un perfil Empresarial. El proceso toma menos de 2 minutos.",
    icon: UserPlus,
    color: "text-secondary",
    bg: "bg-secondary/15",
    border: "border-secondary/20",
    tag: "REGISTRO",
  },
  {
    title: "Panel Empresarial",
    description: "Gestiona tu empresa desde el ecosistema que unifica conectividad, fiscalidad y sostenibilidad: contabilidad VEN-NIF, nómina con SSO, facturación SENIAT con tasa BCV, y mucho más.",
    icon: Building2,
    color: "text-blue-400",
    bg: "bg-blue-400/15",
    border: "border-blue-400/20",
    tag: "EMPRESA",
  },
  {
    title: "Portal Ciudadano",
    description: "Persona natural? Accede a tu Terminal Ciudadana: centraliza trámites, documentos civiles, historial y asistencia legal personalizada desde un único lugar.",
    icon: LayoutDashboard,
    color: "text-emerald-400",
    bg: "bg-emerald-400/15",
    border: "border-emerald-400/20",
    tag: "CIUDADANO",
  },
  {
    title: "Blindaje Fiscal con IA",
    description: "Nuestro motor de inteligencia artificial audita tus operaciones en tiempo real contra la Gaceta Oficial. Detecta errores fiscales y genera documentos legales automáticamente.",
    icon: ShieldCheck,
    color: "text-violet-400",
    bg: "bg-violet-400/15",
    border: "border-violet-400/20",
    tag: "IA FISCAL",
  },
  {
    title: "¡Todo Listo!",
    description: "Tu cuenta está lista. Todos los módulos están disponibles para ti. Comienza a registrar tus datos reales y aprovecha al máximo System Kyron.",
    icon: Rocket,
    color: "text-rose-400",
    bg: "bg-rose-400/15",
    border: "border-rose-400/20",
    tag: "LISTO",
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
  const MockupComponent = MOCKUP_COMPONENTS[currentStep];

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
          className="fixed left-[50%] top-[50%] z-[60] grid w-[calc(100vw-2rem)] max-w-[680px] translate-x-[-50%] translate-y-[-50%] p-0 overflow-hidden border border-border/50 bg-background/90 backdrop-blur-3xl rounded-2xl sm:rounded-[2rem] shadow-2xl animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] duration-200 max-h-[90vh] overflow-y-auto"
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

                <MockupComponent />

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
