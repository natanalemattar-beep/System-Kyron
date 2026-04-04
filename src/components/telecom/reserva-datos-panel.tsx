'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import {
  Shield, Wifi, WifiOff, Zap, TriangleAlert, CircleCheck,
  Smartphone, Lock, Unlock, ArrowRight, Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ReservaDatosPanelProps {
  tipo: 'personal' | 'empresa';
  lineas?: { id: string; numero: string; plan: string; reservaMB: number; reservaUsadaMB: number; modoForzoso: boolean }[];
}

const DEFAULT_LINEAS_PERSONAL = [
  { id: 'p1', numero: '+58 412-1234567', plan: 'Plan Plus 30GB', reservaMB: 150, reservaUsadaMB: 12, modoForzoso: false },
  { id: 'p2', numero: '+58 414-7654321', plan: 'Plan Básico 10GB', reservaMB: 100, reservaUsadaMB: 45, modoForzoso: false },
];

const DEFAULT_LINEAS_EMPRESA = [
  { id: 'e1', numero: '+58 412-1234567', plan: 'Ilimitado Corp', reservaMB: 300, reservaUsadaMB: 20, modoForzoso: false },
  { id: 'e2', numero: '+58 414-7654321', plan: '20GB Corp', reservaMB: 200, reservaUsadaMB: 80, modoForzoso: false },
  { id: 'e3', numero: '+58 416-9876543', plan: '30GB Corp', reservaMB: 200, reservaUsadaMB: 5, modoForzoso: false },
];

const CARGO_POR_MB = 0.02;

export function ReservaDatosPanel({ tipo, lineas: initialLineas }: ReservaDatosPanelProps) {
  const defaults = tipo === 'personal' ? DEFAULT_LINEAS_PERSONAL : DEFAULT_LINEAS_EMPRESA;
  const [lineas, setLineas] = useState(initialLineas || defaults);
  const [confirmDialog, setConfirmDialog] = useState<string | null>(null);
  const [deactivateDialog, setDeactivateDialog] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleActivarForzoso = async (lineaId: string) => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1200));
    setLineas(prev => prev.map(l => l.id === lineaId ? { ...l, modoForzoso: true } : l));
    setConfirmDialog(null);
    setProcessing(false);
    const linea = lineas.find(l => l.id === lineaId);
    toast({
      title: 'Modo Forzoso Activado',
      description: `La reserva de ${linea?.numero} ahora se consume con cargo de $${CARGO_POR_MB}/MB.`,
      action: <Zap className="h-4 w-4 text-amber-500" />,
    });
  };

  const handleDesactivarForzoso = async (lineaId: string) => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 800));
    setLineas(prev => prev.map(l => l.id === lineaId ? { ...l, modoForzoso: false } : l));
    setDeactivateDialog(null);
    setProcessing(false);
    toast({
      title: 'Modo Forzoso Desactivado',
      description: 'La reserva vuelve a ser exclusiva para la aplicación.',
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  const totalReservaMB = lineas.reduce((sum, l) => sum + l.reservaMB, 0);
  const totalUsadoMB = lineas.reduce((sum, l) => sum + l.reservaUsadaMB, 0);
  const lineasForzosas = lineas.filter(l => l.modoForzoso).length;

  return (
    <>
      <Card className="bg-card/60 border border-border/50 rounded-xl overflow-hidden">
        <div className="p-6 md:p-8 pb-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 ring-1 ring-amber-500/20">
                <Shield className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight text-foreground uppercase">Reserva de Datos</h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground mt-0.5">
                  {tipo === 'personal' ? 'Datos de emergencia · Mi Línea' : 'Reserva corporativa · Flota'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <Wifi className="h-3 w-3 mr-1.5" />
                {totalReservaMB} MB reservados
              </Badge>
              {lineasForzosas > 0 && (
                <Badge variant="outline" className="text-[9px] font-black uppercase tracking-wider px-3 py-1.5 bg-amber-500/10 text-amber-500 border-amber-500/20">
                  <Zap className="h-3 w-3 mr-1.5" />
                  {lineasForzosas} línea{lineasForzosas > 1 ? 's' : ''} forzosa{lineasForzosas > 1 ? 's' : ''}
                </Badge>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 via-amber-500/5 to-primary/5 border border-primary/10 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                <Smartphone className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-foreground">¿Cómo funciona la reserva?</p>
                <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">
                  Tu plan incluye una reserva gratuita de datos exclusiva para abrir System Kyron y recargar.
                  Si activas el <strong className="text-amber-500">Modo Forzoso</strong>, esa reserva se libera para uso general (navegar, redes, etc.)
                  pero se te cobra <strong className="text-foreground">${CARGO_POR_MB}/MB</strong> consumido.
                </p>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="px-6 md:px-8 pb-6 md:pb-8 space-y-3">
          <AnimatePresence>
            {lineas.map((linea, idx) => {
              const pctUsado = (linea.reservaUsadaMB / linea.reservaMB) * 100;
              const restante = linea.reservaMB - linea.reservaUsadaMB;
              const barColor = linea.modoForzoso
                ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                : pctUsado > 80
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                  : 'bg-gradient-to-r from-emerald-500 to-cyan-500';

              return (
                <motion.div
                  key={linea.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  className={cn(
                    "rounded-xl p-4 ring-1 transition-all duration-300 relative overflow-hidden group",
                    linea.modoForzoso
                      ? "ring-amber-500/25 bg-gradient-to-r from-amber-500/[0.04] to-card"
                      : "ring-border/40 bg-card hover:ring-emerald-500/20"
                  )}
                >
                  {linea.modoForzoso && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={cn(
                        "p-2 rounded-xl shrink-0",
                        linea.modoForzoso ? "bg-amber-500/15" : "bg-emerald-500/10"
                      )}>
                        {linea.modoForzoso
                          ? <Unlock className="h-4 w-4 text-amber-500" />
                          : <Lock className="h-4 w-4 text-emerald-500" />
                        }
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-foreground font-mono tracking-wide truncate">{linea.numero}</p>
                          {linea.modoForzoso && (
                            <Badge className="text-[7px] font-black uppercase px-1.5 py-0 bg-amber-500/15 text-amber-500 border-amber-500/25 tracking-wider">
                              Forzoso
                            </Badge>
                          )}
                        </div>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{linea.plan}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="flex-1 sm:w-40">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
                            {linea.modoForzoso ? 'Uso con cargo' : 'Reserva app'}
                          </span>
                          <span className="text-[9px] font-bold text-foreground">
                            {linea.reservaUsadaMB}/{linea.reservaMB} MB
                          </span>
                        </div>
                        <div
                          className="h-1.5 rounded-full bg-muted/30 overflow-hidden"
                          role="progressbar"
                          aria-valuenow={linea.reservaUsadaMB}
                          aria-valuemin={0}
                          aria-valuemax={linea.reservaMB}
                          aria-label={`Reserva de datos ${linea.numero}: ${linea.reservaUsadaMB} de ${linea.reservaMB} MB usados`}
                        >
                          <motion.div
                            className={cn("h-full rounded-full", barColor)}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(pctUsado, 100)}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-[8px] text-muted-foreground">
                            {restante} MB disponibles
                          </span>
                          {linea.modoForzoso && (
                            <span className="text-[8px] font-bold text-amber-500">
                              ~${(linea.reservaUsadaMB * CARGO_POR_MB).toFixed(2)} cobrado
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0">
                        {linea.modoForzoso ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeactivateDialog(linea.id)}
                            className="h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider border-amber-500/25 text-amber-500 hover:bg-amber-500/10"
                          >
                            <WifiOff className="h-3 w-3 mr-1.5" />
                            Desactivar
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => setConfirmDialog(linea.id)}
                            className="h-8 px-3 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-600 hover:bg-amber-500/25 border border-amber-500/20"
                          >
                            <Zap className="h-3 w-3 mr-1.5" />
                            Activar Forzoso
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          <div className="mt-4 p-3 rounded-xl bg-muted/20 border border-border/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Total Reservado</p>
                <p className="text-sm font-black text-emerald-500 mt-1">{totalReservaMB} MB</p>
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Consumido</p>
                <p className="text-sm font-black text-foreground mt-1">{totalUsadoMB} MB</p>
              </div>
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground">Costo Forzoso</p>
                <p className="text-sm font-black text-amber-500 mt-1">
                  ${(lineas.filter(l => l.modoForzoso).reduce((s, l) => s + l.reservaUsadaMB, 0) * CARGO_POR_MB).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!confirmDialog} onOpenChange={() => !processing && setConfirmDialog(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-500/15 flex items-center justify-center mb-3">
              <TriangleAlert className="h-7 w-7 text-amber-500" />
            </div>
            <DialogTitle className="text-center text-lg font-black tracking-tight">Activar Modo Forzoso</DialogTitle>
            <DialogDescription className="text-center text-[13px] text-muted-foreground mt-2">
              Al activar el modo forzoso, la reserva de datos dejará de ser gratuita.
              Se te cobrará <strong className="text-foreground">${CARGO_POR_MB}/MB</strong> por cada megabyte consumido de la reserva.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 my-2">
            <div className="flex items-start gap-3">
              <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-[11px] text-muted-foreground space-y-1">
                <p><strong className="text-foreground">La reserva se libera</strong> para uso general (navegación, redes sociales, streaming, etc.)</p>
                <p>Puedes <strong className="text-foreground">desactivarlo</strong> en cualquier momento para volver al modo gratuito exclusivo de la app.</p>
                <p>El cargo se refleja en tu próxima factura.</p>
              </div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setConfirmDialog(null)} disabled={processing} className="rounded-xl">
              Cancelar
            </Button>
            <Button
              onClick={() => confirmDialog && handleActivarForzoso(confirmDialog)}
              disabled={processing}
              className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold"
            >
              {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
              Confirmar Activación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deactivateDialog} onOpenChange={() => !processing && setDeactivateDialog(null)}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <div className="mx-auto h-14 w-14 rounded-2xl bg-emerald-500/15 flex items-center justify-center mb-3">
              <Shield className="h-7 w-7 text-emerald-500" />
            </div>
            <DialogTitle className="text-center text-lg font-black tracking-tight">Desactivar Modo Forzoso</DialogTitle>
            <DialogDescription className="text-center text-[13px] text-muted-foreground mt-2">
              La reserva volverá a ser gratuita y exclusiva para abrir System Kyron y recargar tu plan.
              Ya no podrás usarla para navegación general.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDeactivateDialog(null)} disabled={processing} className="rounded-xl">
              Cancelar
            </Button>
            <Button
              onClick={() => deactivateDialog && handleDesactivarForzoso(deactivateDialog)}
              disabled={processing}
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
              Volver a Modo Gratuito
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
