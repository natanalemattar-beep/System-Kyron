
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, FileText, ShieldCheck, Users, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AnimatedCard = ({
  icon: Icon,
  title,
  value,
  change,
  delay,
  changeColor,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  change: string;
  delay: number;
  changeColor: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor}`}>{change}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export function HeroSection() {
  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden bg-background py-20 md:py-0">
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Columna Izquierda: Texto y CTA */}
        <div className="text-center lg:text-left">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            La Plataforma Definitiva para la Gestión Empresarial en Venezuela
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 text-muted-foreground text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            Automatización fiscal, contabilidad inteligente y gestión de cumplimiento, todo en un solo lugar.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          >
            <Button size="lg" asChild className="w-full sm:w-auto text-base btn-3d-primary">
              <Link href="/register">Comienza Ahora</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base">
              <Link href="#servicios">Explorar Servicios <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>

        {/* Columna Derecha: Visualización del Dashboard */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        >
          <div className="p-6 bg-card/20 backdrop-blur-xl border rounded-2xl shadow-2xl">
            <div className="grid grid-cols-2 gap-4">
              <AnimatedCard icon={ShieldCheck} title="Cumplimiento Fiscal" value="99.8%" change="+1.2% este mes" delay={0.7} changeColor="text-green-500" />
              <AnimatedCard icon={Users} title="Eficiencia de Nómina" value="92%" change="-0.5% por ajuste" delay={0.8} changeColor="text-red-500" />
              <AnimatedCard icon={FileText} title="Precisión en Facturas" value="100%" change="0 errores detectados" delay={0.9} changeColor="text-green-500" />
              <AnimatedCard icon={BrainCircuit} title="Análisis Predictivo" value="Activo" change="Monitoreando mercado" delay={1.0} changeColor="text-blue-500" />
            </div>
             <motion.div
                className="mt-4 p-4 bg-card/60 rounded-lg border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
             >
                <h4 className="font-semibold text-sm mb-2">Estado del Sistema</h4>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span>Operacional</span>
                    </div>
                     <div className="flex items-center gap-2 text-xs">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>IA Activa</span>
                    </div>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
