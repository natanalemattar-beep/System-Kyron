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

const OPTIMIZED_CONFIG: AnimationConfig = {
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

export function getAnimationConfig(_tier?: PerformanceTier): AnimationConfig {
  return OPTIMIZED_CONFIG;
}

export function detectDevicePerformance(): DeviceInfo {
  return {
    tier: "high",
    reducedMotion: false,
    cores: 8,
    memory: 8,
    isMobile: false,
    connectionType: "4g",
    gpuTier: "high",
    dataSaver: false,
    score: 12,
  };
}

export function clearPerformanceCache() {}
