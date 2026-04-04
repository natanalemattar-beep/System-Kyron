"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Loader2, ShieldCheck } from "lucide-react";
import { BackButton } from "@/components/back-button";

export default function MultasPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background">
      <BackButton href="/contabilidad" label="Volver al Centro Contable" />

      <header className="space-y-1">
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
          Multas y Sanciones
        </h1>
        <p className="text-muted-foreground text-sm font-medium">
          Registro de multas fiscales, tributarias y administrativas.
        </p>
      </header>

      <Card className="border rounded-2xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm font-bold uppercase tracking-widest">Verificando sanciones...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <ShieldCheck className="h-10 w-10 text-emerald-500" />
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-600">Sin multas ni sanciones activas</p>
              <p className="text-xs text-muted-foreground/70">El sistema monitoreará automáticamente el estatus de cumplimiento fiscal.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
