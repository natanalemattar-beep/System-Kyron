
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { User, Menu, Layers, Cpu, Users, BarChart, ShieldCheck, ShoppingCart, Send, Loader2, Building, Megaphone, Briefcase, Gavel, Smile, Clock, CheckCircle as CheckCircleIcon, Banknote, Signal } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { FC, AnchorHTMLAttributes } from 'react';
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { chat } from "@/ai/flows/chat";
import { LanguageSwitcher } from "@/components/language-switcher";
import dynamic from "next/dynamic";
import { loginOptions } from "@/lib/login-options";


const modules = [
  { name: "Finanzas", icon: Layers, description: "Gestión contable, fiscal y de tesorería.", href: "/dashboard-empresa" },
  { name: "Legal", icon: Gavel, description: "Cumplimiento normativo y gestión de contratos.", href: "/escritorio-juridico" },
  { name: "Ventas", icon: ShoppingCart, description: "Punto de venta y análisis de rendimiento comercial.", href: "/analisis-ventas" },
  { name: "RR.HH.", icon: Briefcase, description: "Administración de personal, nóminas y beneficios.", href: "/dashboard-rrhh" },
  { name: "Marketing", icon: Megaphone, description: "Estrategias de producto y crecimiento de mercado.", href: "/asesoria-publicidad" },
  { name: "Tecnología", icon: Cpu, description: "Infraestructura, seguridad y desarrollo de IA.", href: "/dashboard-informatica" },
  { name: "Telecom", icon: Signal, description: "Gestión de redes, infraestructura y servicios.", href: "/dashboard-telecom" },
];


export default function ImmersiveLandingPage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20 opacity-30"
      >
        <source src="https://cdn.coverr.co/videos/coverr-a-digital-background-of-plexus-and-dots-5673/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent -z-10"></div>
      <div className="absolute inset-0 bg-grid-slate-700/30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] -z-10"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="bg-white/10 text-white" />
            <span className="text-xl font-bold text-white">System Kyron</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white">
                  Acceder
                  <User className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Selecciona un Portal</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {loginOptions.map((opt) => (
                  <DropdownMenuItem key={opt.href} asChild>
                    <Link href={opt.href} className="flex items-center justify-start">
                      <opt.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <div>
                        <p>{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.description}</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild className="btn-3d-primary hidden sm:flex">
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Interactive Content */}
      <main className="flex-1 flex flex-col items-center justify-center relative">
        <div className="absolute w-full h-full max-w-5xl max-h-5xl">
            {/* Pulsating Orb */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 animate-pulse"></div>
                <div className="absolute w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary/20 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
            </div>

            {/* Central Info Box */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                 <Logo className="w-24 h-24 p-4 mb-4 bg-background border-2 border-primary/50" />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
                    {activeModule ? `Módulo de ${activeModule}` : "System Kyron"}
                </h1>
                <p className="mt-4 text-lg text-white/70 max-w-md transition-all duration-300">
                    {activeModule ? modules.find(m => m.name === activeModule)?.description : "Inteligencia en Cada Transacción."}
                </p>
            </div>

            {/* Circular Menu */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
                {modules.map((module, index) => {
                    const angle = (index / modules.length) * 360;
                    return (
                    <div
                        key={module.name}
                        className="absolute top-1/2 left-1/2 -mt-10 -ml-10 w-20 h-20"
                        style={{ transform: `rotate(${angle}deg) translate(24rem) rotate(${-angle}deg)` }}
                        onMouseEnter={() => setActiveModule(module.name)}
                        onMouseLeave={() => setActiveModule(null)}
                    >
                        <Link href={module.href}>
                            <div className="w-full h-full flex items-center justify-center rounded-full bg-background/50 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-300 hover:border-primary hover:scale-110 hover:shadow-primary/20">
                                <module.icon className="h-8 w-8 text-white" />
                            </div>
                        </Link>
                    </div>
                    );
                })}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
