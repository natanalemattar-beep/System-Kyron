
"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShieldCheck, KeyRound, Mail, Smartphone, MapPin, Building, Globe, Zap, History, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/navigation";

export default function PerfilPage() {
  return (
    <div className="space-y-12 pb-20 px-4 md:px-16 max-w-6xl mx-auto">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.4em] text-primary shadow-glow mb-4">
            <User className="h-3 w-3" /> MI IDENTIDAD
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase leading-none italic-shadow">Gestión de <span className="text-primary italic">Perfil</span></h1>
        <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.6em] opacity-40 mt-2 italic">Credenciales Maestras • Acceso Autorizado 2026</p>
      </header>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Lado Izquierdo: Información Básica */}
        <div className="lg:col-span-4 space-y-10">
            <Card className="glass-card border-none bg-card/40 p-10 rounded-[3rem] text-center shadow-2xl flex flex-col items-center group overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:rotate-12 transition-transform"><Zap className="h-32 w-32" /></div>
                <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-primary/20 p-1 shadow-2xl mb-8 group-hover:scale-105 transition-transform">
                    <AvatarFallback className="text-4xl font-black bg-primary text-white">AD</AvatarFallback>
                </Avatar>
                <div className="space-y-2 mb-8 relative z-10">
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter text-foreground">Administrador</h2>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] italic">Operador Nivel 5</p>
                </div>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-none px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-glow-secondary mb-8">VERIFICADO</Badge>
                <Button variant="ghost" asChild className="text-rose-500 font-black uppercase text-[10px] tracking-widest hover:bg-rose-500/10">
                    <Link href="/login"><LogOut className="mr-2 h-4 w-4" /> Finalizar Sesión</Link>
                </Button>
            </Card>

            <Card className="glass-card border-none bg-primary/5 p-10 rounded-[3rem] shadow-2xl">
                <h3 className="text-sm font-black uppercase tracking-[0.4em] text-primary mb-8 italic border-b border-primary/10 pb-4">Telemetría de Seguridad</h3>
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-border/50 pb-4">
                        <div className="flex items-center gap-3"><KeyRound className="h-4 w-4 text-primary/40" /><span className="text-[9px] font-bold text-muted-foreground uppercase">2FA Status</span></div>
                        <span className="text-[9px] font-black text-emerald-500 uppercase">ACTIVO</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-border/50 pb-4">
                        <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary/40" /><span className="text-[9px] font-bold text-muted-foreground uppercase">Cifrado</span></div>
                        <span className="text-[9px] font-black text-foreground">AES-512</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3"><History className="h-4 w-4 text-primary/40" /><span className="text-[9px] font-bold text-muted-foreground uppercase">Última Auth</span></div>
                        <span className="text-[9px] font-black text-foreground">Hace 12m</span>
                    </div>
                </div>
            </Card>
        </div>

        {/* Lado Derecho: Detalles y Ajustes */}
        <div className="lg:col-span-8 space-y-10">
            <Card className="glass-card border-none rounded-[3rem] bg-card/40 overflow-hidden shadow-2xl">
                <CardHeader className="p-10 border-b border-border/50 bg-muted/10">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.4em] text-primary italic">Expediente de Identidad</CardTitle>
                </CardHeader>
                <CardContent className="p-10">
                    <div className="grid sm:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-muted-foreground/40 ml-1">Correo Corporativo</Label>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-border">
                                    <Mail className="h-4 w-4 text-primary/40" />
                                    <span className="text-xs font-bold text-foreground/80">admin@kyron.com</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-muted-foreground/40 ml-1">Línea Vinculada</Label>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-border">
                                    <Smartphone className="h-4 w-4 text-primary/40" />
                                    <span className="text-xs font-bold text-foreground/80">0414-9377068</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-muted-foreground/40 ml-1">Entidad Maestra</Label>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-border">
                                    <Building className="h-4 w-4 text-primary/40" />
                                    <span className="text-xs font-bold text-foreground/80">System Kyron, C.A.</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase text-muted-foreground/40 ml-1">Región de Operación</Label>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-border">
                                    <Globe className="h-4 w-4 text-primary/40" />
                                    <span className="text-xs font-bold text-foreground/80">Distrito Capital, VEN</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="p-10 bg-primary/5 border-t border-border flex justify-between items-center">
                    <Button variant="outline" className="h-12 px-8 rounded-xl border-border bg-card/50 text-[9px] font-black uppercase tracking-widest hover:bg-card/80 transition-all" onClick={() => alert("En construcción")}>CAMBIAR CLAVE</Button>
                    <Button className="btn-3d-primary h-12 px-10 rounded-xl font-black text-[9px] uppercase tracking-widest shadow-xl">EDITAR PERFIL</Button>
                </CardFooter>
            </Card>

            <Card className="glass-card border-none p-10 rounded-[3rem] bg-white/[0.02] shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:rotate-12 transition-transform duration-1000"><ShieldCheck className="h-48 w-48" /></div>
                <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground mb-6">Bóveda Biométrica</h3>
                <p className="text-sm font-bold text-muted-foreground/60 leading-relaxed uppercase mb-8 text-justify">
                    Su identidad está sellada mediante el protocolo de seguridad Kyron v2.6. Cada acceso administrativo requiere validación cruzada entre su terminal móvil y la ID digital inmutable registrada en el Ledger.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["Reconocimiento Facial", "Huella Digital", "Token Hardware", "Clave Maestra"].map((auth, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-white/5 border border-border text-center">
                            <Badge className="bg-emerald-500/10 text-emerald-400 border-none text-[7px] font-black uppercase mb-2">ACTIVE</Badge>
                            <p className="text-[8px] font-black uppercase tracking-widest text-foreground/40 leading-tight">{auth}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
