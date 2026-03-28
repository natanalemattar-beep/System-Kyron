'use client';

import dynamic from 'next/dynamic';

const VoiceAssistantInner = dynamic(
  () => import("@/components/voice-assistant").then(m => ({ default: m.VoiceAssistant })),
  { ssr: false }
);

export function LazyVoiceAssistant() {
  return <VoiceAssistantInner />;
}
