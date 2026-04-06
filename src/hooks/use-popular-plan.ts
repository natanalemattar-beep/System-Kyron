'use client';

import { useState, useEffect } from 'react';

export function usePopularPlan(category: string) {
  const [popularPlan, setPopularPlan] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/plan-popularity?category=${encodeURIComponent(category)}`)
      .then(r => r.json())
      .then(data => setPopularPlan(data.popularPlan ?? null))
      .catch(() => {});
  }, [category]);

  const recordSelection = async (planId: string) => {
    try {
      await fetch('/api/plan-popularity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, planId }),
      });
    } catch {}
  };

  return { popularPlan, recordSelection };
}
