"use client";

import { useState, useEffect } from "react";
import { Link } from "@/navigation";
import { ArrowLeft } from "lucide-react";
import { getModuleContext, type ModuleContext } from "@/lib/module-context";

const DASHBOARD_MAP: Record<ModuleContext, { href: string; label: string }> = {
  natural: { href: "/dashboard", label: "Dashboard" },
  admin: { href: "/dashboard-empresa", label: "Dashboard Empresarial" },
  ventas: { href: "/estrategias-ventas", label: "Ventas" },
  legal: { href: "/escritorio-juridico", label: "Escritorio Jurídico" },
  socios: { href: "/dashboard-socios", label: "Socios" },
  informatica: { href: "/dashboard-it", label: "Informática" },
  telecom: { href: "/dashboard-telecom", label: "Telecom" },
  hr: { href: "/dashboard-rrhh", label: "Talento Humano" },
  sostenibilidad: { href: "/sostenibilidad", label: "Sostenibilidad" },
};

export function BackToDashboard({ fallbackHref, fallbackLabel, className }: {
  fallbackHref?: string;
  fallbackLabel?: string;
  className?: string;
}) {
  const [target, setTarget] = useState<{ href: string; label: string }>({
    href: fallbackHref || "/dashboard",
    label: fallbackLabel || "Dashboard",
  });

  useEffect(() => {
    const ctx = getModuleContext();
    const mapped = DASHBOARD_MAP[ctx];
    if (mapped) setTarget(mapped);
  }, []);

  return (
    <Link
      href={target.href as any}
      className={className || "inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"}
    >
      <ArrowLeft className="h-3.5 w-3.5" /> Volver a {target.label}
    </Link>
  );
}
