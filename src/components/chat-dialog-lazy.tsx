'use client';

import dynamic from 'next/dynamic';

const ChatDialogInner = dynamic(
  () => import("@/components/chat-dialog").then(m => ({ default: m.ChatDialog })),
  { 
    ssr: false,
    loading: () => null,
  }
);

export function LazyChatDialog() {
  return <ChatDialogInner />;
}
