'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// This function now correctly handles initialization and returns the service instances.
export function initializeFirebase() {
  if (!getApps().length) {
    // During development or if environment variables are not set,
    // this will use the config object. In production with App Hosting,
    // it will use the automatically provided environment variables.
    return initializeApp(firebaseConfig);
  } else {
    return getApp();
  }
}

// Get SDKs with the initialized app
const firebaseApp = initializeFirebase();
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Export the initialized services
export { firebaseApp, auth, firestore };

// Export all hooks and utilities from their respective files
export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
