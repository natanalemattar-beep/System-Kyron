'use client';

import dynamic from 'next/dynamic';

const KyronAssistant = dynamic(() => import("@/components/ai/kyron-assistant").then(mod => mod.KyronAssistant), { 
  ssr: false,
  loading: () => null
});

export function KyronAssistantWrapper() {
  return <KyronAssistant />;
}
