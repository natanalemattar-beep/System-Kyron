export type PerformanceTier = "high" | "medium" | "low";

export interface AnimationConfig {
  enableParticles: boolean;
  enableBlur: boolean;
  enableComplexAnimations: boolean;
  enableShadows: boolean;
  enableBackdropBlur: boolean;
  enableGradientAnimations: boolean;
  enableHoverEffects: boolean;
  enableSeasonalEffects: boolean;
  enableScrollAnimations: boolean;
  enableCountUp: boolean;
  transitionDuration: number;
  staggerDelay: number;
  maxParticles: number;
  intersectionMargin: string;
}

export interface DeviceInfo {
  tier: PerformanceTier;
  reducedMotion: boolean;
  cores: number;
  memory: number;
  isMobile: boolean;
  connectionType: string;
  gpuTier: "low" | "mid" | "high";
  dataSaver: boolean;
  score: number;
}

const HIGH_CONFIG: AnimationConfig = {
  enableParticles: false,
  enableBlur: true,
  enableComplexAnimations: true,
  enableShadows: true,
  enableBackdropBlur: true,
  enableGradientAnimations: true,
  enableHoverEffects: true,
  enableSeasonalEffects: true,
  enableScrollAnimations: true,
  enableCountUp: true,
  transitionDuration: 0.35,
  staggerDelay: 0.05,
  maxParticles: 0,
  intersectionMargin: "200px",
};

const MEDIUM_CONFIG: AnimationConfig = {
  enableParticles: false,
  enableBlur: true,
  enableComplexAnimations: false,
  enableShadows: true,
  enableBackdropBlur: false,
  enableGradientAnimations: false,
  enableHoverEffects: true,
  enableSeasonalEffects: false,
  enableScrollAnimations: true,
  enableCountUp: true,
  transitionDuration: 0.2,
  staggerDelay: 0.03,
  maxParticles: 0,
  intersectionMargin: "100px",
};

const LOW_CONFIG: AnimationConfig = {
  enableParticles: false,
  enableBlur: false,
  enableComplexAnimations: false,
  enableShadows: false,
  enableBackdropBlur: false,
  enableGradientAnimations: false,
  enableHoverEffects: false,
  enableSeasonalEffects: false,
  enableScrollAnimations: false,
  enableCountUp: false,
  transitionDuration: 0.1,
  staggerDelay: 0,
  maxParticles: 0,
  intersectionMargin: "50px",
};

let cachedTier: PerformanceTier | null = null;

function detectTier(): PerformanceTier {
  if (cachedTier) return cachedTier;
  try {
    const nav = navigator as Navigator & { deviceMemory?: number; connection?: { effectiveType?: string } };
    const cores = navigator.hardwareConcurrency || 4;
    const mem = nav.deviceMemory || 4;
    const conn = nav.connection;
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      cachedTier = "low";
      return "low";
    }

    if (cores <= 2 || mem <= 2 || isMobile) {
      cachedTier = "low";
      return "low";
    }
    if (cores <= 4 || mem <= 4 || (conn && conn.effectiveType === 'slow-2g')) {
      cachedTier = "medium";
      return "medium";
    }
    if (conn && (conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g')) {
      cachedTier = "medium";
      return "medium";
    }

    cachedTier = "high";
    return "high";
  } catch {
    cachedTier = "high";
    return "high";
  }
}

export function getAnimationConfig(tier?: PerformanceTier): AnimationConfig {
  const t = tier ?? detectTier();
  switch (t) {
    case "low": return LOW_CONFIG;
    case "medium": return MEDIUM_CONFIG;
    default: return HIGH_CONFIG;
  }
}

export function detectDevicePerformance(): DeviceInfo {
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { effectiveType?: string } };
  const tier = detectTier();
  const cores = navigator.hardwareConcurrency || 4;
  const memory = nav.deviceMemory || 4;
  const conn = nav.connection;
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let score = 12;
  if (cores >= 8) score += 2;
  if (memory >= 8) score += 2;
  if (!isMobile) score += 2;
  if (conn) {
    if (conn.effectiveType === '4g') score += 2;
    else if (conn.effectiveType === '3g') score += 1;
  }

  return {
    tier,
    reducedMotion,
    cores,
    memory,
    isMobile,
    connectionType: conn?.effectiveType || 'unknown',
    gpuTier: isMobile ? "mid" : "high",
    dataSaver: false,
    score,
  };
}

export function clearPerformanceCache() {
  cachedTier = null;
}
