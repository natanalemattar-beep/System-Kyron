"use client";

import { createContext, useContext } from "react";
import {
  getAnimationConfig,
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

const STATIC_STATE: DevicePerformanceState = {
  tier: "high",
  isMobile: false,
  ready: true,
  config: getAnimationConfig(),
  autoDowngraded: false,
  fpsScore: null,
};

const DevicePerformanceContext = createContext<DevicePerformanceState>(STATIC_STATE);

export const DevicePerformanceProvider = DevicePerformanceContext.Provider;

export function useDevicePerformance(): DevicePerformanceState {
  return useContext(DevicePerformanceContext);
}

export function useDevicePerformanceDetector(): DevicePerformanceState {
  return STATIC_STATE;
}
