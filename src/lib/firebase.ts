/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  setPersistence, 
  browserLocalPersistence,
  User as FirebaseUser 
} from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Select the specific database ID provisioned
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Explicitly set persistence to local to ensure session is kept across refreshes/iframes
setPersistence(auth, browserLocalPersistence).catch(err => {
  console.error("Persistence Error:", err);
});

export const googleProvider = new GoogleAuthProvider();
// Force re-selection of account if needed
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * NOTE: For Google Authentication to work in this environment (iframe):
 * 1. The domain of this app must be added to 'Authorized Domains' in Firebase Console -> Authentication -> Settings.
 * 2. If popups are blocked, use the 'Open in New Tab' option provided in the UI.
 * 3. Ensure 'Google' sign-in provider is enabled in Firebase Console.
 */

/**
 * Validates connection to Firestore.
 */
export async function testConnection() {
  try {
    // Attempt to fetch a non-existent document from a 'test' collection to verify connectivity
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection verified.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client is offline.");
    } else {
      // Missing permissions is also a sign of connection (but rule rejection)
      console.log("Firebase connected (Endpoint reachable).");
    }
  }
}

/**
 * Standard Firestore Error Handler
 */
export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[] | null;
  } | null;
}

export function handleFirestoreError(error: any, operation: FirestoreErrorInfo['operationType'], path: string | null = null): never {
  const user = auth.currentUser;
  
  const errorInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType: operation,
    path: path,
    authInfo: user ? {
      userId: user.uid,
      email: user.email || '',
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      providerInfo: user.providerData.map(p => ({
        providerId: p.providerId,
        displayName: p.displayName || '',
        email: p.email || ''
      }))
    } : null
  };

  const message = JSON.stringify(errorInfo);
  console.error("Firestore Error:", message);
  throw new Error(message);
}

export async function signInWithGoogle() {
  /**
   * IMPORTANT: Ensure 'bluexis.com' is added to Authorized Domains in Firebase Console.
   */
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
      console.log('Authentication popup closed by user.');
      return null;
    }
    console.error("Auth Error:", error);
    throw error;
  }
}
