"use client";

import { useEffect, useCallback } from "react";

export type ModuleContext = "natural" | "admin" | "ventas" | "legal" | "socios" | "informatica" | "telecom" | "hr" | "sostenibilidad";

const STORAGE_KEY = "kyron_module_context";

const SHARED_PAGES = [
  "/tarjeta-digital",
  "/perfil",
  "/seguridad-cuenta",
  "/notificaciones",
  "/configuracion",
  "/actividad",
];

export function isSharedPage(pathname: string): boolean {
  return SHARED_PAGES.some(p => pathname.includes(p));
}

export function setModuleContext(ctx: ModuleContext) {
  if (typeof window !== "undefined") {
    try { sessionStorage.setItem(STORAGE_KEY, ctx); } catch {}
  }
}

export function getModuleContext(): ModuleContext {
  if (typeof window !== "undefined") {
    try { return (sessionStorage.getItem(STORAGE_KEY) as ModuleContext) || "natural"; } catch {}
  }
  return "natural";
}

export function useSetModuleContext(ctx: ModuleContext) {
  useEffect(() => {
    setModuleContext(ctx);
  }, [ctx]);
}
