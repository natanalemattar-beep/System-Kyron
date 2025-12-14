
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, Users, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

const featureCards = [
  {
    icon: ShieldCheck,
    title: "Gestión Fiscal",
    description: "Cumplimiento SENIAT sin estrés.",
  },
  {
    icon: Users,
    title: "Nómina Automatizada",
    description: "Cálculos precisos, pagos a tiempo.",
  },
  {
    icon: FileText,
    title: "Seguridad Documental",
    description: "Tus datos, cifrados e inviolables.",
  },
  {
    icon: BrainCircuit,
    title: "Análisis con IA",
    description: "Decisiones inteligentes, no suposiciones.",
  },
];

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden bg-background py-24 sm:py-32">
       <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,#000_100%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-balance bg-clip-text text-transparent bg-gradient-to-b from-foreground to-muted-foreground/80">
            Tranquilidad Fiscal. Crecimiento Exponencial.
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground text-balance">
            Kyron es el ecosistema de gestión que automatiza el cumplimiento, optimiza tus finanzas y te da el control total para escalar tu negocio en Venezuela.
          </p>
        </motion.div>
        
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Button size="lg" asChild className="w-full sm:w-auto text-base btn-3d-primary">
            <Link href="/register">Comienza Ahora</Link>
          </Button>
          <Button size="lg" variant="ghost" asChild className="w-full sm:w-auto text-base">
            <Link href="#servicios">Explorar Servicios <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </motion.div>
        
        <motion.div
          className="mt-20 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Card className="bg-card/50 backdrop-blur-sm h-full group transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="p-3 bg-primary/10 rounded-lg inline-block mb-3 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-sm md:text-base">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
