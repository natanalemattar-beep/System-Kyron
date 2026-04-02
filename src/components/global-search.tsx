'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Search, BarChart3, FileText, Users, Shield, Building2, Phone, Cpu, ShoppingCart,
  Scale, Landmark, Globe, CreditCard, Settings, BookOpen, Activity, Zap,
  Calculator, Briefcase, TrendingUp, Clock, Bot, Bell, Database,
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
  { title: 'Kyron Chat IA', description: 'Asistente inteligente', href: '/kyron-chat', icon: Bot, category: 'Inteligencia Artificial', keywords: ['ia', 'chat', 'asistente', 'claude', 'ai'] },
  { title: 'Análisis Dashboard IA', description: 'Análisis inteligente de métricas', href: '/ai-dashboard', icon: Activity, category: 'Inteligencia Artificial', keywords: ['metricas', 'analisis', 'openai'] },

  { title: 'Tributos', description: 'Gestión tributaria y fiscal', href: '/contabilidad/tributos', icon: Calculator, category: 'Contabilidad', keywords: ['impuestos', 'iva', 'islr', 'fiscal', 'seniat'] },
  { title: 'Declaraciones Anteriores', description: 'Historial de declaraciones', href: '/contabilidad/tributos/declaraciones-anteriores', icon: FileText, category: 'Contabilidad', keywords: ['historial', 'declaracion'] },
  { title: 'Aportes Parafiscales', description: 'IVSS, INCES, BANAVIH, FAO', href: '/contabilidad/tributos/aportes-parafiscales', icon: Landmark, category: 'Contabilidad', keywords: ['ivss', 'inces', 'banavih', 'parafiscal'] },
  { title: 'Certificaciones Empresa', description: 'Documentos corporativos', href: '/contabilidad/certificaciones/empresa', icon: Shield, category: 'Contabilidad', keywords: ['certificado', 'documento'] },
  { title: 'CONATEL', description: 'Trámites telecomunicaciones', href: '/contabilidad/conatel', icon: Globe, category: 'Contabilidad', keywords: ['conatel', 'licencia', 'telecom'] },
  { title: 'Reportes', description: 'Generación de informes', href: '/reportes', icon: FileText, category: 'Contabilidad', keywords: ['informe', 'reporte', 'pdf', 'excel'] },
  { title: 'Arqueo de Caja', description: 'Cierre y conciliación', href: '/arqueo-caja', icon: CreditCard, category: 'Contabilidad', keywords: ['caja', 'cierre', 'conciliacion', 'efectivo'] },
  { title: 'Activos Inmobiliarios', description: 'Registro de propiedades', href: '/activos-inmobiliarios', icon: Building2, category: 'Contabilidad', keywords: ['propiedad', 'inmueble', 'activo'] },

  { title: 'Nómina', description: 'Gestión de nómina', href: '/nomina', icon: Users, category: 'Recursos Humanos', keywords: ['salario', 'pago', 'empleado', 'sueldo'] },
  { title: 'Talento Humano', description: 'Gestión de personal', href: '/talento-humano', icon: Users, category: 'Recursos Humanos', keywords: ['personal', 'rrhh', 'empleados'] },
  { title: 'Clima Organizacional', description: 'Bienestar del equipo', href: '/clima-organizacional', icon: Activity, category: 'Recursos Humanos', keywords: ['bienestar', 'encuesta', 'evaluacion'] },
  { title: 'Protección y Pensiones', description: 'Beneficios laborales', href: '/proteccion-pensiones', icon: Shield, category: 'Recursos Humanos', keywords: ['pension', 'seguro', 'beneficio'] },

  { title: 'Escritorio Jurídico', description: 'Gestión legal corporativa', href: '/escritorio-juridico', icon: Scale, category: 'Legal', keywords: ['legal', 'abogado', 'juridico'] },
  { title: 'Contratos', description: 'Administración de contratos', href: '/contratos', icon: FileText, category: 'Legal', keywords: ['contrato', 'acuerdo', 'clausula'] },
  { title: 'Gaceta Oficial', description: 'Monitor regulatorio', href: '/gaceta-oficial', icon: BookOpen, category: 'Legal', keywords: ['gaceta', 'regulacion', 'decreto'] },

  { title: 'Mi Línea', description: 'Gestión de línea móvil', href: '/mi-linea', icon: Phone, category: 'Telecom', keywords: ['telefono', 'movil', 'celular', 'plan'] },
  { title: 'Flota Empresarial', description: 'Control de flota corporativa', href: '/flota-empresarial', icon: Phone, category: 'Telecom', keywords: ['flota', 'corporativo', 'lineas'] },
  { title: 'Facturación Corporativa', description: 'Facturas de telecomunicaciones', href: '/facturacion-corporativa', icon: CreditCard, category: 'Telecom', keywords: ['factura', 'pago', 'consumo'] },
  { title: 'eSIM', description: 'Gestión de eSIM digital', href: '/esim', icon: Cpu, category: 'Telecom', keywords: ['esim', 'digital', 'sim'] },

  { title: 'Seguridad IT', description: 'Ciberseguridad y firewall', href: '/seguridad', icon: Shield, category: 'Informática', keywords: ['firewall', 'seguridad', 'vulnerabilidad'] },
  { title: 'Respaldos', description: 'Backup y recuperación', href: '/respaldos', icon: Database, category: 'Informática', keywords: ['backup', 'respaldo', 'recuperacion'] },
  { title: 'Dashboard IT', description: 'Monitoreo de infraestructura', href: '/dashboard-it', icon: Cpu, category: 'Informática', keywords: ['servidor', 'monitor', 'sistema'] },

  { title: 'Estrategias de Ventas', description: 'Planificación comercial', href: '/estrategias-ventas', icon: TrendingUp, category: 'Ventas', keywords: ['venta', 'estrategia', 'comercial'] },
  { title: 'Inventario', description: 'Control de inventario', href: '/inventario', icon: ShoppingCart, category: 'Ventas', keywords: ['producto', 'stock', 'almacen'] },
  { title: 'Marketing', description: 'Campañas y publicidad', href: '/marketing', icon: Briefcase, category: 'Ventas', keywords: ['campaña', 'publicidad', 'promocion'] },

  { title: 'Mercado Eco-créditos', description: 'Créditos de carbono', href: '/mercado-ecocreditos', icon: Globe, category: 'Sostenibilidad', keywords: ['carbono', 'eco', 'verde', 'sostenible'] },
];

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  const filtered = query.trim()
    ? SEARCH_ITEMS.filter(item => {
        const q = query.toLowerCase();
        return item.title.toLowerCase().includes(q) ||
               item.description.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q) ||
               item.keywords.some(k => k.includes(q));
      })
    : SEARCH_ITEMS;

  const grouped = filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(grouped).flat();

  const navigate = useCallback((item: SearchItem) => {
    setOpen(false);
    router.push(`/es${item.href}`);
  }, [router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, flatFiltered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatFiltered[selectedIndex]) {
      navigate(flatFiltered[selectedIndex]);
    }
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  let globalIndex = -1;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 h-9 px-3 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted/80 transition-all text-muted-foreground text-xs cursor-pointer group"
      >
        <Search className="h-3.5 w-3.5 opacity-50 group-hover:opacity-80 transition-opacity" />
        <span className="hidden md:inline text-[10px] font-medium">Buscar...</span>
        <kbd className="hidden md:inline-flex h-5 items-center gap-0.5 rounded border border-border/60 bg-background/80 px-1.5 font-mono text-[9px] font-bold text-muted-foreground/60">
          ⌘K
        </kbd>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[560px] p-0 rounded-2xl border-border/30 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden gap-0">
          <div className="flex items-center gap-3 px-4 border-b border-border/30">
            <Search className="h-4 w-4 text-muted-foreground/50 shrink-0" />
            <Input
              ref={inputRef}
              placeholder="Buscar módulos, páginas, funciones..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-12 border-0 bg-transparent text-sm font-medium placeholder:text-muted-foreground/40 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <kbd className="shrink-0 h-5 flex items-center rounded border border-border/50 bg-muted/30 px-1.5 font-mono text-[9px] text-muted-foreground/50">
              ESC
            </kbd>
          </div>
          
          <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2 scroll-smooth">
            {flatFiltered.length === 0 ? (
              <div className="py-12 text-center">
                <Search className="h-8 w-8 text-muted-foreground/20 mx-auto mb-3" />
                <p className="text-sm font-medium text-muted-foreground/60">Sin resultados para &ldquo;{query}&rdquo;</p>
              </div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category}>
                  <p className="px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/40">{category}</p>
                  {items.map(item => {
                    globalIndex++;
                    const idx = globalIndex;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.href}
                        data-index={idx}
                        onClick={() => navigate(item)}
                        className={cn(
                          'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all',
                          idx === selectedIndex
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted/50 text-foreground'
                        )}
                      >
                        <div className={cn(
                          'h-8 w-8 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                          idx === selectedIndex ? 'bg-primary/15' : 'bg-muted/40'
                        )}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">{item.title}</p>
                          <p className="text-[10px] text-muted-foreground/60 truncate">{item.description}</p>
                        </div>
                        {idx === selectedIndex && (
                          <kbd className="shrink-0 text-[9px] text-primary/50 font-mono">↵</kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          <div className="flex items-center gap-4 px-4 py-2 border-t border-border/20 bg-muted/5">
            <span className="flex items-center gap-1 text-[9px] text-muted-foreground/40">
              <kbd className="px-1 rounded border border-border/40 bg-muted/30 font-mono text-[8px]">↑↓</kbd> navegar
            </span>
            <span className="flex items-center gap-1 text-[9px] text-muted-foreground/40">
              <kbd className="px-1 rounded border border-border/40 bg-muted/30 font-mono text-[8px]">↵</kbd> abrir
            </span>
            <span className="flex items-center gap-1 text-[9px] text-muted-foreground/40">
              <kbd className="px-1 rounded border border-border/40 bg-muted/30 font-mono text-[8px]">esc</kbd> cerrar
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
