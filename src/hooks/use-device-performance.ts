"use client";

import { useState, useEffect } from "react";
import { detectDevicePerformance, getAnimationConfig, type PerformanceTier } from "@/lib/device-performance";

export function useDevicePerformance() {
  const [tier, setTier] = useState<PerformanceTier>("high");
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const info = detectDevicePerformance();
    setTier(info.tier);
    setIsMobile(info.isMobile);
    setReady(true);
  }, []);

  const config = getAnimationConfig(tier);

  return { tier, isMobile, ready, config };
}
