"use client";

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ShieldCheck, KeyRound, Mail, Smartphone, MapPin, LogOut, ShieldAlert, Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Link } from "@/navigation";
import { motion } from "framer-motion";

export default function PerfilPersonalPage() {
  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-indigo-500/[0.04] via-card to-card p-6 sm:p-8 mt-6"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4" />
        <div className="relative flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <User className="h-7 w-7 text-indigo-500" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Mi Perfil</h1>
            <p className="text-sm text-muted-foreground font-medium">Gestiona tu identidad digital y credenciales personales</p>
          </div>
        </div>
      </motion.header>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="rounded-2xl border border-border/30 bg-card text-center overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-indigo-500/20 via-blue-500/10 to-transparent" />
              <div className="-mt-12 flex flex-col items-center px-6 pb-6">
                <Avatar className="h-24 w-24 border-4 border-card shadow-lg mb-4">
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-indigo-500 to-blue-600 text-white">CM</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-bold text-foreground">Carlos Mattar</h2>
                <p className="text-[11px] text-primary font-semibold mt-0.5">Ciudadano Verificado</p>
                <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                  <ShieldCheck className="h-3 w-3" /> ID Digital Nivel 5
                </span>
                <Button variant="ghost" asChild className="mt-4 text-rose-500 text-xs font-semibold hover:bg-rose-500/5 rounded-xl h-9 px-4">
                  <Link href="/login"><LogOut className="mr-2 h-3.5 w-3.5" /> Cerrar Sesión</Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Card className="rounded-2xl border border-border/30 bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-foreground/70">Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-5">
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30 border border-border/20">
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="h-4 w-4 text-muted-foreground/50" />
                    <span className="text-[11px] font-medium text-muted-foreground">Autenticación</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Biométrica</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-muted/30 border border-border/20">
                  <div className="flex items-center gap-2.5">
                    <KeyRound className="h-4 w-4 text-muted-foreground/50" />
                    <span className="text-[11px] font-medium text-muted-foreground">2FA</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Activo</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="lg:col-span-8">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="rounded-2xl border border-border/30 bg-card overflow-hidden">
              <CardHeader className="border-b border-border/20 bg-muted/10">
                <CardTitle className="text-sm font-semibold text-foreground/70">Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/20 border border-border/20">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-2">Email Principal</p>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary/50" />
                      <span className="text-sm font-medium text-foreground/80">carlos.mattar@email.com</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/20 border border-border/20">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-2">Teléfono Móvil</p>
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-4 w-4 text-primary/50" />
                      <span className="text-sm font-medium text-foreground/80">0414-9377068</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/20 border border-border/20 sm:col-span-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-2">Residencia</p>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary/50" />
                      <span className="text-sm font-medium text-foreground/80">La Guaira, Venezuela</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/20 bg-muted/5 p-4 flex justify-end">
                <Button className="h-10 px-6 rounded-xl text-[10px] font-bold uppercase tracking-widest gap-2">
                  <Pencil className="h-3.5 w-3.5" /> Editar Información
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
