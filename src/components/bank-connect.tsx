"use client";

import React, { useState } from "react";
import { Link2, Unlink, Loader2, CircleCheck, TriangleAlert, RefreshCw, Wifi, WifiOff, Building2, ArrowRight, X, Zap } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface CuentaBancaria {
  id: number;
  banco: string;
  cuenta: string;
}

interface SyncResult {
  success: boolean;
  importados: number;
  correos_encontrados?: number;
  errores?: number;
  detalle_errores?: string[];
  banco?: string;
  mensaje?: string;
  requiere_integracion?: boolean;
}

const BANCOS_VE = [
  { key: "banesco", nombre: "Banesco", codigo: "0134", color: "bg-green-500" },
  { key: "mercantil", nombre: "Mercantil", codigo: "0105", color: "bg-blue-600" },
  { key: "provincial", nombre: "Provincial (BBVA)", codigo: "0108", color: "bg-blue-800" },
  { key: "venezuela", nombre: "Banco de Venezuela", codigo: "0102", color: "bg-blue-500" },
  { key: "exterior", nombre: "Banco Exterior", codigo: "0115", color: "bg-teal-600" },
  { key: "fondo_comun", nombre: "BFC", codigo: "0151", color: "bg-purple-600" },
  { key: "bancaribe", nombre: "Bancaribe", codigo: "0114", color: "bg-orange-500" },
  { key: "sofitasa", nombre: "Sofitasa", codigo: "0137", color: "bg-emerald-600" },
];

export function BankConnect({ cuentas, onSyncComplete }: { cuentas: CuentaBancaria[]; onSyncComplete: () => void }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<"select" | "syncing" | "result">("select");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedCuenta, setSelectedCuenta] = useState<string>("none");
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const { toast } = useToast();

  const reset = () => {
    setStep("select");
    setSelectedBank(null);
    setSelectedCuenta("none");
    setResult(null);
    setSyncing(false);
  };

  const close = () => {
    reset();
    setOpen(false);
  };

  const handleSync = async () => {
    if (!selectedBank) return;
    setSyncing(true);
    setStep("syncing");

    try {
      const res = await fetch('/api/contabilidad/bank-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sync',
          banco_key: selectedBank,
          cuenta_id: selectedCuenta !== "none" ? parseInt(selectedCuenta) : null,
        }),
      });

      let data: SyncResult;
      try {
        data = await res.json();
      } catch {
        data = { success: false, importados: 0, mensaje: `Error del servidor (${res.status})` };
      }

      setResult(data);
      setStep("result");

      if (data.success && data.importados > 0) {
        toast({ title: "Sincronización exitosa", description: `${data.importados} movimientos importados de ${data.banco || selectedBank}` });
        onSyncComplete();
      } else if (data.success && data.importados === 0) {
        toast({ title: "Sin movimientos nuevos", description: data.mensaje || "No se encontraron movimientos nuevos para importar." });
      } else if (data.requiere_integracion) {
        toast({ title: "Integración requerida", description: "Necesita conectar su cuenta de Gmail para sincronizar.", variant: "destructive" });
      } else {
        toast({ title: "Error en sincronización", description: data.mensaje || 'Error desconocido', variant: "destructive" });
      }
    } catch {
      setResult({ success: false, importados: 0, mensaje: 'Error de conexión con el servidor.' });
      setStep("result");
      toast({ title: "Error de conexión", variant: "destructive" });
    } finally {
      setSyncing(false);
    }
  };

  if (!open) {
    return (
      <Button onClick={() => setOpen(true)} className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-lg shadow-blue-500/20">
        <Zap className="mr-2 h-4 w-4" /> Conectar con Banco
      </Button>
    );
  }

  const bankInfo = selectedBank ? BANCOS_VE.find(b => b.key === selectedBank) : null;

  return (
    <Card className="rounded-2xl border shadow-xl overflow-hidden border-blue-500/30 bg-gradient-to-b from-card to-card/95">
      <CardHeader className="p-5 border-b bg-gradient-to-r from-blue-500/10 to-cyan-500/10 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          <Wifi className="h-4 w-4 text-blue-500" /> Conexión Bancaria Automática
        </CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={close}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-5 space-y-5">
        {step === "select" && (
          <>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/15">
              <Zap className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                <p className="font-bold text-foreground/70">Sincronización vía notificaciones de email</p>
                <p className="mt-1">System Kyron lee automáticamente las notificaciones de transacciones que su banco envía al correo asociado (Gmail). Los movimientos se importan y clasifican de forma inteligente.</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Seleccione su banco</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {BANCOS_VE.map(banco => (
                  <button
                    key={banco.key}
                    type="button"
                    onClick={() => setSelectedBank(banco.key)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all hover:shadow-md",
                      selectedBank === banco.key
                        ? "border-blue-500 bg-blue-500/10 shadow-blue-500/10"
                        : "border-border/30 hover:border-blue-500/30 bg-card"
                    )}
                  >
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold", banco.color)}>
                      {banco.nombre.charAt(0)}
                    </div>
                    <span className="text-[10px] font-bold text-center leading-tight">{banco.nombre}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">{banco.codigo}</span>
                  </button>
                ))}
              </div>
            </div>

            {selectedBank && (
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Asociar a cuenta bancaria (opcional)</label>
                <Select value={selectedCuenta} onValueChange={setSelectedCuenta}>
                  <SelectTrigger className="h-10 rounded-xl">
                    <SelectValue placeholder="Seleccionar cuenta..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">— Sin asociar (crear nueva) —</SelectItem>
                    {cuentas.map(c => (
                      <SelectItem key={c.id} value={String(c.id)}>
                        {c.banco} · {c.cuenta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3">
              <Button variant="outline" onClick={close} className="rounded-xl">Cancelar</Button>
              <Button
                onClick={handleSync}
                disabled={!selectedBank}
                className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
              >
                <Link2 className="mr-2 h-4 w-4" /> Sincronizar {bankInfo?.nombre || ''}
              </Button>
            </div>
          </>
        )}

        {step === "syncing" && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center animate-pulse">
                <Wifi className="h-3 w-3 text-white" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold">Sincronizando con {bankInfo?.nombre}...</p>
              <p className="text-[11px] text-muted-foreground mt-1">Buscando notificaciones de transacciones en su correo</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" />
              <span>Leyendo correos de los últimos 30 días...</span>
            </div>
          </div>
        )}

        {step === "result" && result && (
          <div className="space-y-4">
            {result.success && result.importados > 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <CircleCheck className="h-8 w-8 text-emerald-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    ¡Sincronización exitosa!
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {result.importados} movimientos importados de {result.banco}
                    {result.correos_encontrados ? ` · ${result.correos_encontrados} correos analizados` : ''}
                  </p>
                </div>
              </div>
            ) : result.success && result.importados === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <TriangleAlert className="h-8 w-8 text-amber-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-amber-600 dark:text-amber-400">Sin movimientos nuevos</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {result.mensaje || 'No se encontraron movimientos nuevos para importar.'}
                    {result.correos_encontrados ? ` (${result.correos_encontrados} correos revisados)` : ''}
                  </p>
                </div>
              </div>
            ) : result.requiere_integracion ? (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                  <WifiOff className="h-7 w-7 text-red-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">Integración de correo requerida</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                    Para sincronizar automáticamente, necesita tener la integración de Google Mail (Gmail) activa en su cuenta de Replit.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <TriangleAlert className="h-8 w-8 text-red-500 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-red-600 dark:text-red-400">Error en sincronización</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{result.mensaje || 'Ocurrió un error inesperado.'}</p>
                </div>
              </div>
            )}

            {result.detalle_errores && result.detalle_errores.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Detalles</p>
                <div className="max-h-32 overflow-y-auto rounded-lg border border-border/30 p-2 space-y-1">
                  {result.detalle_errores.map((e, i) => (
                    <p key={i} className="text-[10px] text-muted-foreground">• {e}</p>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={reset} className="rounded-xl">
                <RefreshCw className="mr-2 h-3.5 w-3.5" /> Sincronizar otro banco
              </Button>
              <Button onClick={close} className="rounded-xl">Cerrar</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
