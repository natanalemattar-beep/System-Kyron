'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Search, BarChart3, FileText, Users, Shield, Building2, Phone, Cpu, ShoppingCart,
  Scale, Landmark, Globe, CreditCard, Settings, BookOpen, Activity, Zap,
  Calculator, Briefcase, TrendingUp, Bot, Bell, Database,
  Banknote, Receipt, PiggyBank, Wallet, ReceiptText, ClipboardList,
  FolderOpen, FileCheck, FileClock, Calendar, CircleDollarSign, Percent,
  Building, Gavel, HandCoins, Truck, BadgeCheck, Hash, ArrowRight,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchItem {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  category: string;
  keywords: string[];
}

const SEARCH_ITEMS: SearchItem[] = [
  { title: 'Dashboard Principal', description: 'Panel de control corporativo', href: '/dashboard', icon: BarChart3, category: 'General', keywords: ['inicio', 'panel', 'kpi', 'resumen'] },
  { title: 'Configuración', description: 'Ajustes del sistema', href: '/configuracion', icon: Settings, category: 'General', keywords: ['ajustes', 'config', 'perfil'] },
  { title: 'Manual de Usuario', description: 'Guía completa del sistema', href: '/manual-usuario', icon: BookOpen, category: 'General', keywords: ['ayuda', 'guia', 'documentacion'] },
  { title: 'Notificaciones', description: 'Centro de alertas', href: '/notificaciones', icon: Bell, category: 'General', keywords: ['alertas', 'mensajes', 'avisos'] },
  { title: 'Automatizaciones', description: 'Motor de reglas automáticas', href: '/automatizaciones', icon: Zap, category: 'General', keywords: ['reglas', 'tareas', 'cron'] },
  { title: 'Perfil de Empresa', description: 'Datos corporativos', href: '/perfil-empresa', icon: Building2, category: 'General', keywords: ['empresa', 'rif', 'datos'] },
  { title: 'Directorio Corporativo', description: 'Contactos de la empresa', href: '/directorio-corporativo', icon: Users, category: 'General', keywords: ['contactos', 'directorio', 'empleados'] },

  { title: 'Kyron Chat IA', description: 'Asistente inteligente', href: '/kyron-chat', icon: Bot, category: 'Inteligencia Artificial', keywords: ['ia', 'chat', 'asistente', 'claude', 'ai'] },
  { title: 'Análisis Dashboard IA', description: 'Análisis inteligente de métricas', href: '/contabilidad/analisis', icon: Activity, category: 'Inteligencia Artificial', keywords: ['metricas', 'analisis', 'openai', 'dashboard'] },

  { title: 'Tributos', description: 'Gestión tributaria y fiscal', href: '/contabilidad/tributos', icon: Calculator, category: 'Contabilidad', keywords: ['impuestos', 'iva', 'islr', 'fiscal', 'seniat'] },
  { title: 'IVA', description: 'Impuesto al Valor Agregado', href: '/contabilidad/tributos/iva', icon: Percent, category: 'Contabilidad', keywords: ['impuesto', 'valor', 'agregado', 'seniat'] },
  { title: 'IVA Trimestral', description: 'Declaración trimestral de IVA', href: '/contabilidad/tributos/iva-trimestral', icon: Percent, category: 'Contabilidad', keywords: ['trimestre', 'trimestral'] },
  { title: 'ISLR', description: 'Impuesto sobre la Renta', href: '/contabilidad/tributos/islr', icon: CircleDollarSign, category: 'Contabilidad', keywords: ['renta', 'impuesto', 'seniat', 'anual'] },
  { title: 'IGTF', description: 'Impuesto a Grandes Transacciones', href: '/contabilidad/tributos/igtf', icon: Banknote, category: 'Contabilidad', keywords: ['grandes', 'transacciones', 'financieras', 'divisas'] },
  { title: 'Retenciones IVA', description: 'Retenciones de IVA aplicadas', href: '/contabilidad/tributos/retenciones-iva', icon: Receipt, category: 'Contabilidad', keywords: ['retencion', 'comprobante'] },
  { title: 'Retenciones ISLR', description: 'Retenciones de ISLR aplicadas', href: '/contabilidad/tributos/retenciones-islr', icon: Receipt, category: 'Contabilidad', keywords: ['retencion', 'ar-i', 'arc'] },
  { title: 'Aportes Parafiscales', description: 'IVSS, INCES, BANAVIH, FAO', href: '/contabilidad/tributos/aportes-parafiscales', icon: Landmark, category: 'Contabilidad', keywords: ['ivss', 'inces', 'banavih', 'parafiscal', 'fao'] },
  { title: 'Impuestos Municipales', description: 'Patente e industria y comercio', href: '/contabilidad/tributos/municipales', icon: Building, category: 'Contabilidad', keywords: ['municipal', 'patente', 'alcaldia'] },
  { title: 'Calendario Fiscal', description: 'Fechas de obligaciones tributarias', href: '/contabilidad/tributos/calendario-fiscal', icon: Calendar, category: 'Contabilidad', keywords: ['fecha', 'vencimiento', 'calendario'] },
  { title: 'Declaraciones Anteriores', description: 'Historial de declaraciones', href: '/contabilidad/tributos/declaraciones-anteriores', icon: FileClock, category: 'Contabilidad', keywords: ['historial', 'declaracion', 'anterior'] },
  { title: 'Multas Tributarias', description: 'Gestión de multas y sanciones', href: '/contabilidad/tributos/multas', icon: Gavel, category: 'Contabilidad', keywords: ['multa', 'sancion', 'penalidad'] },
  { title: 'Homologación', description: 'Homologación tributaria', href: '/contabilidad/tributos/homologacion', icon: FileCheck, category: 'Contabilidad', keywords: ['homologacion', 'homologar'] },

  { title: 'Plan de Cuentas', description: 'Catálogo de cuentas contables', href: '/contabilidad/plan-cuentas', icon: FolderOpen, category: 'Contabilidad', keywords: ['cuenta', 'catalogo', 'plan', 'codigo'] },
  { title: 'Asientos Contables', description: 'Registro de asientos', href: '/contabilidad/asientos-contables', icon: ClipboardList, category: 'Contabilidad', keywords: ['asiento', 'debe', 'haber', 'partida'] },
  { title: 'Libro Diario', description: 'Registro cronológico de operaciones', href: '/contabilidad/libros/diario', icon: BookOpen, category: 'Contabilidad', keywords: ['diario', 'libro', 'cronologico'] },
  { title: 'Libro Mayor', description: 'Resumen por cuenta contable', href: '/contabilidad/libros/mayor', icon: BookOpen, category: 'Contabilidad', keywords: ['mayor', 'libro', 'cuenta'] },
  { title: 'Libro de Compra y Venta', description: 'Registro fiscal de operaciones', href: '/contabilidad/libros/compra-venta', icon: ReceiptText, category: 'Contabilidad', keywords: ['compra', 'venta', 'libro', 'fiscal'] },
  { title: 'Libro de Inventario', description: 'Control de inventario legal', href: '/contabilidad/libros/inventario', icon: ShoppingCart, category: 'Contabilidad', keywords: ['inventario', 'libro'] },
  { title: 'Libro de Nómina', description: 'Registro laboral obligatorio', href: '/contabilidad/libros/nomina', icon: Users, category: 'Contabilidad', keywords: ['nomina', 'libro', 'laboral'] },
  { title: 'Control de Licores', description: 'Libro obligatorio de licores', href: '/contabilidad/libros/control-licores', icon: BookOpen, category: 'Contabilidad', keywords: ['licor', 'bebida', 'alcohol'] },
  { title: 'Horas Extras', description: 'Registro de horas extras', href: '/contabilidad/libros/horas-extras', icon: BookOpen, category: 'Contabilidad', keywords: ['horas', 'extras', 'sobretiempo'] },
  { title: 'Cesta Ticket', description: 'Libro de cesta ticket', href: '/contabilidad/libros/cesta-ticket', icon: BookOpen, category: 'Contabilidad', keywords: ['cesta', 'ticket', 'alimentacion'] },

  { title: 'Estados Financieros', description: 'Balance, estado de resultados', href: '/contabilidad/estados-financieros', icon: FileText, category: 'Contabilidad', keywords: ['balance', 'resultados', 'financiero', 'estado'] },
  { title: 'Cierre Contable', description: 'Cierre de período contable', href: '/contabilidad/cierre-contable', icon: FileCheck, category: 'Contabilidad', keywords: ['cierre', 'periodo', 'anual'] },
  { title: 'Conciliación Bancaria', description: 'Conciliar cuentas con bancos', href: '/contabilidad/conciliacion-bancaria', icon: Landmark, category: 'Contabilidad', keywords: ['banco', 'conciliacion', 'bancaria'] },
  { title: 'Cuentas por Cobrar', description: 'Gestión de cobranzas', href: '/contabilidad/cuentas-por-cobrar', icon: HandCoins, category: 'Contabilidad', keywords: ['cobrar', 'cobranza', 'cliente', 'deuda'] },
  { title: 'Cuentas por Pagar', description: 'Gestión de pagos a proveedores', href: '/contabilidad/cuentas-por-pagar', icon: Wallet, category: 'Contabilidad', keywords: ['pagar', 'proveedor', 'deuda'] },
  { title: 'Centro de Costos', description: 'Distribución por centros', href: '/contabilidad/centro-costos', icon: PiggyBank, category: 'Contabilidad', keywords: ['costo', 'centro', 'distribucion'] },
  { title: 'Depreciación de Activos', description: 'Cálculo de depreciación', href: '/contabilidad/depreciacion-activos', icon: TrendingUp, category: 'Contabilidad', keywords: ['depreciacion', 'activo', 'fijo'] },
  { title: 'Indicadores Financieros', description: 'Ratios y métricas financieras', href: '/contabilidad/indicadores-financieros', icon: BarChart3, category: 'Contabilidad', keywords: ['ratio', 'indicador', 'liquidez', 'solvencia'] },
  { title: 'Exportación SENIAT', description: 'Exportar datos para SENIAT', href: '/contabilidad/exportacion-seniat', icon: FileText, category: 'Contabilidad', keywords: ['seniat', 'exportar', 'xml', 'txt'] },
  { title: 'Ajuste por Inflación', description: 'Ajuste fiscal y financiero', href: '/ajuste-por-inflacion', icon: TrendingUp, category: 'Contabilidad', keywords: ['inflacion', 'ajuste', 'reexpresion'] },
  { title: 'Dictamen del Contador', description: 'Informe de auditoría', href: '/contabilidad/dictamen-contador', icon: FileCheck, category: 'Contabilidad', keywords: ['dictamen', 'contador', 'auditoria'] },

  { title: 'Certificaciones Empresa', description: 'Documentos corporativos', href: '/contabilidad/certificaciones/empresa', icon: BadgeCheck, category: 'Contabilidad', keywords: ['certificado', 'documento'] },
  { title: 'Certificaciones Contables', description: 'Certificados contables', href: '/contabilidad/certificaciones/contables', icon: BadgeCheck, category: 'Contabilidad', keywords: ['certificado', 'contable'] },
  { title: 'Certificaciones Financieras', description: 'Certificados financieros', href: '/contabilidad/certificaciones/financiera', icon: BadgeCheck, category: 'Contabilidad', keywords: ['certificado', 'financiero'] },
  { title: 'Certificaciones de Trabajo', description: 'Constancias de trabajo', href: '/contabilidad/certificaciones/trabajo', icon: BadgeCheck, category: 'Contabilidad', keywords: ['constancia', 'trabajo'] },
  { title: 'Certificaciones de Socios', description: 'Documentos de socios', href: '/contabilidad/certificaciones/socios', icon: BadgeCheck, category: 'Contabilidad', keywords: ['socio', 'accionista'] },

  { title: 'Presupuesto', description: 'Control presupuestario', href: '/contabilidad/presupuesto', icon: PiggyBank, category: 'Contabilidad', keywords: ['presupuesto', 'partida', 'asignacion'] },
  { title: 'Ratios Financieros', description: 'Ratios y análisis financiero', href: '/contabilidad/ratios-financieros', icon: BarChart3, category: 'Contabilidad', keywords: ['ratio', 'analisis', 'financiero'] },
  { title: 'Punto de Ventas', description: 'Terminal de punto de venta', href: '/contabilidad/punto-de-ventas', icon: ShoppingCart, category: 'Contabilidad', keywords: ['punto', 'venta', 'pos', 'terminal'] },
  { title: 'Pagos Digitales', description: 'Gestión de pagos electrónicos', href: '/contabilidad/pagos-digitales', icon: CreditCard, category: 'Contabilidad', keywords: ['pago', 'digital', 'electronico'] },
  { title: 'Entidades Sin Fines de Lucro', description: 'Contabilidad para ONG', href: '/contabilidad/entidades-sin-fines-lucro', icon: Building, category: 'Contabilidad', keywords: ['ong', 'fundacion', 'sin fines'] },
  { title: 'ISO 9001', description: 'Calidad ISO 9001', href: '/contabilidad/calidad/iso-9001', icon: BadgeCheck, category: 'Contabilidad', keywords: ['iso', 'calidad', '9001', 'certificacion'] },
  { title: 'Alianza Chévere Salud', description: 'Alianza con Chévere Salud', href: '/contabilidad/alianzas/chevere-salud', icon: Shield, category: 'Contabilidad', keywords: ['alianza', 'salud', 'chevere'] },
  { title: 'Alianza Mapfre', description: 'Seguros Mapfre', href: '/contabilidad/alianzas/mapfre', icon: Shield, category: 'Contabilidad', keywords: ['mapfre', 'seguros', 'alianza'] },
  { title: 'Alianza Mercantil Seguros', description: 'Seguros Mercantil', href: '/contabilidad/alianzas/mercantil-seguros', icon: Shield, category: 'Contabilidad', keywords: ['mercantil', 'seguros', 'alianza'] },
  { title: 'Anteproyecto', description: 'Gestión de anteproyectos', href: '/contabilidad/proyectos/anteproyecto', icon: FileText, category: 'Contabilidad', keywords: ['anteproyecto', 'proyecto', 'planificacion'] },
  { title: 'Proyecto Maestro', description: 'Proyecto maestro corporativo', href: '/contabilidad/proyectos/proyecto-maestro', icon: FileText, category: 'Contabilidad', keywords: ['proyecto', 'maestro', 'planificacion'] },
  { title: 'WhatsApp Empresarial', description: 'Comunicación empresarial', href: '/contabilidad/whatsapp-empresarial', icon: Phone, category: 'Contabilidad', keywords: ['whatsapp', 'mensaje', 'comunicacion'] },
  { title: 'Telefonía Corporativa', description: 'Gestión de telefonía', href: '/contabilidad/telefonia-corporativa', icon: Phone, category: 'Contabilidad', keywords: ['telefonia', 'corporativa', 'pbx'] },
  { title: 'CONATEL', description: 'Trámites telecomunicaciones', href: '/contabilidad/conatel', icon: Globe, category: 'Contabilidad', keywords: ['conatel', 'licencia', 'telecom'] },
  { title: 'Facturación Telecom', description: 'Facturación de telecomunicaciones', href: '/contabilidad/facturacion-telecom', icon: Receipt, category: 'Contabilidad', keywords: ['factura', 'telecom'] },

  { title: 'IGP', description: 'Impuesto General Progresivo', href: '/contabilidad/tributos/igp', icon: Percent, category: 'Contabilidad', keywords: ['igp', 'impuesto', 'progresivo'] },
  { title: 'Aporte 70', description: 'Aporte del 70%', href: '/contabilidad/tributos/aporte-70', icon: Landmark, category: 'Contabilidad', keywords: ['aporte', '70', 'contribucion'] },
  { title: 'FONACIT', description: 'Ciencia y tecnología', href: '/contabilidad/tributos/fonacit', icon: Landmark, category: 'Contabilidad', keywords: ['fonacit', 'ciencia', 'tecnologia'] },
  { title: 'Tributo Hidrocarburos', description: 'Sector hidrocarburos', href: '/contabilidad/tributos/hidrocarburos', icon: Zap, category: 'Contabilidad', keywords: ['hidrocarburos', 'petroleo', 'gas'] },
  { title: 'Tributo Juegos', description: 'Impuesto a juegos de azar', href: '/contabilidad/tributos/juegos', icon: CircleDollarSign, category: 'Contabilidad', keywords: ['juegos', 'azar', 'loteria'] },
  { title: 'Tributo Exportadores', description: 'Obligaciones de exportadores', href: '/contabilidad/tributos/exportadores', icon: Globe, category: 'Contabilidad', keywords: ['exportador', 'exportacion'] },
  { title: 'Permisos Tributarios', description: 'Permisos y licencias', href: '/contabilidad/tributos/permisos', icon: FileCheck, category: 'Contabilidad', keywords: ['permiso', 'licencia'] },
  { title: 'Poderes de Representación', description: 'Mandatos y poderes', href: '/contabilidad/tributos/poderes-representacion', icon: FileText, category: 'Contabilidad', keywords: ['poder', 'representacion', 'mandato'] },
  { title: 'Comunicaciones Tributarias', description: 'Comunicados oficiales', href: '/contabilidad/tributos/comunicaciones', icon: Bell, category: 'Contabilidad', keywords: ['comunicacion', 'comunicado', 'oficio'] },
  { title: 'Min. Comercio Exterior', description: 'Trámites comercio exterior', href: '/contabilidad/tributos/ministerio-comercio-exterior', icon: Globe, category: 'Contabilidad', keywords: ['comercio', 'exterior', 'ministerio'] },
  { title: 'Min. Ecosocialismo', description: 'Trámites ambientales', href: '/contabilidad/tributos/ministerio-ecosocialismo', icon: Globe, category: 'Contabilidad', keywords: ['ecosocialismo', 'ambiental', 'ministerio'] },
  { title: 'Min. Industrias', description: 'Trámites industriales', href: '/contabilidad/tributos/ministerio-industrias', icon: Building, category: 'Contabilidad', keywords: ['industria', 'ministerio'] },
  { title: 'Min. Transporte', description: 'Trámites de transporte', href: '/contabilidad/tributos/ministerio-transporte', icon: Truck, category: 'Contabilidad', keywords: ['transporte', 'ministerio'] },
  { title: 'Min. Turismo', description: 'Trámites de turismo', href: '/contabilidad/tributos/ministerio-turismo', icon: Globe, category: 'Contabilidad', keywords: ['turismo', 'ministerio'] },

  { title: 'Facturación', description: 'Emisión de facturas', href: '/facturacion', icon: ReceiptText, category: 'Ventas y Facturación', keywords: ['factura', 'emitir', 'venta'] },
  { title: 'Facturación a Crédito', description: 'Facturas con crédito', href: '/facturacion-credito', icon: CreditCard, category: 'Ventas y Facturación', keywords: ['credito', 'factura', 'plazo'] },
  { title: 'Proformas', description: 'Cotizaciones y proformas', href: '/proformas', icon: FileText, category: 'Ventas y Facturación', keywords: ['proforma', 'cotizacion', 'presupuesto'] },
  { title: 'Proveedores', description: 'Gestión de proveedores', href: '/proveedores', icon: Truck, category: 'Ventas y Facturación', keywords: ['proveedor', 'compra'] },
  { title: 'Inventario', description: 'Control de inventario', href: '/inventario', icon: ShoppingCart, category: 'Ventas y Facturación', keywords: ['producto', 'stock', 'almacen'] },
  { title: 'Pasarelas de Pago', description: 'Métodos de pago electrónico', href: '/pasarelas-pago', icon: CreditCard, category: 'Ventas y Facturación', keywords: ['pago', 'pasarela', 'electronico'] },
  { title: 'Reportes', description: 'Generación de informes', href: '/reportes', icon: FileText, category: 'Ventas y Facturación', keywords: ['informe', 'reporte', 'pdf', 'excel'] },
  { title: 'Arqueo de Caja', description: 'Cierre y conciliación de caja', href: '/arqueo-caja', icon: CreditCard, category: 'Ventas y Facturación', keywords: ['caja', 'cierre', 'conciliacion', 'efectivo'] },
  { title: 'Estrategias de Ventas', description: 'Planificación comercial', href: '/estrategias-ventas', icon: TrendingUp, category: 'Ventas y Facturación', keywords: ['venta', 'estrategia', 'comercial'] },
  { title: 'Análisis de Ventas', description: 'Métricas de ventas', href: '/analisis-ventas', icon: BarChart3, category: 'Ventas y Facturación', keywords: ['venta', 'metrica', 'analisis'] },
  { title: 'Fidelización de Clientes', description: 'Programa de fidelidad', href: '/fidelizacion-clientes', icon: Users, category: 'Ventas y Facturación', keywords: ['cliente', 'fidelidad', 'programa'] },
  { title: 'Marketing', description: 'Campañas y publicidad', href: '/marketing', icon: Briefcase, category: 'Ventas y Facturación', keywords: ['campaña', 'publicidad', 'promocion'] },

  { title: 'Nómina', description: 'Gestión de nómina y salarios', href: '/contabilidad/libros/nomina', icon: Users, category: 'Recursos Humanos', keywords: ['salario', 'pago', 'empleado', 'sueldo', 'nomina'] },
  { title: 'Certificados Laborales', description: 'Constancias de trabajo RRHH', href: '/contabilidad/rrhh/certificados-laborales', icon: BadgeCheck, category: 'Recursos Humanos', keywords: ['constancia', 'laboral', 'rrhh'] },
  { title: 'Organigrama', description: 'Estructura organizacional', href: '/organigrama', icon: Users, category: 'Recursos Humanos', keywords: ['organigrama', 'estructura', 'cargo'] },
  { title: 'Protección y Pensiones', description: 'Beneficios laborales', href: '/contabilidad/tributos/proteccion-pensiones', icon: Shield, category: 'Recursos Humanos', keywords: ['pension', 'seguro', 'beneficio'] },

  { title: 'Escritorio Jurídico', description: 'Gestión legal corporativa', href: '/escritorio-juridico', icon: Scale, category: 'Legal', keywords: ['legal', 'abogado', 'juridico'] },
  { title: 'Contratos', description: 'Administración de contratos', href: '/contratos', icon: FileText, category: 'Legal', keywords: ['contrato', 'acuerdo', 'clausula'] },
  { title: 'Gaceta Oficial 6952', description: 'Monitor regulatorio', href: '/gaceta-6952', icon: BookOpen, category: 'Legal', keywords: ['gaceta', 'regulacion', 'decreto', '6952'] },
  { title: 'Acta de Asamblea', description: 'Actas de asambleas', href: '/acta-asamblea', icon: FileText, category: 'Legal', keywords: ['acta', 'asamblea', 'reunion'] },
  { title: 'Trámites Fiscales', description: 'Gestión de trámites ante entes', href: '/tramites-fiscales', icon: ClipboardList, category: 'Legal', keywords: ['tramite', 'fiscal', 'seniat'] },
  { title: 'Flujo de Aprobaciones', description: 'Cadena de aprobaciones', href: '/flujo-aprobaciones', icon: FileCheck, category: 'Legal', keywords: ['aprobacion', 'flujo', 'autorizacion'] },

  { title: 'Mi Línea', description: 'Gestión de línea móvil', href: '/mi-linea', icon: Phone, category: 'Telecom', keywords: ['telefono', 'movil', 'celular', 'plan'] },
  { title: 'Flota Empresarial', description: 'Control de flota corporativa', href: '/flota-empresarial', icon: Phone, category: 'Telecom', keywords: ['flota', 'corporativo', 'lineas'] },
  { title: 'Facturación Corporativa', description: 'Facturas de telecomunicaciones', href: '/facturacion-corporativa', icon: CreditCard, category: 'Telecom', keywords: ['factura', 'pago', 'consumo'] },
  { title: 'eSIM', description: 'Gestión de eSIM digital', href: '/esim', icon: Cpu, category: 'Telecom', keywords: ['esim', 'digital', 'sim'] },

  { title: 'Seguridad Empresarial', description: 'Ciberseguridad y control', href: '/seguridad-empresarial', icon: Shield, category: 'Informática', keywords: ['firewall', 'seguridad', 'vulnerabilidad'] },
  { title: 'Auditoría de Seguridad', description: 'Auditoría y logs de seguridad', href: '/seguridad-empresarial/auditoria', icon: Shield, category: 'Informática', keywords: ['auditoria', 'log', 'seguridad'] },
  { title: 'Dispositivos', description: 'Gestión de dispositivos', href: '/seguridad-empresarial/dispositivos', icon: Cpu, category: 'Informática', keywords: ['dispositivo', 'equipo', 'hardware'] },

  { title: 'Activos Inmobiliarios', description: 'Registro de propiedades', href: '/activos-inmobiliarios', icon: Building2, category: 'Activos', keywords: ['propiedad', 'inmueble', 'activo'] },
  { title: 'Calculadora de Costos', description: 'Estimación de costos', href: '/calculadora-costos', icon: Calculator, category: 'Activos', keywords: ['costo', 'calculadora', 'estimacion'] },
  { title: 'Estructura de Costos', description: 'Desglose de costos', href: '/estructura-costos', icon: BarChart3, category: 'Activos', keywords: ['estructura', 'costo', 'desglose'] },
  { title: 'Líneas de Crédito', description: 'Gestión de líneas de crédito', href: '/lineas-credito', icon: Banknote, category: 'Activos', keywords: ['credito', 'linea', 'financiamiento'] },
  { title: 'Billetera de Cambio', description: 'Operaciones en divisas', href: '/billetera-cambio', icon: Wallet, category: 'Activos', keywords: ['divisa', 'cambio', 'dolar'] },

  { title: 'Mercado Eco-créditos', description: 'Créditos de carbono', href: '/mercado-ecocreditos', icon: Globe, category: 'Sostenibilidad', keywords: ['carbono', 'eco', 'verde', 'sostenible'] },
  { title: 'Sector Energético', description: 'Gestión energética', href: '/sector-energetico', icon: Zap, category: 'Sostenibilidad', keywords: ['energia', 'sector', 'electricidad'] },
];

const RECENT_KEY = 'kyron-search-recent';
const MAX_RECENT = 5;

function normalize(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function scoreItem(item: SearchItem, q: string): number {
  const nq = normalize(q);
  const nt = normalize(item.title);
  const nd = normalize(item.description);
  const nc = normalize(item.category);

  if (nt === nq) return 100;
  if (nt.startsWith(nq)) return 90;
  if (nt.includes(nq)) return 70;
  if (item.keywords.some(k => normalize(k).startsWith(nq))) return 60;
  if (item.keywords.some(k => normalize(k).includes(nq))) return 50;
  if (nd.includes(nq)) return 40;
  if (nc.includes(nq)) return 30;

  const words = nq.split(/\s+/);
  if (words.length > 1) {
    const allMatch = words.every(w =>
      nt.includes(w) || nd.includes(w) || item.keywords.some(k => normalize(k).includes(w))
    );
    if (allMatch) return 45;
  }

  return 0;
}

function highlightMatch(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const nq = normalize(query);
  const nt = normalize(text);
  const idx = nt.indexOf(nq);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span className="text-primary font-extrabold">{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentHrefs, setRecentHrefs] = useState<string[]>([]);
  const router = useRouter();
  const locale = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) setRecentHrefs(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const { scored, grouped, flatFiltered, recentItems, showRecent } = useMemo(() => {
    const q = query.trim();
    const showRecent = !q && recentHrefs.length > 0;

    let scored: Array<SearchItem & { score: number }>;
    if (q) {
      scored = SEARCH_ITEMS
        .map(item => ({ ...item, score: scoreItem(item, q) }))
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score);
    } else {
      scored = SEARCH_ITEMS.map(item => ({ ...item, score: 0 }));
    }

    const grouped = scored.reduce<Record<string, typeof scored>>((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    const flatFiltered = Object.values(grouped).flat();

    const recentItems = showRecent
      ? recentHrefs
          .map(href => SEARCH_ITEMS.find(it => it.href === href))
          .filter((it): it is SearchItem => !!it)
      : [];

    return { scored, grouped, flatFiltered, recentItems, showRecent };
  }, [query, recentHrefs]);

  const totalItems = showRecent
    ? recentItems.length + flatFiltered.length
    : flatFiltered.length;

  const saveRecent = useCallback((href: string) => {
    setRecentHrefs(prev => {
      const next = [href, ...prev.filter(h => h !== href)].slice(0, MAX_RECENT);
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const navigate = useCallback((item: SearchItem) => {
    setOpen(false);
    saveRecent(item.href);
    router.push(`/${locale}${item.href}`);
  }, [router, locale, saveRecent]);

  const getItemAtIndex = useCallback((idx: number): SearchItem | undefined => {
    if (showRecent) {
      if (idx < recentItems.length) return recentItems[idx];
      return flatFiltered[idx - recentItems.length];
    }
    return flatFiltered[idx];
  }, [showRecent, recentItems, flatFiltered]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, totalItems - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      const item = getItemAtIndex(selectedIndex);
      if (item) navigate(item);
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const renderItem = (item: SearchItem, idx: number, isRecent?: boolean) => {
    const Icon = item.icon;
    return (
      <button
        key={`${isRecent ? 'r-' : ''}${item.href}`}
        data-index={idx}
        onClick={() => navigate(item)}
        className={cn(
          'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all group/item',
          idx === selectedIndex
            ? 'bg-primary/8 text-primary'
            : 'hover:bg-muted/60 text-foreground'
        )}
      >
        <div className={cn(
          'h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
          idx === selectedIndex ? 'bg-primary/15 text-primary' : 'bg-muted/50 text-muted-foreground'
        )}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold truncate">
            {query.trim() ? highlightMatch(item.title, query.trim()) : item.title}
          </p>
          <p className="text-[10px] text-muted-foreground/60 truncate">
            {query.trim() ? highlightMatch(item.description, query.trim()) : item.description}
          </p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {isRecent && (
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground/40 font-semibold">reciente</span>
          )}
          {idx === selectedIndex && (
            <ArrowRight className="h-3.5 w-3.5 text-primary/50" />
          )}
        </div>
      </button>
    );
  };

  let runningIndex = -1;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted/80 transition-all text-muted-foreground text-xs cursor-pointer group"
      >
        <Search className="h-3.5 w-3.5 opacity-50 group-hover:opacity-80 transition-opacity" />
        <span className="hidden md:inline text-[10px] font-medium">Buscar...</span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-border/60 bg-background/80 px-1.5 font-mono text-[11px] font-bold text-muted-foreground/60">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[600px] p-0 rounded-2xl border-border/30 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden gap-0">
          <DialogTitle className="sr-only">Búsqueda global</DialogTitle>
          <div className="flex items-center gap-3 px-4 border-b border-border/30">
            <Search className={cn(
              "h-4 w-4 shrink-0 transition-colors",
              query.trim() ? "text-primary" : "text-muted-foreground/50"
            )} />
            <Input
              ref={inputRef}
              placeholder="Buscar módulos, páginas, funciones..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-12 border-0 bg-transparent text-sm font-medium placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {query.trim() && (
              <button
                onClick={() => setQuery('')}
                className="shrink-0 h-5 w-5 rounded-full bg-muted/60 hover:bg-muted flex items-center justify-center text-muted-foreground/60 hover:text-foreground transition-colors"
              >
                <Hash className="h-3 w-3 rotate-45" />
              </button>
            )}
            <kbd className="shrink-0 h-5 flex items-center rounded border border-border/50 bg-muted/30 px-1.5 font-mono text-[11px] text-muted-foreground/50">
              ESC
            </kbd>
          </div>

          {query.trim() && (
            <div className="px-4 py-1.5 border-b border-border/20 bg-muted/5">
              <p className="text-[11px] text-muted-foreground/50">
                {flatFiltered.length === 0
                  ? 'Sin resultados'
                  : `${flatFiltered.length} resultado${flatFiltered.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          )}
          
          <div ref={listRef} className="max-h-[420px] overflow-y-auto py-1 scroll-smooth">
            {totalItems === 0 ? (
              <div className="py-14 text-center">
                <div className="h-12 w-12 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-3">
                  <Search className="h-6 w-6 text-muted-foreground/20" />
                </div>
                <p className="text-sm font-semibold text-muted-foreground/50 mb-1">
                  Sin resultados para &ldquo;{query}&rdquo;
                </p>
                <p className="text-[11px] text-muted-foreground/35">
                  Intenta con otro término o revisa la ortografía
                </p>
              </div>
            ) : (
              <>
                {showRecent && recentItems.length > 0 && (
                  <div>
                    <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/40 flex items-center gap-1.5">
                      <FileClock className="h-3 w-3" />
                      Recientes
                    </p>
                    {recentItems.map(item => {
                      runningIndex++;
                      return renderItem(item, runningIndex, true);
                    })}
                    <div className="mx-4 my-1 border-b border-border/20" />
                  </div>
                )}
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/40">
                      {category}
                      {query.trim() && (
                        <span className="ml-1.5 text-muted-foreground/25 normal-case tracking-normal">
                          ({items.length})
                        </span>
                      )}
                    </p>
                    {items.map(item => {
                      runningIndex++;
                      return renderItem(item, runningIndex);
                    })}
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center gap-4 px-4 py-2 border-t border-border/20 bg-muted/5">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground/40">
              <kbd className="px-1 rounded border border-border/40 bg-muted/30 font-mono text-[10px]">↑↓</kbd> navegar
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground/40">
              <kbd className="px-1 rounded border border-border/40 bg-muted/30 font-mono text-[10px]">↵</kbd> abrir
            </span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground/40">
              <kbd className="px-1 rounded border border-border/40 bg-muted/30 font-mono text-[10px]">esc</kbd> cerrar
            </span>
            <span className="flex-1" />
            <span className="text-[10px] text-muted-foreground/30 font-medium">
              {SEARCH_ITEMS.length} módulos
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
