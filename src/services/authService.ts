/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  RecaptchaVerifier, 
  signInWithPhoneNumber,
  ConfirmationResult
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
 * Handles WhatsApp Login (Phone Auth Simulation/API Ready)
 * In production, this would use Firebase Phone Auth with reCAPTCHA.
 */
export async function handleWhatsAppLogin(phoneNumber: string, appVerificationId: string = 'recaptcha-container') {
  try {
    // Note: Ensuring reCAPTCHA verifier is initialized in the UI component
    const verifier = new RecaptchaVerifier(auth, appVerificationId, {
      size: 'invisible'
    });
    
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    return confirmationResult;
  } catch (error: any) {
    console.error("WhatsApp Auth Error:", error);
    throw error;
  }
}

/**
 * Placeholder for Truecaller Authentication
 * Only visible on mobile devices.
 */
export async function handleTruecallerLogin() {
  console.log("Initializing Truecaller Auth Context...");
  // Placeholder for Truecaller SDK integration
  // return await truecallerSDK.login();
  throw new Error("Truecaller API integration pending configuration.");
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
