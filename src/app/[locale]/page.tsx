
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/language-switcher";
import { loginOptions } from "@/lib/login-options";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Orb = dynamic(() => import('@/components/orb').then(mod => mod.Orb), { ssr: false });

const navModules = [
  { name: "Finanzas", angle: 30, href: "/dashboard-empresa" },
  { name: "Legal", angle: 75, href: "/escritorio-juridico" },
  { name: "Ventas", angle: 120, href: "/analisis-ventas" },
  { name: "RR.HH.", angle: 165, href: "/dashboard-rrhh" },
  { name: "Marketing", angle: 210, href: "/asesoria-publicidad" },
  { name: "Tecnología", angle: 255, href: "/dashboard-informatica" },
  { name: "Telecom", angle: 300, href: "/dashboard-telecom" },
  { name: "Socios", angle: 345, href: "/dashboard-socios" },
];


export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredModule, setHoveredModule] = useState<{name: string, description: string} | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getModuleDescription = (name: string) => {
    const option = loginOptions.find(opt => opt.label.includes(name));
    return option ? option.description : "Accede al módulo especializado.";
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      <header className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "bg-background/80 backdrop-blur-lg border-b" : "bg-transparent"
      )}>
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <Logo />
            <span className="text-xl font-bold">System Kyron</span>
          </Link>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" asChild>
                <Link href="/login-natural">Acceder <User className="ml-2 h-4 w-4"/></Link>
            </Button>
            <Button asChild>
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center relative">
        {/* Fondo animado */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
              >
                <source src="https://cdn.coverr.co/videos/coverr-a-digital-background-of-plexus-and-dots-5673/1080p.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/50"></div>
        </div>

        {/* Contenido Central */}
        <div className="relative flex flex-col items-center justify-center w-full h-full">
            
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute z-10 text-center"
          >
            {hoveredModule ? (
              <>
                <h2 className="text-2xl font-bold text-primary">{hoveredModule.name}</h2>
                <p className="text-muted-foreground max-w-xs">{hoveredModule.description}</p>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold">Kyron Core</h1>
                <p className="text-lg text-muted-foreground">Inteligencia en Cada Transacción</p>
              </>
            )}
          </motion.div>

          <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
            <Orb />
            {navModules.map(module => {
              const radius = 220;
              const x = radius * Math.cos((module.angle - 90) * (Math.PI / 180));
              const y = radius * Math.sin((module.angle - 90) * (Math.PI / 180));
              const Icon = loginOptions.find(opt => opt.label.includes(module.name))?.icon;

              return (
                <Link href={module.href} key={module.name}>
                  <motion.div
                    className="absolute w-16 h-16 bg-card/80 backdrop-blur-sm border rounded-full flex items-center justify-center cursor-pointer"
                    style={{ 
                      top: '50%', 
                      left: '50%',
                      transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                      boxShadow: '0 0 20px rgba(var(--primary-rgb), 0)'
                    }}
                    onMouseEnter={() => setHoveredModule({ name: module.name, description: getModuleDescription(module.name) })}
                    onMouseLeave={() => setHoveredModule(null)}
                    whileHover={{ scale: 1.2, boxShadow: '0 0 25px rgba(var(--primary-rgb), 0.7)' }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {Icon && <Icon className="h-6 w-6 text-primary" />}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
