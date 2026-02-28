'use client';

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import Link from "next/link";

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 overflow-hidden bg-background">
      {/* Luces de ambiente minimalistas */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12"
          >
            <Logo className="h-32 w-32 md:h-40 md:w-40" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-balance leading-[1.1] mb-8">
              Sistemas que <span className="font-black italic">definen</span> el futuro.
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 font-medium leading-relaxed opacity-80">
              Ecosistema unificado de gestión, telecomunicaciones y finanzas blindado por inteligencia artificial.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="h-12 px-8 rounded-full text-sm font-bold shadow-xl transition-all hover:scale-105 group">
                    <Link href="/login" className="flex items-center">
                        Entrar al Ecosistema <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-sm font-bold border-primary/10 hover:bg-primary/5">
                    Descubrir Tecnología
                </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
