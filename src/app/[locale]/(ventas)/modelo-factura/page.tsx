"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/back-button";
import { Printer, FileText, Download, Eye, Shield, CircleCheck, Info, BadgeCheck, Sparkles, Lock, FileCheck } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const FACTURA_MODELO = {
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

function calcItem(item: typeof FACTURA_MODELO.items[0]) {
  return item.cantidad * item.precio_unitario * (1 - item.descuento_pct / 100);
}

export default function ModeloFacturaPage() {
  const [showPreview, setShowPreview] = useState(true);
  const inv = FACTURA_MODELO;

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
    <div className="space-y-8 pb-20 relative">
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[120px]" />
      </div>

      <div>
        <BackButton href="/facturacion" label="Centro de Facturación" />
        <motion.header
          className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-semibold uppercase tracking-wide text-primary mb-4">
              <Shield className="h-3 w-3" /> SENIAT HOMOLOGADO
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase leading-[1.05]">
              Modelo de{' '}
              <span className="bg-gradient-to-r from-primary via-blue-400 to-cyan-400 bg-clip-text text-transparent italic">Factura</span>
            </h1>
            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider opacity-40 mt-2">Providencia Administrativa SNAT/2011/00071 • Art. 13</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-10 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all" onClick={() => setShowPreview(!showPreview)}>
              <Eye className="mr-2 h-3.5 w-3.5" /> {showPreview ? 'Ocultar' : 'Vista'} Previa
            </Button>
            <Button size="sm" className="rounded-xl text-[10px] font-bold uppercase tracking-wider h-10 bg-gradient-to-r from-primary to-blue-600 shadow-[0_8px_30px_-5px_rgba(14,165,233,0.3)] hover:shadow-[0_12px_40px_-5px_rgba(14,165,233,0.5)] transition-all" onClick={() => window.print()}>
              <Printer className="mr-2 h-3.5 w-3.5" /> Imprimir
            </Button>
          </div>
        </motion.header>
      </div>

      <motion.div
        className="grid gap-4 md:grid-cols-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { label: "Art. 13 num. 2", desc: "Número de Control preimpreso, consecutivo y único", icon: BadgeCheck },
          { label: "Art. 13 num. 11", desc: "IVA discriminado por alícuota con porcentaje aplicable", icon: FileCheck },
          { label: "Art. 13 num. 14", desc: "Moneda extranjera con equivalente en Bs. y tipo de cambio", icon: Sparkles },
        ].map((req, i) => (
          <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.03] hover:bg-emerald-500/[0.06] transition-all group">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/15 shrink-0 transition-transform group-hover:scale-110">
              <req.icon className="h-4 w-4 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">{req.label}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{req.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {showPreview && (
        <motion.div
          className="print:shadow-none"
          id="factura-preview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="max-w-4xl mx-auto border-2 border-foreground/10 rounded-2xl print:border print:shadow-none bg-white text-black overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
            <CardContent className="p-8 space-y-6">
              <div className="text-center border-b-2 border-black pb-4">
                <p className="text-2xl font-bold tracking-tight">{inv.razon_social_emisor}</p>
                <p className="text-xs mt-1">{inv.domicilio_fiscal_emisor}</p>
                <p className="text-xs">Teléfono: {inv.telefono_emisor}</p>
                <p className="text-sm font-bold mt-1">RIF: {inv.rif_emisor}</p>
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold text-center border-2 border-black px-6 py-2">{inv.tipo_documento}</p>
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

              <div className="border-2 border-emerald-700 rounded-lg p-3 mt-4 bg-emerald-50">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="h-4 w-4 text-emerald-700" />
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Documento Fiscal Inmutable</p>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Este documento fue generado electrónicamente y sellado con hash criptográfico SHA-256.
                  No puede ser modificado ni eliminado conforme a la Providencia SNAT/2011/00071.
                  Para correcciones emita Nota de Crédito (Art. 18) o Nota de Débito (Art. 18).
                </p>
                <p className="text-[10px] font-mono text-emerald-600 mt-1 break-all">
                  Hash: a3f8c1...{'{verificación digital}'}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="glass-card border-none bg-card/50 rounded-2xl overflow-hidden">
          <CardHeader className="p-6 border-b border-border/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                <FileCheck className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <CardTitle className="text-xs font-semibold uppercase tracking-wide">Requisitos Obligatorios — Art. 13 Providencia 0071</CardTitle>
                <p className="text-[10px] text-muted-foreground mt-0.5">Todos los numerales cumplidos</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                { num: 1, req: "Denominación 'FACTURA'" },
                { num: 2, req: "Numeración consecutiva y única" },
                { num: 3, req: "Número de Control preimpreso" },
                { num: 4, req: "Total de Números de Control asignados (desde N°... hasta N°...)" },
                { num: 5, req: "RIF, razón social y domicilio fiscal del emisor" },
                { num: 6, req: "Fecha de emisión en 8 dígitos (DD/MM/AAAA)" },
                { num: 7, req: "RIF y razón social del adquirente" },
                { num: 8, req: "Descripción de la venta/servicio y condición de la operación" },
                { num: 9, req: "Precio unitario del bien o servicio" },
                { num: 10, req: "Valor total de la venta indicando si incluye IVA" },
                { num: 11, req: "Monto del IVA discriminado por alícuota con porcentaje" },
                { num: 12, req: "Valor total de la venta o prestación del servicio" },
                { num: 13, req: "Leyenda 'sin derecho a crédito fiscal' en copias" },
                { num: 14, req: "Moneda extranjera con equivalente en Bs. y tipo de cambio BCV" },
              ].map(r => (
                <div key={r.num} className="flex items-start gap-3 p-3 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] hover:bg-emerald-500/[0.05] transition-all group">
                  <div className="p-1 rounded-full bg-emerald-500/15 shrink-0 mt-0.5 transition-transform group-hover:scale-110">
                    <CircleCheck className="h-3.5 w-3.5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Numeral {r.num}</p>
                    <p className="text-[11px] text-foreground">{r.req}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="glass-card border-none bg-card/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/15">
              <Info className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider">Notas de Débito / Crédito (Art. 18)</p>
          </div>
          <ul className="text-[11px] text-muted-foreground space-y-1.5 list-none pl-0">
            {[
              'Denominación "Nota de Débito" o "Nota de Crédito"',
              "Numeración consecutiva y única",
              "Número de Control preimpreso",
              "RIF, razón social y domicilio fiscal del emisor",
              "RIF y razón social del receptor",
              "Número y fecha de la factura que se modifica",
              "Descripción de la modificación y monto",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CircleCheck className="h-3 w-3 text-blue-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="glass-card border-none bg-card/50 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/15">
              <Info className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-wider">Guías de Despacho (Art. 16)</p>
          </div>
          <ul className="text-[11px] text-muted-foreground space-y-1.5 list-none pl-0">
            {[
              'Denominación "Orden de Entrega" o "Guía de Despacho"',
              'Leyenda "sin derecho a crédito fiscal"',
              "Detalle de bienes: capacidad, peso, volumen",
              "Factura emitida dentro del mismo período de imposición (Art. 17)",
              "Numeración consecutiva con serie si aplica (Art. 26)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <CircleCheck className="h-3 w-3 text-blue-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
