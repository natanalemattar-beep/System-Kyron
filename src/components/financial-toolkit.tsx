'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Calculator, DollarSign, ArrowRightLeft, Percent, X,
  TrendingUp, RefreshCw, Copy, Check, ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type TabId = 'converter' | 'iva' | 'igtf' | 'islr';

interface BcvRate {
  rate: number;
  date: string;
  loading: boolean;
}

export function FinancialToolkit() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<TabId>('converter');
  const [bcv, setBcv] = useState<BcvRate>({ rate: 0, date: '', loading: true });
  const [copied, setCopied] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const [usdAmount, setUsdAmount] = useState('');
  const [vesAmount, setVesAmount] = useState('');
  const [direction, setDirection] = useState<'usd-ves' | 'ves-usd'>('usd-ves');

  const [ivaBase, setIvaBase] = useState('');
  const [ivaRate] = useState(16);

  const [igtfAmount, setIgtfAmount] = useState('');
  const [igtfRate] = useState(3);

  const [islrBase, setIslrBase] = useState('');
  const [islrType, setIslrType] = useState<'servicios' | 'honorarios' | 'comisiones' | 'alquiler'>('servicios');

  const islrRates: Record<string, { rate: number; label: string }> = {
    servicios: { rate: 5, label: 'Servicios (5%)' },
    honorarios: { rate: 3, label: 'Honorarios Profesionales (3%)' },
    comisiones: { rate: 5, label: 'Comisiones (5%)' },
    alquiler: { rate: 5, label: 'Alquiler Inmuebles (5%)' },
  };

  const fetchBcvRate = useCallback(async () => {
    setBcv(prev => ({ ...prev, loading: true }));
    try {
      const res = await fetch('/api/bcv-rate');
      if (res.ok) {
        const data = await res.json();
        setBcv({ rate: data.rate || 0, date: data.date || '', loading: false });
      } else {
        setBcv(prev => ({ ...prev, loading: false }));
      }
    } catch {
      setBcv(prev => ({ ...prev, loading: false }));
    }
  }, []);

  useEffect(() => {
    if (open && bcv.rate === 0) fetchBcvRate();
  }, [open, bcv.rate, fetchBcvRate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'j') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const copyToClipboard = (value: string, key: string) => {
    navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  const formatNumber = (n: number) => n.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const rateAvailable = bcv.rate > 0;
  const convertedUsd = direction === 'usd-ves'
    ? (parseFloat(usdAmount || '0') * bcv.rate)
    : rateAvailable ? (parseFloat(vesAmount || '0') / bcv.rate) : 0;

  const ivaTotal = parseFloat(ivaBase || '0') * (ivaRate / 100);
  const ivaGrandTotal = parseFloat(ivaBase || '0') + ivaTotal;

  const igtfTotal = parseFloat(igtfAmount || '0') * (igtfRate / 100);
  const igtfGrandTotal = parseFloat(igtfAmount || '0') + igtfTotal;

  const islrRetention = parseFloat(islrBase || '0') * (islrRates[islrType].rate / 100);
  const islrNet = parseFloat(islrBase || '0') - islrRetention;

  const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: 'converter', label: 'USD/VES', icon: ArrowRightLeft },
    { id: 'iva', label: 'IVA', icon: Percent },
    { id: 'igtf', label: 'IGTF', icon: DollarSign },
    { id: 'islr', label: 'ISLR', icon: TrendingUp },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(prev => !prev)}
        className={cn(
          "fixed bottom-24 right-6 z-50 h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg group",
          open
            ? "bg-destructive text-destructive-foreground rotate-45"
            : "bg-gradient-to-br from-emerald-500 to-cyan-600 text-white hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/20"
        )}
        title="Calculadora Financiera (Ctrl+J)"
      >
        {open ? <X className="h-5 w-5 transition-transform" /> : <Calculator className="h-5 w-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.35 }}
            className="fixed bottom-[7rem] right-6 z-50 w-[340px] rounded-2xl border border-border/40 bg-background/95 backdrop-blur-2xl shadow-2xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 flex items-center justify-center">
                  <Calculator className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-foreground">Herramientas</p>
                  <p className="text-[9px] text-muted-foreground/60 font-medium">Calculadora Financiera VE</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {bcv.rate > 0 && (
                  <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <span className="text-[10px] font-bold text-emerald-500">BCV {formatNumber(bcv.rate)}</span>
                  </div>
                )}
                <button onClick={fetchBcvRate} className="p-1 rounded-lg hover:bg-muted/50 transition-colors" title="Actualizar tasa">
                  <RefreshCw className={cn("h-3 w-3 text-muted-foreground", bcv.loading && "animate-spin")} />
                </button>
              </div>
            </div>

            <div className="flex border-b border-border/20">
              {tabs.map(t => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={cn(
                      "flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all relative",
                      tab === t.id
                        ? "text-primary"
                        : "text-muted-foreground/50 hover:text-muted-foreground"
                    )}
                  >
                    <Icon className="h-3 w-3" />
                    {t.label}
                    {tab === t.id && (
                      <motion.div
                        layoutId="toolkit-tab"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-4 space-y-3">
              {tab === 'converter' && (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                        {direction === 'usd-ves' ? 'Monto en USD' : 'Monto en VES'}
                      </label>
                      <button
                        onClick={() => setDirection(d => d === 'usd-ves' ? 'ves-usd' : 'usd-ves')}
                        className="flex items-center gap-1 text-[9px] text-primary font-bold hover:underline"
                      >
                        <ArrowRightLeft className="h-3 w-3" />
                        Invertir
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground/50">
                        {direction === 'usd-ves' ? '$' : 'Bs.'}
                      </span>
                      <input
                        type="number"
                        value={direction === 'usd-ves' ? usdAmount : vesAmount}
                        onChange={e => direction === 'usd-ves' ? setUsdAmount(e.target.value) : setVesAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/50 bg-muted/30 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>

                  {!rateAvailable && !bcv.loading ? (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
                      <p className="text-[10px] font-bold text-amber-500">Tasa BCV no disponible</p>
                      <p className="text-[9px] text-muted-foreground/60">Presiona el botón de actualizar para reintentar</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 to-cyan-600/10 border border-emerald-500/20 space-y-1">
                      <p className="text-[9px] text-muted-foreground/60 font-medium uppercase tracking-wider">Resultado</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-black text-foreground">
                          {direction === 'usd-ves' ? 'Bs. ' : '$ '}
                          {formatNumber(convertedUsd)}
                        </p>
                        <button
                          onClick={() => copyToClipboard(formatNumber(convertedUsd), 'converter')}
                          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          {copied === 'converter' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-muted-foreground" />}
                        </button>
                      </div>
                      {bcv.date && (
                        <p className="text-[9px] text-muted-foreground/50">Tasa BCV: {formatNumber(bcv.rate)} Bs/$ · {bcv.date}</p>
                      )}
                    </div>
                  )}
                </>
              )}

              {tab === 'iva' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Base Imponible</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground/50">Bs.</span>
                      <input
                        type="number"
                        value={ivaBase}
                        onChange={e => setIvaBase(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/50 bg-muted/30 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Base Imponible</span>
                      <span className="font-bold">{formatNumber(parseFloat(ivaBase || '0'))}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">IVA ({ivaRate}%)</span>
                      <span className="font-bold text-blue-400">+ {formatNumber(ivaTotal)}</span>
                    </div>
                    <div className="border-t border-border/20 pt-2 flex justify-between items-center">
                      <span className="text-xs font-bold text-foreground">Total</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-foreground">Bs. {formatNumber(ivaGrandTotal)}</span>
                        <button onClick={() => copyToClipboard(formatNumber(ivaGrandTotal), 'iva')} className="p-1 rounded-lg hover:bg-white/10">
                          {copied === 'iva' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {tab === 'igtf' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Monto en Divisas</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground/50">$</span>
                      <input
                        type="number"
                        value={igtfAmount}
                        onChange={e => setIgtfAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/50 bg-muted/30 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Monto Operación</span>
                      <span className="font-bold">$ {formatNumber(parseFloat(igtfAmount || '0'))}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">IGTF ({igtfRate}%)</span>
                      <span className="font-bold text-amber-400">+ $ {formatNumber(igtfTotal)}</span>
                    </div>
                    <div className="border-t border-border/20 pt-2 flex justify-between items-center">
                      <span className="text-xs font-bold">Total con IGTF</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black">$ {formatNumber(igtfGrandTotal)}</span>
                        <button onClick={() => copyToClipboard(formatNumber(igtfGrandTotal), 'igtf')} className="p-1 rounded-lg hover:bg-white/10">
                          {copied === 'igtf' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                    {bcv.rate > 0 && (
                      <div className="flex justify-between text-[10px] text-muted-foreground/50 pt-1">
                        <span>Equivalente en Bs.</span>
                        <span>Bs. {formatNumber(igtfGrandTotal * bcv.rate)}</span>
                      </div>
                    )}
                  </div>
                </>
              )}

              {tab === 'islr' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tipo de Retención</label>
                    <div className="relative">
                      <select
                        value={islrType}
                        onChange={e => setIslrType(e.target.value as typeof islrType)}
                        className="w-full h-10 px-3 pr-8 rounded-xl border border-border/50 bg-muted/30 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all appearance-none"
                      >
                        {Object.entries(islrRates).map(([key, val]) => (
                          <option key={key} value={key}>{val.label}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Monto Bruto</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground/50">Bs.</span>
                      <input
                        type="number"
                        value={islrBase}
                        onChange={e => setIslrBase(e.target.value)}
                        placeholder="0.00"
                        className="w-full h-10 pl-10 pr-3 rounded-xl border border-border/50 bg-muted/30 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Monto Bruto</span>
                      <span className="font-bold">Bs. {formatNumber(parseFloat(islrBase || '0'))}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Retención ISLR ({islrRates[islrType].rate}%)</span>
                      <span className="font-bold text-violet-400">- Bs. {formatNumber(islrRetention)}</span>
                    </div>
                    <div className="border-t border-border/20 pt-2 flex justify-between items-center">
                      <span className="text-xs font-bold">Neto a Pagar</span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black">Bs. {formatNumber(islrNet)}</span>
                        <button onClick={() => copyToClipboard(formatNumber(islrNet), 'islr')} className="p-1 rounded-lg hover:bg-white/10">
                          {copied === 'islr' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="px-4 py-2 border-t border-border/20 bg-muted/5 flex items-center justify-between">
              <span className="text-[9px] text-muted-foreground/40 font-medium">
                <kbd className="px-1 rounded border border-border/40 bg-muted/30 font-mono text-[8px]">Ctrl+J</kbd> abrir/cerrar
              </span>
              <span className="text-[9px] text-muted-foreground/30 italic">System Kyron</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
