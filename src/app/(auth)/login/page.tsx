
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
        <div className="container mx-auto px-4 py-8 md:py-16 min-h-screen flex flex-col items-center max-w-6xl">
            <motion.div 
                className="w-full"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <header className="flex flex-col items-center text-center mb-12 md:mb-20">
                    <motion.div variants={itemVariants} className="self-start mb-6">
                        <Button variant="ghost" asChild className="group rounded-xl h-9 px-4 text-xs hover:bg-secondary/50">
                            <Link href="/"><ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"/> Volver</Link>
                        </Button>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[9px] font-black uppercase tracking-[0.2em] mb-6">
                        <ShieldCheck className="h-3.5 w-3.5" /> Acceso Seguro
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-balance leading-none">
                        Portal de <span className="text-primary">Ecosistema</span>
                    </motion.h1>
                    <motion.p variants={itemVariants} className="text-base md:text-lg text-muted-foreground max-w-2xl text-balance leading-snug font-medium">
                        Selecciona tu portal de acceso para gestionar operaciones, finanzas y cumplimiento.
                    </motion.p>
                </header>

                <div className="grid gap-12">
                    {/* Sección Personal */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
                            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 flex items-center gap-2.5 text-primary">
                                <User className="h-3.5 w-3.5" /> Portal Ciudadano
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
                        </div>
                        {personalOption && (
                            <Card className="group relative overflow-hidden bg-card/40 backdrop-blur-2xl border-2 hover:border-primary/40 transition-all duration-500 shadow-xl rounded-[2rem]">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <Link href={personalOption.href} className="relative z-10 flex flex-col lg:flex-row items-center p-6 md:p-10 gap-6 md:gap-10">
                                    <div className="p-6 bg-primary/5 rounded-2xl group-hover:scale-105 group-hover:bg-primary/10 transition-all duration-500 border border-primary/5 shadow-lg">
                                        <personalOption.icon className="h-12 w-12 md:h-14 md:w-14 text-primary" />
                                    </div>
                                    <div className="flex-1 text-center lg:text-left space-y-3">
                                        <h3 className="text-xl md:text-3xl font-black flex items-center justify-center lg:justify-start gap-3 tracking-tighter">
                                            {personalOption.label}
                                            <Sparkles className="h-5 w-5 text-yellow-500" />
                                        </h3>
                                        <p className="text-muted-foreground text-sm md:text-base leading-snug max-w-2xl font-medium">{personalOption.description}</p>
                                    </div>
                                    <Button size="lg" className="h-12 px-8 rounded-xl group-hover:translate-x-2 transition-all duration-500 text-sm font-black shadow-xl btn-3d-primary whitespace-nowrap">
                                        Entrar <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </Card>
                        )}
                    </motion.section>

                    {/* Sección Empresarial */}
                    <motion.section variants={itemVariants}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border"></div>
                            <h2 className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 flex items-center gap-2.5 text-primary">
                                <Building2 className="h-3.5 w-3.5" /> Corporativos
                            </h2>
                            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {enterpriseOptions.map((option) => (
                                <motion.div
                                    key={option.href}
                                    variants={itemVariants}
                                    whileHover={{ y: -5 }}
                                >
                                    <Card className="h-full group hover:border-primary/40 transition-all duration-300 bg-card/40 backdrop-blur-xl flex flex-col border-border/50 shadow-lg hover:shadow-primary/5 rounded-[1.5rem] overflow-hidden">
                                        <Link href={option.href} className="flex flex-col h-full">
                                            <CardHeader className="flex-row items-center gap-4 p-6 pb-4">
                                                <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 group-hover:scale-105 transition-all duration-300 border border-primary/5">
                                                    <option.icon className="h-6 w-6 text-primary" />
                                                </div>
                                                <CardTitle className="text-lg font-black group-hover:text-primary transition-colors tracking-tight leading-tight">{option.label}</CardTitle>
                                            </CardHeader>
                                            <CardContent className="flex-grow px-6 pb-6">
                                                <CardDescription className="text-xs md:text-sm leading-snug text-muted-foreground font-medium">{option.description}</CardDescription>
                                            </CardContent>
                                            <div className="p-4 pt-0 mt-auto border-t border-border/10">
                                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/40 group-hover:text-primary inline-flex items-center transition-all duration-300">
                                                    Acceder <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
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
