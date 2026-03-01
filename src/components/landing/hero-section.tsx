'use client';

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Ecosistema de Gestión Integral v2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.1]"
          >
            Sistemas Inteligentes para la <span className="text-primary">Estrategia Empresarial</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Automatización fiscal, contabilidad avanzada y cumplimiento normativo en una plataforma única diseñada para potenciar el crecimiento de su empresa.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button asChild size="lg" className="h-14 px-10 text-base rounded-2xl shadow-lg hover:shadow-primary/20 transition-all">
              <Link href="/login" className="flex items-center gap-2">
                Comenzar ahora <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-10 text-base rounded-2xl hover:bg-muted transition-all">
              Ver demostración
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60"
          >
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Cero Riesgo</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">IA Aplicada</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Escalabilidad</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ArrowRight className="h-6 w-6 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Eficiencia</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}