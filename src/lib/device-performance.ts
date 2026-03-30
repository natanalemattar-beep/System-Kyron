"use client";

export type PerformanceTier = "high" | "medium" | "low";

interface DeviceInfo {
  tier: PerformanceTier;
  reducedMotion: boolean;
  cores: number;
  memory: number;
  isMobile: boolean;
  connectionType: string;
}

export function detectDevicePerformance(): DeviceInfo {
  if (typeof window === "undefined") {
    return { tier: "high", reducedMotion: false, cores: 8, memory: 8, isMobile: false, connectionType: "4g" };
  }

  const nav = navigator as any;
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory || 4;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const connectionType = nav.connection?.effectiveType || "4g";

  let score = 0;
  if (cores >= 6) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;

  if (memory >= 6) score += 3;
  else if (memory >= 3) score += 2;
  else score += 1;

  if (connectionType === "4g") score += 2;
  else if (connectionType === "3g") score += 1;

  if (reducedMotion) score -= 2;

  let tier: PerformanceTier;
  if (score >= 7) tier = "high";
  else if (score >= 4) tier = "medium";
  else tier = "low";

  return { tier, reducedMotion, cores, memory, isMobile, connectionType };
}

export function getAnimationConfig(tier: PerformanceTier) {
  switch (tier) {
    case "high":
      return {
        enableParticles: true,
        enableBlur: true,
        enableComplexAnimations: true,
        transitionDuration: 0.4,
        staggerDelay: 0.06,
        maxParticles: 6,
      };
    case "medium":
      return {
        enableParticles: true,
        enableBlur: true,
        enableComplexAnimations: false,
        transitionDuration: 0.3,
        staggerDelay: 0.04,
        maxParticles: 3,
      };
    case "low":
      return {
        enableParticles: false,
        enableBlur: false,
        enableComplexAnimations: false,
        transitionDuration: 0.15,
        staggerDelay: 0,
        maxParticles: 0,
      };
  }
}
