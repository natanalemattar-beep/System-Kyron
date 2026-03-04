'use client';

import React, { type ReactNode, useMemo, useState } from 'react';
import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase'; // Import the new initializer function

interface FirebaseClientProviderProps {
  children: ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [error, setError] = useState<Error | null>(null);

  // We call initializeFirebase here and memoize its result.
  // This ensures Firebase is initialized only once on the client-side.
  const firebaseServices = useMemo(() => {
    try {
      return initializeFirebase();
    } catch (err) {
      console.error('[v0] Firebase initialization error:', err);
      setError(err instanceof Error ? err : new Error('Unknown Firebase error'));
      // Return null services to allow app to render without Firebase
      return null;
    }
  }, []);

  // If Firebase failed to initialize but we have no services, just render children without provider
  if (error || !firebaseServices) {
    console.warn('[v0] Firebase not available, rendering app without Firebase services');
    return <>{children}</>;
  }

  return (
    <FirebaseProvider
      firebaseApp={firebaseServices.firebaseApp}
      auth={firebaseServices.auth}
      firestore={firebaseServices.firestore}
    >
      {children}
    </FirebaseProvider>
  );
}
