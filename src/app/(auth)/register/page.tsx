"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  User, Building, ArrowRight, ChevronLeft, ShieldCheck,
  Gavel, ShoppingCart, Briefcase, Users, Cpu, Banknote,
  Signal, Smartphone, Recycle,
} from "lucide-react";
import { motion } from "framer-motion";

const personalAccess = [
  {
    icon: User,
    label: "Cuenta Personal",
    description: "Acceso a documentos de identidad, trámites civiles y servicios de salud.",
    href: "/register/natural",
    badge: "Personal",
  },
  {
    icon: Smartphone,
    label: "Mi Línea Personal",
    description: "Gestión individual de tu línea móvil, recargas y consumo de datos.",
    href: "/register/natural",
    badge: "Personal",
  },
];

const enterpriseAccess = [
  {
    icon: Signal,
    label: "Mi Línea Empresa",
    description: "Centro de control de flota corporativa para la gestión masiva de líneas.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
  {
    icon: Banknote,
    label: "Contabilidad",
    description: "Gestión financiera de su negocio con automatización de impuestos y balances.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
  {
    icon: Gavel,
    label: "Asesoría Legal",
    description: "Control de contratos, documentos legales y trámites ante registros.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
  {
    icon: ShoppingCart,
    label: "Facturación",
    description: "Punto de venta para cobros rápidos, control de inventario y ventas.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
  {
    icon: Briefcase,
    label: "Recursos Humanos",
    description: "Administración de nóminas, beneficios y expedientes de personal.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
  {
    icon: Users,
    label: "Socios y Directivos",
    description: "Supervisión estratégica, reparto de beneficios y análisis de rentabilidad.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
  {
    icon: Recycle,
    label: "Sostenibilidad",
    description: "Gestión ambiental, Eco-Créditos y tecnología de reciclaje inteligente.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
  {
    icon: Signal,
    label: "Administración de Red",
    description: "Gestión técnica de infraestructura, radiobases y provisión masiva.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
  {
    icon: Cpu,
    label: "Ingeniería e IT",
    description: "Control de infraestructura tecnológica, planos y presupuestos técnicos.",
    href: "/register/juridico",
    badge: "Empresarial",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

function AccessCard({ item }: { item: typeof personalAccess[0] }) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -4 }}>
      <Card className="h-full group hover:border-primary/40 transition-all duration-300 bg-card/40 backdrop-blur-xl flex flex-col border-border/50 shadow-lg hover:shadow-primary/5 rounded-[1.5rem] overflow-hidden">
        <Link href={item.href} className="flex flex-col h-full">
          <CardHeader className="flex-row items-center gap-4 p-5 pb-3">
            <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300 border border-primary/5 shadow-inner shrink-0">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-black group-hover:text-primary transition-colors tracking-tight leading-tight uppercase italic">
              {item.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow px-5 pb-4">
            <CardDescription className="text-xs leading-snug text-muted-foreground font-medium uppercase tracking-tight">
              {item.description}
            </CardDescription>
          </CardContent>
          <div className="p-4 pt-0 mt-auto border-t border-border/10">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/40 group-hover:text-primary inline-flex items-center transition-all duration-300">
              Registrarse <ArrowRight className="h-3 w-3 ml-1.5" />
            </span>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

function SectionDivider({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
      <h2 className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 flex items-center gap-2.5 text-primary italic whitespace-nowrap">
        <Icon className="h-3.5 w-3.5" /> {label}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col items-center max-w-6xl">
      <motion.div className="w-full" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Header */}
        <header className="flex flex-col items-center text-center mb-12 md:mb-16">
          <motion.div variants={itemVariants} className="self-start mb-6">
            <Button variant="ghost" asChild className="group rounded-xl h-9 px-4 text-xs hover:bg-secondary/50">
              <Link href="/login">
                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Ya tengo cuenta
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-6 shadow-glow-sm"
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Crear Nueva Cuenta
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-balance leading-none text-foreground italic-shadow"
          >
            Elige tu <span className="text-primary italic">Acceso</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted-foreground max-w-2xl text-balance leading-snug font-medium uppercase tracking-tight opacity-60"
          >
            Selecciona el módulo al que quieres registrarte para comenzar.
          </motion.p>
        </header>

        <div className="grid gap-12">
          {/* Portal Ciudadano */}
          <motion.section variants={itemVariants}>
            <SectionDivider icon={User} label="Portal Ciudadano" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalAccess.map((item) => (
                <AccessCard key={item.label} item={item} />
              ))}
            </div>
          </motion.section>

          {/* Accesos Empresariales */}
          <motion.section variants={itemVariants}>
            <SectionDivider icon={Building} label="Accesos Empresariales" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enterpriseAccess.map((item) => (
                <AccessCard key={item.label} item={item} />
              ))}
            </div>
          </motion.section>
        </div>

        <motion.p variants={itemVariants} className="mt-12 text-center text-sm text-muted-foreground">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Inicia sesión aquí
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
