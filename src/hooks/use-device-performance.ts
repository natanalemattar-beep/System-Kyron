"use client";

import { useState, useEffect, useRef, createContext, useContext } from "react";
import {
  detectDevicePerformance,
  getAnimationConfig,
  createFpsMonitor,
  clearPerformanceCache,
  type PerformanceTier,
  type AnimationConfig,
} from "@/lib/device-performance";

export interface DevicePerformanceState {
  tier: PerformanceTier;
  isMobile: boolean;
  ready: boolean;
  config: AnimationConfig;
  autoDowngraded: boolean;
  fpsScore: number | null;
}

const DEFAULT_STATE: DevicePerformanceState = {
  tier: "high",
  isMobile: false,
  ready: false,
  config: getAnimationConfig("high"),
  autoDowngraded: false,
  fpsScore: null,
};

const DevicePerformanceContext = createContext<DevicePerformanceState>(DEFAULT_STATE);

export const DevicePerformanceProvider = DevicePerformanceContext.Provider;

export function useDevicePerformance(): DevicePerformanceState {
  return useContext(DevicePerformanceContext);
}

const FPS_LOW_THRESHOLD = 30;
const FPS_MEDIUM_THRESHOLD = 45;
const DOWNGRADE_KEY = "kyron-fps-downgrade";

function getStoredDowngrade(): PerformanceTier | null {
  try {
    const raw = localStorage.getItem(DOWNGRADE_KEY);
    if (!raw) return null;
    const { tier, ts } = JSON.parse(raw);
    if (Date.now() - ts > 6 * 60 * 60 * 1000) {
      localStorage.removeItem(DOWNGRADE_KEY);
      return null;
    }
    return tier as PerformanceTier;
  } catch {
    return null;
  }
}

function storeDowngrade(tier: PerformanceTier) {
  try {
    localStorage.setItem(DOWNGRADE_KEY, JSON.stringify({ tier, ts: Date.now() }));
  } catch {}
}

function downgrade(current: PerformanceTier): PerformanceTier {
  if (current === "high") return "medium";
  return "low";
}

export function useDevicePerformanceDetector(): DevicePerformanceState {
  const [tier, setTier] = useState<PerformanceTier>("high");
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const [autoDowngraded, setAutoDowngraded] = useState(false);
  const [fpsScore, setFpsScore] = useState<number | null>(null);
  const baseTierRef = useRef<PerformanceTier>("high");

  useEffect(() => {
    const info = detectDevicePerformance();
    baseTierRef.current = info.tier;
    setIsMobile(info.isMobile);

    const stored = getStoredDowngrade();
    if (stored) {
      setTier(stored);
      setAutoDowngraded(true);
    } else {
      setTier(info.tier);
    }

    setReady(true);

    if (info.reducedMotion || info.dataSaver) return;

    const cancel = createFpsMonitor(
      (avgFps) => {
        setFpsScore(avgFps);

        let effectiveTier = baseTierRef.current;

        if (avgFps < FPS_LOW_THRESHOLD) {
          effectiveTier = "low";
        } else if (avgFps < FPS_MEDIUM_THRESHOLD && effectiveTier !== "low") {
          effectiveTier = downgrade(effectiveTier);
        }

        if (effectiveTier !== baseTierRef.current) {
          setTier(effectiveTier);
          setAutoDowngraded(true);
          storeDowngrade(effectiveTier);
          clearPerformanceCache();
        }
      },
      { sampleFrames: 90, warmupMs: 2500 },
    );

    return cancel;
  }, []);

  const config = getAnimationConfig(tier);

  return { tier, isMobile, ready, config, autoDowngraded, fpsScore };
}
