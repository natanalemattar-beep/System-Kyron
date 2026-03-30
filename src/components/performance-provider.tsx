"use client";

import { useEffect } from "react";
import { useDeviceTier, DeviceTierProvider } from "@/hooks/use-device-tier";

export function PerformanceProvider({ children }: { children: React.ReactNode }) {
  const profile = useDeviceTier();

  useEffect(() => {
    const root = document.documentElement;

    root.dataset.tier = profile.tier;
    root.dataset.screen = profile.screen;
    root.dataset.refreshRate = profile.refreshRate;

    if (profile.tier === "low") {
      root.style.setProperty("--blur-intensity", "0px");
      root.style.setProperty("--bg-orb-opacity", "0");
      root.style.setProperty("--glass-blur", "0px");
    } else if (profile.tier === "mid") {
      root.style.setProperty("--blur-intensity", "12px");
      root.style.setProperty("--bg-orb-opacity", "0.03");
      root.style.setProperty("--glass-blur", "16px");
    } else {
      root.style.setProperty("--blur-intensity", "24px");
      root.style.setProperty("--bg-orb-opacity", "0.04");
      root.style.setProperty("--glass-blur", "24px");
    }

    if (profile.refreshRate === "low") {
      root.style.setProperty("--scroll-behavior", "auto");
    } else {
      root.style.setProperty("--scroll-behavior", "smooth");
    }

    return () => {
      const props = [
        "--blur-intensity",
        "--bg-orb-opacity",
        "--glass-blur",
        "--scroll-behavior",
      ];
      props.forEach((p) => root.style.removeProperty(p));
      delete root.dataset.tier;
      delete root.dataset.screen;
      delete root.dataset.refreshRate;
    };
  }, [profile]);

  return (
    <DeviceTierProvider value={profile}>
      {children}
    </DeviceTierProvider>
  );
}
