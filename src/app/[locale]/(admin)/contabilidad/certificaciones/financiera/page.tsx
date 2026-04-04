"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Scale, Loader2, AlertTriangle, Printer, X } from "lucide-react";

export default function CertificacionFinancieraPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    empresa: "",
    rif: "",
    liquidez: 0,
    patrimonio: 0,
  });

  const handleGenerate = async () => {
    if (!data.empresa || !data.rif) {
      toast({ variant: "destructive", title: "Datos incompletos", description: "Complete la razón social y el RIF." });
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoria: "contabilidad", subcategoria: "certificacion_financiera", descripcion: "Solicitud de certificación financiera", metadata: data }),
      });
      if (res.ok) {
        toast({ title: "Solicitud registrada", description: "La certificación financiera ha sido solicitada exitosamente." });
        setData({ empresa: "", rif: "", liquidez: 0, patrimonio: 0 });
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo generar la solicitud." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20 px-4 md:px-10 min-h-screen">
      <header className="pt-8 space-y-4">
        <BackButton href="/contabilidad" label="Contabilidad" />
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-3">
            <Scale className="h-3.5 w-3.5" /> Certificación Financiera
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Certificación <span className="text-primary">Financiera</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Atestiguamiento de capacidad económica · VEN-NIF · NIC</p>
        </div>
      </header>

      <Card className="rounded-2xl border shadow-lg max-w-2xl mx-auto">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-base font-bold">Datos para Certificación</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Complete los datos del dictamen financiero</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">Razón Social</Label>
              <Input
                value={data.empresa}
                onChange={e => setData({...data, empresa: e.target.value})}
                placeholder="Nombre de la empresa"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">RIF</Label>
              <Input
                value={data.rif}
                onChange={e => setData({...data, rif: e.target.value})}
                placeholder="J-00000000-0"
                className="h-11 rounded-xl font-mono"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">Ratio de Liquidez</Label>
              <Input
                type="number"
                value={data.liquidez || ''}
                onChange={e => setData({...data, liquidez: Number(e.target.value)})}
                placeholder="0.00"
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-muted-foreground">Patrimonio Neto (Bs.)</Label>
              <Input
                type="number"
                value={data.patrimonio || ''}
                onChange={e => setData({...data, patrimonio: Number(e.target.value)})}
                placeholder="0.00"
                className="h-11 rounded-xl"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 border-t flex justify-center">
          <Button onClick={handleGenerate} className="rounded-xl px-8" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}
            Solicitar Certificación
          </Button>
        </CardFooter>
      </Card>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 max-w-2xl mx-auto">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Aviso Legal</p>
            <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
              La certificación financiera debe ser emitida por un Contador Público Colegiado (CPC) conforme a las Normas VEN-NIF y Normas Internacionales de Contabilidad (NIC). Este formulario registra la solicitud para su procesamiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
