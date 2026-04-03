"use client";

import { useBannerVisible } from "@/components/demo-banner";

export function DemoBannerSpacer() {
  const visible = useBannerVisible();
  if (!visible) return null;
  return <div className="h-9 flex-shrink-0" />;
}
