
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, KeyRound, Smartphone, Lock, Activity, Terminal , ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import { Link } from '@/navigation';
export default function SeguridadPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-4"><ArrowLeft className="h-3.5 w-3.5" /> Volver al Dashboard</Link>
                <header className="border-l-4 border-primary pl-8 py-2">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight uppercase italic text-foreground  flex items-center gap-6">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                    Seguridad de Nodo
                </h1>
                <p className="text-muted-foreground mt-2 font-bold text-xs uppercase tracking-widest opacity-40">Protección de Identidad • Encryption AES-256</p>
            </header>

            <div className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-7 space-y-8">
                    <Card className="glass-card border-none rounded-[2.5rem] bg-white/[0.02] p-4">
                        <CardHeader className="p-8">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tight text-white flex items-center gap-4">
                                <KeyRound className="h-6 w-6 text-primary"/> Autenticación 2FA
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-white/30 mt-2">Capa de Seguridad Extra</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-sm font-black uppercase italic text-white/80">App de Autenticación</Label>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Google Authenticator / Authy</p>
                            </div>
                            <Switch className="data-[state=checked]:bg-primary shadow-glow-sm" />
                        </CardContent>
                    </Card>

                    <Card className="glass-card border-none rounded-[2.5rem] bg-white/[0.02] p-4">
                        <CardHeader className="p-8">
                            <CardTitle className="text-xl font-black uppercase italic tracking-tight text-white flex items-center gap-4">
                                <Smartphone className="h-6 w-6 text-primary"/> Dispositivos Vinculados
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-4">
                            <div className="flex justify-between items-center p-5 bg-white/[0.03] border border-white/5 rounded-2xl group hover:bg-white/[0.05] transition-all">
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase italic text-white/90">iPhone 15 Pro - Caracas</p>
                                    <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Activo Ahora • Nodo Central</p>
                                </div>
                                <Badge className="bg-primary/20 text-primary border-primary/30 text-[8px] font-black uppercase">Este Nodo</Badge>
                            </div>
                            <div className="flex justify-between items-center p-5 bg-white/[0.01] border border-white/5 rounded-2xl opacity-50">
                                <div className="space-y-1">
                                    <p className="text-xs font-black uppercase italic text-white/90">Windows PC - Valencia</p>
                                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Visto hace 2 días</p>
                                </div>
                                <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase text-rose-500 hover:text-rose-400 hover:bg-rose-500/10">Revocar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-5 space-y-8">
                    <Card className="bg-rose-600/10 border-2 border-rose-600/20 rounded-[2.5rem] p-10 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                            <Lock className="h-32 w-32" />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase italic tracking-tight text-rose-500 mb-4 flex items-center gap-3">
                                <Activity className="h-6 w-6" /> BLOQUEO MAESTRO
                            </h3>
                            <p className="text-[10px] font-bold text-white/40 leading-relaxed uppercase mb-8">Inhabilite el acceso a todos sus activos digitales y documentos certificados en caso de extravío de su terminal físico.</p>
                        </div>
                        <Button variant="destructive" className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl relative z-10">ACTIVAR PROTOCOLO DE EMERGENCIA</Button>
                    </Card>

                    <Card className="glass-card border-none bg-white/[0.02] rounded-[2.5rem] p-8">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-primary mb-6 flex items-center gap-3">
                            <Terminal className="h-4 w-4" /> Telemetría de Seguridad
                        </h4>
                        <div className="space-y-4 text-[9px] font-bold uppercase tracking-widest text-white/20">
                            <div className="flex justify-between"><span>Encriptación:</span> <span className="text-white/60">AES-XTS-512</span></div>
                            <div className="flex justify-between"><span>SSL Node:</span> <span className="text-white/60">TLS 1.3 Active</span></div>
                            <div className="flex justify-between"><span>Auth Level:</span> <span className="text-white/60">Tier 5 (Master)</span></div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
