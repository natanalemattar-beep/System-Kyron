"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getAnimationConfig,
  detectDevicePerformance,
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
  config: getAnimationConfig(),
  autoDowngraded: false,
  fpsScore: null,
};

let cachedState: DevicePerformanceState | null = null;

const DevicePerformanceContext = createContext<DevicePerformanceState>(DEFAULT_STATE);

export const DevicePerformanceProvider = DevicePerformanceContext.Provider;

export function useDevicePerformance(): DevicePerformanceState {
  return useContext(DevicePerformanceContext);
}

export function useDevicePerformanceDetector(): DevicePerformanceState {
  const [state, setState] = useState<DevicePerformanceState>(DEFAULT_STATE);

  useEffect(() => {
    if (!cachedState) {
      const info = detectDevicePerformance();
      cachedState = {
        tier: info.tier,
        isMobile: info.isMobile,
        ready: true,
        config: getAnimationConfig(info.tier),
        autoDowngraded: info.tier !== "high",
        fpsScore: info.score,
      };
    }
    setState(cachedState);
  }, []);

  return state;
}
