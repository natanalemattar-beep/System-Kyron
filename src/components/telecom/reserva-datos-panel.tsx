'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import {
  Shield, Wifi, Zap, TriangleAlert, CircleCheck,
  Smartphone, Lock, Unlock, Loader2, DollarSign, Globe, AppWindow
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface LineaReserva {
  id: string;
  numero: string;
  plan: string;
  reservaMB: number;
  costoForzoso: number;
  modoForzoso: boolean;
}

interface ReservaDatosPanelProps {
  tipo: 'personal' | 'empresa';
  lineas?: LineaReserva[];
}

const DEFAULT_LINEAS_PERSONAL: LineaReserva[] = [
  { id: 'p1', numero: '+58 412-1234567', plan: 'Plan Plus 30GB', reservaMB: 100, costoForzoso: 2.00, modoForzoso: false },
  { id: 'p2', numero: '+58 414-7654321', plan: 'Plan Básico 10GB', reservaMB: 100, costoForzoso: 2.00, modoForzoso: false },
];

const DEFAULT_LINEAS_EMPRESA: LineaReserva[] = [
  { id: 'e1', numero: '+58 412-1234567', plan: 'Ilimitado Corp', reservaMB: 100, costoForzoso: 2.00, modoForzoso: false },
  { id: 'e2', numero: '+58 414-7654321', plan: '20GB Corp', reservaMB: 100, costoForzoso: 2.00, modoForzoso: false },
  { id: 'e3', numero: '+58 416-9876543', plan: '30GB Corp', reservaMB: 100, costoForzoso: 2.00, modoForzoso: false },
];

export function ReservaDatosPanel({ tipo, lineas: initialLineas }: ReservaDatosPanelProps) {
  const defaults = tipo === 'personal' ? DEFAULT_LINEAS_PERSONAL : DEFAULT_LINEAS_EMPRESA;
  const [lineas, setLineas] = useState(initialLineas || defaults);
  const [confirmDialog, setConfirmDialog] = useState<string | null>(null);
  const [deactivateDialog, setDeactivateDialog] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const lineaConfirm = confirmDialog ? lineas.find(l => l.id === confirmDialog) : null;

  const handleActivarForzoso = async (lineaId: string) => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 1200));
    setLineas(prev => prev.map(l => l.id === lineaId ? { ...l, modoForzoso: true } : l));
    setConfirmDialog(null);
    setProcessing(false);
    const linea = lineas.find(l => l.id === lineaId);
    toast({
      title: 'Modo Forzoso Activado',
      description: `Se cobran $${linea?.costoForzoso.toFixed(2)} por los ${linea?.reservaMB} MB de reserva de ${linea?.numero}.`,
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
      description: 'La reserva vuelve a ser gratuita y exclusiva para la app.',
      action: <CircleCheck className="h-4 w-4 text-emerald-500" />,
    });
  };

  const totalReservaMB = lineas.reduce((sum, l) => sum + l.reservaMB, 0);
  const lineasForzosas = lineas.filter(l => l.modoForzoso);
  const costoForzadoTotal = lineasForzosas.reduce((s, l) => s + l.costoForzoso, 0);

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
                <h2 className="text-lg font-bold tracking-tight text-foreground uppercase">Reserva de Datos</h2>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
                  {tipo === 'personal' ? 'Datos de emergencia · Mi Línea' : 'Reserva corporativa · Flota'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                <Wifi className="h-3 w-3 mr-1.5" />
                {totalReservaMB} MB reservados
              </Badge>
              {lineasForzosas.length > 0 && (
                <Badge variant="outline" className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 bg-amber-500/10 text-amber-500 border-amber-500/20">
                  <Zap className="h-3 w-3 mr-1.5" />
                  {lineasForzosas.length} forzosa{lineasForzosas.length > 1 ? 's' : ''}
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
                  Tu plan incluye <strong className="text-emerald-500">100 MB gratuitos</strong> exclusivos para abrir System Kyron y hacer recargas.
                  Si activas el <strong className="text-amber-500">Modo Forzoso</strong>, esos 100 MB se liberan para uso general
                  (navegar, redes sociales, streaming, etc.) pero <strong className="text-foreground">se te cobra el paquete completo</strong> en tu próxima factura.
                </p>
              </div>
            </div>
          </div>
        </div>

        <CardContent className="px-6 md:px-8 pb-6 md:pb-8 space-y-3">
          <AnimatePresence>
            {lineas.map((linea, idx) => (
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
                          <Badge className="text-[7px] font-semibold uppercase px-1.5 py-0 bg-amber-500/15 text-amber-500 border-amber-500/25 tracking-wider">
                            Forzoso
                          </Badge>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{linea.plan}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-3">
                      <div className="text-center px-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Reserva</p>
                        <p className="text-sm font-bold text-foreground mt-0.5">{linea.reservaMB} MB</p>
                      </div>

                      <div className="h-8 w-px bg-border/50" />

                      <div className="text-center px-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Uso</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {linea.modoForzoso ? (
                            <>
                              <Globe className="h-3 w-3 text-amber-500" />
                              <span className="text-[10px] font-bold text-amber-500">General</span>
                            </>
                          ) : (
                            <>
                              <AppWindow className="h-3 w-3 text-emerald-500" />
                              <span className="text-[10px] font-bold text-emerald-500">Solo App</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="h-8 w-px bg-border/50" />

                      <div className="text-center px-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Costo</p>
                        <p className={cn(
                          "text-sm font-bold mt-0.5",
                          linea.modoForzoso ? "text-amber-500" : "text-emerald-500"
                        )}>
                          {linea.modoForzoso ? `$${linea.costoForzoso.toFixed(2)}` : 'Gratis'}
                        </p>
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
                          <Lock className="h-3 w-3 mr-1.5" />
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
            ))}
          </AnimatePresence>

          <div className="mt-4 p-3 rounded-xl bg-muted/20 border border-border/30">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Reservado</p>
                <p className="text-sm font-bold text-emerald-500 mt-1">{totalReservaMB} MB</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Líneas Forzosas</p>
                <p className="text-sm font-bold text-foreground mt-1">{lineasForzosas.length} / {lineas.length}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Cargo Total</p>
                <p className="text-sm font-bold text-amber-500 mt-1">
                  {costoForzadoTotal > 0 ? `$${costoForzadoTotal.toFixed(2)}` : '$0.00'}
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
            <DialogTitle className="text-center text-lg font-bold tracking-tight">Activar Modo Forzoso</DialogTitle>
            <DialogDescription className="text-center text-[13px] text-muted-foreground mt-2">
              Al activar el modo forzoso, los <strong className="text-foreground">{lineaConfirm?.reservaMB} MB</strong> de reserva
              dejan de ser gratuitos y se te cobra el paquete completo.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/15 my-2 space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/40">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-foreground" />
                <span className="text-xs font-bold text-foreground">{lineaConfirm?.reservaMB} MB</span>
              </div>
              <div className="flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-sm font-bold text-amber-500">${lineaConfirm?.costoForzoso.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-[11px] text-muted-foreground space-y-1">
                <p><strong className="text-foreground">Los {lineaConfirm?.reservaMB} MB se liberan</strong> para uso general (navegación, redes sociales, streaming, etc.)</p>
                <p>Puedes <strong className="text-foreground">desactivarlo</strong> en cualquier momento para volver al modo gratuito exclusivo de la app.</p>
                <p>El cargo de <strong className="text-amber-500">${lineaConfirm?.costoForzoso.toFixed(2)}</strong> se refleja en tu próxima factura.</p>
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
              Pagar ${lineaConfirm?.costoForzoso.toFixed(2)} y Activar
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
            <DialogTitle className="text-center text-lg font-bold tracking-tight">Desactivar Modo Forzoso</DialogTitle>
            <DialogDescription className="text-center text-[13px] text-muted-foreground mt-2">
              La reserva volverá a ser gratuita y exclusiva para abrir System Kyron y recargar.
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
