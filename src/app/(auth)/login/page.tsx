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
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 min-h-screen flex flex-col items-center max-w-6xl">
            <motion.div 
                className="w-full"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <header className="flex flex-col items-center text-center mb-16 md:mb-24">
                    <motion.div variants={itemVariants} className="self-start mb-8">
                        <Button variant="ghost" asChild className="group rounded-xl h-10 px-4 text-sm hover:bg-secondary/50">
                            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"/> Volver al inicio</Link>
                        </Button>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8">
                        <ShieldCheck className="h-4 w-4" /> Acceso Seguro
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-balance leading-[0.9]">
                        Portal de <span className="text-primary">Ecosistema</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance leading-snug font-medium">
                        Selecciona tu portal de acceso para gestionar operaciones, finanzas y cumplimiento.
                    </motion.p>
                </header>

                <div className="grid gap-16">
                    {/* Sección Personal */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 flex items-center gap-3 text-primary">
                                <User className="h-4 w-4" /> Portal Ciudadano
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
                        </div>
                        {personalOption && (
                            <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-2xl border-2 hover:border-primary/40 transition-all duration-500 shadow-xl rounded-[2.5rem]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Link href={personalOption.href} className="relative z-10 flex flex-col lg:flex-row items-center p-8 md:p-12 gap-8 md:gap-12">
                                    <div className="p-8 bg-primary/5 rounded-[2rem] group-hover:scale-105 group-hover:bg-primary/10 transition-all duration-500 border border-primary/5 shadow-lg">
                                        <personalOption.icon className="h-16 w-16 md:h-20 md:w-20 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center lg:text-left space-y-4">
                                        <h3 className="text-2xl md:text-4xl font-black flex items-center justify-center lg:justify-start gap-4 tracking-tighter">
                                            {personalOption.label}
                                            <Sparkles className="h-6 w-6 text-yellow-500" />
                                        </h3>
                                        <p className="text-muted-foreground text-base md:text-lg leading-snug max-w-2xl font-medium">{personalOption.description}</p>
                                    </div>
                                    <Button size="lg" className="h-14 md:h-16 px-10 rounded-2xl group-hover:translate-x-2 transition-all duration-500 text-lg font-black shadow-xl btn-3d-primary whitespace-nowrap">
                                        Entrar <ArrowRight className="ml-3 h-6 w-6" />
                                    </Button>
                                </Link>
                            </Card>
                        )}
                    </motion.section>

                    {/* Sección Empresarial */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 flex items-center gap-3 text-primary">
                                <Building2 className="h-4 w-4" /> Portales Corporativos
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enterpriseOptions.map((option) => (
                                <motion.div
                                    key={option.href}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                >
                                    <Card className="h-full group hover:border-primary/40 transition-all duration-300 bg-card/40 backdrop-blur-xl flex flex-col border-border/50 shadow-lg hover:shadow-primary/5 rounded-[2rem] overflow-hidden">
                                        <Link href={option.href} className="flex flex-col h-full">
                                            <CardHeader className="flex-row items-center gap-4 p-8 pb-6">
                                                <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300 border border-primary/5">
                                                    <option.icon className="h-8 w-8 text-primary" />
                                                </div>
                                                <CardTitle className="text-xl font-black group-hover:text-primary transition-colors tracking-tight leading-tight">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow px-8 pb-8">
                                                <CardDescription className="text-sm md:text-base leading-snug text-muted-foreground font-medium">{option.description}</CardDescription>
                                            </CardContent>
                                            <div className="p-6 pt-0 mt-auto border-t border-border/10">
                                                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary/40 group-hover:text-primary inline-flex items-center group-hover:gap-4 transition-all duration-300">
                                                    Acceder <ArrowRight className="h-4 w-4 ml-2" />
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
