"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { loginOptions } from "@/lib/login-options";
import { User, Building2, ArrowRight, ChevronLeft, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginSelectionPage() {
    const personalOption = loginOptions.find(o => o.href === '/login-personal');
    const enterpriseOptions = loginOptions.filter(o => o.href !== '/login-personal');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="container mx-auto px-4 py-20 md:py-32 min-h-screen flex flex-col items-center max-w-7xl">
            <motion.div 
                className="w-full"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <header className="flex flex-col items-center text-center mb-24 md:mb-32">
                    <motion.div variants={itemVariants} className="self-start mb-16">
                        <Button variant="ghost" asChild className="group rounded-2xl h-12 px-6 text-base hover:bg-secondary/50">
                            <Link href="/"><ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1"/> Volver al inicio</Link>
                        </Button>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/5 border border-primary/10 text-primary text-[11px] font-black uppercase tracking-[0.4em] mb-12">
                        <ShieldCheck className="h-5 w-5" /> Acceso de Alta Seguridad Encriptado
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-12 text-balance leading-[0.85]">
                        Tu Puerta al <br/> <span className="text-primary">Ecosistema Kyron</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl md:text-3xl text-muted-foreground max-w-4xl text-balance leading-snug font-medium">
                        Selecciona tu portal de acceso para gestionar operaciones, finanzas y cumplimiento con tecnología Blockchain e IA.
                    </motion.p>
                </header>

                <div className="grid gap-32">
                    {/* Sección Personal */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-8 mb-16">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
                            <h2 className="text-sm font-black uppercase tracking-[0.5em] opacity-40 flex items-center gap-4">
                                <User className="text-primary h-5 w-5" /> Portal Ciudadano
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
                        </div>
                        {personalOption && (
                            <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-3xl border-2 hover:border-primary/40 transition-all duration-700 shadow-[0_48px_96px_-12px_rgba(0,0,0,0.2)] rounded-[4rem]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <Link href={personalOption.href} className="relative z-10 flex flex-col lg:flex-row items-center p-16 md:p-24 lg:p-32 gap-16 md:gap-24">
                                    <div className="p-16 bg-primary/5 rounded-[3.5rem] group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700 border border-primary/5 shadow-2xl">
                                        <personalOption.icon className="h-32 w-32 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center lg:text-left space-y-8">
                                        <h3 className="text-5xl md:text-7xl font-black flex items-center justify-center lg:justify-start gap-6 tracking-tighter">
                                            {personalOption.label}
                                            <Sparkles className="h-12 w-12 text-yellow-500 animate-pulse" />
                                        </h3>
                                        <p className="text-muted-foreground text-2xl md:text-3xl leading-snug max-w-3xl font-medium">{personalOption.description}</p>
                                    </div>
                                    <Button size="lg" className="h-24 px-20 rounded-[2.5rem] group-hover:translate-x-6 transition-all duration-700 text-2xl font-black shadow-2xl btn-3d-primary whitespace-nowrap">
                                        Entrar Ahora <ArrowRight className="ml-4 h-10 w-10" />
                                    </Button>
                                </Link>
                            </Card>
                        )}
                    </motion.section>

                    {/* Sección Empresarial */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-8 mb-20">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
                            <h2 className="text-sm font-black uppercase tracking-[0.5em] opacity-40 flex items-center gap-4">
                                <Building2 className="text-primary h-5 w-5" /> Portales Corporativos
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                            {enterpriseOptions.map((option) => (
                                <motion.div
                                    key={option.href}
                                    variants={itemVariants}
                                    whileHover={{ y: -16 }}
                                >
                                    <Card className="h-full group hover:border-primary/40 transition-all duration-500 bg-card/40 backdrop-blur-2xl flex flex-col border-border/50 shadow-2xl hover:shadow-primary/10 rounded-[3.5rem] overflow-hidden">
                                        <Link href={option.href} className="flex flex-col h-full">
                                            <CardHeader className="flex-row items-center gap-8 p-12 pb-10">
                                                <div className="p-6 bg-primary/5 rounded-[2rem] group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500 border border-primary/5">
                                                    <option.icon className="h-12 w-12 text-primary" />
                                                </div>
                                                <CardTitle className="text-3xl font-black group-hover:text-primary transition-colors tracking-tight leading-[1.1]">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow px-12 pb-12">
                                                <CardDescription className="text-xl leading-snug text-muted-foreground font-medium">{option.description}</CardDescription>
                                            </CardContent>
                                            <div className="p-12 pt-0 mt-auto border-t border-border/10">
                                                <span className="text-[12px] font-black uppercase tracking-[0.4em] text-primary/40 group-hover:text-primary inline-flex items-center group-hover:gap-6 transition-all duration-500">
                                                    Acceder al Sistema <ArrowRight className="h-6 w-6 ml-4" />
                                                </span>
                                            </div>
                                        </Link>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                </div>
            </motion.div>
        </div>
    );
}