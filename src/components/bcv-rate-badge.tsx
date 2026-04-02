'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BcvRateBadge() {
  const [rate, setRate] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [lastDate, setLastDate] = useState('');

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('/api/bcv-rate');
        if (res.ok) {
          const data = await res.json();
          setRate(data.rate || 0);
          setLastDate(data.date || '');
        }
      } catch {} finally {
        setLoading(false);
      }
    };

    fetchRate();
    const interval = setInterval(fetchRate, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || rate === 0) return null;

  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 cursor-default group" title={`Tasa BCV: ${rate.toLocaleString('es-VE', { minimumFractionDigits: 2 })} Bs/$ · ${lastDate}`}>
      <TrendingUp className="h-3 w-3 text-emerald-500" />
      <span className="text-[10px] font-bold text-emerald-500">
        {rate.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </span>
      <span className="text-[8px] text-emerald-500/60 font-medium">Bs/$</span>
    </div>
  );
}
