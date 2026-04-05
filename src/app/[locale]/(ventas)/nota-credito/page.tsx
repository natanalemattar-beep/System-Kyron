"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { FilePlus, Shield, Plus, Trash2, Loader2, ArrowRight, ArrowLeft, Building2, UserCheck, Link2, ListChecks, Calculator, Zap, CheckCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/lib/currency-context";
import { CurrencySelectorCompact } from "@/components/currency-selector";

const steps = [
  { id: 1, label: "Emisor", icon: Building2, desc: "Datos fiscales" },
  { id: 2, label: "Receptor", icon: UserCheck, desc: "Cliente" },
  { id: 3, label: "Referencia", icon: Link2, desc: "Factura original" },
  { id: 4, label: "Items", icon: ListChecks, desc: "Ajustes" },
  { id: 5, label: "Resumen", icon: Calculator, desc: "Totales" },
];

export default function NotaCreditoPage() {
  const { toast } = useToast();
  const { format: fmtCur, config: curConfig } = useCurrency();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rifEmisor, setRifEmisor] = useState('');
  const [razonSocialEmisor, setRazonSocialEmisor] = useState('');
  const [domicilioFiscalEmisor, setDomicilioFiscalEmisor] = useState('');
  const [clienteRif, setClienteRif] = useState('');
  const [clienteNombre, setClienteNombre] = useState('');
  const [facturaRef, setFacturaRef] = useState('');
  const [motivo, setMotivo] = useState('');
  const [items, setItems] = useState([
    { descripcion: '', cantidad: 1, precio_unitario: 0, tipo_gravamen: 'gravado' as const },
  ]);

  const addItem = () => setItems([...items, { descripcion: '', cantidad: 1, precio_unitario: 0, tipo_gravamen: 'gravado' }]);
  const removeItem = (i: number) => { if (items.length > 1) setItems(items.filter((_, idx) => idx !== i)); };

  let baseImponible = 0;
  let baseExenta = 0;
  items.forEach(it => {
    const sub = it.cantidad * it.precio_unitario;
    if (it.tipo_gravamen === 'exento') baseExenta += sub;
    else baseImponible += sub;
  });
  const subtotal = baseImponible + baseExenta;
  const montoIva = baseImponible * 0.16;
  const total = subtotal + montoIva;
  const handleSubmit = async () => {
    if (!rifEmisor || !razonSocialEmisor || !domicilioFiscalEmisor) {
      toast({ title: 'Error', description: 'Complete los datos del emisor (Art. 18)', variant: 'destructive' });
      setCurrentStep(1);
      return;
    }
    if (!clienteRif || !clienteNombre) {
      toast({ title: 'Error', description: 'Complete los datos del receptor', variant: 'destructive' });
      setCurrentStep(2);
      return;
    }
    if (!facturaRef) {
      toast({ title: 'Error', description: 'Debe indicar el N° de factura original (Art. 18 num. 7)', variant: 'destructive' });
      setCurrentStep(3);
      return;
    }
    if (!motivo) {
      toast({ title: 'Error', description: 'Debe indicar el motivo del ajuste', variant: 'destructive' });
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/facturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo_documento: 'NOTA_CREDITO',
          tipo: 'nota_credito',
          condicion_pago: 'contado',
          moneda: 'VES',
          rif_emisor: rifEmisor,
          razon_social_emisor: razonSocialEmisor,
          domicilio_fiscal_emisor: domicilioFiscalEmisor,
          fecha_emision: new Date().toISOString().split('T')[0],
          subtotal: subtotal.toFixed(2),
          porcentaje_iva: '16',
          factura_referencia_num: facturaRef,
          motivo_ajuste: motivo,
          estado: 'emitida',
          items: items.map(it => ({
            descripcion: it.descripcion,
            cantidad: it.cantidad.toString(),
            precio_unitario: it.precio_unitario.toString(),
            tipo_gravamen: it.tipo_gravamen,
          })),
        }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error);
      toast({
        title: 'Nota de Crédito Creada',
        description: `N° ${result.factura.numero_factura} | Control: ${result.factura.numero_control}`,
      });
      setItems([{ descripcion: '', cantidad: 1, precio_unitario: 0, tipo_gravamen: 'gravado' }]);
      setMotivo('');
      setFacturaRef('');
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canGoNext = () => {
    if (currentStep === 1) return rifEmisor && razonSocialEmisor && domicilioFiscalEmisor;
    if (currentStep === 2) return clienteRif && clienteNombre;
    if (currentStep === 3) return facturaRef && motivo;
    if (currentStep === 4) return items.some(it => it.descripcion && it.precio_unitario > 0);
    return true;
  };

  return (
    <div className="space-y-6 pb-20 relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-rose-500/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-pink-500/[0.03] blur-[120px]" />
      </div>

      <div>
        <BackButton href="/facturacion" label="Centro de Facturación" />
        <motion.header
          className="mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-[11px] font-semibold uppercase tracking-wide text-rose-600 mb-4">
            <FilePlus className="h-3 w-3" /> NOTA DE CRÉDITO
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
            Nota de{' '}
            <span className="bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500 bg-clip-text text-transparent italic">Crédito</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40">Art. 18 — Providencia Administrativa SNAT/2011/00071</p>
            <CurrencySelectorCompact />
          </div>
        </motion.header>
      </div>

      <motion.div
        className="flex items-center gap-2 py-4 overflow-x-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(step.id)}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 shrink-0",
                currentStep === step.id
                  ? "bg-rose-500/10 border-rose-500/30 text-rose-600 scale-105 shadow-[0_0_20px_-5px_rgba(244,63,94,0.3)]"
                  : currentStep > step.id
                  ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500"
                  : "bg-card/30 border-border/30 text-muted-foreground/40 hover:border-border/50"
              )}
            >
              <div className={cn(
                "p-1.5 rounded-lg",
                currentStep === step.id ? "bg-rose-500/20" :
                currentStep > step.id ? "bg-emerald-500/10" : "bg-muted/20"
              )}>
                {currentStep > step.id ? (
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <step.icon className="h-3.5 w-3.5" />
                )}
              </div>
              <div className="text-left">
                <p className="text-[10px] font-semibold uppercase tracking-wider leading-none">{step.label}</p>
                <p className="text-[10px] font-medium opacity-60 mt-0.5">{step.desc}</p>
              </div>
            </button>
            {i < steps.length - 1 && (
              <div className={cn("w-6 h-px shrink-0", currentStep > step.id ? "bg-emerald-500/30" : "bg-border/20")} />
            )}
          </div>
        ))}
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                  <CardHeader className="p-6 border-b border-border/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/15">
                        <Building2 className="h-4 w-4 text-rose-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xs font-semibold uppercase tracking-wide">Datos del Emisor</CardTitle>
                        <CardDescription className="text-[10px]">Art. 18 num. 4 — RIF, razón social y domicilio fiscal</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">RIF Emisor *</label>
                        <Input placeholder="J-12345678-0" value={rifEmisor} onChange={e => setRifEmisor(e.target.value)} className="font-mono h-11 rounded-xl border-border/30 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Razón Social *</label>
                        <Input placeholder="Mi Empresa C.A." value={razonSocialEmisor} onChange={e => setRazonSocialEmisor(e.target.value)} className="h-11 rounded-xl border-border/30 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Domicilio Fiscal *</label>
                      <Input placeholder="Av. Principal, Edif. Centro, Caracas" value={domicilioFiscalEmisor} onChange={e => setDomicilioFiscalEmisor(e.target.value)} className="h-11 rounded-xl border-border/30 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                  <CardHeader className="p-6 border-b border-border/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/15">
                        <UserCheck className="h-4 w-4 text-rose-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xs font-semibold uppercase tracking-wide">Datos del Receptor</CardTitle>
                        <CardDescription className="text-[10px]">Art. 18 num. 5 — Datos del cliente receptor</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">RIF Receptor *</label>
                        <Input placeholder="V-12345678-0" value={clienteRif} onChange={e => setClienteRif(e.target.value)} className="font-mono h-11 rounded-xl border-border/30 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Nombre / Razón Social *</label>
                        <Input placeholder="Cliente S.R.L." value={clienteNombre} onChange={e => setClienteNombre(e.target.value)} className="h-11 rounded-xl border-border/30 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                  <CardHeader className="p-6 border-b border-border/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/15">
                        <Link2 className="h-4 w-4 text-rose-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xs font-semibold uppercase tracking-wide">Referencia a Factura Original</CardTitle>
                        <CardDescription className="text-[10px]">Art. 18 num. 7 — Número y fecha de la factura que se modifica</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">N° Factura Original *</label>
                        <Input placeholder="FAC-000001" value={facturaRef} onChange={e => setFacturaRef(e.target.value)} className="font-mono h-11 rounded-xl border-border/30 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Motivo del Ajuste *</label>
                        <Input placeholder="Devolución, descuento, anulación parcial" value={motivo} onChange={e => setMotivo(e.target.value)} className="h-11 rounded-xl border-border/30 focus:border-rose-500/50 focus:ring-rose-500/20 transition-all" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                  <CardHeader className="p-6 border-b border-border/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/15">
                        <ListChecks className="h-4 w-4 text-rose-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xs font-semibold uppercase tracking-wide">Items del Ajuste</CardTitle>
                        <CardDescription className="text-[10px]">Detalle de las devoluciones o descuentos</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {items.map((item, i) => (
                      <motion.div
                        key={i}
                        className="p-4 rounded-xl border border-border/20 bg-card/30 space-y-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">Item {i + 1}</span>
                          {items.length > 1 && (
                            <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(i)} className="h-7 px-2 text-rose-500 hover:bg-rose-500/10 rounded-lg">
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-5 space-y-1">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase">Descripción</label>
                            <Input
                              placeholder="Devolución de mercancía"
                              value={item.descripcion}
                              onChange={e => { const n = [...items]; n[i].descripcion = e.target.value; setItems(n); }}
                              className="h-10 rounded-xl text-sm"
                            />
                          </div>
                          <div className="col-span-2 space-y-1">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase">Cantidad</label>
                            <Input
                              type="number" placeholder="1"
                              value={item.cantidad}
                              onChange={e => { const n = [...items]; n[i].cantidad = parseFloat(e.target.value) || 0; setItems(n); }}
                              className="h-10 rounded-xl text-sm"
                            />
                          </div>
                          <div className="col-span-3 space-y-1">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase">Precio Unit.</label>
                            <Input
                              type="number" step="0.01" placeholder="0.00"
                              value={item.precio_unitario}
                              onChange={e => { const n = [...items]; n[i].precio_unitario = parseFloat(e.target.value) || 0; setItems(n); }}
                              className="h-10 rounded-xl text-sm"
                            />
                          </div>
                          <div className="col-span-2 space-y-1">
                            <label className="text-[11px] font-bold text-muted-foreground uppercase">Gravamen</label>
                            <select
                              value={item.tipo_gravamen}
                              onChange={e => { const n = [...items]; n[i].tipo_gravamen = e.target.value as any; setItems(n); }}
                              className="w-full h-10 rounded-xl border bg-background px-3 text-sm"
                            >
                              <option value="gravado">Gravado</option>
                              <option value="exento">Exento</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="rounded-xl hover:bg-rose-500/5 hover:text-rose-500 hover:border-rose-500/20 transition-all">
                      <Plus className="mr-2 h-4 w-4" /> Añadir Item
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {currentStep === 5 && (
              <motion.div key="step5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
                  <CardHeader className="p-6 border-b border-border/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/15">
                        <Calculator className="h-4 w-4 text-rose-500" />
                      </div>
                      <div>
                        <CardTitle className="text-xs font-semibold uppercase tracking-wide">Resumen de Emisión</CardTitle>
                        <CardDescription className="text-[10px]">Verifique los totales antes de emitir</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-muted/20 border border-border/20">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-1">Emisor</p>
                        <p className="text-sm font-bold text-foreground">{razonSocialEmisor || '—'}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{rifEmisor || '—'}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/20 border border-border/20">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-1">Receptor</p>
                        <p className="text-sm font-bold text-foreground">{clienteNombre || '—'}</p>
                        <p className="text-[10px] text-muted-foreground font-mono">{clienteRif || '—'}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/20 border border-border/20">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-1">Referencia</p>
                      <p className="text-sm font-bold text-foreground">Factura: <span className="font-mono text-rose-500">{facturaRef || '—'}</span></p>
                      <p className="text-[10px] text-muted-foreground mt-1">{motivo || '—'}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted/20 border border-border/20 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50 mb-2">Detalle Items ({items.length})</p>
                      {items.filter(it => it.descripcion).map((it, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{it.descripcion}</span>
                          <span className="font-mono font-bold">{fmtCur(it.cantidad * it.precio_unitario)}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="rounded-xl h-11 px-6 font-bold uppercase text-[10px] tracking-[0.15em]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
            </Button>
            {currentStep < 5 ? (
              <Button
                onClick={() => setCurrentStep(Math.min(5, currentStep + 1))}
                disabled={!canGoNext()}
                className="rounded-xl h-11 px-6 font-bold uppercase text-[10px] tracking-[0.15em] bg-rose-500 hover:bg-rose-600 shadow-[0_8px_30px_-5px_rgba(244,63,94,0.3)] transition-all hover:shadow-[0_12px_40px_-5px_rgba(244,63,94,0.5)]"
              >
                Siguiente <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="rounded-xl h-11 px-8 font-bold uppercase text-[10px] tracking-[0.15em] bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 shadow-[0_8px_30px_-5px_rgba(244,63,94,0.4)] transition-all hover:shadow-[0_12px_40px_-5px_rgba(244,63,94,0.5)]"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Zap className="mr-2 h-4 w-4" />}
                Emitir Nota de Crédito
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden sticky top-4">
              <CardHeader className="p-5 border-b border-border/20 bg-gradient-to-r from-rose-500/[0.05] to-pink-500/[0.05]">
                <CardTitle className="text-[10px] font-semibold uppercase tracking-wide flex items-center gap-2">
                  <Calculator className="h-3.5 w-3.5 text-rose-500" />
                  Cálculo en Vivo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {baseImponible > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground text-[11px]">Base Imponible:</span>
                    <span className="font-mono font-bold text-[11px]">{fmtCur(baseImponible)}</span>
                  </div>
                )}
                {baseExenta > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground text-[11px]">Base Exenta:</span>
                    <span className="font-mono font-bold text-[11px]">{fmtCur(baseExenta)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground text-[11px]">Subtotal:</span>
                  <span className="font-mono font-bold text-[11px]">{fmtCur(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground text-[11px]">IVA (16%):</span>
                  <span className="font-mono font-bold text-[11px]">{fmtCur(montoIva)}</span>
                </div>
                <div className="h-px bg-border/20 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase">Total ({curConfig.symbol})</span>
                  <span className="text-xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent tabular-nums">
                    {fmtCur(total)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="rounded-2xl border border-rose-500/15 bg-rose-500/[0.03] p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-rose-500" />
                <p className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">Requisitos Art. 18</p>
              </div>
              <div className="space-y-2">
                {[
                  { req: 'Denominación "Nota de Crédito"', done: true },
                  { req: "Numeración consecutiva", done: true },
                  { req: "N° Control preimpreso", done: true },
                  { req: "Datos del emisor", done: !!rifEmisor && !!razonSocialEmisor },
                  { req: "Datos del receptor", done: !!clienteRif && !!clienteNombre },
                  { req: "Referencia a factura", done: !!facturaRef },
                  { req: "Monto del ajuste", done: total > 0 },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={cn("h-4 w-4 rounded-full flex items-center justify-center transition-all",
                      r.done ? "bg-emerald-500/20" : "bg-muted/30"
                    )}>
                      {r.done ? <CheckCircle className="h-3 w-3 text-emerald-500" /> : <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/20" />}
                    </div>
                    <span className={cn("text-[10px]", r.done ? "text-foreground font-medium" : "text-muted-foreground/40")}>{r.req}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
