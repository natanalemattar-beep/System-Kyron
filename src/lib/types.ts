
export type Invoice = {
  id: string;
  userId?: string;
  customer: string;
  customerEmail?: string;
  date: string;
  dueDate: string;
  amount: number;
  status: 'Pagada' | 'Enviada' | 'Borrador' | 'Vencida';
  items: {
    description: string;
    quantity: number;
    price: number;
  }[];
};

export type FacturaSeniat = {
  id: number;
  numero_factura: string;
  numero_control: string;
  serie: string | null;
  tipo: string;
  tipo_documento: 'FACTURA' | 'NOTA_DEBITO' | 'NOTA_CREDITO' | 'ORDEN_ENTREGA' | 'GUIA_DESPACHO';
  condicion_pago: 'contado' | 'credito';
  fecha_emision: string;
  fecha_vencimiento: string | null;
  moneda: string;
  subtotal: string;
  base_imponible: string;
  base_exenta: string;
  base_no_sujeta: string;
  porcentaje_iva: number;
  alicuota_tipo: 'general' | 'reducida' | 'adicional' | 'exento';
  monto_iva: string;
  porcentaje_igtf: number;
  monto_igtf: string;
  total: string;
  tasa_bcv: number | null;
  total_usd: string | null;
  monto_moneda_ext: string | null;
  moneda_extranjera: string | null;
  retencion_iva: string;
  porcentaje_ret_iva: number;
  retencion_islr: string;
  porcentaje_ret_islr: number;
  total_a_pagar: string;
  rif_emisor: string | null;
  razon_social_emisor: string | null;
  domicilio_fiscal_emisor: string | null;
  factura_referencia_id: number | null;
  factura_referencia_num: string | null;
  motivo_ajuste: string | null;
  sin_derecho_credito_fiscal: boolean;
  estado: 'borrador' | 'emitida' | 'pendiente' | 'cobrada' | 'pagada' | 'vencida' | 'anulada';
  descripcion: string | null;
  cliente_id: number | null;
  cliente_nombre: string | null;
  cliente_rif: string | null;
  cliente_direccion: string | null;
};

export type Transaction = {
  id: string;
  userId?: string;
  date: string;
  description: string;
  amount: number;
  category: string;
};
