"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CirclePlus as PlusCircle, CircleCheck as CheckCircle, Clock, QrCode, Activity, Terminal, ShieldAlert, FileSearch, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

interface Autorizacion {
  id: string;
  ente: string;
  tipo: string;
  estado: string;
  fecha: string;
}

export default function AutorizacionesPage() {
  const { toast } = useToast();
  const [autorizaciones, setAutorizaciones] = useState<Autorizacion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/autorizaciones')
      .then(r => r.ok ? r.json() : [])
      .then(data => {
        if (Array.isArray(data)) setAutorizaciones(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <header className="border-l-4 border-primary pl-8 py-2 mt-10 flex flex-col md:flex-row justify-between items-end gap-8">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wider text-primary mb-4">
                <ShieldCheck className="h-3 w-3" /> CENTRO REGULATORIO
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-none">Autorizaciones <span className="text-primary italic">Oficiales</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2 italic">Certificaciones de Entes Públicos</p>
        </div>
        <Button className="h-12 px-10 rounded-xl font-semibold text-[10px] uppercase tracking-widest shadow-lg"
          onClick={() => toast({ title: "Nueva Solicitud", description: "Formulario de solicitud de autorización próximamente." })}>
            <PlusCircle className="mr-3 h-4 w-4" /> NUEVA SOLICITUD
        </Button>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : autorizaciones.length === 0 ? (
        <Card className="border-dashed border-2 border-border/50 bg-card/20 p-12 rounded-2xl">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <FileSearch className="h-10 w-10 text-primary/60" />
            </div>
            <h3 className="text-lg font-semibold text-foreground/80">Sin autorizaciones registradas</h3>
            <p className="text-sm text-muted-foreground/60 max-w-md">
              Aquí aparecerán tus autorizaciones oficiales de entes públicos como SENIAT, INPSASEL, MINEC y otros organismos regulatorios. Presiona &quot;Nueva Solicitud&quot; para iniciar un trámite.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {autorizaciones.map(auth => (
              <Card key={auth.id} className="glass-card border-none bg-card/40 p-10 rounded-2xl shadow-lg flex flex-col justify-between group hover:border-primary/30 transition-all">
                  <div className="space-y-8">
                      <div className="flex justify-between items-start">
                          <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 group-hover:scale-110 transition-transform">
                              <ShieldCheck className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant={auth.estado === 'Aprobada' ? 'default' : 'secondary'} className="text-[10px] font-semibold uppercase tracking-widest h-6 px-3">{auth.estado}</Badge>
                      </div>
                      <div>
                          <CardTitle className="text-xl font-semibold uppercase italic tracking-tight text-foreground mb-2">{auth.ente}</CardTitle>
                          <CardDescription className="text-xs font-bold text-muted-foreground/60 uppercase leading-relaxed">{auth.tipo}</CardDescription>
                      </div>
                      <div className="space-y-4 pt-6 border-t border-border/50">
                          <div className="flex justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                              <span>Referencia:</span>
                              <span className="text-foreground/60">{auth.id}</span>
                          </div>
                          <div className="flex justify-between text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40">
                              <span>Emisión:</span>
                              <span className="text-foreground/60">{auth.fecha}</span>
                          </div>
                      </div>
                  </div>
                  <CardFooter className="p-0 pt-10 flex flex-col items-center gap-6">
                      <div className="p-4 bg-white rounded-2xl shadow-inner border border-border">
                          <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=auth-${auth.id}`} alt="QR Code" width={80} height={80} className="grayscale group-hover:grayscale-0 transition-all" />
                      </div>
                      <Button variant="outline" className="w-full h-10 rounded-xl border-border bg-white/5 text-[11px] font-semibold uppercase tracking-widest">Ver Expediente</Button>
                  </CardFooter>
              </Card>
          ))}
        </div>
      )}
    </div>
  );
}
