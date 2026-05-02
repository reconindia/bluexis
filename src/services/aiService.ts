/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { db, handleFirestoreError } from "../lib/firebase";
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  addDoc, 
  serverTimestamp, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  getDoc
} from "firebase/firestore";

export interface CaseEvaluationResult {
  ai_summary: string;
  clarity_score: number;
  alignment_score: number;
  risk_score: number;
  layers: {
    alignment_status: "weak" | "moderate" | "strong";
    risk_status: "low" | "medium" | "high";
    decision_status: "unclear" | "partial" | "clear";
    execution_status: "unstable" | "controlled" | "ready";
  };
  signals: string[];
}

/**
 * Generates the next sequential Case ID (BX-XXXX)
 */
async function generateNextCaseId(): Promise<string> {
  const casesRef = collection(db, "cases");
  const q = query(casesRef, orderBy("case_id", "desc"), limit(1));
  try {
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) return "BX-0001";
    
    const lastId = snapshot.docs[0].data().case_id;
    const lastNum = parseInt(lastId.split("-")[1]);
    return `BX-${(lastNum + 1).toString().padStart(4, "0")}`;
  } catch (error) {
    handleFirestoreError(error, 'list', 'cases');
  }
}

/**
 * Manually creates a new case in the system bypassing AI evaluation.
 * Enforces the institutional-grade 4-step creation protocol.
 */
export async function createManualCase(
  userId: string, 
  stage: "pre-decision" | "mid-process" | "execution", 
  signals: string[], 
  description: string
): Promise<string> {
  const caseId = await generateNextCaseId();
  const timestamp = serverTimestamp();

  // 1. Log "created" event in case_activity
  const activityRef = collection(db, "case_activity");
  try {
    await addDoc(activityRef, {
      case_id: caseId,
      event: "created",
      actor: "system",
      timestamp: timestamp
    });
  } catch (error) {
    handleFirestoreError(error, 'write', 'case_activity');
  }

  // 2. Create case document with default scores and structural metadata
  const caseRef = doc(db, "cases", caseId);
  try {
    await setDoc(caseRef, {
      case_id: caseId,
      user_id: userId,
      status: "new",
      stage: stage,
      clarity_score: 0,
      alignment_score: 0,
      risk_score: 0,
      ai_summary: description,
      created_at: timestamp,
      updated_at: timestamp
    });
  } catch (error) {
    handleFirestoreError(error, 'write', `cases/${caseId}`);
  }

  // 3. Store signals in the case_signals collection
  const signalsRef = doc(db, "case_signals", caseId);
  try {
    await setDoc(signalsRef, {
      case_id: caseId,
      signals: signals
    });
  } catch (error) {
    handleFirestoreError(error, 'write', `case_signals/${caseId}`);
  }

  // 4. Initialize case_layers with default 'unclear' state
  const layersRef = doc(db, "case_layers", caseId);
  try {
    await setDoc(layersRef, {
      case_id: caseId,
      alignment_status: "moderate",
      risk_status: "medium",
      decision_status: "unclear",
      execution_status: "unstable"
    });
  } catch (error) {
    handleFirestoreError(error, 'write', `case_layers/${caseId}`);
  }

  return caseId;
}

/**
 * Upgrades an existing 'new' case by running AI evaluation on its summary/description.
 * Updates the case status to 'qualified' and populates ASSURE metrics.
 */
export async function qualifyExistingCase(caseId: string): Promise<void> {
  const caseRef = doc(db, "cases", caseId);
  let caseSnap;
  try {
    caseSnap = await getDoc(caseRef);
  } catch (error) {
    handleFirestoreError(error, 'get', `cases/${caseId}`);
  }
  
  if (!caseSnap.exists()) throw new Error(`Case ${caseId} does not exist.`);
  const caseData = caseSnap.data();
  const rawInput = caseData.ai_summary; // Original description stored in summary

  const timestamp = serverTimestamp();

  // 1. Mark as evaluating
  try {
    await updateDoc(caseRef, { status: "evaluating", updated_at: timestamp });
  } catch (error) {
    handleFirestoreError(error, 'write', `cases/${caseId}`);
  }

  try {
    // 2. AI Evaluation via server-side proxy
    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawInput })
    });

    if (!response.ok) throw new Error("Server evaluation failed");
    const result: CaseEvaluationResult = await response.json();

    // 3. Sequential Update Protocol
    try {
      await updateDoc(caseRef, {
        status: "qualified",
        ai_summary: result.ai_summary,
        clarity_score: result.clarity_score,
        alignment_score: result.alignment_score,
        risk_score: result.risk_score,
        updated_at: serverTimestamp()
      });

      await setDoc(doc(db, "case_layers", caseId), {
        case_id: caseId,
        ...result.layers
      });

      await updateDoc(doc(db, "case_signals", caseId), {
        signals: result.signals
      });

      // 4. Log AI processed event
      await addDoc(collection(db, "case_activity"), {
        case_id: caseId,
        event: "ai_processed",
        actor: "system",
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, 'write', 'case_updates');
    }

  } catch (error) {
    console.error("Qualification failure:", error);
    try {
      await updateDoc(caseRef, { status: "new", updated_at: serverTimestamp() });
    } catch (e) {
      console.error("Rollback failure:", e);
    }
    throw error;
  }
}

/**
 * Processes a raw user case using the server-side AI evaluation.
 */
export async function evaluateCase(rawInput: string, userId: string): Promise<string> {
  const caseId = await generateNextCaseId();
  const timestamp = serverTimestamp();

  // 1. Log creation activity immediately
  const activityRef = collection(db, "case_activity");
  try {
    await addDoc(activityRef, {
      case_id: caseId,
      event: "created",
      actor: "system",
      timestamp: timestamp
    });
  } catch (error) {
    handleFirestoreError(error, 'write', 'case_activity');
  }

  // 2. Initial incomplete document (Evaluating status)
  const caseRef = doc(db, "cases", caseId);
  try {
    await setDoc(caseRef, {
      case_id: caseId,
      user_id: userId,
      status: "evaluating",
      stage: "pre-decision",
      created_at: timestamp,
      updated_at: timestamp
    });
  } catch (error) {
    handleFirestoreError(error, 'write', `cases/${caseId}`);
  }

  try {
    // 3. AI Evaluation via server-side proxy
    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rawInput })
    });

    if (!response.ok) throw new Error("Server evaluation failed");
    const result: CaseEvaluationResult = await response.json();

    // 4. Atomic Updates
    try {
      // Update Case
      await updateDoc(caseRef, {
        status: "qualified",
        ai_summary: result.ai_summary,
        clarity_score: result.clarity_score,
        alignment_score: result.alignment_score,
        risk_score: result.risk_score,
        updated_at: serverTimestamp()
      });

      // Create Layers
      await setDoc(doc(db, "case_layers", caseId), {
        case_id: caseId,
        ...result.layers
      });

      // Create Signals
      await setDoc(doc(db, "case_signals", caseId), {
        case_id: caseId,
        signals: result.signals
      });

      // Log completion
      await addDoc(activityRef, {
        case_id: caseId,
        event: "ai_processed",
        actor: "system",
        timestamp: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, 'write', 'case_final_updates');
    }

    return caseId;
  } catch (error) {
    // If AI fails, log issue but keep initial document in "evaluating" state
    try {
      await addDoc(activityRef, {
        case_id: caseId,
        event: "reviewed", // Use reviewed to indicate human intervention needed
        actor: "system",
        timestamp: serverTimestamp()
      });
    } catch (e) {
      console.error("AI Failure log error:", e);
    }
    console.error("AI processing failed:", error);
    throw error;
  }
}

/**
 * Fetches a single case by ID with its layers and signals.
 */
export async function getCaseData(caseId: string) {
  const caseRef = doc(db, "cases", caseId);
  const layersRef = doc(db, "case_layers", caseId);
  const signalsRef = doc(db, "case_signals", caseId);
  
  try {
    const [caseSnap, layersSnap, signalsSnap] = await Promise.all([
      getDoc(caseRef),
      getDoc(layersRef),
      getDoc(signalsRef)
    ]);
    
    if (!caseSnap.exists()) return null;
    
    const data = caseSnap.data();
    return {
      ...data,
      layers: layersSnap.exists() ? layersSnap.data() : null,
      signals: signalsSnap.exists() ? signalsSnap.data().signals : []
    };
  } catch (error) {
    handleFirestoreError(error, 'get', `cases/${caseId}`);
  }
}
