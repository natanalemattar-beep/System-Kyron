
"use client";

import { Link } from "@/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Smartphone, Signal, ArrowRight, ChevronLeft, ShieldCheck, Wifi, Radio } from "lucide-react";
import { motion } from "framer-motion";

const lineaOptions = [
    {
        href: "/login-linea-personal",
        label: "Mi Línea Personal",
        icon: Smartphone,
        description: "Gestión individual de tu línea móvil, recargas y consumo de datos 5G.",
        tag: "PERSONAL",
        color: "text-primary",
        features: ["Activación de eSIM Individual", "Recargas de Saldo Prepago", "Monitor de Consumo 5G"],
        bgIcon: Wifi,
    },
    {
        href: "/login-linea-empresa",
        label: "Mi Línea Empresa",
        icon: Signal,
        description: "Centro de control de flota corporativa para la gestión masiva de líneas.",
        tag: "CORPORATIVO",
        color: "text-secondary",
        features: ["Gestión de Flota Masiva", "Provisión eSIM Corporativa", "Facturación Unificada"],
        bgIcon: Radio,
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function LoginLineaSelectionPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-20 min-h-screen flex flex-col items-center max-w-4xl hud-grid">
            <motion.div
                className="w-full"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <header className="flex flex-col items-center text-center mb-16">
                    <motion.div variants={itemVariants} className="self-start mb-6">
                        <Button variant="ghost" asChild className="group rounded-xl h-9 px-4 text-xs hover:bg-secondary/50">
                            <Link href="/login">
                                <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Volver al Portal
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-6 shadow-glow-sm">
                        <ShieldCheck className="h-3.5 w-3.5" /> Gestión de Línea Kyron
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-balance leading-none text-foreground italic-shadow">
                        Selecciona tu <span className="text-primary italic">Tipo de Acceso</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-sm text-muted-foreground max-w-xl text-balance font-medium uppercase tracking-widest opacity-50">
                        Elige entre tu gestión de línea personal o la administración de flota corporativa.
                    </motion.p>
                </header>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {lineaOptions.map((option) => (
                        <motion.div
                            key={option.href}
                            whileHover={{ y: -6, scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link href={option.href as any} className="block h-full">
                                <Card className="h-full group hover:border-primary/40 transition-all duration-300 bg-card/40 backdrop-blur-xl border-border/50 shadow-2xl hover:shadow-primary/10 rounded-[2.5rem] overflow-hidden relative cursor-pointer">
                                    <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none">
                                        <option.bgIcon className="h-32 w-32" />
                                    </div>
                                    <CardHeader className="p-8 pb-4">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300 border border-primary/10 shadow-inner">
                                                <option.icon className={`h-8 w-8 ${option.color}`} />
                                            </div>
                                            <span className={`text-[8px] font-black uppercase tracking-[0.4em] px-3 py-1 rounded-lg bg-primary/5 border border-primary/10 ${option.color}`}>
                                                {option.tag}
                                            </span>
                                        </div>
                                        <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors tracking-tight uppercase italic leading-tight">
                                            {option.label}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="px-8 pb-8 space-y-6">
                                        <CardDescription className="text-sm leading-relaxed text-muted-foreground font-medium uppercase tracking-tight">
                                            {option.description}
                                        </CardDescription>
                                        <ul className="space-y-3 pt-4 border-t border-border/30">
                                            {option.features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-tight text-muted-foreground">
                                                    <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-4 border-t border-border/10">
                                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/40 group-hover:text-primary inline-flex items-center transition-all duration-300">
                                                Acceder <ArrowRight className="h-3.5 w-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p variants={itemVariants} className="mt-16 text-[8px] font-black text-muted-foreground/20 uppercase tracking-[1em] italic text-center">
                    SYSTEM KYRON v2.6.5 • ENLACE SEGURO
                </motion.p>
            </motion.div>
        </div>
    );
}
