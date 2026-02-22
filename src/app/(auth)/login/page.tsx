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
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="container mx-auto px-4 py-12 md:py-24 min-h-screen flex flex-col items-center">
            <motion.div 
                className="w-full max-w-6xl"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <header className="flex flex-col items-center text-center mb-16">
                    <motion.div variants={itemVariants} className="self-start mb-8">
                        <Button variant="ghost" asChild className="group">
                            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"/> Volver al ecosistema</Link>
                        </Button>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                        <ShieldCheck className="h-3 w-3" /> Acceso Seguro Encriptado
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-extrabold tracking-tighter mb-6 text-balance">
                        Tu Puerta al <span className="text-primary">Ecosistema Kyron</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-3xl text-balance leading-relaxed">
                        Selecciona tu portal de acceso para gestionar operaciones, finanzas y cumplimiento con seguridad inmutable.
                    </motion.p>
                </header>

                <div className="grid gap-16">
                    {/* Sección Personal */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border"></div>
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-60 flex items-center gap-3">
                                <User className="text-primary h-4 w-4" /> Portal Ciudadano
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border"></div>
                        </div>
                        {personalOption && (
                            <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-xl border-2 hover:border-primary/40 transition-all duration-500 shadow-2xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <Link href={personalOption.href} className="relative z-10 flex flex-col md:flex-row items-center p-10 md:p-12 gap-10">
                                    <div className="p-8 bg-primary/5 rounded-3xl group-hover:scale-105 group-hover:bg-primary/10 transition-all duration-500 border border-primary/5">
                                        <personalOption.icon className="h-16 w-16 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-3">
                                        <h3 className="text-3xl font-bold flex items-center justify-center md:justify-start gap-3">
                                            {personalOption.label}
                                            <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
                                        </h3>
                                        <p className="text-muted-foreground text-xl leading-relaxed max-w-2xl">{personalOption.description}</p>
                                    </div>
                                    <Button size="lg" className="h-14 px-10 rounded-2xl group-hover:translate-x-2 transition-all duration-500 text-lg font-bold shadow-xl">
                                        Entrar Ahora <ArrowRight className="ml-2 h-6 w-6" />
                                    </Button>
                                </Link>
                            </Card>Personal
                        )}
                    </motion.section>

                    {/* Sección Empresarial */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border"></div>
                            <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-60 flex items-center gap-3">
                                <Building2 className="text-primary h-4 w-4" /> Portales Corporativos
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enterpriseOptions.map((option) => (
                                <motion.div
                                    key={option.href}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                >
                                    <Card className="h-full group hover:border-primary/40 transition-all duration-500 bg-card/40 backdrop-blur-lg flex flex-col border-border/50 shadow-lg hover:shadow-primary/5">
                                        <Link href={option.href} className="flex flex-col h-full">
                                            <CardHeader className="flex-row items-center gap-5 p-8 pb-6">
                                                <div className="p-4 bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-all duration-500 border border-primary/5">
                                                    <option.icon className="h-7 w-7 text-primary" />
                                                </div>
                                                <CardTitle className="text-xl group-hover:text-primary transition-colors">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow px-8 pb-8">
                                                <CardDescription className="text-base leading-relaxed text-muted-foreground">{option.description}</CardDescription>
                                            </CardContent>
                                            <div className="p-8 pt-0 mt-auto border-t border-border/10">
                                                <span className="text-xs font-black uppercase tracking-[0.2em] text-primary inline-flex items-center group-hover:gap-3 transition-all duration-500">
                                                    Acceder al Sistema <ArrowRight className="h-4 w-4 ml-2" />
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