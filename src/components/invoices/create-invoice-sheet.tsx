
"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar as CalendarIcon, CirclePlus as PlusCircle, Trash2, FileText, AlertTriangle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { cn, formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const rifRegex = /^[VJEPG]-?\d{8}-?\d$/;

const invoiceSchema = z.object({
  tipo_documento: z.enum(['FACTURA', 'NOTA_DEBITO', 'NOTA_CREDITO']),
  condicion_pago: z.enum(['contado', 'credito']),
  moneda: z.enum(['VES', 'USD', 'EUR']),
  alicuota_tipo: z.enum(['general', 'reducida', 'adicional', 'exento']),

  rif_emisor: z.string().min(1, "RIF del emisor requerido").regex(rifRegex, "Formato RIF inválido (Ej: J-12345678-0)"),
  razon_social_emisor: z.string().min(1, "Razón social del emisor requerida"),
  domicilio_fiscal_emisor: z.string().min(1, "Domicilio fiscal requerido (Art. 13 num. 5)"),
  telefono_emisor: z.string().optional(),

  cliente_nombre: z.string().min(1, "Nombre/Razón social del cliente requerido"),
  cliente_rif: z.string().min(1, "RIF del adquirente requerido (Art. 13 num. 7)").regex(rifRegex, "Formato RIF inválido"),
  cliente_direccion: z.string().optional(),

  date: z.date({ required_error: "Fecha de emisión requerida" }),
  dueDate: z.date().optional().nullable(),

  tasa_bcv: z.coerce.number().min(0).optional(),
  moneda_extranjera: z.string().optional(),

  porcentaje_ret_iva: z.coerce.number().min(0).max(100).optional(),
  porcentaje_ret_islr: z.coerce.number().min(0).max(100).optional(),

  factura_referencia_num: z.string().optional(),
  motivo_ajuste: z.string().optional(),

  notas: z.string().optional(),

  items: z.array(z.object({
    descripcion: z.string().min(1, "Descripción requerida"),
    codigo: z.string().optional(),
    unidad: z.string().default('UND'),
    cantidad: z.coerce.number().min(0.0001, "Cantidad debe ser mayor a 0"),
    precio_unitario: z.coerce.number().min(0, "Precio debe ser positivo"),
    descuento_pct: z.coerce.number().min(0).max(100).default(0),
    tipo_gravamen: z.enum(['gravado', 'exento', 'no_sujeto']).default('gravado'),
  })).min(1, "Se requiere al menos un item."),
}).refine(data => {
  if (['NOTA_DEBITO', 'NOTA_CREDITO'].includes(data.tipo_documento)) {
    return !!data.factura_referencia_num;
  }
  return true;
}, {
  message: "NC/ND requieren número de factura original (Art. 18)",
  path: ["factura_referencia_num"],
}).refine(data => {
  if (['NOTA_DEBITO', 'NOTA_CREDITO'].includes(data.tipo_documento)) {
    return !!data.motivo_ajuste;
  }
  return true;
}, {
  message: "Debe indicar el motivo del ajuste",
  path: ["motivo_ajuste"],
});

type InvoiceFormValues = z.infer<typeof invoiceSchema>;

const ALICUOTAS: Record<string, number> = {
  general: 16,
  reducida: 8,
  adicional: 31,
  exento: 0,
};

export function CreateInvoiceSheet({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      tipo_documento: 'FACTURA',
      condicion_pago: 'contado',
      moneda: 'VES',
      alicuota_tipo: 'general',
      rif_emisor: '',
      razon_social_emisor: '',
      domicilio_fiscal_emisor: '',
      telefono_emisor: '',
      cliente_nombre: '',
      cliente_rif: '',
      cliente_direccion: '',
      tasa_bcv: 0,
      porcentaje_ret_iva: 0,
      porcentaje_ret_islr: 0,
      factura_referencia_num: '',
      motivo_ajuste: '',
      notas: '',
      items: [{ descripcion: '', codigo: '', unidad: 'UND', cantidad: 1, precio_unitario: 0, descuento_pct: 0, tipo_gravamen: 'gravado' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchedItems = form.watch("items");
  const watchedAlicuota = form.watch("alicuota_tipo");
  const watchedMoneda = form.watch("moneda");
  const watchedTipoDoc = form.watch("tipo_documento");
  const watchedTasaBcv = form.watch("tasa_bcv");
  const watchedRetIva = form.watch("porcentaje_ret_iva");
  const watchedRetIslr = form.watch("porcentaje_ret_islr");

  const pIva = ALICUOTAS[watchedAlicuota] ?? 16;
  const pIgtf = watchedMoneda !== 'VES' ? 3 : 0;

  let baseImponible = 0;
  let baseExenta = 0;
  let baseNoSujeta = 0;
  watchedItems.forEach(item => {
    const sub = (item.cantidad || 0) * (item.precio_unitario || 0) * (1 - (item.descuento_pct || 0) / 100);
    if (item.tipo_gravamen === 'exento') baseExenta += sub;
    else if (item.tipo_gravamen === 'no_sujeto') baseNoSujeta += sub;
    else baseImponible += sub;
  });

  const subtotal = baseImponible + baseExenta + baseNoSujeta;
  const montoIva = baseImponible * (pIva / 100);
  const montoIgtf = pIgtf > 0 ? subtotal * (pIgtf / 100) : 0;
  const total = subtotal + montoIva + montoIgtf;
  const retIva = montoIva * ((watchedRetIva || 0) / 100);
  const retIslr = subtotal * ((watchedRetIslr || 0) / 100);
  const totalAPagar = total - retIva - retIslr;

  const monedaSymbol = watchedMoneda === 'VES' ? 'Bs.' : watchedMoneda === 'USD' ? '$' : '€';

  async function onSubmit(data: InvoiceFormValues) {
    setIsSubmitting(true);
    try {
      const payload = {
        tipo_documento: data.tipo_documento,
        condicion_pago: data.condicion_pago,
        moneda: data.moneda,
        alicuota_tipo: data.alicuota_tipo,
        rif_emisor: data.rif_emisor,
        razon_social_emisor: data.razon_social_emisor,
        domicilio_fiscal_emisor: data.domicilio_fiscal_emisor,
        telefono_emisor: data.telefono_emisor || null,
        fecha_emision: format(data.date, 'yyyy-MM-dd'),
        fecha_vencimiento: data.dueDate ? format(data.dueDate, 'yyyy-MM-dd') : null,
        subtotal: subtotal.toFixed(2),
        porcentaje_iva: pIva.toString(),
        tasa_bcv: data.tasa_bcv?.toString() || '0',
        moneda_extranjera: data.moneda !== 'VES' ? data.moneda : null,
        monto_moneda_ext: data.moneda !== 'VES' && data.tasa_bcv && data.tasa_bcv > 0 ? (total * data.tasa_bcv).toFixed(2) : null,
        porcentaje_ret_iva: (data.porcentaje_ret_iva || 0).toString(),
        porcentaje_ret_islr: (data.porcentaje_ret_islr || 0).toString(),
        factura_referencia_num: data.factura_referencia_num || null,
        motivo_ajuste: data.motivo_ajuste || null,
        notas: data.notas || null,
        estado: 'emitida',
        items: data.items.map(item => ({
          descripcion: item.descripcion,
          codigo: item.codigo || null,
          unidad: item.unidad || 'UND',
          cantidad: item.cantidad.toString(),
          precio_unitario: item.precio_unitario.toString(),
          descuento_pct: (item.descuento_pct || 0).toString(),
          tipo_gravamen: item.tipo_gravamen,
        })),
      };

      const res = await fetch('/api/facturas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Error al crear documento');

      const docNames: Record<string, string> = { FACTURA: 'Factura', NOTA_DEBITO: 'Nota de Débito', NOTA_CREDITO: 'Nota de Crédito' };
      toast({
        title: `${docNames[data.tipo_documento] || 'Documento'} Creado`,
        description: `N° ${result.factura.numero_factura} | Control: ${result.factura.numero_control} — Total: ${monedaSymbol} ${parseFloat(result.factura.total).toLocaleString('es-VE', { minimumFractionDigits: 2 })}`,
      });
      form.reset();
      setOpen(false);
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'No se pudo crear el documento fiscal',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const isNcNd = ['NOTA_DEBITO', 'NOTA_CREDITO'].includes(watchedTipoDoc);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-3xl w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Crear Documento Fiscal — Providencia 0071
          </SheetTitle>
          <SheetDescription>
            Todos los campos obligatorios cumplen con la Providencia SNAT/2011/00071
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6 pr-2">

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <FormField control={form.control} name="tipo_documento" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Tipo Documento</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="FACTURA">Factura</SelectItem>
                      <SelectItem value="NOTA_DEBITO">Nota de Débito</SelectItem>
                      <SelectItem value="NOTA_CREDITO">Nota de Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="condicion_pago" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Condición Pago</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="contado">Contado</SelectItem>
                      <SelectItem value="credito">Crédito</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="moneda" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Moneda</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="VES">Bolívares (VES)</SelectItem>
                      <SelectItem value="USD">Dólares (USD)</SelectItem>
                      <SelectItem value="EUR">Euros (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/[0.03] p-4 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Datos del Emisor (Art. 13 num. 5)</p>
              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="rif_emisor" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">RIF Emisor *</FormLabel>
                    <FormControl><Input placeholder="J-12345678-0" {...field} className="font-mono" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="razon_social_emisor" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Razón Social *</FormLabel>
                    <FormControl><Input placeholder="Mi Empresa C.A." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="domicilio_fiscal_emisor" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Domicilio Fiscal *</FormLabel>
                  <FormControl><Input placeholder="Av. Principal, Edif. Centro, Piso 3, Caracas 1010" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="telefono_emisor" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Teléfono</FormLabel>
                  <FormControl><Input placeholder="+58 212-1234567" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 space-y-3">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Datos del Adquirente (Art. 13 num. 7)</p>
              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="cliente_rif" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">RIF Adquirente *</FormLabel>
                    <FormControl><Input placeholder="V-12345678-0" {...field} className="font-mono" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="cliente_nombre" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Nombre / Razón Social *</FormLabel>
                    <FormControl><Input placeholder="Cliente S.R.L." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="cliente_direccion" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Dirección</FormLabel>
                  <FormControl><Input placeholder="Dirección del adquirente" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs">Fecha de Emisión * (8 dígitos)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "dd/MM/yyyy") : <span>DD/MM/AAAA</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="dueDate" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-xs">Fecha de Vencimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "dd/MM/yyyy") : <span>DD/MM/AAAA</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value ?? undefined} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="alicuota_tipo" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Alícuota IVA (Art. 13 num. 11)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                      <SelectItem value="general">General — 16%</SelectItem>
                      <SelectItem value="reducida">Reducida — 8%</SelectItem>
                      <SelectItem value="adicional">Adicional — 31%</SelectItem>
                      <SelectItem value="exento">Exento — 0%</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              {watchedMoneda !== 'VES' && (
                <FormField control={form.control} name="tasa_bcv" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs">Tasa BCV (Art. 13 num. 14)</FormLabel>
                    <FormControl><Input type="number" step="0.0001" placeholder="36.5000" {...field} className="font-mono" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              )}
            </div>

            {isNcNd && (
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-4 space-y-3">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">Referencia Factura Original (Art. 18)</p>
                <div className="grid grid-cols-2 gap-3">
                  <FormField control={form.control} name="factura_referencia_num" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">N° Factura Original *</FormLabel>
                      <FormControl><Input placeholder="FAC-000001" {...field} className="font-mono" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="motivo_ajuste" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs">Motivo del Ajuste *</FormLabel>
                      <FormControl><Input placeholder="Devolución parcial de mercancía" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              </div>
            )}

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-3">Items del Documento (Art. 13 num. 8, 9, 10)</p>
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="rounded-lg border bg-card/50 p-3 space-y-2">
                    <div className="flex items-end gap-2">
                      <FormField control={form.control} name={`items.${index}.descripcion`} render={({ field }) => (
                        <FormItem className="flex-grow">
                          {index === 0 && <FormLabel className="text-[10px]">Descripción</FormLabel>}
                          <FormControl><Input placeholder="Servicio profesional" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name={`items.${index}.codigo`} render={({ field }) => (
                        <FormItem className="w-24">
                          {index === 0 && <FormLabel className="text-[10px]">Código</FormLabel>}
                          <FormControl><Input placeholder="SKU" {...field} /></FormControl>
                        </FormItem>
                      )} />
                      <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length === 1} className="shrink-0">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                      <FormField control={form.control} name={`items.${index}.cantidad`} render={({ field }) => (
                        <FormItem>
                          {index === 0 && <FormLabel className="text-[10px]">Cant.</FormLabel>}
                          <FormControl><Input type="number" step="0.0001" placeholder="1" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name={`items.${index}.precio_unitario`} render={({ field }) => (
                        <FormItem>
                          {index === 0 && <FormLabel className="text-[10px]">Precio Unit.</FormLabel>}
                          <FormControl><Input type="number" step="0.01" placeholder="0.00" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name={`items.${index}.descuento_pct`} render={({ field }) => (
                        <FormItem>
                          {index === 0 && <FormLabel className="text-[10px]">Desc. %</FormLabel>}
                          <FormControl><Input type="number" step="0.01" placeholder="0" {...field} /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name={`items.${index}.unidad`} render={({ field }) => (
                        <FormItem>
                          {index === 0 && <FormLabel className="text-[10px]">Unidad</FormLabel>}
                          <FormControl><Input placeholder="UND" {...field} /></FormControl>
                        </FormItem>
                      )} />
                      <FormField control={form.control} name={`items.${index}.tipo_gravamen`} render={({ field }) => (
                        <FormItem>
                          {index === 0 && <FormLabel className="text-[10px]">Gravamen</FormLabel>}
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger className="text-[11px]"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="gravado">Gravado</SelectItem>
                              <SelectItem value="exento">Exento</SelectItem>
                              <SelectItem value="no_sujeto">No Sujeto</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                    </div>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-3" onClick={() => append({ descripcion: '', codigo: '', unidad: 'UND', cantidad: 1, precio_unitario: 0, descuento_pct: 0, tipo_gravamen: 'gravado' })}>
                <PlusCircle className="mr-2 h-4 w-4" /> Añadir Item
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <FormField control={form.control} name="porcentaje_ret_iva" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Retención IVA %</FormLabel>
                  <FormControl><Input type="number" step="0.01" placeholder="0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="porcentaje_ret_islr" render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs">Retención ISLR %</FormLabel>
                  <FormControl><Input type="number" step="0.01" placeholder="0" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <FormField control={form.control} name="notas" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Observaciones / Notas</FormLabel>
                <FormControl><Textarea placeholder="Notas adicionales" rows={2} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="rounded-xl border bg-card p-4 space-y-2 text-sm">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-2">Resumen Fiscal</p>
              <div className="space-y-1">
                {baseImponible > 0 && (
                  <div className="flex justify-between"><span className="text-muted-foreground">Base Imponible:</span><span className="font-mono">{monedaSymbol} {baseImponible.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                )}
                {baseExenta > 0 && (
                  <div className="flex justify-between"><span className="text-muted-foreground">Base Exenta:</span><span className="font-mono">{monedaSymbol} {baseExenta.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                )}
                {baseNoSujeta > 0 && (
                  <div className="flex justify-between"><span className="text-muted-foreground">Base No Sujeta:</span><span className="font-mono">{monedaSymbol} {baseNoSujeta.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                )}
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal:</span><span className="font-mono">{monedaSymbol} {subtotal.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">IVA ({pIva}%):</span><span className="font-mono">{monedaSymbol} {montoIva.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                {montoIgtf > 0 && (
                  <div className="flex justify-between"><span className="text-muted-foreground">IGTF (3%):</span><span className="font-mono">{monedaSymbol} {montoIgtf.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                )}
                <div className="flex justify-between font-bold border-t pt-1"><span>Total:</span><span className="font-mono">{monedaSymbol} {total.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                {retIva > 0 && (
                  <div className="flex justify-between text-amber-600"><span>(-) Ret. IVA ({watchedRetIva}%):</span><span className="font-mono">-{monedaSymbol} {retIva.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                )}
                {retIslr > 0 && (
                  <div className="flex justify-between text-amber-600"><span>(-) Ret. ISLR ({watchedRetIslr}%):</span><span className="font-mono">-{monedaSymbol} {retIslr.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                )}
                {(retIva > 0 || retIslr > 0) && (
                  <div className="flex justify-between font-black text-lg border-t pt-1"><span>Total a Pagar:</span><span className="font-mono text-primary">{monedaSymbol} {totalAPagar.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span></div>
                )}
                {watchedMoneda !== 'VES' && watchedTasaBcv && watchedTasaBcv > 0 && (
                  <div className="flex justify-between text-xs text-muted-foreground border-t pt-1 mt-1">
                    <span>Equivalente en Bs. (Tasa BCV: {watchedTasaBcv}):</span>
                    <span className="font-mono">Bs. {(total * watchedTasaBcv).toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border border-amber-500/20 bg-amber-500/[0.03] p-3 flex items-start gap-3">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-[10px] text-muted-foreground leading-relaxed">
                <p className="font-bold text-foreground mb-0.5">Aviso Providencia SNAT/2011/00071</p>
                <p>Las copias de este documento llevarán la leyenda "Sin derecho a crédito fiscal". El Número de Control se asigna automáticamente de forma consecutiva y única. Fecha de emisión en formato de 8 dígitos (DD/MM/AAAA).</p>
              </div>
            </div>

            <SheetFooter className="flex-col gap-2 pt-4">
              <Button type="submit" className="w-full h-11 font-bold" disabled={isSubmitting}>
                {isSubmitting ? 'Procesando...' : `Emitir ${watchedTipoDoc === 'NOTA_DEBITO' ? 'Nota de Débito' : watchedTipoDoc === 'NOTA_CREDITO' ? 'Nota de Crédito' : 'Factura'}`}
              </Button>
              <p className="text-[9px] text-muted-foreground text-center">
                Documento fiscal conforme a la Providencia Administrativa SNAT/2011/00071 — Gaceta Oficial N° 39.795
              </p>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
