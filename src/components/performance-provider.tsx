"use client";

import { useEffect } from "react";
import { useDeviceTier, DeviceTierProvider, type DeviceTier } from "@/hooks/use-device-tier";
import { useDevicePerformanceDetector, DevicePerformanceProvider } from "@/hooks/use-device-performance";

function resolveEffectiveTier(deviceTier: DeviceTier, perfTier: string): DeviceTier {
  const order: DeviceTier[] = ["low", "mid", "high"];
  const mapped = perfTier === "medium" ? "mid" : (perfTier as DeviceTier);
  const dIdx = order.indexOf(deviceTier);
  const pIdx = order.indexOf(mapped);
  return order[Math.min(dIdx, pIdx)];
}

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const profile = useDeviceTier();
  const perfState = useDevicePerformanceDetector();

  const effectiveTier = profile.ready ? resolveEffectiveTier(profile.tier, perfState.tier) : "low";

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.tier = effectiveTier;
    root.dataset.screen = profile.screen;
    root.dataset.refreshRate = profile.refreshRate;

    if (perfState.autoDowngraded) {
      root.dataset.autoDowngraded = "true";
    }

    if (effectiveTier === "low") {
      root.style.setProperty("--blur-intensity", "0px");
      root.style.setProperty("--bg-orb-opacity", "0");
      root.style.setProperty("--glass-blur", "0px");
      root.style.setProperty("--shadow-strength", "0");
      root.style.setProperty("--animation-speed", "0");
      root.style.setProperty("--transition-speed", "0s");
      root.style.setProperty("--particle-opacity", "0");
      root.style.setProperty("--gradient-complexity", "0");
      root.style.setProperty("--hover-scale", "1");
      root.style.setProperty("--backdrop-blur", "0px");
      root.classList.add("perf-low");
      root.classList.remove("perf-mid", "perf-high");
    } else if (effectiveTier === "mid") {
      root.style.setProperty("--blur-intensity", "8px");
      root.style.setProperty("--bg-orb-opacity", "0.02");
      root.style.setProperty("--glass-blur", "12px");
      root.style.setProperty("--shadow-strength", "0.5");
      root.style.setProperty("--animation-speed", "0.5");
      root.style.setProperty("--transition-speed", "0.2s");
      root.style.setProperty("--particle-opacity", "0");
      root.style.setProperty("--gradient-complexity", "0.5");
      root.style.setProperty("--hover-scale", "1.02");
      root.style.setProperty("--backdrop-blur", "8px");
      root.classList.add("perf-mid");
      root.classList.remove("perf-low", "perf-high");
    } else {
      root.style.setProperty("--blur-intensity", "24px");
      root.style.setProperty("--bg-orb-opacity", "0.04");
      root.style.setProperty("--glass-blur", "24px");
      root.style.setProperty("--shadow-strength", "1");
      root.style.setProperty("--animation-speed", "1");
      root.style.setProperty("--transition-speed", "0.4s");
      root.style.setProperty("--particle-opacity", "1");
      root.style.setProperty("--gradient-complexity", "1");
      root.style.setProperty("--hover-scale", "1.05");
      root.style.setProperty("--backdrop-blur", "24px");
      root.classList.add("perf-high");
      root.classList.remove("perf-low", "perf-mid");
    }

    if (profile.refreshRate === "low") {
      root.style.setProperty("--scroll-behavior", "auto");
    } else {
      root.style.setProperty("--scroll-behavior", "smooth");
    }

    return () => {
      const props = [
        "--blur-intensity", "--bg-orb-opacity", "--glass-blur",
        "--shadow-strength", "--animation-speed", "--transition-speed",
        "--particle-opacity", "--gradient-complexity", "--hover-scale",
        "--backdrop-blur", "--scroll-behavior",
      ];
      props.forEach((p) => root.style.removeProperty(p));
      root.classList.remove("perf-low", "perf-mid", "perf-high");
      delete root.dataset.tier;
      delete root.dataset.screen;
      delete root.dataset.refreshRate;
      delete root.dataset.autoDowngraded;
    };
  }, [effectiveTier, profile, perfState.autoDowngraded]);

  const effectiveProfile = { ...profile, tier: effectiveTier };

  return (
    <DeviceTierProvider value={effectiveProfile}>
      <DevicePerformanceProvider value={perfState}>
        {children}
      </DevicePerformanceProvider>
    </DeviceTierProvider>
  );
}
