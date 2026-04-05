"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard, Smartphone, Zap, Wallet, History, CircleCheck,
  Signal, ArrowRight, Star, Clock
} from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const MONTOS_RAPIDOS = [5, 10, 15, 20, 30, 50];

const HISTORIAL = [
  { fecha: "28/03/2026", monto: 10, metodo: "Pago Móvil", numero: "+58 412-1234567", estado: "completada" },
  { fecha: "15/03/2026", monto: 20, metodo: "Tarjeta Visa", numero: "+58 412-1234567", estado: "completada" },
  { fecha: "01/03/2026", monto: 15, metodo: "Pago Móvil", numero: "+58 414-7654321", estado: "completada" },
  { fecha: "20/02/2026", monto: 5, metodo: "Efectivo", numero: "+58 412-1234567", estado: "completada" },
];

const METODOS_PAGO = [
  { id: "pago-movil", label: "Pago Móvil", icon: Smartphone, desc: "Bancos venezolanos" },
  { id: "tarjeta", label: "Tarjeta", icon: CreditCard, desc: "Visa / Mastercard" },
  { id: "saldo", label: "Saldo Kyron", icon: Wallet, desc: "Balance disponible" },
];

export default function RecargasPage() {
  const { toast } = useToast();
  const [monto, setMonto] = useState<number | null>(null);
  const [montoCustom, setMontoCustom] = useState("");
  const [metodoPago, setMetodoPago] = useState<string | null>(null);
  const [numero, setNumero] = useState("+58 412-1234567");
  const [loading, setLoading] = useState(false);

  const montoFinal = monto ?? (parseFloat(montoCustom) || 0);

  const handleRecargar = async () => {
    if (!montoFinal || montoFinal <= 0) {
      toast({ variant: "destructive", title: "Monto requerido", description: "Selecciona o ingresa un monto válido." });
      return;
    }
    if (!metodoPago) {
      toast({ variant: "destructive", title: "Método de pago", description: "Selecciona un método de pago." });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/solicitudes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoria: "telecom",
          subcategoria: "recarga",
          descripcion: `Recarga de ${formatCurrency(montoFinal, 'USD')} a la línea ${numero}`,
          metadata: { monto: montoFinal, numero, metodo_pago: metodoPago },
        }),
      });
      if (res.ok) {
        toast({
          title: "Recarga exitosa",
          description: `Se recargaron ${formatCurrency(montoFinal, 'USD')} a la línea ${numero}.`,
          action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
        });
        setMonto(null);
        setMontoCustom("");
        setMetodoPago(null);
      } else {
        toast({ variant: "destructive", title: "Error", description: "No se pudo procesar la recarga." });
      }
    } catch {
      toast({ variant: "destructive", title: "Error de conexión", description: "Intente nuevamente." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-16 px-4 md:px-6 lg:px-8 animate-in fade-in duration-700">
      <header className="pt-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <CreditCard className="h-4 w-4 text-primary" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Mi Línea Personal</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">Recargas</h1>
        <p className="text-xs text-muted-foreground mt-0.5">Recarga tu línea al instante con múltiples métodos de pago.</p>
      </header>

      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-5">
          <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
            <CardHeader className="px-5 py-4 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-foreground">Recarga Rápida</CardTitle>
                  <CardDescription className="text-[10px] text-muted-foreground">Selecciona un monto o ingresa uno personalizado</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 space-y-5">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Número a recargar</label>
                <Input value={numero} onChange={e => setNumero(e.target.value)} className="h-11 rounded-xl text-sm font-mono" />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">Monto (USD)</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {MONTOS_RAPIDOS.map(m => (
                    <motion.button
                      key={m}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => { setMonto(m); setMontoCustom(""); }}
                      className={cn(
                        "p-3 rounded-xl border-2 text-center transition-all duration-200 font-bold text-sm",
                        monto === m
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border/40 bg-card hover:border-primary/30 text-foreground"
                      )}
                    >
                      ${m}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Monto personalizado</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground pointer-events-none">$</span>
                  <Input
                    type="number"
                    min="1"
                    placeholder="0.00"
                    value={montoCustom}
                    onChange={e => { setMontoCustom(e.target.value); setMonto(null); }}
                    className="h-11 pl-8 rounded-xl text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 block">Método de pago</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {METODOS_PAGO.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMetodoPago(m.id)}
                      className={cn(
                        "flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left",
                        metodoPago === m.id
                          ? "border-primary bg-primary/5"
                          : "border-border/40 hover:border-primary/20"
                      )}
                    >
                      <div className={cn("p-2 rounded-lg", metodoPago === m.id ? "bg-primary/15" : "bg-muted/30")}>
                        <m.icon className={cn("h-4 w-4", metodoPago === m.id ? "text-primary" : "text-muted-foreground")} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{m.label}</p>
                        <p className="text-[10px] text-muted-foreground">{m.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleRecargar}
                  disabled={loading || montoFinal <= 0}
                  className="w-full h-12 rounded-xl font-bold text-sm"
                >
                  {loading ? (
                    <span className="flex items-center gap-2"><Clock className="h-4 w-4 animate-spin" /> Procesando...</span>
                  ) : (
                    <span className="flex items-center gap-2">Recargar {montoFinal > 0 ? formatCurrency(montoFinal, 'USD') : ''} <ArrowRight className="h-4 w-4" /></span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-5">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-xl overflow-hidden">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Saldo Kyron</span>
              </div>
              <p className="text-3xl font-bold tracking-tight">$42.50</p>
              <p className="text-[10px] opacity-70">Disponible para recargas inmediatas</p>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border border-border/50 rounded-xl">
            <CardHeader className="px-5 py-3 border-b border-border/50">
              <div className="flex items-center gap-2">
                <History className="h-3.5 w-3.5 text-muted-foreground" />
                <CardTitle className="text-xs font-semibold text-foreground">Últimas Recargas</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {HISTORIAL.map((h, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 border-b border-border/30 last:border-0 hover:bg-muted/5 transition-colors">
                  <div className="space-y-0.5">
                    <p className="text-xs font-semibold text-foreground">{formatCurrency(h.monto, 'USD')}</p>
                    <p className="text-[10px] text-muted-foreground">{h.metodo} · {h.numero}</p>
                  </div>
                  <div className="text-right space-y-0.5">
                    <p className="text-[10px] text-muted-foreground">{h.fecha}</p>
                    <Badge variant="outline" className="text-[11px] px-1.5 py-0 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                      Completada
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
