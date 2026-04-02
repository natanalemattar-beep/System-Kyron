'use client';

import { useState, useEffect } from 'react';
import {
  Activity, LogIn, FileText, Shield, Bell, Upload, Eye,
  Settings, CreditCard, UserCheck, Clock, RefreshCw, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ActivityItem {
  id: number;
  evento: string;
  descripcion: string;
  categoria: string;
  creado_en: string;
}

const eventIcons: Record<string, { icon: React.ElementType; color: string }> = {
  LOGIN: { icon: LogIn, color: 'text-emerald-500 bg-emerald-500/10' },
  LOGIN_FALLIDO: { icon: Shield, color: 'text-red-500 bg-red-500/10' },
  REGISTRO: { icon: UserCheck, color: 'text-blue-500 bg-blue-500/10' },
  UPLOAD: { icon: Upload, color: 'text-violet-500 bg-violet-500/10' },
  DOCUMENT_VIEW: { icon: Eye, color: 'text-cyan-500 bg-cyan-500/10' },
  SETTINGS: { icon: Settings, color: 'text-amber-500 bg-amber-500/10' },
  PAYMENT: { icon: CreditCard, color: 'text-green-500 bg-green-500/10' },
  NOTIFICATION: { icon: Bell, color: 'text-orange-500 bg-orange-500/10' },
  DOCUMENT: { icon: FileText, color: 'text-sky-500 bg-sky-500/10' },
};

function getEventMeta(evento: string) {
  return eventIcons[evento] || { icon: Activity, color: 'text-muted-foreground bg-muted/50' };
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Ahora mismo';
  if (diffMin < 60) return `Hace ${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `Hace ${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `Hace ${diffDay}d`;
  return date.toLocaleDateString('es-VE', { day: '2-digit', month: 'short' });
}

export function ActivityTimeline({ limit = 8 }: { limit?: number }) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async () => {
    try {
      const res = await fetch(`/api/activity-log?limit=${limit}`);
      if (res.ok) {
        const data = await res.json();
        setActivities(data.logs || []);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
    const interval = setInterval(fetchActivities, 60000);
    return () => clearInterval(interval);
  }, [limit]);

  return (
    <div className="rounded-2xl border border-border/30 bg-card/50 backdrop-blur-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-foreground">Actividad Reciente</h3>
            <p className="text-[10px] text-muted-foreground/60">Timeline de tu cuenta</p>
          </div>
        </div>
        <button onClick={() => { setLoading(true); fetchActivities(); }} className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
          <RefreshCw className={cn("h-3.5 w-3.5 text-muted-foreground", loading && "animate-spin")} />
        </button>
      </div>

      <div className="divide-y divide-border/10">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="px-5 py-3 flex items-start gap-3 animate-pulse">
              <div className="h-8 w-8 rounded-lg bg-muted/50 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 bg-muted/50 rounded" />
                <div className="h-2 w-1/2 bg-muted/30 rounded" />
              </div>
            </div>
          ))
        ) : activities.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Clock className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
            <p className="text-xs text-muted-foreground/50 font-medium">Sin actividad registrada</p>
          </div>
        ) : (
          activities.map((item, i) => {
            const meta = getEventMeta(item.evento);
            const Icon = meta.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-5 py-3 flex items-start gap-3 hover:bg-muted/20 transition-colors group"
              >
                <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", meta.color)}>
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-foreground truncate">{item.descripcion}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground/50 font-medium">{timeAgo(item.creado_en)}</span>
                    <span className="text-[8px] text-muted-foreground/30">•</span>
                    <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider font-bold">{item.categoria}</span>
                  </div>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
