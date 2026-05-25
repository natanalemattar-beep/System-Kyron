"use client";

import { useTheme } from "next-themes";

export function DynamicBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed inset-0 -z-50 h-full w-full overflow-hidden bg-background pointer-events-none">

      {/* Top gradient ambient */}
      <div className="absolute -top-[10%] -left-[5%] w-[60vw] h-[60vw] bg-blue-600/[0.04] blur-[100px] rounded-full" />

      {/* Bottom gradient ambient */}
      <div className="absolute -bottom-[10%] -right-[5%] w-[50vw] h-[50vw] bg-emerald-600/[0.04] blur-[100px] rounded-full" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/80" />

      {/* Signal lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-kyron-cyan/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/[0.06] to-transparent" />
    </div>
  );
}
