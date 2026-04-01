"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BackButton } from "@/components/back-button";
import { FilePlus, Plus, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function NotaCreditoPage() {
  const { toast } = useToast();
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
  const fmt = (n: number) => n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleSubmit = async () => {
    if (!rifEmisor || !razonSocialEmisor || !domicilioFiscalEmisor) {
      toast({ title: 'Error', description: 'Complete los datos del emisor (Art. 18)', variant: 'destructive' });
      return;
    }
    if (!clienteRif || !clienteNombre) {
      toast({ title: 'Error', description: 'Complete los datos del receptor', variant: 'destructive' });
      return;
    }
    if (!facturaRef) {
      toast({ title: 'Error', description: 'Debe indicar el N° de factura original (Art. 18 num. 7)', variant: 'destructive' });
      return;
    }
    if (!motivo) {
      toast({ title: 'Error', description: 'Debe indicar el motivo del ajuste', variant: 'destructive' });
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

  return (
    <div className="space-y-8 pb-20">
      <div>
        <BackButton href="/facturacion" label="Centro de Facturación" />
        <header className="mt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/20 text-[9px] font-black uppercase tracking-[0.3em] text-rose-600 mb-4">
            <FilePlus className="h-3 w-3" /> NOTA DE CRÉDITO
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase">Nota de <span className="text-rose-500 italic">Crédito</span></h1>
          <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">Art. 18 — Providencia Administrativa SNAT/2011/00071</p>
        </header>
      </div>

      <Card className="glass-card border-none bg-card/50 rounded-2xl">
        <CardHeader className="p-6">
          <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Datos del Emisor</CardTitle>
          <CardDescription className="text-[10px]">Art. 18 num. 4 — RIF, razón social y domicilio fiscal</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-muted-foreground">RIF Emisor *</label>
              <Input placeholder="J-12345678-0" value={rifEmisor} onChange={e => setRifEmisor(e.target.value)} className="font-mono mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground">Razón Social *</label>
              <Input placeholder="Mi Empresa C.A." value={razonSocialEmisor} onChange={e => setRazonSocialEmisor(e.target.value)} className="mt-1" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground">Domicilio Fiscal *</label>
            <Input placeholder="Av. Principal, Edif. Centro, Caracas" value={domicilioFiscalEmisor} onChange={e => setDomicilioFiscalEmisor(e.target.value)} className="mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-none bg-card/50 rounded-2xl">
        <CardHeader className="p-6">
          <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Datos del Receptor</CardTitle>
          <CardDescription className="text-[10px]">Art. 18 num. 5</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground">RIF Receptor *</label>
            <Input placeholder="V-12345678-0" value={clienteRif} onChange={e => setClienteRif(e.target.value)} className="font-mono mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground">Nombre / Razón Social *</label>
            <Input placeholder="Cliente S.R.L." value={clienteNombre} onChange={e => setClienteNombre(e.target.value)} className="mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-none bg-card/50 rounded-2xl">
        <CardHeader className="p-6">
          <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Referencia a Factura Original</CardTitle>
          <CardDescription className="text-[10px]">Art. 18 num. 7 — Número y fecha de la factura que se modifica</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0 grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-muted-foreground">N° Factura Original *</label>
            <Input placeholder="FAC-000001" value={facturaRef} onChange={e => setFacturaRef(e.target.value)} className="font-mono mt-1" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground">Motivo del Ajuste *</label>
            <Input placeholder="Devolución, descuento, anulación parcial" value={motivo} onChange={e => setMotivo(e.target.value)} className="mt-1" />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card border-none bg-card/50 rounded-2xl">
        <CardHeader className="p-6">
          <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Items del Ajuste</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-3">
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-5">
                {i === 0 && <label className="text-[10px] font-bold text-muted-foreground">Descripción</label>}
                <Input
                  placeholder="Devolución de mercancía"
                  value={item.descripcion}
                  onChange={e => { const n = [...items]; n[i].descripcion = e.target.value; setItems(n); }}
                />
              </div>
              <div className="col-span-2">
                {i === 0 && <label className="text-[10px] font-bold text-muted-foreground">Cantidad</label>}
                <Input
                  type="number" placeholder="1"
                  value={item.cantidad}
                  onChange={e => { const n = [...items]; n[i].cantidad = parseFloat(e.target.value) || 0; setItems(n); }}
                />
              </div>
              <div className="col-span-2">
                {i === 0 && <label className="text-[10px] font-bold text-muted-foreground">Precio Unit.</label>}
                <Input
                  type="number" step="0.01" placeholder="0.00"
                  value={item.precio_unitario}
                  onChange={e => { const n = [...items]; n[i].precio_unitario = parseFloat(e.target.value) || 0; setItems(n); }}
                />
              </div>
              <div className="col-span-2">
                {i === 0 && <label className="text-[10px] font-bold text-muted-foreground">Gravamen</label>}
                <select
                  value={item.tipo_gravamen}
                  onChange={e => { const n = [...items]; n[i].tipo_gravamen = e.target.value as any; setItems(n); }}
                  className="w-full h-10 rounded-md border bg-background px-3 text-sm"
                >
                  <option value="gravado">Gravado</option>
                  <option value="exento">Exento</option>
                </select>
              </div>
              <div className="col-span-1">
                <Button type="button" variant="destructive" size="icon" onClick={() => removeItem(i)} disabled={items.length === 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addItem}>
            <Plus className="mr-2 h-4 w-4" /> Añadir Item
          </Button>
        </CardContent>
      </Card>

      <Card className="glass-card border-none bg-card/50 rounded-2xl">
        <CardContent className="p-6 space-y-2 text-sm">
          {baseImponible > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Base Imponible:</span><span className="font-mono">Bs. {fmt(baseImponible)}</span></div>}
          {baseExenta > 0 && <div className="flex justify-between"><span className="text-muted-foreground">Base Exenta:</span><span className="font-mono">Bs. {fmt(baseExenta)}</span></div>}
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal:</span><span className="font-mono">Bs. {fmt(subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">IVA (16%):</span><span className="font-mono">Bs. {fmt(montoIva)}</span></div>
          <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total Nota de Crédito:</span><span className="font-mono text-rose-500">Bs. {fmt(total)}</span></div>
        </CardContent>
      </Card>

      <div className="flex gap-3 justify-end">
        <Button variant="outline" className="rounded-xl h-11 px-6 font-bold uppercase text-[10px] tracking-[0.15em]">
          Guardar Borrador
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} className="rounded-xl h-11 px-8 font-bold uppercase text-[10px] tracking-[0.15em] bg-rose-500 hover:bg-rose-600">
          {isSubmitting ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <FilePlus className="mr-2 h-4 w-4" />}
          Emitir Nota de Crédito
        </Button>
      </div>
    </div>
  );
}
