"use client";

import { useState, useEffect } from "react";
import { 
    Shield, ShieldCheck, KeyRound, MonitorSmartphone, 
    Activity, Mail, Smartphone, Bell, Loader2, 
    CheckCircle2, AlertCircle, History, Fingerprint,
    ShieldAlert, Lock, ArrowRight, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface LoginEvent {
    evento: string;
    ip: string;
    fecha: string;
    status: 'ok' | 'bloqueado';
}

export default function SecurityPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [notificationMethod, setNotificationMethod] = useState<'email' | 'sms'>('email');
    const [recentLogins, setRecentLogins] = useState<LoginEvent[]>([]);

    useEffect(() => {
        fetchSecuritySettings();
    }, []);

    const fetchSecuritySettings = async () => {
        try {
            const res = await fetch('/api/auth/profile/security');
            const data = await res.json();
            if (res.ok) {
                setTwoFactorEnabled(data.twoFactorEnabled);
                setNotificationMethod(data.notificationMethod);
                setRecentLogins(data.recentLogins);
            }
        } catch (err) {
            console.error("Error fetching security settings:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle2FA = async (checked: boolean) => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/auth/profile/security', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    twoFactorEnabled: checked, 
                    notificationMethod 
                }),
            });
            if (res.ok) {
                setTwoFactorEnabled(checked);
                toast({
                    title: checked ? "2FA Activado" : "2FA Desactivado",
                    description: checked 
                        ? "Tu cuenta ahora cuenta con protección de doble factor." 
                        : "Has desactivado la protección adicional de tu cuenta.",
                    variant: checked ? "default" : "destructive"
                });
            }
        } catch (err) {
            toast({
                title: "Error",
                description: "No se pudo actualizar la configuración.",
                variant: "destructive"
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20 px-4 md:px-0">
            <motion.header 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-10 space-y-4"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                    <Shield className="h-3 w-3" /> Shield v2.0
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-1">
                        <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic">
                            Seguridad <span className="text-primary italic">Kyron</span>
                        </h1>
                        <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest leading-none">
                            Configuración de Acceso • Protección Biométrica • Auditoría Inmutable
                        </p>
                    </div>
                    <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/30 text-primary font-bold animate-pulse">
                        PROTECCIÓN ACTIVA
                    </Badge>
                </div>
            </motion.header>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Panel Principal 2FA */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <Card className="overflow-hidden border-border/40 bg-card/50 backdrop-blur-xl relative rounded-3xl">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                        <CardHeader className="relative pb-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <KeyRound className="h-5 w-5 text-primary" />
                                        <CardTitle className="text-xl font-black uppercase tracking-tight italic">Doble Factor (2FA)</CardTitle>
                                    </div>
                                    <CardDescription className="text-xs font-medium">Añade una capa extra de seguridad a cada inicio de sesión.</CardDescription>
                                </div>
                                <div className="flex items-center gap-3">
                                    {isSaving && <Loader2 className="h-4 w-4 animate-spin text-primary" />}
                                    <Switch 
                                        checked={twoFactorEnabled} 
                                        onCheckedChange={handleToggle2FA}
                                        disabled={isSaving}
                                        className="data-[state=checked]:bg-primary"
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="relative space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div 
                                    onClick={() => setNotificationMethod('email')}
                                    className={cn(
                                        "p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden",
                                        notificationMethod === 'email' 
                                            ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                                            : "border-border/40 bg-muted/20 hover:border-primary/40"
                                    )}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "p-3 rounded-xl transition-colors",
                                            notificationMethod === 'email' ? "bg-primary text-white" : "bg-card text-muted-foreground group-hover:text-primary"
                                        )}>
                                            <Mail className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black uppercase tracking-tighter truncate">Correo Electrónico</p>
                                            <p className="text-[10px] text-muted-foreground leading-tight">Envío de OTP a tu dirección principal cifrada.</p>
                                        </div>
                                    </div>
                                    {notificationMethod === 'email' && (
                                        <motion.div layoutId="active" className="absolute bottom-1 right-1">
                                            <CheckCircle2 className="h-4 w-4 text-primary" />
                                        </motion.div>
                                    )}
                                </div>

                                <div 
                                    onClick={() => setNotificationMethod('sms')}
                                    className={cn(
                                        "p-4 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden opacity-50 pointer-events-none",
                                        notificationMethod === 'sms' 
                                            ? "border-primary bg-primary/5 ring-1 ring-primary/20" 
                                            : "border-border/40 bg-muted/20"
                                    )}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "p-3 rounded-xl transition-colors",
                                            notificationMethod === 'sms' ? "bg-primary text-white" : "bg-card text-muted-foreground"
                                        )}>
                                            <Smartphone className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-black uppercase tracking-tighter truncate">Mensaje SMS</p>
                                                <Badge variant="outline" className="text-[7px] h-3 px-1 border-primary/30 text-primary">PRÓXIMAMENTE</Badge>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground leading-tight">Notificación directa a tu teléfono móvil.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex gap-4 items-center">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-[11px] font-bold text-foreground/80 lowercase leading-tight first-letter:uppercase">
                                    Como usuario del <span className="text-primary uppercase italic font-black">Plan Professional</span>, tienes acceso prioritario a los canales de verificación redundantes.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Más Opciones */}
                    <Card className="border-border/40 bg-card/50 rounded-3xl">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                                <Fingerprint className="h-4 w-4 text-primary" /> Acceso Biométrico y Claves
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-background border border-border/40">
                                        <Lock className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-tight">Cambiar Contraseña</p>
                                        <p className="text-[10px] text-muted-foreground">Último cambio hace 3 meses</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-full h-7 px-4 text-[9px] font-black uppercase tracking-widest">
                                    Actualizar
                                </Button>
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-xl bg-background border border-border/40">
                                        <Fingerprint className="h-4 w-4 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-tight">Passkeys / WebAuthn</p>
                                        <p className="text-[10px] text-muted-foreground">Usa tu huella o rostro para entrar sin claves</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="rounded-full h-7 px-4 text-[9px] font-black uppercase tracking-widest text-primary hover:text-primary hover:bg-primary/10">
                                    Configurar
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Sidebar Auditoría */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                >
                    <Card className="border-primary/20 bg-[#0a1225] text-white rounded-3xl overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                <Activity className="h-4 w-4 text-kyron-cyan" /> Sesiones Activas
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                                <div className="absolute top-2 right-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                </div>
                                <div className="p-2 rounded-xl bg-white/5">
                                    <MonitorSmartphone className="h-4 w-4 text-kyron-cyan" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-black uppercase italic">Esta Sesión</p>
                                    <p className="text-[10px] text-white/40">Windows • Chrome 123.0</p>
                                    <p className="text-[9px] text-kyron-cyan/80 mt-1 font-mono">186.167.243.xx</p>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full h-9 text-[9px] font-black uppercase tracking-widest border-rose-500/30 text-rose-500 bg-rose-500/5 hover:bg-rose-500/20 rounded-2xl">
                                Cerrar Todas las Sesiones
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-border/40 bg-card rounded-3xl overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-xs font-black uppercase tracking-widest flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <History className="h-4 w-4 text-primary" /> Historial
                                </div>
                                <Badge variant="secondary" className="text-[8px] h-5 rounded-full px-2">Últimos 5</Badge>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 pb-4">
                            {recentLogins.length === 0 ? (
                                <div className="py-8 text-center space-y-2">
                                    <ShieldAlert className="h-8 w-8 text-muted-foreground/20 mx-auto" />
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase">Sin registros recientes</p>
                                </div>
                            ) : (
                                recentLogins.map((event, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-muted/30 transition-colors">
                                        <div className={cn(
                                            "p-2 rounded-xl flex-shrink-0",
                                            event.status === 'ok' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                        )}>
                                            {event.status === 'ok' ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-black uppercase tracking-tight truncate">
                                                {event.evento.replace(/_/g, ' ')}
                                            </p>
                                            <p className="text-[9px] text-muted-foreground font-mono">{event.ip}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <p className="text-[9px] font-bold text-muted-foreground">
                                                {new Date(event.fecha).toLocaleDateString()}
                                            </p>
                                            <p className="text-[8px] text-muted-foreground/50">
                                                {new Date(event.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
                        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                            <AlertCircle className="h-4 w-4" />
                            <p className="text-[10px] font-black uppercase tracking-widest">Alerta Pro</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">
                            Se detectó un intento de inicio de sesión desde una ubicación inusual (<span className="font-bold text-foreground">Rusia</span>) hace 12 días. Tu cortafuegos lo bloqueó automáticamente.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-[9px] font-black uppercase tracking-widest text-amber-600">
                            Ver Detalles <ArrowRight className="ml-1 h-3 w-3" />
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
