"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, KeyRound, Smartphone, Lock, Activity, Terminal, ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from '@/navigation';
import { motion } from "framer-motion";

export default function SeguridadPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-emerald-500/[0.04] via-card to-card p-6 sm:p-8"
            >
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
                <div className="relative flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-7 w-7 text-emerald-500" />
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Seguridad</h1>
                        <p className="text-sm text-muted-foreground font-medium">Protección de identidad, autenticación y dispositivos vinculados</p>
                        <div className="flex items-center gap-2 pt-1">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/15 text-[9px] font-bold uppercase tracking-widest text-emerald-500">
                                <Lock className="h-3 w-3" /> AES-256
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/30 border border-border/20 text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
                                <Terminal className="h-3 w-3" /> TLS 1.3
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-4">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className="rounded-2xl border border-border/30 bg-card">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                        <KeyRound className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-sm font-semibold text-foreground">Autenticación 2FA</CardTitle>
                                        <p className="text-[11px] text-muted-foreground">Capa de seguridad adicional</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between pt-0">
                                <div className="space-y-0.5">
                                    <Label className="text-sm font-medium text-foreground/80">App de Autenticación</Label>
                                    <p className="text-[11px] text-muted-foreground">Google Authenticator / Authy</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-primary" />
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                        <Card className="rounded-2xl border border-border/30 bg-card">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center">
                                        <Smartphone className="h-4 w-4 text-primary" />
                                    </div>
                                    <CardTitle className="text-sm font-semibold text-foreground">Dispositivos Vinculados</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3 pt-0">
                                <div className="flex justify-between items-center p-4 rounded-xl bg-muted/20 border border-border/20 hover:bg-muted/30 transition-colors">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-foreground/90">iPhone 15 Pro — Caracas</p>
                                        <p className="text-[11px] text-emerald-500 font-medium">Activo ahora</p>
                                    </div>
                                    <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-bold uppercase tracking-wider">Este dispositivo</Badge>
                                </div>
                                <div className="flex justify-between items-center p-4 rounded-xl bg-muted/10 border border-border/15 opacity-60">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-medium text-foreground/90">Windows PC — Valencia</p>
                                        <p className="text-[11px] text-muted-foreground">Visto hace 2 días</p>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-400 hover:bg-rose-500/5 rounded-lg h-8">Revocar</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                <div className="lg:col-span-5 space-y-4">
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <Card className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] overflow-hidden">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                                        <Activity className="h-5 w-5 text-rose-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-rose-500">Bloqueo de Emergencia</h3>
                                        <p className="text-[11px] text-muted-foreground">Inhabilita acceso a todos tus datos</p>
                                    </div>
                                </div>
                                <p className="text-[12px] text-muted-foreground leading-relaxed">
                                    Bloquea el acceso a todos tus documentos y activos digitales en caso de extravío de tu dispositivo.
                                </p>
                                <Button variant="destructive" className="w-full h-11 rounded-xl text-[10px] font-bold uppercase tracking-widest">
                                    Activar Bloqueo de Emergencia
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                        <Card className="rounded-2xl border border-border/30 bg-card">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Terminal className="h-4 w-4 text-muted-foreground/40" />
                                    <span className="text-[11px] font-semibold text-muted-foreground/60">Estado del Sistema</span>
                                </div>
                                <div className="space-y-3 text-[12px]">
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Encriptación</span>
                                        <span className="font-medium text-foreground/70">AES-XTS-512</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">SSL</span>
                                        <span className="font-medium text-foreground/70">TLS 1.3 Activo</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-muted-foreground">Nivel de Acceso</span>
                                        <span className="font-medium text-foreground/70">Tier 5 (Master)</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
