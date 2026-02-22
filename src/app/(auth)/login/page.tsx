
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
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="container mx-auto px-4 py-16 md:py-32 min-h-screen flex flex-col items-center">
            <motion.div 
                className="w-full max-w-7xl"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <header className="flex flex-col items-center text-center mb-24">
                    <motion.div variants={itemVariants} className="self-start mb-12">
                        <Button variant="ghost" asChild className="group rounded-2xl h-12 px-6 text-base">
                            <Link href="/"><ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1"/> Volver al inicio</Link>
                        </Button>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[12px] font-black tracking-[0.3em] uppercase mb-10">
                        <ShieldCheck className="h-5 w-5" /> Acceso de Alta Seguridad Encriptado
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-6xl md:text-9xl font-black tracking-tighter mb-10 text-balance leading-[0.9]">
                        Tu Puerta al <br/> <span className="text-primary">Ecosistema Kyron</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-xl md:text-3xl text-muted-foreground max-w-4xl text-balance leading-tight">
                        Selecciona tu portal de acceso para gestionar operaciones, finanzas y cumplimiento con tecnología Blockchain e IA.
                    </motion.p>
                </header>

                <div className="grid gap-24">
                    {/* Sección Personal - Gigante */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-6 mb-12">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border"></div>
                            <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-60 flex items-center gap-4">
                                <User className="text-primary h-5 w-5" /> Portal Ciudadano
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border"></div>
                        </div>
                        {personalOption && (
                            <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-2xl border-2 hover:border-primary/40 transition-all duration-700 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] rounded-[3.5rem]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <Link href={personalOption.href} className="relative z-10 flex flex-col lg:flex-row items-center p-12 md:p-20 gap-12 md:gap-20">
                                    <div className="p-12 bg-primary/5 rounded-[3rem] group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-700 border border-primary/5 shadow-2xl">
                                        <personalOption.icon className="h-24 w-24 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center lg:text-left space-y-6">
                                        <h3 className="text-4xl md:text-6xl font-black flex items-center justify-center lg:justify-start gap-5 tracking-tighter">
                                            {personalOption.label}
                                            <Sparkles className="h-10 w-10 text-yellow-500 animate-pulse" />
                                        </h3>
                                        <p className="text-muted-foreground text-xl md:text-2xl leading-snug max-w-3xl">{personalOption.description}</p>
                                    </div>
                                    <Button size="lg" className="h-20 px-16 rounded-[2rem] group-hover:translate-x-4 transition-all duration-700 text-xl font-black shadow-2xl btn-3d-primary whitespace-nowrap">
                                        Entrar Ahora <ArrowRight className="ml-3 h-8 w-8" />
                                    </Button>
                                </Link>
                            </Card>
                        )}
                    </motion.section>

                    {/* Sección Empresarial - Rejilla Potente */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-6 mb-16">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border"></div>
                            <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-60 flex items-center gap-4">
                                <Building2 className="text-primary h-5 w-5" /> Portales Corporativos
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {enterpriseOptions.map((option) => (
                                <motion.div
                                    key={option.href}
                                    variants={itemVariants}
                                    whileHover={{ y: -12 }}
                                >
                                    <Card className="h-full group hover:border-primary/40 transition-all duration-500 bg-card/40 backdrop-blur-xl flex flex-col border-border/50 shadow-2xl hover:shadow-primary/10 rounded-[3rem] overflow-hidden">
                                        <Link href={option.href} className="flex flex-col h-full">
                                            <CardHeader className="flex-row items-center gap-6 p-10 pb-8">
                                                <div className="p-5 bg-primary/5 rounded-3xl group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500 border border-primary/5">
                                                    <option.icon className="h-10 w-10 text-primary" />
                                                </div>
                                                <CardTitle className="text-2xl font-black group-hover:text-primary transition-colors tracking-tight leading-none">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow px-10 pb-10">
                                                <CardDescription className="text-lg leading-relaxed text-muted-foreground">{option.description}</CardDescription>
                                            </CardContent>
                                            <div className="p-10 pt-0 mt-auto border-t border-border/10">
                                                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/40 group-hover:text-primary inline-flex items-center group-hover:gap-4 transition-all duration-500">
                                                    Acceder al Sistema <ArrowRight className="h-5 w-5 ml-3" />
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
