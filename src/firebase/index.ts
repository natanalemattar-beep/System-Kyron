
'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// This function now correctly handles initialization and returns the service instances.
function initializeFirebaseServices(): {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  let app: FirebaseApp;
  if (!getApps().length) {
    // During development or if environment variables are not set,
    // this will use the config object. In production with App Hosting,
    // it will use the automatically provided environment variables.
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app)
  };
}

// Get SDKs with the initialized app
const { firebaseApp, auth, firestore } = initializeFirebaseServices();

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
