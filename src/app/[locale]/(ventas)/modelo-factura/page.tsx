"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";
import { Printer, FileText, Download, Eye, Shield, CheckCircle, Info } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sampleInvoice = {
  tipo_documento: "FACTURA",
  numero_factura: "FAC-000001",
  numero_control: "00-000001",
  serie: null,
  condicion_pago: "contado",
  fecha_emision: "01/04/2026",
  fecha_vencimiento: null,
  moneda: "VES",

  rif_emisor: "J-12345678-0",
  razon_social_emisor: "CORPORACIÓN EJEMPLO C.A.",
  domicilio_fiscal_emisor: "Av. Libertador, Edif. Torre Centro, Piso 5, Of. 5-A, Caracas 1010, Dtto. Capital",
  telefono_emisor: "+58 212-555-1234",

  cliente_rif: "V-98765432-1",
  cliente_nombre: "INVERSIONES BOLÍVAR S.R.L.",
  cliente_direccion: "Calle Principal, Nro. 45, Valencia, Edo. Carabobo",

  items: [
    { codigo: "SRV-001", descripcion: "Servicio de consultoría empresarial", unidad: "HRS", cantidad: 40, precio_unitario: 150.00, descuento_pct: 0, tipo_gravamen: "gravado" },
    { codigo: "LIC-002", descripcion: "Licencia de software System Kyron — Plan Empresarial", unidad: "UND", cantidad: 1, precio_unitario: 2500.00, descuento_pct: 10, tipo_gravamen: "gravado" },
    { codigo: "CAP-003", descripcion: "Capacitación presencial (exento Art. 19 LIVA)", unidad: "HRS", cantidad: 8, precio_unitario: 100.00, descuento_pct: 0, tipo_gravamen: "exento" },
  ],

  porcentaje_iva: 16,
  alicuota_tipo: "general",
  porcentaje_igtf: 0,
  tasa_bcv: null,
  porcentaje_ret_iva: 75,
  porcentaje_ret_islr: 0,

  rango_control: "Desde el N° 00-000001 hasta el N° 00-001000",
};

function calcItem(item: typeof sampleInvoice.items[0]) {
  return item.cantidad * item.precio_unitario * (1 - item.descuento_pct / 100);
}

export default function ModeloFacturaPage() {
  const [showPreview, setShowPreview] = useState(true);
  const inv = sampleInvoice;

  let baseImponible = 0;
  let baseExenta = 0;
  inv.items.forEach(item => {
    const sub = calcItem(item);
    if (item.tipo_gravamen === 'exento') baseExenta += sub;
    else baseImponible += sub;
  });

  const subtotal = baseImponible + baseExenta;
  const montoIva = baseImponible * (inv.porcentaje_iva / 100);
  const total = subtotal + montoIva;
  const retIva = montoIva * (inv.porcentaje_ret_iva / 100);
  const totalAPagar = total - retIva;

  const fmt = (n: number) => n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-8 pb-20">
      <div>
        <BackButton href="/facturacion" label="Centro de Facturación" />
        <header className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[9px] font-black uppercase tracking-[0.3em] text-primary mb-4">
              <Shield className="h-3 w-3" /> SENIAT HOMOLOGADO
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground uppercase">Modelo de <span className="text-primary italic">Factura</span></h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-[0.4em] opacity-40 mt-2">Providencia Administrativa SNAT/2011/00071 • Art. 13</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-9" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="mr-2 h-3.5 w-3.5" /> {showPreview ? 'Ocultar' : 'Vista'} Previa
            </Button>
            <Button size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-9" onClick={() => window.print()}>
              <Printer className="mr-2 h-3.5 w-3.5" /> Imprimir
            </Button>
          </div>
        </header>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Art. 13 num. 2", desc: "Número de Control preimpreso, consecutivo y único", icon: CheckCircle, color: "text-emerald-500" },
          { label: "Art. 13 num. 11", desc: "IVA discriminado por alícuota con porcentaje aplicable", icon: CheckCircle, color: "text-emerald-500" },
          { label: "Art. 13 num. 14", desc: "Moneda extranjera con equivalente en Bs. y tipo de cambio", icon: CheckCircle, color: "text-emerald-500" },
        ].map((req, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-xl border bg-card/50">
            <req.icon className={cn("h-4 w-4 shrink-0 mt-0.5", req.color)} />
            <div>
              <p className="text-[10px] font-bold text-primary">{req.label}</p>
              <p className="text-[10px] text-muted-foreground">{req.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {showPreview && (
        <div className="print:shadow-none" id="factura-preview">
          <Card className="max-w-4xl mx-auto border-2 border-foreground/10 rounded-none print:border print:shadow-none bg-white text-black">
            <CardContent className="p-8 space-y-6">

              <div className="text-center border-b-2 border-black pb-4">
                <p className="text-2xl font-black tracking-tight">{inv.razon_social_emisor}</p>
                <p className="text-xs mt-1">{inv.domicilio_fiscal_emisor}</p>
                <p className="text-xs">Teléfono: {inv.telefono_emisor}</p>
                <p className="text-sm font-bold mt-1">RIF: {inv.rif_emisor}</p>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-black text-center border-2 border-black px-6 py-2">{inv.tipo_documento}</p>
                </div>
                <div className="text-right text-sm space-y-1">
                  <p><span className="font-bold">N° Factura:</span> <span className="font-mono">{inv.numero_factura}</span></p>
                  <p><span className="font-bold">N° de Control:</span> <span className="font-mono">{inv.numero_control}</span></p>
                  <p><span className="font-bold">Fecha:</span> {inv.fecha_emision}</p>
                  <p><span className="font-bold">Condición:</span> {inv.condicion_pago === 'contado' ? 'CONTADO' : 'CRÉDITO'}</p>
                </div>
              </div>

              <div className="border border-black p-3 text-sm">
                <div className="grid grid-cols-2 gap-2">
                  <p><span className="font-bold">Nombre/Razón Social:</span> {inv.cliente_nombre}</p>
                  <p><span className="font-bold">RIF:</span> {inv.cliente_rif}</p>
                  <p className="col-span-2"><span className="font-bold">Dirección:</span> {inv.cliente_direccion}</p>
                </div>
              </div>

              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="border border-black p-2 text-left w-16">Código</th>
                    <th className="border border-black p-2 text-left">Descripción</th>
                    <th className="border border-black p-2 text-center w-12">Und.</th>
                    <th className="border border-black p-2 text-right w-14">Cant.</th>
                    <th className="border border-black p-2 text-right w-24">P. Unit.</th>
                    <th className="border border-black p-2 text-right w-14">Desc.</th>
                    <th className="border border-black p-2 text-right w-28">Subtotal</th>
                    <th className="border border-black p-2 text-center w-16">Grav.</th>
                  </tr>
                </thead>
                <tbody>
                  {inv.items.map((item, i) => {
                    const sub = calcItem(item);
                    return (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                        <td className="border border-black p-2 font-mono text-xs">{item.codigo}</td>
                        <td className="border border-black p-2">{item.descripcion}</td>
                        <td className="border border-black p-2 text-center">{item.unidad}</td>
                        <td className="border border-black p-2 text-right font-mono">{item.cantidad}</td>
                        <td className="border border-black p-2 text-right font-mono">{fmt(item.precio_unitario)}</td>
                        <td className="border border-black p-2 text-right font-mono">{item.descuento_pct > 0 ? `${item.descuento_pct}%` : '-'}</td>
                        <td className="border border-black p-2 text-right font-mono font-bold">{fmt(sub)}</td>
                        <td className="border border-black p-2 text-center text-[10px]">{item.tipo_gravamen === 'gravado' ? 'G' : item.tipo_gravamen === 'exento' ? 'E' : 'NS'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-80 text-sm space-y-1">
                  {baseImponible > 0 && (
                    <div className="flex justify-between"><span>Base Imponible (G):</span><span className="font-mono">{fmt(baseImponible)}</span></div>
                  )}
                  {baseExenta > 0 && (
                    <div className="flex justify-between"><span>Base Exenta (E):</span><span className="font-mono">{fmt(baseExenta)}</span></div>
                  )}
                  <div className="flex justify-between border-t border-black pt-1"><span>Subtotal:</span><span className="font-mono">{fmt(subtotal)}</span></div>
                  <div className="flex justify-between"><span>IVA ({inv.porcentaje_iva}%) — Alícuota {inv.alicuota_tipo}:</span><span className="font-mono">{fmt(montoIva)}</span></div>
                  <div className="flex justify-between font-bold text-base border-t-2 border-black pt-1"><span>TOTAL Bs.:</span><span className="font-mono">{fmt(total)}</span></div>
                  {retIva > 0 && (
                    <>
                      <div className="flex justify-between text-xs"><span>(-) Retención IVA ({inv.porcentaje_ret_iva}%):</span><span className="font-mono">-{fmt(retIva)}</span></div>
                      <div className="flex justify-between font-bold text-base border-t border-black pt-1"><span>TOTAL A PAGAR:</span><span className="font-mono">{fmt(totalAPagar)}</span></div>
                    </>
                  )}
                </div>
              </div>

              <div className="text-[10px] text-gray-500 space-y-1 border-t border-black pt-3 mt-6">
                <p className="font-bold">{inv.rango_control}</p>
                <p>Documento emitido por sistema computarizado conforme al numeral 2 del Art. 6 de la Providencia Administrativa SNAT/2011/00071.</p>
                <p className="font-bold italic">Las copias de este documento no dan derecho a crédito fiscal — Art. 13 num. 13.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="glass-card border-none bg-card/50 rounded-2xl">
        <CardHeader className="p-6">
          <CardTitle className="text-xs font-black uppercase tracking-[0.2em]">Requisitos Obligatorios — Art. 13 Providencia 0071</CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { num: 1, req: "Denominación 'FACTURA'", status: true },
              { num: 2, req: "Numeración consecutiva y única", status: true },
              { num: 3, req: "Número de Control preimpreso", status: true },
              { num: 4, req: "Total de Números de Control asignados (desde N°... hasta N°...)", status: true },
              { num: 5, req: "RIF, razón social y domicilio fiscal del emisor", status: true },
              { num: 6, req: "Fecha de emisión en 8 dígitos (DD/MM/AAAA)", status: true },
              { num: 7, req: "RIF y razón social del adquirente", status: true },
              { num: 8, req: "Descripción de la venta/servicio y condición de la operación", status: true },
              { num: 9, req: "Precio unitario del bien o servicio", status: true },
              { num: 10, req: "Valor total de la venta indicando si incluye IVA", status: true },
              { num: 11, req: "Monto del IVA discriminado por alícuota con porcentaje", status: true },
              { num: 12, req: "Valor total de la venta o prestación del servicio", status: true },
              { num: 13, req: "Leyenda 'sin derecho a crédito fiscal' en copias", status: true },
              { num: 14, req: "Moneda extranjera con equivalente en Bs. y tipo de cambio BCV", status: true },
            ].map(r => (
              <div key={r.num} className="flex items-start gap-3 p-3 rounded-lg border bg-emerald-500/[0.03] border-emerald-500/15">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-emerald-600">Numeral {r.num}</p>
                  <p className="text-[11px] text-foreground">{r.req}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-card border-none bg-card/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-500" />
            <p className="text-xs font-bold">Notas de Débito / Crédito (Art. 18)</p>
          </div>
          <ul className="text-[11px] text-muted-foreground space-y-1 list-disc pl-4">
            <li>Denominación "Nota de Débito" o "Nota de Crédito"</li>
            <li>Numeración consecutiva y única</li>
            <li>Número de Control preimpreso</li>
            <li>RIF, razón social y domicilio fiscal del emisor</li>
            <li>RIF y razón social del receptor</li>
            <li>Número y fecha de la factura que se modifica</li>
            <li>Descripción de la modificación y monto</li>
          </ul>
        </Card>
        <Card className="glass-card border-none bg-card/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-500" />
            <p className="text-xs font-bold">Guías de Despacho (Art. 16)</p>
          </div>
          <ul className="text-[11px] text-muted-foreground space-y-1 list-disc pl-4">
            <li>Denominación "Orden de Entrega" o "Guía de Despacho"</li>
            <li>Leyenda "sin derecho a crédito fiscal"</li>
            <li>Detalle de bienes: capacidad, peso, volumen</li>
            <li>Factura emitida dentro del mismo período de imposición (Art. 17)</li>
            <li>Numeración consecutiva con serie si aplica (Art. 26)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
