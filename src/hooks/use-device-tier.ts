"use client";

import { useState, useEffect, createContext, useContext } from "react";

export type DeviceTier = "low" | "mid" | "high";

export interface DeviceProfile {
  tier: DeviceTier;
  cores: number;
  memory: number;
  gpu: "low" | "mid" | "high";
  connection: "slow" | "mid" | "fast";
  dpr: number;
  refreshRate: "low" | "standard" | "high";
  screen: "small" | "medium" | "large";
  ready: boolean;
}

function detectGpuTier(): "low" | "mid" | "high" {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl2") as WebGL2RenderingContext | null) ||
      (canvas.getContext("webgl") as WebGLRenderingContext | null);
    if (!gl) return "low";

    const ext = gl.getExtension("WEBGL_debug_renderer_info");
    if (ext) {
      const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
      const lower = renderer.toLowerCase();
      if (
        lower.includes("swiftshader") ||
        lower.includes("llvmpipe") ||
        lower.includes("software") ||
        lower.includes("microsoft basic")
      ) {
        return "low";
      }
      if (
        lower.includes("nvidia") ||
        lower.includes("radeon rx") ||
        lower.includes("radeon pro") ||
        lower.includes("apple m") ||
        lower.includes("apple gpu")
      ) {
        return "high";
      }
    }

    const maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
    if (maxTextureSize >= 16384) return "high";
    if (maxTextureSize >= 8192) return "mid";
    return "low";
  } catch {
    return "mid";
  }
}

function detectConnection(): "slow" | "mid" | "fast" {
  const conn = (navigator as any).connection;
  if (!conn) return "fast";
  const ect = conn.effectiveType;
  if (ect === "slow-2g" || ect === "2g") return "slow";
  if (ect === "3g") return "mid";
  if (typeof conn.downlink === "number" && conn.downlink < 1) return "slow";
  if (typeof conn.downlink === "number" && conn.downlink < 5) return "mid";
  return "fast";
}

function detectRefreshRate(): "low" | "standard" | "high" {
  if (typeof window === "undefined") return "standard";
  if ((window.screen as any).refreshRate) {
    const rate = (window.screen as any).refreshRate;
    if (rate >= 90) return "high";
    if (rate >= 50) return "standard";
    return "low";
  }
  if (window.matchMedia("(update: fast)").matches) return "high";
  if (window.matchMedia("(update: slow)").matches) return "low";
  return "standard";
}

function detectScreen(): "small" | "medium" | "large" {
  const w = window.innerWidth;
  if (w < 640) return "small";
  if (w < 1280) return "medium";
  return "large";
}

function computeTier(profile: Omit<DeviceProfile, "tier" | "ready">): DeviceTier {
  let score = 0;

  if (profile.cores >= 8) score += 3;
  else if (profile.cores >= 4) score += 2;
  else score += 0;

  if (profile.memory >= 8) score += 3;
  else if (profile.memory >= 4) score += 2;
  else if (profile.memory >= 2) score += 1;

  if (profile.gpu === "high") score += 3;
  else if (profile.gpu === "mid") score += 2;
  else score += 0;

  if (profile.connection === "fast") score += 1;
  else if (profile.connection === "slow") score -= 1;

  if (profile.dpr >= 3) score -= 1;

  if (score >= 7) return "high";
  if (score >= 4) return "mid";
  return "low";
}

const DEFAULT_PROFILE: DeviceProfile = {
  tier: "low",
  cores: 2,
  memory: 2,
  gpu: "low",
  connection: "mid",
  dpr: 1,
  refreshRate: "standard",
  screen: "medium",
  ready: false,
};

const DeviceTierContext = createContext<DeviceProfile>(DEFAULT_PROFILE);

export const DeviceTierProvider = DeviceTierContext.Provider;

export function useDeviceTierContext(): DeviceProfile {
  return useContext(DeviceTierContext);
}

export function useDeviceTier(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 4;
    const memory = (navigator as any).deviceMemory || 4;
    const gpu = detectGpuTier();
    const connection = detectConnection();
    const dpr = window.devicePixelRatio || 1;
    const refreshRate = detectRefreshRate();
    const screen = detectScreen();

    const partial = { cores, memory, gpu, connection, dpr, refreshRate, screen };
    const tier = computeTier(partial);

    setProfile({ ...partial, tier, ready: true });

    const handleResize = () => {
      setProfile((prev) => ({
        ...prev,
        screen: detectScreen(),
      }));
    };

    const handleConnection = () => {
      const newConn = detectConnection();
      setProfile((prev) => {
        const updated = { ...prev, connection: newConn };
        return { ...updated, tier: computeTier(updated) };
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    const conn = (navigator as any).connection;
    if (conn) {
      conn.addEventListener("change", handleConnection);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (conn) {
        conn.removeEventListener("change", handleConnection);
      }
    };
  }, []);

  return profile;
}
