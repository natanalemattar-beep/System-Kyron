'use client';

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Users, Building2, ShieldCheck, ArrowRight, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

interface SiteStats {
  totalUsuarios: number;
  totalEmpresas: number;
}

function useAnimatedNumber(value: number, duration = 1200) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (value === 0) { setDisplay(0); return; }
    const start = Date.now();
    const startVal = display;
    const diff = value - startVal;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + diff * ease));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);
  return display;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
  border,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  bg: string;
  border: string;
}) {
  const animated = useAnimatedNumber(value);

  return (
    <motion.div
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 17 } }}
      className={cn(
        "relative flex flex-col gap-2 p-5 rounded-2xl border bg-gradient-to-br overflow-hidden cursor-default group",
        bg, border
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className={cn("p-1.5 rounded-lg bg-black/10 dark:bg-black/20 w-fit", color)}>
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className={cn("text-3xl font-black leading-none tracking-tight tabular-nums", color)}>
          {animated.toLocaleString()}
        </p>
        <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mt-1.5 leading-tight">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

export function LiveStatsPanel() {
  const t = useTranslations("LiveStats");
  const [stats, setStats] = useState<SiteStats>({
    totalUsuarios: 0,
    totalEmpresas: 0,
  });

  const compliance = [
    t("ven_nif"),
    t("seniat"),
    t("igtf"),
    t("lottt"),
    t("lopcymat"),
    t("gazette"),
  ];

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/stats', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setStats({
          totalUsuarios: data.totalUsuarios ?? 0,
          totalEmpresas: data.totalEmpresas ?? 0,
        });
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  return (
    <div className="space-y-3">
      <div className="glass-liquid rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5">

        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/30 dark:border-white/[0.06] bg-muted/20 dark:bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
              <motion.div animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-muted-foreground/60">
              {t("topbar")}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[7px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400/80">{t("live")}</span>
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-3">
          <StatCard
            icon={Users}
            label={t("individuals")}
            value={stats.totalUsuarios}
            color="text-violet-600 dark:text-violet-400"
            bg="from-violet-500/10 to-violet-500/5"
            border="border-violet-500/20"
          />
          <StatCard
            icon={Building2}
            label={t("companies")}
            value={stats.totalEmpresas}
            color="text-amber-600 dark:text-amber-400"
            bg="from-amber-500/10 to-amber-500/5"
            border="border-amber-500/20"
          />
        </div>

        <div className="px-4 pb-4 border-t border-border/20 dark:border-white/[0.05] pt-3">
          <p className="text-[7px] font-black uppercase tracking-[0.3em] text-muted-foreground/40 mb-2.5">
            {t("frameworks")}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {compliance.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/8 border border-primary/12 text-[7px] font-black uppercase tracking-widest text-primary/70 hover:bg-primary/12 hover:border-primary/20 transition-all duration-300"
              >
                <CheckCircle2 className="h-2.5 w-2.5" />
                {c}
              </span>
            ))}
          </div>
        </div>

        <Link href="/register" className="block group">
          <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-primary/8 to-transparent border-t border-primary/10 hover:from-primary/15 transition-all duration-300">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-primary leading-none">
                  {t("join")}
                </p>
                <p className="text-[7px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-0.5">
                  {t("join_sub")}
                </p>
              </div>
            </div>
            <ArrowRight className="h-3.5 w-3.5 text-primary group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: t("modules"), value: "12+" },
          { label: t("tables"), value: "42+" },
          { label: t("compliance"), value: "100%" },
          { label: t("bcv"), value: "✓" },
        ].map((cap, i) => (
          <motion.div
            key={cap.label}
            whileHover={{ y: -2, transition: { type: "spring", stiffness: 400, damping: 17 } }}
            className="flex flex-col gap-1 p-3 rounded-2xl border border-border/30 dark:border-white/[0.06] bg-card/40 dark:bg-card/20 backdrop-blur-xl text-center hover:border-primary/25 transition-all duration-300 cursor-default"
          >
            <p className="text-sm font-black text-primary leading-none">{cap.value}</p>
            <p className="text-[7px] font-bold text-muted-foreground/50 uppercase tracking-wide leading-tight line-clamp-2">
              {cap.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
