"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { detectDevicePerformance, type DeviceInfo } from "@/lib/device-performance";

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

const DEFAULT_PROFILE: DeviceProfile = {
  tier: "high",
  cores: 8,
  memory: 8,
  gpu: "high",
  connection: "fast",
  dpr: 1,
  refreshRate: "standard",
  screen: "large",
  ready: false,
};

function detectProfile(): DeviceProfile {
  const info: DeviceInfo = detectDevicePerformance();
  return {
    tier: info.tier === "low" ? "low" : info.tier === "medium" ? "mid" : "high",
    cores: info.cores,
    memory: info.memory,
    gpu: info.gpuTier,
    connection: info.connectionType === "4g" || info.connectionType === "wifi" ? "fast" : info.connectionType === "3g" ? "mid" : "slow",
    dpr: typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
    refreshRate: "standard",
    screen: info.isMobile ? "small" : "large",
    ready: true,
  };
}

let cachedProfile: DeviceProfile | null = null;

const DeviceTierContext = createContext<DeviceProfile>(DEFAULT_PROFILE);

export const DeviceTierProvider = DeviceTierContext.Provider;

export function useDeviceTierContext(): DeviceProfile {
  return useContext(DeviceTierContext);
}

export function useDeviceTier(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>(DEFAULT_PROFILE);

  useEffect(() => {
    if (!cachedProfile) {
      cachedProfile = detectProfile();
    }
    setProfile(cachedProfile);
  }, []);

  return profile;
}
