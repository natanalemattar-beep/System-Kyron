"use client";

import { createContext, useContext } from "react";

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

const STATIC_PROFILE: DeviceProfile = {
  tier: "high",
  cores: 8,
  memory: 8,
  gpu: "high",
  connection: "fast",
  dpr: 1,
  refreshRate: "standard",
  screen: "large",
  ready: true,
};

const DeviceTierContext = createContext<DeviceProfile>(STATIC_PROFILE);

export const DeviceTierProvider = DeviceTierContext.Provider;

export function useDeviceTierContext(): DeviceProfile {
  return useContext(DeviceTierContext);
}

export function useDeviceTier(): DeviceProfile {
  return STATIC_PROFILE;
}
