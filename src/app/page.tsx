
'use client';

import LandingPage from '@/app/[locale]/page';

// This file is now a simple re-exporter. 
// The actual landing page logic is in /app/(main)/page.tsx
// to share the main layout with other authenticated pages.
export default function RootPage() {
  return <LandingPage />;
}
