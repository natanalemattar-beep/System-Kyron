'use client';

import dynamic from 'next/dynamic';

const PublicAssistant = dynamic(() => import('@/components/ai/public-assistant'), { ssr: false });

export function PublicAssistantWrapper() {
  return <PublicAssistant />;
}
