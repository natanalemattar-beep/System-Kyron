export type PerformanceTier = "high" | "medium" | "low";

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

const CACHE_KEY = "kyron-perf-v2";
const CACHE_TTL = 12 * 60 * 60 * 1000;

function getCached(): PerformanceTier | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { tier, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return tier as PerformanceTier;
  } catch {
    return null;
  }
}

function setCache(tier: PerformanceTier) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ tier, ts: Date.now() }));
  } catch {}
}

function detectGpu(): "low" | "mid" | "high" {
  try {
    const c = document.createElement("canvas");
    const gl =
      (c.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (c.getContext("webgl") as WebGLRenderingContext | null);
    if (!gl) return "low";

    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (ext) {
      const r = (gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string).toLowerCase();
      if (r.includes("swiftshader") || r.includes("llvmpipe") || r.includes("software") || r.includes("microsoft basic")) return "low";
      if (r.includes("nvidia") || r.includes("radeon rx") || r.includes("radeon pro") || r.includes("apple m") || r.includes("apple gpu")) return "high";
    }

    const maxTex = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    if (maxTex >= 16384) return "high";
    if (maxTex >= 8192) return "mid";
    return "low";
  } catch {
    return "mid";
  }
}

export function detectDevicePerformance(): DeviceInfo {
  if (typeof window === "undefined") {
    return { tier: "high", reducedMotion: false, cores: 8, memory: 8, isMobile: false, connectionType: "4g", gpuTier: "high", dataSaver: false, score: 12 };
  }

  const nav = navigator as any;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || ("ontouchstart" in window && window.innerWidth < 768);
  const conn = nav.connection;
  const dataSaver = conn?.saveData === true;

  if (reducedMotion || dataSaver) {
    return { tier: "low", reducedMotion, cores: nav.hardwareConcurrency || 2, memory: nav.deviceMemory || 2, isMobile, connectionType: conn?.effectiveType || "4g", gpuTier: "low", dataSaver, score: 0 };
  }

  const cached = getCached();
  const cores = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory || 4;
  const connectionType = conn?.effectiveType || "4g";
  const gpuTier = detectGpu();

  if (cached) {
    return { tier: cached, reducedMotion, cores, memory, isMobile, connectionType, gpuTier, dataSaver, score: cached === "high" ? 12 : cached === "medium" ? 6 : 2 };
  }

  let score = 0;

  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else score += 1;

  if (memory >= 8) score += 3;
  else if (memory >= 4) score += 2;
  else if (memory >= 2) score += 1;
  else score += 0;

  if (gpuTier === "high") score += 3;
  else if (gpuTier === "mid") score += 2;
  else score += 0;

  if (connectionType === "4g") score += 2;
  else if (connectionType === "3g") score += 1;
  else score -= 1;

  if (conn && typeof conn.downlink === "number") {
    if (conn.downlink >= 10) score += 1;
    else if (conn.downlink < 1.5) score -= 1;
  }

  const dpr = window.devicePixelRatio || 1;
  if (dpr >= 3) score -= 1;

  if (isMobile && window.innerWidth < 640) score -= 1;

  let tier: PerformanceTier;
  if (score >= 8) tier = "high";
  else if (score >= 5) tier = "medium";
  else tier = "low";

  setCache(tier);

  return { tier, reducedMotion, cores, memory, isMobile, connectionType, gpuTier, dataSaver, score };
}

export function getAnimationConfig(tier: PerformanceTier): AnimationConfig {
  switch (tier) {
    case "high":
      return {
        enableParticles: true,
        enableBlur: true,
        enableComplexAnimations: true,
        enableShadows: true,
        enableBackdropBlur: true,
        enableGradientAnimations: true,
        enableHoverEffects: true,
        enableSeasonalEffects: true,
        enableScrollAnimations: true,
        enableCountUp: true,
        transitionDuration: 0.4,
        staggerDelay: 0.06,
        maxParticles: 6,
        intersectionMargin: "400px",
      };
    case "medium":
      return {
        enableParticles: false,
        enableBlur: false,
        enableComplexAnimations: false,
        enableShadows: true,
        enableBackdropBlur: false,
        enableGradientAnimations: false,
        enableHoverEffects: true,
        enableSeasonalEffects: false,
        enableScrollAnimations: true,
        enableCountUp: true,
        transitionDuration: 0.25,
        staggerDelay: 0.03,
        maxParticles: 0,
        intersectionMargin: "200px",
      };
    case "low":
      return {
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
        transitionDuration: 0,
        staggerDelay: 0,
        maxParticles: 0,
        intersectionMargin: "100px",
      };
  }
}

export type FpsCallback = (avgFps: number) => void;

export function createFpsMonitor(onResult: FpsCallback, opts?: { sampleFrames?: number; warmupMs?: number }) {
  const sampleFrames = opts?.sampleFrames ?? 90;
  const warmupMs = opts?.warmupMs ?? 2000;
  let frameCount = 0;
  let startTime = 0;
  let rafId = 0;
  let warmupDone = false;
  let warmupStart = 0;
  let stopped = false;

  function frame(now: number) {
    if (stopped) return;

    if (!warmupDone) {
      if (!warmupStart) warmupStart = now;
      if (now - warmupStart < warmupMs) {
        rafId = requestAnimationFrame(frame);
        return;
      }
      warmupDone = true;
      startTime = now;
      frameCount = 0;
    }

    frameCount++;

    if (frameCount >= sampleFrames) {
      const elapsed = now - startTime;
      const avgFps = Math.round((frameCount / elapsed) * 1000);
      onResult(avgFps);
      stopped = true;
      return;
    }

    rafId = requestAnimationFrame(frame);
  }

  rafId = requestAnimationFrame(frame);

  return () => {
    stopped = true;
    cancelAnimationFrame(rafId);
  };
}

export function clearPerformanceCache() {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {}
}
