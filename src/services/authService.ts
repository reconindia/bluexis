/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  signInWithPopup, 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

/**
 * Handles Google Authentication
 */
export async function handleGoogleLogin() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Google Auth Error:", error);
    throw error;
  }
}

/**
 * Updates user role in Firestore
 */
export async function updateUserRole(userId: string, role: 'society' | 'pmc' | 'developer' | 'advisor') {
  const userRef = doc(db, 'users', userId);
  try {
    await setDoc(userRef, { role }, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}

/**
 * Checks if user has a role assigned
 */
export async function getUserData(userId: string) {
  const userRef = doc(db, 'users', userId);
  const docSnap = await getDoc(userRef);
  return docSnap.exists() ? docSnap.data() : null;
}
