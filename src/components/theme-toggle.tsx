"use client"

import { useTheme } from "next-themes"
import { useEffect, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

function mutateThemeDom(next: "light" | "dark") {
  const html = document.documentElement;
  html.classList.remove("light", "dark");
  html.classList.add(next);
  html.style.colorScheme = next;
}

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggle = useCallback(() => {
    const isDark = resolvedTheme === "dark";
    const next = isDark ? "light" : "dark" as const;
    const html = document.documentElement;

    if (typeof document.startViewTransition === "function") {
      html.classList.add("vt-fade", "theme-switching");
      let transition: ViewTransition;
      try {
        transition = document.startViewTransition(() => {
          mutateThemeDom(next);
          setTheme(next);
        });
      } catch {
        mutateThemeDom(next);
        setTheme(next);
        html.classList.remove("vt-fade", "theme-switching");
        return;
      }
      transition.finished.finally(() => {
        html.classList.remove("vt-fade", "theme-switching");
      });
    } else {
      html.classList.add("theme-switching");
      mutateThemeDom(next);
      setTheme(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          html.classList.remove("theme-switching");
        });
      });
    }
  }, [resolvedTheme, setTheme]);

  if (!mounted) {
    return (
      <button className="relative h-8 w-8 rounded-xl border border-border/40 bg-muted/30" aria-hidden />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={toggle}
      className={cn(
        "relative h-8 w-8 rounded-xl border overflow-hidden",
        "transition-all duration-500 ease-out",
        "hover:scale-110 active:scale-95",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60",
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
          : "border-border/40 bg-muted/30 hover:bg-muted/60 hover:border-border/60"
      )}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={cn(
          "absolute transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
          isDark ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
        )}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        </div>
        <div className={cn(
          "absolute transition-all duration-500 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)]",
          isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
        )}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-300">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
