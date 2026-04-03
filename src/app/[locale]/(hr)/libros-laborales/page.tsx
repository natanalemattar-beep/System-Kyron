'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Clock, Palmtree, Receipt, Landmark, ShieldCheck, UserPlus, UserMinus, Scale,
  Baby, HeartPulse, Stethoscope, FileText, AlertTriangle, Search, Download,
  FileSpreadsheet, Bell, ChevronRight, BookOpen, Users, Loader2, Calendar,
  Building2, Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

const LIBROS = [
  { id: 'empleados', label: 'Registro', icon: Users, short: 'Empleados' },
  { id: 'horas_extras', label: 'Horas Extra', icon: Clock, short: 'H. Extra' },
  { id: 'vacaciones', label: 'Vacaciones', icon: Palmtree, short: 'Vac.' },
  { id: 'utilidades', label: 'Utilidades', icon: Receipt, short: 'Util.' },
  { id: 'prestaciones', label: 'Prestaciones', icon: Scale, short: 'Prest.' },
  { id: 'parafiscales', label: 'Parafiscales', icon: Landmark, short: 'Paraf.' },
  { id: 'solvencias', label: 'Solvencias', icon: ShieldCheck, short: 'Solv.' },
  { id: 'ingreso_egreso', label: 'Ing./Egreso', icon: UserPlus, short: 'Ing/Eg' },
  { id: 'islr', label: 'ISLR', icon: FileText, short: 'ISLR' },
  { id: 'maternidad', label: 'Maternidad', icon: Baby, short: 'Mater.' },
  { id: 'incapacidades', label: 'Incapacidad', icon: HeartPulse, short: 'Incap.' },
  { id: 'reposos', label: 'Reposos', icon: Stethoscope, short: 'Repos.' },
  { id: 'cancelacion_rif', label: 'Canc. RIF', icon: AlertTriangle, short: 'RIF' },
] as const;

type LibroId = typeof LIBROS[number]['id'];

function fmt(v: any) { return v == null ? '—' : v; }
function fmtMoney(v: any) {
  const n = parseFloat(v);
  if (isNaN(n)) return '—';
  return new Intl.NumberFormat('es-VE', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}
function fmtDate(v: any) {
  if (!v) return '—';
  const d = new Date(v);
  return d.toLocaleDateString('es-VE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function fmtPct(v: any) {
  const n = parseFloat(v);
  if (isNaN(n)) return '—';
  return `${n}%`;
}

const TIPO_LABELS: Record<string, string> = {
  extra_diurna: 'Extra Diurna (+50%)',
  extra_nocturna: 'Extra Nocturna (+80%)',
  nocturna_ordinaria: 'Nocturna Ord. (+30%)',
  ivss: 'IVSS',
  faov: 'FAOV',
  inces: 'INCES',
  lopcymat: 'LOPCYMAT',
  prestaciones: 'Prestaciones Sociales',
  parafiscales: 'Aportes Parafiscales',
  lottt: 'Cumplimiento LOTTT',
  general: 'General',
  ingreso: 'Ingreso',
  egreso: 'Egreso',
  renuncia: 'Renuncia',
  despido_justificado: 'Despido Justificado',
  despido_injustificado: 'Despido Injustificado',
  jubilacion: 'Jubilación',
  fallecimiento: 'Fallecimiento',
  mutuo_acuerdo: 'Mutuo Acuerdo',
  fin_contrato: 'Fin de Contrato',
  parcial: 'Parcial',
  permanente: 'Permanente',
  temporal: 'Temporal',
  accidente_laboral: 'Accidente Laboral',
  enfermedad_ocupacional: 'Enfermedad Ocupacional',
  accidente_comun: 'Accidente Común',
  enfermedad_comun: 'Enfermedad Común',
  maternidad: 'Maternidad',
  prenatal: 'Pre-natal',
  postnatal: 'Post-natal',
  lactancia: 'Lactancia',
  reintegrada: 'Reintegrada',
  finalizado: 'Finalizado',
  cierre_negocio: 'Cierre de Negocio',
  independiente: 'Trabajador Independiente',
  cambio_regimen: 'Cambio de Régimen',
  suspension: 'Suspensión',
  otro: 'Otro',
  cancelado: 'Cancelado',
  suspendido: 'Suspendido',
  reactivado: 'Reactivado',
  vigente: 'Vigente',
  por_vencer: 'Por Vencer',
  vencida: 'Vencida',
  renovada: 'Renovada',
  pendiente: 'Pendiente',
  en_curso: 'En Curso',
  disfrutado: 'Disfrutado',
  vencido: 'Vencido',
  activo: 'Activo',
  prorrogado: 'Prorrogado',
  activa: 'Activa',
  en_evaluacion: 'En Evaluación',
  reubicado: 'Reubicado',
  pensionado: 'Pensionado',
  cerrada: 'Cerrada',
  calculado: 'Calculado',
  pagado_parcial: 'Pagado Parcial',
  liquidado: 'Liquidado',
};
function tipoLabel(v: string) { return TIPO_LABELS[v] || v; }

function exportCSV(rows: any[], filename: string) {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(','), ...rows.map(r => keys.map(k => `"${(r[k] ?? '').toString().replace(/"/g, '""')}"`).join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `${filename}.csv`; a.click();
  URL.revokeObjectURL(url);
}

function estadoBadge(estado: string) {
  const colors: Record<string, string> = {
    vigente: 'bg-emerald-100 text-emerald-700
    activo: 'bg-emerald-100 text-emerald-700
    activa: 'bg-emerald-100 text-emerald-700
    en_curso: 'bg-blue-100 text-blue-700
    pendiente: 'bg-amber-100 text-amber-700
    prenatal: 'bg-purple-100 text-purple-700
    postnatal: 'bg-pink-100 text-pink-700
    lactancia: 'bg-rose-100 text-rose-700
    por_vencer: 'bg-orange-100 text-orange-700
    vencida: 'bg-red-100 text-red-700
    vencido: 'bg-red-100 text-red-700
    cancelado: 'bg-red-100 text-red-700
    disfrutado: 'bg-green-100 text-green-700
    finalizado: 'bg-slate-100 text-slate-600
    reintegrada: 'bg-teal-100 text-teal-700
    calculado: 'bg-cyan-100 text-cyan-700
    liquidado: 'bg-green-100 text-green-700
    pagado_parcial: 'bg-yellow-100 text-yellow-700
  };
  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide', colors[estado] || 'bg-slate-100 text-slate-600')}>
      {tipoLabel(estado)}
    </span>
  );
}

export default function LibrosLaboralesPage() {
  const [activeTab, setActiveTab] = useState<LibroId>('empleados');
  const [data, setData] = useState<any[]>([]);
  const [alertas, setAlertas] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlertas, setShowAlertas] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async (libro: string) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setLoading(true);
    try {
      const res = await fetch(`/api/rrhh/libros?libro=${libro}`, { signal: ctrl.signal });
      const json = await res.json();
      setData(json.data || []);
    } catch (e: any) {
      if (e.name !== 'AbortError') setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAlertas = useCallback(async () => {
    try {
      const res = await fetch('/api/rrhh/libros?libro=alertas');
      const json = await res.json();
      setAlertas(json.data || []);
    } catch { setAlertas([]); }
  }, []);

  useEffect(() => { fetchData(activeTab); }, [activeTab, fetchData]);
  useEffect(() => { fetchAlertas(); }, [fetchAlertas]);

  const filtered = data.filter(row => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    return Object.values(row).some(v => v != null && v.toString().toLowerCase().includes(s));
  });

  const renderTable = () => {
    if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-primary" /><span className="ml-3 text-sm text-muted-foreground">Cargando registros...</span></div>;
    if (!filtered.length) return <div className="text-center py-20 text-muted-foreground"><BookOpen className="h-10 w-10 mx-auto mb-3 opacity-30" /><p className="text-sm font-bold">Sin registros</p><p className="text-xs mt-1">Los datos aparecerán cuando se registren empleados y movimientos.</p></div>;

    switch (activeTab) {
      case 'empleados':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Nombre</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Cédula</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Cargo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Depto.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Ingreso</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Contrato</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Salario</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">RIF</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs font-mono">{fmt(r.cedula)}</TableCell>
                <TableCell className="text-xs">{fmt(r.cargo)}</TableCell>
                <TableCell className="text-xs">{fmt(r.departamento)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_ingreso)}</TableCell>
                <TableCell className="text-xs">{tipoLabel(r.tipo_contrato || '')}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold">{fmtMoney(r.salario_base)}</TableCell>
                <TableCell className="text-xs font-mono">{fmt(r.rif)}</TableCell>
                <TableCell>{r.activo ? estadoBadge('activo') : estadoBadge('finalizado')}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'horas_extras':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Fecha</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Tipo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Horas</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Sal./Hora</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Recargo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Total</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha)}</TableCell>
                <TableCell className="text-xs">{tipoLabel(r.tipo)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{r.horas}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.salario_hora)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtPct(r.recargo_pct)}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold text-emerald-600">{fmtMoney(r.monto_total)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'vacaciones':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Período</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Inicio</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Fin</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Corresp.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Disfrutados</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Pendientes</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Bono Vac.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{r.periodo}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_inicio)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_fin)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{r.dias_correspondientes}</TableCell>
                <TableCell className="text-xs text-right font-mono">{r.dias_disfrutados}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold">{r.dias_pendientes}</TableCell>
                <TableCell className="text-xs text-right font-mono text-emerald-600">{fmtMoney(r.bono_vacacional)}</TableCell>
                <TableCell>{estadoBadge(r.estado)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'utilidades':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Año</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Días Trab.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Días Util.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Sal. Diario</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Monto</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Pago</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs font-mono">{r.anio}</TableCell>
                <TableCell className="text-xs text-right font-mono">{r.dias_trabajados}</TableCell>
                <TableCell className="text-xs text-right font-mono">{r.dias_utilidades}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.salario_diario)}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold text-emerald-600">{fmtMoney(r.monto_utilidades)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_pago)}</TableCell>
                <TableCell>{r.pagado ? estadoBadge('liquidado') : estadoBadge('pendiente')}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'prestaciones':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Período</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Sal. Integral</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Días Antig.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Garantía</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Intereses</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Total</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{r.periodo}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.salario_integral)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{r.dias_antiguedad}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.garantia)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.intereses)}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold text-emerald-600">{fmtMoney(r.total_prestaciones)}</TableCell>
                <TableCell>{estadoBadge(r.estado)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'parafiscales':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Período</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Tipo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Base</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">% Patron.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Mto. Patron.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">% Empl.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Mto. Empl.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Pagado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{r.periodo}</TableCell>
                <TableCell className="text-xs font-bold">{tipoLabel(r.tipo)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.base_calculo)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtPct(r.pct_patronal)}</TableCell>
                <TableCell className="text-xs text-right font-mono text-amber-600">{fmtMoney(r.monto_patronal)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtPct(r.pct_empleado)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.monto_empleado)}</TableCell>
                <TableCell>{r.pagado ? estadoBadge('liquidado') : estadoBadge('pendiente')}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'solvencias':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Tipo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">N° Solvencia</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Organismo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Emisión</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Vencimiento</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-bold">{tipoLabel(r.tipo)}</TableCell>
                <TableCell className="text-xs font-mono">{fmt(r.numero_solvencia)}</TableCell>
                <TableCell className="text-xs">{fmt(r.organismo)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_emision)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_vencimiento)}</TableCell>
                <TableCell>{estadoBadge(r.estado)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'ingreso_egreso':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Tipo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Fecha</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Causa</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Salario</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Liq. Prest.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Liq. Vac.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Liq. Util.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Total</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{r.tipo === 'ingreso' ? <span className="text-emerald-600 font-bold">Ingreso</span> : <span className="text-rose-600 font-bold">Egreso</span>}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha)}</TableCell>
                <TableCell className="text-xs">{tipoLabel(r.causa_egreso || '')}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.salario_al_momento)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.liquidacion_prestaciones)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.liquidacion_vacaciones)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.liquidacion_utilidades)}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold text-primary">{fmtMoney(r.total_liquidacion)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'islr':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Período</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Ingreso Grav.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Desgravamen</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Base Imp.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Tarifa</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Causado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Retenido</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Planilla</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{r.periodo}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.ingreso_gravable)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.desgravamen)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.base_imponible)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtPct(r.tarifa_pct)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.impuesto_causado)}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold text-rose-600">{fmtMoney(r.retenido_acumulado)}</TableCell>
                <TableCell>{r.planilla_generada ? estadoBadge('liquidado') : estadoBadge('pendiente')}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'maternidad':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleada</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Parto Est.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Pre-natal</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Post-natal</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Sem. Pre</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Sem. Post</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Lactancia</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Reintegro</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_parto_estimada)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.inicio_prenatal)} - {fmtDate(r.fin_prenatal)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.inicio_postnatal)} - {fmtDate(r.fin_postnatal)}</TableCell>
                <TableCell className="text-xs text-center font-mono">{r.semanas_pre}</TableCell>
                <TableCell className="text-xs text-center font-mono">{r.semanas_post}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.lactancia_inicio)} - {fmtDate(r.lactancia_fin)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_reintegro)}</TableCell>
                <TableCell>{estadoBadge(r.estado)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'incapacidades':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Tipo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Causa</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Desde</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">% Incap.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Sal. Ref.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Indemnización</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{tipoLabel(r.tipo)}</TableCell>
                <TableCell className="text-xs">{tipoLabel(r.causa)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_inicio)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtPct(r.porcentaje_incapacidad)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{fmtMoney(r.salario_referencia)}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold text-amber-600">{fmtMoney(r.indemnizacion_calculada)}</TableCell>
                <TableCell>{estadoBadge(r.estado)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'reposos':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Empleado</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Tipo</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Inicio</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Fin</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Otorgados</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Consumidos</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest text-right">Pendientes</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Médico</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">IVSS</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre} {r.apellido}</TableCell>
                <TableCell className="text-xs">{tipoLabel(r.tipo)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_inicio)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_fin)}</TableCell>
                <TableCell className="text-xs text-right font-mono">{r.dias_otorgados}</TableCell>
                <TableCell className="text-xs text-right font-mono">{r.dias_consumidos}</TableCell>
                <TableCell className="text-xs text-right font-mono font-bold">{r.dias_pendientes}</TableCell>
                <TableCell className="text-xs">{fmt(r.medico_tratante)}</TableCell>
                <TableCell className="text-xs">{r.validado_ivss ? <span className="text-emerald-600 font-bold">Sí</span> : <span className="text-muted-foreground">No</span>}</TableCell>
                <TableCell>{estadoBadge(r.estado)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      case 'cancelacion_rif':
        return (
          <Table>
            <TableHeader><TableRow className="bg-muted/30">
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Nombre</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Cédula</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">RIF Anterior</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Fecha Canc.</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Causa</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Notificación</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Bloqueo ISLR</TableHead>
              <TableHead className="text-[10px] font-black uppercase tracking-widest">Estado</TableHead>
            </TableRow></TableHeader>
            <TableBody>{filtered.map((r: any) => (
              <TableRow key={r.id} className="hover:bg-muted/20">
                <TableCell className="text-xs font-semibold">{r.nombre_empleado}</TableCell>
                <TableCell className="text-xs font-mono">{r.cedula}</TableCell>
                <TableCell className="text-xs font-mono">{r.rif_anterior}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_cancelacion)}</TableCell>
                <TableCell className="text-xs">{tipoLabel(r.causa)}</TableCell>
                <TableCell className="text-xs">{fmtDate(r.fecha_notificacion)}</TableCell>
                <TableCell className="text-xs">{r.bloqueo_islr ? <span className="text-rose-600 font-bold">Bloqueado</span> : <span className="text-emerald-600">Habilitado</span>}</TableCell>
                <TableCell>{estadoBadge(r.estado)}</TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        );

      default:
        return null;
    }
  };

  const currentLibro = LIBROS.find(l => l.id === activeTab)!;

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#0A2472]/10 rounded-xl border border-[#0A2472]/20">
              <BookOpen className="h-6 w-6 text-[#0A2472]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Libros Laborales Digitalizados</h1>
              <p className="text-xs text-muted-foreground mt-0.5">LOTTT · LOPCYMAT · IVSS · SENIAT · MPPST</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="relative h-9 rounded-xl text-xs font-bold gap-2"
            onClick={() => setShowAlertas(!showAlertas)}
          >
            <Bell className="h-3.5 w-3.5" />
            Alertas
            {alertas.length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[9px] font-black flex items-center justify-center">{alertas.length}</span>
            )}
          </Button>
          <Button variant="outline" size="sm" className="h-9 rounded-xl text-xs font-bold gap-2" onClick={() => window.print()}>
            <Download className="h-3.5 w-3.5" /> PDF
          </Button>
          <Button variant="outline" size="sm" className="h-9 rounded-xl text-xs font-bold gap-2" onClick={() => exportCSV(filtered, `libro_${activeTab}`)}>
            <FileSpreadsheet className="h-3.5 w-3.5" /> Excel
          </Button>
        </div>
      </header>

      {showAlertas && alertas.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-widest text-amber-800 flex items-center gap-2">
            <Bell className="h-3.5 w-3.5" /> Alertas Activas ({alertas.length})
          </h3>
          {alertas.map((a, i) => (
            <div key={i} className="flex items-center gap-3 text-xs py-1.5 border-b border-amber-200/50 last:border-0">
              <span className={cn('px-2 py-0.5 rounded-full text-[9px] font-bold uppercase', a.urgencia === 'alta' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700')}>
                {a.tipo}
              </span>
              <span className="text-foreground">{a.mensaje}</span>
            </div>
          ))}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={v => { setActiveTab(v as LibroId); setSearch(''); }}>
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <TabsList className="inline-flex h-auto bg-card border border-border/50 rounded-2xl p-1.5 shadow-sm gap-0.5 min-w-max">
            {LIBROS.map(libro => (
              <TabsTrigger
                key={libro.id}
                value={libro.id}
                className="rounded-xl px-3 py-2 text-[10px] font-bold uppercase tracking-wide data-[state=active]:bg-[#0A2472] data-[state=active]:text-white data-[state=active]:shadow-md transition-all flex items-center gap-1.5"
              >
                <libro.icon className="h-3.5 w-3.5" />
                <span className="hidden lg:inline">{libro.label}</span>
                <span className="lg:hidden">{libro.short}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="mt-4 bg-card border border-border/40 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <currentLibro.icon className="h-5 w-5 text-[#0A2472]" />
              <h2 className="text-sm font-black text-foreground">Libro de {currentLibro.label}</h2>
              <span className="text-xs text-muted-foreground">({filtered.length} registros)</span>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="h-9 pl-9 rounded-xl text-xs"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            {LIBROS.map(libro => (
              <TabsContent key={libro.id} value={libro.id} className="mt-0">
                {renderTable()}
              </TabsContent>
            ))}
          </div>
        </div>
      </Tabs>

      <footer className="text-center pt-4">
        <p className="text-[9px] text-muted-foreground/30 uppercase tracking-widest font-bold">
          System Kyron v2.8.5 · Libros Laborales · LOTTT Art. 58, 131 · LOPCYMAT · IVSS · SENIAT
        </p>
      </footer>
    </div>
  );
}
